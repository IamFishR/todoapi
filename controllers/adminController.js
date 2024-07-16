const multerModule = require('../module/multerConfig');

class AdminController {

    async uploadFile(req, res) {
        // get the type of the file
        const type = req.body.type;
        // get the file
        const file = req.file;
        // get the user
        const user = req.user;

        if (!file) {
            return res.status(400).json({ error: "File is required" });
        }
        if (!type) {
            return res.status(400).json({ error: "Type is required" });
        }

        let upload;
        if (file.mimetype === 'application/pdf') {
            upload = multerModule.pdf;
        } else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            upload = multerModule.image;
        } else if (file.mimetype === 'video/mp4') {
            upload = multerModule.video;
        } else if (file.mimetype === 'audio/mpeg') {
            upload = multerModule.audio;
        } else {
            upload = multerModule.other;
        }

        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            res.status(201).json({ message: "File uploaded successfully" });
        });
    }

}

module.exports = new AdminController();