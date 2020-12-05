// Setup
const functions = require('firebase-functions');
const admin = require('firebase-admin');
// Credentialed setup
/*Replacement code for deploying to firebase hosted site*/
//Authorize your application to access your Firestore DB
// admin.initializeApp(functions.config().firebase);
/*Replacement code for deploying to firebase hosted site*/

/*Replace this code block with replacement code above*/
// // set up authentication with local environment
const getMySecretKey = require('./secretKey');  // You need to make your own module
const serviceAccount = require(getMySecretKey());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "" //You need to add your db url
});

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
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const { UserBuilder } = require('firebase-functions/lib/providers/auth');
const client = new OAuth2Client(G_CID);

// Session Setup
var sessionStuff = {
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{
        //7 days
        maxAge: 24*60*60*7*1000
    }
}

app.set('trust proxy',1);
app.use(session(sessionStuff));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Setup
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
var userProfile;


app.get('/success', (request, response) => 
    //response.redirect("/projectList")
    response.send(userProfile)
);
app.get('/error', (request, response) => 
    response.render("error", "error logging in")
);

passport.serializeUser(function(user, cb){
    console.log("Serialize:",user);
    cb(null, user);
});

passport.deserializeUser(function(obj, cb){
    console.log("DeSerialize:",obj);
    cb(null, obj);   
});

/*  Passport-Google AUTH  */
passport.use(new GoogleStrategy({
    clientID: G_CID,
    clientSecret: G_CSEC,
    // callbackURL: "http://localhost:5000/auth/google/callback"  // local environment
    callbackURL: "https://mypmwork.com/auth/google/callback" // live site
    },
    async function(accessToken, refreshToken, profile, done) {
        var { emails, name } = profile;
        var emailFromProfile = emails[0].value;
        console.log(emailFromProfile);
        // verify that the user is in the DB by getting the user
        // let aUser = getFirestore("Users", emailFromProfile);
        var aUser = await getUserInfo(emailFromProfile);
        if (aUser === undefined) {
            // create the new user 
            var userName = emailFromProfile.split('@')[0];
            var userRole = "project participant";
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
        } 
        return done(null, aUser);
    }
));
 
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: "/signUp" }), function(request, response) {
    // Successful authentication, redirect success.
    response.redirect('/projectList'); // this may be a place to add /<useremail> when user is authenticated & can update route
});

/** Middleware to verify that the user is still logged in */
// const isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         next();
//         return;
//     } else {
//         res.sendStatus(401);
//     }
// }

/*
 *  Functions to add/update database
 */
