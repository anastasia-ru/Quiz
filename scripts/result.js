(function () {
    const Result = {

        init() {
            const url = new URL(location.href);
            const answers = url.searchParams.get("answers");
            const id = url.searchParams.get("id");
            const score = Number(url.searchParams.get("score"));
            const total = Number(url.searchParams.get("total"));

            document.getElementById('result-score').innerText = url.searchParams.get('score') +
                '/' + url.searchParams.get('total');

            const checkResults = document.getElementById('check-answers');

            checkResults.onclick = function () {
                location.href = 'answers.html?score=' + score + '&total=' + total +
                    '&id=' + id + '&answers=' + answers;;
            }
        }
    }
    Result.init();
})();