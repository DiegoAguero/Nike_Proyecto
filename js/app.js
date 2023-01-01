let todosNombresProductos = []
let todosPreciosProductos = []
let todosDetallesProductos = []
let sumaPrecios = 0
//Obtener precio y nombre del producto añadido
function getPrice(precio){
    console.log(`Precio del producto: ${precio}`)
    todosPreciosProductos.push(`${precio}`);
}

function getName(nombre){
    console.log(`Nombre del producto: ${nombre}`);
    todosNombresProductos.push(`${nombre}`);
}

function getDetails(detalle){
    console.log(`Detalle del producto: ${detalle}`)
    todosDetallesProductos.push(`${detalle}`);
}

function addProduct(){
    nombreProducto = prompt("ingrese el nombre del producto")
    precioProducto = parseFloat(prompt("Ingrese precio del producto"))
    detalleProducto = prompt("Ingrese un detalle del producto")
    alert("Producto añadido")
    getName(nombreProducto)
    getPrice(precioProducto)
    getDetails(detalleProducto)
}

function showProducts(){
    todosPreciosProductos = parseFloat(todosPreciosProductos)
    for(let i=0; i<todosNombresProductos.length; i++){
        if(todosNombresProductos[i] == "" || isNaN(todosPreciosProductos[i]) || todosDetallesProductos[i] === null){
            console.log("Hay un dato erroneo/dato no introducido. Vuelva a introducirlos por favor.")
            break;
        }else{
        console.log(`Nombres productos: ${todosNombresProductos[i]}\n Precios de los productos: ${todosPreciosProductos[i]} \n Detalles de los productos: ${todosDetallesProductos[i]}`)
        sumaPrecios += parseFloat(todosPreciosProductos[i]) 
        }
    }
    console.log(`La suma del precio total de los productos añadidos al carrito es de: ${sumaPrecios}`)
    
}
// function sumarPrecio(x){
//     let suma = 0;
//     let sumaTotal = suma + x;
//     console.log(sumaTotal)
// }

// Añadir items a la lista

// let nombre = prompt("Nombre de su zapatilla")
// let detalle = prompt("Breve detalle de la zapatilla")
// let precio = parseFloat(prompt("Precio del producto"))
// let foto = prompt("Url de la foto que le va a poner a la zapatilla")
// let container = document.getElementById('container')
// class addProduct{
//     constructor (nombre, detalle, precio, foto){
//         this.nombre = nombre;
//         this.detalle = detalle;
//         this.precio = parseFloat(precio);
//         this.foto = foto;
//     }
//     addProductToList(){
        
//         const div2 = document.createElement('div')
//         div2.classList.add("card")
//         div2.style.cssText += 'width: 18rem'
//         div2.innerHTML = `
//             <img class='card-img-top' src= '${this.foto}'>
//             <div class 'card-body'>
//                 <h5 class = 'card-text'>${this.nombre}}</h5>
//                 <p class = 'card-text'>${this.detalle}</p>
//                 <p class = 'card-text'>${this.precio}</p>
//                 <a href="#" class='btn btn-primary' onclick='getPrice()'>Añadir al carrito</a>
//             </div>
//         `
//         container.appendChild(div2)
//     }
// }

// const producto = new addProduct(nombre, detalle, precio, foto);