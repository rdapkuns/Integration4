const spaces = [
    {
        name: "The Living",
        icon: "./assets/svg/living.svg",
        media: "./assets/video/living.mp4",
        description: "We have the living room, where I toss down my groceries, plop myself anywhere, and honestly just… exist."
    },
    {
        name: "Salon",
        icon: "./assets/svg/salon.svg",
        media: "./assets/video/salon.mp4",
        description: "Then there’s... the salon. This is my family’s house, full of old stories and once-upon-a-times."
    },
    {
        name: "Atelier",
        icon: "./assets/svg/atelier.svg",
        media: "./assets/video/atelier.mp4",
        description: "We also have the atelier - the place where we make our little Frankensteins. It’s where creativity runs wild and free."
    },
    {
        name: "Cafe",
        icon: "./assets/svg/cafe.svg",
        media: "./assets/video/cafe.mp4",
        description: "We also have the Café – my little hideout when I need a breather."
    }
];

const $space = document.querySelector(".space");
const $spName = document.querySelector(".space_name");
const $spIcon = document.querySelector(".space_icon");
const $spMedia = document.querySelector(".space_media");
const $spDescription = document.querySelector(".space_description");
const $prevBtn = document.querySelector(".prev_btn");
const $nextBtn = document.querySelector(".next_btn");

let currentIndex = 0;

const init = () => {
    $nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % spaces.length;
        updateSpace(currentIndex);
    });

    $prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + spaces.length) % spaces.length;
        updateSpace(currentIndex);
    });

    updateSpace(currentIndex);
}

const updateSpace = (index) => {
    const space = spaces[index];
    $spName.textContent = space.name;
    $spIcon.src = space.icon;
    $spIcon.alt = space.name;
    $spMedia.src = space.media;
    $spMedia.alt = space.name;
    $spDescription.textContent = space.description;
}

init();