import createBareServer from '@tomphttp/bare-server-node';
import http from 'http';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors())
const httpServer = http.createServer(app);


const bareServer = createBareServer('/', {
    logErrors: false,
    localAddress: undefined,
    maintainer: {
        email: 'tomphttp@sys32.dev',
        website: 'https://github.com/tomphttp/',
    },
});

httpServer.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        expressServer(req, res);
    }
});

httpServer.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

httpServer.on('listening', () => {
    console.log('HTTP server listening');
});

httpServer.listen({
    port: 8080,
});