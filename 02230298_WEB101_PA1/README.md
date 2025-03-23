# AllRecipe 

This is a web application that allows users to browse a list of recipes, search for recipes by title, view detailed recipes, and add them to their favorites. The app features a sidebar for easy navigation, a search bar for filtering recipes, and a modal for displaying more information about selected recipes.

## Features

- **Recipe List**: Displays a list of recipes, each with a title, description, and an image.
- **Search Functionality**: Allows users to filter recipes by title using a search bar.
- **Favorites**: Users can mark recipes as favorites, and these will be displayed separately from all other recipes.
- **Recipe Modal**: Clicking on a recipe brings up a modal with more details about the recipe.
- **Sidebar Navigation**: Includes a sidebar with a home link for easy navigation.

## Functionality

### 1. Sidebar
The sidebar provides easy access to the homepage of the application. It is responsive, showing a compact version for mobile and a more detailed version for desktop.

### 2. Search Bar
The search bar allows users to search for recipes by title. As the user types, the displayed recipes are filtered based on the query.

### 3. Recipe List
A grid layout is used to display the list of recipes. Each recipe displays its title, description, and an image. The recipes are pulled from a static dataset.

### 4. Recipe Modal
When a user clicks on a recipe, a modal appears showing more detailed information about the recipe. This modal can be closed by clicking outside the modal or using a close button.

### 5. Favorites Toggle
Users can toggle between viewing all recipes or just their favorite recipes. A favorite recipe is added by clicking the "Like" button, and it can be removed by clicking the same button again.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For managing routing between different components and views.
- **Tailwind CSS**: A utility-first CSS framework used for styling the app.
- **Lucide Icons**: For simple, scalable vector icons used in the sidebar.

