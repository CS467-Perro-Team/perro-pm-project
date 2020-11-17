const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
const hbs = require('handlebars');
const admin = require('firebase-admin');
const getMySecretKey = require('./secretKey');  // Comment out for deploy to firebase hosted domain
const { request, response } = require('express');
const bodyParser = require('body-parser');

const app = express();
//Set engine as handlebars
app.engine('hbs', engines.handlebars);
//Front end code will be in views folder
app.set('views', './views');
//Views will be hbs files
app.set('view engine', 'hbs');
//Parses incoming request bodies
app.use(bodyParser.json());

/*Replacement code for deploying to firebase hosted site*/
//Authorize your application to access your Firestore DB
//admin.initializeApp(functions.config().firebase);
/*Replacement code for deploying to firebase hosted site*/


//Replace this code block with replacement code above if deploying to firebase hosted domain
// set up authentication with local environment
const serviceAccount = require(getMySecretKey());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://perro-pm-project.firebaseio.com"
});
//Replace this code block with replacement code above

const firestoreCon = admin.firestore();

const giveAListOfDocuments = (collection) => {
    const listOfDocs = [];
    collection.forEach( doc => {
        listOfDocs.push(doc.data());
    })
    return listOfDocs;
}


/**  Query functions  **/
/**
 *  Functions to add data to the database
 */
const insertData = async (collectionName, docName, data) => {
    if (docName === null) {
        await firestoreCon.collection(collectionName).doc().set(data);
    } else {
        await firestoreCon.collection(collectionName).doc(docName).set(data);
    }
}
/*
@desc Retrieves data from the database by requesting the collection and the document
@param  collectionName - The name of a collection in Firestore DB
        docName - The name of the document in the collection
@return object - contains the document data
*/
async function getFirestore(collectionName, docName) {
    const result = firestoreCon.collection(collectionName).doc(docName).get().then(doc =>{
        if (!doc.exists) {
            console.log('No such document!');
            return;
        } else {
            return doc.data();
            
        }
    }).catch( err => {
        console.log('Error getting document', err);
            return;
    });
    return result
}


async function getCollection(collectionName) {
    const collectRef = firestoreCon.collection(collectionName);
    const docList = await collectRef.get();
    const listOfDocs = [];
    docList.forEach( doc => {
        listOfDocs.push(doc.data());
    })
    return listOfDocs;
}


async function getTaskListFromAProject(projectName) {
    const projectsRef = firestoreCon.collection('Projects');
    const tasks = await projectsRef.where('projectName','==', projectName).get()
    let projID = "Nope";
    tasks.forEach( task => {
        projID = task.id;
    })
    // get the tasks collection
    const taskCollection = await projectsRef.doc(projID).collection('Tasks').get();
    const taskList = giveAListOfDocuments(taskCollection);
    return taskList;
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
app.get('/', async(request, response) => {//will be login page
    const dbProjects = await getFirestore('Projects', 'project');
    const dbUser = await getFirestore('Users', 'user');
    const dbTasks = await getFirestore('Tasks','task1');
    const userRole = userRoles(dbUser);
    response.render('index', {dbProjects, dbUser, userRole,dbTasks});
});

app.get('/task',async(request,response) =>{
    const dbProjects = await getFirestore('Projects','Better Firestore Project');
    const dbUser = await getFirestore('Users','user');
    const dbTasks = await getFirestore('Tasks','task1');
    const dbComments = await getFirestore('Comments','comment1');
    const userRole = userRoles(dbUser);
    response.render('task',{dbProjects,dbUser,userRole,dbTasks,dbComments});
});

app.get('/createTask',async(request,response) =>{
    const dbProjects = await getFirestore('Projects','Better Firestore Project');
    const dbUser = await getFirestore('Users','user');
    const userRole =userRoles(dbUser);
    response.render('createTask',{dbProjects,dbUser,userRole});
});
app.post('/createTask', (request, response) =>{
    let data = request.body;
    // add the empty team array to the project
    data["team"] = [];
    // add the data to the database
    //insertData("Projects", data.projectName, data);
    response.redirect("/task");
});
// create an object for the table in project list view
const createObjectForProjectListView = (projName, taskList) => {
        let totalTasks = taskList.length;
        // get completed tasks count
        let count = 0;
        for (let i = 0; i < taskList.length; ++i) {
            if (taskList[i].completed) {
                count += 1;
            }
        }
        let completedTaskCount = count;
        let remainingTasks = totalTasks - completedTaskCount;
        let percentComplete = 0;
        if (totalTasks !== 0) {
            percentComplete = (completedTaskCount / totalTasks) * 100;
            percentComplete = parseInt(percentComplete);
        }
        // encapsulate in an object
        const projectListView = {
            name: projName,
            totalTasks: totalTasks,
            completedTasks:  completedTaskCount,
            remainingTasks: remainingTasks,
            complete: percentComplete
        }
        return projectListView;
}

/** The Project List view */
app.get('/projectList',async(request,response) =>{
    const dbUser = await getFirestore('Users','user');
    const userRole =userRoles(dbUser);
    const projectList = await getCollection('Projects');
    let projectRows = {};
    const projectTable = [];
    const taskList = [];
    for (const project of projectList) {
        taskList.push(getTaskListFromAProject(project.projectName));
    }
    const taskCollection = await Promise.all(taskList);
    for (let i = 0; i < projectList.length; ++i) {
        projectRows = createObjectForProjectListView(projectList[i].projectName, taskCollection[i]);
        projectTable.push(projectRows);
    }
    response.render('projectList',{dbUser,userRole,projectTable});
});

/** The Single Project Summary view */
app.get('/projectSummary',async(request,response) =>{
    const dbProjects = await getFirestore('Projects','Better Firestore Project');  //add reference for chosen project
    const dbUser = await getFirestore('Users','user'); // add variable to pull in user logged in
    const dbTasks = await getTaskListFromAProject(dbProjects.projectName); // should return all tasks for this project
    const userRole = userRoles(dbUser);
    response.render('projectSummary',{dbProjects,dbUser,userRole,dbTasks});
});

/** The Single Project Tracking view */
app.get('/projectTracking',async(request,response) =>{
    const dbProjects = await getFirestore('Projects','Better Firestore Project'); //add reference for chosen project
    const dbUser = await getFirestore('Users','user'); // add variable to pull in user logged in
    const dbTasks = await getTaskListFromAProject(dbProjects.projectName); // should return all tasks for this project
    const userRole =userRoles(dbUser);
    response.render('projectTracking',{dbProjects,dbUser,userRole,dbTasks});
});

/** The Create Project List view */
app.get('/createProject',async(request,response) =>{
    const dbUser = await getFirestore('Users','user');
    const userRole =userRoles(dbUser);
    response.render('createProject',{dbUser,userRole});
});

app.post('/createProject', (request, response) =>{
    let data = request.body;
    // add the empty team array to the project
    data["team"] = [];
    // add the data to the database
    insertData("Projects", data.projectName, data);
    response.redirect("/projectList");
});

app.get('/siteMap',(request,response) =>{
    response.render('siteMap');
});
exports.app = functions.https.onRequest(app);