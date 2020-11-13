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
insertData("Collaborators", null, myData.data.collaborators, 0);

// add comments to database
insertData("Comments", null, myData.data.comments, 0);
insertData("Comments", null, myData.data.comments, 1);

// add users to database
insertData("Users", myData.data.users[0].login.username, myData.data.users, 0);
insertData("Users", myData.data.users[1].login.username, myData.data.users, 1);
insertData("Users", myData.data.users[2].login.username, myData.data.users, 2);
insertData("Users", myData.data.users[3].login.username, myData.data.users, 3);

// add projects to database
insertData("Projects", myData.data.projects[0].projectName, myData.data.projects, 0);
insertData("Projects", myData.data.projects[1].projectName, myData.data.projects, 1);
insertData("Projects", myData.data.projects[2].projectName, myData.data.projects, 2);
insertData("Projects", myData.data.projects[3].projectName, myData.data.projects, 3);

// add tasks for  project 1
insertNestedData("Projects", myData.data.projects[0].projectName, "Tasks", myData.data.Tasks[0][0].taskName, myData.data.Tasks[0][0]);
insertNestedData("Projects", myData.data.projects[0].projectName, "Tasks", myData.data.Tasks[0][1].taskName, myData.data.Tasks[0][1]);
insertNestedData("Projects", myData.data.projects[0].projectName, "Tasks", myData.data.Tasks[0][2].taskName, myData.data.Tasks[0][2]);

// add tasks for project 2
insertNestedData("Projects", myData.data.projects[1].projectName, "Tasks", myData.data.Tasks[1][0].taskName, myData.data.Tasks[1][0]);
insertNestedData("Projects", myData.data.projects[1].projectName, "Tasks", myData.data.Tasks[1][1].taskName, myData.data.Tasks[1][1]);
insertNestedData("Projects", myData.data.projects[1].projectName, "Tasks", myData.data.Tasks[1][2].taskName, myData.data.Tasks[1][2]);

// add tasks for project 3
insertNestedData("Projects", myData.data.projects[2].projectName, "Tasks", myData.data.Tasks[2][0].taskName, myData.data.Tasks[2][0]);

// add tasks for project 4
insertNestedData("Projects", myData.data.projects[3].projectName, "Tasks", myData.data.Tasks[3][0].taskName, myData.data.Tasks[3][0]);
