import 'twin.macro';
import 'styled-components/macro';
import { useAppSelector } from '../../app/hooks';
import { currencyFormatter } from '../Item/ItemButton';

const InfoBar = () => {
  const calcInfo = useAppSelector((state) => state.calculation);
  return (
    <div>
      <h3 tw="text-lg leading-6 font-medium text-gray-900">Info</h3>
      <dl tw="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        {/* {stats.map((item) => ( */}
        <div tw="px-4 py-5 bg-green-700 shadow rounded-lg overflow-hidden sm:p-6">
          <dt tw="text-sm font-medium text-gray-300 truncate">Tax</dt>
          <dd tw="mt-1 text-3xl font-semibold text-white">
            {calcInfo.taxTip.tax * 100}%
          </dd>
        </div>

        <div tw="px-4 py-5 bg-green-700 shadow rounded-lg overflow-hidden sm:p-6">
          <dt tw="text-sm font-medium text-gray-300 truncate">Tip</dt>
          <dd tw="mt-1 text-3xl font-semibold text-white">
            {calcInfo.taxTip.tip * 100}%
          </dd>
        </div>

        <div tw="px-4 py-5 bg-green-700 shadow rounded-lg overflow-hidden sm:p-6">
          <dt tw="text-sm font-medium text-gray-300 truncate">Subtotal</dt>
          <dd tw="mt-1 text-3xl font-semibold text-white">
            {currencyFormatter.format(calcInfo.subtotalCost)}
          </dd>
        </div>

        <div tw="px-4 py-5 bg-green-700 shadow rounded-lg overflow-hidden sm:p-6">
          <dt tw="text-sm font-medium text-gray-300 truncate">Total</dt>
          <dd tw="mt-1 text-3xl font-semibold text-white">
            {currencyFormatter.format(calcInfo.finalCost)}
          </dd>
        </div>
        {/* // ))} */}
      </dl>
    </div>
  );
};

export default InfoBar;
