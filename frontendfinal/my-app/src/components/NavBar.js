import './navbar.css';
import { Link, useMatch,useResolvedPath} from 'react-router-dom';
import { useImperativeHandle, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function NavBar(){
    const {id}=useParams();
    const [userId]=useState(null);
    return <nav className="nav">
    <Link to="/1" className="site-title">Food Waste App</Link>
    <ul>
    <CustomLink to={`/1/Friends`}>Friends</CustomLink>
    <CustomLink to={`/1/MyFridge`}>My fridge</CustomLink>
    </ul>
    </nav>
}

function CustomLink({to,children,...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive=useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to}{...props}>{children}</Link>
        </li>
    )
}
