import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, cloudinaryImageId } =
    resData?.card?.card?.info;

  const { deliveryTime } = resData?.card?.card?.info?.sla;


  
  return (
    <div className="flex h-96">
      <div
      className=" flex flex-col w-64 min-h-full bg-slate-100 rounded-xl hover:border-solid  
      shadow-xl overflow-hidden hover:border hover:border-gray-300 hover:shadow-2xl
       transition duration-300 ease-in-out  p-4"
    >
      <img
        src={CDN_URL + cloudinaryImageId}
        className="w-full h-40 object-cover rounded-md"
        alt={name}
      />
      <div className="flex flex-col flex-grow item-start space-y-3 mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <h4 className="text-sm text-gray-600 mt-1">{cuisines.join(", ")}</h4>
        <h4 className="text-sm text-yellow-500 mt-1">{avgRating} ★</h4>
        <h4 className="text-sm text-gray-600 mt-1">{deliveryTime} minutes</h4>
      </div>
    </div>
    </div>
    
  );
};

export const PromotedRestaurantCard = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute rounded bg-black rounded-lg text-white p-1 m-1">Promoted</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
