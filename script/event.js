const inputElements = document.getElementsByClassName('form__input');
const button = document.getElementById('question-form__submit-button');
const eMailPattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

inputElements.indexOf = (element) => {
    for (let i = 0; i < inputElements.length; i++) {
        if (inputElements[i] === element) {
            return i;
        }
    }

    return -1;
};

const testInput = (element, regexp) => {
    if (element.correctValue === element.value) {
        return false;
    }

    const value = element.value;
    const unsuitableValueLength = value.replace(regexp, '').length;

    if (unsuitableValueLength > 0) {
        element.value = element.correctValue;
        return false;
    }

    element.correctValue = element.value;
    return false;
};

const testPattern = (element, pattern, show = (element) => {}) => {
    const value = element.value;
    if (pattern.test(value)) {
        return true;
    } else {
        show(element);
        return false;
    }
};

/*INPUTS' EVENTS*/
for (let i = 0; i < inputElements.length; i++) {
    const input = inputElements[i];
    input.correctValue = '';

    input.onmouseover = function() {
        this.classList.remove('form__input__invalid');
        this.classList.add("form__input__onmouseover");
    };

    input.onmouseout = function() {
        this.classList.remove("form__input__onmouseover");
    };

    input.onfocus = function() {
        input.classList.remove('form__input__invalid');
        this.classList.add("form__input__onfocus");
    };

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const nextIndexOfInput = inputElements.indexOf(input) + 1;

            if (nextIndexOfInput !== inputElements.length) {
                e.preventDefault();
                inputElements[nextIndexOfInput].focus();
            }
        }
    });

    if (input.name === 'name') {

        input.oninput = function () {
            testInput(input, /[а-яА-Я \-]*/);
        };

        input.onblur = function() {
            this.classList.remove("form__input__onfocus");
        };

    } else if (input.name === 'phone') {

        input.oninput = function () {
            testInput(input, /[0-9 +-]*/);
        };

        input.onblur = function() {
            this.classList.remove("form__input__onfocus");
        };

    } else if (input.name === 'email') {

        input.oninput = function () {
            testInput(input, /[a-z0-9_.@-]*/);
        };

        input.onblur = function() {
            this.classList.remove("form__input__onfocus");

            const show = (element) => {
                if (element.value.length !== 0) {
                    element.classList.add('form__input__invalid');
                }
            };
            
            testPattern(input, eMailPattern, show);
        };

    }
}

/*BUTTON'S EVENTS*/
button.onclick = function () {

    for (let j = 0; j < inputElements.length; j++) {
        inputElements[j].classList.remove('form__input__invalid');
    }

};

button.onmouseover = function() {
    this.classList.add("form__button__onmouseover");
};

button.onmouseout = function() {
    this.classList.remove("form__button__onmouseover");
};
