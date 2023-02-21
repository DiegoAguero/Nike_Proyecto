let productosRegistrados = []
class Productos{
    constructor(id ,nombre, precio, categoria, cantidad, cantidadTotal, foto){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.categoria = categoria,
        this.cantidad = cantidad,
        this.cantidadTotal = cantidadTotal,
        this.foto = foto
    } 
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
