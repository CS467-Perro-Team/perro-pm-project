/**
 * Sample Data for Firestore
 *  The arrays are collections, and the objects are the documents
 */
const users = [
    {
        firstName: "Harrison",
        lastName: "Barnes",
        permission: {
            commenter: true,
            projectCreator: false,
            taskCreator: true
        },
        login: {
            password: "bh4040",
            username: "BarnesH"
        }
    },
    {
        firstName: "Kyle",
        lastName: "Guy",
        permission: {
            commenter: true,
            projectCreator: false,
            taskCreator: true
        },
        login: {
            password: "GK1991",
            username: "GuyK"
        }
    },
    {
        firstName: "Robert",
        lastName: "James",
        permission: {
            commenter: true,
            projectCreator: false,
            taskCreator: true
        },
        login: {
            password: "jr1988",
            username: "JamesR"
        }
    },
    {
        firstName: "John",
        lastName: "Smith",
        permission: {
            commenter: true,
            projectCreator: true,
            taskCreator: true
        },
        login: {
            password: "myPwd123",
            username: "SmithJ88"
        }
    }
]

const projects = [
    {
        projectName: "The Web App Project",
        dueDate: "",
        details: "This are some details for the Web App Project...",
        startDate: "",
        status: "in progress"
    },
    {
        projectName: "Ticket Machine Project",
        dueDate: "",
        details: "This are some details for the Ticket Machine...",
        startDate: "",
        status: "in progress"
    },
    {
        projectName: "The Movie App Project",
        dueDate: "",
        details: "This are some details for the Movie App Project...",
        startDate: "",
        status: "in progress"
    },
    {
        projectName: "Better Firestore Project",
        dueDate: "",
        details: "This are some details for the Web App Project...",
        startDate: "",
        status: "in progress"
    },
]

const tasksForProject1 = [
    {
        assignee: null,
        completed: false,
        dueDate:"",
        taskName: "Create a Test Plan",
        description: "Describe something about test plan ..."
    },
    {
        assignee: null,
        completed: false,
        dueDate:"",
        taskName: "Create Web App UI",
        description: "Describe something about web app UI..."
    },
    {
        assignee: null,
        completed: true,
        dueDate:"",
        taskName: "Create Database",
        description: "Describe something about creating the database..."
    },
]


const tasksForProject2 = [
    {
        assignee: null,
        completed: true,
        dueDate:"",
        taskName: "Design UI",
        description: "Describe something about designing the UI..."
    },
    {
        assignee: null,
        completed: true,
        dueDate:"",
        taskName: "Build UI",
        description: "Describe something about building the UI..."
    },
    {
        assignee: null,
        completed: false,
        dueDate:"",
        taskName: "Design Authentication",
        description: "Describe something about creating the database..."
    },
]


const tasksForProject3 = [
    {
        assignee: null,
        completed: true,
        dueDate:"",
        taskName: "Write test cases",
        description: "Describe something about writing test cases..."
    }
]


const tasksForProject4 = [
    {
        assignee: null,
        completed: false,
        dueDate:"",
        taskName: "create mockups",
        description: "Describe something about creating the mockups..."
    }
]

const comments = [
    {
        task: null,
        user: null,
        text: "This task is behind schedule",
        date: ""
    },
    {
        task: null,
        user: null,
        text: "We may need to think about reducing the priority of this task",
        date: ""
    }
]

const collaborators = [
    {
        task: null,
        user: null
    }
]

const sampleData = {
    users: users,
    projects: projects,
    Tasks: [
        tasksForProject1,
        tasksForProject2,
        tasksForProject3,
        tasksForProject4
    ],
    comments: comments,
    collaborators: collaborators
}

exports.data = sampleData;
