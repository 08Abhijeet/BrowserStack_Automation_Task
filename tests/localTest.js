import { createLocalDriver } from "../src/drivers/localDriver.js";
import { scrapeArticles } from "../src/utils/scraperInfo.js";
import { translateText } from "../src/utils/headerTranslator.js";
import { analyzeRepeatedWords } from "../src/utils/wordFreq.js";

async function runLocalTest() {

  const driver = await createLocalDriver();

  try {

    console.log("\n🚀 Running Local Test...\n");

    const articles = await scrapeArticles(driver, "Local");

    const translatedTitles = [];

    for (let article of articles) {
      const translated = await translateText(article.title);
      translatedTitles.push(translated);
    }

    console.log("\n== TRANSLATED TITLES ==\n");

    translatedTitles.forEach((title, index) => {
      console.log(`${index + 1}. ${title}`);
    });

    console.log("\n== REPEATED WORDS ==\n");

    analyzeRepeatedWords(translatedTitles);

    console.log("\n✅ Local Test Completed Successfully\n");

  } catch (err) {

    console.error("\n❌ Local Test Failed:\n", err);

  } finally {

    await driver.quit();
  }
}

runLocalTest();
