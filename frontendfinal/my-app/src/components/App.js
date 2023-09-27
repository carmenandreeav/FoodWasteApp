import Friends from "./Friends";
import MyFridge from "./MyFridge";
import NavBar from "./NavBar";
import Home from "./Home";
import {Route, Routes} from "react-router-dom";
import AddAliment from "./AddAliment";
import LoginPage from "./LoginPage";
import FriendsAliments from "./FriendsAliments";



function App(props){
    return (
       <>
       <NavBar/>
       <div className="container"> 
       <Routes>
       <Route path="/" element={<Home />}/>
        <Route path="/:id" element={<Home />}/>
        <Route path="/:id/Friends" element={<Friends />}/> 
        <Route path="/:id/MyFridge/" element={<MyFridge />}/> 
        <Route path="/:id/MyFridge/AddAliment" element={<AddAliment/>}/>
        <Route path="/LoginPage" element={<LoginPage/>}/>
        <Route path="/:id/Friends/FriendsAliments/:friendId" element={<FriendsAliments />}/> 
        </Routes>
       </div>
       </>
    )
}

export default App;