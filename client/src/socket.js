import {io} from "socket.io-client";

export const initSocket=async()=>{
    const option={
        "force new connection" : true,
        reconnectionAttempt:"infinity",
        transports:['websocket'],
    };
    return io(process.env.REACT_APP_BACKEND_URL, option);
};

//created  a socket for client side;