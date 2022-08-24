import ancientsData from "./data/ancients.js";
import difficulties from "./data/difficulties.js";
import {brownCards, blueCards, greenCards} from "./data/mythicCards/index.js";

const ancients = document.querySelector(".ancients");
const levels = document.querySelector(".levels");
const getCardButton = document.querySelector(".getCardButton")
const cardRender = document.querySelector(".findCard")
const stageStatus = document.querySelector('.status')
let idAncient
let difficultLevel

const renderAncients = () => {
    ancients.innerHTML = ''
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
    return JSON.parse(JSON.stringify(ancient))
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
            cardRender.innerHTML = `<img src="${greenCard.splice(Math.floor(Math.random() * greenCard.length), 1)}" alt="test">`
            ancient[stage]['greenCards']--
        } else if (ancient[stage]['brownCards'] !== 0) {
            cardRender.innerHTML = `<img src="${brownCard.splice(Math.floor(Math.random() * brownCard.length), 1)}" alt="test">`
            ancient[stage]['brownCards']--
        } else if (ancient[stage]['blueCards'] !== 0) {
            cardRender.innerHTML = `<img src="${blueCard.splice(Math.floor(Math.random() * blueCard.length), 1)}" alt="test">`
            ancient[stage]['blueCards']--
        }

    }

    const renderStageStatus = () => {
        stageStatus.innerHTML = ''
        let stage = ['firstStage', 'secondStage', 'thirdStage']
        let stageName = ['Первая стадия', 'Вторая стадия', 'Третья стадия']
        for (let i = 0; i < stage.length; i++) {
            stageStatus.innerHTML += `
            <div>
                <span class="stageSpan">${stageName[i]}</span>
                <div class="stage">
                    <div class="green">${ancient[stage[i]]['greenCards']}</div>
                    <div class="brown">${ancient[stage[i]]['brownCards']}</div>
                    <div class="blue">${ancient[stage[i]]['blueCards']}</div>
                </div>
            </div>
           `
        }

    }

    renderStageStatus()

    getCardButton.addEventListener('click', (event) => {
        event.preventDefault()
        getCardButton.innerHTML = '<img src="./assets/mythicCardBackground.png" alt="getNewCard">'
        if (ancient.firstStage.greenCards !== 0 || ancient.firstStage.brownCards !== 0 || ancient.firstStage.blueCards !== 0) {
            renderStage('firstStage')
        } else if (ancient.secondStage.greenCards !== 0 || ancient.secondStage.brownCards !== 0 || ancient.secondStage.blueCards !== 0) {
            renderStage('secondStage')
        } else if (ancient.thirdStage.greenCards !== 0 || ancient.thirdStage.brownCards !== 0 || ancient.thirdStage.blueCards !== 0) {
            renderStage('thirdStage')
        }
        renderStageStatus()
        if (greenCard.length === 0 && brownCard.length === 0 && blueCard.length === 0) {
            getCardButton.innerHTML = ''
        }
    })
}

const renderLevels = () => {
    levels.innerHTML = ''
    difficulties.forEach(element => {
        levels.innerHTML += `<li class="ancientLevelButton"><span id="${element.id}">${element.name}</span></li>`
    })
}

ancients.addEventListener('click', (evt) => {
    idAncient = evt.target.id
    renderAncients()
    document.getElementById(idAncient).style.border="2px solid red"
    levels.innerHTML = ''
    getCardButton.innerHTML = ''
    cardRender.innerHTML = ''
    stageStatus.innerHTML = ''
    renderLevels()
    levels.addEventListener('click', (event) => {
        renderLevels()
        difficultLevel = event.target.id
        document.getElementById(difficultLevel).parentElement.style.border="2px solid red"
        cardRender.innerHTML = ''
        getCardButton.innerHTML = '<span>Замешать колоду</span>'
        renderHelper()
    })
})

renderAncients();