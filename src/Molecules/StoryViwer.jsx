import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import changeDateFormat from "../Utils/DateFormater";
import PopUpContext from "../Contexts/PopUpContext";

function StoryViewer({ initialIndex = 0, stories, onClose }) {
  const [currentUserIndex, setCurrentUserIndex] = useState(initialIndex);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const containerRef = useRef(null);

  const { setPopUpMode } = useContext(PopUpContext);

  const getAllMediaForUser = (userIndex) => {
    return stories[userIndex].stories?.flatMap((story) =>
      story.media.map((mediaUrl) => ({
        mediaUrl,
        createdAt: story.createdAt,
      }))
    );
  };

  const mediaList = getAllMediaForUser(currentUserIndex);

  if(!mediaList || mediaList.length === 0) {
    return (
      <>
        <div className="fixed inset-0 bg-black flex items-center justify-center z-[500]">
          <div className="text-white text-lg font-semibold">You have not added any stories..</div>  
        </div>
        <button className="fixed top-4 left-4 z-[500] cursor-pointer" onClick={onClose}>
          <X className="w-6 h-6 text-white" />
        </button>
        <button 
          className="fixed top-2/3 left-1/2 transform -translate-x-1/2 z-[500] text-white border border-white py-2 px-4 rounded-xl hover:bg-white hover:text-black cursor-pointer"
          onClick={() => setPopUpMode(true)}
        >
          Add Story Now
        </button>
      </>
    ); // No media available for the current user
  }
  const currentMedia = mediaList?.[currentMediaIndex] || -1;

  const swipe = (direction) => {
    if (direction === "left") {
      if (currentMediaIndex < mediaList?.length - 1) {
        setCurrentMediaIndex((prev) => prev + 1);
      } else if (currentUserIndex < stories.length - 1) {
        setCurrentUserIndex((prev) => prev + 1);
        setCurrentMediaIndex(0);
      }
    } else if (direction === "right") {
      if (currentMediaIndex > 0) {
        setCurrentMediaIndex((prev) => prev - 1);
      } else if (currentUserIndex > 0) {
        const prevUserIndex = currentUserIndex - 1;
        const prevUserMedia = getAllMediaForUser(prevUserIndex);
        setCurrentUserIndex(prevUserIndex);
        setCurrentMediaIndex(prevUserMedia.length - 1);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMediaIndex < mediaList?.length - 1) {
        setCurrentMediaIndex((prev) => prev + 1);
      } else if (currentUserIndex < stories.length - 1) {
        setCurrentUserIndex((prev) => prev + 1);
        setCurrentMediaIndex(0);
      } else {
        onClose();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentUserIndex, currentMediaIndex]);

  useEffect(() => {
    const handleTouch = (() => {
      let startX = 0;

      const onTouchStart = (e) => {
        startX = e.touches[0].clientX;
      };

      const onTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        if (deltaX > 50) swipe("right");
        else if (deltaX < -50) swipe("left");
      };

      return { onTouchStart, onTouchEnd };
    })();

    const ref = containerRef.current;
    if (!ref) return;

    ref.addEventListener("touchstart", handleTouch.onTouchStart);
    ref.addEventListener("touchend", handleTouch.onTouchEnd);

    return () => {
      ref.removeEventListener("touchstart", handleTouch.onTouchStart);
      ref.removeEventListener("touchend", handleTouch.onTouchEnd);
    };
  }, [currentUserIndex, currentMediaIndex]);

  if(!currentMedia) return null;
  

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-[500]"
    >
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 px-4 py-2 z-10">
        {mediaList?.map((_, idx) => (
          <div
            key={`progress-bar-${currentUserIndex}-${idx}`}
            className="flex-1 h-1 bg-white/30 rounded overflow-hidden"
          >
            <motion.div
              key={`${currentUserIndex}-${currentMediaIndex}-${idx}`}
              initial={{ width: 0 }}
              animate={{
                width:
                  idx === currentMediaIndex
                    ? "100%"
                    : idx < currentMediaIndex
                    ? "100%"
                    : "0%",
              }}
              transition={{
                duration: idx === currentMediaIndex ? 3 : 0,
                ease: "linear",
              }}
              className="h-full bg-white"
            />
          </div>
        ))}
      </div>

      <AnimatePresence initial={false}>
        <motion.img
          key={currentMedia.mediaUrl}
          src={currentMedia.mediaUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-contain"
        />
      </AnimatePresence>

      {/* Profile Info */}
      <div className="absolute top-4 left-4 text-white text-md font-semibold bg-black/60 rounded px-4 py-2 z-10">
        <div className="flex items-center">
          <img
            src={stories[currentUserIndex].profileImage}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 mr-2"
          />
          <div className="flex flex-col">
            <span>{stories[currentUserIndex].socialId}</span>
            <span className="text-xs font-normal italic">
              {changeDateFormat(currentMedia.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentUserIndex > 0 || currentMediaIndex > 0 ? (
        <button
          onClick={() => swipe("right")}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white z-10"
        >
          <ChevronLeft size={32} />
        </button>
      ) : null}

      {(currentMediaIndex < mediaList?.length - 1 ||
        currentUserIndex < stories.length - 1) && (
        <button
          onClick={() => swipe("left")}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white z-10"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-red-500 text-lg bg-black/60 px-3 py-1 rounded hover:bg-black z-10"
      >
        <X />
      </button>
    </div>
  );
}

export default StoryViewer;
