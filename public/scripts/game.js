import { supabase } from '/scripts/supabaseClient.js';

async function loadLocations(id) {
    const { data, error } = await supabase
        .from('Locations')
        .select('*');

    if (error) {
        console.error('Error fetching locations:', error);
        return;
    }

    const item = data.find(obj => obj.id === id);

    // console.log('Locations:', data);

    // Display them (example if using basic HTML)
    const container = document.getElementById('locations');
    container.innerHTML = data
        .map(loc => `<div>${loc.name}: ${loc.amount}</div>`)
        .join('');


    // console.log(data)
    return (item)
}

// loadLocations();


const doSomething = () => {
    console.log("DOING SOMETING")
}






let taskCount = 1
let nextTaskSelected = false
let selectedTask = 0
let completedTasks = []




function showSceneByClass(targetClass) {
    const scenes = document.querySelectorAll('.scene');

    scenes.forEach(scene => {
        // scene.style.display = 'none';
        scene.classList.add("visually-hidden")
    });

    const targetScenes = document.querySelectorAll(`.${targetClass}`);
    console.log(targetClass)
    targetScenes.forEach(scene => {
        // scene.style.display = 'block';
        scene.classList.remove("visually-hidden")
    });

}

const $seeFloorOne = document.querySelector(".floor__button--1");
const $seeFloorZero = document.querySelector(".floor__button--0");
const $floor0 = document.querySelector(".floor-0");
const $floor1 = document.querySelector(".floor-1");


const duration = 0.5;


document.querySelector(".floor__button--1").addEventListener("click", () => {


    $seeFloorOne.classList.remove("floor__button--inactive")
    $seeFloorZero.classList.add("floor__button--inactive")

    gsap.fromTo($floor0,
        {
            y: 0,
            opacity: 1,
            scale: 1,
        },
        {
            y: 150,
            opacity: 0,
            scale: 0.5,
            duration: duration,
            ease: "power1.out"
        }
    );

    gsap.fromTo($floor1,
        {
            y: 0,
            x: -10,
            opacity: 0,
            scale: 1.5,
        },
        {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            duration: duration,
            ease: "power1.out"
        }
    );
});

document.querySelector(".floor__button--0").addEventListener("click", () => {


    $seeFloorOne.classList.add("floor__button--inactive")
    $seeFloorZero.classList.remove("floor__button--inactive")

    gsap.fromTo($floor0,
        {
            y: 150,
            opacity: 0,
            scale: 0.5,
        },
        {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            duration: duration,
            ease: "power1.out"
        }
    );

    gsap.fromTo($floor1,
        {
            y: 0,
            opacity: 1,
            scale: 1,
        },
        {
            y: 0,
            x: -10,
            opacity: 0,
            scale: 1.5,
            duration: duration,
            ease: "power1.out"
        }
    );
});



const handleNextTask = () => {
    if (nextTaskSelected === true) {
        showSceneByClass("scene-walking")
        // $nextTask.textContent = "We're ready, Let's begin"
    }
}

const goToGame = async () => {
    let playersAtLocation = await loadLocations(selectedTask)
    updateParticipantAmount(playersAtLocation, 1)
    updateAR()
    showSceneByClass("scene-game")
}

const goToMap = async () => {

    showSceneByClass("scene-map")
}

const handleTaskComplete = async () => {
    let playersAtLocation = await loadLocations(selectedTask)
    updateParticipantAmount(playersAtLocation, -1)
    showSceneByClass("scene-map")
    // console.log(playersAtLocation.name)
    // console.log("current Task was: ", selectedTask)

    let $activeIndicator = document.getElementById(`indicator__${selectedTask}`)
    $activeIndicator.innerHTML = `<span>You are<br>here<span>`

    $nextTask.classList.add("button--inactive")
    $nextTask.textContent = "Select next task"
    $nextTask.classList.remove("button--primary")



    if (!completedTasks.includes(selectedTask)) {
        completedTasks.push(selectedTask);
        taskCount++
        // console.log(taskCount)
        handleProgressBar()
    }

    // console.log(completedTasks)

    for (let i = 0; i < 10; i++) {
        if (completedTasks.includes(i)) {

            $taskPoints.forEach(task => {
                const taskId = task.id;
                const number = taskId.split("__")[1];
                if (Number(number) === i) {
                    task.classList.add("task--complete")
                }
            })
        }
    }

    if (taskCount > 8) {
        const $lastTask = document.getElementById("task__10")
        $lastTask.classList.remove("visually-hidden")
    }
}

const handleProgressBar = () => {
    const $progressCounter = document.querySelector(".progress__counter")
    const $progressBars = document.querySelectorAll(".progress__bar")
    for (let i = 0; i < 10; i++) {
        if (i < taskCount) {
            console.log("less")
            $progressBars[i].classList.add("progress__bar--filled")
        } else {
            console.log("more")
        }
    }

    $progressCounter.textContent = taskCount
}



