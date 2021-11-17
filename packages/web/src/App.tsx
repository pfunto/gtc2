import React, { useEffect } from 'react';
import 'twin.macro';
import { Link } from 'react-router-dom';
import AddPurchaser from './components/Purchaser/AddPurchaser';
import AddItem from './components/Item/AddItem';

// import ky from 'ky';

// async function getHealth() {
//   const json = await ky.get('http://localhost:8888/api/health').json();

//   console.log(json);
// }
const App = () => {
  useEffect(() => {
    // getHealth()
  });

  return (
    <div tw="text-red-500 text-2xl">
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/purchasers">Purchasers</Link> |{' '}
      </nav>
      <AddPurchaser />
      <AddItem />
    </div>
  );
};

export default App;
