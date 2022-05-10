import React, { useContext, useEffect } from 'react';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { AuthContext } from '../../Context/Auth/AuthContext';

import { initialFormValuesLogin } from '../../Data/InitialFormValues';
import { useValidation } from '../../Hooks/useValidation';
import { ValidateLogin } from '../../validations/ValidateLogin';

export const LoginScreen = () => {
    const alertContext = useContext( AlertContext );
    const { alert, showAlert } = alertContext;

    const authContext = useContext( AuthContext );
    const { login, message } = authContext;

    useEffect(() => {
        if( message ) {
            showAlert( message.msg, message.type );
        }
    }, [ message, showAlert ]);
    
    const [ formValues, handleSubmit, handleInputChange  ] = useValidation( initialFormValuesLogin, ValidateLogin, handleLogin  );
    const { username, password } = formValues;

    /*
        * @Description: Funcion para iniciar sesion
        * @Param: { username, password }
        * @Return: { void }
        * @Usage: login( username, password );
    */
    function handleLogin() {
        login({ username, password });
    }

    return (
        <section>
            <div className='container__img'>
                <img src='./assets/inventario.jpg' alt='avatar' />
            </div>

            { alert && <div className={ `alerta ${ alert.type }` }> { alert.msg } </div> }

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
                        <p>Don't have an account <a href='/register'>Sign up</a> </p>
                    </div>
                </form>
            </div>
        </section>
    );
}