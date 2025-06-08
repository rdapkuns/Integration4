const $question = document.querySelector(".question");
const $markBtns = document.querySelectorAll(".game button");

let questions = [];

const init = () => {
    getQuestions();
    console.log($markBtns);
    markButtons();
}

const getQuestions = async () => {
    const url = './data/questions.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status}`);
        }
        questions = await response.json();
        console.log(questions);
    } catch (error) {
        console.error('Error loading questions:', error.message);
    }
}

const markButtons = () => {
    $markBtns.forEach(button => {
        button.addEventListener('click', () => {
            const mark = button.dataset.mark;
            console.log(mark);
            const filtered = questions.filter(q => q.mark === mark);
            const randomQuestion = filtered[Math.floor(Math.random() * filtered.length)];
            console.log(randomQuestion);

            $question.innerHTML = `
            ${randomQuestion.extra ? `
                <div>
                 <p>${randomQuestion.extra.title}</p>
                  <img src="${randomQuestion.extra.img}" alt="${randomQuestion.extra.title}" />
                  <p>${randomQuestion.extra.description}</p>
                </div>` : ''}
                <p class="type">${randomQuestion.type}</p>
                <p><strong>${randomQuestion.task}</strong></p>
                <p>${randomQuestion.content}</p>
                ${randomQuestion.example ?
                    `<div><hr>
                    <p>Example: ${randomQuestion.example}</p>
                    <hr></div>` : ''}
              `;
        })
    })
}

init();