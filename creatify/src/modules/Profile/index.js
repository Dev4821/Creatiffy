import React, { useEffect, useState } from "react";

import {ReactComponent as Avatar} from '../../assets/avatar.svg'

import {stats} from '../Home/data'

import Card from "./Card";
import { useParams } from "react-router-dom";
const Profile = () => {
  const[data,setData]=useState([]);
    const[user,setUser]=useState({});
    const {_id}=useParams();
    useEffect(()=>
    {
        const getPosts= async()=>{
            const response =await fetch(`http://localhost:8000/api/profile?_id=${_id}`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${localStorage.getItem('user:token')}`
                }
            })
            const data=await response.json(); 
            console.log(data);
           
           setData(data.posts);
           setUser(data.users);
        }
        getPosts()
    },[])
    
    const {username='',email=''}=user
  return (
    
    <div className=" flex justify-center items-center ">
      <div className="w-[1500px] h-[800px]  flex flex-col items-center p-10  ">
        <div className="flex flex-col justify-center items-center border-black border-2 rounded-md">
          <div className="mx-6">
            {" "}
            <Avatar width={"120px"} height={"120px"} />
          </div>

          <p className="my-3 ">{username}</p>
          <p className="my-3 ">{email}</p>
          <div className=" flex flex-row justify-around  w-[600px] text-center my-4">
            {stats.map(({ id, name, status }) => {
              return (
                <div key={id}>
                  <h4 className="font-bold text-lg">{status}</h4>
                  <p className="font-light text-lg">{name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className='grid grid-cols-3 justify-evenly '>
            {
                
                data.map(({_id,caption='',description='',image=''})=>{

                    return(
                    
                        <Card url={image} key={_id} caption={caption} description={description}/>
                    )
                })
          }
       
        </div>
      </div>
    </div>
  );
};

export default Profile;
