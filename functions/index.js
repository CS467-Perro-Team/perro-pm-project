// Setup
const functions = require('firebase-functions');
const admin = require('firebase-admin');
// Credentialed setup
/*Replacement code for deploying to firebase hosted site*/
//Authorize your application to access your Firestore DB
//admin.initializeApp(functions.config().firebase);
/*Replacement code for deploying to firebase hosted site*/

/*Replace this code block with replacement code above*/
// set up authentication with local environment
const getMySecretKey = require('./secretKey');  // You need to make your own module
const serviceAccount = require(getMySecretKey());
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://perro-pm-project.firebaseio.com"
});
//Replace this code block with replacement code above*/
const firestoreCon = admin.firestore();

const bodyParser = require('body-parser');

// Express Setup
const express = require('express');
const session = require('express-session');
const { request, response } = require('express');
// Initialize the app using express.
const app = express();

// Handlebars Setup
const engines = require('consolidate');
const hbs = require('handlebars');
//Set engine as handlebars
app.engine('hbs', engines.handlebars);

// Front end code will be in views folder
app.set('views', './views');

//Views will be hbs files
app.set('view engine', 'hbs');

// Config
// const CONFIG = require('./config.js');
const CONFIG = require('./myConfig.js');     // *** DELETE BEFORE FINAL RELEASE ****
const G_CID = CONFIG.client_id;
const G_CSEC = CONFIG.client_secret;
const SECRET = CONFIG.session_secret;

// Google OAuth
const {OAuth2Client} = require('google-auth-library');
const { UserBuilder } = require('firebase-functions/lib/providers/auth');
const client = new OAuth2Client(G_CID);

// Session Setup
var sessionStuff = {
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        //7 days
        maxAge: 24*60*60*7*1000
        ////////////////////////////secure: false ////////////
    }
    
}

app.set('trust proxy',1);
app.use(session(sessionStuff));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Login Page
app.get('/', (request, response) => {
    if(request.session.views) {
        request.session.views++;
        response.render('projectList', {G_CID});
    } else {
        request.session.views = 1;
    }
    console.log(session.views);
    response.render('index', {G_CID});
});



/** Middleware to verify that the user is still logged in */
/*
const isLoggedIn = (req, res, next) => {
    console.log("***THIS IS REQ USER SESSION****\n", req.user);
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
*/


app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (request, response) => 
    response.redirect("projectList")
);
app.get('/error', (request, response) => 
    response.render("error", "error logging in")
);

/*   ORIGINAL
passport.serializeUser(function(user, cb) {
    console.log("SERIALIZED USER>>>>", user) ////////
    cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    console.log("DE-SERIALIZED USER>>>>", user) ///////
    cb(null, user);
});
*/

/*  GL 1507
passport.serializeUser(function(user, done) {
    console.log("SERIALIZED USER>>>>", user) ////////
    console.log("SERIALIZED USER ID>>>>", user.useremail) ////////
    done(null, user.useremail);
});
*/

/*
passport.deserializeUser(function(useremail, done) {
    console.log("DE-SERIALIZED USER>>>>", useremail) ///////
    done(null, { useremail: useremail});
});
*/

/*  GL 1510
passport.serializeUser(function(user, done) {
    console.log("SERIALIZED USER>>>>", user) ////////
    console.log("SERIALIZED USER ID>>>>", user.useremail) ////////
    done(null, user.useremail);
});


passport.deserializeUser(function(useremail, done) {
    console.log("DE-SERIALIZED USER id>>>>", useremail); ///////
    User.findById(useremail, function(err, user) {
        console.log("DE-SERIALIZED USER >>>", user);  /////////////
        done(err, user);
    });
});
*/


/** Middleware to verify that the user is still logged in */
/*
const isLoggedIn = (req, res, next) => {
    console.log("***THIS IS REQ USER SESSION****\n", req.user);
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}
*/

/**  Query functions  **/
/**
 *  Functions to add data to the database
 */
