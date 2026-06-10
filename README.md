# E-Commerce Automation Framework

🚀 Modern UI Automation Framework demonstrating QA Engineering, POM design, 15+ tests, CI pipeline, and professional documentation.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Test Scenarios](#test-scenarios)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [CI/CD](#cicd)
- [Test Reports](#test-reports)
- [Best Practices](#best-practices)
- [Author](#author)

---

## 🎯 Overview

This is a complete e-commerce automation framework built with **Playwright** and **TypeScript**. It includes **30+ automated test cases** covering login, product browsing, cart management, and checkout processes.

The framework follows **industry standards**:
- ✅ **Page Object Model (POM)** design pattern
- ✅ **Cross-browser testing** (Chrome + Firefox)
- ✅ **CI/CD integration** with GitHub Actions
- ✅ **Professional test reports** with screenshots
- ✅ **Auto screenshots** on test failure

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **30+ Test Cases** | Complete e-commerce flow coverage |
| **POM Design** | Maintainable, reusable page classes |
| **Cross-Browser** | Tests run on Chrome + Firefox |
| **CI/CD Pipeline** | Automated testing on GitHub Actions |
| **Smart Assertions** | Verifies expected results |
| **Auto Screenshots** | Captures failure state automatically |
| **Parallel Execution** | Runs 4 tests simultaneously |
| **Retry Failed Tests** | Retries up to 2 times (CI only) |

---

## 🛠️ Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Playwright** | 1.40+ | Browser automation framework |
| **TypeScript** | 5.0+ | Type-safe testing language |
| **Node.js** | 18+ | JavaScript runtime |
| **GitHub Actions** | Latest | CI/CD automation |
| **VS Code** | Latest | Code editor |

---

## 📋 Test Scenarios Covered

### 🔐 Login (5 tests)

| Test ID | Test Case | Expected Result |
|---------|-----------|-----------------|
| TC_LOGIN_001 | Successful login with valid credentials | User logged in, products visible |
| TC_LOGIN_002 | Login fails with invalid password | Error message appears |
| TC_LOGIN_003 | Login fails with empty username | Validation error appears |
| TC_LOGIN_004 | Login fails with empty password | Validation error appears |
| TC_LOGIN_005 | Login fails with empty username, password | Validation error appears |

### 🛍️ Products (4 tests)

| Test ID | Test Case | Expected Result |
|---------|-----------|-----------------|
| TC_PROD_001 | Products page loads successfully | Products visible |
| TC_PROD_002 | Can view product details | Description, price visible |
| TC_PROD_003 | Can filter product by category | Category products show |
| TC_PROD_004 | Can add product to cart | Cart shows added product |

### 🛒 Cart (3 tests)

| Test ID | Test Case | Expected Result |
|---------|-----------|-----------------|
| TC_CART_001 | Cart shows added products | Product in cart |
| TC_CART_002 | Can remove product from cart | Product removed |
| TC_CART_003 | Cart total item count is correct | Correct price |

### 💳 Checkout (7 tests)

| Test ID | Test Case | Expected Result |
|---------|-----------|-----------------|
| TC_CHECK_001 | Can complete checkout | Order completes |
| TC_CHECK_002 | Checkout fails only enter first name | Error messages |
| TC_CHECK_003 | Checkout fails only enter last name | Error messages |
| TC_CHECK_004 | Checkout fails only enter zip/postal code | Error messages |
| TC_CHECK_005 | Checkout fails without enter zip/postal code | Error messages |
| TC_CHECK_006 | Checkout fails without enter first name | Error messages |
| TC_CHECK_007 | Checkout fails without enter last name | Error messages |

**Total: 15+ Test Cases**

---

## 🏗️ Project Structure

e-commerce-automation/
├── .github/
│ └── workflows/
│ └── test.yml # CI/CD pipeline
├── pages/
│ ├── LoginPage.ts # Login page class (POM)
│ ├── ProductsPage.ts # Products page class (POM)
│ ├── CartPage.ts # Cart page class (POM)
│ └── CheckoutPage.ts # Checkout page class (POM)
├── tests/
│ ├── login.spec.ts # Login tests (3 tests)
│ ├── products.spec.ts # Products tests (5 tests)
│ ├── cart.spec.ts # Cart tests (5 tests)
│ ├── checkout.spec.ts # Checkout tests (5 tests)
│ └── advanced.spec.ts # Advanced tests (7 tests)
├── playwright.config.ts # Playwright configuration
├── package.json # Dependencies
├── tsconfig.json # TypeScript configuration
└── README.md # Documentation

## 🚀 Installation

### Step 1: Install Node.js

```bash
# Download from: https://nodejs.org/
# Or use command (Ubuntu):
curl -fsSL https://deb.nodesource.com/lts | bash -
sudo apt install -y nodejs

# Verify:
node -v  # Should show v18+
npm -v   # Should show npm version
```

### Step 2: Install Dependencies

```bash
# Navigate to project:
cd e-commerce-automation

# Install dependencies:
npm install

# Install Playwright browsers:
npx playwright install
```

### Step 3: Install VS Code Extensions

- Playwright (official)
- GitLens
- ESLint
- Prettier

---

## 🏃 Usage

### Run All Tests

```bash
# Run all tests:
npx playwright test

# Run with visible browser:
npx playwright test --headed

# Run in debug mode:
npx playwright test --debug
```

### Run Specific Test File

```bash
# Run login tests:
npx playwright test tests/login.spec.ts

# Run products tests:
npx playwright test tests/products.spec.ts
```

### Cross-Browser Testing

```bash
# Run on both browsers (Chrome + Firefox):
npx playwright test

# Run only on Chrome:
npx playwright test --project=chromium

# Run only on Firefox:
npx playwright test --project=firefox
```

### View Test Report

```bash
# Open HTML report:
npx playwright show-report

# Report location:
playwright-report/
```

---

## 🔄 CI/CD

### GitHub Actions Workflow

Tests run automatically on **GitHub Actions** when:
- Code is pushed to `main` branch
- Pull request is created

### Workflow File

```yaml
# .github/workflows/test.yml
name: Run Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test
```

### View CI/CD Status

1. Go to GitHub repository
2. Click "Actions" tab
3. View workflow status

---

## 📊 Test Reports

### HTML Report

```bash
# Open report:
npx playwright show-report
```

**Report includes:**
- Test results (passed/failed)
- Screenshots on failure
- Execution time
- Test details

### Screenshots

```typescript
// Auto screenshot on failure:
// Configured in playwright.config.ts
screenshot: 'only-on-failure'
```

**Screenshot location:**

test-results/
├── login-successful-login-with-valid-credentials-chromium/
│ └── screenshot.png


---

## 🎯 Best Practices

### 1. **Use Semantic Locators**

```typescript
// ✅ GOOD: Semantic locators
await page.getByRole('button', { name: 'Login' }).click();
await page.getByLabel('Username').fill('user');

// ❌ BAD: CSS/XPath (fragile)
await page.$('.btn-primary').click();
await page.$x('//button').click();
```

**Why?** Semantic locators are stable, readable, and accessible. CSS/XPath break when website updates.

---

### 2. **Always Add Assertions**

```typescript
// ✅ GOOD: Test with assertions
await page.getByRole('button').click();
await expect(page.getByText('Welcome')).toBeVisible();

// ❌ BAD: Test without assertions
await page.getByRole('button').click();
// No verification = useless test
```

**Why?** Tests without assertions don't verify results. Every test should have 1-3 assertions.

---

### 3. **Use Page Object Model**

```typescript
// ✅ GOOD: POM
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('user', 'pass');

// ❌ BAD: Direct page interactions
await page.goto('https://...');
await page.getByLabel('Username').fill('user');
await page.getByLabel('Password').fill('pass');
```

**Why?** POM makes tests maintainable. When website changes, update page class (1 place), not all tests (25 places).

---

### 4. **Use Async/Await**

```typescript
// ✅ GOOD: async/await
await page.goto('https://...');
await page.getByRole('button').click();

// ❌ BAD: No await
page.goto('https://...');
page.getByRole('button').click();
// Tests fail randomly
```

**Why?** Playwright is asynchronous. Without `await`, operations don't wait for completion.

---

### 5. **Test Both Positive & Negative Cases**

```typescript
// ✅ GOOD: Positive test
await loginPage.login('valid_user', 'valid_pass');
expect(await loginPage.isLoggedIn()).toBe(true);

// ✅ GOOD: Negative test
await loginPage.login('valid_user', 'invalid_pass');
expect(await loginPage.getErrorMessage()).toContain('Incorrect password');
```

**Why?** Companies require negative testing to verify error handling.

---

## 👨‍💻 Author

**Chandima Nanayakkara**  
QA Automation Engineer  
Colombo, Sri Lanka

📧 Email: chandimananayakkara94@gmail.com  
🔗 GitHub: [your-github-username](https://github.com/chandimananayakkara)  
💼 LinkedIn: [your-linkedin](https://www.linkedin.com/in/chandima-nanayakkara/)

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🙏 Acknowledgments

- [Playwright Documentation](https://playwright.dev)
- [Microsoft](https://microsoft.com) - Playwright creators
- [Sauce Demo](https://www.saucedemo.com) - Test website

---

## 📞 Contact

If you have questions or want to collaborate:

- Email: chandimananayakkara94@gmail.com
- LinkedIn: [your-linkedin](https://github.com/chandimananayakkara)
- GitHub Issues: [Create issue](https://github.com/- LinkedIn: [your-linkedin](https://github.com/chandimananayakkara)
/e-commerce-automation/issues)

---

**Last Updated:** June 2026  
**Version:** 1.0.0  
**Test Coverage:** 15+ tests  
**Status:** ✅ All tests passing