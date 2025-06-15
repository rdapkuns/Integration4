import { supabase } from '/src/scripts/supabaseClient.js';
import comments from '../comments.json';
import { gsap } from "gsap";
import 'aframe-chromakey-material';


let taskCount = 7
let nextTaskSelected = false
let selectedTask = 0
// let completedTasks = []
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

let isFirstRound = true
let isDoingIntro = true
let currentLocation = undefined

let isBookmarked = false

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

        if (currentLocation === "G2") {
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
    // updataAR()
    if (isDoingIntro === true) {
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

    if (taskCount > 9) {
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



const showPopup = (type) => {
    console.log("clicked")
    const $popup = document.getElementById('popup');
    const $popupIcon = document.querySelector(".popup__icon");
    const $popupText = document.querySelector(".popup__text");

    if (type === "profile") {
        $popupIcon.innerHTML = `<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1070_5858)">
          <path
            d="M24.25 15.5C24.25 16.8924 23.6969 18.2277 22.7123 19.2123C21.7277 20.1969 20.3924 20.75 19 20.75C17.6076 20.75 16.2723 20.1969 15.2877 19.2123C14.3031 18.2277 13.75 16.8924 13.75 15.5C13.75 14.1076 14.3031 12.7723 15.2877 11.7877C16.2723 10.8031 17.6076 10.25 19 10.25C20.3924 10.25 21.7277 10.8031 22.7123 11.7877C23.6969 12.7723 24.25 14.1076 24.25 15.5V15.5Z"
            fill="white" />
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5 19C5 15.287 6.475 11.726 9.10051 9.10051C11.726 6.475 15.287 5 19 5C22.713 5 26.274 6.475 28.8995 9.10051C31.525 11.726 33 15.287 33 19C33 22.713 31.525 26.274 28.8995 28.8995C26.274 31.525 22.713 33 19 33C15.287 33 11.726 31.525 9.10051 28.8995C6.475 26.274 5 22.713 5 19V19ZM19 6.75C16.6931 6.75012 14.4331 7.40163 12.4802 8.62955C10.5273 9.85746 8.96074 11.6119 7.96094 13.6908C6.96113 15.7698 6.56868 18.0888 6.82875 20.381C7.08882 22.6732 7.99084 24.8454 9.431 26.6475C10.6735 24.6455 13.4088 22.5 19 22.5C24.5912 22.5 27.3248 24.6437 28.569 26.6475C30.0092 24.8454 30.9112 22.6732 31.1713 20.381C31.4313 18.0888 31.0389 15.7698 30.0391 13.6908C29.0393 11.6119 27.4727 9.85746 25.5198 8.62955C23.5669 7.40163 21.3069 6.75012 19 6.75V6.75Z"
            fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_1070_5858">
            <rect width="28" height="28" fill="white" transform="translate(5 5)" />
          </clipPath>
        </defs>
      </svg>`
        $popupText.textContent = "Profiles will be added in the next update!"
    } else if (type === "write") {
        $popupIcon.innerHTML = `<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1070_5850)">
            <path
              d="M27.934 7.29196L28.1761 7.04984C28.3583 6.8677 28.5746 6.72324 28.8127 6.62471C29.0508 6.52618 29.3059 6.47551 29.5636 6.47559C29.8212 6.47566 30.0764 6.52648 30.3144 6.62515C30.5524 6.72382 30.7686 6.86841 30.9508 7.05065C31.1329 7.23289 31.2774 7.44922 31.3759 7.68729C31.4744 7.92536 31.5251 8.18051 31.525 8.43816C31.5249 8.69581 31.4741 8.95093 31.3754 9.18894C31.2768 9.42695 31.1322 9.6432 30.95 9.82534L30.7078 10.0658C31.122 10.5304 31.3428 11.1357 31.325 11.7578C31.3072 12.3799 31.0521 12.9717 30.612 13.4117L13.8875 30.1378C13.7829 30.2418 13.652 30.3154 13.5088 30.3507L7.00883 31.9757C6.8728 32.0096 6.73033 32.0077 6.59525 31.9702C6.46018 31.9327 6.3371 31.8609 6.23798 31.7618C6.13885 31.6627 6.06706 31.5396 6.02958 31.4045C5.9921 31.2695 5.9902 31.127 6.02408 30.991L7.64908 24.491C7.68463 24.3484 7.7582 24.2181 7.86195 24.114L23.5302 8.44571C23.3735 8.33542 23.1829 8.28407 22.992 8.30072C22.8011 8.31737 22.6222 8.40096 22.487 8.53671L17.1375 13.8878C17.0619 13.9634 16.9722 14.0233 16.8735 14.0642C16.7748 14.1051 16.669 14.1261 16.5622 14.1261C16.4554 14.1261 16.3496 14.1051 16.2509 14.0642C16.1522 14.0233 16.0625 13.9634 15.987 13.8878C15.9114 13.8123 15.8515 13.7226 15.8106 13.6239C15.7697 13.5252 15.7487 13.4194 15.7487 13.3126C15.7487 13.2058 15.7697 13.1 15.8106 13.0013C15.8515 12.9026 15.9114 12.8129 15.987 12.7373L21.3397 7.38784C21.78 6.94749 22.3722 6.69237 22.9947 6.67484C23.6172 6.65732 24.2228 6.87871 24.6872 7.29359C25.1337 6.89455 25.7114 6.67383 26.3103 6.67353C26.9091 6.67323 27.4871 6.89337 27.934 7.29196V7.29196Z"
              fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_1070_5850">
              <rect width="26" height="26" fill="white" transform="translate(6 6)" />
            </clipPath>
          </defs>
        </svg>`
        $popupText.textContent = "Adding new activities will be added in the next update!"
    } else if (type === "bookmark") {
        if (isBookmarked === false) {

            $buttonBookmark.classList.add("bouncy-scale")


            $buttonBookmark.innerHTML = `<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.0625 34.6875L18.5 25.8285L6.9375 34.6875V2.3125H30.0625V34.6875Z" fill="white"/>
</svg>
`

            $popupIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM17.0742 8.73234L10.7742 16.2323C10.7051 16.3147 10.6191 16.3812 10.5221 16.4273C10.425 16.4735 10.3192 16.4983 10.2117 16.5H10.1991C10.0939 16.5 9.99 16.4778 9.89398 16.435C9.79797 16.3922 9.71202 16.3297 9.64172 16.2516L6.94172 13.2516C6.87315 13.1788 6.81981 13.0931 6.78483 12.9995C6.74986 12.9059 6.73395 12.8062 6.73805 12.7063C6.74215 12.6064 6.76617 12.5084 6.8087 12.4179C6.85124 12.3275 6.91142 12.2464 6.98572 12.1796C7.06002 12.1127 7.14694 12.0614 7.24136 12.0286C7.33579 11.9958 7.43581 11.9822 7.53556 11.9886C7.63531 11.995 7.73277 12.0213 7.82222 12.0659C7.91166 12.1106 7.99128 12.1726 8.05641 12.2484L10.1794 14.6072L15.9258 7.76766C16.0547 7.61863 16.237 7.52631 16.4335 7.51066C16.6299 7.49501 16.8246 7.55728 16.9754 7.68402C17.1263 7.81075 17.2212 7.99176 17.2397 8.18793C17.2582 8.3841 17.1988 8.57966 17.0742 8.73234Z" fill="#ffffff"/>
        </svg>
        `
            $popupText.textContent = "Activity added to your bookmarks!"
            isBookmarked = true
        } else {

            $buttonBookmark.classList.remove("bouncy-scale")


            $buttonBookmark.innerHTML = `<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.75 4.75V31.7109L19.9121 24.9395L19 24.2402L18.0879 24.9395L9.25 31.7109V4.75H28.75Z"
            stroke="white" stroke-width="3" />
        </svg>`

            $popupIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM17.0742 8.73234L10.7742 16.2323C10.7051 16.3147 10.6191 16.3812 10.5221 16.4273C10.425 16.4735 10.3192 16.4983 10.2117 16.5H10.1991C10.0939 16.5 9.99 16.4778 9.89398 16.435C9.79797 16.3922 9.71202 16.3297 9.64172 16.2516L6.94172 13.2516C6.87315 13.1788 6.81981 13.0931 6.78483 12.9995C6.74986 12.9059 6.73395 12.8062 6.73805 12.7063C6.74215 12.6064 6.76617 12.5084 6.8087 12.4179C6.85124 12.3275 6.91142 12.2464 6.98572 12.1796C7.06002 12.1127 7.14694 12.0614 7.24136 12.0286C7.33579 11.9958 7.43581 11.9822 7.53556 11.9886C7.63531 11.995 7.73277 12.0213 7.82222 12.0659C7.91166 12.1106 7.99128 12.1726 8.05641 12.2484L10.1794 14.6072L15.9258 7.76766C16.0547 7.61863 16.237 7.52631 16.4335 7.51066C16.6299 7.49501 16.8246 7.55728 16.9754 7.68402C17.1263 7.81075 17.2212 7.99176 17.2397 8.18793C17.2582 8.3841 17.1988 8.57966 17.0742 8.73234Z" fill="#ffffff"/>
        </svg>
        `
            $popupText.textContent = "Activity removed from your bookmarks!"
            isBookmarked = false
        }

    }

    $popup.classList.remove('hidden');
    $popup.classList.add('show');

    setTimeout(() => {
        $popup.classList.remove('show');
        setTimeout(() => {
            $popup.classList.add('hidden');
        }, 500);
    }, 5000);
}




const debug = () => {
    localStorage.clear();
}

const randomPPL = document.querySelector(".random__ppl").addEventListener("click", debug)

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

const updateARold = () => {
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

const imageCount = {
    A: 7,
    C1: 1,
    C2: 1,
    G1: 1,
    G2: 1,
    L: 16,
    S: 6,
};

// Track shown images
const usedImages = {
    A: new Set(),
    C1: new Set(),
    C2: new Set(),
    G1: new Set(),
    G2: new Set(),
    L: new Set(),
    S: new Set(),
};

const getRandomUnusedImage = (groupKey) => {
    const total = imageCount[groupKey];
    const used = usedImages[groupKey];

    // If all used, reset
    if (used.size >= total) {
        usedImages[groupKey] = new Set();
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * total) + 1;
    } while (usedImages[groupKey].has(randomIndex));

    usedImages[groupKey].add(randomIndex);
    return randomIndex;
};

const updateAR = () => {
    let currentAbby = Math.ceil(taskCount / 2);
    let groupKey = 0
    if (currentLocation.charAt(0) === "L" || currentLocation.charAt(0) === "A" || currentLocation.charAt(0) === "S") {
        groupKey = currentLocation.charAt(0);
    } else {
        groupKey = currentLocation;
    }

    isBookmarked = false

    if (groupKey === "L" || groupKey === "A") {
        const randomIndex = getRandomUnusedImage(groupKey);

        $arMarker.innerHTML = `
        <a-plane src="${base}assets/abbies/abby-${currentAbby}.png" transparent="true" height="5" width="5" position="-4 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
        <a-plane src="${base}assets/questions/${groupKey}/${randomIndex}.png" transparent="true"  class="game__task game__task--1 visually-hidden" height="4" width="6" position="2 1 -4" rotation="0 0 0" true-billboard></a-plane>
        `;

        if (groupKey === "A" && randomIndex === 1) {
            $arMarker.innerHTML = `
            <a-plane src="${base}assets/questions/${groupKey}/${randomIndex}.png" transparent="true"  class="game__task game__task--1 visually-hidden" height="6" width="20" position="0 1 -4.1" rotation="0 0 0" true-billboard></a-plane>
            `;
        }
    } else if (groupKey === "S") {
        const randomIndex = getRandomUnusedImage(groupKey);

        $arMarker.innerHTML = `
        <a-plane src="${base}assets/abbies/abby-${currentAbby}.png" transparent="true" height="5" width="5" position="-6 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
        <a-plane src="${base}assets/questions/${groupKey}/${randomIndex}.jpg" transparent="true"  class="game__task game__task--1 visually-hidden" height="3" width="5" position="0 1 -4" rotation="0 0 0" true-billboard></a-plane>
        <a-plane src="${base}assets/questions/${groupKey}/${randomIndex}-1.png" transparent="true"  class="game__task game__task--1 visually-hidden" height="5" width="6" position="6 1 -4" rotation="0 0 0" true-billboard></a-plane>
        `;
    } else {
        const randomIndex = getRandomUnusedImage(groupKey);

        $arMarker.innerHTML = `
        <a-plane src="${base}assets/abbies/abby-${currentAbby}.png" transparent="true" height="5" width="5" position="-6 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
        <a-plane src="${base}assets/questions/${groupKey}/${randomIndex}.jpg" transparent="true"  class="game__task game__task--1 visually-hidden" height="4" width="6" position="2 1 -4" rotation="0 0 0" true-billboard></a-plane>
        `;
    }

    if (isFirstRound === true) {
        groupKey = "L";
        $arMarker.innerHTML = `
    <a-plane src="${base}assets/abbies/abby-${currentAbby}.png" transparent="true" height="5" width="5" position="-6 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
      <a-plane src="${base}assets/questions/Intro.png" transparent="true" true-billboard class="game__task game__task--1 visually-hidden" height="4" width="6" position="2 1 -4" rotation="0 0 0" true-billboard></a-plane>
    `
        isFirstRound === false
    }

    console.log(base, groupKey);
};


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

    const randomIndex = getRandomUnusedImage("L");

    $arMarker.innerHTML = `
    <a-plane src="${base}assets/abbies/abby-1.png" transparent="true" height="5" width="5" position="-6 0 -4"
        rotation="0 0 0" class="game__task game__task--1"></a-plane>
        <a-plane src="${base}assets/questions/L/${randomIndex}.png" transparent="true"  class="game__task game__task--1 visually-hidden" height="3" width="5" position="0 1 -4" rotation="0 0 0" true-billboard></a-plane>
    `
}
let languageIndex = 0;
const animateTextChange = () => {

    const textOptions = ["ENG", "NL", "FR"]

    languageIndex = (languageIndex + 1) % textOptions.length;
    const newText = textOptions[languageIndex];

    const tl = gsap.timeline();
    const element = document.querySelector(".language")
    const duration = 0.2
    const distance = 40

    tl.to(element, {
        x: distance,
        opacity: 0,
        duration: duration,
        ease: "power2.in",
        onComplete: () => {
            element.textContent = newText;
            gsap.set(element, { x: -distance }); // Move to left, still invisible
        }
    });

    tl.to(element, {
        x: 0,
        opacity: 1,
        duration: duration,
        ease: "power2.out"
    });

    return tl;
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
const $buttonRefresh = document.querySelector(".button__refresh").addEventListener("click", updateAR)
const $buttonProfile = document.querySelector(".button__profile").addEventListener("click", () => showPopup("profile"))
const $buttonWrite = document.querySelector(".button__write").addEventListener("click", () => showPopup("write"))
const $buttonBookmark = document.querySelector(".button__bookmark")
$buttonBookmark.addEventListener("click", () => showPopup("bookmark"))
const $language = document.querySelector(".language").addEventListener("click", () => animateTextChange())

const init = () => {
    // showSceneByClass("scene-intro")
    loadMapPoints()
    goToMap()
    handleProgressBar()
    // goToGame()
}

init();