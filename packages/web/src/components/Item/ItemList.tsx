import { useAppSelector } from '../../app/hooks';
import 'twin.macro';
import ItemButton from './ItemButton';

interface ItemListProps {
  purchaserId: string;
}

const ItemList = ({ purchaserId }: ItemListProps) => {
  const items = useAppSelector((state) => state.item);

  return (
    <div tw="grid grid-cols-2 gap-1 w-3/5 m-auto">
      {Object.entries(items.byId).map(([key, item]) => {
        return (
          <>
            <ItemButton key={key} purchaserId={purchaserId} item={item} />
          </>
        );
      })}
    </div>
  );
};

export default ItemList;
