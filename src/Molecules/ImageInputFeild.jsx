import { useState } from "react";

function ImageInputField({setImage,title,existingImage}){

    const [preview, setPreview] = useState(existingImage);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
    };

    return(
        <div className="w-[100%] h-[100%]">
            <div className="flex gap-2 items-center mb-2">
                {title && <h1 className='font-poppins w-[20%]'>{title}</h1>}
                    {preview ? (
                                <div>
                                    <div className="w-[100%] h-64">
                                        {preview && <img className="w-[100%] h-[100%] object-contain border-2 rounded-md" src={preview} alt="Preview" />}
                                    </div>                                    
                                    <button
                                        onClick={() => setPreview('')}
                                        className="mt-5 text-gray-500 hover:text-gray-700 border-2 border-gray-300 rounded-md px-4 py-2"
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            ) : (<label
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400"
                                >
                                    <input
                                        type="file"
                                        name="img"
                                        accept="image/*,video/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                        <span className="text-gray-500">Click to upload image/video</span>
                                    </label>
                                )
                    }
            </div>
        </div>
    )
}

export default ImageInputField;