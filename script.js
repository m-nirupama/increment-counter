const wordsTextarea = document.querySelector(".word-counter-container .words");
const countBtn = document.querySelector(".word-counter-container .count-btn");
const wordCount = document.querySelector(".word-counter-container .word-count span");

const countWords = () => {
  let words = wordsTextarea.value;
  let wordsTrimmed = words.replace(/\s+/g, " ").trim();
  let splitWords = wordsTrimmed.split(" ");

  let numberOfWords = splitWords.length;
  if (splitWords[0] === "") {
    numberOfWords = 0;
  }

  wordCount.innerHTML = numberOfWords;
};

const storeWordCount = async (count) => {
  try {
    const response = await fetch('http://localhost:3000/storeWordCount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Server Response:', data);
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

countBtn.addEventListener("click", async () => {
  countWords();
  const currentWordCount = wordCount.innerHTML;

  // Store the word count in MongoDB
  await storeWordCount(currentWordCount);

  // Notify the user
  alert('Word count has been updated and stored!');
});
