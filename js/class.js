class Productos{
    constructor(id ,nombre, precio, detalle, foto){
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.detalle = detalle,
        this.foto = foto
    } 
} 
let productosRegistrados = []
//Añadimos los productos que pongo a mano
let producto1 = new Productos(1, "Crater Impact", 150, "Zapatillas - Hombre", "../img/craterimpact.png")
let producto2 = new Productos(2, "Go Fly Ease", 120, "Zapatillas - Hombre", "../img/flyease.png")
let producto3 = new Productos(3, "Jordan Air Max 3", 140, "Zapatillas - Hombre", "../img/jordan.png")
let producto4 = new Productos(4, "Air Huarache", 200, "Zapatillas - Hombre", "../img/airhuarache.png")
let producto5 = new Productos(5, "Blazer Low 77", 170, "Zapatillas - Hombre", "../img/blazerlow77.png")
let producto6 = new Productos(6, "Air Max Down", 190, "Zapatillas - Hombre", "../img/airmaxdown.png")
let producto7 = new Productos(7, "SB Nyjah Free 2", 180, "Zapatillas - Hombre", "../img/sbnyjahfree2.png")
let producto8 = new Productos(8, "Blazer Mid '77 Vintage", 150, "Zapatillas - Mujer", "../img/blazermidvintage.jpg")
let producto9 = new Productos(9, "Nike Dunk High", 150, "Zapatillas - Mujer", "../img/nikedunkhigh.jpg")
let producto10 = new Productos(10, "Metcon 8", 150, "Zapatillas - Mujer", "../img/metcon8.jpg")