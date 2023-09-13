import {Server as HTTPSServer} from 'https'
import {Socket, Server as SocketIoServer} from 'socket.io'

function socketIoLogic(httpsServer: HTTPSServer):void{
    const options = {
        cors: {
            origin: "http://localhost:3000"
        }
    }
    const mySocketIOServer = new SocketIoServer(httpsServer, options);
    mySocketIOServer.sockets.on("connection", (socket : Socket)=>{
        console.log(`connected to socket, number of clients: ${mySocketIOServer.engine.clientsCount}`)

        socket.on("msg-from-client", (msg:string)=>{
            // socket.emit("msg-from-server", msg) // echo the massage
            console.log(`massage emitted: ${msg}`)
            mySocketIOServer.sockets.emit("msg-from-server", msg)
        })

        socket.on("disconnect", ()=>{
            mySocketIOServer.sockets.emit("msg-from-server", "client has left the chat")
            console.log(`client has disconnected, remaining clients: ${mySocketIOServer.engine.clientsCount}`)
        })
    })
}

export default socketIoLogic;