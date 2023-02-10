//El archivo funciona en index.html!
let sumaPrecios = 0
let id = 0;
let productoCarrito = []
let container = document.getElementById("container")
let bodyCarrito = document.getElementById('bodyCarrito')
let formRegistrar = document.getElementById('form')
let buscador = document.getElementById("buscador")
let destacado = document.getElementById('tamano')
let addProductButton = document.getElementById("addProduct")
let filtrarSelect = document.getElementById('filtrar')

if(localStorage.getItem('prodRegistrado')){
    productosRegistrados = JSON.parse(localStorage.getItem('prodRegistrado'))
}else{
    productosRegistrados.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10)
    localStorage.setItem('prodRegistrado', JSON.stringify(productosRegistrados))
}
document.addEventListener('DOMContentLoaded', ()=>{
    //Verificamos si el usuario anteriormente habia añadido algo al carrito, en caso de que no, se añade un array vacio
    productoCarrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
})

function registrarProductos(array){
    let nombre = document.getElementById('nombreProducto')
    let precio = document.getElementById('precioProducto')
    let detalle = document.getElementById('detalleProducto')
    let foto = document.getElementById('fotoProducto')
    const nuevoProducto = new Productos(array.length + 1, nombre.value, parseFloat(precio.value), detalle.value, foto.value)
    array.push(nuevoProducto)
    //Guardamos otra vez para que se actualice el localStorage a medida que vayamos registrando productos
    localStorage.setItem('prodRegistrado', JSON.stringify(array))
    calcularPrecio(array)
    mostrarProductos(array)
    formRegistrar.reset()
}

function calcularPrecio(array){
    const calculo = array.reduce((sumaPrecios, array) => (sumaPrecios + array.precio), 0)
    let totalPrecio = document.getElementById("totalPrecio")
    totalPrecio.innerHTML = `Total: $${calculo}`
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
                    <p class = 'card-text ml-1'>Zapatilla - ${producto.detalle}</p>
                    <p class = 'card-text ml-1' style='font-size: 20px'>$${producto.precio}</p>
                    <button onclick='agregarCarrito(${producto.id})' class='btn btn-primary m-2'>Añadir al carrito</a>
                </div>
            </div>
        `
    })
}
mostrarProductos(productosRegistrados)
function agregarCarrito(idProducto){
    const prodExiste = productoCarrito.some(producto => producto.id === idProducto)
    if(prodExiste){
        Swal.fire({
            icon: "error",
            title: "Ya existe este producto en el carrito",
            timer: 2000
        })
    }else{
        Swal.fire({
            icon: "success",
            title: "Añadiste un producto al carrito!",
            timer: 2000
        })
        const id = productosRegistrados.find((prod)=> prod.id === idProducto)
        productoCarrito.push(id)
        calcularPrecio(productoCarrito)
    }
    
    mostrarCarrito()
}
//añadir cantidad por producto
function eliminarCarrito(id){
    const idProducto = id
    productoCarrito = productoCarrito.filter((prod)=> prod.id !== idProducto)
    calcularPrecio(productoCarrito)
    mostrarCarrito()

}
function mostrarCarrito(){
    bodyCarrito.innerHTML = ''
    productoCarrito.forEach((addedProd)=>{
        bodyCarrito.innerHTML += `
        <div class='card mt-2' id='${addedProd.id}' style='width: 18rem;'>
        <img class='card-img-top' style='object-fit:cover' height='200px' src= '${addedProd.foto}'>
        <div class 'card-body'>
            <h5 class = 'card-text mt-1 ml-1'>${addedProd.nombre}</h5>
            <p class = 'card-text ml-1'>Zapatilla - ${addedProd.detalle}</p>
            <p class = 'card-text ml-1' style='font-size: 20px'>$${addedProd.precio}</p>
            <button onclick='eliminarCarrito(${addedProd.id})' class='btn btn-danger m-2'>Eliminar del carrito</a>
        </div>
    </div>
    `
    })
    carritoLocal()
}
function carritoLocal(){
    localStorage.setItem("carrito", JSON.stringify(productoCarrito))
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
        console.log("Nada")
        container.innerHTML +=`
            <h2> No se encontraron productos </h2>
        `
    }
    mostrarProductos(busqueda)
}
function filtrarHombre(array){
    const filtrarPorHombre = [].concat(array)
    let filtro = filtrarPorHombre.filter( prod => prod.detalle.toLowerCase() == "hombre")
    mostrarProductos(filtro)
}
function filtrarMujer(array){
    const filtrarPorMujer = [].concat(array)
    let filtro = filtrarPorMujer.filter( prod => prod.detalle.toLowerCase() == "mujer")
    mostrarProductos(filtro)
}

addProductButton.onclick = (() => {
    console.log("Boton funcionando")
    registrarProductos(productosRegistrados)
})

buscador.addEventListener("input", ()=>{
    encontrarProducto(buscador.value, productosRegistrados)
})  

filtrarSelect.addEventListener("change", ()=>{
    filtrarSelect.value == "hombre" ? filtrarHombre(productosRegistrados) : filtrarMujer(productosRegistrados)
})
