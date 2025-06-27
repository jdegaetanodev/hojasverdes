function categorias(cat) {

    // Seleccionar el div donde vamos a crear los productos
    let contenedorProductos = document.getElementById('lista_productos');
    contenedorProductos.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos productos

    // Crear Contenedor de Productos  
    let contenedorProducto = document.createElement('div');
    
    // Agregar una clase css al producto
    contenedorProducto.classList.add('row');

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
                                    <h4>${producto.precio}</h4>
                                </div>                            

                                <div class="col-sm-12 d-flex justify-content-center mb-2">
                                    <a href="javascript:add(${producto.id});" class="btn bg-verde text-white rounded" id="btn-add">
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

categorias('1')