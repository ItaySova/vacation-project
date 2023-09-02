import {Server as HTTPSServer} from 'https'
import {Socket, Server as SocketIoServer} from 'socket.io'

function socketIoLogic(httpsServer: HTTPSServer):void{
    const options = {
        cors: {
            origin: "http://localhost:3000"
        }
    }
    const mySocketIOServer = new SocketIoServer(httpsServer);
    mySocketIOServer.sockets.on("connection", (socket : Socket)=>{
        console.log("connected to socket")

        socket.on("msg-from-client", (msg:string)=>{
            socket.emit("msg-from-server", msg) // echo the massage
        })
    })
}

export default socketIoLogic;