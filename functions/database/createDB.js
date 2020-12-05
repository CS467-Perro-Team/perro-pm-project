// Set up the database
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getMySecretKey = require('../secretKey');  // You need to make your own module

// set up authentication with local environment
const serviceAccount = require(getMySecretKey());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});

const firestoreDB = admin.firestore();
/**
 * Sample Data for Firestore
 *  The arrays are collections, and the objects are the documents
 *  Dates are in timestamp format
 */


// projectName:''
// projectDueDate: admin.firestore.Timestamp.fromDate(new Date(projectDueDate)),
// projectDescription: ''
// projectStartDate: admin.firestore.Timestamp.fromDate(new Date(date)),
// projectManager:''
// projectTeam: []

// const project = [
//     {
//         projectName: "The final days project",
//         projectDueDate: admin.firestore.Timestamp.fromDate(new Date(projectDueDate)),
//         projectDescription: "The items that need to be completed in the final week of the Perro Project.",
//         projectStartDate: admin.firestore.Timestamp.fromDate(new Date(date)),
//         projectManager: 'warnemun',
//         projectTeam: []
//     }
// ]

var project1Start = new Date('2020-10-04').getTime();
var project2Start = new Date('2020-10-04').getTime();
var project3Start = new Date('2020-10-04').getTime();

var project1Due = new Date('2020-12-04').getTime();
var project2Due = new Date('2020-12-04').getTime();
var project3Due = new Date('2020-12-04').getTime();



//Projects
const projects = [
{
    projectName: 'Phase 1 mypmwork.com design',
    projectStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Start)), 
    projectDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Due)),
    projectDescription: 'Complete design tasks for phase 1 of mypmwork.com', 
    projectManager: 'warnemun', 
    projectTeam: ["warnemun","lindorg"]
},
{
    projectName: 'Phase 1 mypmwork.com database',
    projectStartDate: admin.firestore.Timestamp.fromDate(new Date(project2Start)),
    projectDueDate: admin.firestore.Timestamp.fromDate(new Date(project2Due)),
    projectDescription: 'Complete database design and setup for phase 1 of mypmwork.com',
    projectManager: 'lindorg',
    projectTeam: ["warnemun","lindorg"] 
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    projectStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Start)),
    projectDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Due)),
    projectDescription: 'Complete functionality for phase 1 of mypmwork.com',
    projectManager: 'warnemun',
    projectTeam: ["warnemun","lindorg"]
}] 

//Tasks
// projectName: ''
// taskName: '',
// taskStartDate: admin.firestore.Timestamp.fromDate(new Date('11/28/2020')),
// taskDueDate: admin.firestore.Timestamp.fromDate(new Date('11/30/2020')),
// taskAssignee: '',
// taskDescription: '',
// taskStatus: '',
// taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date('11/30/2020'))


//Project 1 Task start dates
var project1Task1Start = new Date('2020-10-10').getTime();
var project1Task2Start = new Date('2020-10-10').getTime();
var project1Task3Start = new Date('2020-10-23').getTime();
var project1Task4Start = new Date('2020-10-23').getTime();
var project1Task5Start = new Date('2020-10-23').getTime();
var project1Task6Start = new Date('2020-10-23').getTime();
var project1Task7Start = new Date('2020-11-23').getTime();
var project1Task8Start = new Date('2020-11-23').getTime();
var project1Task9Start = new Date('2020-12-01').getTime();
var project1Task10Start = new Date('2020-12-01').getTime();
//Project 1 Task completion dates
var project1Task1Complete = new Date('2020-10-20').getTime();
var project1Task2Complete = new Date('2020-10-22').getTime();
var project1Task3Complete = new Date('2020-10-26').getTime();
// var project1Task4Complete = new Date('2020-10-19').getTime();
// var project1Task5Complete = new Date('2020-10-24').getTime();
var project1Task6Complete = new Date('2020-11-12').getTime();
// var project1Task7Complete = new Date('2020-11-01').getTime();
// var project1Task8Complete = new Date('2020-11-01').getTime();

