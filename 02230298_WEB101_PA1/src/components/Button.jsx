// components/Button.js

const Button = ({ onClick, label, className }) => {
    return (
      <button
        onClick={onClick}
        className={`px-6 py-2 rounded-md transition-colors ${className}`}
      >
        {label}
      </button>
    );
  };
  
  export default Button;
  