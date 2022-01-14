import 'twin.macro';
import 'styled-components/macro';
import PurchaseHistory from '../Purchase/PurchaseHistory';
import Button from './Button';
// import { PlusSmIcon } from '@heroicons/react/solid';

const Home = () => {
  return (
    <>
      <div tw="flex flex-col items-center">
        <Button link="/purchases/create-purchase" text="Create Purchase" />
        <PurchaseHistory />
      </div>
    </>
  );
};

export default Home;
