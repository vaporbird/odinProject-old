const submit = document.querySelector('button[type = "submit"]')

submit.addEventListener('click', (e) => {
    e.preventDefault()
    for(input of inputFields){
        checkValidity(input);
        if (input.classList.contains("invalid")){
            input.focus();
            return;
        }
    }
    e.target.form.submit();
})

const inputContainers = document.querySelectorAll('.input-field');

let inputFields = [];
let errorTexts = [];
for (input of inputContainers) {
    inputFields.push(input.children[1]);
    errorTexts.push(input.children[2]);
}

const passwordInput = inputFields[4];
const passwordConfirmInput = inputFields[5];

for (input of inputFields) {
    input.addEventListener('input', (e) => {
        if (e.target.id == 'password' | e.target.id == 'password-confirm') {
            checkValidity(passwordInput);
            checkValidity(passwordConfirmInput);
        }
        else {
            checkValidity(e.target);
        }
    })
}

const checkValidity = function (element) {
    if(element.id == 'password' | element.id == 'password-confirm' ){
        if(passwordInput.value != passwordConfirmInput.value){
            passwordInput.className = (passwordInput.validity.valid)? 'valid' : 'invalid';
            passwordInput.nextElementSibling.style.visibility = (passwordInput.validity.valid)? 'hidden' : 'visible';
            passwordConfirmInput.className = 'invalid';
            passwordConfirmInput.nextElementSibling.style.visibility = 'visible';
            return;
        }
    }

    if (element.validity.valid) {
        element.className = 'valid';
        element.nextElementSibling.style.visibility = 'hidden';
    }
    else {
        element.className = 'invalid';
        element.nextElementSibling.style.visibility = 'visible';
    }
}