module.exports = {
    mongoDbUrl: process.env.MONGODB_URL,
    mySqlHost: process.env.DB_HOST_NAME,
    mySqlPort: process.env.DB_HOST_PORT,
    mySqlUser: process.env.DB_USER_NAME,
    mySqlPassword: process.env.DB_USER_PASSWORD,
    mySqlDataBase: process.env.DB_NAME,
    jwtKey: process.env.JWT_KEY,
    mailGunApiKey: process.env.MAILGUN_API_KEY,
    mailGunDomain: process.env.MAILGUN_DOMAIN,
    mailGunUrl: process.env.MAILGUN_URL,
    s3Endpoint: process.env.S3_ENDPOINT,
    bucketName: process.env.BUCKET_NAME
}