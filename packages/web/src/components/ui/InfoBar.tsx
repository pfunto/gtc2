import 'twin.macro';
import 'styled-components/macro';
import { useAppSelector } from '../../app/hooks';
import { currencyFormatter } from '../Item/ItemButton';

type InfoBarCardProps = {
  title: string;
  content: string;
};

const InfoBarCard = ({ title, content }: InfoBarCardProps) => {
  return (
    <div tw="px-4 py-5 bg-gray-500 shadow rounded-lg overflow-hidden sm:p-6">
      <dt tw="text-sm font-medium text-gray-300 truncate">{title}</dt>
      <dd tw="mt-1 text-3xl font-semibold text-white">{content}</dd>
    </div>
  );
};

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
});

const InfoBar = () => {
  const calcInfo = useAppSelector((state) => state.calculation);
  const InfoBarData = [
    { title: 'Tax', content: percentFormatter.format(calcInfo.taxTip.tax) },
    { title: 'Tip', content: percentFormatter.format(calcInfo.taxTip.tip) },
    {
      title: 'Subtotal',
      content: currencyFormatter.format(calcInfo.subtotalCost),
    },
    { title: 'Total', content: currencyFormatter.format(calcInfo.finalCost) },
  ];
  return (
    <>
      <div tw="w-full">
        <dl tw="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
          {InfoBarData.map((data) => (
            <InfoBarCard
              key={data.title}
              title={data.title}
              content={data.content}
            />
          ))}
        </dl>
      </div>
    </>
  );
};

export default InfoBar;
