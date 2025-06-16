import { useNavigate } from "react-router-dom";
import ProfileImage from "../Atoms/ProfileImage";

function SearchedDrawer({ show, onClose, results = [] }) {
  if (!show) return null;

  const navigate = useNavigate();

  return (
    <div
      className="fixed top-30 md:top-20 left-0 right-0 z-40 md:w-3xl mx-auto p-4 transition-transform bg-white shadow-xl"
      style={{ transform: "translateY(0%)" }}
    >
      <div className="flex justify-between items-start">
        <h5 className="text-base font-semibold text-gray-700 flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          Search Results
        </h5>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-900 p-1 cursor-pointer"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1 1l12 12M13 1L1 13"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4 max-h-64 overflow-y-auto">
        {results.length > 0 ? (
          results.map((user, index) => (
            <div
              key={index}
              className="p-2 border-b text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
              onClick={() => navigate(`/otherProfile/${user.socialId}`)}
            >
                <div>
                    <ProfileImage url={user.profileImage} styling="w-10 h-10 rounded-full object-cover mr-3" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-md font-semibold text-gray-600">{user.socialId}</h1>
                    <h1 className="text-sm text-gray-400">{user.firstName} {user.lastName}</h1>
                </div>
                
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchedDrawer;
