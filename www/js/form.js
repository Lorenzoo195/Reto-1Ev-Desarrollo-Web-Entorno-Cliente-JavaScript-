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
