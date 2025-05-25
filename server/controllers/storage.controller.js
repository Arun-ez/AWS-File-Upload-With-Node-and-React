import { s3 } from '../configs/s3.config.js';
import { v4 as uuid } from 'uuid';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const pushObject = async (req, res) => {

    const { file } = req;
    const { folder } = req.params;

    if (!file) {
        return res.status(404).send({ message: 'File not found' });
    }

    const extention = file.originalname.split(".").pop();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${folder}/${uuid()}.${extention}`.split("-").join(""),
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const pubObjectCommand = new PutObjectCommand(params);

    try {
        await s3.send(pubObjectCommand);
        const url = `${process.env.AWS_BASE_URL}/${params.Key}`;
        return res.send({ message: 'File Uploaded', url });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}

const updateObject = async (req, res) => {

    const { file } = req;
    const { url } = req.body;

    if (!file) {
        return res.status(404).send({ message: 'File not found' });
    }

    if (!url) {
        return res.status(404).send({ message: 'Url not found' });
    }

    const { pathname } = new URL(url);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: pathname.substring(1),
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const pubObjectCommand = new PutObjectCommand(params);

    try {
        await s3.send(pubObjectCommand);
        const url = `${process.env.AWS_BASE_URL}/${params.Key}`
        return res.send({ message: 'File Updated', url });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}

const removeObject = async (req, res) => {

    const { url } = req.query;

    if (!url) {
        return res.status(404).send({ message: 'Url not found' });
    }

    const { pathname } = new URL(url);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: pathname.substring(1), //removing the first '/' from the pathname
    }

    const deleteObejctCommand = new DeleteObjectCommand(params);

    try {
        await s3.send(deleteObejctCommand);
        return res.send({ message: 'File Removed', url });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}

export { pushObject, updateObject, removeObject }
