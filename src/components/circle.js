import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CustomCircle = ({ percent, strokeWidth, strokeColor }) => {
  return (
    <div className='w-12 h-12 lg:w-16 lg:h-16'>
      <CircularProgressbar
        value={percent}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          pathColor: strokeColor,
          trailColor: 'transparent',
        })}
      />
      <div className="custom-circle-text text-xs lg:text-base">
        {percent}%
      </div>
    </div>
  );
};

export default CustomCircle;