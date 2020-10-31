# initialize the database
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# use service account and initialize DB
cred = credentials.Certificate("/Users/gerson/Desktop/Oregon State University/Fall_2020/CS467/Project/webApp/perro-pm-project-firebase-adminsdk-hsjje-36ba9a93e4.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# create the data
#def createData()

# create collection and document
def insertData(collectionName, docName, data):
    doc_ref = db.collection(collectionName).document(docName)
    doc_ref.set(data)

# create an sub-collection for an existing document
def insertInnerCollectionWithData(parentCollection, childDoc, collectionName, docName, data):
    pCollect = db.collection(parentCollection)
    newInnerCollection = pCollect.document(childDoc).collection(collectionName)
    newInnerCollection.document(docName).set(data)

if __name__ == '__main__':
    # create user collection
    userData = {
        u'firstName': 'John',
        u'lastName': 'Smith',
        u'login': {
            u'username': 'Smith',
            u'password': 'myPwd123'
        },
        u'Permission': {
            u'projectCreator': False,
            u'taskCreator': True,
            u'commentor': True,
        }
    }
    insertData(u'Users', u'user', userData)
    # create collaborator collection
    collaboratorData = {
        u'userID': "",
        u'taskID': ""
    }
    insertData(u'Collaborators', u'taskCollaborator', collaboratorData)

    # create project collection
    projectData = {
        u'projectName': "Web App",
        u'startDate': "10/26/2020",
        u'dueDate': "01/26/2021",
        u'status': "in progress",
        u'details': "Some details...",
        u'Team': []
    }
    insertData(u'Projects', u'project', projectData)
    # create the sub-collection task
    taskData = {
        u'taskName': "Web App",
        u'assignee': ""
    }
    insertInnerCollectionWithData(u'Projects', u'project', u'Tasks', u'task', taskData)
    # create the sub-collection comments for a task
    commentData ={
        u'taskID': "",
        u'userID': "",
        u'text': "some text",
        u'date': "10/26/2020"
    }
    ref = db.collection(u'Projects').document(u'project').collection(u'Tasks').document(u'task').collection(u'Comments')
    ref.document('comment').set(commentData)


