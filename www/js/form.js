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
loadFormCategories();
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