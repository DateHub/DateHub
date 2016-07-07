var server = require('./server/server.js');
server.set('port', process.env.port || 3000);
server.listen(server.get('port'));