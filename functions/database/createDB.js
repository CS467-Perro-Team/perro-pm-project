// Set up the database
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getMySecretKey = require('../secretKey');  // You need to make your own module

// set up authentication with local environment
const serviceAccount = require(getyMySecretKey());

admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
  	databaseURL: "https://perro-pm-project.firebaseio.com" 
});

const firestoreDB = admin.firestore();

/**
 * Sample Data for Firestore
 *  The arrays are collections, and the objects are the documents
 *  Dates are in timestamp format
 */
const userrole = [
	{
		userrole: 'project manager',
		createProject: true,
		createTask: true,
		createComment: true
	},
	{
		userrole: 'project participant',
		createProject: false,
		createTask: true,
		createComment: true
	},
		{
		userrole: 'project stakeholder',
		createProject: false,
		createTask: false,
		createComment: true
	}
]

const user = [
    {
        firstName: "Gerson",
        lastName: "Lindor",
        useremail: "lindorg@oregonstate.edu",
        username: "lingorg",
        userrole: "project manager"
    },
    {
        firstName: "Nicole",
        lastName: "Warnemuende",
        useremail: "warnemun@oregonstate.edu",
        username: "warnemun",
        userrole: "project manager"
    },
    {
        firstName: "Gerson",
        lastName: "Lindor",
        useremail: "gerson.0317@gmail.com",
        username: "gerson.0317",
        userrole: "project participant"
    },
    {
        firstName: "Nicole",
        lastName: "Warnemuende",
        useremail: "warnemun@oregonstate.edu",
        username: "warnemun",
        userrole: "project particpant"
    }
]

var projectDueDate = new Date('2020-12-04').getTime();
var date = new Date();

const project = [
    {
        projectName: "The final days project",
        projectDueDate: admin.firestore.Timestamp.fromDate(new Date(projectDueDate)),
        projectDescription: "The items that need to be completed in the final week of the Perro Project.",
        projectStartDate: admin.firestore.Timestamp.fromDate(new Date(date)),
        projectTeam: [],
    }
]

const task = [
    {
        taskName: 'Redesign Database Structure',
        taskStartDate: admin.firestore.Timestamp.fromDate(new Date(date)),
        taskDueDate: admin.firestore.Timestamp.fromDate(new Date('11/30/2020')),
        taskAssignee: 'warnemun',
        taskDescription: 'Create a better firestore database structure that meets current needs and allows for scalability in the future'
    },
    {
        taskName: 'Recreate createdDB.js file',
        taskStartDate: admin.firestore.Timestamp.fromDate(new Date(date)),
        taskDueDate: admin.firestore.Timestamp.fromDate(new Date('11/30/2020')),
        taskAssignee: 'warnemun',
        taskDescription:'Redo the createDB file to match the restructured database'
    }
]

const comment = [
    {
        commentUsername: "warnemun",
        commentText: "This task is behind schedule",
        commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
    },
    {
        commentUser: "lindorg",
        commentText: "Let's just reprioritize other tasks",
        commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
    },
    {
        commentUsername: "lindorg",
        commentText: "Still working on this, and making good progress.",
        commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
    },
    {
        commentUser: "warnemun",
        commentText: "Thanks for the update!",
        commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
    }

]
const teamMember = [
	{
		projectTeam: [
			'warnemun',
			'lindorg'
		]
	}
]
const myData = {
    user: user,
    project: project,
    comment: comment,
    task: task,
    userrole: userrole,
    teamMember: teamMember
}
/**
 *  Functions to add data to the database
 */
 // Insert data for projects with nested collections
const insertUserData = async (userEmail, userData, userIndex) => {
    try{
		await firestoreDB.collection("Users").doc(userEmail).set(userData[userIndex]);
    }catch(e){
    	console.log(e);
    }
}

// Insert data for projects
const insertNewProject = async (projectName, projectData, projectIndex) => {
    try{
		await firestoreDB.collection("Projects").doc(projectName).set(projectData[projectIndex]);
    }catch(e){
    	console.log(e);
    }
}
const insertNewProjectTeamMember = async (projectName, teamMember) => {
	try{
		await firestoreDB.collection("Projects").doc(projectName).update(teamMember[0]);
	} catch(e){
    	console.log(e);
	}
}
const insertNewTask = async (projectName, TaskName, taskData, taskIndex) => {
    try{
    	await firestoreDB.collection("Projects").doc(projectName).collection("Tasks").doc(TaskName).set(taskData[taskIndex]);
    }catch(e){
    	console.log(e);
    }
}
const insertNewComment = async (projectName, TaskName, commentData, commentIndex) => {
	try{
    	await firestoreDB.collection("Projects").doc(projectName).collection("Tasks").doc(TaskName).collection("Comments").doc().set(commentData[commentIndex]);
	} catch(e){
		console.log(e);
	}
}
const insertUserRoles = async (userRole, userData, userIndex) => {
	try{
    	await firestoreDB.collection("UserRoles").doc(userRole).set(userData[userIndex]);
	} catch(e){
		console.log(e);
	}
}
// add users to database
insertUserData(myData.user[0].useremail, myData.user, 0);
insertUserData(myData.user[1].useremail, myData.user, 1);
insertUserData(myData.user[2].useremail, myData.user, 2);
insertUserData(myData.user[3].useremail, myData.user, 3);

// add new project to database (no tasks data, no comment data)
insertNewProject(myData.project[0].projectName, myData.project, 0);

// add new tasks to database (no comment data)
insertNewTask(myData.project[0].projectName, myData.task[0].taskName, myData.task, 0);
insertNewTask(myData.project[0].projectName, myData.task[1].taskName, myData.task, 1);

// add new comments to database
insertNewComment(myData.project[0].projectName, myData.task[0].taskName, myData.comment, 0);
insertNewComment(myData.project[0].projectName, myData.task[0].taskName, myData.comment, 1);
insertNewComment(myData.project[0].projectName, myData.task[1].taskName, myData.comment, 0);
insertNewComment(myData.project[0].projectName, myData.task[1].taskName, myData.comment, 1);

// add userroles to database
for(i=0;i<userrole.length;i++){
	insertUserRoles(myData.userrole[i].userrole, myData.userrole,i);
}
insertNewProjectTeamMember(myData.project[0].projectName, myData.teamMember);