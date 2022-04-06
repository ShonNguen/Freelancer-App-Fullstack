const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const dbConfig = require('../config/db');

let storage = new GridFsStorage({
    url: dbConfig.url + dbConfig.database,
    //how to establish the connection
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ['image/png', 'image/jpeg'];

        //make sure that the duplicates never occur
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-SN-${file.originalname}`;
            return filename;
        }

        return {
            //bucketname - where to save it? 
            bucketName: dbConfig,
            filename: `${Date.now()}-SN-${file.originalname}`
        }
    }
}); 

let uploadFiles = multer({storage: storage}).array("file", 10); 
let uploadFilesMiddleware = util.promisify(uploadFiles); 
module.exports = uploadFilesMiddleware; 