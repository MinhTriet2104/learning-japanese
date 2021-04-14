function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const hiraganaArray = [
  //  a
  'あ', 'い', 'う', 'え', 'お',
  //  ka
  'か', 'き', 'く', 'け', 'こ',
  //  sa
  'さ', 'し', 'す', 'せ', 'そ',
  //  ta
  'た', 'ち', 'つ', 'て', 'と',
  //  na
  'な', 'に', 'ぬ', 'ね', 'の',
  //  ha
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  //  ma
  'ま', 'み', 'む', 'め', 'も',
  //  ya
  'や',       'ゆ',      'よ',
  //  ri
  'ら', 'り', 'る', 'れ', 'ろ',
  //  wa
  'わ',                  'を', 'ん',
];

const hiraganaWithTenTenAndMaruArray = [
  //  ga
  'が', 'ぎ', 'ぐ', 'げ', 'ご',
  //  za
  'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
  //  da
  'だ', 'ぢ', 'づ', 'で', 'ど',
  //  ba
  'ば', 'び', 'ぶ', 'べ', 'ぼ',
  //  pa
  'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
];

const hiraganaCombinationArray = [
  // ki
  'きゃ', 'きゅ', 'きょ', 
  // shi
  'しゃ', 'しゅ', 'しょ', 
  // chi
  'ちゃ', 'ちゅ', 'ちょ', 
  // ni
  'にゃ', 'にゅ', 'にょ', 
  // hi
  'ひゃ', 'ひゅ', 'ひょ', 
  // mi
  'みゃ', 'みゅ', 'みょ', 
  // ri
  'りゃ', 'りゅ', 'りょ', 
  // gi
  'ぎゃ', 'ぎゅ', 'ぎょ',
  // ji 
  'じゃ', 'じゅ', 'じょ', 
  // ji
  'ぢゃ', 'ぢゅ', 'ぢょ', 
  // bi
  'びゃ', 'びゅ', 'びょ', 
  // pi
  'ぴゃ', 'ぴゅ', 'ぴょ', 
];

const smallTsuHirgana = "っ";

const katakanaArray = hiraganaArray.map((char) => wanakana.toKatakana(char));

const katakanaWithTenTenAndMaruArray = hiraganaWithTenTenAndMaruArray.map(
  (char) => wanakana.toKatakana(char)
);

const katakanaCombinationArray = hiraganaCombinationArray.map((char) =>
  wanakana.toKatakana(char)
);

const smallTsuKatakana = wanakana.toKatakana(smallTsuHirgana);

const hiraganaLength = hiraganaArray.length;
const hiraganaWithTentenAndMaruLength = hiraganaWithTenTenAndMaruArray.length;
const hiraganaCombinationLength = hiraganaCombinationArray.length;

const katakanaLength = hiraganaCombinationArray.length;
const katakanaWithTentenAndMaruLength = katakanaWithTenTenAndMaruArray.length;
const katakanaCombinationLength = hiraganaCombinationArray.length;

