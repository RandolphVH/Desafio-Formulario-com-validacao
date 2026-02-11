const form = document.querySelector('form');
const submitButton = document.querySelector('input.submit-btn');

// Seleciona os campos que precisam ser validados
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Listener para o phoneInput que remove não-dígitos
phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '');
});

const messageTextarea = document.getElementById('message');

// Seleciona as mensagens de erro associadas
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const messageError = document.getElementById('message-error');

// Agrupa os campos e suas mensagens de erro para facilitar a iteração
const fieldsToValidate = [
    { field: nameInput, error: nameError },
    { field: emailInput, error: emailError },
    { field: phoneInput, error: phoneError },
    { field: messageTextarea, error: messageError }
];

// Função para validar um campo específico
function validateField(item) {
    if (item.field.value.trim() === '') {
        item.field.classList.add('obrigatory');     // Campo vazio, marca como obrigatório
        item.error.classList.remove('none');        // Mostra mensagem de erro
        item.field.classList.remove('filled');      // Remove 'filled'
        return false;
    } else { // Campo NÃO está vazio
        item.field.classList.remove('obrigatory');  // Remove 'obrigatory'
        item.error.classList.add('none');           // Esconde mensagem de erro
        item.field.classList.add('filled');
        return true;
    }
}

// Adiciona event listeners para validação em tempo real (input e blur)
fieldsToValidate.forEach(item => {
    item.field.addEventListener('input', () => validateField(item));
    item.field.addEventListener('blur', () => validateField(item));
});


form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    let formIsValid = true;

    // Valida todos os campos ao submeter o formulário
    fieldsToValidate.forEach(item => {
        if (!validateField(item)) { // Se qualquer campo for inválido, o formulário é inválido
            formIsValid = false;
        }
    });

    if (formIsValid) {
        console.log('Formulário enviado com sucesso!');
        form.submit(); // Envia o formulário
    }
});
