console.log("🀄 PinyinFlix loaded!");


// -----------------------------
// 1. Create our subtitle overlay
// -----------------------------

const overlay = document.createElement("div");

overlay.id = "pinyinflix-overlay";

overlay.innerHTML = `
  <div class="pinyinflix-pinyin"></div>
  <div class="pinyinflix-hanzi"></div>
  <div class="pinyinflix-english"></div>
`;

document.body.appendChild(overlay);


// --------------------------------
// 2. Our temporary test subtitles
// --------------------------------

let subtitles = [];

let testStarted = false;


// --------------------------------
// 3. Update subtitle every frame
// --------------------------------

function updateSubtitles() {

  // Ask Netflix for the video EVERY time
  const video = document.querySelector("video");

  if (!video) {
    requestAnimationFrame(updateSubtitles);
    return;
  }


  // Start our test only once the movie
  // is actually playing
  if (!testStarted && !video.paused) {

    const start = video.currentTime;

    console.log("🎬 Test starting at:", start);

    subtitles = [
      {
        start: start + 2,
        end: start + 5,
        pinyin: "nǐ hǎo",
        hanzi: "你好",
        english: "Hello"
      },

      {
        start: start + 6,
        end: start + 9,
        pinyin: "nǐ zài zuò shénme?",
        hanzi: "你在做什么？",
        english: "What are you doing?"
      },

      {
        start: start + 10,
        end: start + 13,
        pinyin: "wǒ bù zhīdào",
        hanzi: "我不知道",
        english: "I don't know"
      }
    ];

    testStarted = true;
  }


  // Nothing else to do until playback starts
  if (!testStarted) {
    requestAnimationFrame(updateSubtitles);
    return;
  }


  const currentTime = video.currentTime;


  // Find subtitle matching current movie time
  const subtitle = subtitles.find(
    item =>
      currentTime >= item.start &&
      currentTime <= item.end
  );


  if (subtitle) {

    document.querySelector(".pinyinflix-pinyin").textContent =
      subtitle.pinyin;

    document.querySelector(".pinyinflix-hanzi").textContent =
      subtitle.hanzi;

    document.querySelector(".pinyinflix-english").textContent =
      subtitle.english;

  } else {

    document.querySelector(".pinyinflix-pinyin").textContent = "";

    document.querySelector(".pinyinflix-hanzi").textContent = "";

    document.querySelector(".pinyinflix-english").textContent = "";

  }


  requestAnimationFrame(updateSubtitles);
}


// Start the loop
updateSubtitles();