import { BsExclamationCircle } from "react-icons/bs";

function PostGallery({ posts, emptyMessage, onPostClick }) {

    if (!posts || posts.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center mt-10">
                <BsExclamationCircle className="text-3xl text-gray-500" />
                <p className="text-sm text-gray-600 italic">{emptyMessage}</p>
            </div>
        );
    }
 
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4 pb-20">
            {posts.map((post) => (
                <div
                    key={post._id}
                    className="relative cursor-pointer group"
                    onClick={() => onPostClick(post)}
                >
                    <img
                        src={post.postImages[0]}
                        alt="post"
                        className="w-full h-40 md:h-48 object-cover rounded-md group-hover:opacity-80 transition duration-300"
                        loading="lazy"
                    />
                    {post.postImages.length > 1 && (
                        <span className="absolute bottom-2 right-2 text-[10px] bg-white px-2 py-1 border border-gray-300 rounded-full text-gray-700 shadow-sm">
                            1/{post.postImages.length}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostGallery;
