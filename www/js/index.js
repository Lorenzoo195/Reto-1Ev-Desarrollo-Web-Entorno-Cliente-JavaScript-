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
const btnAddCategory = document.querySelector('#btn-add-category');
const btnCancelCategory = document.querySelector('#btn-cancel-category');

let selectedCategoryId = null;
const btnAddSite = document.querySelector('#btn-add-site');
btnAddSite.addEventListener('click', () => {
    if (selectedCategoryId) {
        window.location.href = `form.html?category=${selectedCategoryId}`
    } else {
        window.location.href = 'form.html';
    }
});
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

    await api.createCategory(nombre);

    input.value = '';
    modal.close();
    loadCategories();

});

const categoryList = document.querySelector('#category-list');
categoryList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.dataset.id;
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se eliminará la categoría",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {

                await api.deleteCategory(id);
                event.target.closest('li').remove();

                Swal.fire("¡Eliminado!", "La categoría ha sido borrada.", "success");

                if (selectedCategoryId === id) {
                    selectedCategoryId = null;
                    const tbody = document.querySelector('#site-table-tbody');
                    tbody.innerHTML = '';
                }
            }
        });

    } else {
        const li = event.target.closest('li')
        if (!li) return;
        const id = li.dataset.id;
        selectedCategoryId = id;

        document.querySelectorAll('#category-list li').forEach(el => el.classList.remove('selected'));
        li.classList.add('selected');

        const categoria = await api.getSitesByCategory(id);
        console.log(categoria)

        const tbody = document.querySelector('#site-table-tbody');
        tbody.innerHTML = '';

        for (let s of categoria.sites) {
            tbody.innerHTML += `
                        <tr>
                            <td>${s.name}</td>
                            <td>${s.user}</td>
                            <td>${new Date(s.createdAt).toLocaleString()}</td>
                            <td>
                                <button class="btn-delete" data-id="${s.id}">Delete</button>
                            </td>
                        </tr>
                    `;
        }
    }
});

const siteTbody = document.querySelector('#site-table-tbody');
siteTbody.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.dataset.id;
        await api.deleteSite(id)
        const fila = event.target.closest('tr');
        fila.remove();
    }
});
