import {useRef} from 'react'
import PropTypes from 'prop-types';


function TableSearchField ({ onChange }) {

  const textInput = useRef(null);

  function onChangeHandler (e) {
    onChange(e.target.value);
  }

  function clearInput () {
    onChange('')
    textInput.current.value = null;
  }

  return ( 
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Search:</span>
      <input
        type="text"
        className="form-control"
        placeholder="Type text here..."
        aria-describedby="basic-addon1"
        ref={textInput}
        onChange={onChangeHandler}
      />
      <span className="input-group-text cursor-pointer" onClick={clearInput}>Clear</span>
    </div>
  )
}

TableSearchField.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default TableSearchField
