import { useAppSelector } from '../../app/hooks';
import 'twin.macro';
import 'styled-components/macro';
import BuyerButton from './BuyerButton';

interface BuyerListProps {
  itemId: string;
}

const BuyerList = ({ itemId }: BuyerListProps) => {
  const buyers = useAppSelector((state) => state.buyer);

  return (
    <div tw="grid grid-cols-2 gap-1 w-full m-auto p-8">
      {Object.entries(buyers.byId).map(([key, buyer]) => {
        return <BuyerButton key={key} itemId={itemId} buyer={buyer} />;
      })}
    </div>
  );
};

export default BuyerList;
