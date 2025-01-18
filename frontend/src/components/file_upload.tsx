    import React, { useState, useRef } from "react";
    import pdfToText from 'react-pdftotext'

    interface FileUploadProps {
    maxFileSizeMB?: number;
    disabled?: boolean;
    }

    function extractText(event) {
        const file = event.target.files[0]
        pdfToText(file)
            .then(text => console.log(text))
            .catch(error => console.error("Failed to extract text from pdf"))
    }

    const FileUpload: React.FC<FileUploadProps> = ({
    maxFileSizeMB = 5,
    disabled = false,
    }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [helperText, setHelperText] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
    
        if (!file) {
            setHelperText("No file selected.");
            setSelectedFile(null);
            return;
        }
    
        if (file.type !== "application/pdf") {
            setHelperText("Only PDF files are allowed.");
            setSelectedFile(null);
            resetFileInput();
            return;
        }
    
        if (file.size > maxFileSizeMB * 1024 * 1024) {
            setHelperText(`File size exceeds the ${maxFileSizeMB}MB limit.`);
            setSelectedFile(null);
            resetFileInput();
            return;
        }
    
        try {
            setSelectedFile(file);
            setHelperText("File successfully uploaded.");
    
            try {
                const text = await pdfToText(file);
                console.log(text);
            } catch (error) {
                console.error("Failed to extract text from PDF:", error);
                setHelperText("Failed to extract text from PDF.");
            }
        } catch (error) {
            console.error("File upload error:", error);
            setHelperText("Error uploading file.");
        } finally {
            resetFileInput();
        }
    };
    
    const resetFileInput = () => {
        if (fileInputRef.current) {
        fileInputRef.current.value = "";
        }
    };

    return (
        <div
        >
        <label className="cursor-pointer block w-full">
            <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            disabled={disabled}
            onChange={handleFileChange}
            hidden
            />
            {!selectedFile ? (
            <div
                className={`
                border-2 border-dashed border-neutral-30 rounded-lg p-4 flex items-center gap-4 transition-colors duration-300 w-[400px] h-[80px]
                ${disabled ? "bg-neutral-10 pointer-events-none cursor-not-allowed" : "hover:border-primary"}
                `}
            >
                <div className="flex items-center gap-3">
                <div className="text-secondary-text ml-[5px] mr-5">
                    Icon
                </div>
                <div className="flex flex-col">
                    <span className="text-body-regular font-medium text-primary-text">
                    Tap to upload a file
                    </span>
                    <span className="text-body-ultra-small text-neutral mt-0.5">
                    Accepted format(s): .pdf, Max {maxFileSizeMB}MB
                    </span>
                </div>
                </div>
            </div>
            ) : (
            <div
                className="flex items-center border border-neutral-30 rounded-lg p-0 gap-4 cursor-pointer w-[400px] h-[80px]"
                onClick={() => {
                setSelectedFile(null);
                setHelperText("");
                }}
            >
                <div className="bg-secondary-text text-white font-bold text-sm p-2 rounded w-[60px] h-[80px] flex justify-center items-center ml-0">
                PDF
                </div>
                <div className="flex flex-col flex-1">
                <span className="text-base font-medium text-primary-text">
                    {selectedFile.name}
                </span>
                <span className="text-body-ultra-small text-secondary-text">
                    uploaded {new Date().toLocaleString()}
                </span>
                </div>
            </div>
            )}
        </label>
        {helperText && (
            <div
            className={`${helperText.toLowerCase().includes("error") ? "text-danger" : "text-secondary-text"} text-body-ultra-small mt-0.5`}
            >
            {helperText}
            </div>
        )}
        </div>
    );
    };

    export default FileUpload;
