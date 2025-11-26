import { CameraIcon, CloseIcon, DownloadIcon } from "./utils/icons";
import { toPng } from "html-to-image";

window.addEventListener("scroll", () => {
  embadeCameraIconInEveryTweet();
});

document.body.addEventListener("click", (e) => {
  console.log(e.target);
  const isTweetCaptureBtn = e.target.closest(".tweet_capture_button_container");
  if (!isTweetCaptureBtn) return;

  const article = e.target.closest("article");
  const isTweet = article?.dataset.testid === "tweet";

  if (!isTweet) return;

  const clonedTweet = article.cloneNode(true);

  // clen the tweet

  renderModal(cleanupCaptureTweetElement(clonedTweet));
});

function renderModal(tweetElement) {
  const modalMarkup = document.createElement("div");
  modalMarkup.id = "capture_tweet_display_modal";
  modalMarkup.innerHTML = `
        <div class="capture_tweet_display_modal_overley"> 
            <div class="capture_tweet_display_container"> 
                <div class="modal_header">
                    <h2 class="modal_title">Capture Tweet</h2>
                    <button class="modal_close_button" id="close-modal-btn">
                    ${CloseIcon()}
                    </button>
                </div>
                <div class="modal_content_body">
                    <div id="capture_tweet_display"></div>
                    <div class="controlls_continer">
                        <div class="container_btn">
                          <button id="tweet_export_btn">
                            ${DownloadIcon()}
                            <span> Export tweet </span>
                          </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

  document.body.appendChild(modalMarkup);

  document.getElementById("capture_tweet_display").appendChild(tweetElement);

  // EVENT LISTNER FOR CLOSE MODAL
  modalMarkup
    .querySelector("#close-modal-btn")
    .addEventListener("click", () => {
      modalMarkup.remove();
    });

  // EVENT LISTNER FOR THE EXPORT BTN
  document
    .getElementById("tweet_export_btn")
    .addEventListener("click", exportTweet);
}

// CLOSE THE MODAL UPON PRESS ON ESC KEY
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const modal = document.getElementById("capture_tweet_display_modal");
  if (modal) modal.remove();
});

function embadeCameraIconInEveryTweet() {
  Array.from(document.querySelectorAll("article")).forEach((tweetCard) => {
    if (tweetCard.dataset.isCameraIconExist) return;

    const iconBarSelector =
      '[aria-label*="views"], [aria-label*="likes"], [aria-label*="replies"]';
    const iconBar = tweetCard.querySelector(iconBarSelector);
    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    buttonContainer.appendChild(button);

    button.innerHTML = CameraIcon();

    // add custom classes to the button and the container
    buttonContainer.classList.add("tweet_capture_button_container");
    button.classList.add("tweet_capture_button");

    if (iconBar) {
      // append the conatainer to the icon bar
      iconBar.appendChild(buttonContainer);

      // last mark the tweet as the icon-already-embade
      tweetCard.dataset.isCameraIconExist = "true";
    }
  });
}

function cleanupCaptureTweetElement(tweetElement) {
  tweetElement.id = "captured_tweet";
  // 1. remove the capture btn form the tweet
  tweetElement
    .getElementsByClassName("tweet_capture_button_container")[0]
    .remove();

  tweetElement.querySelector(`button[aria-label*='Grok actions']`)?.remove();
  tweetElement.querySelector(`button[aria-label='More']`)?.remove();
  tweetElement.querySelector(`button[aria-label*='Bookmark']`)?.remove();
  tweetElement.querySelector(`button[aria-label*='Share post']`)?.remove();

  return tweetElement;
}

async function exportTweet() {
  try {
    const tweetEl = document.getElementById("captured_tweet");

    const imageUrl = await toPng(tweetEl, { pixelRatio: 2 });

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "tweet-card.png";
    link.click();
  } catch (err) {
    console.log("Export fail");
    console.error(err);
  }
}
