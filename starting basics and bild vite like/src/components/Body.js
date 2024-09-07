import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [filteredResList, setFilteredResList] = useState([]);
  const [resList, setResList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [text, setText] = useState("");

  const filterTopRes = () => {
    if (isFiltered) {
      setFilteredResList(resList);
    } 
    else {
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
      " https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.869408&lng=77.595139&collection=83668&tags=layout_CCS_Sandwiches&sortBy=&filters=&type=rcv2&offset=0&page_type=null"

    );

    const json = await data1.json();
    const result = json?.data?.cards.slice(3);
    setResList(result || []);

    setFilteredResList(result);
  };

 
  const handleSearch = (e) => {
    let data = text.toLowerCase();

    console.log(data)
   
    const resaturantFilterSearch = resList.filter((res) =>
      res.card.card.info.name.toLowerCase().includes(data)
    );

    setFilteredResList(resaturantFilterSearch);
    console.log(resaturantFilterSearch);
    
  };

 
  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div>
      <div className="search-container">
      <div className="search">
        <input
          className="input"
          value={text}
          type="text"
          onChange={
            (e)=>setText(e.target.value)
          }
        ></input>

        <button className="search-btn" onClick={handleSearch}>Search Restaurant Name</button>
      </div>
      <div className="filter">
        <button className="filter-btn" onClick={filterTopRes}>
          {isFiltered ? "All Restaurant" : "Top Rated Restaurant"}
        </button>
      </div>
      </div>
      <div className="cards">
        {filteredResList?.map((restaurant) => (
          <RestaurantCard
            key={restaurant.card.card.info.id}
            resData={restaurant}
          />
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