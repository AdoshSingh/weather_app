import React, { useState } from 'react';
import CurrentInfo from './currData'; // component1
import ExtendedInfoOne from './extDataOne'; // component2
import ExtendedInfoTwo from './extDataTwo'; // component3
import icons from "./customIcons/exo"; // using local images

const myApi = {
    key: '0f677dc66abc73d283d9af0e545c739c',
    fiveDayForcast: 'https://api.openweathermap.org/data/2.5/forecast?'
}

export default function MainInfo({ weatherData, updateParentState }) {

    const [city, setCity] = useState(""); // storing input city or zipcode
    const [cityOrZip, setCityOrZip] = useState(0); // changing buttons (city or zipcode)

    function handleChange(e) {
        setCity(e.target.value); // handling input
    }

    function handleClick() { // handling click on submit buttons
        if (cityOrZip === 0) {
            fetch(`${myApi.fiveDayForcast}q=${city}&appid=${myApi.key}&units=metric`)
                .then(res => {
                    if (res.ok) return res.json();
                    if (res.status === 400) alert('Please enter some city');
                    else alert("Please enter a valid city name");
                })
                .then(data => updateParentState(data))
                .catch(err => console.log(err));
        }
        else {
            fetch(`${myApi.fiveDayForcast}zip=${city}&appid=${myApi.key}&units=metric`)
                .then(res => {
                    if (res.ok) return res.json();
                    if (res.status === 400) alert('Please enter some city');
                    else alert("Please enter a valid zip code");
                })
                .then(data => updateParentState(data))
                .catch(err => console.log(err));
        }
    }

    function handleKeyDown(event) { // handling entering of 'enter' key after input
        if (event.key === 'Enter') {
            if (cityOrZip === 0) {
                fetch(`${myApi.fiveDayForcast}q=${city}&appid=${myApi.key}&units=metric`)
                    .then(res => {
                        if (res.ok) return res.json();
                        if (res.status === 400) alert('Please enter some city');
                        else alert("Please enter a valid city name");
                    })
                    .then(data => updateParentState(data))
                    .catch(err => console.log(err));
            }
            else {
                fetch(`${myApi.fiveDayForcast}zip=${city}&appid=${myApi.key}&units=metric`)
                    .then(res => {
                        if (res.ok) return res.json();
                        if (res.status === 400) alert('Please enter valid zip code');
                        else alert("Please enter a valid city name");
                    })
                    .then(data => updateParentState(data))
                    .catch(err => console.log(err));
            }
        }
    }

    function handleCity() { // changing zip to city
        if (cityOrZip === 1) {
            setCityOrZip(0);
        }
    }

    function handleZip() { // changing city to zip
        if (cityOrZip === 0) {
            setCityOrZip(1);
        }
    }

    if (weatherData === undefined) { // before api call
        return (
            <div className='alltran overflow-auto flex flex-col justify-center items-center bg-boss p-6 rounded-3xl drop-shadow-2xl w-4/5 sm:w-auto'>
                <div className='flex justify-center w-full'>
                    <button className={`inline-block ${cityOrZip === 0 ? 'bg-purple-700 text-fore' : 'bg-fore'} p-1 px-2 rounded-l-full text-sm`} onClick={handleCity}>City Name</button>
                    <button className={`inline-block ${cityOrZip === 1 ? 'bg-purple-700 text-fore' : 'bg-fore'} p-1 px-2 rounded-r-full text-sm`} onClick={handleZip}>Zip Code</button>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center mt-2">
                    <input className="w-44 sm:w-full bg-fore rounded-full text-center m-1 h-10 p-1 outline-none" onChange={handleChange} onKeyDown={handleKeyDown} type="text" placeholder="Search for places..." />
                    <button className="m-1 bg-fore rounded-full p-2" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>
                <img className='h:40 sm:h-96' src={icons.start} alt="" />
            </div>
        );
    }

    return ( // after api call
        <div className="backdrop-filter backdrop-blur-md alltran grid grid-row-3 md:grid-cols-3 bg-fore bg-opacity-25 rounded-3xl drop-shadow-2xl overflow-auto h-4/5 w-4/5 xl:w-sev">
            <div className="md:col-span-1 flex flex-col justify-evenly bg-boss p-6 drop-shadow-xl">
                <div className='flex justify-center w-full'>
                    <button className={`inline-block ${cityOrZip === 0 ? 'bg-purple-700 text-fore' : 'bg-fore'} p-1 px-2 rounded-l-full text-xs lg:text-sm`} onClick={handleCity}>City Name</button>
                    <button className={`inline-block ${cityOrZip === 1 ? 'bg-purple-700 text-fore' : 'bg-fore'} p-1 px-2 rounded-r-full text-xs lg:text-sm`} onClick={handleZip}>Zip Code</button>
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center mt-2">
                    <input className="bg-fore rounded-full text-center m-1 h-10 p-1 outline-none" onChange={handleChange} onKeyDown={handleKeyDown} type="text" placeholder="Search for places..." />
                    <button className="m-1 bg-fore rounded-full p-2" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>
                <CurrentInfo weatherData={weatherData} />
                <h1 className='text-center font-semibold text-2xl lg:text-3xl'>{weatherData.city.name}, {weatherData.city.country}</h1> 
            </div>
                <div className='md:col-span-2 flex flex-col justify-between h-full'>
                    <ExtendedInfoOne weatherData={weatherData} />
                    <ExtendedInfoTwo weatherData={weatherData} />
                </div>
        </div>
    )
}