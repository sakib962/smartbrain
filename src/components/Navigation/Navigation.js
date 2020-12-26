import Logo from '../Logo/Logo'

function Navigation({onRouteChange, isSignedIn}) {
  if(isSignedIn) {
    return (
      <nav>
        <Logo/>
        <button 
          className="pa3 link dim f3 underline black pointer bg-transparent"
          onClick={() => onRouteChange('signin')}  
        >Sign Out</button>
      </nav>
    );
  } else {
    return (
      <nav>
        <Logo/>
        <div>
          <button 
            className="pa3 link dim f3 underline black pointer bg-transparent"
            onClick={() => onRouteChange('signin')}  
          >Sign in</button>
          <button 
            className="pa3 link dim f3 underline black pointer bg-transparent"
            onClick={() => onRouteChange('register')}  
          >Register</button>
        </div>
      </nav>
    )
  }
}

export default Navigation;