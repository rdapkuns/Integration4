const abbyPretalk = [
    {
        mark: "l1",
        title: "Here we are!",
        content: "Now you’ll meet a friend of mine - they’re also on a little quest for connection."
    },
    {
        mark: "a1",
        title: "Sockrifice",
        content: "I once invented a game where the loser had to fold socks. I lost. On purpose. I like folding socks."
    },
    {
        mark: "s1",
        title: "Sketchy Business",
        content: "I once accidentally drew on the museum wall. Now it’s officially called ‘Abby’s First Mural’."
    },
    {
        mark: "c1",
        title: "Smells Like Trouble",
        content: "I once lit five candles to feel calm… then panicked , I thought  something burning."
    },
    {
        mark: "c2",
        title: "Oops, I Did It",
        content: "I overthought it for three days, did it in five seconds, and survived. Shocking."
    },
    {
        mark: "g1",
        title: "The Dirt Talk",
        content: "I once came in the garden to think and ended up talking to a worm."
    },
    {
        mark: "g2",
        title: "Final Step",
        content: "When I first arrived, I didn’t know what to grow. So I planted a wish... Now it’s your turn."
    }
];

// const $question = document.querySelector(".question");
// const $markBtns = document.querySelectorAll(".map button");
// const $foundBtn = document.querySelector(".foundBtn");
// const $abbyTalk = document.querySelector(".abby_talk");
const $steps = document.querySelectorAll(".step");


// let questions = [];
// let mark = null;
// let randomQuestion = null;
// let questionCounter = 0;

const init = () => {
    // const savedCount = localStorage.getItem("questionCounter");
    // questionCounter = savedCount ? parseInt(savedCount) : 0;
    // getQuestions();
    // console.log($markBtns);
    // markButtons();
}







// const getQuestions = async () => {
//     const url = './data/questions.json';
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Fetch failed: ${response.status}`);
//         }
//         questions = await response.json();
//         console.log(questions);
//     } catch (error) {
//         console.error('Error loading questions:', error.message);
//     }
// }

// const markButtons = () => {
//     $markBtns.forEach(button => {
//         button.addEventListener('click', () => {
//             mark = button.dataset.mark;
//             const pretalk = abbyPretalk.find(p => p.mark === mark);
//             const filtered = questions.filter(q => q.mark === mark);
//             randomQuestion = filtered[Math.floor(Math.random() * filtered.length)];
//             console.log(randomQuestion);

//             $abbyTalk.innerHTML = `
//             <h3>${pretalk.title || "Let's Begin!"}</h3>
//             <p>${pretalk.content || "Ready to dive in?"}</p>
//           `;
//         })
//     })
//     $foundBtn.addEventListener('click', () => {
//         questionCount();
//         if (!randomQuestion) return;

//         $question.innerHTML = `
//             ${randomQuestion.extra ? `
//                 <div>
//                  <p>${randomQuestion.extra.title}</p>
//                   <img src="${randomQuestion.extra.img}" alt="${randomQuestion.extra.title}" />
//                   <p>${randomQuestion.extra.description}</p>
//                 </div>` : ''}
//                 <p class="type">${randomQuestion.type}</p>
//                 ${randomQuestion.mark === "a1" ? `<p>Materials are next to the sink.</p>` : ''}
//                 <p><strong>${randomQuestion.task}</strong></p>
//                 <p>${randomQuestion.content}</p>
//                 ${randomQuestion.example ?
//                 `<div><hr>
//                     <p>Example: ${randomQuestion.example}</p>
//                     <hr></div>` : ''}
//               `;
//     });
// }

// const questionCount = () => {
//     questionCounter++;
//     localStorage.setItem("questionCounter", questionCounter);

//     // progress bar
//     // document.querySelector(".counter")?.textContent = `Completed: ${questionCounter}`;
// }


// const resetProgress = () => {
//     questionCounter = 0;
//     localStorage.removeItem("questionCounter");
//     // document.querySelector(".counter")?.textContent = `Completed: ${questionCounter}`;
// };

init();