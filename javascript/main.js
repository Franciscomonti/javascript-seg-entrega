

//Clases
class Producto {
    constructor(id, nombre, codigo, tipo, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.codigo = codigo;
        this.tipo = tipo;
        this.precio = precio;
        this.imagen = imagen;
    }
}

//Productos a vender

const listaProductos = [];

let prod1 = new Producto(1, "Zapatilla Nike", "MD500", "calzado", 25000, "nikeportada2.png")
let prod2 = new Producto(2, "Remera Manga Larga", "RM5400", "remera", 3000.00, "remera-blanca-hombre-ml.jpg")
let prod3 = new Producto(3, "Buzo Negro Capucha", "BC300", "buzo", 5000, "buzo-negro-capucha.webp")
let prod4 = new Producto(4, "Pantalon Cuadrille", "PC6000", "pantalon", 3000.00, "pantalon rojo.webp")
let prod5 = new Producto(5, "Pantalon Cuadrille", "PC6000", "pantalon", 6000.00, "pantalon rojo.webp")
let prod6 = new Producto(6, "Buzo Negro Capucha", "BC300", "buzo", 8000, "buzo-negro-capucha.webp")
let prod7 = new Producto(7, "Zapatilla Nike", "MD500", "calzado", 25000, "nikeportada2.png")
let prod8 = new Producto(8, "Remera Manga Larga", "RM5400", "remera", 3000.00, "remera-blanca-hombre-ml.jpg")
let prod9 = new Producto(9, "Buzo Negro Capucha", "BC300", "buzo", 5000, "buzo-negro-capucha.webp")
let prod10 = new Producto(10, "Pantalon Cuadrille", "PC6000", "pantalon", 3000.00, "pantalon rojo.webp")
let prod11 = new Producto(11, "Pantalon Cuadrille", "PC6000", "pantalon", 6000.00, "pantalon rojo.webp")
let prod12 = new Producto(12, "Buzo Negro Capucha", "BC300", "buzo", 8000, "buzo-negro-capucha.webp")

listaProductos.push(prod1);
listaProductos.push(prod2);
listaProductos.push(prod3);
listaProductos.push(prod4);
listaProductos.push(prod5);
listaProductos.push(prod6);
listaProductos.push(prod7);
listaProductos.push(prod8);
listaProductos.push(prod9);
listaProductos.push(prod10);
listaProductos.push(prod11);
listaProductos.push(prod12);



//--------------------------MAIN----------------------------

//Crear cards de productos Main

function crearCardsMain(productos) {
    let cardsBloque = document.querySelector("#Productos-main");

    cardsBloque.innerHTML = ""

    productos.forEach(producto => {
        cardsBloque.innerHTML += crearCard(producto);
    })
}


function includesFav(lista, producto) {
    for (const fav of lista) {
        if (fav.id == producto.id) {
            return true
        }
    }

    return false
}


//Insertar en el Html Main

function crearCard(producto) {
    let iconFav = "fav.svg"
    if (includesFav(favoritos, producto)) {
        iconFav = "fav black.svg"
    }

    let cardCreada = `
        <div class="Productos-main-Card">
            <div class="Productos-main-agregar-fav">
                <img src="./img/icon/${iconFav}" alt="" id="${producto.id}" onclick="manejarFavs(${producto.id})">
            </div>
            <div class="Productos-main-Img"><img src="./img/prod/${producto.imagen}" alt=""></div>
            <div class="Productos-main-Cuerpo">
                <div class="Productos-main-Desc">
                    <h2>${producto.nombre}</h2>
                    <h3>${producto.codigo}</h3>
                    <p>$ ${producto.precio}</p>
                </div>
                <div class="Productos-main-Agregar">
                    <img src="./img/icon/cart plus.svg" alt="" id="${producto.id}" onclick="manejarCarrito(${producto.id})">
                </div>
            </div>
        </div>
        `;
    return cardCreada
}


//---------------------------------------CARRITO----------------------------

let carrito = []


