import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useInternetStatus from "../utils/useInternetStatus";

const Body = () => {
  const [filteredResList, setFilteredResList] = useState([]);
  const [resList, setResList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [text, setText] = useState("");

  const onlineStatus = useInternetStatus();

  const filterTopRes = () => {
    if (isFiltered) {
      setFilteredResList(resList);
    } else {
      const topRes = resList?.filter(
        (res) => res.card.card.info.avgRating >= 4.0
      );
      setFilteredResList(topRes);
    }
    setIsFiltered(!isFiltered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data1 = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.869408&lng=77.595139&collection=83644&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );

    const json = await data1.json();
    const result = json?.data?.cards.slice(3);
    setResList(result || []);

    setFilteredResList(result);
  };

  const handleSearch = (e) => {
    let data = text.toLowerCase();

    console.log(data);

    const resaturantFilterSearch = resList.filter((res) =>
      res.card.card.info.name.toLowerCase().includes(data)
    );

    setFilteredResList(resaturantFilterSearch);
    console.log(resaturantFilterSearch);
  };

  if(onlineStatus==false){
    return(
      <h1>Looks like you are Offline ! Check your internet</h1>
    )
  }
    
  

  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="p-4">
      {/* Search and Filter Container */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-1 space-x-3">
          <input
            className="border border-gray-300 p-2 rounded-md w-full md:w-1/2 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            type="text"
            placeholder="Search Restaurant Name"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="mt-2 md:mt-0">
          <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200" onClick={filterTopRes}>
            {isFiltered ? "Show All Restaurants" : "Show Top Rated Restaurants"}
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {filteredResList?.map((restaurant) => (
          <Link
            key={restaurant.card.card.info.id}
            to={"/restaurant/" + restaurant.card.card.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;

// const getTopRes = () => {
//   return resList?.filter((res) => res.card.card.info.avgRating >= 4);
// };
// const topRes = getTopRes();
//rep of hook
// const arr = useState(resList);
// const filteredResList =arr[0];
// const setFilteredResList=arr[1];

//conditional rendering
// if(resList.length===0){
//   return <Shimmer/>
// }

//use debounce and useCallback for the optimization
