const cards = [
    {character: "人",
    pronunciation: "rén",
    translation: "человек",
    association: "Две черты напоминают ноги шагающего человека.",
image: "https://avatars.mds.yandex.net/i?id=ecb8c6ce2e96e5b859dcb26073e07d2b926a8e1d-5087064-images-thumbs&n=13",
imageAlt: "Шагающий человек",
keyInfo:"人 — ключ «человек». В составе других иероглифов слева часто выглядит как 亻. Например: 休 — отдыхать."},
{character: "木",
    pronunciation: "mù",
    translation: "дерево",
    association: "Представь ствол, ветки и корни дерева.",
image: "https://i.pinimg.com/736x/aa/da/68/aada686cdcde53afbee5b9949091863b.jpg" ,
imageAlt: "Дерево со стволом и ветвями",
keyInfo: "木 — ключ «дерево». Два дерева образуют 林 — роща, а три дерева образуют 森 — лес."},
{character: "山",
    pronunciation: "shān",
    translation: "гора",
    association: "Три выступа напоминают горные вершины.",
image: "https://i.ytimg.com/vi/3GmIiRc2vPc/maxresdefault.jpg" ,
imageAlt: "Горные вершины",
keyInfo: "山 — ключ «гора». Он встречается в иероглифах, связанных с горами. Например: 岛 — остров."
},
{character: "你",
    pronunciation: "nǐ",
    translation: "ты",
    association: "Представь человека слева, который показывает прямо на тебя.",
image: "images/ni.png",
imageAlt: "Указывающий палец",
keyInfo:"Ключ 亻 означает «человек», а 尔 ěr справа — исторический фонетик."},
{character: "好",
pronunciation: "hǎo",
translation: "хороший, хорошо",
association: "Женщина 女 берёт ребёнка 子 за руку, и ребёнку сразу хорошо.",
image: "https://www.chineasy.com/wp-content/uploads/2024/06/Chinese-word-for-good-1-300x300.png",
imageAlt: "Мама и ребенок",
keyInfo:"Ключ 女 означает «женщина», 子 — «ребёнок»; отдельного фонетика нет."
},
{character: "您",
pronunciation: "nín",
translation: "Вы, вежливое обращение к одному человеку",
association: "Под знаком 你 «ты» появилось сердце 心: так ты обращаешься к человеку с уважением.",
image: "images/nin.png",
imageAlt: "Сердце",
keyInfo:"Ключ 心 означает «сердце», а верхняя часть 你 nǐ помогает запомнить звучание nín."
},
{character: "们",
pronunciation: "men",
translation: "показатель множественного числа в 你们 «вы»",
association: "У двери 门 стоит человек 亻, а за ним ждут остальные: вот уже целая группа.",
image: "images/men.png",
imageAlt: "Дверь",
keyInfo:"Ключ 亻 означает «человек», а фонетик 门 mén почти точно передаёт звучание безударного men."
}];
let currentIndex = 0;

const character = document.getElementById("character");
const pronunciation = document.getElementById("pronunciation");
const translation = document.getElementById("translation");
const association = document.getElementById("association");
const counter = document.getElementById("counter");
const associationImage = document.getElementById("image");
const keyInfo = document.getElementById("key")

const answrButton = document.getElementById("answr-button");
const meaning = document.getElementById("meaning");
const nextButton = document.getElementById("next-button");

function showCard() {const card = cards[currentIndex];
    character.textContent = card.character;
  pronunciation.textContent = "Произношение: " + card.pronunciation;
   keyInfo.textContent = card.keyInfo;
  translation.textContent = "Значение: " + card.translation;
  association.textContent = "Ассоциация: " + card.association;
  associationImage.src = card.image;
  associationImage.alt = card.imageAlt;

  counter.textContent = "Карточка "+(currentIndex +1) + "/"+ cards.length;
  meaning.hidden = true;
  answrButton.textContent = "Показать значение"}

answrButton.addEventListener("click", function (){
 meaning.hidden = !meaning.hidden;
 
 if (meaning.hidden) {
    answrButton.textContent ='Показать значение'} 
    else {
    answrButton.textContent ='Скрыть значение'}
});
nextButton.addEventListener("click", function () {
    currentIndex = currentIndex + 1;
    if (currentIndex >=cards.length){
        currentIndex = 0;
    }
     showCard()});
     
showCard();
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const clearButton = document.getElementById("clear")

let Drawing = false;
context.lineWidth=5;
context.lineCap="round";
context.lineJoin = "round";
context.strokeStyle ="#292929";

function getPosition(event) {
     const rect = canvas.getBoundingClientRect();
     return {
        x: (event.clientX - rect.left) * canvas.width/ rect.width,
        y: (event.clientY - rect.top) * canvas.height/ rect.height
    };
}

canvas.addEventListener("pointerdown", function(event){
    const position = getPosition(event);
    Drawing = true;
    canvas.setPointerCapture(event.pointerId);

    context.beginPath();
    context.moveTo(position.x,position.y);
});
canvas.addEventListener("pointermove", function(event){
    if(!Drawing) {
        return;
    }
    const position = getPosition(event);

    context.lineTo(position.x,position.y);
    context.stroke();
});

function stopDrawing(){
    Drawing = false;
}

canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointercancel", stopDrawing);
canvas.addEventListener("lostpointercapture", stopDrawing);

clearButton.addEventListener("click", function(){
    context.clearRect(0,0, canvas.width, canvas.height);

});

const quizCharacter = document.getElementById("quiz-character");
const quizOptions = document.getElementById("quiz-options");
const quizResult = document.getElementById("quiz-result");
const quizNext = document.getElementById("quiz-next");

let quizIndex = 0;
let correct=0
function shuffle(array) {
    for(let i= array.length -1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temporary = array[i];
        array[i]=array[j]
        array[j]=temporary
    }
}
function showQuestion() {
    const question = cards[quizIndex];

    quizCharacter.textContent = question.character;
    quizResult.textContent ='';
    quizOptions.replaceChildren();
    quizNext.disabled = true;

   const wrongTranslations = [];

cards.forEach(function (card) {
  if (
    card.translation !== question.translation &&
    !wrongTranslations.includes(card.translation)
  ) {
    wrongTranslations.push(card.translation);
  }
});

shuffle(wrongTranslations);

const answers = [
  question.translation,
  ...wrongTranslations.slice(0, 3)
];

shuffle(answers);

answers.forEach(function (answer) {
    const button = document.createElement("button");
    button.textContent = answer;
        button.addEventListener("click", function(){
            if(answer === question.translation){
                correct = correct +1
                quizResult.textContent = "Верно! Молодец";
                quizResult.style.color = "#287044";
            } else{
                quizResult.textContent = "Неверно. Правильный ответ:"+ question.translation;
                quizResult.style.color = "#a83232"
            }
            for(const option of quizOptions.children){
                option.disabled = true;
            }
            quizNext.disabled = false;
        });
        quizOptions.appendChild(button);
    });
}
quizNext.addEventListener("click", function(){
   if (quizIndex === cards.length) {
    quizIndex = 0;
    correct = 0;
    quizNext.textContent = "Следующий вопрос";
     showQuestion();
     return;}

    quizIndex = quizIndex + 1;

    if (quizIndex < cards.length) {
        showQuestion();
    } else {quizCharacter.textContent = "";
    quizOptions.replaceChildren();

    quizResult.style.color = "#292929";
    quizResult.textContent =
      "Тест завершён! Правильных ответов: " +
      correct + " из " + cards.length;

    quizNext.textContent = "Пройти заново";
  } 
});
showQuestion()




