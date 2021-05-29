import { React, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { setLocalStorage, isAuth } from '../helpers/auth';
import axios from 'axios';
import loginImg from '../images/login.svg';
import registerImg from '../images/signup.svg';
import { Redirect, useHistory } from 'react-router-dom';

const Login = () => {
    axios.defaults.withCredentials=true;
    let history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = formData;

    //Handle Change from inputs
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    }

    //Submit register data to backend
    const handleRegisterSubmit = e => {
        e.preventDefault();
        if (name && email && password) {
            axios.post('/api/users/register', {
                name, email, password
            }).then(res => {
                if (res.data.success) {
                    setFormData({
                        ...formData,
                        name: '',
                        email: '',
                        password: ''
                    })
                    setLocalStorage('user', res.data.user);
                    toast.success(res.data.message);
                    history.push('/home');
                }else{
                    toast.error(res.data.message);
                }
            }).catch(err => {
                toast.error(JSON.stringify(err));
            })
        } else {
            toast.error('Please fill all the fields');
        }
    }

    //Submit login data to backend
    const handleLoginSubmit = e => {
        e.preventDefault();
        if (email && password) {
            axios.post('/api/users/login', {
                email, password
            }).then(res => {
                if (res.data.success) {
                    setFormData({
                        ...formData,
                        email: '',
                        password: ''
                    })
                    setLocalStorage('user', res.data.user);
                    toast.success(res.data.message);
                    history.push('/home');
                }else{
                    toast.error(res.data.message);
                }
            }).catch(err => {
                toast.error(JSON.stringify(err));
            })
        } else {
            toast.error('Please fill all the fields');
        }
    }


    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container-fluid");

        sign_up_btn.addEventListener('click', () => {
            container.classList.add('sign-up-mode');
        })

        sign_in_btn.addEventListener('click', () => {
            container.classList.remove('sign-up-mode');
        })
    }, []);
    return (
        <>
            {isAuth() ? <Redirect to='/' /> : null}
            <Helmet>
                <link rel="stylesheet" href='/css/loginstyle.css' />
            </Helmet>
            <ToastContainer />
            <div className="container-fluid">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="/home" method="POST" onSubmit={handleLoginSubmit} className="sign-in-form">
                            <h1 className="title">Sign in</h1>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" onChange={handleChange('email')} value={email} required/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" onChange={handleChange('password')} value={password} required/>
                            </div>
                            <input type="submit" value="Login" className="btn solid" />

                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google"></i>
                                </a>
                            </div>
                        </form>

                        <form action="/home" method="POST" onSubmit={handleRegisterSubmit} className="sign-up-form">
                            <h1 className="title">Sign up</h1>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" onChange={handleChange('name')} value={name} required/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" onChange={handleChange('email')} value={email} required/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" onChange={handleChange('password')} value={password} required/>
                            </div>
                            <input type="submit" value="Sign up" className="btn solid" />

                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>Do register in order to become a part of this prestigious community.</p>
                            <button className="btn transparent" id="sign-up-btn">Sign up</button>
                        </div>
                        <img src={loginImg} className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>Welcome back folk. Good to see you again, please login here with your credentials.</p>
                            <button className="btn transparent" id="sign-in-btn">Sign in</button>
                        </div>
                        <img src={registerImg} className="image" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;