# SammaPix CSS Selector Reference

**For use with:** `playwright-video-recorder-setup.js`

When Playwright records your tool interactions, it needs the exact CSS selectors for:
1. File upload inputs
2. Process/Convert buttons
3. Download buttons
4. Status indicators (optional)

This guide shows how to find these.

---

## How to Find CSS Selectors

### Method 1: Chrome DevTools (Recommended)
1. Open tool in browser: `https://sammapix.com/tools/compress`
2. Press `F12` to open DevTools
3. Press `Ctrl+Shift+C` (or Cmd+Shift+C on Mac)
4. Click the element you want to inspect
5. Look at the highlighted HTML in DevTools
6. Copy the selector

### Method 2: Right-Click Inspect
1. Right-click element → "Inspect"
2. Look at the HTML code
3. Find unique identifiers (id, class, data-attribute)

### Method 3: Browser Console
```javascript
// In browser console (F12 → Console tab):
document.querySelector('input[type="file"]')
// If it returns an element, the selector works!
```

---

## Common Selectors to Find

For each tool, you need these selectors:

### 1. File Upload Input
**HTML typically looks like:**
```html
<input type="file" id="fileUpload" class="file-input" />
<input type="file" accept=".jpg,.png" />
```

**Common selectors:**
- `input[type="file"]` (most common)
- `#fileUpload` (if has ID)
- `.file-input` (if has class)
- `input[accept]` (if has accept attribute)

**Test in console:**
```javascript
document.querySelector('input[type="file"]')
```

### 2. Process/Convert/Compress Button
**HTML typically looks like:**
```html
<button class="btn btn-primary" id="processBtn">Process</button>
<button onclick="processImages()">Compress</button>
<a class="button" href="#" onclick="convert()">Convert</a>
```

**Common selectors:**
- `button:has-text("Process")` (by text content)
- `button[class*="primary"]` (by class)
- `#processBtn` (by ID)
- `button[onclick]` (by attribute)

**Test in console:**
```javascript
document.querySelector('button:has-text("Process")')
// or
document.querySelector('button[class*="process"]')
```

### 3. Download Button
**HTML typically looks like:**
```html
<button class="btn btn-success" id="downloadBtn">Download</button>
<a class="download-link" href="/download/result.mp4">Download</a>
<button onclick="downloadResult()">Save File</button>
```

**Common selectors:**
- `button:has-text("Download")`
- `button[class*="download"]`
- `a[class*="download"]`
- `#downloadBtn`

**Test in console:**
```javascript
document.querySelector('button:has-text("Download")')
```

### 4. Status/Success Indicator (Optional)
**For waiting until processing is done:**
```html
<div class="status success">Processing complete!</div>
<div class="progress" style="width: 100%">Done</div>
```

**Selectors:**
- `.status.success`
- `[class*="complete"]`
- `[data-status="done"]`

---

## Updated Script Template

Once you have your selectors, update `playwright-video-recorder-setup.js`:

```javascript
const demos = [
  {
    name: 'batch-compress',
    title: 'Batch Compress 50 Images',
    path: 'compress',
    steps: [
      {
        type: 'click',
        selector: 'input[type="file"]',  // ← UPDATE THIS
        wait: 1500,
        description: 'Click upload button'
      },
      {
        type: 'click',
        selector: 'button:has-text("Process")',  // ← UPDATE THIS
        wait: 5000,
        description: 'Processing images...'
      },
      {
        type: 'click',
        selector: 'button:has-text("Download")',  // ← UPDATE THIS
        wait: 2000,
        description: 'Downloading compressed files'
      }
    ]
  }
];
```

---

## SammaPix Tool Pages (Estimated Selectors)

Based on typical modern web app patterns, here are ESTIMATED selectors. **You must verify these.**

### 1. Batch Compress (`/tools/compress`)
```javascript
steps: [
  {
    type: 'click',
    selector: 'input[type="file"]',  // File upload
    wait: 1500
  },
  {
    type: 'click',
    selector: 'button:has-text("Compress")', // or "Process" or "Compress All"
    wait: 5000
  },
  {
    type: 'click',
    selector: 'button:has-text("Download")',
    wait: 2000
  }
]
```

**How to verify:**
1. Go to: `https://sammapix.com/tools/compress`
2. Open DevTools (F12)
3. Click the upload area
4. Look for `<input type="file">` in DevTools
5. Copy the exact HTML and adjust selector

