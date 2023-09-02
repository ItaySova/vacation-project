import { Socket, io } from "socket.io-client";



class SocketIoService{
    private socket: Socket;

    public connect(gotMassage: Function){
        this.socket = io("https://localhost:4000");
        this.socket.on("msg-from-server", (msg:string)=>{
            gotMassage(msg);
        })
    }

    public send(msg:string){
        this.socket.emit("msg-from-client", msg)
    }
}

const socketService = new SocketIoService();

export default socketService;