import { useAppSelector } from '../../app/hooks';
import 'twin.macro';
import PurchaserButton from './PurchaserButton';

interface PurchaserListProps {
  itemId: string;
}

const PurchaserList = ({ itemId }: PurchaserListProps) => {
  const purchasers = useAppSelector((state) => state.purchaser);

  return (
    <div tw="grid grid-cols-2 gap-1 w-3/5 m-auto">
      {Object.entries(purchasers.byId).map(([key, purchaser]) => {
        return (
          <>
            <PurchaserButton key={key} itemId={itemId} purchaser={purchaser} />
          </>
        );
      })}
    </div>
  );
};

export default PurchaserList;
