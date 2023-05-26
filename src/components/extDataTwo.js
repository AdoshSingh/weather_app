import React from 'react';
import CustomCircle from './circle'; // using react cirlcular progress bar lib
import icons from './customIcons/exo';

function getSunSetRise(timezoneOffsetSeconds, sunriseTimestamp, sunsetTimestamp) { // getting sunset and sunrise time
    
    const adjustedSunriseTimestamp = sunriseTimestamp + timezoneOffsetSeconds;
    const adjustedSunsetTimestamp = sunsetTimestamp + timezoneOffsetSeconds;

    const sunriseDate = new Date(adjustedSunriseTimestamp * 1000);
    const sunsetDate = new Date(adjustedSunsetTimestamp * 1000);

    const formattedSunrise = sunriseDate.toLocaleTimeString([], { timeStyle: 'short', timeZone: 'UTC' });
    const formattedSunset = sunsetDate.toLocaleTimeString([], { timeStyle: 'short', timeZone: 'UTC' });

    return [formattedSunrise, formattedSunset]

}

export default function ExtendedInfoTwo({ weatherData }) {

    let highlights = [weatherData.list[0], weatherData.city]; // relevent info from prop
    let directionToDisplay; // storing wind direction
    let windSpeedToDisplay = (highlights[0].wind.speed * 3.6).toFixed(2); // storing wind speed and converting it to kmph
    let currDirection = highlights[0].wind.deg; // wind degree

    // direction coressponding to wind degree
    if (currDirection === 0) directionToDisplay = 'N';
    else if (currDirection > 0 && currDirection < 90) directionToDisplay = 'NE';
    else if (currDirection === 90) directionToDisplay = 'E';
    else if (currDirection > 90 && currDirection < 180) directionToDisplay = 'SE';
    else if (currDirection === 180) directionToDisplay = 'S';
    else if (currDirection > 180 && currDirection < 270) directionToDisplay = 'SW';
    else if (currDirection === 270) directionToDisplay = 'W';
    else directionToDisplay = 'NW';

    let sunSetRiseDisplay = getSunSetRise(highlights[1].timezone, highlights[1].sunrise, highlights[1].sunset); // getting sunset and sunrise time

    let visibilityToDisplay = (highlights[0].visibility / 1000).toFixed(2); // storing visibility and converting it to km

    return (
        <div className='alltran mx-2 mb-4'>
            <div className="font-semibold text-xl m-2">Today's Highlights</div>
            <div className='mx-2 grid md:grid-rows-2 md:grid-cols-3 gap-2'>

                {/* Cloud info */}
                <div className='highs'>
                    <h1 className='highs-title'>Clouds</h1>
                    <div className='insideCardDes'>
                        <img className="h-8 lg:h-12 xl:h-14" src={icons.cloudy} alt="" />
                        <div className='flex flex-col items-center relative'>
                            <CustomCircle percent={highlights[0].clouds.all} strokeWidth={5} strokeColor="black" />
                        </div>
                    </div>
                </div>

                {/* Wind info */}
                <div className='highs'>
                    <h1 className='highs-title'>Wind Status</h1>
                    <div className='insideCardDes'>
                        <img className='h-9 lg:h-12 xl:h-14' src={icons.wind} alt="" />
                        <div>
                            <div className='font-semibold text-base lg:text-lg xl:text-xl'>{windSpeedToDisplay} km/h</div>
                            <div className='flex justify-center items-center'>
                                <img className='h-3 lg:h-4 mr-1' src={icons.compass} alt="" />
                                <span className='ml-1 text-xs lg:text-sm'>{directionToDisplay}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sunset & Sunrise */}
                <div className='highs'>
                    <h1 className='highs-title'>Sunset & Sunrise</h1>
                    <div className='flex flex-col justify-center items-center h-full'>
                        <div className='flex justify-evenly items-center w-full mb-1'>
                            <img className='h-7 lg:h-8 xl:h-10' src={icons.sunrise} alt="" />
                            <span className='font-semibold text-sm lg:text-lg xl:text-xl'>{sunSetRiseDisplay[0]}</span>
                        </div>
                        <div className='flex justify-evenly items-center w-full mt-1'>
                            <img className='h-7 lg:h-8 xl:h-10' src={icons.sunset} alt="" />
                            <span className='font-semibold text-sm lg:text-lg xl:text-xl'>{sunSetRiseDisplay[1]}</span>
                        </div>
                    </div>
                </div>

                {/* Humidity */}
                <div className='highs'>
                    <h1 className='highs-title'>Humidity</h1>
                    <div className='insideCardDes'>
                        <img className="h-8 lg:h-12 xl:h-14" src={icons.humidity} alt="" />
                        <div className='flex flex-col items-center relative'>
                            <CustomCircle percent={highlights[0].main.humidity} strokeWidth={5} strokeColor="black" />
                        </div>
                    </div>
                </div>

                {/* Visibility */}
                <div className='highs'>
                    <h1 className='highs-title'>Visibility</h1>
                    <div className='insideCardDes'>
                        <img className='h-9 lg:h-12 xl:h-14' src={icons.visibility} alt="" />
                        <div className='font-semibold text-base lg:text-lg xl:text-xl'>{visibilityToDisplay} km</div>
                    </div>
                </div>

                {/* Pressure */}
                <div className='highs'>
                    <h1 className='highs-title'>Pressure</h1>
                    <div className='insideCardDes'>
                        <img className='h-9 lg:h-12 xl:h-14' src={icons.pressure} alt="" />
                        <div className='font-semibold text-base lg:text-lg xl:text-xl'>{highlights[0].main.pressure} hPa</div>
                    </div>
                </div>

            </div>
        </div>
    )
}
