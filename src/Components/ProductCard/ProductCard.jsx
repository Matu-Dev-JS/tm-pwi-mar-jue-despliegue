import React from 'react'
import { Link } from 'react-router-dom'
import { productos } from '../../data/productsData'

const ProductCard = ({ producto }) => {
    const {
        nombre,
        descripcion,
        precio,
        id,
        stock,
        codigo,
        categoria
    } = producto

    return (
        <div>
            <h3>{nombre}</h3>
            
            <span>Precio: ${precio}</span>
            <span><b>Unidades disponibles:</b> {stock}</span>
            <Link to={'/detail/' + id}>Ver detalle</Link>
            <hr />
        </div>
    )
}

export default ProductCard