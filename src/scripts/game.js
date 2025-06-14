import { supabase } from '/src/scripts/supabaseClient.js';


let taskCount = 7
let nextTaskSelected = false
let selectedTask = 0
// let completedTasks = []
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

let isFirstRound = true
let isDoingIntro = true
let currentLocation = undefined

const base = import.meta.env.BASE_URL




async function loadLocations(id) {

    // return

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


const $speechHeader = document.querySelector(".walking__speech--header")
const $speechBody = document.querySelector(".walking__speech--body")

const handleNextTask = () => {
    if (nextTaskSelected === true) {
        showSceneByClass("scene-walking")
        console.log(currentLocation)

        if (isFirstRound === false) {
            const filteredComments = comments.filter(comment => comment.location === currentLocation.charAt(0));
            const randomComment = filteredComments[Math.floor(Math.random() * filteredComments.length)];
            console.log(randomComment);

            $speechHeader.textContent = randomComment.title
            $speechBody.textContent = randomComment.body

        }

        if (currentLocation === "G2"){
            const filteredComments = comments.filter(comment => comment.location === "F");
            const randomComment = filteredComments[Math.floor(Math.random() * filteredComments.length)];
            console.log(randomComment);

            $speechHeader.textContent = randomComment.title
            $speechBody.textContent = randomComment.body
        }
        // $nextTask.textContent = "We're ready, Let's begin"
    }
}

const goToGame = async () => {
    // const $footer = document.querySelector("footer")
    // $footer.classList.remove("visually-hidden")
    // const $buttonContainer = document.querySelector(".button__container--minimal")
    // $buttonContainer.classList.remove("button__container--hidden")

    let playersAtLocation = await loadLocations(selectedTask)
    // updateParticipantAmount(playersAtLocation, 1)
    updateAR()
    if (isDoingIntro === true) {
        // playersAtLocation = await loadLocations(selectedTask)
        // updateParticipantAmount(playersAtLocation, -1)
        showSceneByClass("scene-intro")
        const $footer = document.querySelector("footer")
        $footer.classList.add("visually-hidden")
        isDoingIntro = false
        isDoingIntro = localStorage.setItem('isDoingIntro', 'false')
    } else {
        updateParticipantAmount(playersAtLocation, 1)
        showSceneByClass("scene-game")
    }
}

const $allTasks = document.querySelectorAll(".task__point")
const goToMap = async () => {
    isDoingIntro = localStorage.getItem('isDoingIntro') ?? (localStorage.setItem('isDoingIntro', 'true'), true);
    isFirstRound = localStorage.getItem('isFirstRound');
    isFirstRound = isFirstRound === null ? true : isFirstRound === 'true';
    if (isFirstRound === true) {
        $allTasks.forEach(task => {
            let point = task.lastElementChild
            point.classList.add("task__icebreaker")
        })
    }
    showSceneByClass("scene-map")
}

const returnToMap = async (introStatus) => {
    let playersAtLocation = await loadLocations(selectedTask)
    updateParticipantAmount(playersAtLocation, -1)
    isDoingIntro = introStatus
    localStorage.setItem('isDoingIntro', introStatus),
        showSceneByClass("scene-map")
    const $footer = document.querySelector("footer")
    $footer.classList.remove("visually-hidden")
}

const loadMapPoints = () => {
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

const handleTaskComplete = async () => {
    nextTaskSelected = false
    let playersAtLocation = await loadLocations(selectedTask)
    updateParticipantAmount(playersAtLocation, -1)

    if (isFirstRound === true) {
        isFirstRound = false
        localStorage.setItem('isFirstRound', isFirstRound);
        $allTasks.forEach(task => {
            let point = task.lastElementChild
            point.classList.remove("task__icebreaker")
        })
    }

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
        localStorage.setItem('taskProgress', taskCount);
        // console.log(taskCount)
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
        handleProgressBar()
    }

    // console.log(completedTasks)

    // for (let i = 0; i < 10; i++) {
    //     if (completedTasks.includes(i)) {

    //         $taskPoints.forEach(task => {
    //             const taskId = task.id;
    //             const number = taskId.split("__")[1];
    //             if (Number(number) === i) {
    //                 task.classList.add("task--complete")
    //             }
    //         })
    //     }
    // }

    // if (taskCount > 8) {
    //     const $lastTask = document.getElementById("task__10")
    //     $lastTask.classList.remove("visually-hidden")
    // }
    loadMapPoints()

    if (taskCount === 11) {
        showSceneByClass("scene-outro")
    }
}

const handleProgressBar = () => {
    // taskCount = localStorage.getItem('taskProgress');
    taskCount = Number(localStorage.getItem('taskProgress')) || 1;

    const $progressCounter = document.querySelector(".progress__counter")
    const $progressBars = document.querySelectorAll(".progress__bar")
    for (let i = 0; i < 10; i++) {
        if (i < taskCount) {
            $progressBars[i].classList.add("progress__bar--filled")
        }
    }

    $progressCounter.textContent = taskCount
}



async function handleTaskPointClick(event) {
    const $infoSelect = document.querySelector(".info__select")
    $infoSelect.classList.add("visually-hidden")
    const taskPoint = event.currentTarget;
    // console.log("current target is:", taskPoint.dataset.location)

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
    $nextTask.textContent = `Go to task ${taskCount}`
    $nextTask.classList.add("button--primary")

    nextTaskSelected = true
    currentLocation = taskPoint.dataset.location

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
    console.log("new amount: ", playersAtLocation.amount)
}

AFRAME.registerComponent('true-billboard', {
    tick: function () {
        const camera = document.querySelector('#cam').object3D;
        const object = this.el.object3D;

        // Get world position of camera
        const cameraWorldPos = new THREE.Vector3();
        camera.getWorldPosition(cameraWorldPos);

        // Get world position of the object
        const objectWorldPos = new THREE.Vector3();
        object.getWorldPosition(objectWorldPos);

        // Look at camera (with local transformation retained)
        object.lookAt(cameraWorldPos);
    }
});

const updateAR = () => {
    let currentAbby = Math.ceil(taskCount / 2);
    $arMarker.innerHTML = `
    <a-plane src="${base}assets/abbies/abby-${currentAbby}.png" transparent="true" height="5" width="5" position="0 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
      <a-plane src="${base}assets/questions/${currentLocation}.png" transparent="true" true-billboard class="game__task game__task--1 visually-hidden" height="4" width="6" position="6 1 -4" rotation="0 0 0"></a-plane>
    `
    if (isFirstRound === true) {
        $arMarker.innerHTML = `
    <a-plane src="${base}assets/abbies/abby-${currentAbby}.png" transparent="true" height="5" width="5" position="0 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
      <a-plane src="${base}assets/questions/Intro.png" transparent="true" true-billboard class="game__task game__task--1 visually-hidden" height="4" width="6" position="6 1 -4" rotation="0 0 0"></a-plane>
    `
    }

    if (currentLocation === "S1" || currentLocation === "S2") {
        $arMarker.innerHTML = `
    <a-plane src="${base}assets/abbies/abby-${currentAbby}.png" transparent="true" height="5" width="5" position="0 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
      <a-plane src="${base}assets/questions/${currentLocation}.png" transparent="true"  class="game__task game__task--1 visually-hidden" height="4" width="6" position="6 1 -4" rotation="0 0 0"></a-plane>
      <a-plane src="${base}assets/questions/${currentLocation}-extra.png" transparent="true"  class="game__task game__task--1 visually-hidden" height="4" width="6" position="-6 1 -4" rotation="0 0 0"></a-plane>
    `
    }
}

const toggleSidePanel = (event) => {
    console.log(event.currentTarget)
    $sideToggle.classList.toggle("side__panel--invisible")
    $sidePanel.classList.toggle("side__panel--visible")

}

const toggleInfoPanel = () => {
    console.log("toggling")
    $panelInfo.classList.toggle("panel__info--hidden")
    const $scenes = document.querySelectorAll(".scene")
    $scenes.forEach(scene => {
        scene.classList.toggle("fullscreen-overlay")
        requestAnimationFrame(() => {
            scene.classList.toggle('active'); // triggers opacity transition
          });
    })
}

const handleMarkerFound = () => {
    // console.log('Marker detected!');
    const $marker = document.getElementById("marker")
    $marker.removeEventListener('markerFound', handleMarkerFound);
    const $findMarker = document.querySelector(".info__findmarker")
    const $buttonContainer = document.querySelector(".button__container--minimal")
    $findMarker.classList.add("find__marker--hidden")
    // $buttonContainer.classList.remove("button__container--hidden")

    // setTimeout(goToGame, 600);
    setTimeout(() => {
        goToGame();
        $buttonContainer.classList.remove("button__container--hidden")
    }, 600);
}

const goToFirstQuestion = () => {
    const $footer = document.querySelector("footer")
    const $buttonContainer = document.querySelector(".button__container--minimal")
    $footer.classList.remove("visually-hidden")
    $buttonContainer.classList.add("visually-hidden")

    $arMarker.innerHTML = `
    <a-plane src="${base}assets/abbies/abby-1.png" transparent="true" height="5" width="5" position="0 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
      <a-plane src="${base}assets/questions/IB.png" transparent="true"  class="game__task game__task--1 visually-hidden" height="4" width="6" position="6 1 -4" rotation="0 0 0"></a-plane>
    `
}

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // match the CSS transition duration
    }
});

