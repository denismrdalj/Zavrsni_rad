import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../lib/controller'
import CardDetails from './CardDetails'
import AuctionDetails from './AuctionDetails'

function Auction() {
    const {id} = useParams()
    const getCar = doc(firestore, `cars/${id}`)
    const [car, setCar] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchCarData = async () =>{
            setIsLoading(true)
            const docSnap = await getDoc(getCar)
            if(docSnap.exists()){
                const newCarObj = {
                    id: docSnap.id,
                    ...docSnap.data()
                }
                setCar(newCarObj)
                setIsLoading(false)
            } else {
                console.log("No document")
            }
        }
        fetchCarData()
    },[])
    if(isLoading) return <div className='text-center'>Loading</div>


    return (
        <div className=''>
            {Object.keys(car) && Object.keys(car).length ? (
                <AuctionDetails car={car}/>
            ): null}
        </div>
    )
}

export default Auction
