
// 2. Mostramos estos productos en nuestra página o sección
let productosContainer = document.getElementById('productos');

// Crear productos
let contenedorProducto = document.createElement('div');

// Agregar una clase css al producto
contenedorProducto.classList.add('contenedor-producto');

// Agregamos un listener que va iterando el listado de productos
// Se dispara cuando termina la carga del HTML entero


document.addEventListener('DOMContentLoaded', (event) => {

    productos.forEach(producto => {

        contenedorProducto.innerHTML += `
        
            <div class="card">
            </div>
        
        `

    })

})