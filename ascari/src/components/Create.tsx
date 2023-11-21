import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addAuction } from '../lib/controller'
import { auth } from '../lib/firebase'
import { Timestamp } from 'firebase/firestore'

function Create() {
    const [year, setYear] = useState(2023)
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [bodyStyle, setBodyStyle] = useState('')
    const [drive, setDrive] = useState('FWD')
    const [mileage, setMileage] = useState(0)
    const [engine, setEngine] = useState('')
    const [transmission, setTransmission] = useState('Manual')
    const [fuel, setFuel] = useState('Petrol')
    const [vin, setVin] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [bid, setBid] = useState(0)
    const [auctionTime, setAuctionTime] = useState(604800000)
    var sellerUsername = ''
    var sellerEmail = ''
    

    const navigate = useNavigate()

    const addNewAuction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const bidder = ''
        const startDate = Date.now()
        const endDate = startDate+(auctionTime)
        const timeRemaining = endDate - startDate 
        const user = auth.currentUser    
        if(user !== null) {
          sellerUsername=user.displayName!
          sellerEmail=user.email!}
        addAuction({
          year,
          make,
          model,
          bodyStyle,
          drive,
          mileage,
          engine,
          transmission,
          fuel,
          vin,
          location,
          description,
          bid,
          bidder,
          sellerUsername,
          sellerEmail,
          startDate,
          endDate,
          timeRemaining
        })
        console.log("successfuly added")
        navigate("/")
    }
  return (
    <div className='flex items-center flex-col h-screen'>
      <h1 className='mt-8 font-bold text-[30px] '>Submit Your Car For Auction</h1>
      <form 
        className='flex flex-col mt-8'
        onSubmit={(e) => addNewAuction(e)}>
        <div className='flex-row border-t border-gray-700 pt-10 pb-6'>
          <label className='text-black-100 text-[18px] mb-1 mr-2 font-semibold'>Year</label>
          <select 
              className='bg-black text-white border-2 border-black-100 rounded-full px-2'
              value={year} 
              onChange={(e) => setYear(parseInt(e.target.value))}>
              <option defaultValue="">Year</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
              <option value="2002">2002</option>
              <option value="2001">2001</option>
              <option value="2000">2000</option>
              <option value="1999">1999</option>
              <option value="1998">1998</option>
              <option value="1997">1997</option>
              <option value="1996">1996</option>
              <option value="1995">1995</option>
              <option value="1994">1994</option>
              <option value="1993">1993</option>
              <option value="1992">1992</option>
              <option value="1991">1991</option>
              <option value="1990">1990</option>
              <option value="1989">1989</option>
              <option value="1988">1988</option>
              <option value="1987">1987</option>
              <option value="1986">1986</option>
              <option value="1985">1985</option>
              <option value="1984">1984</option>
              <option value="1983">1983</option>
              <option value="1982">1982</option>
              <option value="1981">1981</option>
          </select>
          <label className='text-black-100 text-[18px] mb-1 ml-6 mr-2 font-semibold'>Manufacturer</label>
          <select 
              className='bg-black text-white border-2 border-black-100 rounded-full px-2'
              value={make} 
              onChange={(e) => setMake(e.target.value)}>
              <option defaultValue="">Manufacturer</option>
              <option value="Acura">Acura</option>
              <option value="Alfa Romeo">Alfa Romeo</option>
              <option value="Aston Martin">Aston Martin</option>
              <option value="Audi">Audi</option>
              <option value="Bentley">Bentley</option>
              <option value="BMW">BMW</option>
              <option value="Buick">Buick</option>
              <option value="Cadillac">Cadillac</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Chrysler">Chrysler</option>
              <option value="Citroen">Citroen</option>
              <option value="Dodge">Dodge</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Fiat">Fiat</option>
              <option value="Ford">Ford</option>
              <option value="GMC">GMC</option>
              <option value="Honda">Honda</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Infiniti">Infiniti</option>
              <option value="Jaguar">Jaguar</option>
              <option value="Jeep">Jeep</option>
              <option value="Kia">Kia</option>
              <option value="Lamborghini">Lamborghini</option>
              <option value="Land Rover">Land Rover</option>
              <option value="Lexus">Lexus</option>
              <option value="Lincoln">Lincoln</option>
              <option value="Maserati">Maserati</option>
              <option value="Mazda">Mazda</option>
              <option value="McLaren">McLaren</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="MINI">MINI</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Nissan">Nissan</option>
              <option value="Porsche">Porsche</option>
              <option value="Ram">Ram</option>
              <option value="Rivian">Rivian</option>
              <option value="Rolls-Royce">Rolls-Royce</option>
              <option value="Subaru">Subaru</option>
              <option value="Tesla">Tesla</option>
              <option value="Toyota">Toyota</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Volvo">Volvo</option>
          </select>
          <label className='text-black-100 text-[18px] mb-1 ml-6 mr-2 font-semibold'>Model</label>
          <input type="text" required 
              className='border-black border-2 rounded-full px-2'
              value={model}
              placeholder='MX-5 Miata Club...' 
              onChange={(e) => setModel(e.target.value)}/>
        </div>
        <div className='flex-row py-6'>
          <label className='text-black-100 text-[18px] mb-1 mr-2 font-semibold'>Body Style</label>
            <select
              className='bg-black text-white border-2 border-black-100 rounded-full px-2'
              value={bodyStyle}
              onChange={(e) => setBodyStyle(e.target.value)}>
              <option defaultValue="">Body Style</option>
              <option value="Coupe">Coupe</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Convertible">Convertible</option>
              <option value="Sedan">Sedan</option>
              <option value="Station Wagon">Station Wagon</option>
              <option value="SUV">SUV</option>
            </select>
          <label className='text-black-100 text-[18px] mb-1 ml-6 mr-2 font-semibold'>Drivetrain</label>
          <select
            className='bg-black text-white border-2 border-black-100 rounded-full px-2'
            value={drive}
            onChange={(e) => setDrive(e.target.value)}>
            <option defaultValue="">Drivetrain</option>
            <option value="FWD">Front-wheel drive</option>
            <option value="RWD">Rear-wheel drive</option>
            <option value="AWD">All-wheel drive</option>
          </select>         
          <label className='text-black-100 text-[18px] mb-1 ml-6 mr-2 font-semibold'>Mileage</label>
          <input type="text" required 
            className='border-black border-2 w-24 rounded-full px-2'
            value={mileage}
            placeholder="128000..."
            onChange={(e) => setMileage(parseInt(e.target.value))}/>
        </div>
        <div className='flex-row py-6'>
          <label className='text-black-100 text-[18px] mb-1 mr-2 font-semibold'>Engine</label>
          <input type="text" required 
              className='border-black border-2 rounded-full px-2'
              value={engine}
              placeholder='2.0L Turbo I4...' 
              onChange={(e) => setEngine(e.target.value)}/>
          <label className='text-black-100 text-[18px] mb-1 ml-6 mr-2 font-semibold'>Transmission</label>
          <select
            className='bg-black text-white border-2 border-black-100 rounded-full px-2'
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}>
            <option defaultValue="">Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
            <option value="Sequential">Sequential</option>
          </select>
          <label className='text-black-100 text-[18px] mb-1 ml-6 mr-2 font-semibold'>Fuel</label>
          <select
            className='bg-black text-white border-2 border-black-100 rounded-full px-2'
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}>
            <option selected value="">Fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electricity">Electricity</option>
          </select>
        </div>

        <label className='text-black-100 text-[18px] mb-1 mt-4 font-semibold'>VIN</label>
        <input type="text" required 
            className='border-black-100 border-2 rounded-full px-2'
            value={vin}
            placeholder="JM1NA3539R0516412..."
            onChange={(e) => setVin(e.target.value)}/>
        <label className='text-black-100 text-[18px] mb-1 mt-4 font-semibold'>Location</label>
        <input type="text" required 
            className='border-black-100 border-2 rounded-full px-2'
            value={location}
            placeholder="Texas, USA..."
            onChange={(e) => setLocation(e.target.value)}/>
        <label className='text-black-100 text-[18px] mb-1 mt-4 font-semibold'>Description</label>
          <textarea 
            className='border-black-100 border-2 h-60 rounded-lg px-2'
            value={description}
            placeholder="Describe your vehicle..."
            onChange={(e) => setDescription(e.target.value)}>           
          </textarea>       
        <label className='text-black-100 text-[18px] mb-1 mt-4 font-semibold'>Starting bid</label>
        <input type="number" required 
            className='border-black-100 border-2 rounded-full px-2'
            value={bid}
            placeholder="5000..."
            onChange={(e) => setBid(parseInt(e.target.value))}/>
            
        <label className='text-black-100 text-[18px] mb-1 mt-2 font-semibold'>Auction type</label>
        <select
          className='bg-black text-white border-2 border-black-100 rounded-full px-2'
          value={auctionTime}
          onChange={(e) => setAuctionTime(parseInt(e.target.value))}>
          <option defaultValue='604800000'>Standard 7 day auction</option>
          <option value="1209600000">Long 14 day auction</option>
          <option value="86400000">Short 24 hour auction</option>
          <option value="3600000">Rapid 1 hour auction</option>
        </select>         
        <div className="flex justify-center">
          <button 
            type="submit" 
            className=" bg-black text-white rounded-full w-fit px-4 py-2 mt-6">
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create
