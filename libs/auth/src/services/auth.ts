import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import * as firebase from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { NotifyService } from './notify'


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  username?: string;
  lastLogin?: Date
}


@Injectable()
export class AuthService {
  account_id: string; // current user uid

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService ) {

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.account_id = user.uid;
          this.updateOnConnect();
          return this.afs.doc<User>(`accounts/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })
  }


  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.setUserDoc(user) // create initial user document
      })
      .catch(error => this.handleError(error) );
  }

  // Update properties on the user document

  updateUser(user: User, data: any) {
    return this.afs.doc(`accounts/${user.uid}`).update(data).then(

    )
  }

  /// Helper to perform the update in Firebase

  private updateStatus(status: string) {
    if (!this.account_id) return;
    console.log('logged in update status method')

    const doc = this.afs.doc(`accounts/${this.account_id}`);
    doc.update({ status: status })
  }

  /// Updates status when connection to Firebase starts
  private updateOnConnect() {
    const docData: Observable<any> = this.afs.doc('.info/connected').valueChanges();

    return docData
      .do(connected => {
        const status = connected.$value ? 'online' : 'offline';
        console.log('logged in update on connect method')

        this.updateStatus(status)
      })
      .subscribe()
  }




  // If error, console log and notify user
  private handleError(error) {
    console.error(error)

    this.notify.update(error.message, 'error')
  }

  // Sets user data to firestore after succesful login
  private setUserDoc(user) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`accounts/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      photoURL: 'https://goo.gl/Fz9nrQ'
    }

    return userRef.set(data)

  }

  /// Additional useful methods, not used in video
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        this.router.navigate(['accounts/', user.uid])
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }


  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error) )
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }



  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.setUserDoc(credential.user)
      })
      .catch(error => this.handleError(error) );
  }

  linkGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().currentUser.linkWithPopup(provider)
  }

  linkFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().currentUser.linkWithPopup(provider)
  }


  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`accounts/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: new Date()
    }

    return userRef.set(data, { merge: true })

  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.setUserDoc(user) // if using firestore
      })
      .catch(error => this.handleError(error) );
  }
}
