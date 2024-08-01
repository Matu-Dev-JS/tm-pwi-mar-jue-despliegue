import { productos } from "../data/productsData"

export const obtenerProductoPorId = (id) => {
    const lista_productos = obtenerProductos()
    return lista_productos.find(producto => producto.id === id)
}

/* 
Una funcion que se llame obtenerProductos
Va a llamar a los productos del localStorage mediante la key 'productos', 
si no estan va a cargarlos con la key 'productos' y va a retornalos
Si estan, los parseara y los retornara

*/

/**
 * 
 * @param  {array} productos 
 *  */ 


const guardarProductos = (productos) => {
    const productos_JSON = JSON.stringify(productos)
    localStorage.setItem('productos', productos_JSON)
}
/**
 * Una función que recupera productos de localStorage utilizando la clave 'productos'. Si no se encuentran, almacena los productos con la clave 'productos'.
 *
 * @return {Array} El array de productos recuperado o almacenado en localStorage.
 */
export const obtenerProductos = () => {
    const productos_guardados = localStorage.getItem('productos')
    if(productos_guardados){

        return JSON.parse(productos_guardados)
    }
    else{

        guardarProductos(productos)
        return productos
    }
}


/* 
crearProducto(producto) 
recibe un producto y lo agrega al array de productos guardado en localStorage
Retorna la lista modificada


obtenerProductoPorId(id) retornar el producto que cumpla con ese id
eliminarProductoPorId(id) elimina el producto que cumpla con ese id
*/


export const crearProducto = (nuevo_producto /* object */) => {
    const lista_productos /* array[objetos] */ = obtenerProductos() /* array[objetos] */
    lista_productos.push(nuevo_producto)
    guardarProductos(lista_productos)
}

export const eliminarProductoPorId = (id) =>{
    const lista_productos = obtenerProductos()
    const nueva_lista = lista_productos.filter(producto => Number(producto.id) !== Number(id))
    guardarProductos(nueva_lista)
    return nueva_lista
}





/* export const crearProducto = () => {
    console.log('me ejecuto')
    const productos_creados = localStorage.getItem('productos')
    if(productos_creados){
        return JSON.parse(productos_creados)
    }
    else{
        const productos_JSON = JSON.stringify(productos)
        localStorage.setItem('productos', productos_JSON)
        return productos
    }
} */

/* 
Busco eliminar el id: 3
nueva_lista : array[object] = productos.filter((producto) => producto.id !== 3 )
guardar la nueva lista
*/


/* 
El detalle del componente Detail.jsx ahora debe venir de obtenerProductoPorId(id)

Van a crear un boton en la vista de Detail.jsx que se llamara 'eliminar' y al hacer click se ejecuta la funcion
eliminarProductoPorId(id)

La lista de productos que se mostrara en el componente Home.jsx sera dada a partir de la funcion obtenerProductos()

Crear una nueva screen/page/route llamada '/product/new' renderizara un formulario donde se le solicitara al usuario
informacion del producto:
nombre: string,
descripcion: string, mas de 10 caracteres,
precio: number psitivo distinto de 0,
stock: numero positivo distinto de 0,
codigo: string,
categoria: string,
thumbnail: string

TODAVIA no es necesario validaciones o capturas de dato, PERO si es necesario el Form en HTML
*/

/* 
mook = [
    {
        contact_id: 1,
        messages: [
            {
                text: 'lorem',
                time: 'hoy'
                author: 'pepe',
                id:1
            }
        ]
    },
    {
        contact_id: 2,
        messages: [
            {
                text: 'lorem',
                time: 'hoy'
                author: 'pepe',
                id:1
            }
        ]
    }
]
*/




const usuarios = [
    {
        id: 1,
        username: 'pepe'
    }
]

const workspaces = [
    {
        id: 1,
        user_id: 1,
        name: 'proyectos'
    },
    {
        id: 2,
        user_id: 1,
        name: 'clases con pepe'

    }
]
const canales = [
    {
        id_workspace: 1,
        id: 1,
        name: 'general',
        messages: [
            {
                text: 'hola',
                time: 'hoy',
                author: 'pepe',
                id:1
            }
        ]
    }
]

const obtenerWorkspacePorIdUsuario = (id_user) => {
    workspaces.filter(workspace => workspace.user_id === id_user)
}

const workspacesDePepe = obtenerWorkspacePorIdUsuario(1)