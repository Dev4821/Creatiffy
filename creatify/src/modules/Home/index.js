import React, { useEffect, useState } from "react";
import { ReactComponent as Avatar } from "../../assets/avatar.svg";
import Input from "../../myComponent/Input";
import Button from "../../myComponent/Button";
import Post from "./post";

import { stats, navigations } from "./data";
import { useNavigate, Link } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:8000/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user:token")}`,
        },
      });
      const data = await response.json();

      setData(data.posts);
      setUser(data.user);
    };
    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user:token");
    navigate('/account/signin');
  }

  const { username = "", email = "" } = user;
  return (
    <div className="h-screen bg-[#7f989f] flex overflow-hidden">
      <div className="w-[20%] bg-white flex flex-col">
        <div className="h-[30%] flex justify-center items-center border-b">
          <div className="flex flex-col justify-center items-center">
            <div className="mx-6">
              {" "}
              <Avatar width={"100px"} height={"100px"} />
            </div>

            <p className="my-3 ">{username}</p>
            <p className="my-3 text-sm font-light">{email}</p>
            <div className=" flex flex-row justify-around  w-[300px] text-center">
              {stats.map(({ id, name, status }) => {
                return (
                  <div key={id}>
                    <h4 className="font-bold">{status}</h4>
                    <p className="font-light text-sm">{name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-[60%]  flex flex-col justify-evenly pl-14 border-b">
          {navigations.map(({ id, name, url }) => {
            return (
              <Link
                to={url}
                key={id}
                className="flex cursor-pointer hover:text-[#F00F51]"
              >
                {name}
              </Link>
            );
          })}
        </div>
        <div className="h-[10%] border-b"
          onClick={() => handleLogout()}
        >
          <div className="ml-14 my-3 cursor-pointer pt-4">
            <p>Log Out</p>
          </div>
        </div>
      </div>

      <div className="w-[60%] overflow-scroll n-full scrollbar-hide">
        <div className="h-[75px] bg-white border-l flex justify-evenly items-center pt-2 sticky top-0 shadow-sm">
          <div className="flex justify-center items-center">
            <Input placeholder="Enter your search" />
            <Button
              label="search"
              className=" wl-4 bg-[#F00F51] hover:bg-[#d20d48] mb-4"
            />
          </div>
          <Button
            label="Create New Post"
            className="bg-[#F00F51] hover:bg-[#d20d48] mb-4"
            onClick={() => navigate("/new-post")}
          />
          {}
        </div>
        {data.map(
          ({ _id, caption = "", description = "", image = "", user = {} }) => {
            return (
              <Post
                url={image}
                key={_id}
                caption={caption}
                description={description}
                user={user}
              />
            );
          }
        )}
      </div>
      <div className="w-[20%] bg-slate-500"></div>
    </div>
  );
};

export default Home;
