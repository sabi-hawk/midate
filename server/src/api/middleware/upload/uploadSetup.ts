import AWS from 'aws-sdk';
import multer from "multer"
import multerS3 from "multer-s3";
 
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({
    accessKeyId: 'AKIAQ4MCHJQF75RTFF4V',
    secretAccessKey: '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',
    signatureVersion: 'v4'
});

export const S3 = new AWS.S3();
// @ts-ignore
const isAllowedMimetype = (mime) => ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/x-ms-bmp', 'image/webp'].includes(mime.toString());
// @ts-ignore
const fileFilter = (req, file, callback) => {
    const fileMime = file.mimetype;
    if(isAllowedMimetype(fileMime)) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}
// @ts-ignore
const getUniqFileName = (originalname) => {
    const name = uuidv4();
    const ext = originalname.split('.').pop();
    return `${name}.${ext}`;
}

export const handleUploadMiddleware = multer({
    fileFilter,
    storage: multerS3({
        // @ts-ignore
        s3: S3,
        bucket: 'bdlbbsr',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const fileName = getUniqFileName(file.originalname);
            const s3_inner_directory = 'public_asset';
            const finalPath = `${s3_inner_directory}/${fileName}`;

            // @ts-ignore
            file.newName = fileName;

            cb(null, finalPath );
        }
    })
});