const insertUserData = async (collectionName, docName, data) => {
    if (docName === null) {
        await firestoreCon.collection(collectionName).doc().set(data);
    } else {
        await firestoreCon.collection(collectionName).doc(docName).set(data);
    }
}

/****  THIS IS GOOD CODE DO NOT DELETE *******/

passport.serializeUser((user, done) => {
    console.log("SERIALIZED USER>>>>", user) ////////
    console.log("SERIALIZED USER ID>>>>", user.useremail) ////////
    done(null, user.useremail);
});

// From tutorial **** youTube
passport.deserializeUser((useremail, done) => {
    console.log("DE-SERIALIZED USER>>>>", useremail) ///////
    /*User.findById(useremail).then((user) => {
        done(null, user.useremail);
    })*/

    /*
    user.findById(useremail, function(err, user) {
        console.log("DE-SERIALIZED USER >>>", user);  /////////////
        done(err, user);
    });
    */
    
    ///done(null, { useremail: useremail});
    done(null, useremail);   /// This worked!!!!
});
/****  THIS IS GOOD CODE DO NOT DELETE *******/


/*  Passport-Google AUTH  */
passport.use(new GoogleStrategy({
    clientID: G_CID,
    clientSecret: G_CSEC,
    callbackURL: "http://localhost:5000/auth/google/callback"  // local environment
    // callbackURL: "https://mypmwork.com/auth/google/callback" // live site
  },
  function(accessToken, refreshToken, profile, done) {
      const { emails, name } = profile;
      let emailFromProfile = emails[0].value;
      // verify that the user is in the DB by getting the user
      // let aUser = getFirestore("Users", emailFromProfile);
      let aUser = getUserInfo(emailFromProfile);
      if (!aUser.username) {
          // create the new user 
          let userName = emailFromProfile.split('@')[0];
          let userRole = "project participant"
          aUser = {
              firstName: name.givenName,
              lastName: name.familyName,
              useremail: emailFromProfile,
              username: userName,
              userrole: userRole 
          }
          // insert the new user to the DB
          insertUserData("Users", aUser.useremail, aUser);
          return done(null, aUser)
      } /*else {
          done(null, aUser)
      }*/
      /////// aUser.id = aUser.useremail;  ///////////////////////////////// NEW CODE ADDED //////////////
      return done(null, aUser);
  }
));





/*  GL 1511
passport.serializeUser(function(user, done) {
    console.log("SERIALIZED USER>>>>", user) ////////
    console.log("SERIALIZED USER ID>>>>", user.useremail) ////////
    done(null, user.useremail);
});


passport.deserializeUser(function(useremail, done) {
    console.log("DE-SERIALIZED USER id>>>>", useremail); ///////
    User.findById(useremail, function(err, user) {
        console.log("DE-SERIALIZED USER >>>", user);  /////////////
        done(err, user);
    });
});
*/
 

/****  THIS IS GOOD CODE DO NOT DELETE *******/
/** Middleware to verify that the user is still logged in */
const isLoggedIn = (req, res, next) => {
    console.log("***THIS IS REQ USER SESSION****\n", req.user); ///////////////////////////////
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: "/signUp" }), function(request, response) {
    // Successful authentication, redirect success.
    response.redirect("/projectList"); // this may be a place to add /<useremail> when user is authenticated & can update route
});

/****  THIS IS GOOD CODE DO NOT DELETE *******/


/*
 *  Functions to add/update database
 */

// Create New Project
const createNewProject = async (projectName, projectData) => {
    try{
        await firestoreCon.collection("Projects").doc(projectName).set(projectData);
    }catch(e){
        console.log(e);
    }
}
// Create New Task
const createNewTask = async(projectName, taskName, taskData) => {
    try{
        await firestoreCon.collection("Projects").doc(projectName).collection("Tasks").doc(taskName).set(taskData);
    } catch(e){
        console.log(e);
    }
}

