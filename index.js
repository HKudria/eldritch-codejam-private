import ancientsData from "./data/ancients.js";
// import difficulties from "./data/difficulties.js";
// import {brownCards, blueCards, greenCards} from "./data/mythicCards.js";

const acients = document.querySelector(".ancients");

const renderAcients = () => {
  ancientsData.forEach(element => {
      acients.innerHTML += `<li class="acientItem" id="${element.id}"><img src="${element.cardFace}" alt="${element.name}"></li>`
  })
}

renderAcients();