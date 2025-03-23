// components/FavoritesToggle.js

import Button from "./Button";

const FavoritesToggle = ({ onToggle, showFavorites }) => {
  return (
    <Button
      onClick={onToggle}
      label={showFavorites ? "View All Recipes" : "View Favorites"}
      className="bg-blue-500 text-white hover:bg-blue-600"
    />
  );
};

export default FavoritesToggle;
