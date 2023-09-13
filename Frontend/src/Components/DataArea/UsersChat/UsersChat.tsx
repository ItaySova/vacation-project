import { SyntheticEvent, useState } from "react";
import socketService from "../../../Services/SocketIoService";
import "./UsersChat.css";
import { massagesStore, MassagesActionType } from "../../../Redux/MassagesState";
import MassageModel from "../../../Models/MassageModel";

function UsersChat(): JSX.Element {

    const [massage, setMassage] = useState<string>("");

    function connect(){
        alert("connected")
        socketService.connect(gotMassage);
    }

    function gotMassage(msg:string){
        massagesStore.dispatch({type:MassagesActionType.addMassage, payload: {name: "test", massage: msg} as MassageModel})
    }

    function disconnect(){
        socketService.disconnect()
        alert("user disconnected")
    }

    function sendMsg(){
        socketService.send(massage);
        if (massage !== "") {
            console.log("btn test")
            setMassage("")}
    }

    function handleMassage(args: SyntheticEvent){
        const massageToUpdate = (args.target as HTMLInputElement).value
        setMassage(massageToUpdate)
    }

    return (
        <div className="UsersChat">
			<button onClick={connect}>connect</button>
            <button onClick={disconnect}>disconnect</button>
            <br />
            <input type="text" onChange={handleMassage} value={massage}/>
            <button onClick={sendMsg}>send</button>
            {massagesStore.getState().massages.map( m =>
                <p>{m.name}:{m.massage}</p>)}
        </div>
    );
}

export default UsersChat;
