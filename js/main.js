// Array donde se van a almacenar los articulos del carrito
let carrito = [];
let productos = []; // Array para almacenar los productos del JSON

// Div en el que se van a mostrar 
const divCarrito = document.getElementById('divCarrito');    

const carritoGuardado = localStorage.getItem("carrito");


function cargarJson() {

    fetch('js/datos.json')

        .then(res => res.json())
        .then(data => {
            
            productos = data.productos;                
            categorias('1'); // Establezco una categoria por defecto
        });    
}

cargarJson();

if (carritoGuardado) 
{
    carrito = JSON.parse(carritoGuardado);
    mostrarCarrito();  // Para que se muestre lo guardado
}

function categorias(cat) {

    // Seleccionar el div donde vamos a crear los productos
    let contenedorProductos = document.getElementById('lista_productos');
    contenedorProductos.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos

    // Crear Contenedor de Productos  
    let contenedorProducto = document.createElement('div');
    
    // Agregar una clase css al producto
    contenedorProducto.classList.add('row');

    // Carrito de compras que se va a llenar dinamicamente

    let descripcion = '';

    switch(cat) {
        case '1':   
            descripcion = 'Frutas Frescas';
            break;
        case '2':   
            descripcion = 'Verduras';
            break;
        case '3':   
            descripcion = 'Hortalizas';
            break;
        case '5':   
            descripcion = 'Frutas Exóticas';
            break;
        case '4':   
            descripcion = 'Hierbas Aromáticas';
            break;                                                                      
    }


    contenedorProducto.innerHTML += `

        <h3 id="descrip_categoria">${descripcion}</h3>
        <hr>
    
    `

    productos.forEach(producto => {

            if(cat == producto.categoria)
            {

            contenedorProducto.innerHTML += `
            
                <div class="col-sm-3 mb-4">

                    <!-- Producto -->
                    <div class="card">
                        <img src="img/productos/${producto.imagen}" class="card-img-top img-fluid" alt="${producto.nombre}">

                        <div class="card-body">
                            <div class="row pb-2">
                                <div class="col-12 text-center">
                                    <h4 class="card-title">${producto.nombre}</h4>                                
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-center">
                                    <p class="card-text">${producto.descripcion.substring(0,45) + '...'}</p>                        
                                </div>
                            </div>

                            <div class="row align-items-center text-center mt-3">

                                <div class="col-sm-12 justify-content-end mb-2">
                                    <h4>$ ${producto.precio}</h4>
                                </div>                            

                                <div class="col-sm-12 d-flex justify-content-center mb-2">
                                    <a href="javascript:carritoAdd(${producto.id});" class="btn bg-verde text-white rounded" id="btn-add">
                                        SUMAR AL CARRITO
                                    </a>                                
                                </div>                            

                            </div>                        
                            
                        </div>
                    </div>
                    <!-- /Producto -->

                </div> <!-- /col-sm-3 -->
            
            `
        } // Cierre del If

        })

    contenedorProductos.appendChild(contenedorProducto);

} // Cierre Función que filtra por categorias

function carritoAdd(id_producto)
{
    // Busco el producto con el Id recibido por parámetro dentro del array general de productos
    const producto = productos.find(p => p.id === id_producto);

    // Busca el mismo producto pero en el carrito, para actualizar la cantidad si ya existe
    const item = carrito.find(p => p.id === id_producto);

    if(item) // El producto ya existe en el carrito > actualizar cantidad
    {
        item.cantidad++;

        Toastify({
            
            text: "La cantidad del producto se ha actualizado",
            duration: 2000,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`,
            style: {
                background: "#2d572c", 
                color: "#fff", // texto blanco
            }            

        }).showToast();
    }
    else // No existe en el carrito > agregarlo
    {
        carrito.push({...producto, cantidad:1});

        Toastify({

            text: "Producto agregado al carrito",
            duration: 2000,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`,
            style: {
                background: "#2d572c", 
                color: "#fff", // texto blanco
            }                        

        }).showToast();        
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarTotal(carrito.length);
    mostrarCarrito();
}

function actualizarTotal(total)
{
    document.getElementById('cant_carrito').innerHTML = total;
}

function mostrarCarrito()
{
    // Vacio el contenido del divCarrito
    divCarrito.innerHTML = "";
    
    let total = 0;

    if(carrito.length === 0)
    {
        const divVacio = document.createElement("div");
        divVacio.innerHTML = `<p class="text-center">El carrito esta vacio</p>`;
        divCarrito.appendChild(divVacio);
    }
    else
    {
        // Mostrar titulos
        const divTitulos = document.createElement("div");

        divTitulos.classList.add("row", "p-2", "fw-bold");

        divTitulos.innerHTML = `
            <div class="col-6">Producto</div>
            <div class="col-2">Detalle</div>

            <div class="col-2"></div>
        `;
        divCarrito.appendChild(divTitulos);

        // Recorro los elementos del carrito
        carrito.forEach(item => {

            // Crear el div para cada fila
            const div = document.createElement("div");

            div.classList.add("row");
            div.classList.add("p-2");

            div.innerHTML += `

                <div class="col-6 border-bottom">${item.nombre}</div>
                <div class="col-4 border-bottom">${item.cantidad} x $ ${item.precio * item.cantidad}</div>

                <div class="col-2 border-bottom">
                    <a href="javascript:eliminarArticulo(${item.id})">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </a>
                </div>
            `;

            divCarrito.appendChild(div);

            total += item.precio * item.cantidad; // Acumula el total de los productos
            
        });    
        

        // Mostrar el total debajo de la lista
        const divTotal = document.createElement("div");
        divTotal.classList.add("row", "p-2", "fw-bold");
        divTotal.innerHTML = `
            <div class="col-6">Total:</div>
            <div class="col-6 text-right">$${total.toFixed(2)}</div>
        `;
        divCarrito.appendChild(divTotal);
    }

    actualizarTotal(carrito.length);
}

function eliminarArticulo(id_producto)
{
    // Busca el producto con el Id recibido por parámetro dentro del array general de productos
    const index = carrito.findIndex(producto => producto.id === id_producto);

    if (index !== -1) 
    {
        carrito.splice(index, 1);  // elimina 1 elemento en la posición encontrada
    }

    mostrarCarrito();
    actualizarTotal(carrito.length);
}

function mostrarOcultarCarrito()
{
    if(divCarrito.style.display === "none") 
    {
        divCarrito.style.display = "block"; // lo muestra
    } 
    else 
    {
        divCarrito.style.display = "none"; // lo oculta
    }
}