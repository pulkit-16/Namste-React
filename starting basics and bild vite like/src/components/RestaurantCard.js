import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, cloudinaryImageId } =
    resData?.card?.card?.info;

  const { deliveryTime } = resData?.card?.card?.info?.sla;

  return (
    <div
      className=" flex flex-col w-64 h-full bg-slate-100 rounded-xl hover:border-solid  
      shadow-xl overflow-hidden hover:border hover:border-gray-300 hover:shadow-2xl
       transition duration-300 ease-in-out justify-between p-4"
    >
      <img
        src={CDN_URL + cloudinaryImageId}
        className="w-full h-40 object-cover rounded-md"
        alt={name}
      />
      <div className="flex flex-col mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <h4 className="text-sm text-gray-600 mt-1">{cuisines.join(", ")}</h4>
        <h4 className="text-sm text-yellow-500 mt-1">{avgRating} ★</h4>
        <h4 className="text-sm text-gray-600 mt-1">{deliveryTime} minutes</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
