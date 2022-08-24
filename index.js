import ancientsData from "./data/ancients.js";
import difficulties from "./data/difficulties.js";
// import {brownCards, blueCards, greenCards} from "./data/mythicCards.js";

const ancients = document.querySelector(".ancients");
const levels = document.querySelector(".levels");
let idAncient
let difficultLevel

const renderAcients = () => {
  ancientsData.forEach(element => {
      ancients.innerHTML += `<li class="acientItem"><img src="${element.cardFace}" alt="${element.name}" id="${element.id}"></li>`
  })
}

const renderHelper = () => {
   
}

ancients.addEventListener('click', (evt) => {
    evt.stopImmediatePropagation();
    idAncient = evt.target.id
    levels.innerHTML = ''
    difficulties.forEach(element => {
        levels.innerHTML += `<li class="acientItem"><span id="${element.id}">${element.name}</span></li>`
    })
    levels.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        difficultLevel = event.target.id
        renderHelper()
    })
})



renderAcients();