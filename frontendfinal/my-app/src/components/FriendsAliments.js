import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { Link } from "react-router-dom";
import "./fridge.css";

const SERVER = 'http://localhost:3001/api'

export default function FriendsAliments(){
    const [aliments, setAliments] = useState([]);
    const {friendId} = useParams();
    const {id}=useParams();
    
    const [selectedRow,setSelectedRow]=useState(null);
    const handleRowClick = (index) =>{
      setSelectedRow(index);
    }

    const getAliments = async () => {
        const response = await fetch(`${SERVER}/users/${friendId}/aliments`)

        const data = await response.json()
        setAliments(data)
    }
    
    useEffect(() => {
        getAliments()
      }, [])

      const deleteAliment = (aliment) =>
      {
        axios.delete('http://localhost:3001/api/deleteAliment/'+aliment)
        .then((result)=>{
          getAliments();
        })
        .catch(()=>{
          alert('Error in the Code');
        });
      };
      const onSubmit = async e => {
        e.preventDefault();
        await axios.post(`${SERVER}/users/${id}/aliment`, e);
        await axios.get(`${SERVER}/users/${id}/aliments`)
        alert('Aliment added to your fridge!');
        // history.push("/");
      };
     
    return (
      <div className="container">
        <div className="py-4">
          <h3 class="mb-3 text-center">My Friends's Aliments</h3>
          <table id='alimentTable' class="table border shadow">
            <thead class="thead-primary">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Expiration Date</th>
                <th>Claim</th>
              </tr>
            </thead>
            <tbody>
              {aliments.map((aliment, index) => (
                <tr key={index} scope="row" style={{backgroundColor : selectedRow ===index ? 'salmon' : '',
                color : selectedRow===index ? 'white' : ''}}>
                  <th >{index + 1}</th>
                  <td>{aliment.nume}</td>
                  <td>{aliment.categorie}</td>
                  <td>{aliment.dataExpirare}</td>
                  <td>
                  <Link class="" onClick={()=> handleRowClick(index)}> 
                  <i class="fa fa-plus" aria-hidden="true"></i> 
                  </Link>
                </td>
                </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}