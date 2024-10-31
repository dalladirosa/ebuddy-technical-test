import dotenv from 'dotenv';
import admin from 'firebase-admin';

import serviceAccount from '../ebuddy-technical-test-firebase-admin.json';

dotenv.config();

export const firebase = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    });
