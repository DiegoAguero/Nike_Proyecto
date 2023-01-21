// //Este archivo se ejecuta exclusivamente en carrito.html 
// let sumaPrecios = 0
// let contadorMax = 0
// let totalProducts = 0
// //Obtener precio y nombre del producto añadido
// function getPrice(precio){
//     console.log(`Precio del producto: ${precio}`)
//     sumaPrecios += precio;
// }

// function getName(nombre){
//     console.log(`Nombre del producto: ${nombre}`);
// }

// function getDetails(detalle){
//     console.log(`Detalle del producto: ${detalle}`)
// }

// function calculateDiscount(precio){
//     let totalDescuento = 100;
//     let numeroDescuento = parseInt(prompt("Indique el total del descuento: "))
//     let resultadoDescuento = parseFloat(numeroDescuento/totalDescuento)
//     let descuentoAplicado = parseFloat(resultadoDescuento * precio)
//     sumaPrecios = sumaPrecios - descuentoAplicado
//     console.log(`El descuento es del: ${numeroDescuento}%, el precio queda a: ${sumaPrecios}`)
// }

// function addProduct(){
//     totalProducts = parseInt(prompt("Indique la cantidad de productos que va a comprar"))
//     do{
//         let nombreProducto = prompt("ingrese el nombre del producto")
//         let precioProducto = parseFloat(prompt("Ingrese precio del producto"))
//         let detalleProducto = prompt("Ingrese un detalle del producto")
//         alert("Producto añadido")
//         if(nombreProducto === null || isNaN(precioProducto) || detalleProducto === null){
//             alert("Hay un dato vacío o mal introducido. Por favor, intentelo denuevo")
//             return
//         }
//         getName(nombreProducto)
//         getPrice(precioProducto)
//         getDetails(detalleProducto)
//         contadorMax++
//     }while(contadorMax < totalProducts)
//     console.log(`Total a pagar $${sumaPrecios}`)
//     calculateDiscount(sumaPrecios);
// }
// addProduct();   

let nombreProducto = []
let precioProducto = []
let detalleProducto = []
let fotoProducto = []
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
    //cambia todo a metodos afuera de la clase
    registrarProductos(){
        

        this.mostrarProductos(nombreProducto)
        this.calcularPrecio()
    }


    mostrarProductos(array){
        const div2 = document.createElement('div')
        div2.innerHTML = ''
        // for(let i = 0; i< nombreProducto.length; i++){    
        for(let producto of array){

            
            
            div2.classList.add("card")
            div2.style.cssText += 'width: 18rem'
            div2.innerHTML += `
                <img class='card-img-top mt-2' src= '${fotoProducto[i]}'>
                <div class 'card-body'>
                    <h5 class = 'card-text mt-1 ml-1'>${nombreProducto[i]}</h5>
                    <p class = 'card-text ml-1'>${detalleProducto[i]}</p>
                    <p class = 'card-text ml-1' style='font-size: 20px'>$${precioProducto[i]}</p>
                    <a href="#" class='btn btn-primary' onclick=''>Añadir al carrito</a>
                </div>
            `
            container.appendChild(div2)
        }
    } 

    // }

    // calcularPrecio(){
    //     for(let i = 0; i< precioProducto.length; i++){
    //         sumaPrecios += precioProducto[i]
    //     }       
    //     let totalPrecio = document.getElementById("totalPrecio")
    //     const span = document.createElement('span')
    //     span.innerHTML = `${sumaPrecios}`
    //     totalPrecio.appendChild(span)
    // }
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
            <img class='card-img-top' width='20%' src= '${producto.foto}'>
            <div class 'card-body'>
                <h5 class = 'card-text mt-1 ml-1'>${producto.nombre}</h5>
                <p class = 'card-text ml-1'>${producto.detalle}</p>
                <p class = 'card-text ml-1' style='font-size: 20px'>$${producto.precio}</p>
                <a href="#" class='btn btn-primary' onclick='getPrice()'>Añadir al carrito</a>
            </div>
        `
        container.appendChild(div2)
    })
}

let producto = new Productos(id, nombreProducto, precioProducto, detalleProducto, fotoProducto)
let addProductButton = document.getElementById("addProduct")
addProductButton.addEventListener("click", (e) => {
    e.preventDefault()
    registrarProductos(productosRegistrados)
})

//Cuando veamos localStorage voy a poder completar el carrito de compras