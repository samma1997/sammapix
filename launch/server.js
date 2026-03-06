const express = require('express');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const cron = require('node-cron');

const app = express();
const PORT = 3333;
const TASKS_PATH = path.join(__dirname, 'data', 'tasks.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── API: GET tasks ─────────────────────────────────────────────────────────
app.get('/api/tasks', (req, res) => {
  try {
    const raw = fs.readFileSync(TASKS_PATH, 'utf-8');
    res.json(JSON.parse(raw));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read tasks.json' });
  }
});

// ─── API: POST toggle task done ──────────────────────────────────────────────
app.post('/api/tasks/:id/toggle', (req, res) => {
  try {
    const raw = fs.readFileSync(TASKS_PATH, 'utf-8');
    const data = JSON.parse(raw);
    const taskId = req.params.id;
    let found = false;

    for (const week of data.weeks) {
      for (const task of week.tasks) {
        if (task.id === taskId) {
          task.done = !task.done;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      return res.status(404).json({ error: 'Task not found' });
    }

    data.lastUpdated = new Date().toISOString().split('T')[0];
    fs.writeFileSync(TASKS_PATH, JSON.stringify(data, null, 2), 'utf-8');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle task' });
  }
});

// ─── API: POST run research (streaming) ─────────────────────────────────────
app.post('/api/research', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (line) => {
    res.write(`data: ${line}\n\n`);
  };

  send('[server] Avvio research.js...');

  const child = spawn('node', [path.join(__dirname, 'research.js')], {
    cwd: __dirname,
    env: process.env
  });

  child.stdout.on('data', (chunk) => {
    const lines = chunk.toString().split('\n').filter(l => l.trim());
    lines.forEach(line => send(line));
  });

  child.stderr.on('data', (chunk) => {
    const lines = chunk.toString().split('\n').filter(l => l.trim());
    lines.forEach(line => send('[stderr] ' + line));
  });

  child.on('close', (code) => {
    send(`[server] Processo terminato con codice ${code}`);
    send('__DONE__');
    res.end();
  });

  req.on('close', () => {
    child.kill();
  });
});

// ─── Cron: ogni domenica alle 7:00 ──────────────────────────────────────────
cron.schedule('0 7 * * 0', () => {
  console.log('[cron] Avvio ricerca automatica domenicale...');
  const { execSync } = require('child_process');
  try {
    execSync('node ' + path.join(__dirname, 'research.js'), {
      stdio: 'inherit',
      cwd: __dirname
    });
  } catch (err) {
    console.error('[cron] Errore research:', err.message);
  }
}, {
  timezone: 'Europe/Rome'
});

// ─── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`\n  SammaPix Launch Dashboard`);
  console.log(`  Running at http://localhost:${PORT}\n`);

  // Open browser after a short delay
  setTimeout(async () => {
    try {
      const open = (await import('open')).default;
      await open(`http://localhost:${PORT}`);
    } catch (err) {
      console.log(`  Apri manualmente: http://localhost:${PORT}`);
    }
  }, 800);
});
