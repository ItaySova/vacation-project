import { Socket, io } from "socket.io-client";



class SocketIoService{
    private socket: Socket;

    public connect(gotMassage: Function): void{
        this.socket = io("https://localhost:4000");
        this.socket.on("msg-from-server", (msg:string)=>{
            gotMassage(msg);
        })
    }

    public send(msg:string): void{
        alert("massage sent from socket sevice")
        this.socket.emit("msg-from-client", msg)
    }

    public disconnect(): void{
        this.socket.disconnect()
    }
}

const socketService = new SocketIoService();

export default socketService;