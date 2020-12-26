import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Footer from './components/Footer/Footer';

const particlesOption = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      isLoading: false,
      boxs: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        email: "",
        entries: 0,
        id: '',
        joined: "",
        name: ""
      }
}
class App extends Component{
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      email: data.email,
      entries: data.entries,
      id: data.id,
      joined: data.joined,
      name: data.name
    }});
  }

  
  faceLoacation(data) {
    const boundingBoxs = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return boundingBoxs.map(box => {
      const boundingBox = box.region_info.bounding_box
      return {
        top: height * boundingBox.top_row,
        right: width - (width * boundingBox.right_col),
        bottom: height - (height * boundingBox.bottom_row),
        left: width * boundingBox.left_col
      }
    })
  }
  defineBox = (boxs) => {
    console.log(boxs);
    this.setState({boxs: boxs});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    this.setState({isLoading: true});

    fetch('https://ansmartbrain.herokuapp.com/imageurl', {
      method: "put",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        url: this.state.input
      })
    })
    .then(response => {
      if(response.ok) {
        fetch('https://ansmartbrain.herokuapp.com/image', {
          method: "put",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(entries => entries.json())
        .then(entries => {
          this.setState(Object.assign(this.state.user, {entries}));
          document.getElementById('urlInput').value = '';
        })
        .catch(console.log)
      }
      return response.json()
    })
      .then(response => {
        console.log(response)
        this.defineBox(this.faceLoacation(response));
        this.setState({isLoading: false});
      })
      .catch(err => {
        this.setState({isLoading: false});
      });
  }

  onRouteChange = (route) => {
    if(route === 'home') {
      this.setState({isSignedIn: true})
    } else {
      this.setState(initialState)
      
    }
    this.setState({route: route})
  }

  updateLoadingState = (value) => {
    this.setState({isLoading: value})
  }

  render() {
    let footer;
    let show;
    if(!this.state.isSignedIn) {
      footer = <Footer/>
    } else {
      footer = <div>Developer: Sakibul Islam</div>
    }

    if(this.state.route === 'signin') {
      show = (
        <Signin 
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          updateLoadingState={this.updateLoadingState}
          isLoading={this.state.isLoading}
        />
      )
    } else if(this.state.route === 'register') {
      show = (
        <Register 
          onRouteChange={this.onRouteChange} 
          loadUser={this.loadUser}
          updateLoadingState={this.updateLoadingState}
          isLoading={this.state.isLoading}
        />
      )
    } else {
      show =  (
        <div className="pa2">
          <Rank user={this.state.user}/>    
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition imageUrl={this.state.imageUrl} boxs={this.state.boxs} loader={this.state.isLoading}/>
        </div>
      )
    }
    return (
      <div className="App">
        <Particles params={particlesOption}
        className="particles" />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        <div className="content">
          {show}
          {footer}
        </div>
          
      </div>
    );
  }
}

export default App;
