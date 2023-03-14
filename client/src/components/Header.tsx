import * as React from "react";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/download.png";

const Header = () => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/form");
    console.log("clicked add");
  };
  return (
    <div className="fixed z-10 w-full h-20 bg-white px-10 flex justify-between items-center border border-primary">
      <div className="w-20 h-20 flex items-center">
        <img
          src={logo}
          alt="Chamsmobile logo"
          onClick={() => {
            navigate("/home");
          }}
        />
      </div>
      <h1 className="text-primary text-lg font-bold hidden md:block">
        Superhero to Chamsmobile
      </h1>
      <div className="text-primary text-3xl" onClick={handleAdd}>
        <IoAddOutline />
      </div>
    </div>
  );
};

export default Header;
