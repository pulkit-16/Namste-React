import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useFilteredFood from "../utils/useFilteredFood";
import useAllFoodItems from "../utils/useAllFoodItems";

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

  return (
    <div className="menu">
      {console.log("start of html")}
      My Menu
      <h1>{name}</h1>
      <h3>
        <p>{cuisines.join(",")}</p>
      </h3>
      <h3>{avgRating} star</h3>
      <h4>{sla.deliveryTime} minutes</h4>
      <h3>Menu</h3>
      <span>
        <button onClick={filterVegItems}>Veg</button>
        <button onClick={filterNonVegItems}>Non-Veg</button>
        <button onClick={showAllItems}> All Food </button>
      </span>
      <ul>
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
                <div key={index}>
                  <h2>{c.card.card.title || "Untitled Category"}</h2>
                  <ul>
                    {filteredItems.map((item) => (
                      <li key={item.card.info.id}>{item.card.info.name}</li>
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
