import { createBrowserStackDriver } from "../src/drivers/browserStackDriver.js";
import { capabilities } from "../src/config/browsers.js";
import { scrapeArticles } from "../src/utils/ElPaisScraper.js";
import { translateText } from "../src/utils/headerTranslator.js";
import { analyzeRepeatedWords } from "../src/utils/freqCounter.js";

async function runTest(cap) {

    const browserName = (cap.browserName || cap.deviceName || "Unknown").replace(/ /g, "_");

    console.log(`\n🚀 [${browserName}] Running Test...\n`);

    const driver = await createBrowserStackDriver(cap);

    try {

        const articles = await scrapeArticles(driver, browserName);

        const translatedTitles = [];

        for (let article of articles) {
            const translated = await translateText(article.title);
            translatedTitles.push(translated);
        }

        console.log(`\n[${browserName}] ==  TRANSLATED TITLES ==\n`);

        translatedTitles.forEach((title, index) => {
            console.log(`[${browserName}] ${index + 1}. ${title}`);
        });

        console.log(`\n[${browserName}] == REPEATED WORDS ==\n`);

        // Note: analyzeRepeatedWords logs to console directly, might need update if we want prefix there too.
        // For now, let's keep it simple or wrap it.
        analyzeRepeatedWords(translatedTitles);

        await driver.executeScript(
            'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Test completed successfully"}}'
        );

        console.log(`\n✅ [${browserName}] Test Passed\n`);

    } catch (err) {

        console.error(`\n❌ [${browserName}] Test Failed:\n`, err);

        await driver.executeScript(
            'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Test failed"}}'
        );

    } finally {

        await driver.quit();
    }
}

// Run all capabilities in parallel
Promise.all(capabilities.map((cap) => runTest(cap)));
