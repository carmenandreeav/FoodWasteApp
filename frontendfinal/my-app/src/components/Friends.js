import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Friends.css";

const SERVER="http://localhost:3001/api";

export default function Friends() {
    const [users, setUsers] = useState([]);
    const {id}=useParams();
    const postUser = async (user) => {
        await fetch(`${SERVER}/postUser`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        getUsers()
    }

    const getUsers = async () => {
        const response = await fetch(`${SERVER}/getUsers`)

        const data = await response.json()
        setUsers(data)
    }
    useEffect(() => {
        getUsers()
      }, [])
      const userId=parseInt(id);
      const filteredUsers=users.filter(user => user.id!==userId);
     
    return (
<section className="friends-list">
                <div className='container'>
                    <div className='row'>
                        {
                            users.length>0 && filteredUsers.map(user =>{
                                return(
                                <div className='col-md-6' key={user.id}>
                        <div className='card my-2'>
                            <div className='card-body'>
                                <div className='row align-items-center d-flex justify-content-around'>
                                <div className='col-md-4'>
                                    <img src={`https://api.dicebear.com/5.x/adventurer/svg?seed=Oliver${user.id}.jpg`} alt="" className='img-fluid contact-img'></img>
                                </div>
                                <div className='col-md-7'>
                                    <ul className='list-group'>
                                        <li className='list-group-item list-group-item-action'>
                                        Email: <span className="fw-bold">{user.email}</span>
                                    </li>
                                    </ul>
                                </div>
                                <div className='col-md-1 d-flex flex-column align-items-center'>
                                    <Link className="btn btn-primary" to={`/${id}/Friends/FriendsAliments/${user.id}`}>
                                        <i className='fa fa-eye'/>
                                    </Link>
                                </div>
                                </div>
                            </div>
                        </div>
                     </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </section>
    );
}