### 2. HEIC to JPG (`/tools/heic-to-jpg`)
```javascript
steps: [
  {
    type: 'click',
    selector: 'input[type="file"]',
    wait: 1500
  },
  {
    type: 'click',
    selector: 'button:has-text("Convert")',  // Likely "Convert"
    wait: 4000
  },
  {
    type: 'click',
    selector: 'button:has-text("Download")',
    wait: 2000
  }
]
```

### 3. AI Rename (`/tools/ai-rename`)
```javascript
steps: [
  {
    type: 'click',
    selector: 'input[type="file"]',
    wait: 1500
  },
  {
    type: 'click',
    selector: 'button:has-text("Generate Names")',  // or "Rename" or "AI Rename"
    wait: 4000
  },
  {
    type: 'click',
    selector: 'button:has-text("Download")',
    wait: 2000
  }
]
```

### 4. Remove EXIF (`/tools/remove-exif`)
```javascript
steps: [
  {
    type: 'click',
    selector: 'input[type="file"]',
    wait: 1500
  },
  {
    type: 'click',
    selector: 'button:has-text("Remove")',  // or "Remove EXIF" or "Clean"
    wait: 4000
  },
  {
    type: 'click',
    selector: 'button:has-text("Download")',
    wait: 2000
  }
]
```

### 5. Convert WebP (`/tools/convert-webp`)
```javascript
steps: [
  {
    type: 'click',
    selector: 'input[type="file"]',
    wait: 1500
  },
  {
    type: 'click',
    selector: 'button:has-text("Convert")',
    wait: 4000
  },
  {
    type: 'click',
    selector: 'button:has-text("Download")',
    wait: 2000
  }
]
```

---

## Debugging Failed Selectors

If Playwright can't find a selector, you'll see:
```
⚠ Could not find selector: button:has-text("Process")
```

**How to fix:**

### Step 1: Verify Element Exists
```javascript
// In browser console:
document.querySelector('button:has-text("Process")')
// Should return the element, not null
```

### Step 2: Try Alternative Selectors
```javascript
// If text selector fails, try:
document.querySelector('button[class*="process"]')
document.querySelector('button[onclick*="process"]')
document.querySelector('button:nth-of-type(2)')
```

### Step 3: Check Element Classes/Attributes
```javascript
// See all attributes:
document.querySelector('button').outerHTML
// Output: <button class="btn btn-primary" id="processBtn" data-action="compress">
```

### Step 4: Build Robust Selector
```javascript
// Instead of: button:has-text("Process")
// Try: button[class*="primary"]

// Or combine multiple attributes:
// button[class*="btn"][data-action="compress"]
```

---

## Advanced Selectors (Playwright Specific)

Playwright supports all CSS selectors PLUS custom Playwright selectors:

### Text-based Selectors
```javascript
'button:has-text("Process")' // Exact match
'button:has-text(/Process|Compress/)' // Regex
'text=Download' // Simple text
```

### XPath (if CSS fails)
```javascript
'//button[contains(text(), "Process")]'
'//input[@type="file"][@accept=".jpg"]'
```

### Combining Selectors
```javascript
'button[class*="primary"]:has-text("Process")'
'input[type="file"][accept*="image"]'
'button >> text=Download'
```

### Parent/Child Navigation
```javascript
'div.upload-area input[type="file"]'
'form button:has-text("Convert")'
```

---

## Example: Complete Debugging Session

### Scenario: "I can't find the process button"

**Step 1:** Open tool in browser
```
https://sammapix.com/tools/compress
```

**Step 2:** Open DevTools and search for button
```
F12 → Ctrl+F → search "Process"
```

**Step 3:** Inspect the button HTML
```html
<div class="actions">
  <button class="btn btn-primary btn-lg" id="compressAllBtn">
    <span class="icon"></span>
    <span class="text">Compress All</span>
  </button>
</div>
```

**Step 4:** Copy working selector from DevTools
- By text: `:has-text("Compress All")`
- By ID: `#compressAllBtn`
- By class: `button[class*="primary"]`

**Step 5:** Test in console
```javascript
document.querySelector('button:has-text("Compress All")')
// Returns: <button ...>Compress All</button> ✓
```

