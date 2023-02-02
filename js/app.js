// //Este archivo se ejecuta exclusivamente en carrito.html 
let productosRegistrados = []
let sumaPrecios = 0
let id = 0;
let productoCarrito = []
let container = document.getElementById("container")
class Productos{
    constructor(id ,nombre, precio, detalle, foto){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.detalle = detalle,
        this.foto = foto
    } 
} 
//Añadimos los productos que pongo a mano
let producto1 = new Productos(1, "Crater Impact", 150, "Zapatillas - Hombre", "../img/craterimpact.png")
let producto2 = new Productos(2, "Go Fly Ease", 120, "Zapatillas - Hombre", "../img/flyease.png")
let producto3 = new Productos(3, "Jordan Air Max 3", 140, "Zapatillas - Hombre", "../img/jordan.png")
let producto4 = new Productos(4, "Air Huarache", 200, "Zapatillas - Hombre", "../img/airhuarache.png")
let producto5 = new Productos(5, "Blazer Low 77", 170, "Zapatillas - Hombre", "../img/blazerlow77.png")
let producto6 = new Productos(6, "Air Max Down", 190, "Zapatillas - Hombre", "../img/airmaxdown.png")
let producto7 = new Productos(7, "SB Nyjah Free 2", 180, "Zapatillas - Hombre", "../img/sbnyjahfree2.png")
let producto8 = new Productos(8, "Lebron Mix", 150, "Zapatillas - Hombre", "../img/lebron-mix.jpg")
productosRegistrados.push(producto1)
productosRegistrados.push(producto2)
productosRegistrados.push(producto3)
productosRegistrados.push(producto4)
productosRegistrados.push(producto5)
productosRegistrados.push(producto6)
productosRegistrados.push(producto7)
productosRegistrados.push(producto8)

//Inicializamos el localStorage
document.addEventListener('DOMContentLoaded', ()=>{
    //Verificamos si el usuario anteriormente habia añadido algo al carrito, en caso de que no, se añade un array vacio
    productoCarrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
})
// let addProductButton = document.getElementById("addProduct")
// addProductButton.onclick = (() => {
//     registrarProductos(productosRegistrados)
// })
function registrarProductos(array){
    // Reemplazar estos por un formulario
    // let nombre = prompt("Indique el nombre del producto por favor: ")
    // let precio = parseFloat(prompt("Indique el precio de su producto: "))
    // let detalle = prompt("Indique el detalle de su producto: ")
    // let foto = prompt("Indique la URL de la foto que quiera poner: ")

    const nuevoProducto = new Productos(array.length + 1, nombre, precio, detalle, foto)
    array.push(nuevoProducto)
    calcularPrecio(array)
    mostrarProductos(array)
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
                    <p class = 'card-text ml-1'>${producto.detalle}</p>
                    <p class = 'card-text ml-1' style='font-size: 20px'>$${producto.precio}</p>
                    <button onclick='agregarCarrito(${producto.id})' class='btn btn-primary m-2'>Añadir al carrito</a>
                </div>
            </div>
        `
    })
}
function agregarCarrito(idProducto){
    const id = productosRegistrados.find((prod)=> prod.id === idProducto)
    productoCarrito.push(id)
    console.log(productoCarrito)
    calcularPrecio(productoCarrito)
    mostrarCarrito()
}
function eliminarCarrito(id){
    const idProducto = id
    productoCarrito = productoCarrito.filter((prod)=> prod.id !== idProducto)
    console.log(productoCarrito)
    calcularPrecio(productoCarrito)
    mostrarCarrito(productoCarrito)

}
function mostrarCarrito(){
    const bodyCarrito = document.getElementById('bodyCarrito')
    bodyCarrito.innerHTML = ''
    productoCarrito.forEach((addedProd)=>{
        bodyCarrito.innerHTML += `
        <div class='card mt-2' id='${addedProd.id}' style='width: 18rem;'>
        <img class='card-img-top' style='object-fit:cover' height='200px' src= '${addedProd.foto}'>
        <div class 'card-body'>
            <h5 class = 'card-text mt-1 ml-1'>${addedProd.nombre}</h5>
            <p class = 'card-text ml-1'>${addedProd.detalle}</p>
            <p class = 'card-text ml-1' style='font-size: 20px'>$${addedProd.precio}</p>
            <button onclick='eliminarCarrito(${addedProd.id})' class='btn btn-danger m-2'>Eliminar del carrito</a>
        </div>
    </div>
    `
    carritoLocal()
    })
}
mostrarProductos(productosRegistrados)

function encontrarProducto(){
    let buscar = prompt("Escriba el nombre del producto que desea encontrar")
    const resultado = productosRegistrados.find((prod)=> prod.nombre.toLowerCase() === buscar.toLowerCase())
    if(resultado == undefined){
        alert("El nombre no es compatible con el producto buscado.")
    }else{
        console.log(`Producto encontrado: ${resultado.nombre}, ${resultado.precio}, ${resultado.detalle}, ${resultado.foto}`)
    }
    
}

function carritoLocal(){
    localStorage.setItem("carrito", JSON.stringify(productoCarrito))
}
// let buscador = document.getElementById("buscador")

// buscador.addEventListener("input", ()=>{
//     console.log(buscador.value)

// })  
//Cuando veamos localStorage voy a poder completar el carrito de compras