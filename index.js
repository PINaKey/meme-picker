import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);

memeModalCloseBtn.addEventListener("click", closeModal);

getImageBtn.addEventListener("click", renderCat);

// Click outside the modal to close the modal
window.addEventListener("click", clickOutsideClosesModal);

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName("radio");
    for (let radio of radios) {
        radio.classList.remove("highlight");
    }
    document
        .getElementById(e.target.id)
        .parentElement.classList.add("highlight");
}

function closeModal() {
    memeModal.style.display = "none";
}

function renderCat() {
    let catsImagesHTML = "";
    const catsArray = getMatchingCatsArray();
    for (let cat of catsArray) {
        catsImagesHTML += `
        <img 
            class="cat-img" 
            src="./images/${cat.image}"
            alt="${cat.alt}"
        >
        `;
    }
    memeModalInner.innerHTML = catsImagesHTML;
    memeModal.style.display = "flex";
}

function clickOutsideClosesModal(e) {
    if (
        e.target !== getImageBtn &&
        e.target !== memeModal &&
        e.target.parentElement !== memeModalInner
    ) {
        closeModal();
    }
}

function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector(
            'input[type="radio"]:checked'
        ).value;
        const isGif = gifsOnlyOption.checked;

        const matchingCatsArray = catsData.filter(function (cat) {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
            } else {
                return cat.emotionTags.includes(selectedEmotion);
            }
        });
        return matchingCatsArray;
    }
}

function getEmotionsArray(cats) {
    const emotionsArray = [];
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            }
        }
    }
    return emotionsArray;
}

function renderEmotionsRadios(cats) {
    let radioItems = ``;
    const emotions = getEmotionsArray(cats);
    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`;
    }
    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
