import resList from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";
import  { useEffect, useState } from 'react';


const Body = () => {

  const [filteredResList, setFilteredResList] = useState([]);
  const[resList,setResList]=useState([]);
  const[isFiltered,setIsFiltered] = useState(false);


  const filterTopRes = ()=>{
    if(isFiltered){
      setFilteredResList(resList);
    }             
    else{
      const topRes = resList?.filter((res)=>(res.card.card.info.avgRating >= 4.0))    
      setFilteredResList(topRes);
        }   
    setIsFiltered(!isFiltered);
  }

  useEffect(()=>{
    fetchData()
  },[]);


    const fetchData = async()=>{
    const data1 = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6186471&lng=77.0520664&collection=83648&tags=layout_CCS_Burger&sortBy=&filters=&type=rcv2&offset=0&page_type=null")

    const json = await data1.json() ;
    const result =json?.data?.cards.slice(3);
    setResList(result||[])

    setFilteredResList(result);

  }

  // normal consol.log(isFiltered) not working coz of async

  useEffect(() => {
    console.log("isFiltered updated:", isFiltered);
  }, [isFiltered])



  if(resList.length===0){
    return <h1>Loading.....</h1>
  }

    return (
      <div>
        <div className="filter">
            <button className="filter-btn"
            onClick ={filterTopRes}>
              {isFiltered ? "All Restaurant":  "Top Rated Restaurant"}
            </button>
        </div>
        <div className="cards">
          {filteredResList?.map((restaurant) => (
            <RestaurantCard key= {restaurant.card.card.info.id} resData={restaurant} />
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