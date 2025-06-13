const $steps = document.querySelectorAll(".step");
const $nextBtn = document.querySelector('.next_btn');
const $backBtn = document.querySelector('.back_btn');
const $skip = document.querySelector('.skip');
const $stepCount = document.querySelector('.steps_count');
const $introduction = document.querySelector('.introduction')

const $intro = document.querySelector('.onboarding_intro');
const $boards = document.querySelectorAll('.board');
const $progressCount = document.querySelector('.progress_count span');
const $progressBars = document.querySelectorAll('.progress__bar');
const $progressContainer = document.querySelector('.progress_count').parentElement;
const $buttonsContainer = document.querySelector('.onboarding_btns')
const $forwBtn = document.querySelector('.forw_btn');
const $prevBtn = document.querySelector('.prev_btn');
const $continueBtn = document.querySelector('.onboarding_intro button');
const $boardSkip = document.querySelector('.skip_to');

let currentStep = 0;
let currentBoard = 0;

const init = () => {

    showBoard(currentBoard);
    console.log($steps);

    $boards.forEach(board => board.classList.add('hidden'));
    $progressContainer.style.display = 'none';
    // $prevBtn.style.display = 'none';
    // $forwBtn.style.display = 'none';
    $buttonsContainer.classList.add('hidden');
    $boardSkip.style.display = 'none';

    $continueBtn.addEventListener('click', () => {
        $boardSkip.style.display = 'inline';
        $intro.classList.add('hidden');
        $progressContainer.style.display = 'block';
        $buttonsContainer.classList.remove('hidden');
        showBoard(currentBoard);
    });

    $boardSkip.addEventListener('click', handleSkip);
}

const handleSkip = () => {
    document.querySelector('.onboarding').classList.add('hidden');
    $introduction.classList.remove('hidden');

}
const showBoard = (index) => {
    $boards.forEach((board, i) => {
        board.classList.toggle('hidden', i !== index);
    });

    $progressCount.textContent = `${index + 1}`;
    $progressBars.forEach((bar, i) => {
        bar.classList.toggle('progress__bar--filled', i <= index);
    });

    // $prevBtn.disabled = index === 0;
};

$forwBtn.addEventListener('click', () => {
    if (currentBoard < $boards.length - 1) {
        currentBoard++;
        showBoard(currentBoard);
    } else {
        document.querySelector('.onboarding').classList.add('hidden');
        $introduction.classList.remove('hidden');

        showStep(0);
    }
});

$prevBtn.addEventListener('click', () => {
    if (currentBoard > 0) {
        currentBoard--;
        showBoard(currentBoard);
    }
});


const showStep = (index) => {
    console.log($steps.length);
    $steps.forEach((step, i) => {
        step.classList.toggle('hidden', i !== index);
    });

    $backBtn.disabled = index === 0;
    $nextBtn.disabled = index === $steps.length;
    updateProgress(index);
};

$nextBtn.addEventListener('click', () => {

    console.log(currentStep);
    console.log($steps.length);
    if (currentStep < $steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    } else {
        window.location.href = './game.html';
    }
});

$backBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
});

const updateProgress = (stepIndex) => {
    $stepCount.textContent = `${stepIndex + 1}/3`; // or use $steps.length instead of 3
};


init();