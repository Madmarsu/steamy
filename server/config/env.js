 // LOCAL DEV VARIBLES
let env = {
    NODE_ENV: 'development',
    PORT: 3000,
    DBPROTOCOL: 'mongodb',
    DBUSERNAME: 'steam',
    DBPASSWORD: 'lets-get-steamy',
    DBHOST: 'ds058369.mlab.com',
    DBNAME: 'steamy',
    SERVERNAME: 'dev-server'
}

// MAPS env TO ACTUAL ENVIRONMENT
if(process.env.NODE_ENV == 'development'){
    Object.keys(env).forEach(v => {
        process.env[v] = env[v]
    })
} else {
    Object.keys(env).forEach(v => {
        env[v] = process.env[v] || env[v]
        process.env[v] = env[v]
    })
}

// MongoDB Connection String Builder
env.CONNECTIONSTRING = `${env.DBPROTOCOL}://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`
process.env.CONNECTIONSTRING = env.CONNECTIONSTRING

exports = env