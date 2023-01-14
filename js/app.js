//Este archivo se ejecuta exclusivamente en carrito.html 
let sumaPrecios = 0
let contadorMax = 0
let totalProducts = 0
//Obtener precio y nombre del producto añadido
function getPrice(precio){
    console.log(`Precio del producto: ${precio}`)
    sumaPrecios += precio;
}

function getName(nombre){
    console.log(`Nombre del producto: ${nombre}`);
}

function getDetails(detalle){
    console.log(`Detalle del producto: ${detalle}`)
}

function calculateDiscount(precio){
    let totalDescuento = 100;
    let numeroDescuento = parseInt(prompt("Indique el total del descuento: "))
    let resultadoDescuento = parseFloat(numeroDescuento/totalDescuento)
    let descuentoAplicado = parseFloat(resultadoDescuento * precio)
    sumaPrecios = sumaPrecios - descuentoAplicado
    console.log(`El descuento es del: ${numeroDescuento}%, el precio queda a: ${sumaPrecios}`)
}

function addProduct(){
    totalProducts = parseInt(prompt("Indique la cantidad de productos que va a comprar"))
    do{
        let nombreProducto = prompt("ingrese el nombre del producto")
        let precioProducto = parseFloat(prompt("Ingrese precio del producto"))
        let detalleProducto = prompt("Ingrese un detalle del producto")
        alert("Producto añadido")
        if(nombreProducto === null || isNaN(precioProducto) || detalleProducto === null){
            alert("Hay un dato vacío o mal introducido. Por favor, intentelo denuevo")
            return
        }
        getName(nombreProducto)
        getPrice(precioProducto)
        getDetails(detalleProducto)
        contadorMax++
    }while(contadorMax < totalProducts)
    console.log(`Total a pagar $${sumaPrecios}`)
    calculateDiscount(sumaPrecios);
}
addProduct();   