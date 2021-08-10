const mssql = require('mssql');

module.export = connectToDatabase()

    async function connectToDatabase() {
        //await mssql.connect('mssql://sa:Dockersql123@localhost:1433/note?encrypt=true')
        await mssql.connect('mssql://sa:123@localhost:1433/note?encrypt=false')
}

/*

My username: sa
Password: 123
Server: localhost:1433
Database name: note

*/
