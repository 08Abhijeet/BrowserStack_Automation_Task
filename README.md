# 🌐 El País Opinion Scraper — Selenium + BrowserStack

> **Automated web scraper** that extracts the first 5 opinion articles from [El País](https://elpais.com/opinion/), translates their titles from Spanish → English using RapidAPI, analyzes repeated words, and downloads article cover images. Runs locally (Chrome) and in parallel across 5 browsers/devices via **BrowserStack Automate**.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Setup Instructions](#-setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Setting Up Selenium in VS Code](#4-setting-up-selenium-in-vs-code)
- [Running the Tests](#-running-the-tests)
  - [Local Driver](#local-driver)
  - [BrowserStack Driver](#browserstack-driver)
- [How It Works](#-how-it-works)
- [Browser Automation Screenshots](#-browser-automation-screenshots)
- [Project Architecture](#-project-architecture)
- [Dependencies](#-dependencies)
- [Environment Variables Reference](#-environment-variables-reference)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Project Overview

This project automates browser-based web scraping using **Selenium WebDriver** (Node.js). It targets the **Opinion section of El País** (a major Spanish newspaper) and:

1. Navigates to `https://elpais.com/opinion/`
2. Scrapes the **first 5 article** titles and content
3. **Translates titles** from Spanish to English via RapidAPI
4. **Downloads cover images** for each article
5. **Analyzes repeated words** across translated titles
6. Prints all results to the console in a clean, formatted output

The scraper supports two execution modes:
- **Local mode** – runs on your machine using Google Chrome
- **BrowserStack mode** – runs in **parallel across 5 browser/OS/device configurations** using BrowserStack Automate

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Web Scraping** | Extracts article title, content, and cover image from El País Opinion |
| 🌍 **Translation** | Translates Spanish titles → English using RapidAPI Translate |
| 🖼️ **Image Download** | Downloads and saves article cover images to `/images` folder |
| 📊 **Word Frequency** | Analyzes and prints repeated words (>2 occurrences) across titles |
| 🖥️ **Local Execution** | Runs on local Chrome browser via ChromeDriver |
| ☁️ **Cloud Execution** | Runs in parallel on BrowserStack Automate cloud |
| ⚡ **Parallel Threads** | 5 simultaneous browser sessions run concurrently on BrowserStack |
| 🔄 **Retry Logic** | Handles `StaleElementReferenceError` with automatic retries |

---

## 📁 Project Structure

```
BrowserStack_Task/
│
├── 📂 src/
│   ├── 📂 config/
│   │   ├── browsers.js          # BrowserStack capabilities & browser configs
│   │   └── constants.js         # Base URLs and article count constant
│   │
│   ├── 📂 drivers/
│   │   ├── browserStackDriver.js # Creates BrowserStack remote WebDriver
│   │   └── localDriver.js        # Creates local Chrome WebDriver
│   │
│   └── 📂 utils/
│       ├── scraperInfo.js        # Core scraping logic (title, content, images)
│       ├── headerTranslator.js   # RapidAPI translation (ES → EN)
│       ├── imageDownloader.js    # Downloads & saves article cover images
│       └── wordFreq.js           # Word frequency analyzer
│
├── 📂 tests/
│   ├── localTest.js              # Entry point for local browser test
│   └── browserStackTest.js       # Entry point for BrowserStack parallel test
│
├── 📂 images/                    # Downloaded article images (auto-generated)
│   ├── article-1.jpg
│   ├── article-2.jpg
│   ├── article-3.jpg
│   ├── article-4.jpg
│   └── article-5.jpg
│
├── 📂 assets/
│   └── 📂 screenshots/           # Browser automation screenshots
│
├── .env                          # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Prerequisites

Before setting up, make sure you have the following installed:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | v18+ (LTS recommended) | [nodejs.org](https://nodejs.org/) |
| **npm** | v9+ (comes with Node.js) | — |
| **Google Chrome** | Latest | [google.com/chrome](https://www.google.com/chrome/) |
| **Git** | Any | [git-scm.com](https://git-scm.com/) |
| **VS Code** | Latest | [code.visualstudio.com](https://code.visualstudio.com/) |

You will also need accounts for:
- **BrowserStack** – [Sign up free](https://www.browserstack.com/) (for cloud testing)
- **RapidAPI** – [Sign up free](https://rapidapi.com/) and subscribe to `rapid-translate-multi-traduction`

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/BrowserStack_Task.git
cd BrowserStack_Task
```

---

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages listed in `package.json`:

| Package | Purpose |
|---|---|
| `selenium-webdriver` | Browser automation |
| `axios` | HTTP requests for RapidAPI translation |
| `dotenv` | Load environment variables from `.env` |
| `fs-extra` | File system utilities for image saving |
| `mocha` | Test runner (optional) |

---

### 3. Configure Environment Variables

Create a `.env` file in the project root (it is **gitignored** for security):

```env
BROWSERSTACK_USERNAME=your_browserstack_username
BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key
RAPID_API_KEY=your_rapidapi_key
```

#### How to get your credentials:

**BrowserStack credentials:**
1. Log in to [browserstack.com](https://www.browserstack.com/)
2. Go to **Account → Settings** (or your profile icon)
3. Copy your **Username** and **Access Key**

**RapidAPI Key:**
1. Log in to [rapidapi.com](https://rapidapi.com/)
2. Search for **"Rapid Translate Multi Traduction"**
3. Subscribe to the API (free tier available)
4. Copy your **X-RapidAPI-Key** from the API page

---

### 4. Setting Up Selenium in VS Code

Follow these steps to get a productive Selenium development environment in VS Code:

#### Step 1: Install VS Code Extensions

Open VS Code and install these extensions from the Extensions Marketplace (`Ctrl+Shift+X`):

| Extension | Purpose |
|---|---|
| **ESLint** | JavaScript linting |
| **Prettier** | Code formatting |
| **JavaScript (ES6) code snippets** | Helpful code shortcuts |
| **DotENV** | `.env` file syntax highlighting |
| **GitLens** | Enhanced Git integration |

#### Step 2: Install ChromeDriver (Automatic with Selenium 4)

With `selenium-webdriver` v4+, ChromeDriver is **automatically managed** — no manual installation needed! The correct driver version is downloaded for your Chrome version automatically.

> [!NOTE]
> If you get a ChromeDriver error, ensure your Google Chrome browser is up to date.

#### Step 3: Configure `jsconfig.json` for IntelliSense

Create a `jsconfig.json` at the project root for better code completion:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Node",
    "target": "ES2022"
  },
  "include": ["src/**/*", "tests/**/*"]
}
```

#### Step 4: VS Code Settings

Add these to your `.vscode/settings.json` for the best experience:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2
}
```

#### Step 5: Run Scripts via VS Code Terminal

Open the integrated terminal in VS Code with `` Ctrl+` `` and run the commands below.

---

## ▶️ Running the Tests

### Local Driver

Runs a single Chrome session on **your local machine**.

```bash
npm run local
```

**What happens:**
1. Opens a Chrome browser window
2. Navigates to `https://elpais.com/opinion/`
3. Scrapes the first 5 articles (title + content)
4. Prints Spanish title & content for each article
5. Translates each title to English via RapidAPI
6. Downloads article cover images to `/images/`
7. Prints a final summary of all Spanish & English titles
8. Analyzes and prints repeated words from translated titles

**Expected console output:**
```
🚀 Running Local Test...

[Local] Navigating to https://elpais.com/...
[Local] Navigating to https://elpais.com/opinion/...

[Local] SPANISH TITLE:
 El artículo de opinión...
[Local] SPANISH CONTENT:
 Lorem ipsum dolor sit amet...

========================================
[Local] SCRAPING COMPLETE
========================================

--- ALL SPANISH TITLES ---
1. El artículo de opinión...
...

--- ALL ENGLISH TRANSLATED TITLES ---
1. The opinion article...
...

✅ Local Test Completed Successfully
```

---

### BrowserStack Driver

Runs 5 **parallel test sessions** on BrowserStack cloud across different browsers and devices simultaneously.

```bash
npm run browserstack
```

**What happens:**
1. Reads 5 browser/device capability configurations from `src/config/browsers.js`
2. Spins up 5 parallel WebDriver sessions on BrowserStack Automate
3. Each session independently scrapes El País opinion articles
4. Results for all 5 browsers are printed concurrently to your console (prefixed by browser name)
5. Session status (`passed`/`failed`) is reported back to BrowserStack dashboard

**Browser configurations used:**

| # | Browser | OS | Device |
|---|---|---|---|
| 1 | Chrome (latest) | Windows 11 | Desktop |
| 2 | Firefox (latest) | Windows 11 | Desktop |
| 3 | Edge (latest) | Windows 11 | Desktop |
| 4 | Chrome (latest) | Android 14 | Google Pixel 8 Pro |

**Expected console output (interleaved from 5 threads):**
```
🚀 [Chrome] Running Test...
🚀 [Firefox] Running Test...
🚀 [Edge] Running Test...
🚀 [Google_Pixel_8_Pro] Running Test...

[Chrome] Navigating to https://elpais.com/...
[Firefox] Navigating to https://elpais.com/...
...

✅ [Chrome] Test Passed
✅ [Firefox] Test Passed
...
```

---

## 🔬 How It Works

### Scraping Flow

```
1. Navigate to https://elpais.com (accept cookies)
       ↓
2. Navigate to https://elpais.com/opinion/
       ↓
3. Find all <article h2 a> elements → collect first 5 valid links
       ↓
4. For each article URL:
   a. Navigate to the article page
   b. Extract title (og:meta → h1 → page title fallback)
   c. Extract content (<article p> elements, >30 chars)
   d. Download cover image (<article figure img>)
   e. Translate title via RapidAPI (Spanish → English)
       ↓
5. Print formatted summary to console
       ↓
6. Analyze repeated words across all translated titles
```

### Translation Flow

```
Spanish Title
     ↓
POST https://rapid-translate-multi-traduction.p.rapidapi.com/t
  { from: "es", to: "en", q: "<title>" }
     ↓
English Title (returned in response.data[0])
```

### Parallel Execution (BrowserStack)

```javascript
// browserStackTest.js
Promise.all(capabilities.map((cap) => runTest(cap)));
// All 5 browser sessions start simultaneously using Promise.all
```

---

## 📸 Browser Automation Screenshots

Below are screenshots captured during test execution across different browsers.

| Screenshot | Description |
|---|---|
| `assets/screenshots/screenshot1.png` | El País homepage navigation |
| `assets/screenshots/screenshot2.png` | Opinion section loaded |
| `assets/screenshots/screenshot3.png` | Article page with content |
| `assets/screenshots/screenshot4.png` | BrowserStack parallel sessions dashboard |
| `assets/screenshots/screenshot5.png` | Console output with translated titles |

### How to Capture Screenshots During Tests

Add this snippet in your test code to save a screenshot at any point:

```javascript
import fs from "fs/promises";

// Inside your test, after driver is created:
const screenshot = await driver.takeScreenshot();
await fs.writeFile("assets/screenshots/my-screenshot.png", screenshot, "base64");
console.log("Screenshot saved!");
```

### Viewing BrowserStack Session Recordings

After running `npm run browserstack`:
1. Log in to [automate.browserstack.com](https://automate.browserstack.com/)
2. Go to **Builds → "ElPais Assignment Build"**
3. Click any session to see **video recording**, **console logs**, and **network logs**

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Test Entry Points                    │
│   tests/localTest.js          tests/browserStackTest.js │
└──────────────┬──────────────────────────┬───────────────┘
               │                          │
       ┌───────▼───────┐        ┌─────────▼──────────┐
       │  localDriver  │        │ browserStackDriver  │
       │  (Chrome)     │        │ (Remote sessions)   │
       └───────┬───────┘        └─────────┬───────────┘
               │                          │
               └──────────┬───────────────┘
                          │
               ┌──────────▼──────────────┐
               │      scraperInfo.js      │
               │  (Core scraping logic)   │
               └──┬──────────┬──────────┬┘
                  │          │          │
       ┌──────────▼──┐  ┌────▼───┐  ┌──▼────────────┐
       │ translator  │  │ image  │  │  wordFreq.js   │
       │   (RapidAPI)│  │Downldr │  │ (word analysis)│
       └─────────────┘  └────────┘  └───────────────┘
```

---

## 📦 Dependencies

```json
{
  "selenium-webdriver": "^4.40.0",   // Browser automation
  "axios": "^1.13.5",                // HTTP client for RapidAPI
  "dotenv": "^17.3.1",               // .env file loader
  "fs-extra": "^11.3.3",             // Enhanced file system
  "mocha": "^11.7.5"                 // Test runner
}
```

---

## 🔑 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `BROWSERSTACK_USERNAME` | For BrowserStack runs | Your BrowserStack username |
| `BROWSERSTACK_ACCESS_KEY` | For BrowserStack runs | Your BrowserStack access key |
| `RAPID_API_KEY` | Always | Your RapidAPI key for translation |

---

## 🐛 Troubleshooting

### ChromeDriver version mismatch
```
Error: SessionNotCreatedException: Chrome version must be >= ...
```
**Fix:** Update Google Chrome to the latest version. Selenium 4 auto-downloads the matching ChromeDriver.

---

### BrowserStack Authentication error
```
Error: 401 Unauthorized
```
**Fix:** Double-check `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` in your `.env` file. Ensure there are no extra spaces or quotes.

---

### RapidAPI translation fails
```
Translation error for article X
```
**Fix:**
1. Verify `RAPID_API_KEY` in `.env` is correct
2. Ensure you have subscribed to the **"Rapid Translate Multi Traduction"** API on RapidAPI
3. Check your RapidAPI usage quota hasn't been exceeded

---

### StaleElementReferenceError
This is handled automatically with retry logic in `scraperInfo.js`. If you see repeated failures, the page structure may have changed.

---

### El País cookie banner blocking scraping
**Fix:** The scraper navigates to `baseURL` first to trigger the cookie consent, then navigates to the Opinion section. If this still blocks, add a manual cookie dismissal step:
```javascript
await driver.findElement(By.id("didomi-notice-agree-button")).click();
```

---

## 📝 License

ISC

---

## 👤 Author

Built as a BrowserStack automation assessment task using Node.js + Selenium WebDriver.
