// //Este archivo se ejecuta exclusivamente en carrito.html 
let productosRegistrados = []
let sumaPrecios = 0
let id = 0;
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

//Hacer funcion de mostrarProductos e incluirla en registrarProductos!!
function registrarProductos(array){
    let nombre = prompt("Indique el nombre del producto por favor: ")
    let precio = parseFloat(prompt("Indique el precio de su producto: "))
    let detalle = prompt("Indique el detalle de su producto: ")
    let foto = prompt("Indique la URL de la foto que quiera poner: ")

    const nuevoProducto = new Productos(array.length + 1, nombre, precio, detalle, foto)
    array.push(nuevoProducto)
    calcularPrecio(array)
    mostrarProductos(array)
}
function calcularPrecio(array){
    const calculo = array.reduce((sumaPrecios, array) => (sumaPrecios + array.precio), 0)
    let totalPrecio = document.getElementById("totalPrecio")
    totalPrecio.innerHTML = `$${calculo}`
}
function mostrarProductos(array){
    const div2 = document.createElement('div')
    //Se hace un innerHTML vacío para limpiar el carrito de compras, porque al añadir 2 o más productos se empiezan a repetir entre si.
    div2.innerHTML = ''
    array.forEach((producto) =>{
        
        div2.classList.add("card")
        div2.style.cssText += 'width: 18rem; flex: 0 1 1;'
        div2.innerHTML = `
            <img class='card-img-top' style='object-fit:cover' height='200px' src= '${producto.foto}'>
            <div class 'card-body'>
                <h5 class = 'card-text mt-1 ml-1'>${producto.nombre}</h5>
                <p class = 'card-text ml-1'>${producto.detalle}</p>
                <p class = 'card-text ml-1' style='font-size: 20px'>$${producto.precio}</p>
                <a href="#" class='btn btn-primary' onclick=''>Añadir al carrito</a>
            </div>
        `
        container.appendChild(div2)
    })
}
function encontrarProducto(){
    let buscar = prompt("Escriba el nombre del producto que desea encontrar")
    const resultado = productosRegistrados.find((prod)=> prod.nombre.toLowerCase() === buscar.toLowerCase())
    if(resultado == undefined){
        alert("El nombre no es compatible con el producto buscado.")
    }else{
        console.log(`Producto encontrado: ${resultado.nombre}, ${resultado.precio}, ${resultado.detalle}, ${resultado.foto}`)
    }
    
}
// let producto = new Productos(id, nombreProducto, precioProducto, detalleProducto, fotoProducto)
let addProductButton = document.getElementById("addProduct")
addProductButton.onclick = (() => {
    registrarProductos(productosRegistrados)
})
// let buscador = document.getElementById("buscador")
// buscador.addEventListener("input", ()=>{
//     console.log(buscador.value)

// })  
//Cuando veamos localStorage voy a poder completar el carrito de compras