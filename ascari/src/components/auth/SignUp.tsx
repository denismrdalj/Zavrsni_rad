import React, { useState } from "react"
import { User, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../lib/firebase"
import { Link, useNavigate } from "react-router-dom"
import { addUser } from "../../lib/controller"

const SignUp = () => {
  var id = ''
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [balance, setBalance] = useState(0)
  const navigate = useNavigate() 
  
  
  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {     
        const user = auth.currentUser      
        if(user!==null) {
          updateProfile(user, {displayName: username})
          id = user.uid  
          setBalance(0)
        }
                 
        addUser({
          id,
          username,
          email,
          password,
          balance
        })
        }
      )
    navigate('/profile')
  }
  
  return (
    <div className="grid place-items-center my-20">
      <form onSubmit={signUp} className="flex flex-col items-center">
        <h1 className="text-[25px] text-center font-bold mb-10">Create Your Ascari Account</h1>
        <div>
          <label className="text-black-100 text-[18px] mb-1">Username</label>
          <input 
            type="username" required
            className="block bg-white border border-black-100 text-black-100 rounded-lg w-80 px-2 py-2 mb-4"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}>            
          </input>
        </div>
        <div>
          <label className="text-black-100 text-[18px] mb-1">E-mail address</label>
          <input 
            type="email" required
            className="block bg-white border border-black-100 text-black-100 rounded-lg w-80 px-2 py-2 mb-4"
            placeholder="Enter your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}>            
          </input>
        </div>
        <div>
          <label className="text-black-100 text-[18px] block mb-1">Password</label>      
          <input 
            type="password" required
            className="bg-white border border-black-100 text-black-100 rounded-lg w-80 px-2 py-2"
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}>          
          </input>
          <p className="mt-6 text-gray-600">Already registered?</p>
          <Link to="/signin" className=" text-gray-400">Sign in to my account</Link>
          <div className="flex justify-center">
            <button 
              type="submit" 
              className=" bg-black-100 text-white rounded-full w-fit px-4 py-2 mt-6">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp
