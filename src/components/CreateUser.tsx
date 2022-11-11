import React, { useState } from "react";

import "./CreateUser.css";

interface CreateUserProps {
    needUpdateHandler: () => void;
}

function CreateUser({ needUpdateHandler }: CreateUserProps) {

    const [rankInput, setRankInput] = useState<number>();
    const rankChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setRankInput(Number(event.target.value));
    const [nameInput, setNameInput] = useState('');
    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setNameInput(event.target.value);

    const createUserHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await fetch('https://trainee-test-backend.herokuapp.com/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rank: rankInput,
                name: nameInput
            })
        })
        needUpdateHandler();
    }

    return (
        <form onSubmit={createUserHandler}>
            <div className="create-user__container">
                <input placeholder="rank" className="create-user__rank-input" value={rankInput} onChange={rankChangeHandler} />
                <p>,</p>
                <input placeholder="name" className="create-user__name-input" value={nameInput} onChange={nameChangeHandler} />
                <button type="submit" className="create-user__button">Create</button>
            </div>
        </form>
    );
}

export default CreateUser;