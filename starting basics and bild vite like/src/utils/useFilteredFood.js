import { useState } from "react";

const useFilteredFood = (allItems) => {
  const [foodList, setFoodList] = useState(null);

  const filterVegItems = () => {
    const filtered = allItems.filter(
      (item) => item.card.info.itemAttribute.vegClassifier === "VEG"
    );

    setFoodList(filtered);
  };

  const filterNonVegItems = () => {
    const filtered = allItems.filter(
      (item) => item.card.info.itemAttribute.vegClassifier === "NONVEG"
    );
    setFoodList(filtered);
  };

  const showAllItems = () => {
    setFoodList(null);
  };

  return { foodList, filterVegItems, filterNonVegItems, showAllItems };
};

export default useFilteredFood;