const $sidePanelOpen = document.querySelector(".side__panel--open");
const $sidePanelClose = document.querySelector(".side__panel--close");
$sidePanelOpen.addEventListener("click", toggleSidePanel);
$sidePanelClose.addEventListener("click", toggleSidePanel);

const $sidePanel = document.querySelector(".side__panel--wrapper")
const $sideToggle = document.querySelector(".side__panel--toggle")

const $arMarker = document.querySelector(".ar__marker")
const $arSwitch = document.querySelector(".ar__switch").addEventListener("click", updateAR)

const $panelInfo = document.querySelector(".panel__info")
const $panelInfoClose = document.querySelector(".panel__info--close").addEventListener("click", toggleInfoPanel)
const $panelInfoOpen = document.querySelectorAll(".button__info")
$panelInfoOpen.forEach(button => {
    button.addEventListener("click", toggleInfoPanel)
})

const $marker = document.getElementById("marker").addEventListener('markerFound', handleMarkerFound)

const $completeTaskButton = document.querySelector(".button__complete").addEventListener("click", handleTaskComplete)
const $backButton = document.querySelector(".button__back").addEventListener("click", goToGame)
const $backToMapFromGame = document.querySelector(".button__back--game").addEventListener("click", () => returnToMap(false))
const $taskPoints = document.querySelectorAll(".task__point");
const $nextTask = document.querySelector(".button__next__task")
$nextTask.addEventListener("click", handleNextTask)
const $toGameButton = document.querySelector(".button__game--walking").addEventListener("click", goToGame)
const $introToGameButton = document.querySelector(".button__next__intro").addEventListener("click", goToFirstQuestion)
const $introToMapButton = document.querySelector(".button__back--intro").addEventListener('click', () => returnToMap(true));

$taskPoints.forEach(taskPoint => {
    taskPoint.addEventListener('click', handleTaskPointClick);
});
const $backToMap = document.querySelector(".button__back--walking").addEventListener('click', () => showSceneByClass("scene-map"));

const init = () => {
    // showSceneByClass("scene-intro")
    loadMapPoints()
    goToMap()
    handleProgressBar()
    // goToGame()
}

init();