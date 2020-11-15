/**
 * Sample Data for Firestore
 *  The arrays are collections, and the objects are the documents
 */
const user = [
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

const project = [
    {
        projectName: "The Web App Project",
        dueDate: "",
        projectDescription: "This are some details for the Web App Project...",
        startDate: "",
        team: [],
        status: "in progress"
    },
    {
        projectName: "Ticket Machine Project",
        dueDate: "",
        projectDescription: "This are some details for the Ticket Machine...",
        startDate: "",
        team: [],
        status: "in progress"
    },
    {
        projectName: "The Movie App Project",
        dueDate: "",
        projectDescription: "This are some details for the Movie App Project...",
        startDate: "",
        team: [],
        status: "in progress"
    },
    {
        projectName: "Better Firestore Project",
        dueDate: "",
        projectDescription: "This are some details for the Web App Project...",
        startDate: "",
        team: [],
        status: "in progress"
    },
]

const tasksForProject1 = [
    {
        assignee: null,
        completed: false,
        dueDate:"",
        taskName: "Create a Test Plan",
        taskDescription: "Describe something about test plan ..."
    },
    {
        assignee: null,
        completed: false,
        dueDate:"",
        taskName: "Create Web App UI",
        taskDescription: "Describe something about web app UI..."
    },
    {
        assignee: null,
        completed: true,
        dueDate:"",
        taskName: "Create Database",
        taskDescription: "Describe something about creating the database..."
    },
]


const tasksForProject2 = [
    {
        assignee: null,
        completed: true,
        dueDate:"",
        taskName: "Design UI",
        taskDescription: "Describe something about designing the UI..."
    },
    {
        assignee: null,
        completed: true,
        dueDate:"",
        taskName: "Build UI",
        taskDescription: "Describe something about building the UI..."
    },
    {
        assignee: null,
        completed: false,
        dueDate:"",
        taskName: "Design Authentication",
        taskDescription: "Describe something about creating the database..."
    },
]


const tasksForProject3 = [
    {
        assignee: null,
        completed: true,
        dueDate:"",
        taskName: "Write test cases",
        taskDescription: "Describe something about writing test cases..."
    }
]

/**
 * Sample Data for Firestore
 *  The arrays are collections, and the objects are the documents
 */
const user = [
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

const project = [
    {
        projectName: "The Web App Project",
        dueDate: "12/04/2020",
        projectDescription: "This are some details for the Web App Project...",
        startDate: "10/12/2020",
        team: [],
        status: "in progress"
    },
    {
        projectName: "Ticket Machine Project",
        dueDate: "12/04/2020",
        projectDescription: "This are some details for the Ticket Machine...",
        startDate: "10/12/2020",
        team: [],
        status: "in progress"
    },
    {
        projectName: "The Movie App Project",
        dueDate: "01/31/2021",
        projectDescription: "This are some details for the Movie App Project...",
        startDate: "12/15/2020",
        team: [],
        status: "in progress"
    },
    {
        projectName: "Better Firestore Project",
        dueDate: "12/04/2020",
        projectDescription: "This are some details for the Web App Project...",
        startDate: "11/03/2020",
        team: [],
        status: "in progress"
    },
]

const tasksForProject1 = [
    {
        assignee: "warnemun",
        completed: false,
        dueDate:"10/12/2020",
        taskName: "Create a Test Plan",
        taskDescription: "Describe something about test plan ..."
    },
    {
        assignee: "warnemun",
        completed: false,
        dueDate:"11/16/2020",
        taskName: "Create Web App UI",
        taskDescription: "Describe something about web app UI..."
    },
    {
        assignee: "lindorg",
        completed: true,
        dueDate:"10/26/2020",
        taskName: "Create Database",
        taskDescription: "Describe something about creating the database..."
    },
]


const tasksForProject2 = [
    {
        assignee: "warnemun",
        completed: true,
        dueDate:"10/26/2020",
        taskName: "Design UI",
        taskDescription: "Describe something about designing the UI..."
    },
    {
        assignee: "warnemun",
        completed: true,
        dueDate:"11/16/2020",
        taskName: "Build UI",
        taskDescription: "Describe something about building the UI..."
    },
    {
        assignee: "lindorg",
        completed: false,
        dueDate:"11/23/2020",
        taskName: "Design Authentication",
        taskDescription: "Describe something about creating the database..."
    },
]


const tasksForProject3 = [
    {
        assignee: "lindorg",
        completed: true,
        dueDate:"11/30/2020",
        taskName: "Write test cases",
        taskDescription: "Describe something about writing test cases..."
    }
]


const tasksForProject4 = [
    {
        assignee: "warnemun",
        completed: false,
        dueDate:"10/19/2020",
        taskName: "create mockups",
        taskDescription: "Describe something about creating the mockups..."
    }
]

const comment = [
    {
        task: "create mockups",
        user: "warnemun",
        text: "This task is behind schedule",
        date: "10/19/2020"
    },
    {
        task: "",
        user: "lindorg",
        text: "We may need to think about reducing the priority of this task",
        date: ""
    }
]

const collaborator = [
    {
        task: "create mockups",
        user: "lindorg"
    }
]

const sampleData = {
    user: user,
    project: project,
    Task: [
        tasksForProject1,
        tasksForProject2,
        tasksForProject3,
        tasksForProject4
    ],
    comment: comment,
    collaborator: collaborator
}

exports.data = sampleData;

const tasksForProject4 = [
    {
        assignee: null,
        completed: false,
        dueDate:"",
        taskName: "create mockups",
        taskDescription: "Describe something about creating the mockups..."
    }
]

const comment = [
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

const collaborator = [
    {
        task: null,
        user: null
    }
]

const sampleData = {
    user: user,
    project: project,
    Tasks: [
        tasksForProject1,
        tasksForProject2,
        tasksForProject3,
        tasksForProject4
    ],
    comment: comment,
    collaborator: collaborator
}

exports.data = sampleData;
