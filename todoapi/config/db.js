const mongoose = require('mongoose');
require('dotenv').config();


const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASS);
const cluster = process.env.MONGO_CLUSTER;
const database = process.env.MONGO_DB;
const url = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        return await mongoose.connect(url, {});
    } catch (err) {
        console.log('it is not able to connect to the database')
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;

// - collections/
//     - users/
//         - _id
//         - username String
//         - email String
//         - password String
//         - roleids [] (array of role ids)
//         - createdAt Date
//         - updatedAt Date
//         - additionalInfo {} (object of additional information)
//             - status
//             - bio
//             - website
//             - github
//             - outlook
//             - google
//             - calendly
//             - microsoft_teams
//     - role ('superadmin', 'admin', 'user', 'support', 'guest')
//         - _id
//         - rolename 
//         - createdAt
//         - updatedAt
//     - controllers/
//         - _id
//         - controllername
//         - createdAt
//         - updatedAt
//     - actions/
//         - _id
//         - actionname
//         - controllerId
//         - createdAt
//         - updatedAt
//     - rolepermissions/
//         - _id
//         - roleId
//         - controllerId
//         - actionId
//         - createdAt
//         - updatedAt
//     - todos/
//         - _id
//         - title
//         - description
//         - dueDate
//         - priority
//         - status (want to do, doing it, done, have done some part, doing it later, do not want to do, do or die, etc)
//         - projectId []
//         - tags [] (tagnames as string)
//         - attachments []
//         - userId
//         - createdAt
//         - updatedAt
//     - subtasks/
//         - _id
//         - title
//         - description
//         - dueDate
//         - priority
//         - status (want to do, doing it, done, have done some part, doing it later, do not want to do, do or die, etc)
//         - createdAt
//         - updatedAt
//         - todoId
//     - comments/
//         - _id
//         - refId (reference id) - can be todoId, subtaskId, projectId, etc
//         - comments [] (array of comments)
//             - createdAt
//             - updatedAt
//             - comment
//             - userInfo {}
//                 - userId
//                 - username
//         - otherInfo {}
//             - ispinned
//     - attachments/
//         - _id
//         - refId (reference id) - can be todoId, subtaskId, projectId, etc
//         - name
//         - contentType (image, video, audio, document, etc)
//         - url
//         - createdAt
//     - categories/
//         - _id
//         - name
//         - color
//     - projects/
//         - _id
//         - name
//         - description
//         - color
//         - refId (reference id) - todoId
//         - tagIds []
//         - categoryIds []
//         - createdAt
//         - updatedAt
//         - dueDate
//         - status (want to do, doing it, done, have done some part, doing it later, do not want to do, do or die, etc)
//         - priority (high, medium, low)