//Project 1 Task due dates
var project1Task1Due = new Date('2020-11-12').getTime();
var project1Task2Due = new Date('2020-11-12').getTime();
var project1Task3Due = new Date('2020-11-19').getTime();
var project1Task4Due = new Date('2020-11-19').getTime();
var project1Task5Due = new Date('2020-11-26').getTime();
var project1Task6Due = new Date('2020-11-26').getTime();
var project1Task7Due = new Date('2020-12-04').getTime();
var project1Task8Due = new Date('2020-12-04').getTime();
var project1Task9Due = new Date('2020-12-04').getTime();
var project1Task10Due = new Date('2020-12-04').getTime();


//Project 2

//Project 2 Task start dates
var project2Task1Start = new Date('2020-10-14').getTime();
var project2Task2Start = new Date('2020-10-14').getTime();
var project2Task3Start = new Date('2020-10-24').getTime();
var project2Task4Start = new Date('2020-10-23').getTime();
var project2Task5Start = new Date('2020-10-30').getTime();
var project2Task6Start = new Date('2020-10-30').getTime();
//Project 2 Task completion dates - all complete
var project2Task1Complete = new Date('2020-11-15').getTime();
var project2Task2Complete = new Date('2020-11-15').getTime();
var project2Task3Complete = new Date('2020-11-22').getTime();
var project2Task4Complete = new Date('2020-11-21').getTime();
var project2Task5Complete = new Date('2020-11-29').getTime();
var project2Task6Complete = new Date('2020-11-30').getTime();
//Project 2 Task due dates
var project2Task1Due = new Date('2020-11-16').getTime();
var project2Task2Due = new Date('2020-11-16').getTime();
var project2Task3Due = new Date('2020-11-23').getTime();
var project2Task4Due = new Date('2020-11-23').getTime();
var project2Task5Due = new Date('2020-11-30').getTime();
var project2Task6Due = new Date('2020-11-30').getTime();



//Project 3 Task start dates
var project3Task1Start = new Date('2020-10-12').getTime();
var project3Task2Start = new Date('2020-10-12').getTime();
var project3Task3Start = new Date('2020-10-12').getTime();
var project3Task4Start = new Date('2020-10-12').getTime();
var project3Task5Start = new Date('2020-10-18').getTime();
var project3Task6Start = new Date('2020-10-21').getTime();
var project3Task7Start = new Date('2020-10-22').getTime();
var project3Task8Start = new Date('2020-10-25').getTime();
var project3Task9Start = new Date('2020-11-03').getTime();
var project3Task10Start = new Date('2020-11-13').getTime();
var project3Task11Start = new Date('2020-11-13').getTime();
var project3Task12Start = new Date('2020-11-20').getTime();
var project3Task13Start = new Date('2020-11-20').getTime();
var project3Task14Start = new Date('2020-11-20').getTime();
var project3Task15Start = new Date('2020-11-21').getTime();
var project3Task16Start = new Date('2020-11-22').getTime();
var project3Task17Start = new Date('2020-11-30').getTime();
var project3Task18Start = new Date('2020-11-30').getTime();
//Project 3 Task due dates
var project3Task1Due = new Date('2020-10-13').getTime();
var project3Task2Due = new Date('2020-10-25').getTime();
var project3Task3Due = new Date('2020-11-02').getTime();
var project3Task4Due = new Date('2020-11-03').getTime();
var project3Task5Due = new Date('2020-11-04').getTime();
var project3Task6Due = new Date('2020-11-05').getTime();
var project3Task7Due = new Date('2020-11-06').getTime();
var project3Task8Due = new Date('2020-11-07').getTime();
var project3Task9Due = new Date('2020-11-08').getTime();
var project3Task10Due = new Date('2020-11-09').getTime();
var project3Task11Due = new Date('2020-11-16').getTime();
var project3Task12Due = new Date('2020-11-16').getTime();
var project3Task13Due = new Date('2020-11-23').getTime();
var project3Task14Due = new Date('2020-11-23').getTime();
var project3Task15Due = new Date('2020-11-30').getTime();
var project3Task16Due = new Date('2020-11-30').getTime();
var project3Task17Due = new Date('2020-12-04').getTime();
var project3Task18Due = new Date('2020-12-04').getTime();
//Project 3 Task completion dates - quite a few open
var project3Task1Complete = new Date('2020-10-17').getTime();
var project3Task2Complete = new Date('2020-10-17').getTime();
var project3Task3Complete = new Date('2020-10-19').getTime();
var project3Task4Complete = new Date('2020-10-18').getTime();
var project3Task5Complete = new Date('2020-10-24').getTime();
var project3Task6Complete = new Date('2020-10-25').getTime();
var project3Task7Complete = new Date('2020-11-01').getTime();
var project3Task8Complete = new Date('2020-11-02').getTime();
var project3Task9Complete = new Date('2020-11-09').getTime();
var project3Task10Complete = new Date('2020-11-17').getTime();
// var project3Task11Complete = new Date('2020-11-14').getTime();
var project3Task12Complete = new Date('2020-11-25').getTime();
// var project3Task13Complete = new Date('2020-11-23').getTime();
var project3Task14Complete = new Date('2020-11-28').getTime();
var project3Task15Complete = new Date('2020-11-30').getTime();
// var project3Task16Complete = new Date('2020-11-30').getTime();
// var project3Task17Complete = new Date('2020-12-04').getTime();
// var project3Task18Complete = new Date('2020-12-04').getTime();

