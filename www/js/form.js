const api = new ApiService();

async function loadFormCategories() {
    const listaFormCategorias = await api.getCategories();

    const contenedor = document.querySelector('#site-category')
    contenedor.innerHTML = '<option value="">Select a category...</option>';
    for (let c of listaFormCategorias) {
        contenedor.innerHTML += `
            <option value="${c.id}">${c.name}</option>
    `;
    }
}
async function initForm() {
    await loadFormCategories();

    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('category');

    if (categoryId) {
        document.querySelector('#site-category').value = categoryId;
    }
}
initForm();
const form = document.querySelector('#site-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#site-name').value.trim();
    const url = document.querySelector('#site-url').value.trim();
    const user = document.querySelector('#site-user').value.trim();
    const password = document.querySelector('#site-password').value.trim();
    const description = document.querySelector('#site-description').value.trim();
    const categoryId = document.querySelector('#site-category').value.trim();
    const siteData = {
        name: name,
        url: url,
        user: user,
        password: password,
        description: description
    };
    if (!categoryId || !name || !user || !password) return;
    await api.createSite(categoryId, siteData);
    window.location.href = 'index.html';
});

function generatePassword() {
    const longitud = 10;

    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()_+~|}{[]:;?><';

    const cogerUno = (bolsa) => bolsa[Math.floor(Math.random() * bolsa.length)];

    let passwordArray = [
        cogerUno(minusculas),
        cogerUno(mayusculas),
        cogerUno(numeros),
        cogerUno(simbolos)
    ];

    const todos = minusculas + mayusculas + numeros + simbolos;
    for (let i = passwordArray.length; i < longitud; i++) {
        passwordArray.push(cogerUno(todos));
    }

    return passwordArray.sort(() => Math.random() - 0.5).join('');
}

const btnGenerate = document.querySelector('#btn-generate-password');
btnGenerate.addEventListener('click', () => {
    const passwordInput = document.querySelector('#site-password');
    passwordInput.value = generatePassword();
});

const inputName = document.querySelector('#site-name');
const msgName = document.querySelector('#msg-name')
inputName.addEventListener('blur', () => {

    const valido = inputName.value.trim().length;
    
    if (valido >= 3) {
        msgName.innerHTML = '<span class="msg-ok">Válido</span>';
    } else {
        msgName.innerHTML = '<span class="msg-error">El nombre debe tener al menos 3 caracteres</span>';
    }
})

const inputUrl = document.querySelector('#site-url');
const msgUrl = document.querySelector('#msg-url');
inputUrl.addEventListener('blur', () =>{
    const valido = inputUrl.value.trim();
    
    if (valido.length >= 10 && valido.includes('https://')) {
        msgUrl.innerHTML = '<span class="msg-ok">Válido</span>';
    } else {
        msgUrl.innerHTML = '<span class="msg-error">La URL debe tener mínimo 10 caracteres y con https://</span>';
    }
})

const inputUser = document.querySelector('#site-user');
const msgUser = document.querySelector('#msg-user')
inputUser.addEventListener('blur', () => {

    const valido = inputUser.value.trim().length;
    
    if (valido >= 3) {
        msgUser.innerHTML = '<span class="msg-ok">Válido</span>';
    } else {
        msgUser.innerHTML = '<span class="msg-error">La usuario debe tener mínimo 3 caracteres/</span>';
    }
})

const inputPwd = document.querySelector('#site-password');
const msgPwd = document.querySelector('#msg-pwd')
inputPwd.addEventListener('blur', () => {

    const valido = inputPwd.value.trim().length;
    
    if (valido >= 8) {
        msgPwd.innerHTML = '<span class="msg-ok">Válido</span>';
    } else {
        msgPwd.innerHTML = '<span class="msg-error">La contraseña debe tener al menos 8 caracteres</span>';
    }
})
const btnTogglePassword = document.querySelector('#btn-toggle-password');

btnTogglePassword.addEventListener('click', () => {
    const passwordInput = document.querySelector('#site-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        btnTogglePassword.textContent = '🔒'; 
    } else {
        passwordInput.type = 'password';
        btnTogglePassword.textContent = '👁️'; 
    }
});