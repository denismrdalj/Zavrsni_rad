import React, { useEffect, useState } from 'react'
import { CarType, UserType } from '../types/CarType'
import { Link, useNavigate } from 'react-router-dom'
import { generateCarImageUrl } from '../utils'
import { useCountdown } from '../hooks/useCountdown'
import { DocumentData, QuerySnapshot, Timestamp, doc, documentId, onSnapshot, updateDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { app } from '../lib/firebase'
import { firestore, usersCollection } from '../lib/controller'

interface AuctionDetailsProps{
    car: CarType
}


function AuctionDetails({car}: AuctionDetailsProps) {
    const auth = getAuth(app)
    const [authUser, setAuthUser] = useState(null)  
    const [users, setUsers] = useState<UserType[]>([])
    const [bid, setBid] = useState(0)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    var bidders: string[] = []
    var bids: number[] = []
    var newBid = 0
    var highBidder = ''

    
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

    const placeBid = () => {
        newBid = bid+ car.bid!
        highBidder = auth.currentUser?.displayName        
        updateDoc(doc(firestore, 'cars', car.id), {bid: newBid, bidder: highBidder})      
        navigate('/')
        navigate(-1)
        return (
            bids.push(newBid), 
            bidders.push(highBidder!))
    }
    
    const startDate = new Date(car.startDate!)
    const endDate = new Date(car.endDate!)
    const initialTime = endDate.getTime() - Date.now()
    const time = useCountdown(initialTime!, () => console.log('done'))

    const getBalance = () => {
        const userid = auth.currentUser?.uid
        setUsers(users.filter((user) => {
            return (
              user.id?.toLowerCase().includes(userid!.toLowerCase())
              )
          }))
        console.log(users)
    }
    const handleClick = () => {
        setShow(!show)
        getBalance()
    }


    
  return (
    <div className='h-screen'>
        <div className='flex justify-center'>
            <div className='max-w-7xl 300px grid grid-cols-4'>
                <div className='col-span-3'>
                    <div className='relative w-full object-contain'>
                        <img 
                            src={generateCarImageUrl(car)}
                            alt="car model" 
                            className="object-contain"/>
                    </div>   
                </div>
                <div className='grid grid-cols-1 grid-rows-3'>
                    <img 
                        src={generateCarImageUrl(car, '23')}
                        alt="car model" 
                        className="object-contain"/>
                    <img 
                        src={generateCarImageUrl(car, '13')}
                        alt="car model" 
                        className="object-contain"/>
                    <img 
                        src={generateCarImageUrl(car, '33')}
                        alt="car model" 
                        className="object-contain"/>
                </div>
                <div className='bg-gray-100 border-b-4 grid grid-flow-col rounded-xl w-screen max-w-screen-xl p-6'>
                    <div className='col-span-3'>
                        <p className="opacity-60 flex text-[14px]">
                            <img 
                                src="/location.svg" 
                                width={20}
                                height={20}
                                className="m1-4"
                                alt="Location Logo"
                            />
                            <p className="font-semibold flex pl-2">{car.location}</p>
                        </p> 
                            
                        <div className="car-card__content">
                            <h2 className="text-[26px] font-bold">
                                {car.year} {car.make} {car.model}
                            </h2>
                        </div>
                        <p className="flex text-[20px] ">
                            <img 
                                src="/stopwatch.svg" 
                                width={20}
                                height={20}
                                className="m1-4 opacity-60"
                                alt="Stopwatch Logo"
                            />
                            {time>0?(
                            <p className="text-black ml-1 text-[18px]">
                                <span className='font-bold text-[25px] mr-1'>{
                                (time > 24*60*60*1000)? 
                                ((Math.trunc(time/1000/60/60/24) >= 2)? Math.trunc(time/1000/60/60/24)+' days':Math.trunc(time/1000/60/60/24)+' day') : 
                                (time > 60*60*1000)?
                                ((Math.trunc(time/1000/60/60) >= 2)? Math.trunc(time/1000/60/60)+' hours':Math.trunc(time/1000/60/60)+' hour') :
                                (time > 60*1000)?
                                ((Math.trunc(time/1000/60) >= 2)? Math.trunc(time/1000/60)+' minutes':Math.trunc(time/1000/60)+' minute') :
                                ((Math.trunc(time/1000) >= 2)? Math.trunc(time/1000)+' seconds':Math.trunc(time/1000)+' second')}</span> left
                            </p>
                            ) : (
                                <p className='ml-2 text-[18px] text-white bg-green-900 rounded-full px-4'>
                                    Auction ended
                                </p>                               
                            )}
                        </p>  
                        <p className="flex items-center text-[18px] text-gray-500">
                            Highest bid
                            <p className="flex pl-2 text-[25px] text-green-800 font-bold">${car.bid}</p>
                        </p>
                        <div className="relative flex-col w-full mt-4">    
                                {authUser && auth.currentUser?.displayName!==car.sellerUsername ? (  
                                <div className='flex-col items-center'>
                                    {time>0?(
                                    <button className='bg-black text-white py-2 px-10 h-10 mb-4 flex items-center rounded-full'
                                        onClick={handleClick}>
                                            Place Bid
                                    </button>) : (
                                        <p className='text-[18px]'>
                                            Auction has ended, won by <span className='font-bold'>{car.bidder}</span> for <span className='font-bold text-green-900'>${car.bid}</span>
                                            </p>
                                    )
                                    }
                                    {show ? (
                                        <div className='flex-col items-center'>
                                            <div className='flex items-center'>
                                                <p className="pl-2 pr-2 text-[20px] text-green-800 font-bold">${car.bid}</p>
                                                <div className='flex items-center'>
                                                    <p className="block items-center pl-2 pr-2 text-[20px] font-bold">+</p>
                                                    <input 
                                                        type="bid" required
                                                        className="text-center bg-gray-100 border-b border-black-100 text-black-100 w-20 ml-2 px-2"
                                                        placeholder="Enter your bid"
                                                        value={bid}
                                                        onChange={(e) => setBid(parseInt(e.target.value))}>           
                                                    </input>
                                                    <p className="block items-center pl-2 pr-2 text-[20px] font-bold">=</p>
                                                    <p className="block items-center pl-2 pr-2 text-[20px] font-bold">${car.bid+bid}</p>
                                                    <button onClick={placeBid} className="ml-6 bg-black text-white py-2 px-10 rounded-full">
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )} 
                                </div>
                                ) : (
                                    <div>
                                        <p className='mb-2'>The seller cannot place bids</p>
                                        <Link  to="/profile"
                                        className="flex items-center bg-black hover:bg-gray-400 w-fit py-2 px-6 text-white rounded-full">
                                        Sign in to Bid
                                        </Link>
                                    </div>
                                    ) 
                                }
                        </div>
                    </div>
                        <div className='grid grid-cols-2'>
                            <p className='text-[18px] font-bold text-gray-400'>Engine</p>
                            <p className='font-bold text-gray-800'>{car.engine}</p>
                            <p className='text-[18px] font-bold text-gray-400'>Transmission</p>
                            <p className='font-bold text-gray-800'>{car.transmission}</p>
                            <p className='text-[18px] font-bold text-gray-400'>Drive</p>
                            <p className='font-bold text-gray-800'>{car.drive}</p>
                            <p className='text-[18px] font-bold text-gray-400'>Fuel</p>
                            <p className='font-bold text-gray-800'>{car.fuel}</p>
                        </div>
                        <div className='grid grid-cols-2'>
                            <p className='text-[18px] font-bold text-gray-400'>Location</p>
                            <p className='font-bold text-gray-800'>{car.location}</p>
                            <p className='text-[18px] font-bold text-gray-400'>Mileage</p>
                            <p className='font-bold text-gray-800'>{car.mileage} Miles</p>
                            <p className='text-[18px] font-bold text-gray-400'>VIN</p>
                            <p className='font-bold text-gray-800'>{car.vin}</p>
                            <p className='text-[18px] font-bold text-gray-400'>Body Style</p>
                            <p className='font-bold text-gray-800'>{car.bodyStyle}</p>
                        </div>
                </div>
                <div className='col-span-4 w-screen max-w-4xl p-6'>
                    <p className='text-[18px] text-black'>
                        <span className='text-gray-500'>Started: </span>{startDate?.toLocaleDateString('en-US', {weekday:'short',  month:'long', day:'numeric', hour:'numeric', minute:'numeric'})}</p>
                    <p className='text-[18px] text-black'>
                        <span className='text-gray-500'>Ending: </span>{endDate?.toLocaleDateString('en-US', {weekday:'short', month:'long', day:'numeric', hour:'numeric', minute:'numeric'})}</p>
                    <p className='mt-2 text-[18px] text-black'>
                        <span className='text-gray-500'>Seller: </span>{car.sellerUsername}</p>
                    <p>{car.sellerEmail}</p>

                    <p className='text-[20px] text-gray-400 mt-4 font-bold'>Description</p>
                    <p className='mt-2'>{car.description}</p>
                    <div className='flex flex-col'>
                        <h1 className='text-[20px] text-gray-400 mt-8 font-bold'>Bidding history</h1>
                        <p className='my-2 rounded-full bg-white border-2 px-4 py-2 w-fit border-black text-[18px]'><span className='font-bold'>{car.bidder}</span> bid <span className='font-bold text-green-900'>${car.bid}</span></p>
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default AuctionDetails
