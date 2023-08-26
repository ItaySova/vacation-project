import {Server as HTTPSServer} from 'https'
import {Server as SocketIoServer} from 'socket.io'

function socketIoLogic(httpsServer: HTTPSServer):void{
    const options = {
        cors: {
            origin: "http://localhost:3000"
        }
    }
    const mySocketIOServer = new SocketIoServer(httpsServer);
    mySocketIOServer.sockets.on("connection", ()=>{
        console.log("connected to socket")
    })
}

export default socketIoLogic;