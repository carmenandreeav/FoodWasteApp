import React, { useState } from "react";
import axios from 'axios';
import "./fridge.css";
import { useParams } from "react-router-dom";
 
const SERVER = 'http://localhost:3001/api'

function AddAliment (props) {
  const {onAdd} = props
  const {id}=useParams();

  const [aliment, setAliment] = useState({
    nume: "",
    categorie: "LACTAT",
    dataExpirare: ""
  });
 
  const { nume, categorie,dataExpirare} = aliment;
   
  const onInputChange = e => {
    setAliment({ ...aliment, [e.target.name]: e.target.value });
  };
   
  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(`${SERVER}/users/${id}/aliment`,aliment);
    alert('Data Inserted');
    // history.push("/");
  };
  const options=[{
    label: 'LACTAT',
    value: 'LACTAT'
}, {
    label: 'FRUCT',
    value: 'FRUCT'
}, {
    label: 'LEGUMA',
    value: 'LEGUMA'
},
{
    label: 'CARNE',
    value: 'CARNE'
}]


   
  return (
    <div className="container bg-light">
      <div className="row">  
       <div className="col-sm-4 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add New Aliment</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Aliment Name"
              name="nume"
              value={nume}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Expiration Date"
              name="dataExpirare"
              value={dataExpirare}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <select 
          id="selector"
          type="text"
          className="form-control file-selector-button"
           placeholder="Select Aliment Category"
           name="categorie"
            value={categorie}
            onChange={e => onInputChange(e)}>
            {
                        options.map((o) => <option key={o.value} value={o.value}> {o.label} </option>)
                    }
                </select>
          </div>          
          <button id="butonAdd" className="btn btn-primary btn-block" >Add Aliment</button>
        </form>
      </div>
    </div>
  </div>  
  );
};
 
export default AddAliment;