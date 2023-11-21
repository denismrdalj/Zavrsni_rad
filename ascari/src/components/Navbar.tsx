import { getAuth, onAuthStateChanged } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { app } from "../lib/firebase";
import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { UserType } from "../types/CarType";
import { usersCollection } from "../lib/controller";

function Navbar() {
  const auth = getAuth(app)
  const [authUser, setAuthUser] = useState(null)
  const [users, setUsers] = useState<UserType[]>([])
  
  useEffect(() => onSnapshot(usersCollection, (snapshot: 
    QuerySnapshot<DocumentData>) => {
      setUsers(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
      )   
    }), [])

  useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
          if(user) {
              setAuthUser(user)
          } else {
              setAuthUser(null)
          }
      })
      return () => {
          listen()
      }
  }, [])



  return (
    <nav className="bg-white bg-opacity-70 border-b-black-100 border flex-between p-8 h-28 sticky top-0">
      <Link to='/' className='justify-end items-end'>
        <img src="/logo.svg" alt="logo" width={130}/>
      </Link>
      <div className="flex">
        <Link  to="/about"
          className="flex text-[18px] items-center hover:text-gray-400 py-2 px-4 text-black font-bold">
          How it Works
        </Link>
        {authUser? 
        <div className="flex">
          <Link  to="/create"
            className="flex text-[18px] items-center hover:text-gray-400 py-2 px-4 text-black font-bold">
            Sell a Car
          </Link>
          <Link  to="/profile"
            className="flex text-[18px] items-center bg-black 
            hover:bg-white hover:border-black-2 hover:text-black mx-4 px-4 text-white font-bold rounded-full">
            Profile
          </Link>
        </div>
        : 
          <Link  to="/profile"
            className="flex text-[18px] items-center bg-black 
            hover:bg-white hover:border-black-2 mx-4 px-4 text-white font-bold rounded-full">
            Sign In
          </Link>}
      </div>
    </nav>
  );
}

export default Navbar;