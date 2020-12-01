// Setup
const functions = require('firebase-functions');
const admin = require('firebase-admin');
// Credentialed setup
/*Replacement code for deploying to firebase hosted site*/
//Authorize your application to access your Firestore DB
//admin.initializeApp(functions.config().firebase);
/*Replacement code for deploying to firebase hosted site*/

//Replace this code block with replacement code above
// set up authentication with local environment
const getMySecretKey = require('./secretKey');  // You need to make your own module
const serviceAccount = require(getMySecretKey());

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
const CONFIG = require('./config.js');
const G_CID = CONFIG.client_id;
const G_CSEC = CONFIG.client_secret;
const SECRET = CONFIG.session_secret;

// Google OAuth
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(G_CID);

// Session Setup
var sessionStuff = {
    secret: SECRET,
    resave: true,
    cookie:{
        //7 days
        maxAge: 24*60*60*7*1000
    }
}
//console.log(sessionStuff);

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

//const port = process.env.PORT || 3000;
//app.listen(port , () => console.log('App listening on port ' + port));

// Passport Setup
const passport = require('passport');
/// var userProfile;   global var

app.use(passport.initialize());
app.use(passport.session());


app.get('/success', (request, response) => 
    //response.send(userProfile)
    response.redirect("projectList")
);
app.get('/error', (request, response) => 
    response.render("error", "error logging in")
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});


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


/*  Passport-Google AUTH  */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: G_CID,
    clientSecret: G_CSEC,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      //const userProfile=profile;
      const { emails, name } = profile;
      let emailFromProfile = emails[0].value;
      // verify that the user is in the DB by getting the user
      let aUser = getFirestore("Users", emailFromProfile);
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
          insertData("Users", aUser.useremail, aUser);
      }
      return done(null, aUser);
  }
));


/** Middleware to verify that the user is still logged in */
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
 

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: "/signUp" }), function(request, response) {
    // Successful authentication, redirect success.
    response.redirect("/projectList");
});


const giveAListOfDocuments = (collection) => {
    const listOfDocs = [];
    collection.forEach( doc => {
        listOfDocs.push(doc.data());
    })
    return listOfDocs;
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

/** Routes */
/** The Project List view **/
app.get('/projectList',async(request,response) => {
    console.log("sessionID: " + request.sessionID);
    // var useremail = userProfile._json.email;  from global var *****
    ///  console.log(useremail);    DONT NEED *****
    let useremail = "BHRFGGHHHJJJJKKKKJHHGGFDDDDDDDDDDDDDDDDDDDDDDDD"
    const dbUser = await getFirestore('Users',useremail);
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
    response.render('projectList',{dbUser,projectTable});
});

/** The Create Project View **/
app.get('/createProject',async(request,response) => {
    console.log("sessionID: " + request.sessionID);
    const dbUser = await getFirestore('Users','BarnesH');
    response.render('createProject',{dbUser});
});

/** Create Project Functionality **/
app.post('/createProject', (request, response) => {
    console.log("sessionID: " + request.sessionID);
    let data = request.body;
    // add the empty team array to the project
    data["team"] = [];
    // add the data to the database
    insertData("Projects", data.projectName, data);
    response.redirect("/projectList");
});

/** Create Task View **/
app.get('/task',async(request,response) =>{
    console.log("sessionID: " + request.sessionID);
    const dbProjects = await getFirestore('Projects','Better Firestore Project');
    const dbUser = await getFirestore('Users','BarnesH');
    const dbTasks = await getFirestore('Tasks','task1');
    const dbComments = await getFirestore('Comments','comment1');
    response.render('task',{dbProjects,dbUser,dbTasks,dbComments});
});

/** Create Task Functionality **/
app.get('/createTask',async(request,response) =>{
    console.log("sessionID: " + request.sessionID);
    const dbProjects = await getFirestore('Projects','Better Firestore Project');
    const dbUser = await getFirestore('Users','BarnesH');
    response.render('createTask',{dbProjects,dbUser});
});
app.post('/createTask', (request, response) =>{
    console.log("sessionID: " + request.sessionID);
    let data = request.body;
    // add the empty team array to the project
    data["team"] = [];
    // add the data to the database
    //insertData("Projects", data.projectName, data);
    response.redirect("/task");
});

/** The Single Project Summary view */
app.get('/projectSummary',async(request,response) =>{
    console.log("sessionID: " + request.sessionID);
    const dbProjects = await getFirestore('Projects','Better Firestore Project');  //add reference for chosen project
    const dbUser = await getFirestore('Users','BarnesH'); // add variable to pull in user logged in
    const dbTasks = await getTaskListFromAProject(dbProjects.projectName); // should return all tasks for this project
    response.render('projectSummary',{dbProjects,dbUser,dbTasks});
});

/** The Single Project Tracking view */
app.get('/projectTracking',async(request,response) =>{
    console.log("sessionID: " + request.sessionID);
    const dbProjects = await getFirestore('Projects','Better Firestore Project'); //add reference for chosen project
    const dbUser = await getFirestore('Users','BarnesH'); // add variable to pull in user logged in
    const dbTasks = await getTaskListFromAProject(dbProjects.projectName); // should return all tasks for this project
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

/*
//Delete below before deploying
app.get('/sessionInfo', (request, response) => 
    //response.send(userProfile._json.email) from global var
    //response.send(userProfile.emails[0].value)
);
*/
//Delete above before deploying


exports.app = functions.https.onRequest(app);