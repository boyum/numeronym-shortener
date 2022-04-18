const input = document.querySelector("input");
const resultEl = document.querySelector(".result");

input.addEventListener("input", () => {
  input.value = cleanValue(input.value);

  const shortenedWords = shortenWords(input.value);
  resultEl.textContent =
    shortenedWords.length > 0 ? shortenedWords.join(" ") : "";
});

function cleanValue(str) {
  return str
    .replace(/[|"'_\.\,\-\#\!\¤\%\&\/\`\(\)\\\=\?\+\{\}\~\¨\^\*]/gi, "")
    .replace(/\s{2,}/gi, " ");
}

function shortenWords(wordsString) {
  const words = wordsString.split(" ");
  return words.map(shortenWord);
}

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

if (queryParams.has("word")) {
  input.value = cleanValue(queryParams.get("word"));

  const shortenedWords = shortenWords(input.value);
  resultEl.textContent =
    shortenedWords.length > 0 ? shortenedWords.join(" ") : "";
}
