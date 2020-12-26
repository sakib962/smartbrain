import "./loading.css"
export default function MyLoader({ active }) {
  if(active) {
    return (
      <div className="loader">
        <div className="container">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>  
    )
  } else {
    return '';
  }
}