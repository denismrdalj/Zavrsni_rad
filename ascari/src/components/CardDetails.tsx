import React from 'react'
import { CarType } from '../types/CarType'
import { generateCarImageUrl } from '../utils'
import { Link } from 'react-router-dom'
import { useCountdown } from '../hooks/useCountdown'

interface AuctionProps {
  car: CarType
}

function CardDetails({car}: AuctionProps) {
  
  const startDate = new Date(car.startDate!)
  const endDate = new Date(car.endDate!)
  const initialTime = endDate.getTime() - Date.now()
  const time = useCountdown(initialTime!, () => console.log('done'))
  return (
    <div className='car-card group'>
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
      <div className='relative w-full object-contain'>
        <img 
          src={generateCarImageUrl(car)}
          alt="car model" 
          className="object-contain"/>
      </div>   
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {car.year} {car.make} {car.model}
        </h2>
      </div>
      <p className="flex mt-2 text-[20px] font-bold">
        <img 
          src="/stopwatch.svg" 
          width={20}
          height={20}
          className="m1-4 opacity-60"
          alt="Stopwatch Logo"
        />
        <p className="flex pl-2">
          {time>0?(
            <p className="text-black text-[18px]">
            <span className='font-bold'>{
              (time > 24*60*60*1000)? 
                ((Math.trunc(time/1000/60/60/24) >= 2)? Math.trunc(time/1000/60/60/24)+' days':Math.trunc(time/1000/60/60/24)+' day') : 
                  (time > 60*60*1000)?
                    ((Math.trunc(time/1000/60/60) >= 2)? Math.trunc(time/1000/60/60)+' hours':Math.trunc(time/1000/60/60)+' hour') :
                      (time > 60*1000)?
                        ((Math.trunc(time/1000/60) >= 2)? Math.trunc(time/1000/60)+' minutes':Math.trunc(time/1000/60)+' minute') :
                          ((Math.trunc(time/1000) >= 2)? Math.trunc(time/1000)+' seconds':Math.trunc(time/1000)+' second')}</span> left
              </p>
              ) : (
                <p className='text-[18px] text-white bg-green-900 rounded-full px-4'>
                  Auction ended
                </p>                               
              )}</p>
      </p>  
      <p className="flex text-[25px] text-gray-500 font-semibold">
        Bid
        <p className="flex pl-2 text-[25px] text-green-800 font-bold">${car.bid}</p>
      </p>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <img 
              src="/shifter.svg" width={25} height={25}
              alt="shifter"/>
              <p className="text-[14px]">{car.transmission}</p>
          </div>
          <div className="car-card__icon">
            <img 
              src="/drive.png" width={25} height={25}
              alt="drive"/>
              <p className="text-[14px]">{car.drive?.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <img 
              src="/mileage.png" width={25} height={25}
              alt="mileage"/>
              <p className="text-[14px]">{car.mileage} Miles</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <Link to={`/cars/${car.id}`}
            className="text-center w-full py-[12px] rounded-full bg-black text-white font-bold">
              Go to Auction   
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardDetails
