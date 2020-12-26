import './ImageLinkForm.css'

function ImageLinkForm({onInputChange, onButtonSubmit}) {
  return (
    <div className="patterns br3 pa4 shadow-3 dib">
      <div className='shadow-4'>
        <input type="text" id="urlInput" className="f4 pa2 w-70" placeholder="Image url..." onChange={onInputChange}/>
        <button className="f4 w-30 ph3 pv2 grow link bg-light-purple white dib" 
          onClick={(event) => {
              onButtonSubmit(); 
          }}  
        >Detect</button>
      </div>
    </div>
  )
}

export default ImageLinkForm;