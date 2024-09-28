import React, { useState } from "react";
// import { CDN_URL } from "../utils/constants";
// import { VscStarFull } from "react-icons/vsc";
 import { BsChevronCompactDown } from "react-icons/bs";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, foodList }) => {
  console.log("data is ", data);
  console.log("food list is ", foodList);

  const[showItems,setShowItems]= useState(false);

  return (
    <div className="  container">
      <div  className=" p-4 cursor-pointer w-6/12 border my-3 m-auto border-gray-400   rounded-lg shadow-md mb-4 hover:bg-gray-100 dark:hover:bg-slate-800">
        <div onClick={()=>setShowItems(!showItems)} className="flex justify-between items-center">
        <span className="text-lg font-bold">{data.title} ({data.itemCards.length})</span>
        <span><BsChevronCompactDown   className={`transition-transform ${
                  showItems === true ? "rotate-180" : ""
                }`}/></span>
        </div>
       

         {/* Accordian Body */}


         <ItemList items = {data.itemCards} showItems ={showItems}></ItemList>
      </div>
   
     
    </div>
  );
};

export default RestaurantCategory;

// {cards.map((c, index) => {
//   // Check if card contains itemCards
//   if (c.card?.card?.itemCards) {
//     // Filter items based on the current foodList

//     const filteredItems =
//       foodList === null
//         ? c.card.card.itemCards
//         : c.card.card.itemCards.filter((item) =>
//             foodList.some((f) => f.card.info.id === item.card.info.id)
//           );

//     //   console.log(filteredItems);

//     if (filteredItems.length > 0) {
//       return (
//         <div
//           key={index}
//           className="p-8 cursor-pointer border mx-36 border-gray-300 rounded-lg shadow-md mb-4 hover:bg-gray-100 dark:hover:bg-slate-800"
//         >
//           <div
//             onClick={() => toggleAccordion(index)}
//             className="text-2xl font-semibold mb-4 mt-2 cursor-pointer flex  items-center justify-between"
//           >
//             <div className="flex items-center">
//               <h2>{c.card.card.title || "Untitled Category"}</h2>
//               <span className="text-l ml-4">
//                 ({c.card.card.itemCards.length})
//               </span>
//             </div>
//             <span>
//               <BsChevronCompactDown
//                 className={`transition-transform ${
//                   activeCategoryIndex === index ? "rotate-180" : ""
//                 }`}
//               />
//             </span>
//           </div>

//           {activeCategoryIndex === index && (
//             <ul className="space-y-4">
//               {filteredItems.map((item) => (
//                 <li
//                   key={item.card.info.id}
//                   className="flex items-center justify-between  p-2 border-b border-gray-200 last:border-none"
//                 >
//                   {/* Food Name on the Left */}
//                   <div>
//                     <span className="text-lg font-semibold">
//                       {item.card.info.name}
//                     </span>
//                     <span
//                       className={`ml-3 inline-block   rounded-full ${
//                         item.card.info.itemAttribute.vegClassifier ===
//                         "VEG"
//                           ? "border-green-600 text-green-900 bg-green-500" // Green border and text for Veg
//                           : "border-red-600 text-red-600 bg-red-600" // Red border and text for Non-Veg
//                       }`}
//                       style={{ width: "10px", height: "10px" }}
//                     >
//                       {" "}
//                     </span>
//                     <div className="text-l ">
//                       {" "}
//                       Rs{" "}
//                       {item.card.info.price / 100 ||
//                         item.card.info.defaultPrice / 100}{" "}
//                     </div>
//                     <span className="text-yellow-500 mt-2 flex items-center">
//                       {" "}
//                       {item.card.info.ratings.aggregatedRating.rating}
//                       <VscStarFull className="m-1  " />
//                       <span className="text-slate-600 dark:text-white">
//                         (
//                         {
//                           item.card.info.ratings.aggregatedRating
//                             .ratingCountV2
//                         }
//                         )
//                       </span>
//                     </span>
//                   </div>

//                   {/* Image on the Right */}
//                   <div className=" relative w-32 h-32 rounded-2xl  overflow-hidden ">
//                     <img
//                       src={CDN_URL + item.card.info.imageId}
//                       alt={item.card.info.name}
//                       className="w-full h-full object-cover"
//                     />
//                     <button className="absolute font-bold bottom-0 hover:bg-green-300 left-1/2 transform -translate-x-1/2   bg-yellow-50 text-green-700 px-4 py-1 rounded-lg shadow-md">
//                       Add{" "}
//                     </button>
//                   </div>
//                 </li>
//               ))}
//               {/* {console.log("displayed ")} */}
//             </ul>
//           )}
//         </div>
//       );
//     }
//   }
//   return null; // Return null for cards that don't have itemCards
// })}
