import React, {Component} from 'react';
import Myloader from '../loading/loading';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signinEmail: "",
      signinPassword: ""
    }
  }

  onEmailChange = (event) => {
    this.setState({signinEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({signinPassword: event.target.value})
  }
  onSubmit = () => {
    this.props.updateLoadingState(true);
    fetch('https://ansmartbrain.herokuapp.com/signin', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signinEmail,
        password: this.state.signinPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.id) {
        this.props.loadUser(data)
        this.props.onRouteChange('home');
        this.props.updateLoadingState(false);
      } else {
        alert(data)
        this.props.updateLoadingState(false);
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
      <div className="signin black-80">
        
        <div className="shadow-4 pa4 br3 measure center relative">
          <Myloader active={this.props.isLoading}/>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Sign in"
              onClick={this.onSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
 
}

export default Signin;