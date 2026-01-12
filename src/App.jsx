import { useState } from 'react'
import { Oval } from 'react-loader-spinner'

function App() {
  const [City, setCity] = useState("")
  const [loading, setloading] = useState(false)
  const [Weather, setWeather] = useState("")
  const [Input, setInput] = useState("")
  const [Citysearch, setCitysearch] = useState("No city searched")
  const dateFunction=()=>{

    const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    const WeekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const currentDate=new Date;
    const date=`${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`
    return date
  }

  const search=async (event)=>{
    if(event.key=="Enter"){
      setInput("")
       setloading(true)
      fetchWeather()
    }
  }

  const fetchWeather=async () => {
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=de402e2868ffc06bdb21c45ce6bd2ed7&units=metric`)
    const data=await response.json()
   
    setWeather(data)
    setloading(false)
    if(data.cod=="404"){
      alert("City not found")
    }

  }

  return (
    <>
    <div className="container ">
      <h1 className='weather-heading'>Weather App</h1>
   

    <input type="text" placeholder='Enter City name' value={Input} onKeyUp={search} onChange={(e)=>{setCity(e.target.value)
      ,setInput(e.target.value),setCitysearch("") 
    }} />
 
   {!Weather && !Weather?.main &&(

    <h2>{Citysearch}</h2>
   )

   }

    {loading &&
    (<>
     
     <div className="loader">
    <Oval  width={100} height={100} color="black" secondaryColor='#12f212' visible={true}/>

     </div></>
    
  ) }



    { !loading && Weather && Weather?.main &&(
      <div className="Weather-info">
        <h2 className='weather-city'>{Weather.name}, {Weather.sys?.country}</h2>
        <div className="date">
         <span>{dateFunction()}</span>
        </div>
      <p className='temp'>
        {Weather.weather?.[0]?.icon && (

        <img src={`https://openweathermap.org/img/wn/${Weather.weather[0].icon}@2x.png`} alt={Weather.weather[0].description} />
      )}
      {Math.round(Weather.main.temp)}
          <sup className='degree' >°C</sup>
        </p>
        <p className='description'>{Weather.weather[0].description.toUpperCase()}</p>
        <p className='wind-speed'>Wind Speed:{Weather.wind.speed}m/s</p>
      
      </div>
      
    )}
     </div>
    
    </>
  )
}

export default App
