// pages/HomePage.js

import React, { useState } from "react";
import RecipeList from "../components/RecipeList";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";
import FavoritesToggle from "../components/FavoritesToggle";
import Button from "../components/Button";

const HomePage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to track selected recipe
  const [favorites, setFavorites] = useState([]); // State to track liked recipes
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [showFavorites, setShowFavorites] = useState(false); // State to toggle between all recipes and favorites

  // Static data for recipes
  const recipes = [
    { title: "Ema Datsi", description: "A national Bhutenese dish with a spicy chilli, cheese, onion and tomato.", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HhKhZMi3rZLUGVIvKMgi-iYwLwGebrwkZQ&s" },
    { title: "Kewa Datshi", description: "Kewa Datshi, literally meaning potatoes and cheese, is a traditional Bhutanese dish made with chiles.", imageUrl: "../kewadatsi.png"},
    { title: "Shakam Datshi", description: "Shakam in Bhutanese dried beef, which is among the most famous of meats and its made with red chilli, onions, feta cheese.", imageUrl: "../shakam.png" },
    { title: "Sikam Phaksha Paa", description: "Sikam Phaksha Paa is a traditional Bhutanese dish made with pork and a variety of spices.", imageUrl: "../sikam.png" },
    { title: "Colcannon Potatoes", description: "A traditional Irish dish made with creamy mashed potatoes mixed with sautéed cabbage or kale and scallions.", imageUrl: "../colcanon.png" },
    { title: "Jollof Rice", description: "A popular West African dish made with rice cooked in a flavorful tomato sauce, and spices.", imageUrl: "../jollof.png" },
    { title: "Samosa Chaat", description: "A delicious Indian street food made with crispy samosas topped with yogurt, tamarind chutney, and spices.", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROCfaJvRHIJImIgLom9R_oOi3834kjz0m5IA&s" },
    { title: "Lahmacun", description: "A Turkish flatbread topped with minced meat, vegetables, and spices, baked until crispy.", imageUrl: "../lhachmo.png" },
    { title: "Poutine", description: "A Canadian comfort food consisting of fries topped with cheese curds and smothered in gravy.", imageUrl: "../poutine.png" },
    { title: "Peanut Butter Soup", description: "A creamy and hearty soup from West Africa made with peanut butter, vegetables, and spices.", imageUrl: "../peanut.png" },
    { title: "Orecchiette with Broccoli Rabe", description: "An Italian pasta dish featuring orecchiette (ear-shaped pasta) tossed with sautéed broccoli rabe, garlic, and olive oil.", imageUrl: "../brocoli.png" },
    { title: "Sushi Rolls", description: "Rice, fish, and veggies wrapped in seaweed.", imageUrl: "../sushi.png" },
    { title: "Biryani", description: "A fragrant rice dish layered with marinated meat (like chicken or lamb) and spices.", imageUrl: "../biryani.png" },
    { title: "Ceviche", description: "A refreshing dish of marinated raw fish, typically mixed with lime juice, onions, and cilantro.", imageUrl: "../ceviche.png" },
    { title: "Kimchi Fried Rice", description: "A Korean dish made with leftover rice stir-fried with kimchi, vegetables, and often topped with a fried egg.", imageUrl: "../kimchi.png" },
    { title: "Ratatouille", description: "A French vegetable stew made with eggplant, zucchini, bell peppers, and tomatoes.", imageUrl: "../rata.png" },
    { title: "Baklava", description: "A sweet pastry made of layers of filo dough filled with nuts and sweetened with honey syrup.", imageUrl: "../baklava.png" },
    { title: "Steak Frites", description: "A classic French dish with steak and fries.", imageUrl: "../streak.png" },
  ];

  // Handles the search query change
  const handleSearchChange = (query) => setSearchQuery(query);

  // Handles viewing recipe details
  const handleViewRecipe = (title) => {
    const recipe = recipes.find((recipe) => recipe.title === title);
    setSelectedRecipe(recipe);
  };

  // Handles liking or unliking a recipe
  const handleLike = (title) => {
    if (favorites.includes(title)) {
      setFavorites(favorites.filter((fav) => fav !== title)); // Remove from favorites
    } else {
      setFavorites([...favorites, title]); // Add to favorites
    }
  };

  // Handles closing the modal
  const closeModal = () => {
    setSelectedRecipe(null);
  };

  // Filters recipes based on search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filters recipes to show favorites or all
  const recipesToDisplay = showFavorites ? recipes.filter((recipe) => favorites.includes(recipe.title)) : filteredRecipes;

  return (
    <div className="p-6">
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <FavoritesToggle onToggle={() => setShowFavorites(!showFavorites)} showFavorites={showFavorites} />
      <RecipeList recipes={recipesToDisplay} onClick={handleViewRecipe} onLike={handleLike} favorites={favorites} />
      <Modal recipe={selectedRecipe} onClose={closeModal} />
    </div>
  );
};

export default HomePage;
