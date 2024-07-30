import { createContext, useContext, useEffect, useState } from "react";
import { crearProducto, eliminarProductoPorId, obtenerProductos } from "../helpers/productos";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { obtenerCarrito } from "../helpers/cart";

const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
    const [productos, setProductos] = useState(obtenerProductos()) 
    const [searchTerm, setSearchTerm] = useState('')
    const [carrito, setCarrito] = useState(obtenerCarrito())
    const navigation = useNavigate()


    const handleChangeSearchTerm = ( e ) => {
        setSearchTerm(e.target.value)
    }

    useEffect(()=>{
        const productList = obtenerProductos()
        if(searchTerm != ''){
            const newProductList = productList.filter(product => product.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
            setProductos(newProductList)
        }
        else{
            setProductos(productList)
        }
        
    }, [searchTerm])



    useEffect(()=> {
        console.log("Se recargo el producto")
    }, [productos])

    const handleDeleteProduct = (id) => {
        setProductos(eliminarProductoPorId(id))
        navigation('/')
    }

    const getUserData = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        return user
       /*  if(user){
            return user
        }
        else{
            navigation('/login')
        } */
    }

    const logout = () => {
        localStorage.removeItem('user')
        navigation('/login')
    }

    const handleCreateProduct = (e) => {
        e.preventDefault()
        console.log("Producto creado")
        const formulario = e.target
        const formularioValores = new FormData(formulario)

        const nuevoProducto = {
            nombre: "",
            descripcion: "",
            precio: 0,
            stock: 0,
            codigo: "",
            categoria: "",
            thumbnail: ''
        } 
        for(let propiedad in nuevoProducto){
            nuevoProducto[propiedad] = formularioValores.get(propiedad)
        }
        nuevoProducto.id = uuid()


        /* SI quieren validar, este es el momento */

        setProductos([...productos, nuevoProducto])
        crearProducto(nuevoProducto)
        navigation('/')
    }
    
    /* const agregarProductoAlCarrito = (producto) => {
        setCarrito([...carrito, producto])
        HACER EN USE EFFECT
        guardarCarrito(carrito)
    }
 */


    return (
        <GlobalContext.Provider value={
                {
                    productos: productos,
                    handleDeleteProduct: handleDeleteProduct,
                    getUserData: getUserData,
                    logout: logout,
                    handleCreateProduct: handleCreateProduct,
                    carrito: carrito,
                    handleChangeSearchTerm,
                    searchTerm
                }
            }>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    /*Esto devolvera el objeto value proveido por el GlobalContext  */
    return useContext(GlobalContext)
}

/* 
const globalContextValues = useGlobalContext()
Retorna {nombre: nombre} 
*/