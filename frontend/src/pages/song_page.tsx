import React, {useState} from "react";
import DefaultButton from "../components/default_button";
import { useNavigate } from "react-router-dom";

const SongPage: React.FC = () => {
  const handleClick = () => {};
  const navigate = useNavigate();

  return (
    <div>
        <div className={`
      flex items-center justify-center w-12 h-12 
      bg-white text-white rounded-full 
      transition-all duration-300 ease-in-out 
      outline-none hover:bg-primary-70 
      active:bg-primary-80 
      focus:ring-4 focus:ring-primary-20 
      cursor-pointer
    `}>
            testing testing
        </div>
        <DefaultButton text = "Return" onClick={() => navigate("/upload_page")}/>
    </div>
  );
};

export default SongPage;
