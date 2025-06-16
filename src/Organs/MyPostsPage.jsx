import LeftNavBar from "./LeftNavBar";
import TopHeader from "./TopHeader";

function MyPostsPage({post}) {
    return(
        <>
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

                </div>
            </div>
        </>
    )
}

export default MyPostsPage;