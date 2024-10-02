import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useFilteredFood from "../utils/useFilteredFood";
import useAllFoodItems from "../utils/useAllFoodItems";

import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resMenu = useRestaurantMenu(resId); // custom hooks
  const allItems = useAllFoodItems(resMenu);
  const { foodList, filterVegItems, filterNonVegItems, showAllItems } =
    useFilteredFood(allItems);
  const[showIndex , setShowIndex] = useState(null);
  

  // console.log("render compo");

  if (resMenu == null) return <Shimmer />;

  const { name, cuisines, avgRating, sla } = resMenu.cards[2].card?.card?.info;
  const { cards } = resMenu.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;

  const itemCategories =
    resMenu.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="container m-6 ">
      {/* {console.log("start of html")} */}
      <div className=" flex flex-col place-items-center justify-center border pl-5 shadow-md w-6/12 m-auto mb-16">
        <h1 className="text-2xl font-bold mb-4">{name}</h1>
        <h3 className="text-xl font-semibold text-gray-700 mb-2  dark:text-white">
          <p>{cuisines.join(",")}</p>
        </h3>
        <h3 className="text-lg text-yellow-500 mb-1  dark:text-white">
          {avgRating} star
        </h3>
        <h4 className="text-gray-600 mb-4 font-semibold  dark:text-white ">
          {sla.slaString}{" "}
        </h4>
        <h3 className="text-2xl font-semibold mb-4">Menu</h3>

        <div className="mt-3  mb-6 space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-2xl hover:bg-green-600"
            onClick={filterVegItems}
          >
            Veg
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600"
            onClick={filterNonVegItems}
          >
            Non-Veg
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-2xl hover:bg-gray-600"
            onClick={showAllItems}
          >
            All Food
          </button>
        </div>
      </div>
      {/* category accordian */}
      {itemCategories.map((category,index) => (

        //Controlled component
        <RestaurantCategory
          key={category.card.card.title}
          data={category?.card?.card}
          foodList={foodList}
          showItems={index == showIndex ? true: false}
          setShowIndex ={()=>setShowIndex(prevIndex => (prevIndex === index ? null : index))}  //gpt
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;

//for unique food list
// const uniqueFoodList = newFilterFoodList.filter(
//   (item, index, self) =>
//     index === self.findIndex((t) => t.card.info.id === item.card.info.id)
// );
