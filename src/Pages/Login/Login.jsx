import React, { useState } from 'react'
import { users } from '../../data/usersData'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const initialState = {username: '', password: ''}
    const initialStateErrors = {
        username: [],
        password: [],
        global: [],
    } 
    const [loginForm, setLoginForm] = useState(initialState)
    const [errors, setErrors] = useState(initialStateErrors)
    const handleChangeValue = (e) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }


    const validateUsernameLength = (value) => {
        return value > 3
    }



    const ERRORS = {
        USERNAME_LENGTH:  { 
            text: 'tu nombre de usuario debe tener mas de 10 caracteres', 
            id: 1, 
            validate: validateUsernameLength
        },
        USER_NOT_FOUND: {
            text: 'Credenciales invalidas', 
            id: 2, 
        }
    }

 
    const findError = (from, id_error) => {
        return errors[from].find(error => error.id == id_error)
    }
    
    /**
     * Una función que verifica un error dado un origen Ejemplo: 'username' | 'password'. y un objeto de error
     *
     * @param {string} from - El origen de donde proviene el error 'username' | 'password'.
     * @param {object} errorToValidate - El objeto de error que se va a validar, esto viene del objeto ERRORS.
     */
    const validateError = (from, errorToValidate)  => {
        /* Si ya existe en el estado de errores */
        if( findError(from ,errorToValidate.id)){
            /* Si se dejo de cumplir el error */
            if(errorToValidate.validate(loginForm[from])){
                /* Elimino el error PORQUE SE DEJO DE CUMPLIR */
                const newUsernameErrors = errors[from].filter(error => error.id != errorToValidate.id)
                setErrors({...errors, [from]: newUsernameErrors})
            }
        }
        /* Si no existe en el estado de errores */
        else{
            /* Verifico que no se cumpla la validacion */
            if(!errorToValidate.validate(loginForm[from])){
                /* Agregamos el error al estado de errores */
                setErrors({...errors, [from]: [...errors[from], errorToValidate]})
            }
        }
    }

    const  handleBlurInput = () => {
        console.log(loginForm)
        console.log(errors)
        validateError('username', ERRORS.USERNAME_LENGTH)
        
    }
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        for(const user of users){
            if(user.password === loginForm.password && user.username === loginForm.username){
                localStorage.setItem('user', JSON.stringify(user))
                return navigate('/')
            }
        }
        setErrors({...errors, global: [ERRORS.USER_NOT_FOUND]})
    }
  return (
    <main>
        <h1>Iniciar sesion</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor='username'>Nombre de usuario:</label>
                <input 
                    type="text" 
                    placeholder='joedoe' 
                    id='username' 
                    name='username' 
                    onChange={handleChangeValue} 
                    value={loginForm.username} 
                    onBlur={handleBlurInput}
                />
                {
                    errors.username.length > 0 && 
                    errors.username.map((error) => (<span key={error.id}>{error.text}</span>) )
                }

            </div>
            <div>
                <label htmlFor='password'>Contraseña:</label>
                <input 
                    type="password" 
                    placeholder='joedoe123' 
                    id='password' 
                    name='password' 
                    onChange={handleChangeValue} 
                    value={loginForm.password}
                />
            </div>
            {
                errors.global.map((error) => (<span key={error.id}>{error.text}</span>) )
            }
            <button type='submit'>Enviar</button>
            <span>Aun no tienes una cuenta? <Link to={'/registro'}>Registrate</Link></span>
        </form>
    </main>
  )
}

export default Login