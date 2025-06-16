import FeedPost from "../Molecules/PostCards";

function PostDetailsView({post, onClose, fromProfile}){
    return(
        <>
            
            <div className="w-full min-h-screen bg-white p-4 flex flex-col gap-4"> 
                <button 
                        className="self-end text-gray-600 hover:text-red-500 cursor-pointer" 
                        onClick={onClose}
                    >✕
                </button>               
                <FeedPost post={post} isFromProfile={true} />                
            </div>
        </>
    )
}
 
export default PostDetailsView;