import { useState } from "react";
import api from "./api";
import './styles.css'

export default function User() {
    
    const [users, setUsers] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [gender, setGender] = useState("?")
    

    async function getUsers(e) {
        e.preventDefault();

        try{
            setUsers((await api.get(`${gender}results=${quantity}`)).data.results)
            
            
            
        }catch {
            alert("Ocorreu um problema.")
        }
    }

    function getUserQuantity(e) {
        setQuantity(e.target.value)
    }

    function getGender(e){
        const opt = e.target.value

        console.log(opt === "male")

        if(opt != "both") {
            if(opt === "male") {
                setGender(`?gender=male&`)
            }else {
                setGender(`?gender=female&`)
            }
        }
    }

    return (
        <div className="random-user-container">
            <form onSubmit={getUsers} className="buttons">
                <h3 className="qtd">Quantity</h3>
                <select onChange={getUserQuantity} name="user-quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <h3 className="gender">Gender</h3>
                <select onChange={getGender} name="user-gender">
                    <option value="both">Both</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <button type="submit">Submit</button>

            </form>

           {
                users && 
                            <div className="users">
                                <div className="users-scroll">
                                {
                                        users.map(user => (
                                            <div key={user.cell} className="user-div">
                                                <img src={user.picture.large} alt="" />
                                                <h3>Name</h3>
                                                <p>{user.name.title} {user.name.first} {user.name.last}</p>
                                                <h3>Country</h3>
                                                <p>{user.location.country}</p>
                                                <h3>City</h3>
                                                <p>{user.location.city}</p>
                                                <h3>Age</h3>
                                                <p>{user.dob.age}</p>
                                            </div>
                                        ))
                                }
                                </div>
                            </div>
            }
        </div>
    );
}