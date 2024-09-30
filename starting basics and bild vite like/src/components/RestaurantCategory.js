import React, { useState } from "react";
// import { CDN_URL } from "../utils/constants";
// import { VscStarFull } from "react-icons/vsc";
import { BsChevronCompactDown } from "react-icons/bs";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, foodList }) => {
  const [showItems, setShowItems] = useState(false);

  const filteredItems =
    foodList === null
      ? data.itemCards
      : data.itemCards.filter((item) =>
          foodList.some((f) => f.card.info.id === item.card.info.id)
        );

  return (
    <div className="  container">
      <div className=" p-4 cursor-pointer w-6/12 border my-3 m-auto border-gray-400   rounded-lg shadow-md mb-4 hover:bg-gray-100 dark:hover:bg-slate-800">
        <div
          onClick={() => setShowItems(!showItems)}
          className="flex justify-between items-center"
        >
          <span className="text-lg font-bold">
            {data.title} ({data.itemCards.length})
          </span>
          <span>
            <BsChevronCompactDown
              className={`transition-transform ${
                showItems === true ? "rotate-180" : ""
              }`}
            />
          </span>
        </div>

        {/* Accordian Body */}

       {showItems && <ItemList items={filteredItems} ></ItemList>} 
      </div>
    </div>
  );
};

export default RestaurantCategory;
