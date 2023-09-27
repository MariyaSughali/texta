/*jslint es6 */
const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");

const pool = require('../config/database');
const s3 = new aws.S3({
    accessKeyId: "AKIAWJUYWBOYM2OA5BTO",
    secretAccessKey: "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",
    signatureVersion: 'v4',
    region: 'ap-south-1',
    endpoint: 's3.ap-south-1.amazonaws.com'
});

// extract url from aws
router.get('/url/:filename/:id', function (req, res) {
    "use strict";
    const params = {
        Bucket: "tranxify",
        Key: req.params.filename,
        Expires: 604799
    };
    const id = req.params.id;
    s3.getSignedUrl("getObject", params, function (err, url) {
        if (err) {
            res.status(500).send('Error generating signed URL');
        } else {
            const imageUrl = url;
   // Update the PostgreSQL database with the generated URL
            pool.query("UPDATE user_table SET profile_pic_link=$1 WHERE id=$2", [imageUrl, id])
                .then(function () {
                    res.send(url);
                })
                .catch(function (error) {
                    console.error('Error updating the database with image URL:', error);
                    res.status(500).send('Error updating the database with image URL');
                });
        }
    });
});

module.exports = router;
