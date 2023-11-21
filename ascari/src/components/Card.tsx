import React, { useEffect, useState } from 'react'
import { carsCollection } from '../lib/controller'
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore'
import { CarType } from '../types/CarType'
import CardDetails from './CardDetails'

function Card() {
  const [cars, setCars] = useState<CarType[]>([])
  

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
  return (
    <div className='h-fit pb-10'>
      {cars && cars.length ? (
        <div className='px-6 home__cars-wrapper'>
          {cars?.map((car) => (
            <CardDetails key={car.id} car={car}/>
            ))}
        </div>
        ) : (
          <h1>No Results</h1>
      )}
    </div>
  )
}

export default Card
