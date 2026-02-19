export function analyzeRepeatedWords(translatedTitles) {
  const wordCount = {};

  translatedTitles.forEach(title => {
    const words = title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    words.forEach(word => {
      if (word.length > 2) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
  });

  console.log("\nREPEATED WORDS (>2 times):");

  Object.entries(wordCount)
    .filter(([word, count]) => count > 2)
    .forEach(([word, count]) => {
      console.log(`${word} → ${count} times`);
    });
}
