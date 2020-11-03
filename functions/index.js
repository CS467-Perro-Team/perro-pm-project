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


const firestoreCon = admin.firestore();



const giveAListOfDocuments = (collection) => {
    const listOfDocs = [];
    collection.forEach( doc => {
        listOfDocs.push(doc.data());
    })
    return listOfDocs;
}

/**  Query functions  **/
/*
@desc Retrieves data from the database by requesting the collection and the document
@param  collectionName - The name of a collection in Firestore DB
        docName - The name of the document in the collection
@return object - contains the document data
*/
async function getFirestore(collectionName, docName) {
    ///////const firestoreCon = await admin.firestore();
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
    /*
    const docList = firestoreCon.collection(collectionName).get().then(collect => {
        if (collect.empty) {
            console.log("The collection is empty!")
            return;
        }
    }).catch(err => {
        console.log('Error getting collection', err);
        return;
    })
    */
    docList.forEach( doc => {
        //console.log(doc.data());
        listOfDocs.push(doc.data());
    })
    //console.log(docList);
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
/** Routes */
app.get('/', async(request, response) => {//will be login page
    const dbProjects = await getFirestore('Projects', 'project');
    const dbUser = await getFirestore('Users', 'user');
    const dbTasks = await getFirestore('Tasks','task1');
    const userRole = userRoles(dbUser);
    response.render('index', {dbProjects, dbUser, userRole,dbTasks});
});

app.get('/task',async(request,response) =>{
    const dbProjects = await getFirestore('Projects','project');
    const dbUser = await getFirestore('Users','user');
    const dbTasks = await getFirestore('Tasks','task1');
    const dbComments = await getFirestore('Comments','comment1');
    const userRole =userRoles(dbUser);
    response.render('task',{dbProjects,dbUser,userRole,dbTasks,dbComments})
})

app.get('/createTask',async(request,response) =>{
    const dbProjects = await getFirestore('Projects','project');
    const dbUser = await getFirestore('Users','user');
    const userRole =userRoles(dbUser);
    response.render('createTask',{dbProjects,dbUser,userRole})
})

// create an object for the table in project list view
const createObjectForProjectListView = (projName, taskList) => {
        let totalTasks = taskList.length;
        // get completed tasks count
        let count = 0;
        /*
        for (let task in taskList) {
            console.log(task.completed);
            if (task.completed == true) {
                count += 1
            }
        }*/
        for (let i = 0; i < taskList.length; ++i) {
            if (taskList[i].completed) {
                count += 1;
            }
        }
        /*
        count += taskList.forEach( task => {
            if (task.completed) {
                return 1;
            }
            return 0;
        })*/
        let completedTaskCount = count;
        let remainingTasks = totalTasks - completedTaskCount;
        let percentComplete = 0;
        if (totalTasks != 0) {
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


app.get('/projectList',async(request,response) =>{
    ///const dbProjects = await getFirestore('Projects','project');
    const dbUser = await getFirestore('Users','user');
    //const dbTasks = await getFirestore('Tasks','task1');
    const userRole =userRoles(dbUser);
    const projectList = await getCollection('Projects');
    //////console.log("foo ->", projectList);
    let projectRows = {};
    const projectTable = [];
   /* projectList.forEach(async project => {
        console.log("project name ->", project.projectName);
        let taskList = await getTaskListFromAProject(project.projectName);
        ////console.log("bar ->", taskList);
        
        // create an object for the table in project list view
        let totalTasks = taskList.length;
        // get completed tasks count
        let count = 0;
        count += taskList.forEach( task => {
            if (task.completed) {
                return 1;
            }
            return 0;
        })
        let completedTaskCount = count
        
        let projectRows = createObjectForProjectListView(project.projectName, taskList);
        console.log(projectRows);
        projectTable.push(projectRows)
    })*/
    let taskList;
    for (let i = 0; i < projectList.length; ++i) {
        //////////console.log("project name ->", projectList[i].projectName);
        taskList = await getTaskListFromAProject(projectList[i].projectName);
        projectRows = createObjectForProjectListView(projectList[i].projectName, taskList);
        ///////console.log(projectRows);
        projectTable.push(projectRows)
    }
    console.log(projectTable)
    //////const bar = await getTaskListFromAProject(foo[0].projectName);
    ///console.log("bar ->", bar);
    ////response.render('projectList',{dbProjects,dbUser,userRole,dbTasks})
    response.render('projectList',{dbUser,userRole})
})

app.get('/projectSummary',async(request,response) =>{
    const dbProjects = await getFirestore('Projects','project');
    const dbUser = await getFirestore('Users','user');
    const dbTasks = await getFirestore('Tasks','task1');
    const userRole =userRoles(dbUser);
    response.render('projectSummary',{dbProjects,dbUser,userRole,dbTasks});
})

app.get('/projectTracking',async(request,response) =>{
    const dbProjects = await getFirestore('Projects','project');
    const dbUser = await getFirestore('Users','user');
    const dbTasks = await getFirestore('Tasks','task1');
    const userRole =userRoles(dbUser);
    response.render('projectTracking',{dbProjects,dbUser,userRole,dbTasks});
})

app.get('/createProject',async(request,response) =>{
    const dbUser = await getFirestore('Users','user');
    const userRole =userRoles(dbUser);
    response.render('createProject',{dbUser,userRole})
})
exports.app = functions.https.onRequest(app)