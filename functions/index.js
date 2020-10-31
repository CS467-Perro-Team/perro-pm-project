const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
const hbs = require('handlebars');
const admin = require('firebase-admin');
const getMySecretKey = require('./secretKey');  // You need to make your own module

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

// set up authentication with local environment
const serviceAccount = require(getMySecretKey());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://perro-pm-project.firebaseio.com"
});



/**  Query functions  **/
async function getFirestore() {
    const firestore_con = await admin.firestore();
    const result = firestore_con.collection('Projects').doc('project').get().then(doc =>{
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            return doc.data();
        }
    }).catch( err => {
        console.log('Error getting document', err);
    });
    return result
}



/** Routes */
app.get('/', async(request, response) => {
    const db_result = await getFirestore();
    response.render('index', {db_result});
});

exports.app = functions.https.onRequest(app)