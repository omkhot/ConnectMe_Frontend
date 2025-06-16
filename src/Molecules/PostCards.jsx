import { useRef, useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

import UserData from "../Contexts/UserData";
import changeDateFormat from "../Utils/DateFormater";
import ProfileImage from "../Atoms/ProfileImage";
import CommentsBox from "./CommnetsBox";

import useFeedPostActions from "../Utils/PostActions";
import PostHeader from "../Atoms/PostHeader";

const FeedPost = ({ post, isFromProfile }) => {
  const { user } = useContext(UserData);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [navReady, setNavReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    liking,
    likes,
    bookmarked,
    showComments,
    commentsCount,
    toggleLike,
    toggleBookmark,
    setShowComments,
    setCommentsCount,
  } = useFeedPostActions(post, user?._id);

  useEffect(() => setNavReady(true), []); 

  return (
    <div className="bg-white md:shadow-md md:border md:border-gray-200 overflow-hidden md:rounded-xl" onDoubleClick={toggleLike}>
      
      <PostHeader post={post} isFromProfile={isFromProfile} />

      {/* Swiper */}
      <div className="relative">
        {navReady && (
          <Swiper
            autoHeight
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            className="w-full max-h-[500px]"
          >
            {post.postImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full flex justify-center">
                  <img src={img} alt={`post-${idx}`} className="w-auto max-w-full h-auto max-h-[90vh] object-contain" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-10">
          {currentSlide + 1} / {post.postImages.length}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex space-x-4">

          <div className="flex items-center gap-2">
            <Heart className={`w-6 h-6 text-red-500 cursor-pointer ${liking ? "fill-red-500" : ""}`} onClick={toggleLike} />
            <span className="text-md text-gray-900">{likes}</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
            <span className="text-md text-gray-900">{commentsCount}</span>
          </div>

        </div>

        <Bookmark
          onClick={toggleBookmark}
          className={`w-5 h-5 hover:text-yellow-500 cursor-pointer ${bookmarked ? "fill-yellow-500" : ""}`}
        />

      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-md">
          <span className="text-sm font-semibold mr-1">#{post.user?.socialId}</span>
          <span className="ml-2">{post.caption}</span>
        </p>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="px-4 pb-4">
          <h3 className="hidden md:block text-md font-semibold">Comments</h3>
          <div className="mt-2">
            <CommentsBox
              postId={post._id}
              setShowComments={setShowComments}
              setNoOfCommnets={setCommentsCount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedPost;
