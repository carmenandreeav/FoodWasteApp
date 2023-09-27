import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { Link } from "react-router-dom";
import "./fridge.css";
import AddAliment from "./AddAliment";

const SERVER = 'http://localhost:3001/api'

export default function MyFridge(){
    const [aliments, setAliments] = useState([]);
    const {id} = useParams();
   
    const addAliment = async (aliment) => {
        await fetch(`${SERVER}/users/${id}/aliment`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aliment)
        })
        getAliments()
    }

    const getAliments = async () => {
        const response = await fetch(`${SERVER}/users/${id}/aliments`)

        const data = await response.json()
        setAliments(data)
    }
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
   useEffect(() => {
      getAliments()
    }, [])

    return (
      <div className="container">
        <div className="py-4">
          <h3 className="mb-3 text-center">My Aliments</h3>
          <table id='alimentTable' class="table border shadow">
            <thead className="thead-primary">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Expiration Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {aliments.map((aliment, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{aliment.nume}</td>
                <td>{aliment.categorie}</td>
                <td>{aliment.dataExpirare}</td>
                <td>
                  <Link class="" onClick={() => deleteAliment(aliment.id)}>
                  <i class="fa fa-trash" aria-hidden="true"></i> 
                  </Link>
                </td>
              </tr>
             ))}
            </tbody>
          </table>
          <Link className="btn btn-outline-success" to={`/${id}/MyFridge/AddAliment`}>Add New Aliment</Link>
        </div>
      </div>
    );
}