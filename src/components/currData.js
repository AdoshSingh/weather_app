import React from 'react';
import icons from './customIcons/exo'; // using local images

function giveTimeDay(timeZone){ // getting current time and day of input city

    var currentDate = new Date();
    var timeZoneOffsetSeconds = timeZone;
    var timeZoneOffsetMilliseconds = timeZoneOffsetSeconds * 1000;

    var currentTime = new Date(currentDate.getTime() + timeZoneOffsetMilliseconds);

    var currentHours = currentTime.getUTCHours();
    var currentMinutes = currentTime.getUTCMinutes();

    var period = currentHours >= 12 ? "PM" : "AM";
    currentHours = currentHours % 12 || 12;

    var formattedHours = currentHours < 10 ? "0" + currentHours : currentHours;
    var formattedMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;

    var currentDay = new Date(currentTime.getTime() - timeZoneOffsetMilliseconds).toLocaleDateString(undefined, { weekday: 'long' });

    var formattedTime = formattedHours + ":" + formattedMinutes + " " + period;

    return [currentDay, formattedTime];

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function CurrentInfo({weatherData}) {

    let cityTimeDay;
    let iconCode;
    let impIcon;
    if(weatherData !== undefined){
        cityTimeDay = giveTimeDay(parseInt(weatherData.city.timezone));
        iconCode = weatherData.list[0].weather[0].icon.split('').reverse().join('');
        
        switch(iconCode){ // using local icons
            case 'd01':
                impIcon = icons.d01;
                break;
            case 'd05':
                impIcon = icons.d05;
                break;
            case 'd10':
                impIcon = icons.d10;
                break;
            case 'd11':
                impIcon = icons.d11;
                break;
            case 'd20':
                impIcon = icons.d20;
                break;
            case 'd30':
                impIcon = icons.d30;
                break;
            case 'd31':
                impIcon = icons.d31;
                break;
            case 'd40':
                impIcon = icons.d40;
                break;
            case 'd90':
                impIcon = icons.d90;
                break;
            case 'n01':
                impIcon = icons.n01;
                break;
            case 'n05':
                impIcon = icons.n05;
                break;
            case 'n10':
                impIcon = icons.n10;
                break;
            case 'n11':
                impIcon = icons.n11;
                break;
            case 'n20':
                impIcon = icons.n20;
                break;
            case 'n30':
                impIcon = icons.n30;
                break;
            case 'n31':
                impIcon = icons.n31;
                break;
            case 'n40':
                impIcon = icons.n40;
                break;
            case 'n90':
                impIcon = icons.n90;
                break;

            default:
                impIcon = null;
        }
    }

    return (
        <div className="alltran flex flex-col justify-center items-center">
            <img className="m-8 w-36 lg:w-40" src={impIcon} alt="IconNotFound" />  
            <h1 className='text-5xl lg:text-6xl'>{Math.floor(weatherData.list[0].main.temp)}&deg;C</h1>
            <div className='flex my-4'>
                <span className="font-bold text-sm lg:text-base">{cityTimeDay[0]},&nbsp;</span><span className='text-sm lg:text-base'> {cityTimeDay[1]}</span>
            </div>
            <div className='flex justify-center items-center my-1'>
                <img className='h-6 mr-2' src={impIcon} alt="" /> 
                <p className='ml-1 text-sm lg:text-base'>{capitalizeFirstLetter(weatherData.list[0].weather[0].description)}</p>
            </div>
        </div>
    )
}

export { giveTimeDay };