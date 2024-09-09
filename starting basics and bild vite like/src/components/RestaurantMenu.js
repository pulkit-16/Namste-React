import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const [resMenu, setResMenu] = useState(null);
  const [foodList, setFoodList] = useState(null);
  const [allItems, setAllItems] = useState([]);

  const { resId } = useParams();
  // console.log(resId)

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      let response = await fetch(MENU_API + resId);
      const json = await response.json();
      setResMenu(json.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    if (resMenu) {
      const items =
        resMenu.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.flatMap(
          (c) => c.card?.card?.itemCards || []
        );
      setAllItems(items || []);
    }
  }, [resMenu]);

  console.log(resMenu);

  const handleVegBtn = () => {
    const newFilterFoodList = allItems.filter(
      (item) => item.card.info.itemAttribute.vegClassifier === "VEG"
    );

    setFoodList(newFilterFoodList);
  };

  const handleNonVegBtn = () => {
    const newFilterFoodList = allItems.filter(
      (item) => item.card.info.itemAttribute.vegClassifier === "NONVEG"
    );

    setFoodList(newFilterFoodList);
  };

  if (resMenu == null) return <Shimmer />;

  const { name, cuisines, avgRating, sla } = resMenu.cards[2].card?.card?.info;
  const { cards } = resMenu.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;

  //console.log(allItems);



  return (
    <div className="menu">
      My Menu
      <h1>{name}</h1>
      <h3>
        <p>{cuisines.join(",")}</p>
      </h3>
      <h3>{avgRating} star</h3>
      <h4>{sla.deliveryTime} minutes</h4>
      <h3>Menu</h3>
      <span>
        <button onClick={handleVegBtn}>Veg</button>
        <button onClick={handleNonVegBtn}>Non-Veg</button>
        <button
          onClick={() => {
            setFoodList(null);
          }}
        >
          All Food
        </button>
      </span>
      <ul>
        {
        cards.map((c, index) => {
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
