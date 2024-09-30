import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
  
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li 
            key={item.card.info.id}
            className="p-2 m-2 border-gray-400 border-b-2 flex justify-between last:border-none"
          >
            <div className="flex-1 pr-4">
              <div>
                <span className="text-lg font-semibold">
                  {item.card.info.name}
                </span>
                <span
                  className={`ml-3 inline-block   rounded-full ${
                    item.card.info.itemAttribute.vegClassifier === "VEG"
                      ? "border-green-600 text-green-900 bg-green-500" // Green border and text for Veg
                      : "border-red-600 text-red-600 bg-red-600" // Red border and text for Non-Veg
                  }`}
                  style={{ width: "10px", height: "10px" }}
                >
                  {" "}
                </span>
                <div className="text-base font-medium">
                  Rs{" "}
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}
                </div>
              </div>
              {/* Ensure the paragraph wraps and line-clamps properly */}
              <p className="text-xs line-clamp-3 break-words text-gray-500 dark:text-gray-300  ">
                {item.card.info.description}
              </p>
            </div>

            {/* Fix the image size here */}
            <div className="relative w-32 h-24 rounded-2xl overflow-hidden">
              <img
                src={CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute font-bold bottom-0 hover:bg-green-300 left-1/2 transform -translate-x-1/2 bg-yellow-50 text-green-700 px-4 py-1 rounded-lg shadow-md">
                Add
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
