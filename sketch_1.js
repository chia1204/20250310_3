let radio;
let button;
let questions;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let resultText = '';
let resultColor = '';
let quizFinished = false;

function preload() {
  // 使用 p5.Table 讀取 CSV 檔案
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#dee2ff");

  // 建立選擇題
  radio = createRadio();
  radio.style('width', '600px');
  radio.style('font-size', '30px');

  // 建立按鈕
  button = createButton('提交');
  button.position(windowWidth / 2 , windowHeight / 2 + 50);
  button.style('font-size', '30px');
  button.mousePressed(submitAnswer);

  displayQuestion();
}

function draw() {
  background("#dee2ff");

  // 顯示答對與答錯題數
  textAlign(LEFT);
  textSize(20);
  fill(0);
  text(`答對題數: ${correctAnswers}`, 10, 30);
  text(`答錯題數: ${incorrectAnswers}`, 10, 60);

  // if (quizFinished) {
  //   textAlign(CENTER);
  //   textSize(30);
  //   fill(0);
  //   text(`測驗結束！答對題數: ${correctAnswers}，答錯題數: ${incorrectAnswers}`, windowWidth / 2, windowHeight / 2 + 100);
  // } else {
    // 顯示題目
    fill(0); // 題目顏色設置為黑色
    textSize(30);
    text(questions.getString(currentQuestionIndex, 'question'), windowWidth / 2, windowHeight / 2 - 60);
    // 顯示結果
    fill(resultColor);
    text(resultText, windowWidth / 2, windowHeight / 2 +150);
    // 顯示名字，字體大小設置為20px
    fill(0)
    textSize(20);
    text("413730754 邱佳儀", 10,90);
  }
//}

function displayQuestion() {
  if (currentQuestionIndex < questions.getRowCount()) {
    let question = questions.getRow(currentQuestionIndex);
    radio.option(question.getString('option1'));
    radio.option(question.getString('option2'));
    radio.option(question.getString('option3'));
    radio.option(question.getString('option4'));
    radio.position(windowWidth / 2 , windowHeight / 2-10 );
  } else {
    quizFinished = true;
  }
}

function submitAnswer() {
  let answer = radio.value();
  let correctAnswer = questions.getString(currentQuestionIndex, 'correct');
  if (answer === correctAnswer) {
    resultText = '答對了！';
    resultColor = 'green';
    correctAnswers++;
  } else {
    resultText = '答錯了！';
    resultColor = 'red';
    incorrectAnswers++;
  }
  console.log('選擇的答案是: ' + answer);
  currentQuestionIndex++;
  displayQuestion();
}