
function Rank(props) {
  const {name, entries} = props.user;
  return (
    <div>
      <div className="white f3">
        {`${name} your current entries is`}
      </div>
      <div className="f1 white">
        {`${entries}`}
      </div>
    </div>
  )
}

export default Rank;