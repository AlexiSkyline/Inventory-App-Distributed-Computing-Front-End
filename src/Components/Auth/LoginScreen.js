import React from 'react';
import { useForm } from '../../Hooks/useForm';

export const LoginScreen = () => {
    const [ formValue, handleInputChange ] = useForm({
        username: '',
        password: ''
    });

    const { username, password } = formValue;

    return (
        <section>
            <div className='container__img'>
                <img src='./assets/inventario.jpg' alt='avatar' />
            </div>

            <div className='form__container'>
                <form className='form__container--form'>
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
                </form>
            </div>
        </section>
    );
}