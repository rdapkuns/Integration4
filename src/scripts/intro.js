import "../css/reset.css";
import "../css/global.css";
import "../css/intro.css";

const $continueBtn = document.querySelector(".onboarding_intro button");
const $nextBtn = document.querySelector(".next_btn");
const $backBtn = document.querySelector(".back_btn");
const $skipBtn = document.querySelector(".skip_to");
// const $progressCount = document.querySelector(".progress_count");
const $progressBars = document.querySelectorAll(".progress__bar");
const $progressCurrent = document.querySelector('.progress_count_current');
const $intro = document.querySelector(".onboarding_intro");
const $screens = document.querySelectorAll(".screen");
const $progress = document.querySelector(".progress");
const $onboardingBtns = document.querySelector(".onboarding_btns");

let currentScreen = 0;

const showScreen = (index) => {
    $screens.forEach((screen, i) => {
        screen.classList.toggle("hidden", i !== index);
    });

    $progress.classList.remove("hidden");
    $onboardingBtns.classList.remove("hidden");

    $backBtn.disabled = false;
    $progressCurrent.textContent = index + 1;

    $progressBars.forEach((bar, i) => {
        bar.classList.toggle("progress__bar--filled", i === index);
    });
};

const showIntro = () => {
    $intro.classList.remove("hidden");
    $screens.forEach(screen => screen.classList.add("hidden"));
    $progress.classList.add("hidden");
    $onboardingBtns.classList.add("hidden");
};

const init = () => {
    showIntro();

    $continueBtn.addEventListener("click", () => {
        currentScreen = 0;
        $intro.classList.add("hidden");
        showScreen(currentScreen);
    });

    $nextBtn.addEventListener("click", () => {
        if (currentScreen < 5) {
            currentScreen++;
            showScreen(currentScreen);
        } else {
            window.location.href = "./game.html";
        }
    });

    $backBtn.addEventListener("click", () => {
        if (currentScreen === 0) {
            showIntro();
        } else {
            currentScreen--;
            showScreen(currentScreen);
        }
    });

    $skipBtn.addEventListener("click", () => {
        if (currentScreen < 3) {
            currentScreen = 3;
            showScreen(currentScreen);
        } else {
            window.location.href = "./game.html";
        }
    });
};

init();
