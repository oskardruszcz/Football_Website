document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz');
    const resultsContainer = document.getElementById('results');

    const questions = [
        {
            question: "Kiedy odbyły się pierwsze Mistrzostwa Świata w piłce nożnej?",
            answers: {
                a: '1930',
                b: '1950',
                c: '1960'
            },
            correctAnswer: 'a'
        },
        {
            question: "Który z tych klubów wygrał najwięcej razy Ligę Mistrzów?",
            answers: {
                a: 'Manchester United',
                b: 'Real Madryt',
                c: 'Bayern Monachium'
            },
            correctAnswer: 'b'
        },
        {
            question: "Który zespół wygrał Mistrzostwa Europy w piłce nożnej UEFA w 2021 roku?",
            answers: {
                a: 'Włochy',
                b: 'Anglia',
                c: 'Francja'
            },
            correctAnswer: 'a'
        },
        {
            question: "Który z tych piłkarzy zdobył najwięcej bramek w historii mistrzostw świata?",
            answers: {
                a: 'Pelé',
                b: 'Cristiano Ronaldo',
                c: 'Miroslav Klose'
            },
            correctAnswer: 'c'
        }
    ];

    function generateQuiz(questions, quizContainer) {
        const output = [];
        questions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (let letter in currentQuestion.answers) {
                const answerId = `question${questionNumber}_${letter}`;
                answers.push(
                    `<input type="radio" id="${answerId}" name="question${questionNumber}" value="${letter}">
                    <label for="${answerId}">
                        ${letter.toUpperCase()} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>`
            );
        });
        quizContainer.innerHTML = output.join('');
    }

    function showResults(questions, quizContainer, resultsContainer) {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        questions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            answerContainer.querySelectorAll('label').forEach(label => {
                label.classList.remove('correct', 'incorrect', 'selected');
            });

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainer.querySelector(`input[value="${userAnswer}"]`).nextElementSibling.classList.add('correct');
            } else {
                if (userAnswer) {
                    answerContainer.querySelector(`input[value="${userAnswer}"]`).nextElementSibling.classList.add('incorrect');
                }
                answerContainer.querySelector(`input[value="${currentQuestion.correctAnswer}"]`).nextElementSibling.classList.add('correct');
            }
        });

        resultsContainer.innerHTML = `Twój wynik: ${numCorrect} z ${questions.length}`;

        quizContainer.querySelectorAll('input[type="radio"]').forEach(input => {
            input.disabled = true;
        });
        submitButton.disabled = true;
        quizContainer.classList.add('quiz-submitted');
    }

    generateQuiz(questions, quizContainer);

    submitButton.addEventListener('click', function () {
        showResults(questions, quizContainer, resultsContainer);
    });
});