const insertUserData = async (collectionName, docName, data) => {
    if (docName === null) {
        await firestoreCon.collection(collectionName).doc().set(data);
    } else {
        await firestoreCon.collection(collectionName).doc(docName).set(data);
    }
}
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
// Create New comment
// const createNewComment = async(projectName, taskName, commentData) => {
//     try{
//         await firestoreCon.collection("Projects").doc(projectName).collection("Tasks").doc(taskName).update(commentData);
//     } catch(e){
//         console.log(e);
//     }
// }
/*
*  Functions to retrieve data from database
*/
async function getUserInfo(user) {
    console.log("gui", user);
    const result = firestoreCon.collection("Users").doc(user).get().then(doc =>{
        if (!doc.exists){
            console.log('No such user!');
            return;
        } else {
            return doc.data();
        }
    }).catch( err => {
        console.log('Error getting user', err);
            return;
    });
    return result;
}
// Get all Project Manager usernames
async function getProjectManagers(){
    const userRef = firestoreCon.collection("Users");
    const pmRefs = await userRef.where('userrole', '==', 'project manager').get();
    const listOfPMs = [];
    pmRefs.forEach( doc => {
        listOfPMs.push(doc.data());
    });
    return listOfPMs;
}

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
            if (taskList[i].taskStatus === 'complete') {
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
/*Tracking Helper functions*/
// Helper function to get date range for chart between project start/finish
const getDateRange = function(min_date, max_date){
    // Find the start and end in 1w offsets.
    var start = new Date(min_date);
    start.setDate(min_date.getDate());
    var end = new Date(max_date);
    end.setDate(end.getDate() + 7);
    // Generate the date range in 1w increments.
    var date_range = [];
    while (start <= end) {
        date_range.push(start.toString());
        start.setDate(start.getDate() + 7);
    }
    return date_range;
}

// Helper function to set chart data
const setChartData = (tasks, chartDates) => {
    try{
        var projData = {
                plotDate: [],
                open: [],
                complete: [],
                total:[]
        }
        
        for(var i=0;i<chartDates.length;i++){ //for each plot point
            var openTasks = 0;
            var closedTasks = 0;
            var totalTasks = 0;
            var chartDate = chartDates[i];

            projData.plotDate.push(chartDate.toString());
            
            for(task in tasks){ // check all tasks in the project
                const ts = tasks[task].taskStartDate.toDate();
                const taskStatus = tasks[task].taskStatus;
                var taskCompleteDate = undefined;
                if(tasks[task].taskCompleteDate){
                    taskCompleteDate = tasks[task].taskCompleteDate.toDate();
                }

                var taskStart = new Date(ts);
                taskStart.setDate(ts.getDate());

                var plotDate = new Date(chartDate);
                if(taskStart <= plotDate){ //check if tasks open by plot date
                    totalTasks++;
                    if(taskStatus === 'open'){ //if yes and status open, count as open
                        openTasks++;
                    } else { // if yes and not open, count as closed
                        if((taskCompleteDate) && (taskCompleteDate <= plotDate)){
                            closedTasks++;
                        } else {
                            openTasks++;
                        }
                    }
                }
            }
            projData.open.push(openTasks);
            projData.complete.push(closedTasks);
            projData.total.push(totalTasks);
        }
        return projData;
    } catch(e){
        console.log("Chart data error: ",e);
        return;
    }

}

/** Routes */
/** The Login Page **/
app.get('/', (request, response) => {
    response.render('index', {G_CID});
});

/** The Project List view **/
app.get('/projectList',async(request,response) => {
    const user = "warnemun"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const userrole = 'project manager'; 

    var dbUser = request.user || { 'username': user, 'userrole': userrole};

    console.log("projectList: ",request.useremail);
    // const dbUser = await getUserInfo(user);
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
app.get('/createProject', async(request,response) => {
    
    const user = "warnemun"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const userrole = 'project manager'; 

    var dbUser = request.user || { 'username': user, 'userrole': userrole};

    // const dbUser = await getUserInfo(user);
    const dbUsers = await getCollection("Users");
    /* Add Functionality for getting all project managers and all users*/
    const dbPMs = await getProjectManagers('Users');
    response.render('createProject',{dbUser, dbUsers,dbPMs});
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
/** Create Comment Functionality **/
// app.post('/createComment', (request, response) => {
//     console.log(request);
//     const data = request.body;
//     data.commentName = "";
//     data.comments = { comments: 
//         {
//             commentName: {
//                 commentUsername: data.commentUsername,
//                 commentText: data.commentname,
//                 commentDate: admin.firestore.Timestamp.fromDate(new Date())
//             }
//         }
//     }

//     // Add new project to database
//     createNewComment(data.projectName, data.taskName, data);
//     response.redirect("/task/:" + data.projectName + "/:" + data.taskName);
// });

/** Task View **/
app.get('/task/:projectName/:taskName', async(request,response) =>{
    const user = "warnemun"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const userrole = 'project manager'; 

    var dbUser = request.user || { 'username': user, 'userrole': userrole};

    console.log("task: ",dbUser);
    const projectName = request.params.projectName;
    var taskName = request.params.taskName;

    const dbProjects = await getProjectInfo(projectName);
    // const dbUser = await getUserInfo(user);
    const dbTasks = await getTaskInfo(projectName,taskName);

    // Convert Task Due Date to MM/DD/YYYY format
    dbTasks.taskDueDate = new Date(dbTasks.taskDueDate._seconds * 1000).toLocaleString().split(',')[0];
    // Convert Comment Dates to MM/DD/YYYY format
    for(key in dbTasks.comments){
        dbTasks.comments[key].commentDate = new Date(dbTasks.comments[key].commentDate._seconds * 1000).toLocaleString().split(',')[0];
    }

    //const dbComments = await getTaskComments(projectName, taskName);
    response.render('task',{dbProjects,dbUser,dbTasks});
});
/** Comment View **/
// app.get('/createComment/:projectName/:taskName',async(request,response) =>{
//     const user = "warnemun@oregonstate.edu"; // Assign the user identefier here -> whatever is the document name for the logged in user
//     const projectName = request.params.projectName;
//     var taskName = request.params.taskName;

//     const dbProjects = await getProjectInfo(projectName);
//     const dbUser = await getUserInfo(user);
//     const dbTasks = await getTaskInfo(projectName,taskName);

//     //const dbComments = await getTaskComments(projectName, taskName);
//     response.render('createComment',{dbProjects,dbUser,dbTasks});
// });
/** Create Task View **/
app.get('/createTask/:projectName', async(request,response) =>{
    const user = "warnemun"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const userrole = 'project manager'; 

    var dbUser = request.user || { 'username': user, 'userrole': userrole};

    const projectName = request.params.projectName;

    const dbProjects = await getProjectInfo(projectName);
    // const dbUser = await getUserInfo(user);
    const dbUsers = await getCollection("Users");

    response.render('createTask',{dbProjects,dbUser,dbUsers});
});
/* Create Task Post */
app.post('/createTask', (request, response) =>{
    const user = "warnemun"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const userrole = 'project manager'; 

    var dbUser = request.user || { 'username': user, 'userrole': userrole};

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

/** The Single Project Summary */
app.get('/projectSummary/:projectName', async(request,response) =>{
    const user = "warnemun"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const userrole = 'project manager'; 

    var dbUser = request.user || { 'username': user, 'userrole': userrole};

    const projectName = request.params.projectName;

    const dbProjects = await getProjectInfo(projectName);
    // const dbUser = await getUserInfo(user);
    const dbTasks = await getTaskListFromAProject(projectName);

    // Convert Task Due Dates to MM/DD/YYYY format
    for(key in dbTasks){
        dbTasks[key].taskDueDate = new Date(dbTasks[key].taskDueDate._seconds * 1000).toLocaleString().split(',')[0];
    }


    response.render('projectSummary',{dbProjects,dbUser,dbTasks});
});

/** The Single Project Tracking view */
app.get('/projectTracking/:projectName', async(request,response) =>{
    const user = "warnemun"; // Assign the user identefier here -> whatever is the document name for the logged in user
    const userrole = 'project manager'; 

    var dbUser = request.user || { 'username': user, 'userrole': userrole};

    const projectName = request.params.projectName;
    
    const dbProjects = await getProjectInfo(projectName);
    // const dbUser = await getUserInfo(user); 
    const dbTasks = await getTaskListFromAProject(projectName);
    const dateRange = getDateRange(dbProjects.projectStartDate.toDate(), dbProjects.projectDueDate.toDate());
    var chartData = [];
    chartData = setChartData(dbTasks, dateRange);

    // Convert start and due date to MM/DD/YYY format
    var startDate = dbProjects.projectStartDate = new Date(dbProjects.projectStartDate._seconds * 1000).toLocaleString().split(',')[0];
    dbProjects.projectDueDate = new Date(dbProjects.projectDueDate._seconds * 1000).toLocaleString().split(',')[0];
    
    // Format start date for highcharts
    var year = dbProjects.projectStartDate.split('/')[2];
    var month = dbProjects.projectStartDate.split('/')[0];
    var day = dbProjects.projectStartDate.split('/')[1];
    // Start date - 1 -> Highcharts adds 30 days to start of chart - we want start of project
    startDate = year +',' + (month-1) + ',' + day;
    response.render('projectTracking',{dbProjects,dbUser,dbTasks,startDate,chartData});
});


/** The Sign Up View*/
app.get('/signUp', async(request,response) =>{
    response.render('signUp',{G_CID});
})

app.get('/logout', function(request,response) {
    request.session.destroy(function(e){
        request.logout();
        response.redirect('/');
    });
});






/** Testing functions **/

// Sitemap for testing - remove when published
app.get('/siteMap',(request,response) =>{
    response.render('siteMap');
}); // Sitemap for testing - remove when published

//Delete below before deploying
app.get('/sessionInfo', (request, response) => 
    response.send(userProfile._json.email)
    //response.send(userProfile.emails[0].value)
);
//Delete above before deploying


exports.app = functions.https.onRequest(app);