const form = document.getElementById('question-form');
const requiredInputs = ['name', 'phone'];

const validate = () => {
    let valid = true;

    for (let i = 0; i < inputElements.length; i++) {
        const element = inputElements[i];
        if (requiredInputs.includes(element.name) && element.value.length === 0) {
            element.classList.add('form__input__invalid');
            valid = false;
        } else if (element.value.length !== 0 &&
            element.name === 'email' &&
            !testPattern(element, eMailPattern)) {

            element.classList.add('form__input__invalid');
            valid = false;
        }
    }

    return valid;
};

form.onsubmit = function () {
    return validate();
};
