
// const fetch = require('node-fetch');
const ip = "https://alura-geek-cyan-two.vercel.app";

// Función para obtener todos los productos
async function getProducts() {
    const response = await fetch(`${ip}/productos`);
    const data = await response.json();
    return data;
}

// Función para crear un nuevo producto
async function createProduct(product) {
    const response = await fetch(`${ip}/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    });
    return response;
}

// Función para actualizar un producto por su ID
async function updateProduct(id, newData) {
    const response = await fetch(`${ip}/productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    });
    return response;
}

// Función para eliminar un producto por su ID
async function deleteProduct(id) {
    const response = await fetch(`${ip}/productos/${id}`, {
        method: 'DELETE',
    });
    return response;
}

export const conect = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};