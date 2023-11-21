import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { carsCollection } from '../lib/controller'
import { AddAuctionType, CarType } from '../types/CarType'
import CardDetails from './CardDetails'
import Card from './Card'


const Search: React.FC = () => {
  const [cars, setCars] = useState<CarType[]>([])
  const [filteredCars, setFilteredCars] = useState<CarType[]>([])
  const [searchModel, setSearchModel] = useState<string>('')
  const [searchMake, setSearchMake] = useState<string>('')
  const [filterTransmission, setFilterTransmission] = useState<string>('')
  const [filterYear, setFilterYear] = useState<string>('')
  const [sort, setSort] = useState<string>('')

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

  const handleSearch = () => {
    setFilteredCars(cars.filter((car) => {
      return (
        car.make?.toLowerCase().includes(searchMake.toLowerCase()) &&
        car.model?.toLowerCase().includes(searchModel.toLowerCase()) &&
        car.year?.toString().includes(filterYear.toLowerCase()) &&
        car.transmission?.toLowerCase().includes(filterTransmission.toLowerCase())
        )
    }))
  }

  return (
    <div className='w-screen'>
        <h1 className='pl-6 mt-6 text-black text-[30px] font-semibold'>Welcome to Ascari</h1>
        <h2 className='pl-6 mb-6 text-black text-[25px]'>Explore live auctions</h2>
      <div className='flex-between'>
        <div className='flex items-center ml-6'>
          <div>
            <select
              className='bg-black text-white border-2 border-black rounded-l-full px-4 py-2'
              value={searchMake}
              onChange={(e) => setSearchMake(e.target.value)}>
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
          </div>
          <div>
            <input type="text"
              className='bg-white text-black border-2 border-black rounded-r-full px-4 py-2'
              placeholder='MX-5...'
              value={searchModel}
              onChange={(e) => setSearchModel(e.target.value)} />
          </div>
          <div className='ml-4'>
            <select
              className='bg-black text-white border-2 border-black rounded-full px-4 py-2'
              value={filterTransmission}
              onChange={(e) => setFilterTransmission(e.target.value)}>
              <option defaultValue="">Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="Sequential">Sequential</option>
            </select>
          </div>
          <div className='ml-4'>
            <select
              className='bg-black text-white border-2 border-black rounded-full px-4 py-2'
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}>
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
          </div> 
          <button 
              className='ml-4'
              onClick={handleSearch}>Search</button>
        </div>
        <div className='mr-16'>
            <select
              className='bg-white rounded-full border-2 border-black px-4 py-2'
              defaultValue={''}       
              onChange={(e) => setSort(e.target.value)}>
              <option value="">Sort By</option>
              <option value="endingSoon">Ending soon</option>
              <option value="newest">Newest</option>
              <option value="year">Year</option>
              <option value="mileage">Mileage</option>
            </select>
          </div>
      </div>

      <div className='px-6 home__cars-wrapper'>
        {filteredCars.length ? 
          (filteredCars?.sort((a,b)=>{
            if(sort === 'endingSoon') {
              return a.timeRemaining - b.timeRemaining
            } else if (sort === 'newest'){
              return b.timeRemaining - a.timeRemaining
            } else if (sort === 'year'){
              return b.year - a.year
            } else if (sort === 'mileage'){
              return a.mileage - b.mileage
            } else return 0
          }).map((car) => (
            <div key={car.id} >
              <CardDetails key={car} car={car}/>
            </div>
          ))): (
            <div className='w-screen pr-10'>
              <Card/>
            </div>
        )}
      </div>
    </div>
  )
}

export default Search 