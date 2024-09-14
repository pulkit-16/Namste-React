import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useFilteredFood from "../utils/useFilteredFood";
import useAllFoodItems from "../utils/useAllFoodItems";
import { CDN_URL } from "../utils/constants";
import { VscStarFull } from "react-icons/vsc";
import { BsChevronCompactDown } from "react-icons/bs";

const RestaurantMenu = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveCategoryIndex(activeCategoryIndex === index ? null : index);
  };

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
      <div className=" flex flex-col place-items-start border pl-5 shadow-md ml-36 w-2/5 mr-60">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <h3 className="text-xl font-semibold text-gray-700 mb-2  dark:text-white">
          <p>{cuisines.join(",")}</p>
        </h3>
        <h3 className="text-lg text-yellow-500 mb-1  dark:text-white">{avgRating} star</h3>
        <h4 className="text-gray-600 mb-4 font-semibold  dark:text-white ">{sla.deliveryTime} minutes</h4>
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

      <ul className="m-5 p-4 space-y-6 ">
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

            console.log(filteredItems);

            if (filteredItems.length > 0) {
              return (
                <div
                  key={index}
                  className="p-8 border mx-28 border-gray-200 rounded-lg shadow-md mb-4 hover:bg-gray-200 dark:hover:bg-slate-800"
                >
                  <h2 className="text-2xl font-semibold mb-4 mt-2 cursor-pointer flex justify-between items-center">
                    {c.card.card.title || "Untitled Category"}
                    <span>
                      <BsChevronCompactDown onClick={() => toggleAccordion(index)}  className={`transition-transform ${activeCategoryIndex === index ? "rotate-180" : ""}`} />
                    </span>
                  </h2>

                  {activeCategoryIndex === index && (
                    <ul className="space-y-4">
                      {filteredItems.map((item) => (
                        <li
                          key={item.card.info.id}
                          className="flex items-center justify-between  p-2 border-b border-gray-200 last:border-none"
                        >
                          {/* Food Name on the Left */}
                          <div>
                            <span className="text-lg font-semibold">
                              {item.card.info.name}
                            </span>
                            <span
                              className={`ml-3 inline-block   rounded-full ${
                                item.card.info.itemAttribute.vegClassifier ===
                                "VEG"
                                  ? "border-green-600 text-green-900 bg-green-500" // Green border and text for Veg
                                  : "border-red-600 text-red-600 bg-red-600" // Red border and text for Non-Veg
                              }`}
                              style={{ width: "10px", height: "10px" }}
                            >
                              {" "}
                            </span>
                            <div className="text-l ">
                              {" "}
                              Rs{" "}
                              {item.card.info.price / 100 ||
                                item.card.info.defaultPrice / 100}{" "}
                            </div>
                            <span className="text-yellow-500 mt-2 flex items-center">
                              {" "}
                              {item.card.info.ratings.aggregatedRating.rating}
                              <VscStarFull className="m-1  " />
                              <span className="text-slate-600 dark:text-white">
                                (
                                {
                                  item.card.info.ratings.aggregatedRating
                                    .ratingCountV2
                                }
                                )
                              </span>
                            </span>
                          </div>

                          {/* Image on the Right */}
                          <div className=" relative w-32 h-32 rounded-2xl  overflow-hidden ">
                            <img
                              src={CDN_URL + item.card.info.imageId}
                              alt={item.card.info.name}
                              className="w-full h-full object-cover"
                            />
                            <button className="absolute font-bold bottom-0 hover:bg-green-300 left-1/2 transform -translate-x-1/2   bg-yellow-50 text-green-700 px-4 py-1 rounded-lg shadow-md">
                              Add{" "}
                            </button>
                          </div>
                        </li>
                      ))}
                      {console.log("displayed ")}
                    </ul>
                  )}
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
