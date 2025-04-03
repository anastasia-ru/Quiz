(function () {
    const Result = {

        init() {
            const url = new URL(location.href);
            const answers = url.searchParams.get("answers");
            const id = url.searchParams.get("id");

            document.getElementById('result-score').innerText = url.searchParams.get('score') +
                '/' + url.searchParams.get('total');

            const checkResults = document.getElementById('check-answers');

            checkResults.onclick = function () {
                location.href = 'answers.html?id=' + id + '&answers=' + answers;
            }
        }
    }
    Result.init();
})();