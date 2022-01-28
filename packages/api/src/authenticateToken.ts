// authenticateToken.ts

import admin from 'firebase-admin';
import { NextFunction, Request, Response } from 'express';
const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function decodeIDToken(req: any, _: Response, next: NextFunction) {
  const header = req.headers?.authorization;
  if (
    header !== 'Bearer null' &&
    req.headers?.authorization?.startsWith('Bearer ')
  ) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (e) {
      console.log('Error', e);
    }
  }
  next();
}

export default decodeIDToken;
