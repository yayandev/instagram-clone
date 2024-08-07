const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-gray-100 text-black px-3 py-2 rounded-md hover:bg-gray-200 font-semibold text-sm ${props?.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
