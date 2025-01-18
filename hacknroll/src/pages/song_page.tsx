import React, {useState} from "react";
import FileUpload from "../components/file_upload";
import DefaultButton from "../components/default_button";

const SongPage: React.FC = () => {
  return (
    <div>
        <FileUpload />
        <DefaultButton className="test"/>
    </div>
  );
};

export default SongPage;
