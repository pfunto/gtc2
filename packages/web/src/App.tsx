import React, { useEffect } from 'react';
import 'twin.macro';
import Counter from './components/counter/Counter';
import AddPurchaser from './components/PurchaserMenu/AddPurchaser';
import AddItem from './components/ItemMenu/AddItem';

// import ky from 'ky';

async function getHealth() {
  const json = await ky.get('http://localhost:8888/api/health').json();

  console.log(json);
}
const App = () => {
  useEffect(() => {
    // getHealth()
  });

  return (
    <div tw="text-red-500 text-2xl">
      hello world
      <Counter />
      <AddPurchaser />
      <AddItem />
    </div>
  );
};

export default App;
