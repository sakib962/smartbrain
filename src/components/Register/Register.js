import React from 'react';
import Myloader from '../loading/loading';

class Register extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      name: "",
      email: "",
      password: "",
    }
  }
  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
  onSubmit = () => {
    this.props.updateLoadingState(true);
    fetch('https://ansmartbrain.herokuapp.com/register', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data.id) {
        this.props.loadUser(data);
        this.props.onRouteChange('home');
        this.props.updateLoadingState(false);
      } else {
        alert(data)
        setTimeout(() => {
          this.props.updateLoadingState(false);
        }, 100);
        
      }
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => {
        this.props.updateLoadingState(false);
      }, 100);
    })
    
  }

  render() {
    return (
      <div className="signin black-80 relative">
        <Myloader active={this.props.isLoading} />
        <div className="shadow-4 pa4 br3 measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="name"
                onChange={this.onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"
                onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Register"
              onClick={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default Register;