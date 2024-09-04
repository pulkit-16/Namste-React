import { CDN_URL } from "../utils/constants";


const RestaurantCard = (props) => {
   
  
    const { resData } = props;
    const { name, cuisines, avgRating, cloudinaryImageId } =
      resData?.card?.card?.info;
  
    const { deliveryTime } = resData?.card?.card?.info?.sla;
  
    
    return (
      <div className="res-card">
        <img
          src={ 
            CDN_URL + cloudinaryImageId
          }
          className="card-img"
        ></img>
        <h3>{name}</h3>
        <h4>{[cuisines[0],',' ,' ',cuisines[1]]}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{deliveryTime} minutes</h4>
      </div>
    );
  };

  export default RestaurantCard;