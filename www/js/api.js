class ApiService {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    // 1. GET - Obtener todas las categorías
    async getCategories() {
        const res = await fetch(`${this.baseUrl}/categories`);
        if (!res.ok) return [];
        return await res.json();
    }

    // 2. GET - Obtener los sitios de una categoría
    async getSitesByCategory(categoryId) {
        const res = await fetch(`${this.baseUrl}/categories/${categoryId}`);
        if (!res.ok) return [];
        return await res.json();
    }

    // 3. POST - Crear una nueva categoría
    async createCategory(name) {
        const res = await fetch(`${this.baseUrl}/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        if (!res.ok) return null;
        return await res.json();
    }

    // 4. POST - Crear un nuevo sitio dentro de una categoría
    async createSite(categoryId, siteData) {
        const res = await fetch(`${this.baseUrl}/categories/${categoryId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(siteData)
        });
        if (!res.ok) return null;
        return await res.json();
    }

    // 5. DELETE - Borrar una categoría por ID
    async deleteCategory(categoryId) {
        const res = await fetch(`${this.baseUrl}/categories/${categoryId}`, {
            method: 'DELETE'
        });
        return res.ok; // Devuelve true si se borró bien
    }

    // 6. DELETE - Borrar un sitio por ID
    async deleteSite(siteId) {
        const res = await fetch(`${this.baseUrl}/sites/${siteId}`, {
            method: 'DELETE'
        });
        return res.ok; // Devuelve true si se borró bien
    }
}