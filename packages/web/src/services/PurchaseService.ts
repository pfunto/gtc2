import api from '../app/api';
import { PurchaseState } from '../app/store';

export interface Purchase {
  id: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  state: PurchaseState;
  title: string;
}

export interface CreatePurchasePayload {
  state: PurchaseState;
  userId: string;
  title: string;
}

interface UpdatePurchasePayload {
  state: PurchaseState;
  title: string;
}

async function getUserPurchase(purchaseId: string): Promise<Purchase> {
  const response = await api.get(`/purchases/${purchaseId}`);
  return response.data;
}

async function getPurchasesByUid(uid: string): Promise<Purchase[]> {
  const response = await api.get(`/purchases/user/${uid}`);
  return response.data;
}

async function createPurchase({ state, userId, title }: CreatePurchasePayload) {
  return await api.post(`/purchases`, { state, userId, title });
}

async function updatePurchase(
  purchaseId: string,
  { state, title }: UpdatePurchasePayload
) {
  return await api.put(`/purchases/${purchaseId}`, { state, title });
}

async function deletePurchase(purchaseId: string) {
  return await api.delete(`/purchases/${purchaseId}`);
}

export {
  getUserPurchase,
  getPurchasesByUid,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