function manejarCarrito(id) {
    if (estaEnCarrito(id)) {
        eliminarCarrito(id)
    } else {
        agregarCarrito(id)
    }
}

function estaEnCarrito(id) {
    for (let prod of carrito) {
        if (prod.id == id) {
            return true
        }
    }
    return false
}

function agregarCarrito(id) {
    let productoSelecFav = listaProductos.find(producto => producto.id == id)
    carrito.push(productoSelecFav)

    let cardCar = document.querySelector("#carrito");
    cardCar.innerHTML += crearCardCarrito(productoSelecFav);

    almacenarProductosLocalStorageCarrito()

    contadorCarrito()

}

function eliminarCarrito(id) {
    let index = carrito.findIndex(prodCarrito => prodCarrito.id === id);
    carrito.splice(index, 1)

    let card = document.querySelector(`#car-${id}`)
    card.parentNode.removeChild(card)

    removerProductoLocalStorageCarrito()
    
    almacenarProductosLocalStorageCarrito()

    contadorCarrito()
}

//Crear card carrito

function crearCardCarrito(producto) {
    let cardCreada = `
    <div class="modal-card" id="car-${producto.id}">
        <div class="modal-img">
            <img src="./img/prod/${producto.imagen}" alt="">
        </div>
        <div class="desc-producto">
            <div class="modal-card-desc">
                <h2>${producto.nombre} </h2>
                <h4>${producto.codigo}</h4>
                <h3>$ ${producto.precio}</h3>
            </div>
            <div class="modal-card-accion">
                <img src="./img/icon/trash.svg" alt="" id="${producto.id}" class="trash"
            onclick="eliminarCarrito(${producto.id})">
                <h2>Comprar</h2>
            </div>
        </div>
    </div>
    `;
    return cardCreada
}


//Funcion ver los totales del carrito

function contadorCarrito() {
    let contadorCar = document.getElementById("contador-Cart")
    contadorCar.innerHTML = `${carrito.length}`
}


//-------------------------------FAVORITOS----------------------------

let favoritos = []

function manejarFavs(id) {
    if (estaEnFav(id)) {
        eliminarFavorito(id)
    } else {
        agregarFavorito(id)
    }
}

function estaEnFav(id) {
    for (let prod of favoritos) {
        if (prod.id == id) {
            return true
        }
    }
    return false
}


function agregarFavorito(id) {
    
    let productoSelecFav = listaProductos.find(producto => producto.id == id)
    favoritos.push(productoSelecFav)

    document.getElementById(productoSelecFav.id).src = "./img/icon/fav black.svg";
    let cardFav = document.querySelector("#modal-contenedor");
    cardFav.innerHTML += crearCardFav(productoSelecFav);
    
    almacenarProductosLocalStorage()
    contadorFavoritos()
}

function eliminarFavorito(id) {
    let index = favoritos.findIndex(producto => producto.id === id);
    favoritos.splice(index, 1)

    let productoSelecFav = listaProductos.find(producto => producto.id == id)
    document.getElementById(productoSelecFav.id).src = "./img/icon/fav.svg";

    let card = document.querySelector(`#fav-${id}`)
    card.parentNode.removeChild(card)
    
    removerProductoLocalStorage()
    almacenarProductosLocalStorage()
    contadorFavoritos()
}
//Crear card favoritos

function crearCardFav(producto) {
    let cardCreada = `
    <div class="modal-card" id="fav-${producto.id}">
            <div class="modal-img">
                <img src="./img/prod/${producto.imagen}" alt="">
            </div>
            <div class="desc-producto">
                <div class="modal-card-desc">
                <h2>${producto.nombre} </h2>
                <h4>${producto.codigo}</h4>
                <h3>$ ${producto.precio}</h3>
            </div>
                <div class="modal-card-accion">
                <img src="./img/icon/trash.svg" alt="" id="${producto.id}" class="trash"
                    onclick="eliminarFavorito(${producto.id})">
                    <h2>Comprar</h2>
                </div>
            </div>
        </div>
                `;
    return cardCreada
}

//Ver totales favorito

