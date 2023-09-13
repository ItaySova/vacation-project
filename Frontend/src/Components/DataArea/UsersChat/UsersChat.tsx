import { SyntheticEvent, useEffect, useState } from "react";
import socketService from "../../../Services/SocketIoService";
import "./UsersChat.css";
import { massagesStore, MassagesActionType } from "../../../Redux/MassagesState";
import MassageModel from "../../../Models/MassageModel";
import { authStore } from "../../../Redux/AuthState";

function UsersChat(): JSX.Element {

    const [massage, setMassage] = useState<string>("");
    const [chatHistory, setCHat] = useState<MassageModel[]>([]);
    const [UserName,setName] = useState<string>();

    useEffect(()=>{
        const UserName = authStore.getState().user.firstName;
        setName(UserName);

        const unsubscribe = massagesStore.subscribe(()=>{
            const updatedChat = [...massagesStore.getState().massages];
            setCHat(updatedChat);
        })
    },[])

    function connect(){
        alert("connected")
        socketService.connect(gotMassage);
    }

    function gotMassage(msg:string){
        massagesStore.dispatch({type:MassagesActionType.addMassage, payload: {name: UserName, massage: msg} as MassageModel})
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
            {chatHistory.map( m =>
                <p>{m.name}:{m.massage}</p>)}
        </div>
    );
}

export default UsersChat;
