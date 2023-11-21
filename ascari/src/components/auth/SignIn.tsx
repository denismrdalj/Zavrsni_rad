import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import React from 'react'
import { auth } from "../../lib/firebase"
import { Link, useNavigate } from "react-router-dom"

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate('/profile')
    }).catch((error) => {
      console.log(error)
    })
  }
  
  return (
    <div className="grid place-items-center my-20">
      <form onSubmit={signIn} className="flex flex-col items-center">
        <h1 className="text-[25px] text-center font-bold mb-10">Sign In To Your Ascari Account</h1>
        <div>
          <label className="text-black-100 text-[18px] mb-1 font-semibold">E-mail address</label>
          <input 
            type="email" required
            className="block bg-white border border-black-100 text-black-100 rounded-lg w-80 px-2 py-2 mb-4"
            placeholder="Enter your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}>            
          </input>
        </div>
        <div>
          <label className="text-black-100 text-[18px] block mb-1 font-semibold">Password</label>      
          <input 
            type="password" required
            className="bg-white border border-black-100 text-black-100 rounded-lg w-80 px-2 py-2"
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}>          
          </input>
          <p className="mt-6 text-gray-600">New to Ascari?</p>
          <Link to="/signup" className=" text-gray-400">Create an Account</Link>
          <div className="flex justify-center">
            <button 
              type="submit" 
              className=" bg-black-100 text-white rounded-full w-fit px-4 py-2 mt-2">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignIn
