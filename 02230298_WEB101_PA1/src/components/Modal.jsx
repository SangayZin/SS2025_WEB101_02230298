// components/Modal.js

const Modal = ({ recipe, onClose }) => {
    if (!recipe) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-full">
          <h3 className="text-2xl font-bold">{recipe.title}</h3>
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-40 object-cover rounded-md mt-4"
          />
          <p className="mt-4">{recipe.description}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  