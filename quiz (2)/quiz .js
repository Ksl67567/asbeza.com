const quizData = [
    {
      question: 'አጼ ተውድሮሰ መቼ ተወለዱ?',
      options: ['1878', '1989', '1818', '1823'],
      answer: '1818',
    },
    {
      question: 'አጼ ዮሃንስ ከ አጼ ሚኒሊክ ጋር ያደረጉት ስምምነት ምን በመባል ይጠራል?',
      options: ['ቦሩ ሜዳ', 'ልቼ', 'ጉንደት', 'ጉራአ'],
      answer: 'ልቼ',
    },
    {
      question: 'የ ሲራራ ነጋዴወች የቡደን መሪ ምን በመባል ይታወቃል?',
      options: ['ነጋድረስ', 'ቡደን መሪ', 'አለቃ', 'አዛዥ'],
      answer: 'ነጋድረስ',
    },
    {
      question: 'ገብጽ በእንግሊዝ መቼ ተያዘች?',
      options: ['1834', '1879', '1878', '1882'],
      answer: '1882',
    },
    {
      question: 'የ ጉንደት ጦርነት መቸ ተደረገ?',
      options: [
        '1888',
        '1878',
        '1875',
        '1884',
      ],
      answer: '1875',
    },
    {
      question: 'የ ሂወት ስምምነት መቸ ተደርገ?',
      options: ['1884', '1885', '1784', '1785'],
      answer: '1884',
    },
    {
      question: 'አጼ ሚኒሊክ መቸ ነገሱ?',
      options: [
        '1879',
        '1834',
        '1889',
        'መልስ የለም',
      ],
      answer: '1889',
    },
    {
      question: 'በ1887 በ ጣልያን እና በአጼ ሚኒሊክ የተደረገው ስምምነት ምን እየተባለ ይጠራል ?',
      options: ['ቦሩ ሜዳ', 'ሂወት', 'ገለልተኛ', 'መልሰ የለም'],
      answer: 'ገለልተኛ',
    },
    {
      question: 'ዉጫሌ ዉል መቼ ተፈረመ?',
      options: [
        '1889',
        '1890',
        '1868',
        '1878',
      ],
      answer: '1889',
    },
    {
      question: 'አጼ ቴውድሮሰ መቼ ነገሱ?',
      options: ['1868', '1828', '1888', '1855'],
      answer: '1855',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();