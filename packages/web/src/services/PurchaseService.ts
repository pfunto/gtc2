import api from '../app/api';
import { PurchaseState } from '../app/store';

interface PurchaseResponse {
  id: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  state: PurchaseState;
}

async function getUserPurchase(purchaseId: string): Promise<PurchaseResponse> {
  return await api.get(`/purchases/${purchaseId}`);
}

async function createPurchase(state: PurchaseState, userId: string) {
  return await api.post(`/purchases`, { state, userId });
}

export { getUserPurchase, createPurchase };
