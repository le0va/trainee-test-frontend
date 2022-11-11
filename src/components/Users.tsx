import { useState, useEffect } from "react";

import { IUser } from "../shared/interfaces";
import CreateUser from "./CreateUser";
import UsersList from "./UsersList";
import "./Users.css";

function Users() {

    const [needUpdate, setNeedUpdate] = useState(false);
    const needUpdateHandler = () => setNeedUpdate(!needUpdate);
    const [loadedUsers, setLoadedUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const sendRequest = async () => {
            const response = await fetch('https://trainee-test-backend.herokuapp.com/api/users');
            const responseData = await response.json();
            setLoadedUsers(responseData.users);
        }
        sendRequest();
    }, [needUpdate]);


    return (
        <div className="users__container">
            <CreateUser needUpdateHandler={needUpdateHandler} />
            <UsersList usersList={loadedUsers} needUpdateHandler={needUpdateHandler} />
        </div>

    );
}

export default Users;