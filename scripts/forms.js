(function (){
    const Form = {
        agreeElement: null,
        processElement: null,
        fields: [
            {
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name: 'lastName',
                id: 'last-name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            },
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            }
        ],
        // будет срабатывать при запуске страницы
        init () {
            // для того чтобы обращаться к текущему объекту при вызове validateField нужно делать замыкание через другую переменную
            const that = this;
            this.fields.forEach(item => {
                item.element = document.getElementById(item.id);
                // каждый раз, когда в инпуте будет изменяться значение, будет вызываться для этого инпута
                item.element.onchange = function () {
                    that.validateField.call(that, item, this)
                }
            });


            this.processElement = document.getElementById('process');
            this.processElement.onclick = function () {
                that.processForm();
            }

            this.agreeElement = document.getElementById('agree');
            this.agreeElement.onchange = function () {
                that.validateForm();
            }
        },
        validateField(field, element){
            // если значение в текущем инпуте пустое, то рамку родительского элемента окрашиваем в красный
            if (!element.value || !element.value.match(field.regex)) {
                element.parentNode.style.borderColor = "red";
                field.valid = false;
            } else {
                element.parentNode.removeAttribute('style');
                field.valid = true;
            }
            this.validateForm();
        },
        validateForm() {
            const validForm = this.fields.every(item => item.valid);
            const isValid = this.agreeElement.checked && validForm;
            if (isValid) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
            return isValid
        },
        processForm() {
            let paramString = '';
            if (this.validateForm()) {
                this.fields.forEach(item => {
                    paramString += (!paramString? '?' : '&') + item.name + '=' + item.element.value;
                })
                location.href = 'choice.html' + paramString;
            }
        }
    };
    Form.init();
})();
