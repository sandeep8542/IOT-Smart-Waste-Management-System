import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {

const [notifications,setNotifications] = useState([]);

const addNotification = (message, severity="info") => {

setNotifications(prev => [

{
id:Date.now(),
message,
severity,
read:false,
time:new Date().toLocaleTimeString()
},

...prev

]);

};

const markAsRead = (id)=>{

setNotifications(prev =>
prev.map(n =>
n.id === id ? {...n,read:true} : n
)
);

};

const clearNotifications = ()=>{

setNotifications([]);

};

return(

<NotificationContext.Provider
value={{
notifications,
addNotification,
markAsRead,
clearNotifications
}}
>

{children}

</NotificationContext.Provider>

);

};