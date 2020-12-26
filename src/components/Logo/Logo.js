import Tilt from 'react-tilt';
import React from 'react';
import Brain from './brain.png';

function Logo() {
  return (
    <div className="pt3 tl">
        <Tilt className="Tilt shadow-3 ml3 dib" options={{ max : 25 }}>
          <div className="Tilt-inner">
            <img className="" src={Brain} alt="Brain"/>
          </div>
        </Tilt>  
    </div>
  )
}

export default Logo;