document.addEventListener("DOMContentLoaded", function () {
  // const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";

  // array use to random when play
  let generateArray = [];
  // array use to compare with input
  let romajiArray = [];

  const quoteDisplayElement = document.getElementById("quoteDisplay");
  const quoteInputElement = document.getElementById("quoteInput");

  const timerElement = document.getElementById("timer");
  const scoreElement = document.getElementById("score");
  const readyButton = document.getElementById("ready");
  const settingButton = document.getElementById("setting");
  const refreshButton = document.getElementById("refresh");
  const saveSettingButton = document.getElementById("saveSetting");

  const hiraganaRadio = document.getElementById("radioHiragana");
  const katakanaRadio = document.getElementById("radioKatakana");

  const tentenAndMaruCheckbox = document.getElementById("enableTenTenAndMaru");
  const combinationCheckbox = document.getElementById("enableCombination");
  const smallTsuCheckbox = document.getElementById("enableSmallTsu");
  const timeLimitCheckbox = document.getElementById("enableTimeLimit");

  let chosedJapaneseAlphabet = "Hiragana...";
  if (localStorage.getItem("isHiragana")) {
    if (localStorage.getItem("isHiragana") === "true") {
      hiraganaRadio.checked = true;
      chosedJapaneseAlphabet = "Hiragana...";
    }
    else {
      katakanaRadio.checked = true;
      chosedJapaneseAlphabet = "Katakana...";
    }
  } else {
    hiraganaRadio.checked = true;
  }
  quoteDisplayElement.innerText = chosedJapaneseAlphabet;

  if (localStorage.getItem("tentenmaru")) {
    tentenAndMaruCheckbox.checked =
      localStorage.getItem("tentenmaru") === "true";
  } else {
    tentenAndMaruCheckbox.checked = true;
  }

  if (localStorage.getItem("combination")) {
    combinationCheckbox.checked =
      localStorage.getItem("combination") === "true";
  } else {
    combinationCheckbox.checked = true;
  }

  if (localStorage.getItem("smalltsu")) {
    smallTsuCheckbox.checked = localStorage.getItem("smalltsu") === "true";
  } else {
    smallTsuCheckbox.checked = true;
  }

  // Handle Ready
  readyButton.addEventListener("click", () => {
    let startTime = 0;
    if (timeLimitCheckbox.checked) {
      startTime = Math.floor(new Date() / 1000) + 300;
    }
    let score = 0;
    let fail;

    // async function getRandomQuote() {
    //   const res = await fetch(RANDOM_QUOTE_API_URL);
    //   if (res.ok) {
    //     const data = await res.json();
    //     return data.content;
    //   } else {
    //     alert("Không lấy được dữ liệu từ API! Bấm OK để Reset trang");
    //     window.location.reload();
    //   }
    // }

    async function renderNewQuote() {
      // clear array
      generateArray.length = 0;
      romajiArray.length = 0;

      let chosedArray;
      let chosedTenTenAndMaruArray;
      let chosedCombinationArray;
      let smallTsu;

      if (hiraganaRadio.checked) {
        chosedArray = hiraganaArray;
        chosedTenTenAndMaruArray = hiraganaWithTenTenAndMaruArray;
        chosedCombinationArray = hiraganaCombinationArray;
        smallTsu = smallTsuHirgana;
      } else {
        chosedArray = katakanaArray;
        chosedTenTenAndMaruArray = katakanaWithTenTenAndMaruArray;
        chosedCombinationArray = katakanaCombinationArray;
        smallTsu = smallTsuKatakana;
      }

      generateArray = [...chosedArray];
      if (tentenAndMaruCheckbox.checked) {
        generateArray = [...generateArray, ...chosedTenTenAndMaruArray];
      }
      if (combinationCheckbox.checked) {
        generateArray = [...generateArray, ...chosedCombinationArray];
      }
      if (smallTsuCheckbox.checked) {
        generateArray.push(smallTsu);
      }
      const generateArrayLength = generateArray.length;

      // const quote = await getRandomQuote();
      const quoteWordLength = getRandomIntInclusive(5, 8);

      const arrayToCheck = [];
      // let quote = "";
      for (let i = 0; i < quoteWordLength; i++) {
        const quoteTextLength = getRandomIntInclusive(3, 5);
        for (let j = 0; j < quoteTextLength; j++) {
          // not get small tsu at first letter
          const sub = j !== 0 ? 1 : 2;
          const randomIndex = getRandomIntInclusive(
            0,
            generateArrayLength - sub
          );
          let hiraganaWord = generateArray[randomIndex];
          // handle smallTsu
          if (hiraganaWord === smallTsu) {
            // not get a, i, u, e, o & small tsu
            const randomIndexForSmallTsu = getRandomIntInclusive(
              5,
              generateArrayLength - 2
            );
            const hiraganaWordAfterSmallTsu =
              generateArray[randomIndexForSmallTsu];

            hiraganaWord += hiraganaWordAfterSmallTsu;
          }
          // quote += hiraganaWord;

          arrayToCheck.push(hiraganaWord);
          romajiArray.push(wanakana.toRomaji(hiraganaWord));
        }
        if (i !== quoteWordLength - 1) {
          // quote += " ";
          arrayToCheck.push(" ");
          romajiArray.push(" ");
        }
      }
      // quote += ".";
      arrayToCheck.push(".");
      romajiArray.push(".");

      fail = 0;
      quoteDisplayElement.innerHTML = "";
      arrayToCheck.forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.innerText = char;
        quoteDisplayElement.appendChild(charSpan);
      });
      quoteInputElement.value = "";
      console.log(`Answer: "${romajiArray.join("")}"`);
    }

    async function startTimer() {
      timerElement.innerText = 0;
      setInterval(async () => {
        const currentTime = startTime - Math.floor(new Date() / 1000);
        if (currentTime === 0) {
          const name = prompt("Game Over!\nEnter your name: ");
          if (!name) window.location.reload();
          const db = firebase.firestore();
          await db
            .collection("users")
            .add({
              name: name,
              score: score,
              date: new Date(),
            })
            .then(function (docRef) {
              console.log("Document written with ID: ", docRef.id);
              location.replace("leaderboard.html");
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
        }
        timerElement.innerText = currentTime;
      }, 1000);
    }

    quoteInputElement.addEventListener("input", () => {
      const arrayDisplay = document.querySelectorAll("span");
      const arrayInput = quoteInputElement.value.split("");
      let corect = true;

      let sumPrevRomajiLength = 0;
      romajiArray.forEach((romaji, index) => {
        if (index === 0) {
          sumPrevRomajiLength = 0;
        } else {
          sumPrevRomajiLength += romajiArray[index - 1].length;
        }

        let char = "";
        for (
          let i = sumPrevRomajiLength;
          i < sumPrevRomajiLength + romaji.length;
          i++
        ) {
          if (!arrayInput[i]) {
            char = false;
            break;
          }
          char += arrayInput[i];
        }
        if (!char) {
          arrayDisplay[index].classList.remove("correct");
          arrayDisplay[index].classList.remove("incorrect");
          corect = false;
        } else if (char.toLowerCase() === romaji) {
          arrayDisplay[index].classList.add("correct");
          arrayDisplay[index].classList.remove("incorrect");
        } else {
          arrayDisplay[index].classList.add("incorrect");
          arrayDisplay[index].classList.remove("correct");
          fail++;
          corect = false;
        }
      });

      if (corect) {
        score += arrayDisplay.length * 10 - fail * 3;
        scoreElement.innerText = score;
        renderNewQuote();
      }
    });

    readyButton.style.display = "none";
    settingButton.style.display = "none";
    quoteInputElement.removeAttribute("disabled");
    quoteInputElement.focus();
    renderNewQuote();
    startTime && startTimer();
  });

  // Handle Setting
  saveSettingButton.addEventListener("click", () => {
    if (hiraganaRadio.checked) {
      localStorage.setItem("isHiragana", true);
      chosedJapaneseAlphabet = "Hiragana...";
    } else {
      localStorage.setItem("isHiragana", false);
      chosedJapaneseAlphabet = "Katakana...";
    }
    quoteDisplayElement.innerText = chosedJapaneseAlphabet;

    if (tentenAndMaruCheckbox.checked) {
      localStorage.setItem("tentenmaru", true);
    } else {
      localStorage.setItem("tentenmaru", false);
    }

    if (combinationCheckbox.checked) {
      localStorage.setItem("combination", true);
    } else {
      localStorage.setItem("combination", false);
    }

    if (smallTsuCheckbox.checked) {
      localStorage.setItem("smalltsu", true);
    } else {
      localStorage.setItem("smalltsu", false);
    }
  });

  refreshButton.addEventListener("click", () => {
    readyButton.style.display = "inline-block";
    settingButton.style.display = "inline-block";

    scoreElement.innerText = 0;
    quoteDisplayElement.innerText = chosedJapaneseAlphabet;
    quoteInputElement.value = "Romaji...";
    quoteInputElement.setAttribute("disabled", true);
  });
});
