import api from '../app/api';
import { PurchaseState } from '../app/store';

export interface Purchase {
  id: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  state: PurchaseState;
}

export interface CreatePurchasePayload {
  state: PurchaseState;
  userId: string;
  title: string;
}

async function getUserPurchase(purchaseId: string): Promise<Purchase> {
  return await api.get(`/purchases/${purchaseId}`);
}

async function getPurchasesByUid(uid: string): Promise<Purchase[]> {
  const response = await api.get(`/purchases/user/${uid}`);
  return response.data;
}

async function createPurchase({ state, userId, title }: CreatePurchasePayload) {
  return await api.post(`/purchases`, { state, userId, title });
}

export { getUserPurchase, getPurchasesByUid, createPurchase };
