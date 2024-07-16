const multer = require('multer');
const path = require('path');


const uploads = {
    pdf: {
        path: path.join(__dirname, 'public', 'uploads', 'pdf'),
    },
    image: {
        path: path.join(__dirname, 'public', 'uploads', 'image'),
    },
    video: {
        path: path.join(__dirname, 'public', 'uploads', 'video'),
    },
    audio: {
        path: path.join(__dirname, 'public', 'uploads', 'audio'),
    },
    other: {
        path: path.join(__dirname, 'public', 'uploads', 'other'),
    }
}

class Storage {
    constructor(type) {
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploads[type].path);
            },
            filename: (req, file, cb) => {
                cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
            }
        });
    }
}

module.exports = {
    pdf: new Storage('pdf'),
    image: new Storage('image'),
    video: new Storage('video'),
    audio: new Storage('audio'),
    other: new Storage('other')
};