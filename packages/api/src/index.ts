// import { PrismaClient } from '@prisma/client';
// import connectRedis from 'connect-redis'
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, response, Response } from 'express';
// import Redis from 'ioredis'
import session from 'express-session';
import cors from 'cors';
import { last } from 'lodash';

import { __prod__, COOKIE_NAME, ALLOWED_DOMAINS } from './constants';
import { createUser, getUser, getUserByFirebaseId } from './endpoints/user';
import {
  createPurchase,
  deletePurchase,
  getPurchase,
  getPurchases,
  getPurchasesByUid,
  updatePurchase,
} from './endpoints/purchase';

import decodeIDToken from './authenticateToken';

// export const prisma = new PrismaClient()

// const RedisStore = connectRedis(session)
// const redis = new Redis(process.env.REDIS_URL!)

require('dotenv').config({
  path: `.env`,
});

const app = express();

app.set('trust proxy', 1);

export function createContext({
  req,
  res,
}: {
  req: Request;
  res: Response<any>;
}) {
  return {
    req,
    res,
    // prisma,
    // redis,
  };
}

function ensureAuthenticated(req: any, res: Response, next: NextFunction) {
  if (req.currentUser) {
    return next();
  } else {
    return res.send('Unauthorized Access');
  }
}

const main = async () => {
  app.use(decodeIDToken);

  // app.use((req, _, next) => {
  //   const cookie = req.headers.cookie;

  //   console.log('Request Headers:', req.headers);

  //   if (cookie) {
  //     try {
  //       const cookies = cookie.split(' ');
  //       const qid = last(cookies)!.split('=')[1];
  //       req.headers.cookie = `qid=${qid}`;
  //     } catch {}
  //   }

  //   return next();
  // });

  app.use(
    cors({
      origin: (
        requestOrigin: string | undefined,
        callback: (err: Error | null, allow?: boolean | undefined) => void
      ) => {
        // bypass the requests with no origin (like curl requests, mobile apps, etc )
        if (!requestOrigin) return callback(null, true);
        if (ALLOWED_DOMAINS.indexOf(requestOrigin) === -1) {
          const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );

  // app.use(
  //   session({
  //     name: COOKIE_NAME,
  //     // store: new RedisStore({
  //     //   client: redis,
  //     //   disableTouch: true,
  //     // }),
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  //       httpOnly: true,
  //       sameSite: 'lax', // csrf
  //     },
  //     saveUninitialized: false,
  //     secret: process.env.SESSION_SECRET!,
  //     resave: false,
  //   })
  // );

  // app.use(cookieParser());

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.post('/api/users', ensureAuthenticated, createUser);

  app.get('/api/users', ensureAuthenticated, getUser);

  app.get('/api/users/:firebaseId', ensureAuthenticated, getUserByFirebaseId);

  app.post('/api/purchases', ensureAuthenticated, createPurchase);

  // app.get('/api/purchases', ensureAuthenticated, getPurchases);

  app.get('/api/purchases/user/:uid', ensureAuthenticated, getPurchasesByUid);

  app.get('/api/purchases/:id', ensureAuthenticated, getPurchase);

  app.put('/api/purchases/:id', ensureAuthenticated, updatePurchase);

  app.delete('/api/purchases/:id', ensureAuthenticated, deletePurchase);

  app.set('trust proxy', 1);

  // server.applyMiddleware({
  //   app,
  //   cors: false,
  // })

  app.listen(process.env.PORT, () => {
    console.log(
      `🚀  Server ready at https://${process.env.DATABASE_URL}:${process.env.PORT}/`
    );
  });
};

main().catch((err) => {
  console.error(err);
});

export default app;
