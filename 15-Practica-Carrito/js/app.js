const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#lista-carrito');
const ListaCursos = document.querySelector('#lista-cursos');

//Se crea con let porque se va a estar vaciando
let articulosCarrito = [];

cargarEventLiesteners();

function cargarEventLiesteners(){
    ListaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarArticulo)
}

//Funciones

function eliminarArticulo(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const articuloId = e.target.getAttribute('data-id');
        //Retornamos un arreglo em base a la condicion definida que le ponemos
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== articuloId);
        carritoHtml();
    }
}


function agregarCurso(e) {
    //Evento para que la pagina no se recargue
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}

function leerDatosCursos(curso) {
    const infoCurso = {
        //SRC es para saber de donde estamos sacando la imagen
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        //Sacamos el atribute del data
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //Este ciclo nos recorre para validar si existe en el carrito, este ciclo devuelve true o false
    const existe = articulosCarrito.some(articulo => articulo.id === infoCurso.id);

    if(existe){
        const articulos = articulosCarrito.map(articulo => {
            if(articulo.id === infoCurso.id){
                articulo.cantidad ++;
                return articulo;
            }else{
                return articulo;
            }
        });
        articulosCarrito = [...articulos];
    }else{
        //Buscar el spress operator, aqui agregamos al array los objetos
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHtml();
}


function carritoHtml() {
    //Llamamos la funcion de limpiar html
    limpiarHtml();
    articulosCarrito.forEach(({titulo, imagen, precio, id, cantidad}) => {
        // agregamos html en una fila

        const row = document.createElement('TR');
        row.innerHTML = `
        <td><img src='${imagen}' width='100px' ></img></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `
        contenedorCarrito.appendChild(row);
    });

    // le agregamos un hijo
}

//Limpiamos el html
function limpiarHtml() {
    //Manera mas facil, pero afecta rendimiento
    // contenedorCarrito.innerHTML = '';

    //Segunda manera
    //Rercorremos desde el primer hijo
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}