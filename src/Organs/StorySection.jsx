import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useCallback, useContext, useEffect, useState } from "react";
import UserData from "../Contexts/UserData";
import StoryViewer from "../Molecules/StoryViwer";
import ProfileImage from "../Atoms/ProfileImage";
import fetchStories from "../Utils/FetchStories";

function StoriesCarousel(){

    const [sliderRef] = useKeenSlider({
        loop: false,
        mode: "free-snap",
        slides: {
          perView: "auto",
          spacing: 10,
        },
    });    

    const {user} = useContext(UserData);    

    const [stories, setStories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewerOpen, setViewerOpen] = useState(false);

    const handleClick = useCallback((story) => {
        const index = stories.findIndex((s) => s.userId === story.userId);
        if (index !== -1) {
            setCurrentIndex(index);
            setViewerOpen(true);
        }
    }, [stories]);      

    useEffect(() => {
        const getStories = async () => {
        if (user?._id) {
            const result = await fetchStories(user);
            setStories(result);
        }
        };
        getStories();
    }, [user]);

    return(
        <>
            <div className="w-full h-30 flex items-center md:border-b border-gray-200 overflow-x-auto px-2 md:px-4 md:mt-10">
            <div ref={sliderRef} className="keen-slider flex items-start justify-start gap-4" style={{ width: 'max-content' }}>
                {stories?.map((story) => (
                    <div
                        key={story.userId}
                        onClick={() => handleClick(story)}
                        className="keen-slider__slide flex flex-col items-center gap-1 min-w-[72px] sm:min-w-[90px] cursor-pointer"
                    >
                        <div
                            className={`
                            relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px]
                            ${story.isSeen
                                ? "bg-gray-300"
                                : "bg-gradient-to-tr from-blue-500 via-violet-500 to-white"}
                            `}
                        >
                            <div className="bg-white rounded-full w-full h-full p-[2px]">
                                <ProfileImage url={story.profileImage} alt={story.name} styling="w-full h-full rounded-full object-contain" />
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-center truncate w-full">
                            {story.socialId}
                        </p>
                    </div>
                ))}

            </div>

            {viewerOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-100">
                    <StoryViewer
                        initialIndex={currentIndex}
                        stories={stories}
                        onClose={() => setViewerOpen(false)}
                    />
                </div>
                
            )}

            </div>
        </>
    )
}

export default StoriesCarousel;