const api = new ApiService();

async function loadCategories() {
    const listaCategorias = await api.getCategories();

    const contenedor = document.querySelector('#category-list')
    contenedor.innerHTML = '';
    for (let c of listaCategorias) {
        contenedor.innerHTML += `
        <li data-id="${c.id}">
            <span>${c.name}</span>
            <button class="btn-delete" data-id="${c.id}">Delete</button>
        </li>
    `;
    }
}
loadCategories();


const modal = document.querySelector('#category-modal');
const btnAddCategory = document.querySelector('#add-category');
const btnCancelCategory = document.querySelector('#btn-cancel-category');
btnAddCategory.addEventListener('click', () => {
    modal.showModal();
});
btnCancelCategory.addEventListener('click', () => {
    modal.close();
});

const guardarCategoria = document.querySelector('#btn-save-category')
guardarCategoria.addEventListener('click', async () => {

    const input = document.querySelector('#category-name');
    const nombre = input.value.trim();

    if (!nombre) return;

    try {
        await api.createCategory(nombre);

        input.value = '';
        modal.close();
        loadCategories();
    } catch (error) {
        console.error('Error al guardar la categoría:', error);
    }
});

const categoryList = document.querySelector('#category-list');
categoryList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.dataset.id;

        await api.deleteCategory(id);

        loadCategories();
    }
});