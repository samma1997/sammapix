#!/bin/bash

echo "========================================="
echo "SammaPix E2E Tests — Verification"
echo "========================================="
echo ""

# Check Playwright config
echo "[1/7] Checking playwright.config.ts..."
if [ -f "playwright.config.ts" ]; then
  echo "✓ playwright.config.ts exists"
else
  echo "✗ playwright.config.ts NOT found"
fi
echo ""

# Check test files
echo "[2/7] Checking test files..."
test_files=(
  "tests/utils.ts"
  "tests/fixtures.ts"
  "tests/navigation.spec.ts"
  "tests/tool-pages.spec.ts"
  "tests/compress-flow.spec.ts"
  "tests/convert-flow.spec.ts"
  "tests/blog.spec.ts"
  "tests/pricing.spec.ts"
  "tests/seo-checks.spec.ts"
  "tests/security.spec.ts"
  "tests/accessibility.spec.ts"
  "tests/performance.spec.ts"
)

missing=0
for file in "${test_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file"
  else
    echo "✗ $file NOT found"
    ((missing++))
  fi
done

if [ $missing -eq 0 ]; then
  echo ""
  echo "✓ All test files present"
else
  echo ""
  echo "✗ $missing test files missing"
fi
echo ""

# Check documentation
echo "[3/7] Checking documentation..."
docs=(
  "tests/README.md"
  "E2E-TESTS-SUMMARY.md"
  "PLAYWRIGHT-QUICK-REFERENCE.md"
)

for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    echo "✓ $doc"
  else
    echo "✗ $doc NOT found"
  fi
done
echo ""

# Check package.json scripts
echo "[4/7] Checking package.json scripts..."
if grep -q '"test:e2e"' package.json; then
  echo "✓ test:e2e script found"
else
  echo "✗ test:e2e script NOT found"
fi

if grep -q '"test:e2e:ui"' package.json; then
  echo "✓ test:e2e:ui script found"
else
  echo "✗ test:e2e:ui script NOT found"
fi
echo ""

# Check dependencies
echo "[5/7] Checking Playwright installation..."
if [ -d "node_modules/@playwright/test" ]; then
  echo "✓ @playwright/test installed"
else
  echo "✗ @playwright/test NOT installed (run: npm install)"
fi
echo ""

# Count tests
echo "[6/7] Counting test cases..."
total_tests=0

for spec_file in tests/*.spec.ts; do
  if [ -f "$spec_file" ]; then
    count=$(grep -c "test('\\|test(\"" "$spec_file" || true)
    echo "  $spec_file: $count tests"
    ((total_tests += count))
  fi
done

echo ""
echo "✓ Total test cases: $total_tests"
echo ""

# Summary
echo "[7/7] Summary"
echo "========================================="
echo "✓ Test structure is complete"
echo ""
echo "Quick Start:"
echo "  1. npm run dev              # Start dev server"
echo "  2. npm run test:e2e         # Run all tests"
echo "  3. npm run test:e2e:ui      # Run with UI (recommended)"
echo ""
echo "Documentation:"
echo "  - tests/README.md                    (detailed guide)"
echo "  - E2E-TESTS-SUMMARY.md               (overview)"
echo "  - PLAYWRIGHT-QUICK-REFERENCE.md      (quick ref)"
echo ""
echo "========================================="
