import { useAppDispatch, useAppSelector } from '../../app/hooks';
import 'twin.macro';
import { joinPurchaserItem } from '../Purchaser/purchaserItemSlice';

interface ItemListProps {
  purchaserId: string;
}

const ItemList = ({ purchaserId }: ItemListProps) => {
  const items = useAppSelector((state) => state.item);
  const dispatch = useAppDispatch();

  return (
    <div tw="grid grid-cols-2 gap-1 w-3/5 m-auto bg-gray-100">
      {Object.entries(items.byId).map(([key, value]) => {
        const { id, name, price } = value;
        return (
          <button
            key={key}
            tw="flex flex-col items-center"
            onClick={() => {
              dispatch(
                joinPurchaserItem({ purchaserId: purchaserId, itemId: id })
              );
            }}
          >
            id: {id} name: {name} price: {price}
          </button>
        );
      })}
    </div>
  );
};

export default ItemList;
