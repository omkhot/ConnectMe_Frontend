import TopHeader from "../Organs/TopHeader";
import StoriesCarousel from "../Organs/StorySection";
import LeftNavBar from "../Organs/LeftNavBar";
import FeedSection from "../Organs/FeedSection";

function HomePage() {

    
    return (
      <div className="w-[100%] min-h-screen flex flex-col">
          {/* Top Header */}
          <div className="w-[100%] border-b border-gray-300 bg-white z-50 fixed top-0 left-0">
              <TopHeader />
          </div>

          {/* Page Content */}
          <div className="w-[100%] flex flex-1 pt-[70px]">
              {/* Sidebar */}
              <div className="w-[25%] z-15 fixed top-[70px] lg:w-[18%]">
                  <LeftNavBar />
              </div>

              {/* Main Content */}
              <div className="w-full md:w-[70%] md:ml-[25%] lg:w-[75%] lg:ml-[20%]">
                  <div className="w-full">
                      <StoriesCarousel />
                  </div>

                  <div className="w-full z-20 md:w-[85%] md:mx-auto pb-15">
                      <FeedSection />
                  </div>
              </div>
          </div>
      </div>
  );
} 

export default HomePage;
