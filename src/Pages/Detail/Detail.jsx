import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { eliminarProductoPorId, obtenerProductoPorId } from '../../helpers/productos'
import { useGlobalContext } from '../../Context/GlobalContext'

const Detail = () => {
  /* useParams retorna un objeto con los parametros de busqueda */
  const parametros = useParams()
  const { handleDeleteProduct } = useGlobalContext()

  console.log(parametros)

  const producto = obtenerProductoPorId(parametros.producto_id)



  return (
    <div>
      {
        producto
          ? 
          <ProductDetailed producto={producto}  />
          :
          <>
            <h2>No se encontro producto con ese id</h2>
            <Link to='/'>Ir a inicio</Link>
          </>

      }

    </div>
  )
}

export default Detail


const ProductDetailed = ({producto}) => {
  const {handleDeleteProduct} = useGlobalContext()
  return (
    <>
      <h1>{producto.nombre}</h1>
      <img src={producto.thumbnail} />
      <span>Categoria: {producto.categoria}</span>
      <p>
        {producto.descripcion}
      </p>
      <span>
        <b>Precio</b>:{producto.precio}
      </span>
      <br />
      <span>
        <b>Unidades disponibles</b>:
        {producto.stock}
      </span>
      <br />
      <button>Comprar</button>
      <button onClick={() => handleDeleteProduct(producto.id)}>Eliminar</button>
    </>
  )
}