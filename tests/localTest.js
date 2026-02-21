import { createLocalDriver } from "../src/drivers/localDriver.js";
import { scrapeArticles } from "../src/utils/scraperInfo.js";
import { analyzeRepeatedWords } from "../src/utils/wordFreq.js";

async function runLocalTest() {
  const driver = await createLocalDriver();

  try {
    console.log("\n🚀 Running Local Test...\n");

    const articles = await scrapeArticles(driver, "Local");

    const translatedTitles = articles.map(article => article.translatedTitle);

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