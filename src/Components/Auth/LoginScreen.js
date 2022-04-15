import React, { useContext } from 'react';
import { AlertContext } from '../../Context/Alert/AlertContext';
import { AuthContext } from '../../Context/Auth/AuthContext';
import { useForm } from '../../Hooks/useForm';

export const LoginScreen = () => {
    const alertContext = useContext( AlertContext );
    const { alert, showAlert } = alertContext;

    const authContext = useContext( AuthContext );
    const { login } = authContext;

    const [ formValue, handleInputChange ] = useForm({
        username: '',
        password: ''
    });

    const { username, password } = formValue;

    // todo: Cuando el usuario quiere iniciar Sesión
    const handleSubmit = (e) => {
        e.preventDefault();

        // Todo: Validar los campos
        if( username.trim() === '' || password.trim() === '' ) {
            showAlert( 'Todos los campos son obligatorios', 'alert-error' )
            return;
        }

        login({ username, password });
    }

    return (
        <section>
            <div className='container__img'>
                <img src='./assets/inventario.jpg' alt='avatar' />
            </div>

            <div className='form__container'>
                <form className='form__container--form' onSubmit={ handleSubmit }>
                    <h2>Login</h2>

                    <div className='input__box'>
                        <span>Username</span>
                        <input 
                            type='text' 
                            name='username' 
                            placeholder='User Name'
                            value={ username }
                            onChange={ handleInputChange }
                        />
                    </div>

                    <div className='input__box'>
                        <span>Password</span>
                        <input 
                            type='password' 
                            name='password' 
                            placeholder='Password'
                            value={ password }
                            onChange={ handleInputChange }
                        />
                    </div>

                    <div className='remember'>
                        <input type='checkbox' name='' /> Remember Me
                    </div>

                    <div className='input__box'>
                        <button type='submit' className='btn-primary'>
                            Sign in
                        </button>
                    </div>

                    <div className='input__box check__in'>
                        <p>Don't have an account <a href='#'>Sign up</a> </p>
                    </div>

                    { alert && <div className={ `alerta ${ alert.type }` }> { alert.msg } </div> }
                </form>
            </div>
        </section>
    );
}