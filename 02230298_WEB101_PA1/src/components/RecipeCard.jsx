// components/RecipeCard.js

const RecipeCard = ({ title, description, imageUrl, onClick, onLike, isLiked }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md bg-white`}>
      <img
        src={imageUrl || "https://via.placeholder.com/300"}
        alt={title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="font-bold text-xl mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="mt-3">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => onClick(title)} // Trigger the onClick function when clicked
        >
          View Recipe
        </button>
        <button
          className={`px-4 py-2 ml-2 ${isLiked ? "bg-red-500" : "bg-gray-500"} text-white rounded-md hover:bg-${isLiked ? "red-600" : "gray-600"}`}
          onClick={() => onLike(title)} // Trigger the like function when clicked
        >
          {isLiked ? "Liked" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
