// import { useAppSelector } from '../app/hooks';
import CalculationInputs from '../components/Calculation/CalculationInputs';

const Calculation = () => {
  // const allIds = useAppSelector((state) => state.purchaserItem.allIds);

  return (
    <main>
      <h2>Calculation</h2>
      <CalculationInputs />
    </main>
  );
};

export default Calculation;
