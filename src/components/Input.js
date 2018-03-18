import React from "react";
import PropTypes from 'prop-types';


const Input = ({ handleInput, valueInput }) => (

  <div className="relative p-bottom-md">
    <label className="hidden" htmlFor="inputByNameEmail">Busca por email o teléfono</label>
    <input className="main-input" onChange={ handleInput } type="text" value={ valueInput } placeholder="Search ..." id="inputByNameEmail"/>
    <img src="icons/search.svg" alt="Search" className="icon-search"/>
  </div>
);

Input.propTypes = {
  handleInput: PropTypes.func,
  valueInput: PropTypes.string
};

export default Input;
