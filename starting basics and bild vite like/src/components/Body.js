import RestaurantCard, { PromotedRestaurantCard } from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useInternetStatus from "../utils/useInternetStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [filteredResList, setFilteredResList] = useState([]);
  const [resList, setResList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [text, setText] = useState("");

  const RestaurantPromoted = PromotedRestaurantCard(RestaurantCard);

  const onlineStatus = useInternetStatus();

  const { loggedInUser, setUserName } = useContext(UserContext);

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
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.618929&lng=77.051099&collection=83644&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
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

  if (onlineStatus == false) {
    return <h1>Looks like you are Offline ! Check your internet</h1>;
  }

  console.log(resList);
  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="p-4">
      {/* Search and Filter Container */}
      <div className="mb-4 flex justify-between items-center mx-20 ">
        <div className="mt-2 ">
          <button
            className="bg-gray-50 text-slate-800 border border-solid border-black  px-5 rounded-full hover:bg-green-400 transition duration-200"
            onClick={filterTopRes}
          >
            {isFiltered ? "Show All Restaurants" : "Top Rated "}
          </button>
        </div>





        {/* username change  */}
        <div>
          <label>UserName : </label>
          <input
            className="border border-gray-600 p-1"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>





        <div className="space-x-4  ">
          <input
            className="  border border-gray-300 p-1 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            type="text"
            placeholder="Search Restaurant Name"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="bg-green-500 text-white p-1 px-4 rounded-md hover:bg-green-700 transition duration-200"
            onClick={handleSearch}
          >
            Search
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
            {restaurant.card.card.info.promoted ? (
              <RestaurantPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
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
