import React, { useRef, useState } from 'react';
import "../App.css";
import bgImg from "../assets/bg-login.jpg";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const LogInForm = () => {

    const emailLog = useRef("");
    const psswLog = useRef("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);

    const submitLog = async() => {
        const payload = {
            email: emailLog.current.value,
            password: psswLog.current.value
        };
        console.log(payload);
        try { 
            const response = await fetch (`${process.env.REACT_APP_SERVERBASE_URL}/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
            });
            const res = await response.json();

            const redirectionSuccess = ()=>{//handle success login function: spinner and redirection.
                setLoginSuccess(true); 
                setLoginFailed(false);
                setTimeout(()=>{window.location.replace('https://medicalblog.netlify.app/')}, 2000)
            };
            res.token?redirectionSuccess():setLoginFailed(true);//if token exists, successFunction i executed, else setLoginFailed is setted on true

            console.log(JSON.stringify(res.token));
            localStorage.setItem("loginData", JSON.stringify(res.token))
            return res

        } catch (error) {
            localStorage.setItem("loginData", error)
            console.log("login non riuscito");
        }
    }


    return (
        <div className='myLogInForm d-flex justify-content-center align-items-center' style={{background: `url("https://img.freepik.com/free-vector/cyber-lock-security-padlock-abstract-wire-low-poly-polygonal-wire-frame-mesh-looks-like-constellation-dark-blue-night-sky-with-dots-stars-illustration-background_587448-642.jpg?w=1800&t=st=1691405553~exp=1691406153~hmac=5fe447c12c3822eff3f60fbb9d928bb64bed952834a5ea863066a5187b21ac19")`}}>
            <div className='d-flex justify-content-center align-items-center shadow'>
                <section className='text-center'>
                    <h3 className='fw-light'>Log In</h3>
                    <div>
                        <input type="text" ref={emailLog} placeholder='email'/>
                    </div>
                    <div>
                        <input type="password" ref={psswLog} placeholder='password'/>
                    </div>
                    <Button className='mt-3' variant="primary" onClick={()=>submitLog()}><i class="bi bi-fingerprint text-light"></i>log in</Button>
                    {loginSuccess?<div className='text-success mt-2'><i class="bi bi-patch-check-fill"> succesfully login!</i><Spinner animation="border" size="sm" /></div>:null}
                    {loginFailed?<div className='text-danger mt-2'><i class="bi bi-exclamation-triangle-fill"> login failed!</i></div>:null}
                </section>
            </div>
        </div>
    )
}

export default LogInForm