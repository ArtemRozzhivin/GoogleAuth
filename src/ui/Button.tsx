const Button = ({ children, onClick }) => {
  return (
    <button
      className='bg-[#039ef4] text-white p-2 rounded-md hover:bg-[#0063a9] transition-all'
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
