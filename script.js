const ui = {
    history:        document.querySelector("#history"),
    form:           document.querySelector("#form"),
    userInput:      document.querySelector("#userInput"),
    sendMessage:    document.querySelector("#sendMessage")
};

let knowledgeBase = []
let rankedArrays = []

fetchJSON()
async function fetchJSON () {
    const response = await fetch('./kb.JSON')
    knowledgeBase = await response.json()
    console.log(`KnowledgeBase loaded:`, knowledgeBase)
}

ui.form.addEventListener("submit", inputSent)

function inputSent (e) {
    e.preventDefault();
    document.getElementById("header").style.display = "none"
    const userInputLC = ui.userInput.value.toLowerCase();
    console.log(userInputLC)

    rankedArrays = []

    for (let i = 0; i < knowledgeBase.length; i++) {
        let count = 0;
        knowledgeBase[i].keywords.forEach((keyword) => {
            let keywordLC = keyword.toLowerCase()
            if (userInputLC.includes(keywordLC)) {
                count++;
            }
        })
        rankedArrays.push({...knowledgeBase[i], score: count})
        console.log(rankedArrays)
    }
    rankedArrays.sort((a, b) => b.score - a.score);
    const mostRelevant = rankedArrays.slice(0, 5)
    console.log(`The most relevent items were:`, mostRelevant)
    renderUserInput()
    renderItems(mostRelevant)

    ui.userInput.value = ""
}

function renderItems (relevantItems) {
    const responseDiv = document.createElement("div")
    responseDiv.className = "aiResponseDiv"
    ui.history.appendChild(responseDiv)
    relevantItems.forEach((item) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "questionDiv";
        const answerDiv = document.createElement("div");
        answerDiv.className = "answerDiv";

        questionDiv.textContent = item.question;
        answerDiv.textContent = item.answer;

        responseDiv.appendChild(questionDiv);
        responseDiv.appendChild(answerDiv);
    })
};

function renderUserInput () {
    const userQuestionDiv = document.createElement("div");
    userQuestionDiv.className = "userQuestionDiv";

    userQuestionDiv.textContent = ui.userInput.value;

    ui.history.appendChild(userQuestionDiv);
};