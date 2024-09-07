import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [resMenu, setResMenu] = useState(null);
  const [foodList, setFoodList] = useState(null);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      let response = await fetch(
        "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.869408&lng=77.595139&restaurantId=328929&catalog_qa=undefined&query=Pizza&submitAction=ENTER"
      );
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

  const handleVegBtn = () => {
    const newFilterFoodList = allItems.filter(
      (item) => item.card.info.itemAttribute.vegClassifier === "VEG"
    );

    const uniqueFoodList = newFilterFoodList.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.card.info.id === item.card.info.id)
    );

    setFoodList(uniqueFoodList);
  };

  const handleNonVegBtn = () => {
    const newFilterFoodList = allItems.filter(
      (item) => item.card.info.itemAttribute.vegClassifier === "NONVEG"
    );

    const uniqueFoodList = newFilterFoodList.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.card.info.id === item.card.info.id)
    );

    setFoodList(uniqueFoodList);
  };

  

  if (resMenu == null) return <Shimmer />;

  const { name, cuisines, avgRating, sla } = resMenu.cards[2].card?.card?.info;
  const { cards } = resMenu.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;
  console.log(cards)




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
            if(filteredItems.length>0){
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
