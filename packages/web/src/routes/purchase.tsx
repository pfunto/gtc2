import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch } from "../app/hooks";

import { PurchaseState } from "../app/store";
import { initializeBuyers } from "../components/Buyer/buyerSlice";
import { initializeItems } from "../components/Item/itemSlice";
import { initializeBuyerItem } from "../components/Buyer/buyerItemSlice";
import CalculationForm from "../modules/CalculationForm";
import axios from "axios";

interface PurchaseResponse {
  id: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  state: PurchaseState;
}

async function getUserPurchase(purchaseId: string): Promise<PurchaseResponse> {
  return await axios.get(`http://localhost:8888/api/purchases/${purchaseId}`);
}

const Purchase = () => {
  const dispatch = useAppDispatch();
  let { purchaseId } = useParams();

  useEffect(() => {
    if (purchaseId) {
      getUserPurchase(purchaseId)
        .then((response) => {
          dispatch(initializeBuyers(response.state.buyer));
          dispatch(initializeItems(response.state.item));
          dispatch(initializeBuyerItem(response.state.buyerItem));
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, purchaseId]);

  return <CalculationForm />;
};

export default Purchase;
