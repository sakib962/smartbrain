import { Component } from 'react';
import './FaceRecognition.css';
import MyLoader from '../loading/loading';

class FaceRecognition extends Component{
  render() {
    const {imageUrl, boxs, loader} = this.props;
    let people;
    if(boxs.length) {
      people = <div className="f3 pa2">Total People: {boxs.length}</div>
    } else {
      people = '';
    }
    return(
        <div>  
          {people}
          <div className='dib relative'>
            <MyLoader active={loader}/>
            { 
              boxs.map((box, i) => <div id='boundingBox' key={i} style={box}></div>)
            }
            <img id="inputImage" src={imageUrl} alt=""/>
          </div>
        </div>  
    );
  }
} 

export default FaceRecognition;