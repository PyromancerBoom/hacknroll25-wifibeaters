import React, {useState} from "react";
import FileUpload from "../components/file_upload";
import DefaultButton from "../components/default_button";

import { useNavigate } from "react-router-dom";

const UploadPage: React.FC = () => {
  const handleClick = () => {};
  const navigate = useNavigate();

  return (
    <div>
        <h1 className="text-4xl font-bold text-primary-50 text-center my-6 tracking-tight leading-tight">
        Insert Project Name
        </h1>
        <h2 className="text-gray-900 text-l font-medium">
        This is a subtitle that will describe the project
        </h2>

        <FileUpload />
        <DefaultButton text = "Submit" onClick={() => navigate("/song_page")}/>
    </div>
  );
};

export default UploadPage;