//admin.firestore.Timestamp.fromDate(new Date(''))

//project 1
const project1tasks = [
{
    projectName: 'Phase 1 mypmwork.com design',
    taskAssignee:'warnemun',
    taskDescription:'Project 1 task 1 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Task1Due)),
    taskName:'P1T1 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Task1Start)),
    taskStatus:'complete',
    taskCompleteDate:admin.firestore.Timestamp.fromDate(new Date(project1Task1Complete))
},
{
    projectName: 'Phase 1 mypmwork.com design',
    taskAssignee:'lindorg',
    taskDescription:'Project 1 task 2 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Task2Due)),
    taskName:'P1T2 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Task2Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project1Task2Complete))
},
{
    projectName: 'Phase 1 mypmwork.com design',
    taskAssignee:'warnemun',
    taskDescription:'Project 1 task 3 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Task3Due)),
    taskName:'P1T3 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Task3Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project1Task3Complete))
},
{
    projectName: 'Phase 1 mypmwork.com design',
    taskAssignee:'lindorg',
    taskDescription:'Project 1 task 4 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Task4Due)),
    taskName:'P1T4 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Task4Start)),
    taskStatus:'open'
},
{
    projectName: 'Phase 1 mypmwork.com design',
    taskAssignee:'warnemun',
    taskDescription:'Project 1 task 5 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Task5Due)),
    taskName:'P1T5 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Task5Start)),
    taskStatus:'open'
},
{
    projectName: 'Phase 1 mypmwork.com design',
    taskAssignee:'lindorg',
    taskDescription:'Project 1 task 6 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Task6Due)),
    taskName:'P1T6 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Task6Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project1Task6Complete))
},
{
    projectName: 'Phase 1 mypmwork.com design',
    taskAssignee:'warnemun',
    taskDescription:'Project 1 task 7 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Task7Due)),
    taskName:'P1T7 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Task7Start)),
    taskStatus:'open'
},
{
    projectName: 'Phase 1 mypmwork.com design',
    taskAssignee:'lindorg',
    taskDescription:'Project 1 task 8 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Task8Due)),
    taskName:'P1T8 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Task8Start)),
    taskStatus:'open',
},
{
    projectName: 'Phase 1 mypmwork.com design',
    taskAssignee:'warnemun',
    taskDescription:'Project 1 task 9 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Task9Due)),
    taskName:'P1T9 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Task9Start)),
    taskStatus:'open'
},
{
    projectName: 'Phase 1 mypmwork.com design',
    taskAssignee:'lindorg',
    taskDescription:'Project 1 task 10 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project1Task10Due)),
    taskName:'P1T10 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project1Task10Start)),
    taskStatus:'open'
}]

