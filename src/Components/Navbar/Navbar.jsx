import React, { useState } from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
    const {user, logout} = useGlobalContext()
    const [openMenu, setOpenMenu] = useState(false)
    const handleToggleMenu = () => setOpenMenu(!openMenu)
    return (
        <header>
            <h2>Brand Name</h2>
            <nav>

                {
                    user
                        ?
                        <button onClick={logout}>Cerrar sesion</button>
                        :
                        <NavLink to={'/login'}>Login</NavLink>
                }
                {
                    (user && user.role === 'admin')
                    &&
                    <>
                        <NavLink to={'/product/new'}>Crear producto</NavLink>
                        <NavLink to={'/cart'}>Carrito</NavLink>
                    </>
                }
                {
                    (user && user.role === 'user')
                    &&
                    <>
                        <NavLink to={'/cart'}>Carrito</NavLink>
                    </>
                }
            </nav>
            <button className='btn-mobible-menu' onClick={handleToggleMenu}>
                <IoMdMenu />
            </button>
            {
                openMenu
                &&
                <nav className='nav-mobible'>
                
                {
                    user
                        ?
                        <button onClick={logout}>Cerrar sesion</button>
                        :
                        <NavLink to={'/login'}>Login</NavLink>
                }
                {
                    (user && user.role === 'admin')
                    &&
                    <>
                        <NavLink to={'/product/new'}>Crear producto</NavLink>
                        <NavLink to={'/cart'}>Carrito</NavLink>
                    </>
                }
                {
                    (user && user.role === 'user')
                    &&
                    <>
                        <NavLink to={'/cart'}>Carrito</NavLink>
                    </>
                }
            </nav>
            }
            
        </header>
    )
}

export default Navbar