const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

let storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    //how to establish the connection
    file: (req, file) => {
        const match = ['image/png', 'image/jpeg', 'image/jpg'];

        //make sure that the duplicates never occur
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-SN-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: 'projects',
            filename: `${Date.now()}-SN-${file.originalname}`
        }
    }
});

//'images' - name of the field 
let uploadFiles = multer({storage: storage}).array("files", 10);
let uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware; 