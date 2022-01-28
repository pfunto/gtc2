import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function createPurchase(req: Request, res: Response) {
  try {
    const purchase = await prisma.purchase.create({
      data: {
        state: req.body.state,
        userId: req.body.userId,
        title: req.body.title,
      },
    });

    res.send(purchase);
  } catch (e) {
    console.log(e);
  }
}

export async function getPurchasesByUid(req: Request, res: Response) {
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: req.params.uid,
      },
    });

    if (purchases) res.status(200).send(purchases);
    else res.status(500);
  } catch (e) {
    console.log(e);
  }
}

export async function getPurchase(req: Request, res: Response) {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.send(purchase);
  } catch (e) {
    console.log(e);
  }
}

export async function updatePurchase(req: Request, res: Response) {
  try {
    const purchase = await prisma.purchase.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: { state: req.body.state, title: req.body.title },
    });

    res.send(purchase);
  } catch (e) {
    console.log(e);
  }
}

export async function deletePurchase(req: Request, res: Response) {
  try {
    const purchase = await prisma.purchase.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.send(purchase);
  } catch (e) {
    console.log(e);
  }
}
