// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "config/firebase.config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export class FirebaseAuthService {
// Initialize Firebase
    private config = firebaseConfig 
    
    private firebaseApp = initializeApp(this.config)
// Initialize Firebase Authentication and get a reference to the service
    private auth = getAuth(this.firebaseApp)


    async signupWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        console.log('inside firebase service');
        console.log(email, password);
        
        
        return await createUserWithEmailAndPassword(this.auth, email, password)
    }

    async signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        
        return await signInWithEmailAndPassword(this.auth, email, password)
    }

}


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);