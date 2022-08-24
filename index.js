import ancientsData from "./data/ancients.js";
import difficulties from "./data/difficulties.js";
import {brownCards, blueCards, greenCards} from "./data/mythicCards/index.js";

const ancients = document.querySelector(".ancients");
const levels = document.querySelector(".levels");
const getCardButton = document.querySelector(".getCardButton")
const cardRender = document.querySelector(".findCard")
let idAncient
let difficultLevel

const renderAcients = () => {
    ancientsData.forEach(element => {
        ancients.innerHTML += `<li class="acientItem"><img src="${element.cardFace}" alt="${element.name}" id="${element.id}"></li>`
    })
}

const getAncientById = () => {
    let ancient
    ancientsData.forEach((value) => {
        if (value.id === idAncient) {
            ancient = value
        }
    })
    return ancient
}

const stageCardLength = (color) => {
    return getAncientById().firstStage[`${color}Cards`] + getAncientById().secondStage[`${color}Cards`] + getAncientById().thirdStage[`${color}Cards`]
}

const getCards = (cardsArray, arrayLength) => {
    let selectedCards = []
    if (difficultLevel === 'veryeasy') {
        cardsArray.forEach(element => {
            if (element.difficulty === 'easy' && selectedCards.length !== arrayLength) {
                selectedCards.push(element.cardFace);
            }
        })
    }
    if (difficultLevel === 'easy') {
        cardsArray.forEach(element => {
            if (element.difficulty !== 'hard' && selectedCards.length !== arrayLength) {
                selectedCards.push(element.cardFace);
            }
        })
    }
    if (difficultLevel === 'normal') {
        cardsArray.forEach(element => {
            if (selectedCards.length !== arrayLength) {
                selectedCards.push(element.cardFace);
            }
        })
    }
    if (difficultLevel === 'hard') {
        cardsArray.forEach(element => {
            if (element.difficulty !== 'easy' && selectedCards.length !== arrayLength) {
                selectedCards.push(element.cardFace);
            }
        })
    }
    if (difficultLevel === 'veryhard') {
        cardsArray.forEach(element => {
            if (element.difficulty === 'hard' && selectedCards.length !== arrayLength) {
                selectedCards.push(element.cardFace);
            }
        })
    }

    while (selectedCards.length !== arrayLength) {
        let randomCard = cardsArray[Math.floor(Math.random() * cardsArray.length)].cardFace;
        if (!selectedCards.includes(randomCard)) {
            selectedCards.push(randomCard)
        }
    }

    return selectedCards
}


const renderHelper = () => {

    let greenCard = getCards(greenCards, stageCardLength("green"))
    let blueCard = getCards(blueCards, stageCardLength("blue"))
    let brownCard = getCards(brownCards, stageCardLength("brown"))
    let ancient = getAncientById()
    const renderStage = (stage) => {
        if (ancient[stage]['greenCards'] !== 0) {
            cardRender.innerHTML = `<img src="${greenCard.pop()}" alt="test">`
            ancient[stage]['greenCards']--
        } else if (ancient[stage]['brownCards'] !== 0) {
            cardRender.innerHTML = `<img src="${brownCard.pop()}" alt="test">`
            ancient[stage]['brownCards']--
        } else if (ancient[stage]['blueCards'] !== 0) {
            cardRender.innerHTML = `<img src="${blueCard.pop()}" alt="test">`
            ancient[stage]['blueCards']--
        }

    }
    getCardButton.addEventListener('click', (event) => {
        if (ancient.firstStage.greenCards !== 0 || ancient.firstStage.brownCards !== 0 || ancient.firstStage.blueCards !== 0) {
            console.log('go here')
            renderStage('firstStage')
        } else if (ancient.secondStage.greenCards !== 0 || ancient.secondStage.brownCards !== 0 || ancient.secondStage.blueCards !== 0) {
            renderStage('secondStage')
        } else if (ancient.thirdStage.greenCards !== 0 || ancient.thirdStage.brownCards !== 0 || ancient.thirdStage.blueCards !== 0) {
            renderStage('thirdStage')
        }
        console.log(ancient)
    })

}

ancients.addEventListener('click', (evt) => {
    evt.stopImmediatePropagation();
    idAncient = evt.target.id
    levels.innerHTML = ''
    getCardButton.innerHTML = ''
    cardRender.innerHTML = ''
    difficulties.forEach(element => {
        levels.innerHTML += `<li class="acientItem"><span id="${element.id}">${element.name}</span></li>`
    })
    levels.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        difficultLevel = event.target.id
        getCardButton.innerHTML = '<span>Get new card</span>'
        renderHelper()
    })
})


renderAcients();