const project2tasks = [
//project 2 Tasks
{
    projectName: 'Phase 1 mypmwork.com database',
    taskAssignee:'warnemun',
    taskDescription:'Project 2 task 1 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project2Task1Due)),
    taskName:'P2T1 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project2Task1Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project2Task1Complete))
},
{
    projectName: 'Phase 1 mypmwork.com database',
    taskAssignee:'lindorg',
    taskDescription:'Project 2 task 2 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project2Task2Due)),
    taskName:'P2T2 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project2Task2Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project2Task2Complete))
},
{
    projectName: 'Phase 1 mypmwork.com database',
    taskAssignee:'warnemun',
    taskDescription:'Project 2 task 3 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project2Task3Due)),
    taskName:'P2T3 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project2Task3Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project2Task3Complete))
},
{
    projectName: 'Phase 1 mypmwork.com database',
    taskAssignee:'lindorg',
    taskDescription:'Project 2 task 4 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project2Task4Due)),
    taskName:'P2T4 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project2Task4Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project2Task4Complete))
},
{
    projectName: 'Phase 1 mypmwork.com database',
    taskAssignee:'warnemun',
    taskDescription:'Project 2 task 5 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project2Task5Due)),
    taskName:'P2T5 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project2Task5Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project2Task5Complete))
},
{
    projectName: 'Phase 1 mypmwork.com database',
    taskAssignee:'lindorg',
    taskDescription:'Project 2 task 6 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project2Task6Due)),
    taskName:'P2T6 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project2Task6Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date( project2Task6Complete))
}]

//project 3
const project3tasks = [
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'warnemun',
    taskDescription:'Project 3 task 1 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task1Due)),
    taskName:'P3T1 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task1Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task1Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'lindorg',
    taskDescription:'Project 3 task 2 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task2Due)),
    taskName:'P3T2 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task2Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task2Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'warnemun',
    taskDescription:'Project 3 task 3 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task3Due)),
    taskName:'P3T3 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task3Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task3Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'lindorg',
    taskDescription:'Project 3 task 4 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task4Due)),
    taskName:'P3T4 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task4Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task4Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'warnemun',
    taskDescription:'Project 3 task 5 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task5Due)),
    taskName:'P3T5 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task5Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task5Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'lindorg',
    taskDescription:'Project 3 task 6 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task6Due)),
    taskName:'P3T6 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task6Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task6Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'warnemun',
    taskDescription:'Project 3 task 7 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task7Due)),
    taskName:'P3T7 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task7Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task7Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'lindorg',
    taskDescription:'Project 3 task 8 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task8Due)),
    taskName:'P3T8 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task8Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task8Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'warnemun',
    taskDescription:'Project 3 task 9 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task9Due)),
    taskName:'P3T9 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task9Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task9Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'lindorg',
    taskDescription:'Project 3 task 10 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task10Due)),
    taskName:'P3T10 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task10Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task10Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'warnemun',
    taskDescription:'Project 3 task 11 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task11Due)),
    taskName:'P3T11 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task11Start)),
    taskStatus:'open',
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'lindorg',
    taskDescription:'Project 3 task 12 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task12Due)),
    taskName:'P3T12 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task12Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task12Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'warnemun',
    taskDescription:'Project 3 task 13 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task13Due)),
    taskName:'P3T13 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task13Start)),
    taskStatus:'open',
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'lindorg',
    taskDescription:'Project 3 task 14 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task14Due)),
    taskName:'P3T14 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task14Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task14Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'warnemun',
    taskDescription:'Project 3 task 15 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task15Due)),
    taskName:'P3T15 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task15Start)),
    taskStatus:'complete',
    taskCompleteDate: admin.firestore.Timestamp.fromDate(new Date(project3Task15Complete))
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'lindorg',
    taskDescription:'Project 3 task 16 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task16Due)),
    taskName:'P3T16 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task16Start)),
    taskStatus:'open',
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'warnemun',
    taskDescription:'Project 3 task 17 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task17Due)),
    taskName:'P3T17 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task17Start)),
    taskStatus:'open',
},
{
    projectName: 'Phase 1 mypmwork.com site functionality',
    taskAssignee:'lindorg',
    taskDescription:'Project 3 task 18 description',
    taskDueDate: admin.firestore.Timestamp.fromDate(new Date(project3Task18Due)),
    taskName:'P3T18 Name',
    taskStartDate: admin.firestore.Timestamp.fromDate(new Date(project3Task18Start)),
    taskStatus:'open',
}]


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
        username: "lindorg",
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

