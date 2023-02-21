let productoCarrito = []
let bodyCarrito = document.getElementById('bodyCarrito')
let botonFinalizarCompra = document.getElementById('botonFinalizarCompra')
let totalPrecio = document.getElementById("totalPrecio")
document.addEventListener('DOMContentLoaded', ()=>{
    productoCarrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito()
})

function agregarCarrito(idProducto){
    const prodExiste = productoCarrito.some(producto => producto.id === idProducto)

    if(prodExiste){
        const prodCantidad = productoCarrito.map(prod => {
            if(prod.id === idProducto){
                if(prod.cantidadTotal <= 0){
                    Swal.fire({
                        icon: "error",
                        title: `No hay más stock de ${prod.nombre}!`,
                        timer: 2000
                    })
                }else{       
                        prod.cantidad++
                        prod.cantidadTotal--
                    Swal.fire({
                        icon: "success",
                        title: `Añadiste ${prod.cantidad} ${prod.nombre} al carrito!`,
                        timer: 2000
                    })
                }
            }
        })
    
    }else{
        Swal.fire({
            icon: "success",
            title: "Añadiste un producto al carrito!",
            timer: 2000
        })
        const id = productosRegistrados.find((prod)=> prod.id === idProducto)
        if(id.cantidadTotal == 0){
            Swal.fire({
                icon: "error",
                title: `No hay más stock de ${id.nombre}!`,
                timer: 2000
            })
        }else{
            id.cantidad++
            id.cantidadTotal--
            productoCarrito.push(id)
            calcularPrecio(productoCarrito)
        }

    }
    mostrarCarrito()
}

function eliminarCarrito(id){
    const idProducto = id
    const prodExiste = productoCarrito.some(prod=> prod.id === id)
    if(prodExiste){
        const prod = productoCarrito.map(prod=>{
            if(prod.id === id){
                if(prod.cantidad == 1){
                    productoCarrito = productoCarrito.filter((prod)=> prod.id !== idProducto)
                }
                prod.cantidad--
                prod.cantidadTotal++
                mostrarCarrito()
            }
        })
    }else{
        productoCarrito = productoCarrito.filter((prod)=> prod.id !== idProducto)
        mostrarCarrito()
    }
}
function mostrarCarrito(){
    if(productoCarrito.length == 0){
        bodyCarrito.innerHTML = '<h3>Carrito vacío! Necesitas añadir productos para poder verlos!</h3>'
        totalPrecio.innerHTML = 'Total: $0'
    }else{
        bodyCarrito.innerHTML = ''
        productoCarrito.forEach((addedProd)=>{
            bodyCarrito.innerHTML += `
            <div class='card mt-2' id='${addedProd.id}' style='width: 18rem;'>
            <img class='card-img-top' style='object-fit:cover' height='200px' src= '${addedProd.foto}'>
            <div class 'card-body'>
                <h5 class = 'card-text mt-1 ml-1'>${addedProd.nombre}</h5>
                <p class = 'card-text ml-1'>Zapatilla - ${addedProd.categoria}</p>
                <p class = 'card-text ml-1'>Cantidad: ${addedProd.cantidad}</p>
                <p class = 'card-text ml-1' style='font-size: 20px'>$${addedProd.precio}</p>
                <button onclick='eliminarCarrito(${addedProd.id})' class='btn btn-danger m-2'>Eliminar del carrito</a>
            </div>
        </div>
        `
        })
        calcularPrecio(productoCarrito)
        carritoLocal()  
    }
}
function carritoLocal(){
    localStorage.setItem("carrito", JSON.stringify(productoCarrito))
}
function calcularPrecio(array){
    const calculo = array.reduce((sumaPrecios, array) => (sumaPrecios + (array.cantidad * array.precio)), 0)
    totalPrecio.innerHTML = `Total: $${calculo}`
    return calculo
}
function finalizarCompra(array){
    let precioArray = calcularPrecio(array)
    Swal.fire({
        icon: 'info',
        title: '🛒',
        text:'¿Querés finalizar la compra?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((resultado)=>{
        if(resultado.isConfirmed){
            Swal.fire({
                icon: 'success',
                title: `Hurray!`,
                text: `Ha finalizado su compra, su total será de: $${precioArray}`,
                timer: 2000
            })
            productoCarrito.map(prod=>{
                prod.cantidad = 0
            })
            productoCarrito = []
            localStorage.removeItem('carrito')
            mostrarCarrito()
            mostrarProductos(productosRegistrados)
            filtrarSelect.value = 'noFiltrar'
        }else{
            Swal.fire({
                icon: 'info',
                title: `Ugh...`,
                text: 'No finalizó su compra, en caso de querer hacerlo, sus productos seguirán en el carrito!  ',
                timer: 2000
            })
        }
      })
}

function vaciarCarrito(){
    //Hacemos que antes de que se borre el array con todos mis objetos verifique si tiene productos en el carrito, en caso de tenerlos
    //devuelve la cantidad a cada producto y lo deja como antes
    if(productoCarrito.length == 0){
        Swal.fire({icon: 'error',title: 'Error',text: 'No puedes vaciar el carrito si no hay ningún producto dentro!'})
    }
    const productos = productoCarrito.map(prod=>{
        if(prod.cantidad >= 1){
            prod.cantidadTotal+= prod.cantidad
            prod.cantidad = 0
            mostrarProductos(productosRegistrados)
        }
    })
    productoCarrito = []
    localStorage.removeItem('carrito')
    mostrarCarrito()
}
botonFinalizarCompra.addEventListener('click', ()=>{
    productoCarrito.length === 0 ? Swal.fire({icon: 'error',title: 'Error',text: 'No puedes finalizar la compra si no tienes ningún producto en el carrito!'}) : finalizarCompra(productoCarrito)
})

