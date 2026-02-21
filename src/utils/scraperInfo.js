import { By, until } from "selenium-webdriver";
import fs from "fs/promises"; // <-- NEW: Imported Node's file system for JSON saving
import { downloadImage } from "./imageDownloader.js";
import { ELPAIS_BASE_URL, ELPAIS_OPINION_URL, ARTICLE_COUNT } from "../config/constants.js";
import { translateText } from "./headerTranslator.js";

async function getTextWithRetry(element, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      return await element.getText();
    } catch (err) {
      if (err.name !== "StaleElementReferenceError") throw err;
    }
  }
  return "";
}

async function getAttributeWithRetry(element, attr, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      return await element.getAttribute(attr);
    } catch (err) {
      if (err.name !== "StaleElementReferenceError") throw err;
    }
  }
  return null;
}

export async function scrapeArticles(driver, browserName = "default") {
  const results = [];
  
  // Arrays to hold our titles for the final output
  const spanishTitles = [];
  const englishTitles = [];

  console.log(`[${browserName}] Navigating to ${ELPAIS_BASE_URL}...`);
  await driver.get(ELPAIS_BASE_URL);

  console.log(`[${browserName}] Navigating to ${ELPAIS_OPINION_URL}...`);
  await driver.get(ELPAIS_OPINION_URL);
  await driver.wait(until.elementLocated(By.css("article")), 10000);

  // Collect up to ARTICLE_COUNT article links
  const articleLinkElements = await driver.findElements(By.css("article h2 a"));
  const links = [];

  for (let linkEl of articleLinkElements) {
    try {
      const href = await getAttributeWithRetry(linkEl, "href");
      const titleCheck = await getTextWithRetry(linkEl);
      if (titleCheck && titleCheck.trim().length > 20 && href) {
        links.push(href);
      }
      if (links.length === ARTICLE_COUNT) break;
    } catch { continue; }
  }

  // Visit each article
  for (let i = 0; i < links.length; i++) {
    const url = links[i];
    await driver.get(url);
    await driver.wait(until.elementLocated(By.css("article")), 10000);

    // Title extraction with fallbacks
    let title = "";
    try {
      const metaTitle = await driver.findElement(By.css('meta[property="og:title"]'));
      title = await getAttributeWithRetry(metaTitle, "content");
    } catch { }

    if (!title || title.trim().length < 10) {
      try {
        const h1s = await driver.findElements(By.css("h1"));
        for (let h1 of h1s) {
          const text = await getTextWithRetry(h1);
          if (text && text.trim().length > 10) {
            title = text;
            break;
          }
        }
      } catch { }
    }

    if (!title || title.trim().length < 10) {
      title = await driver.getTitle();
    }

    // Content extraction inside <article>
    let content = "";
    try {
      const paragraphs = await driver.findElements(By.css("article p"));
      for (let j = 0; j < paragraphs.length; j++) {
        try {
          const paras = await driver.findElements(By.css("article p")); // refetch to avoid stale
          const text = await getTextWithRetry(paras[j]);
          if (!text || text.trim().length < 30) continue;
          content += text + "\n";
        } catch { continue; }
      }
      content = content.trim();
    } catch { }

    console.log(`\n[${browserName}] SPANISH TITLE:\n`, title);
    console.log(`[${browserName}] SPANISH CONTENT:\n`, content);

    spanishTitles.push(title);
    
    let translatedTitle = "Translation failed";
    try {
      translatedTitle = await translateText(title);
    } catch (err) {
      console.log(`[${browserName}] Translation error for article ${i + 1}`);
    }
    englishTitles.push(translatedTitle);

    // image Downloader
    let imageFilename = `article-${i + 1}.jpg`;
    try {
      const img = await driver.findElement(By.css("article figure img"));
      const imgUrl = await getAttributeWithRetry(img, "src");
      if (imgUrl) {
        await downloadImage(imgUrl, imageFilename);
      }
    } catch {
      console.log(`[${browserName}] No image found ❌`);
    }

    // Pushing both versions of the title to your results array 
    results.push({ 
      title, 
      translatedTitle, 
      content, 
      imageUrl: `images/${imageFilename}` 
    });
  }


  console.log(`\n========================================`);
  console.log(`[${browserName}] SCRAPING COMPLETE`);
  console.log(`========================================\n`);

  console.log(`--- ALL SPANISH TITLES ---`);
  spanishTitles.forEach((t, idx) => console.log(`${idx + 1}. ${t}`));

  console.log(`\n--- ALL ENGLISH TRANSLATED TITLES ---`);
  englishTitles.forEach((t, idx) => console.log(`${idx + 1}. ${t}`));
  
  console.log(`\n========================================\n`);

  return results;
}