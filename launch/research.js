#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TASKS_PATH = path.join(__dirname, 'data', 'tasks.json');

function log(msg) {
  console.log(msg);
}

function loadTasks() {
  const raw = fs.readFileSync(TASKS_PATH, 'utf-8');
  return JSON.parse(raw);
}

function saveTasks(data) {
  fs.writeFileSync(TASKS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function getAllUrls(data) {
  const urls = new Set();
  for (const week of data.weeks) {
    for (const task of week.tasks) {
      urls.add(task.url.toLowerCase().trim());
    }
  }
  return urls;
}

function runClaudeSearch() {
  log('[research] Avvio ricerca con Claude CLI...');

  const prompt = [
    'Search for new free AI tool directories and launch platforms for 2026 that accept free tool submissions.',
    'Return a JSON array of objects with fields: platform, url, notes.',
    'Focus on directories launched in 2025-2026 that are not already well-known.',
    'Do not include: Product Hunt, Hacker News, Reddit, DEV.to, StackShare, Toolify, FutureTools, OpenTools, Altern, Uneed, Peerlist, MicroLaunch.',
    'Return only a valid JSON array, nothing else. No markdown, no explanation.'
  ].join(' ');

  let output;
  try {
    output = execSync(`claude --print "${prompt.replace(/"/g, '\\"')}"`, {
      encoding: 'utf-8',
      timeout: 120000,
      maxBuffer: 1024 * 1024 * 10
    });
  } catch (err) {
    log('[research] ERRORE durante esecuzione claude CLI:');
    log(err.message);
    return [];
  }

  log('[research] Output ricevuto. Parsing JSON...');

  // Extract JSON array from output (Claude might wrap it in markdown)
  let jsonStr = output.trim();

  // Try to extract JSON array if wrapped in markdown code block
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim();
  }

  // Try to find the first [ ... ] block
  const arrayMatch = jsonStr.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    jsonStr = arrayMatch[0];
  }

  let results;
  try {
    results = JSON.parse(jsonStr);
    if (!Array.isArray(results)) {
      log('[research] Il risultato non e\' un array JSON valido.');
      return [];
    }
  } catch (e) {
    log('[research] ERRORE parsing JSON: ' + e.message);
    log('[research] Output grezzo:');
    log(output.substring(0, 500));
    return [];
  }

  return results;
}

function main() {
  log('[research] === SammaPix Research Start ===');

  const data = loadTasks();
  const existingUrls = getAllUrls(data);

  log(`[research] Task esistenti: ${existingUrls.size} URL nel database`);

  const results = runClaudeSearch();
  log(`[research] Trovati ${results.length} risultati da Claude`);

  const today = new Date().toISOString().split('T')[0];
  let addedCount = 0;

  for (const item of results) {
    if (!item.url || !item.platform) continue;

    const normalizedUrl = item.url.toLowerCase().trim();

    if (existingUrls.has(normalizedUrl)) {
      log(`[research] Gia\' presente: ${item.platform}`);
      continue;
    }

    // Generate a safe ID from the platform name
    const id = 'auto-' + item.platform
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 30);

    const newTask = {
      id,
      platform: item.platform,
      url: item.url,
      done: false,
      timing: `Trovato automaticamente — ${today}`,
      priority: 'low',
      notes: item.notes || '',
      content: ''
    };

    // Find week2 and append
    const week2 = data.weeks.find(w => w.id === 'week2');
    if (week2) {
      week2.tasks.push(newTask);
      existingUrls.add(normalizedUrl);
      addedCount++;
      log(`[research] + Aggiunto: ${item.platform} (${item.url})`);
    }
  }

  data.lastResearch = today;
  saveTasks(data);

  log(`[research] === Completato: ${addedCount} nuove piattaforme aggiunte ===`);
}

main();
