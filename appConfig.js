var developmentDatabase = {
    postgres: {
    host: 'ec2-3-214-4-151.compute-1.amazonaws.com',
    port: 5432,
    database: 'ddq2kjcdvrtag1',
    user: 'ihnpihswzwwfhl',
    password: '6e82cd3fb12f8c5475e4a20b0e803c9fc6673def71164b5d8ee67d35f95ca31b'
    }
    }
    
    var connectionString = "postgres://ihnpihswzwwfhl:6e82cd3fb12f8c5475e4a20b0e803c9fc6673def71164b5d8ee67d35f95ca31b@ec2-3-214-4-151.compute-1.amazonaws.com:5432/ddq2kjcdvrtag1";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }