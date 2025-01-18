import React, {useState} from "react";
import FileUpload from "../components/file_upload";
import DefaultButton from "../components/default_button";
import { useNavigate } from "react-router-dom";

const UploadPage: React.FC = () => {
    const navigate = useNavigate();

  return (
    <div>
        <FileUpload />
        <DefaultButton className="test"/>
        <DefaultButton className="submit" onClick={() => navigate("/song_page")}/>
    </div>
  );
};

export default UploadPage;
