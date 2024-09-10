import { useEffect, useState } from "react";

const useAllFoodItems =(resMenu)=>{

const[allItems,setAllItems]= useState([]);

    useEffect(() => {
        if (resMenu) {
          const items =
            resMenu.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.flatMap(
              (c) => c.card?.card?.itemCards || []
            );
          setAllItems(items || []);
    
          console.log("useEffect 2")
        }
      }, [resMenu]);

      return allItems;
}
export default useAllFoodItems;