function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const grammaArray = [
  {
    vi: "Tôi",
    ja: "わたし",
  },
  {
    vi: "Chúng tôi",
    ja: "わたしたち",
  },
  {
    vi: "Anh/chị, ông/bà, bạn (ngôi thứ 2 số ít)",
    ja: "あなた",
  },
  {
    vi: "người kia, người đó, anh kia, chị kia",
    ja: "あの　ひと",
  },
  {
    vi: "vị kia",
    ja: "あの　かた",
  },
  {
    vi: "hậu tố thêm phía sau anh, chị, ông, bà",
    ja: "さん",
  },
  {
    vi: "hậu tố thêm phía sau em gái",
    ja: "ちゃん",
  },
  {
    vi: "người",
    ja: "じん",
  },
  {
    vi: "thầy/cô (cách gọi giáo viên)",
    ja: "せんせい",
  },
  {
    vi: "Nghề giáo viên",
    ja: "きょうし",
  },
  {
    vi: "Học sinh, sinh viên",
    ja: "がくせい",
  },
  {
    vi: "Nhân viên công ty (đầy đủ)",
    ja: "かいしゃいん",
  },
  {
    vi: "Nhân viên công ty (vắn tắt)",
    ja: "しゃいん",
  },
  {
    vi: "Công ty",
    ja: "かいしゃ",
  },
  {
    vi: "Nhân viên ngân hàng",
    ja: "ぎんこういん",
  },
  {
    vi: "Ngân hàng",
    ja: "ぎんこう",
  },
  {
    vi: "Bác sĩ",
    ja: "いしゃ",
  },
  {
    vi: "Nhà nghiên cứu",
    ja: "けんきゅうしゃ",
  },
  {
    vi: "Đại học",
    ja: "だいごく",
  },
  {
    vi: "Bệnh viện",
    ja: "びょういん",
  },
  {
    vi: "Thẩm mĩ viện (cho nữ)",
    ja: "びよういん",
  },
  {
    vi: "ai ?",
    ja: "だれ",
  },
  {
    vi: "vị nào ?",
    ja: "どなた",
  },
  {
    vi: "tuổi",
    ja: "さい",
  },
  {
    vi: "Mấy tuổi ? (Cách nói bình thường)",
    ja: "なんさい",
  },
  {
    vi: "Mấy tuổi ? (Cách nói Lịch sự)",
    ja: "おいくつ",
  },
  {
    vi: "Vâng, dạ!",
    ja: "はい",
  },
  {
    vi: "Không!",
    ja: "いいえ",
  },
  {
    vi: "Họa sĩ",
    ja: "がか",
  },
  {
    vi: "Xã hội",
    ja: "しゃかい",
  },
  {
    vi: "Trường",
    ja: "がっこう",
  },
  {
    vi: "Nhà máy",
    ja: "こうじょう",
  },
  {
    vi: "Kĩ sư",
    ja: "エンジニア",
  },
  {
    vi: "Mỹ",
    ja: "アメリカ",
  },
  {
    vi: "Anh",
    ja: "イギリス",
  },
  {
    vi: "Ấn Độ",
    ja: "インド",
  },
  {
    vi: "Indonesia",
    ja: "インドネシア",
  },
  {
    vi: "Hàn Quốc",
    ja: "けんこく",
  },
  {
    vi: "Thái Lan",
    ja: "タイ",
  },
  {
    vi: "Trung Quốc",
    ja: "ちゅうごく",
  },
  {
    vi: "Đức",
    ja: "ドイツ",
  },
  {
    vi: "Nhật Bản",
    ja: "にほん",
  },
  {
    vi: "Braxin",
    ja: "ブラジル",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  // const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";

  let generateWords;

  const quoteDisplayElement = document.getElementById("quoteDisplay");
  const quoteInputElement = document.getElementById("quoteInput");

  const scoreElement = document.getElementById("score");

  const readyButton = document.getElementById("ready");
  const refreshButton = document.getElementById("refresh");

  // Handle Ready
  readyButton.addEventListener("click", () => {
    // let startTime = 0;
    // if (timeLimitCheckbox.checked) {
    //   startTime = Math.floor(new Date() / 1000) + 300;
    // }
    let score = 0;
    // let fail;

    async function renderNewQuote() {
      // clear array
      let chosedArray = grammaArray;
      const chosedArrayArrayLength = chosedArray.length;

      // const quote = await getRandomQuote();
      const randomNumber = getRandomIntInclusive(0, chosedArrayArrayLength - 1);
      generateWords = chosedArray[randomNumber];

      fail = 0;
      quoteDisplayElement.innerText = generateWords.vi;
      quoteInputElement.value = "";
      console.log(`"${generateWords.vi}: ${generateWords.ja}"`);
    }

    quoteInputElement.addEventListener("keydown", (e) => {
      let corect = false;

      if (e.keyCode === 13) {
        e.preventDefault();
        if (
          quoteInputElement.value === generateWords.ja ||
          quoteInputElement.value === wanakana.toRomaji(generateWords.ja)
        ) {
          corect = true;
        } else {
          alert(`You wrong! The correct words is: ${generateWords.ja}`);
        }
      }

      if (corect) {
        score += generateWords.ja.length * 10 - fail * 3;
        scoreElement.innerText = score;
        renderNewQuote();
      }
    });

    readyButton.style.display = "none";
    quoteInputElement.removeAttribute("disabled");
    quoteInputElement.focus();
    renderNewQuote();
  });

  refreshButton.addEventListener("click", () => {
    readyButton.style.display = "inline-block";

    scoreElement.innerText = 0;
    quoteDisplayElement.innerText = "Tiếng Việt...";
    quoteInputElement.value = "にほご...";
    quoteInputElement.setAttribute("disabled", true);
  });
});
