import React from "react";


const Input = ({ handleInput, valueInput }) => (

    <div className="relative p-bottom-md">
      <label className="hidden" htmlFor="inputByNameEmail">Busca por email o teléfono</label>
      <input className="main-input" onChange={ handleInput } type="text" value={ valueInput } placeholder="Search ..." id="inputByNameEmail"/>
      <img src="icons/search.svg" alt="Search" className="icon-search"/>
    </div>
  );

export default Input;