**Step 6:** Update script
```javascript
{
  type: 'click',
  selector: 'button:has-text("Compress All")',  // ← Updated!
  wait: 5000,
  description: 'Processing images...'
}
```

**Step 7:** Verify script runs without errors
```bash
node playwright-video-recorder-setup.js
```

---

## Common Mistakes & Fixes

### ❌ Mistake 1: Wrong Button Found
```javascript
// If this selector matches multiple buttons:
selector: 'button' // Matches ALL buttons

// Fix: Be more specific
selector: 'button[class*="primary"]' // Only primary button
selector: 'button:has-text("Convert")' // By text content
```

### ❌ Mistake 2: File Input Hidden
```javascript
// Some upload buttons are hidden inputs:
<div class="upload-btn">
  <input type="file" style="display:none" />
  <button onclick="openFileDialog()">Click to Upload</button>
</div>

// Wrong selector:
selector: 'input[type="file"]' // Hidden, can't click

// Right selector:
selector: 'button:has-text("Click to Upload")' // The visible button
```

### ❌ Mistake 3: Dynamic Content Not Loaded
```javascript
// If selector is found but doesn't work:
await page.click(selector); // Fails - element not ready

// Fix: Wait for element first
await page.waitForSelector(selector, { timeout: 5000 });
await page.click(selector);
```

### ❌ Mistake 4: Text Changes After Click
```javascript
// Button text might change after interaction:
Before: "Convert"
After: "Converting..."
After: "Done!"

// Use more stable selector:
selector: 'button[data-action="convert"]' // Doesn't change
// Instead of:
selector: 'button:has-text("Convert")' // Can break if text changes
```

---

## Tools for Finding Selectors

### Browser Extensions
- **Selector Inspector:** Copy CSS selectors with right-click
- **SelectorsHub:** Interactive selector builder

### Online Tools
- **CSS Selector Generator:** [toolforge.org](https://toolforge.org)
- **XPath Finder:** [xpathfinder.com](https://xpathfinder.com)

### Playwright Documentation
- [Locators Guide](https://playwright.dev/docs/locators)
- [CSS Selectors](https://playwright.dev/docs/css-locators)

---

## Quick Reference: Selector Patterns

| Need | Selector Pattern | Example |
|------|------------------|---------|
| By type | `tagname[type="value"]` | `input[type="file"]` |
| By ID | `#idName` | `#uploadBtn` |
| By class | `.className` | `.upload-input` |
| By attribute | `tag[attr="value"]` | `button[data-action="compress"]` |
| By text | `:has-text("text")` | `button:has-text("Download")` |
| By partial text | `:has-text(/regex/)` | `button:has-text(/compress/i)` |
| Parent > Child | `parent > child` | `form > button` |
| Attribute contains | `[attr*="value"]` | `button[class*="primary"]` |
| Attribute starts | `[attr^="value"]` | `input[name^="upload"]` |
| Nth element | `:nth-of-type(n)` | `button:nth-of-type(2)` |

---

## Next Steps

1. **Open each tool page** in browser
2. **Use F12 DevTools** to find selectors
3. **Copy exact selectors** from HTML
4. **Update `playwright-video-recorder-setup.js`**
5. **Test in browser console** to verify
6. **Run script:** `node playwright-video-recorder-setup.js`
7. **Check videos** in `./videos/` folder

If any selector fails, add `wait` time between steps:
```javascript
{
  type: 'pause',
  wait: 2000,  // Wait 2 seconds
  description: 'Letting page load'
}
```

---

## Still Stuck?

If selectors aren't working:

1. **Check if page is loading:** Add screenshots
```javascript
await page.screenshot({ path: 'debug.png' });
```

2. **Check if element exists:** Add debugging
```javascript
console.log(await page.locator('button').count());
```

3. **Increase wait times:** Some tools process slower
```javascript
{ type: 'click', selector: '...', wait: 8000 } // More time
```

4. **Check CSS selector syntax:** Paste in console
```javascript
document.querySelectorAll('your-selector') // Should find elements
```

If still failing, the tool's UI might be:
- Using Shadow DOM (harder to select)
- Using iframes (separate HTML context)
- Using dynamic class names (impossible to predict)

In those cases, use Arcade.software instead (no selectors needed).

---

**When in doubt: Use Arcade.software. It doesn't require any selectors — you just click through the tool naturally.**
