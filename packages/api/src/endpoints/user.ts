import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
      },
    });
    res.send(user);
  } catch (e) {
    console.log(e);
  }
}

export async function getUser(_req: Request, res: Response) {
  res.send('get user');
}
