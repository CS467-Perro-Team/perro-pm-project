// Set up the database
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getMySecretKey = require('../secretKey');  // You need to make your own module
const myData = require('./sampleData')


// set up authentication with local environment

const serviceAccount = require(getMySecretKey());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://perro-pm-project.firebaseio.com"
});

const firestoreDB = admin.firestore();


/**
 *  Functions to add data to the database
 */
const insertData = async (collectionName, docName, objCollect, index) => {
    if (docName === null) {
        await firestoreDB.collection(collectionName).doc().set(objCollect[index]);
    } else {
        await firestoreDB.collection(collectionName).doc(docName).set(objCollect[index]);
    }
}

const insertNestedData = async (parentCollection, parentDocID, collectionName, docName, data) => {
    await firestoreDB.collection(parentCollection).doc(parentDocID).collection(collectionName).doc(docName).set(data);
}

// add collaborators to database
insertData("Collaborators", null, myData.data.collaborator, 0);

// add comments to database
insertData("Comments", null, myData.data.comment, 0);
insertData("Comments", null, myData.data.comment, 1);

// add users to database
insertData("Users", myData.data.user[0].login.username, myData.data.user, 0);
insertData("Users", myData.data.user[1].login.username, myData.data.user, 1);
insertData("Users", myData.data.user[2].login.username, myData.data.user, 2);
insertData("Users", myData.data.user[3].login.username, myData.data.user, 3);

// add projects to database
insertData("Projects", myData.data.project[0].projectName, myData.data.project, 0);
insertData("Projects", myData.data.project[1].projectName, myData.data.project, 1);
insertData("Projects", myData.data.project[2].projectName, myData.data.project, 2);
insertData("Projects", myData.data.project[3].projectName, myData.data.project, 3);

// add tasks for  project 1
insertNestedData("Projects", myData.data.project[0].projectName, "Tasks", myData.data.Task[0][0].taskName, myData.data.Task[0][0]);
insertNestedData("Projects", myData.data.project[0].projectName, "Tasks", myData.data.Task[0][1].taskName, myData.data.Task[0][1]);
insertNestedData("Projects", myData.data.project[0].projectName, "Tasks", myData.data.Task[0][2].taskName, myData.data.Task[0][2]);

// add tasks for project 2
insertNestedData("Projects", myData.data.project[1].projectName, "Tasks", myData.data.Task[1][0].taskName, myData.data.Task[1][0]);
insertNestedData("Projects", myData.data.project[1].projectName, "Tasks", myData.data.Task[1][1].taskName, myData.data.Task[1][1]);
insertNestedData("Projects", myData.data.project[1].projectName, "Tasks", myData.data.Task[1][2].taskName, myData.data.Task[1][2]);

// add tasks for project 3
insertNestedData("Projects", myData.data.project[2].projectName, "Tasks", myData.data.Task[2][0].taskName, myData.data.Task[2][0]);

// add tasks for project 4
insertNestedData("Projects", myData.data.project[3].projectName, "Tasks", myData.data.Task[3][0].taskName, myData.data.Task[3][0]);
