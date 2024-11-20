
 const endpoint = 'http://localhost:3000/productos'

const formAñadir = document.forms['formAñadir']
console.log(formAñadir)
formAñadir.addEventListener('submit', (event) => {
  event.preventDefault();

  var img = document.createElement('img')
  

  let nombre = formAñadir.nombre.value
  let descripcion = formAñadir.descripcion.value
  let precio = formAñadir.precio.value
  let imagen = formAñadir.imagen.value
  console.log(nombre,descripcion,precio,imagen);

  let newDatos = {imagen: imagen, nombre: nombre, descripcion: descripcion, precio: precio }


  if (!newDatos.nombre || !newDatos.descripcion || !newDatos.precio) {
    document.querySelector('#mensajeCompletar').innerHTML = '*Complete todos los datos'
    document.querySelector('#mensajeCompletar').className += " bg-danger text-light";
    return
  }
  else {
    document.querySelector('#mensajeCompletar').innerHTML = ''
 
  }

  let nuevosDatosJson = JSON.stringify(newDatos)
  console.log(nuevosDatosJson)
  const enviarNewProducto = async() =>{ 
    try{
      const enviarDatos = await fetch(endpoint, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: nuevosDatosJson
      })
      const respuesta = await enviarDatos.json()
      console.log(respuesta.mensaje)

    // document.querySelector('#agregando').style.display = 'none'
    mostrarMensaje(respuesta.mensaje)
    
    setTimeout(()=>{location.reload();},3000)

    }
    catch(error){
      console.log(error)
    }
  }
  enviarNewProducto()
})

mostrarMensaje=(mensaje)=>{
  console.log(mensaje)
  console.log(document.querySelector('#mensajeBack'))
  document.querySelector('#mensajeBack').className += " bg-warning";
  document.querySelector('#mensajeBack').innerHTML = mensaje
}

const eliminar = (id)=>{
  console.log(id)
if(confirm('Seguro desea eliminar?')){
  const eliminarProd = async()=>{
    try{
      const res=await fetch(endpoint+'/'+id,{
        method: 'delete'
      })
      const respuesta = await res.json()
      mostrarMensaje(respuesta.mensaje)
      setTimeout(()=>{location.reload();},3000)
    }catch(error){
      mostrarMensaje('error al mostrar mensaje')
    }
    
  }

  eliminarProd()
}
}



    const contenedor = document.querySelector('#contenedor');
    let productos = ''

const obtenerDatos = async()=>{
  try{
    const respuesta = await fetch(endpoint)
    productosRecibidos = await respuesta.json()
    productosRecibidos.forEach(prod => {
        productos += `<div class="card m-2 border border-1  border-dark d-flex flex-column align-items-center" style="width: 100%; max-width: 300px; margin:30px; background-color: #FFEEE0">
        <img src="img/${prod.imagen}" class="card-img-top" style="border-bottom: 1px solid #000;" alt="...">
        <div class="card-body">
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-text">$${prod.precio}</p>
          <p class="card-text">${prod.descripcion}</p>
        <div class="d-flex justify-content-center">
              <button class="btn" id="editar" type="submit" onclick="editar(${prod.id})">
                  <i class="bi bi-pencil-square" style="font-size: 1.5rem;"></i>
              </button>
              <button class="btn" id="borrar" type="submit" onclick="eliminar(${prod.id})">
                  <i class="bi bi-trash3-fill"  style="font-size: 1.5rem;"></i>
              </button>
        </div>
          
          
        </div>
        
      </div>
        `;

    })


    contenedor.innerHTML = productos;
  }catch(error){
    mostrarMensaje('error al cargar productos')
  }
 }
obtenerDatos();



const formEditar = document.forms['formEditar']
console.log(formEditar)
const editar = (id) => {
  console.log (id)
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  let prodEditar = {}
  productosRecibidos.filter (prod=>{
    if(prod.id==id){
      prodEditar = prod
    }
  }) 
  console.log (prodEditar)

  formEditar.id.value = prodEditar.id 
  formEditar.nombre.value = prodEditar.nombre
  formEditar.descripcion.value = prodEditar.descripcion
  formEditar.precio.value = prodEditar.precio
  formEditar.imagen.value = prodEditar.imagen
}

  formEditar.addEventListener('submit', (event) => {
    event.preventDefault ();
    const nuevosDatos = {
      id: formEditar.id.value,
      nombre: formEditar.nombre.value,
      descripcion: formEditar.descripcion.value,
      imagen: formEditar.imagen.value,
      precio: formEditar.precio.value
    }

    if (!nuevosDatos.id || !nuevosDatos.nombre || !nuevosDatos.descripcion || !nuevosDatos.precio) {
      document.querySelector('#mensajeCompletar2').innerHTML = '*Complete todos los datos'
      document.querySelector('#mensajeCompletar2').className += " bg-danger text-light";
      return
    }
    else {
      document.querySelector('#mensajeCompletar2').innerHTML = ''
 
    }

    let nuevosDatosJson = JSON.stringify(nuevosDatos)
    console.log(nuevosDatosJson)
    const enviarNewDatos = async()=>{
      try{
        const enviarDatos = await fetch(endpoint+'/'+nuevosDatos.id,{
          method: 'put',
          headers: {
            'content-type': 'application/json'
          },
          body: nuevosDatosJson
        })
        const respuesta= await enviarDatos.json()
        console.log(respuesta)
        mostrarMensaje(respuesta.mensaje)
      }catch(error){
        mostrarMensaje('error al verificar datos')
      }
      setTimeout(()=>{location.reload();}, 1000)
    }
    enviarNewDatos();
  }) 