import './forgotPwd.scss'
import React, { useState} from 'react'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom'

export const ForgotPwd = () => {

    
    const [ errors, setErrors ] = useState("");
    const [ email, setEmail ] = useState("");
    
    const navigate = useNavigate()
        

   const handleForgotPwd = async (e) => { 
            
        e.preventDefault();


        try {

            const config = {
                url : "http://localhost:3000/login"
            }

            await sendPasswordResetEmail(auth, email, config)
            .then(() => {
                navigate("/login")
            })
            .catch(() => {

                const err = "Email not found. Please try again";
                setErrors(err)
            })
            
        } catch{
            const err = "Email Required"
            setErrors(err)
        }

   }

    return(
        <div className='forgotPwd'>
            <fieldset>
                 <legend>Forgot Password</legend>
                  
                   
                    <form onSubmit={handleForgotPwd}>
                    {/* <div className='text'>Enter your email address and we will send you instructions on how to change your password.
                   </div>    */}
                    <input type="email" placeholder="Email" value = {email} name="email" onChange={e => setEmail(e.target.value)}/>
                    <button type="submit">Send</button>
                    <span>
                        {errors}
                    </span>
                    </form>
                   
                    <Link to="/login" style={{textDecoration:'none'}}>
                        <div>
                            <div>Login</div>
                        </div>
                    </Link>

           </fieldset>

        </div>
    )
}