/*
*  Functions to retrieve data from database
*/
async function getUserInfo(user) {
    const result = firestoreCon.collection("Users").doc(user).get().then(doc =>{
        if (!doc.exists){
            if(loginAttempt) {
                return true; // user that doesn't exist attempting to login
            } else{
                console.log('No such user!');
                return;
            }
        } else {
            return doc.data();
        }
    }).catch( err => {
        console.log('Error getting user', err);
            return;
    });
    return result;
}
// Get all Project Manager usernames - NOT YET WORKING --
/*async function getProjectManagers(){
    const userRef = firestoreCon.collection("Users");
    const pmRefs = await userRef.where('userrole', '==', 'project manager').get();
    const listOfPMs = [];
    pmRefs.forEach( doc => {
        listOfPMs.push(doc.data().username);
    });
    return listOfPMs;
}*/
// Get all userNames -- NOT YET WORKING -- 
/*async function getUserNames(){
    const userRefs = firestoreCon.collection("Users");
    const listOfUsernames = [];
    userRefs.forEach( doc => {
        listOfUsernames.push(doc.data().username);
    });
    return listOfUsernames;
}*/
// Get Projects Info (Field values for a specific project)
async function getProjectInfo(projectName) {
    const result = firestoreCon.collection("Projects").doc(projectName).get().then(doc =>{
        if (!doc.exists) {
            console.log('No such project!');
            return;
        } else {
            return doc.data();
            
        }
    }).catch( err => {
        console.log('Error getting project', err);
            return;
    });
    return result
}
// Get Task Info (Field values for a specific task)
async function getTaskInfo(projectName, taskName) {
    const result = firestoreCon.collection("Projects").doc(projectName).collection("Tasks").doc(taskName).get().then(doc =>{
        if (!doc.exists) {
            console.log('No such task!');
            return;
        } else {
            return doc.data();
        }
    }).catch( err => {
        console.log('Error getting task', err);
            return;
    });
    return result
}
// Helper function to return list of documents for a specific collection
async function getCollection(collectionName) {
    const collectRef = firestoreCon.collection(collectionName);
    const docList = await collectRef.get();
    const listOfDocs = [];
    docList.forEach( doc => {
        listOfDocs.push(doc.data());
    })
    return listOfDocs;
}
// Helper function to return list of tasks for a specific project
async function getTaskListFromAProject(projectName) {
    const projectsRef = firestoreCon.collection('Projects');
    const tasks = await projectsRef.where('projectName','==', projectName).get()
    let projID = "Nope";
    tasks.forEach( task => {
        projID = task.id;
    })
    // get the tasks collection
    const taskCollection = await projectsRef.doc(projID).collection('Tasks').get();
    const taskList = getDocumentList(taskCollection);
    return taskList;
}

// Helper function to create an object for the table in project list view
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
// Helper function to create list of docs for a sub collection
const getDocumentList = (collection) => {
    const listOfDocs = [];
    collection.forEach( doc => {
        listOfDocs.push(doc.data());
    })
    return listOfDocs;
}

/** Routes */
/** The Project List view **/
app.get('/projectList', isLoggedIn, async(request,response) => {
    // const user = "warnemun@oregonstate.edu"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const user = request.user; 
    const dbUser = await getUserInfo(user);
    const projectList = await getCollection('Projects');

    var projectRows = {};
    var projectTable = [];
    var taskList = [];
    
    for (project of projectList) {
        taskList.push(getTaskListFromAProject(project.projectName));
    }
    
    const taskCollection = await Promise.all(taskList);
    
    for (var i = 0; i < projectList.length; ++i) {
        projectRows = createObjectForProjectListView(projectList[i].projectName, taskCollection[i]);
        projectTable.push(projectRows);
    }
    response.render('projectList',{dbUser,projectTable});
});
app.get('/projectList/:useremail', async(request,response) => {
    const user = request.params.useremail;
    const dbUser = await getUserInfo(user);
    const projectList = await getCollection('Projects');

    var projectRows = {};
    var projectTable = [];
    var taskList = [];
    
    for (project of projectList) {
        taskList.push(getTaskListFromAProject(project.projectName));
    }
    
    const taskCollection = await Promise.all(taskList);
    
    for (var i = 0; i < projectList.length; ++i) {
        projectRows = createObjectForProjectListView(projectList[i].projectName, taskCollection[i]);
        projectTable.push(projectRows);
    }
    response.render('projectList',{dbUser,projectTable});
});