async function handleTaskPointClick(event) {
    const taskPoint = event.currentTarget;

    document.querySelectorAll('.indicator').forEach(indicator => {
        indicator.classList.remove('indicator--visible');
    });

    const clickedTaskPoint = event.currentTarget;
    const indicator = clickedTaskPoint.querySelector('.indicator');

    const taskId = taskPoint.id;
    const number = taskId.split("__")[1]; // "2" as a string
    // console.log(number)
    selectedTask = Number(number)

    $nextTask.classList.remove("button--inactive")
    $nextTask.textContent = "Go to task 2"
    $nextTask.classList.add("button--primary")

    nextTaskSelected = true

    let playersAtLocation = await loadLocations(selectedTask)
    // console.log(playersAtLocation)
    if (indicator) {
        void indicator.offsetWidth;
        indicator.classList.add('indicator--visible');
        indicator.innerHTML = `<div class="player__amount">${playersAtLocation.amount}</div><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8125 23.625C11.8125 23.625 10.125 23.625 10.125 21.9375C10.125 20.25 11.8125 15.1875 18.5625 15.1875C25.3125 15.1875 27 20.25 27 21.9375C27 23.625 25.3125 23.625 25.3125 23.625H11.8125ZM18.5625 13.5C19.9052 13.5 21.1928 12.9666 22.1422 12.0172C23.0916 11.0678 23.625 9.78016 23.625 8.4375C23.625 7.09484 23.0916 5.80717 22.1422 4.85777C21.1928 3.90837 19.9052 3.375 18.5625 3.375C17.2198 3.375 15.9322 3.90837 14.9828 4.85777C14.0334 5.80717 13.5 7.09484 13.5 8.4375C13.5 9.78016 14.0334 11.0678 14.9828 12.0172C15.9322 12.9666 17.2198 13.5 18.5625 13.5V13.5Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.802 23.6247C8.55184 23.0979 8.42708 22.5203 8.4375 21.9372C8.4375 19.6507 9.585 17.2966 11.7045 15.6597C10.6466 15.3338 9.54441 15.1744 8.4375 15.1872C1.6875 15.1872 0 20.2497 0 21.9372C0 23.6247 1.6875 23.6247 1.6875 23.6247H8.802Z" fill="white"/>
<path d="M7.59375 13.5C8.71263 13.5 9.78569 13.0555 10.5769 12.2644C11.368 11.4732 11.8125 10.4001 11.8125 9.28125C11.8125 8.16237 11.368 7.08931 10.5769 6.29814C9.78569 5.50697 8.71263 5.0625 7.59375 5.0625C6.47487 5.0625 5.40181 5.50697 4.61064 6.29814C3.81947 7.08931 3.375 8.16237 3.375 9.28125C3.375 10.4001 3.81947 11.4732 4.61064 12.2644C5.40181 13.0555 6.47487 13.5 7.59375 13.5V13.5Z" fill="white"/>
</svg>`
    }

}

// const randomPPL = document.querySelector(".random__ppl").addEventListener("click", updateAmount)

async function updateParticipantAmount(playersAtLocation, increment) {
    // let randomAmount = Math.floor(Math.random() * 20);
    console.log("name: ", playersAtLocation.name, "amount: ", playersAtLocation.amount)
    const { error } = await supabase
        .from('Locations')
        .update({ amount: playersAtLocation.amount + increment })
        .eq('name', playersAtLocation.name);
}

let ARDisplayIndex = 0
const updateAR = () => {
    ARDisplayIndex++
    $arMarker.innerHTML = `
    <a-plane src="./data/abbies/abby-${ARDisplayIndex}.png" transparent="true" height="5" width="5" position="0 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
      <a-plane src="./data/tasks/task-${ARDisplayIndex}.jpg" class="game__task game__task--1 visually-hidden" height="4" width="6" position="6 1 -4" rotation="0 0 0"></a-plane>
    `
}

const $arMarker = document.querySelector(".ar__marker")
const $arSwitch = document.querySelector(".ar__switch").addEventListener("click", updateAR)

const $completeTaskButton = document.querySelector(".button__complete").addEventListener("click", handleTaskComplete)
const $backButton = document.querySelector(".button__back").addEventListener("click", goToGame)
const $backToMapFromGame = document.querySelector(".button__back--game").addEventListener("click", goToMap)
const $taskPoints = document.querySelectorAll(".task__point");
const $nextTask = document.querySelector(".button__next__task")
$nextTask.addEventListener("click", handleNextTask)
const $toGameButton = document.querySelector(".button__game--walking").addEventListener("click", goToGame)

$taskPoints.forEach(taskPoint => {
    taskPoint.addEventListener('click', handleTaskPointClick);
});
const $backToMap = document.querySelector(".button__back--walking").addEventListener('click', () => showSceneByClass("scene-map"));

const init = () => {
    console.log("ff")
    doSomething()
}

init();