function contadorFavoritos() {
    let contadorFav = document.getElementById("contador-Fav")
    contadorFav.innerHTML = `${favoritos.length}`
}


//-----------------------------------------------------MODAl---------------------------------------------------

// modal fav

var modal = document.getElementById("modalFav");
var btnModal = document.getElementById("btn-modal-fav");
var btnCloseModal = document.getElementsByClassName("modal-cerrar")[0];

btnModal.onclick = function () {
    modal.style.display = "flex";
}

btnCloseModal.onclick = function () {
    modal.style.display = "none";
}

// modal carrito

var modal2 = document.getElementById("modalCarrito");
var btnModal = document.getElementById("btn-modal-cart");
var btnCloseModal = document.getElementsByClassName("modal-cerrar2")[0];

btnModal.onclick = function () {
    modal2.style.display = "flex";
}

btnCloseModal.onclick = function () {
    modal2.style.display = "none";
}


// -------------------------------------------------FILTROS-------------------------------------------------------

let filtrados = null

// filtro por tipo

function filtroPorTipo(element, tipo) {
    colorBtnFiltro(element)
    filtrados = listaProductos.filter(producto => producto.tipo == tipo)
    crearCardsMain(filtrados)
}

function filtroPorColor(element, color) {
    colorBtnFiltro(element)
    filtrados = listaProductos.filter(producto => producto.color == color)
    crearCardsMain(filtrados)
}

function filtroTodos(element) {
    filtrados = listaProductos
    colorBtnFiltro(element)
    crearCardsMain(listaProductos)
}

function colorBtnFiltro(element) {
    let botones = document.getElementsByClassName("filtro")

    for (let element of botones) {
        element.style.color = "black"
    }
    element.style.color = "red"
}

// Filtros por costo

function filtroCostoMayor(element) {
    colorBtnFiltro(element)
    let filtradosCosto = filtrados.sort((a, b) => {
        return b.precio - a.precio;
    });
    crearCardsMain(filtradosCosto)
}


function filtroCostoMenor(element) {
    colorBtnFiltro(element)
    let filtradosCosto = filtrados.sort((a, b) => {
        return a.precio - b.precio;
    });
    crearCardsMain(filtradosCosto)
}


//STORAGE
//Favaritos

function almacenarProductosLocalStorage() {
    localStorage.setItem("localFavoritos", JSON.stringify(favoritos));
    }

function traerProductosLocalStorage(){
    let storeList = localStorage.getItem("localFavoritos")
    if(storeList == null){
        localFavoritos = []

    }else{
        favoritos = JSON.parse(storeList)
    }
}

function removerProductoLocalStorage(){
    localStorage.removeItem("localFavoritos")
}

function pintarFavoritos(){
    let cardFav = document.querySelector("#modal-contenedor");
    favoritos.forEach((productos)=>cardFav.innerHTML += crearCardFav(productos))
    
}

//Carrito

function almacenarProductosLocalStorageCarrito() {
    localStorage.setItem("localCarrito", JSON.stringify(carrito));
    }

function traerProductosLocalStorageCarrito(){
    let storeListcarrito = localStorage.getItem("localCarrito")
    if(storeListcarrito == null){
        localCarrito = []

    }else{
        carrito = JSON.parse(storeListcarrito)
    }
}

function removerProductoLocalStorageCarrito(){
    localStorage.removeItem("localCarrito")
}

function pintarCarrito(){
    let cardCar = document.querySelector("#carrito");
    carrito.forEach((productos)=>cardCar.innerHTML += crearCardCarrito(productos))
    
}

function inciarLocalStorage(){
    traerProductosLocalStorage()
    contadorFavoritos()
    pintarFavoritos()
}

function iniciarLocalStorageCarrito(){
    traerProductosLocalStorageCarrito()
    contadorCarrito()
    pintarCarrito()
}
//----------------------------- MAIN-Inicializar-------------------------------

function main() {
    inciarLocalStorage()
    iniciarLocalStorageCarrito()
    crearCardsMain(listaProductos)
}

main()