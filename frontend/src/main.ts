import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

if (environment.production) {
  enableProdMode();
}


//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkVu5BPoDu4PFwsh3PC4dNpmQtvuxLmEk",
  authDomain: "telefood-4ee40.firebaseapp.com",
  projectId: "telefood-4ee40",
  storageBucket: "telefood-4ee40.appspot.com",
  messagingSenderId: "911542091772",
  appId: "1:911542091772:web:a374e88f975d9ee78a3c79",
  measurementId: "G-Q8V5DHYWZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


