import React from 'react';
import { giveTimeDay } from './currData'; // importing function from previous component
import icons from './customIcons/exo'; // importing local icons

function getIcon(str) {
    switch (str) {
        case '10d':
            return icons.d01;
        case '50d':
            return icons.d05;
        case '01d':
            return icons.d10;
        case '11d':
            return icons.d11;
        case '02d':
            return icons.d20;
        case '03d':
            return icons.d30;
        case '13d':
            return icons.d31;
        case '04d':
            return icons.d40;
        case '09d':
            return icons.d90;
        case '50n':
            return icons.n05;
        case '01n':
            return icons.n10;
        case '11n':
            return icons.n11;
        case '02n':
            return icons.n20;
        case '03n':
            return icons.n30;
        case '13n':
            return icons.n31;
        case '04n':
            return icons.n40;
        case '09n':
            return icons.n90;
        default:
            return icons.d20;
    }
    ;
}

export default function ExtendedInfoOne({ weatherData }) {

    let nextFiveDayData = [];
    let allHourData = weatherData.list;
    let currDate = allHourData[0].dt_txt.substring(0, 10);
    const currentDay = giveTimeDay(weatherData.city.timezone)[0];
    let daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let toPrintDays = [];

    for (let i = 0; i < 40; i++) {
        if (allHourData[i].dt_txt.substring(0, 10) !== currDate) {
            nextFiveDayData.push(allHourData[i]);
            currDate = allHourData[i].dt_txt.substring(0, 10);
        }
    }

    let flag = false;
    for (let i = 0; i < daysOfTheWeek.length; i++) { // getting info about next 5 days
        if (daysOfTheWeek[i] === currentDay) {
            for (let j = 0; j < 5; j++) {
                toPrintDays.push(daysOfTheWeek[(i + 1) % 7]);
                i++;
            }
            flag = true;
            break;
        }
        if (flag) break;
    }

    return (
        <div className='alltran mx-2 pl-2 pr-2'>
            <div className="font-semibold text-xl my-2">Next Five Days Forecast</div>
            <ul className='grid md:grid-cols-5 gap-2'>
                {nextFiveDayData.map((item, index) => {
                    return (
                        <li key={index} className="grid grid-rows-4 gap-1 justify-items-center items-center overflow-auto bg-boss rounded-md drop-shadow-md">
                            <h1 className="font-semibold truncate text-xs lg:text-base">{toPrintDays[index]}</h1>
                            <img className="h-10" src={getIcon(item.weather[0].icon)} alt="" />
                            <span className="text-lg lg:text-xl font-bold">{Math.floor(item.main.temp)}&deg;</span>
                            <span className="font-light lg:font-medium text-xs truncate">{item.weather[0].description}</span>
                        </li>
                    );
                })}
            </ul>
        </div>

    )
}