const botonMenu = document.querySelector(".bi-list");
const menuLateral = document.querySelector(".main__menuLateral");
const botonCerrarMenuLateral = document.getElementById("clMenuLat");
const botonCarritoCompras = document.querySelector(".bi-cart-fill");
const carritoCompras = document.querySelector(".main__carrito");
const botonCerrarCarrito = document.getElementById("clCartComp");
// botones agregar prodductos carrito
const botonesAgregar = document.querySelectorAll(".btn-primary");
const contenedorCarrito = document.querySelector(".main__carrito--productos");

botonMenu.addEventListener("click", () => {

    carritoCompras.classList.remove("mostrar2");

    menuLateral.classList.toggle("mostrar");
})

botonCerrarMenuLateral.addEventListener("click", () => {
    menuLateral.classList.remove("mostrar");
})

botonCarritoCompras.addEventListener("click", () => {

    menuLateral.classList.remove("mostrar");

    carritoCompras.classList.toggle("mostrar2");
})

botonCerrarCarrito.addEventListener("click", () => {
    carritoCompras.classList.remove("mostrar2");
})

// Variable global carrito

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// funcion guardar en localStorage

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Funcion contador de productos en el carrito
function actulizarContadorCarrito() {
    const contadorCarrito = document.getElementById("contador_productos");

    contadorCarrito.textContent = carrito.length;
}

// Funcion contar total de precios en el carrito
function calcularTotalCarrito() {
    const total = carrito.reduce((acc, producto) => {
        const precio = Number(producto.precio.replace("$", ""));
        return acc + precio;
    }, 0);

    document.querySelector("#totalCarrito").textContent = `${total}`;
}

//  Agregar productos al carrito

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", (e) => {
        e.preventDefault();

        const id = Date.now(); // Generar un ID único para el producto
        const nombre = boton.getAttribute("data-nombre");
        const precio = boton.getAttribute("data-precio");
        const img = boton.getAttribute("data-img");

        const producto = `
        <div class="carrito__producto"  data-id="${id}">
            <img src="${img}" alt="${nombre}">
            <div class="carrito__producto--info">
                <h3>${nombre}</h3>
                <p>Precio: ${precio}</p>
                <div>
                    <i class="bi bi-trash3-fill"></i>
                </div>
            </div>
        </div>
        `;

        contenedorCarrito.insertAdjacentHTML("beforeend", producto);

        carrito.push({id, nombre, precio, img });
        guardarCarrito();
        actulizarContadorCarrito();
        calcularTotalCarrito();
    })
})

// Eliminar productos del carrito
contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("bi-trash3-fill")) {
        const productoElemento = e.target.closest(".carrito__producto");
        const idProducto = Number(productoElemento.dataset.id);

        // Eliminar del DOM
        productoElemento.remove();

        // Eliminar del localStorage
        carrito = carrito.filter(producto => producto.id !== idProducto);
        guardarCarrito();
        actulizarContadorCarrito();
        calcularTotalCarrito();
    }
})

// Cargar carrito desde localStorage al inicio
document.addEventListener("DOMContentLoaded", () => {

    carrito.forEach(producto => {

        const productoHTML = `
        <div class="carrito__producto" data-id="${producto.id}">
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="carrito__producto--info">
                <h3>${producto.nombre}</h3>
                <p>Precio: ${producto.precio}</p>
                <div>
                    <i class="bi bi-trash3-fill"></i>
                </div>
            </div>
        </div>             
        `;

        contenedorCarrito.insertAdjacentHTML("beforeend", productoHTML);
        actulizarContadorCarrito()
    })
});