/** The Create Project View **/
app.get('/createProject', isLoggedIn, async(request,response) => {
    // const user = "warnemun@oregonstate.edu"; //
    const user = request.user; 
    const dbUser = await getUserInfo(user);
    /* Add Functionality for getting all project managers and all users*/
        // const dbPMs = await getProjectManagers('Users');
        // const dbUsers = await getAllUsers('Users');
        // response.render('createProject',{dbUser, dbPMs, dbUsers});
    response.render('createProject',{dbUser});
});

/** Create Project Functionality **/
app.post('/createProject', (request, response) => {
    const data = request.body;
    data.projectStartDate = new Date(data.projectStartDate);
    data.projectDueDate = new Date(data.projectDueDate);
    
    // Add new project to database
    createNewProject(data.projectName, data);
    response.redirect("/projectSummary/" + data.projectName);
});

/** Task View **/
app.get('/task/:projectName/:taskName', isLoggedIn, async(request,response) =>{
    // const user = "warnemun@oregonstate.edu"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const user = request.user; 
    const projectName = request.params.projectName;
    var taskName = request.params.taskName;

    const dbProjects = await getProjectInfo(projectName);
    const dbUser = await getUserInfo(user);
    const dbTasks = await getTaskInfo(projectName,taskName);
    //const dbComments = await getTaskComments(projectName, taskName);
    response.render('task',{dbProjects,dbUser,dbTasks});
});

/** Create Task Functionality **/
app.get('/createTask/:projectName',  isLoggedIn, async(request,response) =>{
    // const user = "warnemun@oregonstate.edu"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const user = request.user; 
    const projectName = request.params.projectName;

    const dbProjects = await getProjectInfo(projectName);
    const dbUser = await getUserInfo(user);
    response.render('createTask',{dbProjects,dbUser});
});
app.post('/createTask', (request, response) =>{
    const data = request.body;
    const taskName = data.taskName;
    const projectName = data.projectName;

    data.taskStartDate = new Date();
    data.taskDueDate = new Date(data.taskDueDate);
    data.taskStatus = "open";

    // add the data to the database
    createNewTask(projectName,taskName, data);
    response.redirect("/task/" + projectName + "/" + taskName);
});

/** The Single Project Summary view */
app.get('/projectSummary/:projectName', isLoggedIn, async(request,response) =>{
    // const user = "warnemun@oregonstate.edu"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const user = request.user; 
    const projectName = request.params.projectName;

    const dbProjects = await getProjectInfo(projectName);
    const dbUser = await getUserInfo(user);
    const dbTasks = await getTaskListFromAProject(projectName);

    response.render('projectSummary',{dbProjects,dbUser,dbTasks});
});

/** The Single Project Tracking view */
app.get('/projectTracking/:projectName', isLoggedIn, async(request,response) =>{
    // const user = "warnemun@oregonstate.edu"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const user = request.user; 
    const projectName = request.params.projectName;
    
    const dbProjects = await getProjectInfo(projectName);
    const dbUser = await getUserInfo(user); 
    const dbTasks = await getTaskListFromAProject(projectName);
    response.render('projectTracking',{dbProjects,dbUser,dbTasks});
});

/** The Sign Up View*/
app.get('/signUp', async(request,response) =>{
    console.log("sessionID: " + request.sessionID);
    response.render('signUp',{G_CID});
})

app.get('/logout', function(request,response) {
    console.log("sessionID: " + request.sessionID);
    request.session.destroy(function(e){
        request.logout();
        response.redirect('/');
    });
});



/** Testing functions **/

// Sitemap for testing - remove when published
app.get('/siteMap',(request,response) =>{
    console.log("sessionID: " + request.sessionID);
    response.render('siteMap');
}); // Sitemap for testing - remove when published

exports.app = functions.https.onRequest(app);