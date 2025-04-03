(function(){
    const Answers = {

        quiz: null,
        correctAnswers: null,
        listOfAnswers: [],
        questionsListElement: null,
        currentIndex: 1,


        init() {
            const url = new URL(location.href);
            const listOfAnswersParam = url.searchParams.get("answers");
            this.listOfAnswers = listOfAnswersParam ? listOfAnswersParam.split(',') : [];
            const testId = Number(url.searchParams.get("id"));
            const score = Number(url.searchParams.get("score"));
            const total = Number(url.searchParams.get("total"));

            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "https://testologia.ru/get-quiz?id=" + testId, false);
                xhr.send();

                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }

                } else {
                    location.href = 'index.html';
                }

                const xhr2 = new XMLHttpRequest();
                xhr2.open("GET", 'https://testologia.ru/get-quiz-right?id=' + testId, false);
                xhr2.send();

                if (xhr2.status === 200 && xhr2.responseText) {
                    try {
                        this.correctAnswers = JSON.parse(xhr2.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                } else {
                    location.href = 'index.html';
                }
                this.showQuiz();

                const testResults = document.getElementById('right-answers');
                testResults.onclick = function () {
                    location.href = location.href = 'result.html?score=' + score + '&total=' + total +
                        '&id=' + testId + '&answers=' + listOfAnswersParam;
                }
            }





        },
        showQuiz() {
        document.getElementById('test-name').innerText = this.quiz.name;
        this.questionsListElement = document.getElementById('questions-list');

        this.quiz.questions.forEach((question) => {
            const testQuestionElement = document.createElement('div');
            testQuestionElement.className = 'test-question';

            const testQuestionTitleElement = document.createElement('div');
            testQuestionTitleElement.className = 'test-question-title';
            testQuestionTitleElement.innerHTML = '<span>Вопрос ' + this.currentIndex + ': </span>'
                + question.question;

            const testQuestionOptionsElement = document.createElement('div');
            testQuestionOptionsElement.className = 'test-question-options';

            testQuestionElement.appendChild(testQuestionTitleElement);
            testQuestionElement.appendChild(testQuestionOptionsElement);
            this.questionsListElement.appendChild(testQuestionElement);






            question.answers.forEach((answer) => {
                const testQuestionOptionElement = document.createElement('div');
                testQuestionOptionElement.className = 'test-question-option';

                const inputId = 'answer- ' + answer.id;
                const inputElement = document.createElement('input');
                inputElement.className = 'option-answer';
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('name', 'answer');
                inputElement.setAttribute('id', inputId);
                inputElement.setAttribute('value', answer.id);
                inputElement.setAttribute('disabled', 'disabled');



                const labelElement = document.createElement('label');
                labelElement.setAttribute('for', inputId);
                labelElement.innerText = answer.answer;

                if (+this.listOfAnswers[this.currentIndex - 1] === answer.id) {

                    if (+this.listOfAnswers[this.currentIndex - 1] !== this.correctAnswers[this.currentIndex - 1] ) {
                        inputElement.classList.add('incorrect');
                        labelElement.classList.add('incorrect');
                    } else {
                        inputElement.classList.add('correct');
                        labelElement.classList.add('correct');
                    }
                }

                testQuestionOptionElement.appendChild(inputElement);
                testQuestionOptionElement.appendChild(labelElement);

                testQuestionOptionsElement.appendChild(testQuestionOptionElement);

            })

            this.currentIndex ++;
        })

        },
    };
    Answers.init();
})();