var date = new Date();
const commentProject1Task1 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject1Task2 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject1Task3 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject1Task4 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject1Task5 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject1Task6 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject1Task7 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject1Task8 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject1Task9 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject1Task10 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
//project 2 task comments
const commentProject2Task1 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject2Task2 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject2Task3 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject2Task4 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject2Task5 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
const commentProject2Task6 = [
{ comments: 
    {
        comment1: {
            commentUsername: "warnemun",
            commentText: "This task is behind schedule",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment2: {
                commentUsername: "lindorg",
                commentText: "Let's just reprioritize other tasks",
                commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        },
        comment3: {
            commentUsername: "warnemun",
            commentText: "Getting to this now",
            commentDate: admin.firestore.Timestamp.fromDate(new Date(date))
        }
    }
}
]
// const teamMember = [
//  {
//      projectTeam: [
//          'warnemun',
//          'lindorg'
//      ]
//  }
// ]

// const taskStatus = [
//  {
//      taskStatus: 'complete'
//  }
// ]

const myData = {
    user: user,
    projects: projects,
    commentProject1Task1: commentProject1Task1,
    commentProject1Task2: commentProject1Task2,
    commentProject1Task3: commentProject1Task3,
    commentProject1Task4: commentProject1Task4,
    commentProject1Task5: commentProject1Task5,
    commentProject1Task6: commentProject1Task6,
    commentProject1Task7: commentProject1Task7,
    commentProject1Task8: commentProject1Task8,
    commentProject1Task9: commentProject1Task9,
    commentProject1Task10: commentProject1Task10,
    commentProject2Task1: commentProject2Task1,
    commentProject2Task2: commentProject2Task2,
    commentProject2Task3: commentProject2Task3,
    commentProject2Task4: commentProject2Task4,
    commentProject2Task5: commentProject2Task5,
    commentProject2Task6: commentProject2Task6,
    project1tasks: project1tasks,
    project2tasks: project2tasks,
    project3tasks: project3tasks,
    userrole: userrole,
    // teamMember: teamMember,
    // taskStatus: taskStatus
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
const updateProjectTeamMember = async (projectName, teamMember) => {
    try{
        await firestoreDB.collection("Projects").doc(projectName).update(teamMember[0]);
    } catch(e){
        console.log(e);
    }
}
const insertNewTask = async (projectName, taskName, taskData, taskIndex) => {
    try{
        await firestoreDB.collection("Projects").doc(projectName).collection("Tasks").doc(taskName).set(taskData[taskIndex]);
    }catch(e){
        console.log(e);
    }
}
const updateTaskStatus = async (projectName, taskName, taskStatus, taskIndex) => {
    try{
        await firestoreDB.collection("Projects").doc(projectName).collection("Tasks").doc(taskName).update(taskStatus[taskIndex]);
    } catch(e){
        console.log(e);
    }
}
const insertNewComment = async (projectName, taskName, commentData, commentIndex) => {
    try{
        await firestoreDB.collection("Projects").doc(projectName).collection("Tasks").doc(taskName).update(commentData[commentIndex]);
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
// for(i=0;i<user;i++){
//     insertUserData(myData.user[i].useremail, myData.user, i);
// }

// add new projects to database (no tasks data, no comment data)
for(i=0;i<projects.length;i++){
    insertNewProject(myData.projects[i].projectName, myData.projects, i);
}

// // add new tasks to database (no comment data)
for(i=0;i<project1tasks.length;i++){
    insertNewTask(myData.projects[0].projectName, myData.project1tasks[i].taskName, myData.project1tasks, i);
}
for(i=0;i<project2tasks.length;i++){
    insertNewTask(myData.projects[1].projectName, myData.project2tasks[i].taskName, myData.project2tasks, i);
}
for(i=0;i<project3tasks.length;i++){
    insertNewTask(myData.projects[2].projectName, myData.project3tasks[i].taskName, myData.project3tasks, i);
}

// add new comments to database
for(i=0;i<commentProject1Task1.length;i++){
    insertNewComment(myData.projects[0].projectName, myData.project1tasks[0].taskName, myData.commentProject1Task1, i);
}
for(i=0;i<commentProject1Task2.length;i++){
    insertNewComment(myData.projects[0].projectName, myData.project1tasks[1].taskName, myData.commentProject1Task2, i);
}
for(i=0;i<commentProject1Task3.length;i++){
    insertNewComment(myData.projects[0].projectName, myData.project1tasks[2].taskName, myData.commentProject1Task3, i);
}
for(i=0;i<commentProject1Task4.length;i++){
    insertNewComment(myData.projects[0].projectName, myData.project1tasks[3].taskName, myData.commentProject1Task4, i);
}
for(i=0;i<commentProject1Task5.length;i++){
    insertNewComment(myData.projects[0].projectName, myData.project1tasks[4].taskName, myData.commentProject1Task5, i);
}
for(i=0;i<commentProject1Task6.length;i++){
    insertNewComment(myData.projects[0].projectName, myData.project1tasks[5].taskName, myData.commentProject1Task6, i);
}
for(i=0;i<commentProject1Task7.length;i++){
    insertNewComment(myData.projects[0].projectName, myData.project1tasks[6].taskName, myData.commentProject1Task7, i);
}
for(i=0;i<commentProject1Task8.length;i++){
    insertNewComment(myData.projects[0].projectName, myData.project1tasks[7].taskName, myData.commentProject1Task8, i);
}
for(i=0;i<commentProject1Task9.length;i++){
    insertNewComment(myData.projects[0].projectName, myData.project1tasks[8].taskName, myData.commentProject1Task9, i);
}
for(i=0;i<commentProject1Task10.length;i++){
    insertNewComment(myData.projects[0].projectName, myData.project1tasks[9].taskName, myData.commentProject1Task10, i);
}
for(i=0;i<commentProject2Task1.length;i++){
    insertNewComment(myData.projects[1].projectName, myData.project2tasks[0].taskName, myData.commentProject2Task1, i);
}
for(i=0;i<commentProject2Task2.length;i++){
    insertNewComment(myData.projects[1].projectName, myData.project2tasks[1].taskName, myData.commentProject2Task2, i);
}
for(i=0;i<commentProject2Task3.length;i++){
    insertNewComment(myData.projects[1].projectName, myData.project2tasks[2].taskName, myData.commentProject2Task3, i);
}
for(i=0;i<commentProject2Task4.length;i++){
    insertNewComment(myData.projects[1].projectName, myData.project2tasks[3].taskName, myData.commentProject2Task4, i);
}
for(i=0;i<commentProject2Task5.length;i++){
    insertNewComment(myData.projects[1].projectName, myData.project2tasks[4].taskName, myData.commentProject2Task5, i);
}
for(i=0;i<commentProject2Task6.length;i++){
    insertNewComment(myData.projects[1].projectName, myData.project2tasks[5].taskName, myData.commentProject2Task6, i);
}

// add userroles to database
// for(i=0;i<userrole.length;i++){
//  insertUserRoles(myData.userrole[i].userrole, myData.userrole,i);
// }

// After first run - comment out lines 216-238, uncomment below and rerun this file.
// updateProjectTeamMember(myData.project[0].projectName, myData.teamMember);

// updateTaskStatus(myData.project[0].projectName, myData.task[2].taskName, myData.taskStatus, 0);
}