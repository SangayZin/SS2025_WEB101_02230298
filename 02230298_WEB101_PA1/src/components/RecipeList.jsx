// components/RecipeList.js

import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, onClick, onLike, favorites }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          {...recipe}
          onClick={onClick}
          onLike={onLike}
          isLiked={favorites.includes(recipe.title)}
        />
      ))}
    </div>
  );
};

export default RecipeList;
