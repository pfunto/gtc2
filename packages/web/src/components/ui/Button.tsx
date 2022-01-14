import 'twin.macro';
import 'styled-components/macro';
import { useNavigate } from 'react-router';

interface ButtonProps {
  link: string;
  text: string;
}

const Button = ({ link, text }: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(link);
        // then clear state
      }}
      tw="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ml-1"
    >
      {text}
    </button>
  );
};

export default Button;
