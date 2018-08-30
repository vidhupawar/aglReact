import React from 'react';
import '../App.css';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <input className="m-t-15" type={type} name={name} checked={checked} onChange={onChange} />
);

export default Checkbox;