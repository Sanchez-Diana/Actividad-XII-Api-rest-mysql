const respuesta = fetch('http://localhost:3000/productos')

.then(respuesta => respuesta.json())
.then(datos => mostrarProductos(datos));

const mostrarProductos = (datos) => {
    let productos = "";
    const contenedor = document.querySelector('#contenedor');
    datos.forEach(prod => {
        productos += `
       <div class="card m-2 border border-1  border-dark d-flex flex-column align-items-center" style="width: 100%; max-width: 300px; margin:30px; background-color: #FFEEE0">
              <img src="img/${prod.imagen}" class="card-img-top" style="border-bottom: 1px solid #000;" alt="...">
              <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                  <p class="card-text">${prod.descripcion}</p>
                <p class="card-text">$${prod.precio}</p>
                 <button class="btn edit" type="submit" id="btneditar" style="background-color: #CCBFB4; color: black; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Comprar</button>

              </div>
        </div>
        `;

    }

    );
    contenedor.innerHTML = productos;
}
