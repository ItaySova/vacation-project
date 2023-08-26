import {Server as HTTPSServer} from 'https'
import {Server as SocketIoServer} from 'socket.io'

function socketIoLogic(httpsServer: HTTPSServer):void{
    const mySocketIOServer = new SocketIoServer(httpsServer);
}

export default socketIoLogic;