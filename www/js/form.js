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

    const caracteres = minusculas + mayusculas + numeros + simbolos;
    let password = '';

    for (let i = 0; i < longitud; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        password += caracteres[randomIndex];
    }

    return password;
}

const btnGenerate = document.querySelector('#btn-generate-password');
btnGenerate.addEventListener('click', () => {
    const passwordInput = document.querySelector('#site-password');
    passwordInput.value = generatePassword();
});