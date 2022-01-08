import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { request } from 'http';

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        firebaseId: req.body.firebaseId,
      },
    });

    res.send(user);
  } catch (e) {
    console.log(e);
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.id,
      },
    });

    if (user) res.status(200).send(user);
    else res.status(500);
  } catch (e) {
    console.log(e);
  }
}

export async function getUserByFirebaseId(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        firebaseId: req.params.firebaseId,
      },
    });

    res.send(user);
  } catch (e) {
    console.log(e);
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: {
        email: req.body.email,
      },
    });

    res.send(user);
  } catch (e) {
    console.log(e);
  }
}
