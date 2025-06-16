import { useState } from "react";
import usePostsMethods from "../Hooks/PostHook";
import { Send } from "lucide-react";

function EditPostBox({setIsEditOpen, post}){

    const [caption, setCaption] = useState(post.caption);

    const {editMyPost} = usePostsMethods(post);

    const onEditClick = () => {
        editMyPost({
            caption : caption
        });
        setIsEditOpen(false);
    }

    return(
        <>
            <div className="w-full p-4">
                <h1 className="text-sm md:text-2xl font-bold">
                    Edit Post
                    <span className="float-right cursor-pointer" onClick={() => setIsEditOpen(false)}>X</span>
                </h1>
                <p className="text-xs md:text-sm text-gray-500 italic text-red-300 mt-2">(You can edit only your caption of post. To update the images please delete the post and create a new one)</p>
                <div className="mt-4">
                    <input 
                        type="text" 
                        placeholder="Caption here"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={caption}        
                        onChange={(e) => setCaption(e.target.value)}        
                        onKeyDown={(e) => e.key === 'Enter' && onEditClick()}       
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Send 
                        className="w-8 h-8 text-gray-100 bg-blue-500 p-1 rounded-full" 
                        onClick={onEditClick} 
                        cursor="pointer" 
                    />
                </div>
            </div>
        </>
    )
}

export default EditPostBox;