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
/*
@desc Retrieves data from the database by requesting the collection and the document
@param  collectionName - The name of a collection in Firestore DB
        docName - The name of the document in the collection
@return object - contains the document data
*/
async function getFirestore(collectionName, docName) {
    const firestore_con = await admin.firestore();
    const result = firestore_con.collection(collectionName).doc(docName).get().then(doc =>{
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


/*
@desc  Determines the role of a user (project manager, project participant, or stakeholder) based on permission values
@param aUser - the document that contains a specific user's data
@return string - the role of a specific user
*/
const userRoles = (aUser) => {
    const permissions = aUser.Permission;
    let result;
    if (permissions.projectCreator) {
        result = "Project Manager";
    } else if (permissions.taskCreator && !permissions.projectCreator){
        result = "Project Participant";
    } else {
        return "Stakeholder";
    }
    return result;
}


/** Routes */
app.get('/', async(request, response) => {
    const dbResult = await getFirestore('Projects', 'project');
    const dbUser = await getFirestore('Users', 'user');
    const userRole = userRoles(dbUser);
    response.render('index', {dbResult, dbUser, userRole});
});

exports.app = functions.https.onRequest(app)