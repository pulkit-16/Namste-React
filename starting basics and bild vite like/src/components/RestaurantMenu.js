import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useFilteredFood from "../utils/useFilteredFood";
import useAllFoodItems from "../utils/useAllFoodItems";
import { CDN_URL } from "../utils/constants";

const RestaurantMenu = () => {



  const { resId } = useParams();
  const resMenu = useRestaurantMenu(resId); // custom hooks

  const allItems = useAllFoodItems(resMenu);
  const { foodList, filterVegItems, filterNonVegItems, showAllItems } =
    useFilteredFood(allItems);

  console.log("render compo");

  if (resMenu == null) return <Shimmer />;

  const { name, cuisines, avgRating, sla } = resMenu.cards[2].card?.card?.info;
  const { cards } = resMenu.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;

  console.log(cards);

  return (
    <div className="container m-6">
      {/* {console.log("start of html")} */}
      My Menu
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        <p>{cuisines.join(",")}</p>
      </h3>
      <h3 className="text-lg text-yellow-500 mb-1">{avgRating} star</h3>
      <h4 className="text-gray-600 mb-4">{sla.deliveryTime} minutes</h4>
      <h3 className = "text-2xl font-semibold mb-4">Menu</h3>
      <div className="mb-6 space-x-4">
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

      <ul  className="m-5 p-4 space-y-6 ">
        {cards.map((c, index) => {
          // Check if card contains itemCards
          if (c.card?.card?.itemCards) {
            // Filter items based on the current foodList

            const filteredItems =
              foodList === null
                ? c.card.card.itemCards
                : c.card.card.itemCards.filter((item) =>
                    foodList.some((f) => f.card.info.id === item.card.info.id)
                  );

            // console.log(filteredItems);

            if (filteredItems.length > 0) {
              return (
                <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-md mb-4">
                <h2 className="text-2xl font-semibold mb-4 mt-2">{c.card.card.title || "Untitled Category"}</h2>
                <ul className="space-y-4">
                  {filteredItems.map((item) => (
                    <li key={item.card.info.id} className="flex items-center justify-between p-2 border-b border-gray-200 last:border-none">
                      {/* Food Name on the Left */}
                      <span className="text-lg font-semibold">{item.card.info.name}</span>
                      
                      {/* Image on the Right */}
                      <div className="w-24 h-24 rounded-lg overflow-hidden">
                        <img
                          src={CDN_URL + item.card.info.imageId}
                          alt={item.card.info.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </li>
                  ))}
                  {console.log("displayed ")}
                </ul>
              </div>
              );
            }
          }
          return null; // Return null for cards that don't have itemCards
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;

//for unique food list
// const uniqueFoodList = newFilterFoodList.filter(
//   (item, index, self) =>
//     index === self.findIndex((t) => t.card.info.id === item.card.info.id)
// );
