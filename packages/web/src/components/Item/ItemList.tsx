import { useAppSelector } from '../../app/hooks';
import 'twin.macro';
import 'styled-components/macro';
import ItemButton from './ItemButton';

interface ItemListProps {
  buyerId: string;
}

const ItemList = ({ buyerId }: ItemListProps) => {
  const items = useAppSelector((state) => state.item);

  return (
    <div tw="grid grid-cols-2 gap-2 w-full m-auto p-8">
      {Object.entries(items.byId).map(([key, item]) => {
        return <ItemButton key={key} buyerId={buyerId} item={item} />;
      })}
    </div>
  );
};

export default ItemList;
