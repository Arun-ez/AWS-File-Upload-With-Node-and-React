import env from 'dotenv'
import { S3Client } from "@aws-sdk/client-s3";

env.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

export { s3 }