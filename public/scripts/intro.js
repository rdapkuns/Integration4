const $steps = document.querySelectorAll(".step");
const $nextBtn = document.querySelector('.next_btn');
const $backBtn = document.querySelector('.back_btn');
const $skip = document.querySelector('.skip');

let currentStep = 0;

const init = () => {
    showStep(currentStep);
}

//check what's wrong, it jumps, works only one time
const showStep = (index) => {
    $steps.forEach((step, i) => {
        step.classList.toggle('hidden', i !== index);
    });

    $backBtn.disabled = index === 0;
    $nextBtn.disabled = index === $steps.length - 1;

    $nextBtn.addEventListener('click', () => {
        if (currentStep < $steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });

    $backBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });


}

init();