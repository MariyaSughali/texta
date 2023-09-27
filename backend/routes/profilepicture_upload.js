/*jslint es6 */
const express = require("express");
const router = express.Router();

const aws = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");

const s3 = new aws.S3({
    accessKeyId: "AKIAWJUYWBOYM2OA5BTO",
    secretAccessKey: "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",
    signatureVersion: 'v4',
    region: 'ap-south-1',
    endpoint: 's3.ap-south-1.amazonaws.com'
});

const upload = multer(
    {
        storage: multers3({
            s3: s3,
            bucket: "tranxify",
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.originalname });
            },
            key: function (req, file, cb) {
                cb(null, file.originalname);
            }
            
        })
    }
);

router.post('/upload', upload.single('photos'), function (req, res) {
    "use strict";
    res.send({data: req.file, msg: 'Successfully uploaded files!'});
});

module.exports = router;