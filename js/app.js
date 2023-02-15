//El archivo funciona en index.html!
let sumaPrecios = 0
let container = document.getElementById("container")
let formRegistrar = document.getElementById('form')
let buscador = document.getElementById("buscador")
let destacado = document.getElementById('tamano')
let addProductButton = document.getElementById("addProduct")
let filtrarSelect = document.getElementById('filtrar')
let spinnerTexto = document.getElementById('spinnerTexto')
let spinner = document.getElementById('spinner')
let textoCatalogo = document.getElementById('textoCatalogo')

if(localStorage.getItem('prodRegistrado')){
    productosRegistrados = JSON.parse(localStorage.getItem('prodRegistrado'))
    //Borro el texto del span para que no aparezca antes de que carguen los productos
    textoCatalogo.innerHTML = ""
}else{
    textoCatalogo.innerHTML = ""
    cargarProductos() 
}

function registrarProductos(array){
    let nombre = document.getElementById('nombreProducto')
    let precio = document.getElementById('precioProducto')
    let categoria = document.getElementById('categoriaProducto')
    let cantidadTotal = document.getElementById('cantidadProducto')
    let cantidadCarrito = 0
    let foto = document.getElementById('fotoProducto')
    const nuevoProducto = new Productos(array.length + 1, nombre.value, parseFloat(precio.value), categoria.value, cantidadCarrito, parseInt(cantidadTotal.value), foto.value)
    array.push(nuevoProducto)
    //Guardamos otra vez para que se actualice el localStorage a medida que vayamos registrando productos
    console.log(cantidadTotal.value)
    localStorage.setItem('prodRegistrado', JSON.stringify(array))
    //calcularPrecio(array)
    mostrarProductos(array)
    formRegistrar.reset()
}

function mostrarProductos(array){
    //Se hace un innerHTML vacío para limpiar el carrito de compras, porque al añadir 2 o más productos se empiezan a repetir entre si.
  
    container.innerHTML = ''
    array.forEach((producto) =>{
        container.innerHTML += `
            <div class='card mt-2' id='${producto.id}' style='width: 18rem;'>
                <img class='card-img-top' style='object-fit:cover' height='200px' src= '${producto.foto}'>
                <div class 'card-body'>
                    <h5 class = 'card-text mt-1 ml-1'>${producto.nombre}</h5>
                    <p class = 'card-text ml-1'>Zapatilla - ${producto.categoria}</p>
                    <p class = 'card-text ml-1'>Cantidad: ${producto.cantidadTotal}</p>
                    <p class = 'card-text ml-1' style='font-size: 20px'>$${producto.precio}</p>
                    <button onclick='agregarCarrito(${producto.id})' class='btn btn-primary m-2'>Añadir al carrito</a>
                </div>
            </div>
        `
    })
}
async function cargarProductos(){
    const respuesta = await fetch("productos.json")
    const datos = await respuesta.json()
    localStorage.setItem('prodRegistrado', JSON.stringify(datos))
    datos.forEach((prod)=>{
        let nuevoProd = new Productos(prod.id, prod.nombre, parseFloat(prod.precio), prod.categoria, parseInt(prod.cantidad), parseInt(prod.cantidadTotal), prod.foto)
        productosRegistrados.push(nuevoProd)
    })
}
function encontrarProducto(buscado, array){
    //Sacamos lo que hay en la seccion destacado para poder tener mayor visibilidad en el catalogo
    destacado.innerHTML = ''
    let busqueda = array.filter(
        (prod)=> prod.nombre.toLowerCase().includes(buscado.toLowerCase())
    )
    if(buscado == ''){
        destacado.innerHTML =`
            <h1 style="text-align: center;">Destacados</h2>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <!--Buscar fotos con la misma altura!!-->
                        <img class="d-block w-75 nuevo-img" src="img/pegasus392-portada.jpg" alt="First slide">
                        <div class="carousel-caption d-md-block">
                            <h5 class="texto-destacado">Pegasus39</h5>
                            <a href="pages/pegasus39.html" class="boton-destacado">Ver más</a>
                        </div>
                        
                    </div>

                    <div class="carousel-item">
                    <img class="d-block w-75 nuevo-img"  src="img/crater_impact.jpg"alt="Second slide">
                    <div class="carousel-caption d-md-block">
                        <h5 class="texto-destacado">Crater Impact</h5>
                    </div>
                    </div>

                    <div class="carousel-item">
                    <img class="d-block w-75 nuevo-img" src="img/lebron-mix.jpg" alt="Third slide">
                    <div class="carousel-caption d-md-block">
                        <h5 class="texto-destacado">Lebron Mix</h5>
                    </div>
                    </div>
                </div>

                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Anterior</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Siguiente</span>
                </a>
            </div>
        `
    }
    if(busqueda.length == 0){
        textoCatalogo.innerHTML = ''
        destacado.innerHTML = `<h2 style='text-align:center'>No se encontraron productos!</h2>`
    }
    mostrarProductos(busqueda)
}
function filtrarHombre(array){
    const filtrarPorHombre = [].concat(array)
    let filtro = filtrarPorHombre.filter( prod => prod.categoria.toLowerCase() == "hombre")
    mostrarProductos(filtro)
}
function filtrarMujer(array){
    const filtrarPorMujer = [].concat(array)
    let filtro = filtrarPorMujer.filter( prod => prod.categoria.toLowerCase() == "mujer")
    mostrarProductos(filtro)
}

addProductButton.onclick = (() => {
    registrarProductos(productosRegistrados)
})

buscador.addEventListener("input", ()=>{
    encontrarProducto(buscador.value, productosRegistrados)
})  

filtrarSelect.addEventListener("change", ()=>{
    filtrarSelect.value == "hombre" ? filtrarHombre(productosRegistrados) : filtrarMujer(productosRegistrados)
})

//Codigo
setTimeout(()=>{
    spinnerTexto.innerHTML = ''
    spinner.remove()
    //Vuelvo a poner el texto del catálogo
    textoCatalogo.innerHTML = `<span style="display: block; text-align: center; font-size: 25px; font-weight: bold; margin-top: 10px" id="textoCatalogo">Catálogo</span>`
    mostrarProductos(productosRegistrados)
}, 3000)