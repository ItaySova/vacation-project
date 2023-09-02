import { Socket } from "socket.io-client";



class SocketIoService{
    private socket: Socket
}

const socketService = new SocketIoService();

export default socketService;