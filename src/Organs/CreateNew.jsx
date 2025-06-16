import { useContext, useState } from "react";
import MultipleImageInputField from "../Molecules/MultipleImagesInput";
import PopUpContext from "../Contexts/PopUpContext";
import { createNewPost } from "../Axios/PostsRequests";
import UserData from "../Contexts/UserData";
import { CreateNewStory } from "../Axios/StoryReq";
import Spinner from "../Atoms/Loader";

function CreateNew() {
  const { setPopUpMode } = useContext(PopUpContext);
  const { user } = useContext(UserData);

  const [tab, setTab] = useState("story");
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");

  const [loading, setLoading] = useState(false);

  const handelPost = async () => {
    if (images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    if (caption.length === 0) {
      const result = window.confirm("Are you sure you want to create a post without a caption?");
      if (!result) return;
    }

    setLoading(true);

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("postImages", image);
    });

    formData.append("caption", caption);
    formData.append("_id", user?._id);

    try {
        const res = await createNewPost(formData);
        alert("Post Created Successfully!!");
    } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Post Upload Failed");
    }
    
    setLoading(false);
    setPopUpMode(false);
  };

  const handelStory = () => {
    if(images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("stories", image);
    });

    formData.append("userId", user?._id);
    
    try {
        const res = CreateNewStory(formData);
        alert("Story Created Successfully!!");
    } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Story Upload Failed");
    }
    
    setLoading(false);
    setPopUpMode(false);
  };

  if (loading) {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        </>
    )
  }

  return (
    <div className="w-[95%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-h-[95vh] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md shadow-gray-200 p-4 md:p-6 mx-auto">
      {/* Tab section */}
      <div className="flex justify-around border-b border-gray-100 mb-4">
        <div
          className="w-1/2 md:w-1/4 text-center cursor-pointer"
          onClick={() => setTab("story")}
        >
          <p
            className={`text-gray-600 ${
              tab === "story"
                ? "border-b-2 border-blue-500 bg-gray-100 px-4 py-2 rounded-full"
                : ""
            }`}
          >
            Story
          </p>
        </div>
        <div
          className="w-1/2 md:w-1/4 text-center cursor-pointer"
          onClick={() => setTab("post")}
        >
          <p
            className={`text-gray-600 ${
              tab === "post"
                ? "border-b-2 border-blue-500 bg-gray-100 px-4 py-2 rounded-full"
                : ""
            }`}
          >
            Post
          </p>
        </div>
      </div>

      {tab === "post" && (
        <div className="space-y-6">
          <h1 className="text-center text-gray-600 text-lg font-semibold">
            Create New Post
          </h1>

          <div className="bg-gray-100 p-4 rounded-xl">
            <MultipleImageInputField
              setImages={setImages}
              existingImage={images}
            />
          </div>

          <div className="bg-white border border-gray-300 rounded-xl px-3 py-2">
            <input
              type="text"
              placeholder="Write your caption here..."
              className="w-full text-gray-700 focus:outline-none focus:shadow-none"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-end">
            <button
              onClick={handelPost}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-xl shadow-md transition duration-200"
            >
              Post
            </button>
            <button
              onClick={() => setPopUpMode(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-8 rounded-xl shadow-md transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {tab === "story" && (
        <div className="space-y-6">
            <h1 className="text-center text-gray-600 text-lg font-semibold">
                Create New Story
            </h1>
            <div className="bg-gray-100 p-4 rounded-xl">
                <MultipleImageInputField
                    setImages={setImages}
                    existingImage={images}
                />
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-end">
                <button
                    onClick={handelStory}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-xl shadow-md transition duration-200"
                >
                    @Add to Story
                </button>
                <button
                    onClick={() => setPopUpMode(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-8 rounded-xl shadow-md transition duration-200"
                >
                    Cancel
                </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CreateNew;
