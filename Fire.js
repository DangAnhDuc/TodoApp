/* eslint-disable prettier/prettier */
import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDvnrSIFoZ6066h_RBcjj5m1rnxios6xOk',
    authDomain: 'chatapp-20cba.firebaseapp.com',
    databaseURL: 'https://chatapp-20cba.firebaseio.com',
    projectId: 'chatapp-20cba',
    storageBucket: 'chatapp-20cba.appspot.com',
    messagingSenderId: '1029882739711',
    appId: '1:1029882739711:web:5231138d64e1d3a320c5ca',
};
class Fire {

    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch((error) => {
                        callback(error);
                    });
            }
        });
    }

    getLists(callback) {
        let ref = firebase.firestore().collection('users').doc(this.userId).collection('lists');

        this.unsubscribe = ref.onSnapshot(
            snapshot => {
                let lists = [];
                snapshot.forEach(doc => {
                    console.log(`doc:${doc}`)
                    lists.push({ id: doc.id, ...doc.data() });
                });

                callback(lists);
            }
        );
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    detach(){
        this.unsubscribe();
    }
}

export default Fire;
