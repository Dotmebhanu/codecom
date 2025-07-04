import {io} from "socket.io-client";

export const initSocket=async()=>{
    const option={
        "force new connection" : true,
        reconnectionAttempt:"infinity",
        transports:['Websocket'],
    };
    return io('http://localhost:4000', option);
};

//created  a socket for client side;