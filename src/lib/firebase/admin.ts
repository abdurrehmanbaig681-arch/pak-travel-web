import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

let adminApp: App | undefined;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "paktravel123-615b0";
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (clientEmail && privateKey) {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  // Fallback initialization without explicit service account key (uses default or project id)
  return initializeApp({
    projectId,
  });
}

export function getAdminFirestore(): Firestore {
  const app = getAdminApp();
  return getFirestore(app);
}

export function getAdminAuth(): Auth {
  const app = getAdminApp();
  return getAuth(app);
}
