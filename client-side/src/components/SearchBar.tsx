const SearchBar: React.FC = () => {
    return (
        <div className="bg-white shadow-md rounded-md p-4 flex flex-wrap justify-center space-x-2">
            <input
                type="text"
                placeholder="Position"
                className="border border-gray-300 rounded-md p-2 w-full md:w-auto md:min-w-[150px]" // Responsive
            />
            <input
                type="text"
                placeholder="City"
                className="border border-gray-300 rounded-md p-2 w-full md:w-auto md:min-w-[150px]" // Responsive
            />
            <input
                type="text"
                placeholder="Country"
                className="border border-gray-300 rounded-md p-2 w-full md:w-auto md:min-w-[150px]" // Responsive
            />
            <button className="bg-indigo-600 text-white rounded-md px-4 py-2 mt-2 md:mt-0">
                Search
            </button>
        </div>
    );
};

export default SearchBar;
