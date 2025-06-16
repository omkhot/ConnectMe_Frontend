import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { searchUserReq } from "../Axios/UserReq";
import SearchedDrawer from "./SearchedDrawer";

function SearchBar(){

    const [searchTerm, setSearchTerm] = useState('');

    const [results, setResults] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchSearchedUsers = async () => {
        try {
            const res = await searchUserReq(searchTerm);
            console.log("res from fetchSearchedUsers: ", res.data);
            setResults(res.data);
            setShowDrawer(true);
        } catch (error) {
            console.log(error);
            setResults([]);
            setShowDrawer(true);
        }
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim() !== "") {
                fetchSearchedUsers();
            }
        }, 500); // 500ms debounce delay

        return () => clearTimeout(delayDebounce); // Cleanup on change
    }, [searchTerm]);

    return(
        <div className="w-full flex items-center">

            <div className="px-2 py-2 border rounded-l-xl shadow-md bg-[#f5f5f5]">
                <Search  className="w-3 h-3 md:w-5 md:h-5"/>
            </div>

            <input
                type="search"
                placeholder="Search your friends and relatives..."
                className="border rounded-r-xl md:rounded-r-none w-full py-1 md:py-2 px-3 text-gray-700 leading-tight shadow-md focus:outline-none focus:shadow-outline"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}

            />

            <button 
                onClick={fetchSearchedUsers}
                className="hidden md:block bg-blue-500 rounded-r-xl shadow-md hover:bg-blue-700 text-white font-bold py-2 px-3">
                Search
            </button>

            <SearchedDrawer
                show={showDrawer}
                onClose={() => setShowDrawer(false)}
                results={results}
            />
        </div>
    )
}

export default SearchBar;