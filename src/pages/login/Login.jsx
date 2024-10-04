import React, { useContext, useState} from 'react'
import './login.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom'


export const Login = () => {

  const [ error, setError ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const navigate = useNavigate()

   const { dispatch } = useContext(AuthContext)

  const handleLogin = (e) => { 
    
      e.preventDefault();

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
         const user = userCredential.user;
         dispatch({type:"LOGIN", payload:user})

        navigate("/")
        
      })
      .catch((error) => {

        setError(true)

        
      });

  };
  return (
    <div className='login'>
      
      <fieldset>
        <legend>Ridesmash Admin</legend>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder='Password'  onChange={e => setPassword(e.target.value)}/>
          <Link to="/forgotPwd" style={{textDecoration:'none'}}>
            <div className='forgotPwd'>
                <div>Forgot Password</div>
            </div>
          </Link>
          <button type="submit">Login</button>
          <span>{error && "Wrong email or password"}</span>
        </form>


      </fieldset>

    </div>
  )
}
