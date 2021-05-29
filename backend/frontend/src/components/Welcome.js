import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import { signOut, isAuth } from '../helpers/auth';
import anonymousVid from '../images/1.mp4';
import aboutImg from '../images/1.svg';
import discoverImg from '../images/2.png';
import service3Img from '../images/3.png';

const Welcome = () => {
    useEffect(() => {
        const inputs = document.querySelectorAll(".input");

        function focusFunc() {
            let parent = this.parentNode;
            parent.classList.add("focus");
        }

        function blurFunc() {
            let parent = this.parentNode;
            if (this.value === "") {
                parent.classList.remove("focus");
            }
        }

        inputs.forEach((input) => {
            input.addEventListener("focus", focusFunc);
            input.addEventListener("blur", blurFunc);
        })
    });

    function logout(e){
        e.preventDefault();
        signOut();
        window.location.reload(false);
    }

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href='/css/style.css' />
            </Helmet>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="scrollspy">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">SubDumAlert</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item mx-3">
                                    <a className="nav-link" href="#about">About</a>
                                </li>
                                <li className="nav-item mx-3">
                                    <a className="nav-link" href="#discover">Discover</a>
                                </li>
                                <li className="nav-item mx-3">
                                    <a className="nav-link" href="#service">Service</a>
                                </li>
                                <li className="nav-item mx-3">
                                    <a className="nav-link" href="#contact">Contact Us</a>
                                </li>
                            </ul>
                            {isAuth() ? <NavLink id="login" className="btn rounded-pill" type="submit" to="/" onClick={logout}>Logout</NavLink> : <NavLink id="login" className="btn rounded-pill" type="submit" to="/join">Join</NavLink>}
                        </div>
                    </div>
                </nav>
            </header>
            <div className="mid">
                <video autoPlay muted loop>
                    <source className="embed-responsive" src={anonymousVid} type="video/mp4" />
                </video>
                <div className="hero text-center">
                    <h2 className="text-light display-4 mt-5">Sub Domains Made Easy</h2>
                    <p className="text-light mx-auto">Finding a subdomain is easy with SubDumAlert. It is a handcrafted search engine that allows you to discover subdomains of any domain.
                    <br/>Go ahead and give a try for your research works.</p>
                    {isAuth() ? <NavLink to="/home">Get Started</NavLink> : <NavLink to="/join">Get Started</NavLink>}
                </div>
            </div>

            <section id="about" className="about py-5">
                <div className="row align-items-center container my-5 mx-auto">
                    <div className="col-lg-6 col-12 w-50 text">
                        <h6>UNLIMITED ACCESS</h6>
                        <h2>Login to your account at any time</h2>
                        <p>Tools runs twice a day, you can come and put your desired domains anytime and check for its subdomains once they are available.</p>
                        <NavLink to="#">Learn More</NavLink>
                    </div>
                    <div className="col-lg-6 col-12 w-50 img">
                        <img className="img-fluid" src={aboutImg} alt="img" />
                    </div>
                </div>
            </section>

            <section id="discover" className="discover py-5">
                <div className="row align-items-center container my-5 mx-auto">
                    <div className="col-lg-6 col-12 w-50 img">
                        <img className="img-fluid" src={discoverImg} alt="img" />
                    </div>
                    <div className="col-lg-6 col-12 w-50 text">
                        <h6>PREMIUM ENGINE</h6>
                        <h2>Unlimited Searches with zero fees</h2>
                        <p>We have a large number of a domain database, and you don’t want to miss this in finding public subdomain information.</p>
                        <NavLink to="#">Learn More</NavLink>
                    </div>
                </div>
            </section>

            <section id="service" className="service py-3">
                <div className="col mx-auto align-items-center my-5">
                    <div className="heading text-center pt-5">
                        <h2 className="bold pb-5 text-light">Our Services</h2>
                    </div>
                    <div className="row mx-auto justify-content-center align-items-center text-center container">
                        <div className="one col-lg-3 col-md-3 col-12 w-25 m-2">
                            <img className="img-fluid w-75 pb-2" src={aboutImg} alt="" />
                            <h5 className="bold">Virtual Offices</h5>
                            <p>Use the tool anytime and from anywhere as per your flexibility.</p>
                        </div>
                        <div className="one col-lg-3 col-md-3 col-12 w-25 m-2">
                            <img className="img-fluid w-75 pb-2" src={discoverImg} alt="" />
                            <h5 className="bold">Reduce Expenses</h5>
                            <p>No need to pay a single penny for using it to fulfill your needs.</p>
                        </div>
                        <div className="one col-lg-3 col-md-3 col-12 w-25 m-2">
                            <img className="img-fluid w-75 pb-2" src={service3Img} alt="" />
                            <h5 className="bold">Premium Benefits</h5>
                            <p>This platform is there to bridge the gap between beginners and experts.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className="contact py-5">
                <div className="container">
                    <div className="form my-4 mx-auto border-dark">
                        <div className="contact-info">
                            <h3 className="title">Let's get in touch</h3>
                            <p className="text">
                                We all are part of a community cum family. Please feel free to provide us your thoughts and suggestions. We'll try to get back to you as soon as possible. 
                            </p>
                            <div className="info">
                                <div className="information">
                                    <i className="fas fa-phone-alt icon"></i>
                                    <p>897-922-4935</p>
                                </div>
                                <div className="information">
                                    <i className="fas fa-envelope icon"></i>
                                    <p>k4k4r07@hacker.in</p>
                                </div>
                                <div className="information">
                                    <i className="fas fa-map-marked-alt icon"></i>
                                    <p>Sector 32, Mohali, Chandigarh.</p>
                                </div>
                            </div>
                            <div className="social-media pt-3">
                                <p>Connect with us :</p>
                                <div className="social-icons">
                                    <NavLink to="#">
                                        <i className="fab fa-facebook-f"></i>
                                    </NavLink>
                                    <NavLink to="#">
                                        <i className="fab fa-twitter"></i>
                                    </NavLink>
                                    <NavLink to="#">
                                        <i className="fab fa-instagram"></i>
                                    </NavLink>
                                    <NavLink to="#">
                                        <i className="fab fa-linkedin-in"></i>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form">
                            <span className="circle first"></span>
                            <span className="circle second"></span>
                            <form action="#" method="POST">
                                <h3 className="title">Contact Us</h3>
                                <div className="input-container">
                                    <input type="text" name="name" className="input" autoComplete="off" />
                                    <label htmlFor="">Username</label>
                                    <span>Username</span>
                                </div>
                                <div className="input-container">
                                    <input type="email" name="email" className="input" autoComplete="off" />
                                    <label htmlFor="">Email</label>
                                    <span>Email</span>
                                </div>
                                <div className="input-container">
                                    <input type="tel" name="phone" className="input" autoComplete="off" />
                                    <label htmlFor="">Phone</label>
                                    <span>Phone</span>
                                </div>
                                <div className="input-container textarea">
                                    <textarea name="message" className="input"></textarea>
                                    <label htmlFor="">Message</label>
                                    <span>Message</span>
                                </div>
                                <input type="submit" value="Send" className="btn" />
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="container-fluid">
                <div className="footer-content">
                    <h3>SubDumAlert</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nesciunt, rerum quo sint corrupti ex voluptates aut? Beatae, odio fuga!</p>
                </div>
                <div className="footer-bottom mx-auto">
                    <p>copyright &copy;2021 SubDumAlert. designed by <span>k4k4r07</span></p>
                </div>
            </footer>
        </>
    )
}

export default Welcome;