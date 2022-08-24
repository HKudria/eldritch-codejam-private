import ancientsData from "./data/ancients.js";
import difficulties from "./data/difficulties.js";
import {brownCards, blueCards, greenCards} from "./data/mythicCards/index.js";

const ancients = document.querySelector(".ancients");
const levels = document.querySelector(".levels");
let idAncient
let difficultLevel

const renderAcients = () => {
    ancientsData.forEach(element => {
        ancients.innerHTML += `<li class="acientItem"><img src="${element.cardFace}" alt="${element.name}" id="${element.id}"></li>`
    })
}

const getCards = (cardsArray, arrayLength) => {
    let selectedCards = []
    if (difficultLevel === 'veryeasy'){
        cardsArray.forEach(element =>{
            if (element.difficulty === 'easy' && selectedCards.length !== arrayLength){
                selectedCards.push(element.cardFace);
            }
        })
    }
    if (difficultLevel === 'easy'){
        cardsArray.forEach(element =>{
            if (element.difficulty !== 'hard' && selectedCards.length !== arrayLength){
                selectedCards.push(element.cardFace);
            }
        })
    }
    if (difficultLevel === 'normal'){
        cardsArray.forEach(element =>{
            if (selectedCards.length !== arrayLength){
                selectedCards.push(element.cardFace);
            }
        })
    }
    if (difficultLevel === 'hard'){
        cardsArray.forEach(element =>{
            if (element.difficulty !== 'easy' && selectedCards.length !== arrayLength){
                selectedCards.push(element.cardFace);
            }
        })
    }
    if (difficultLevel === 'veryhard'){
        cardsArray.forEach(element =>{
            if (element.difficulty === 'hard' && selectedCards.length !== arrayLength){
                selectedCards.push(element.cardFace);
            }
        })
    }

    while (selectedCards.length !== arrayLength){
        let randomCard = cardsArray[Math.floor(Math.random() * cardsArray.length)].cardFace;
        if (!selectedCards.includes(randomCard)){
            selectedCards.push(randomCard)
        }
    }

    return selectedCards
}

const renderHelper = () => {
    let ancient = null
    ancientsData.forEach((value) => {
        if (value.id === idAncient) {
            ancient = value
        }
    })
    const greenCardLength = ancient.firstStage.greenCards + ancient.secondStage.greenCards + ancient.thirdStage.greenCards
    const brownCardLength = ancient.firstStage.brownCards + ancient.secondStage.brownCards + ancient.thirdStage.brownCards
    const blueCardLength = ancient.firstStage.blueCards + ancient.secondStage.blueCards + ancient.thirdStage.blueCards

    let greenCard = getCards(greenCards, greenCardLength)
    let blueCard =  getCards(blueCards, blueCardLength)
    let brownCard = getCards(brownCards, brownCardLength)

    console.log(greenCard)
    console.log(blueCard)
    console.log(brownCard)
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