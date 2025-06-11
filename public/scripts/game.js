


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

const goToGame = () => {
    updateAR()
    showSceneByClass("scene-game")
}

const goToMap = () => {
    showSceneByClass("scene-map")
}

const handleTaskComplete = () => {
    showSceneByClass("scene-map")

    $nextTask.classList.add("button--inactive")
    $nextTask.textContent = "Select next task"
    $nextTask.classList.remove("button--primary")



    if (!completedTasks.includes(selectedTask)) {
        completedTasks.push(selectedTask);
        taskCount++
        // console.log(taskCount)
        handleProgressBar()
    }

    console.log(completedTasks)

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


const selectTask = (clickedTask) => {
    $taskPoints.forEach(task => task.classList.remove('task__selected'));
    clickedTask.classList.add('task__selected');

    const taskId = clickedTask.id;
    const number = taskId.split("__")[1]; // "2" as a string
    console.log(number)
    selectedTask = Number(number)

    $nextTask.classList.remove("button--inactive")
    $nextTask.textContent = "Go to task 2"
    $nextTask.classList.add("button--primary")

    nextTaskSelected = true
}

let ARDisplayIndex = 0
const updateAR = () => {
    ARDisplayIndex++
    $arMarker.innerHTML = `
    <a-plane src="../data/abbies/abby-${ARDisplayIndex}.png" transparent="true" height="5" width="5" position="0 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
      <a-plane src="../data/tasks/task-${ARDisplayIndex}.jpg" class="game__task game__task--1 visually-hidden" height="4" width="6" position="6 1 -4" rotation="0 0 0"></a-plane>
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

$taskPoints.forEach(task => {
    task.addEventListener('click', () => selectTask(task));
});
const $backToMap = document.querySelector(".button__back--walking").addEventListener('click', () => showSceneByClass("scene-map"));

const init = () => {
    console.log("ff")
}

init();