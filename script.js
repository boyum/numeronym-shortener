const input = document.querySelector("input");
const resultEl = document.querySelector(".result");

if (!input || !resultEl) {
  throw new Error("Could not find 'input' or '.result' elements.");
}

input.addEventListener("input", () => {
  input.value = cleanValue(input.value);

  const shortenedWords = shortenWords(input.value);
  resultEl.textContent =
    shortenedWords.length > 0 ? shortenedWords.join(" ") : "";
});

/**
 * @param {string} str
 * @returns {string}
 */
function cleanValue(str) {
  return str
    .replace(/[|"'_\.\,\-\#\!\¤\%\&\/\`\(\)\\\=\?\+\{\}\~\¨\^\*]/gi, "")
    .replace(/\s{2,}/gi, " ");
}

/**
 * @param {string} wordsString
 * @returns {Array<string>}
 */
function shortenWords(wordsString) {
  const words = wordsString.split(" ");
  return words.map(shortenWord);
}

/**
 * @param {string} word
 * @returns {string}
 */
function shortenWord(word) {
  word = word.toLowerCase();

  if (word.length <= 2) {
    return word;
  }

  const firstLetter = word[0];
  const lastLetter = word[word.length - 1];
  const inbetweenLetters = word.slice(1, word.length - 1);

  return `${firstLetter}${inbetweenLetters.length}${lastLetter}`;
}

const queryParams = new URL(location.href).searchParams;
const queryWord = queryParams.get("word");

if (queryWord) {
  input.value = cleanValue(queryWord);

  const shortenedWords = shortenWords(input.value);
  resultEl.textContent =
    shortenedWords.length > 0 ? shortenedWords.join(" ") : "";
}
