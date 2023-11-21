import { useEffect, useState } from 'react'
import { app } from '../lib/firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import SignIn from './auth/SignIn'
import { Link } from 'react-router-dom'
import { CarType, UserType } from '../types/CarType'
import { carsCollection, usersCollection } from '../lib/controller'
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore'



function Profile() {
    const auth = getAuth(app)
    const [authUser, setAuthUser] = useState(null)
    const [users, setUsers] = useState<UserType[]>([])
    const [cars, setCars] = useState<CarType[]>([])
    const [show, setShow] = useState(false)
    const [balance, setBalance] = useState<number>()
  
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

    useEffect(() => onSnapshot(carsCollection, (snapshot: 
        QuerySnapshot<DocumentData>) => {
          setCars(
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

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Sign out successful')
        }).catch(error => console.log(error))
    }

    const getBalance = () => {
        const userid = auth.currentUser?.uid
        setUsers(users.filter((user) => {
            return (
              user.id?.toLowerCase().includes(userid!.toLowerCase())
              )
          }))
        console.log(users)
        setShow(!show)
        setBalance(users[0].balance)
        console.log(balance)
    }




    return (
        <div className='h-screen'>
            {authUser? 
            <div className='flex-center flex-col'>
                <h1 className='mt-6 font-extrabold text-[30px]'>Welcome to Ascari, {auth.currentUser?.displayName}</h1> 
                
                <Link to="/" 
                    className='bg-white border-2 border-black text-black font-bold 
                    px-4 py-2 mt-6 rounded-full hover:bg-black hover:text-white'>Explore Live Auctions</Link>

                <p className='mt-4'>Your e-mail</p>
                <p className='font-bold mt-2'>{auth.currentUser?.email}</p>
                
                <button 
                    onClick={userSignOut} 
                    className='bg-rose-400 text-white rounded-full px-4 py-2 mt-10 hover:bg-rose-800'>Sign Out</button>
            </div>
            : <SignIn/>}
        </div>
  )
}

export default Profile
