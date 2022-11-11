import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faTimes, faFloppyDisk, faArrowUp, faArrowDown, faAngleUp, faAngleDown, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { IUser } from '../shared/interfaces';
import './UserCard.css';

interface UserCardProps extends IUser {
    previousUserRank: number | null,
    nextUserRank: number | null,
    needUpdateHandler: () => void
}

function UserCard({ name, rank, id, previousUserRank, nextUserRank, needUpdateHandler }: UserCardProps) {

    const [isDeleted, setIsDeleted] = useState(false);
    const [isChangeOpen, setIsChangeOpen] = useState(false);

    const [rankInput, setRankInput] = useState(rank);
    const rankChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setRankInput(Number(event.target.value));
    const [nameInput, setNameInput] = useState(name);
    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setNameInput(event.target.value);

    const deleteUserHandler = () => {
        fetch(`https://trainee-test-backend.herokuapp.com/api/users/${id}`, {
            method: 'DELETE'
        });
        setIsDeleted(true);
    }
    const changeUserHandler = async () => {
        await fetch(`https://trainee-test-backend.herokuapp.com/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rank: rankInput,
                name: nameInput
            })
        })
        setIsChangeOpen(false);
        needUpdateHandler();
    }
    const userOrderUpHandler = async () => {
        let newRank: number;
        nextUserRank == null ? newRank = rank : newRank = nextUserRank + 1;
        await fetch(`https://trainee-test-backend.herokuapp.com/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rank: newRank
            })
        })
        setRankInput(newRank);
        needUpdateHandler();
    }
    const userOrderDownHandler = async () => {
        let newRank: number;
        previousUserRank == null ? newRank = rank : newRank = previousUserRank - 1;
        await fetch(`https://trainee-test-backend.herokuapp.com/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rank: newRank
            })
        })
        setRankInput(newRank);
        needUpdateHandler();
    }

    if (isDeleted) {
        return (<></>);
    }
    else {
        return (
            <div className="user-card__container">
                {!isChangeOpen
                    &&
                    <>
                        <div className='user-card__arrow-container'>
                            <FontAwesomeIcon className="user-card__arrow-up-btn" icon={faCaretUp} onClick={userOrderDownHandler} />
                            <FontAwesomeIcon className="user-card__arrow-down-btn" icon={faCaretDown} onClick={userOrderUpHandler} />
                        </div>
                        <p className="user-card__info"><span className='user-card__span'></span>{rank} , {name}</p>
                        <FontAwesomeIcon className="user-card__change-btn" icon={faPencil} onClick={() => setIsChangeOpen(true)} />
                    </>
                }
                {isChangeOpen
                    &&
                    <>
                        <input placeholder="rank" className="user-card__rank-input" value={rankInput} onChange={rankChangeHandler} />
                        <p>,</p>
                        <input placeholder="name" className="user-card__name-input" value={nameInput} onChange={nameChangeHandler} />
                        <FontAwesomeIcon className="user-card__cancel-btn" icon={faTimes} onClick={() => setIsChangeOpen(false)} />
                        <FontAwesomeIcon className="user-card__save-btn" icon={faFloppyDisk} onClick={changeUserHandler} />
                    </>
                }
                <FontAwesomeIcon className={isChangeOpen ? "user-card__delete-btn-left" : "user-card__delete-btn"} icon={faTrashCan} onClick={deleteUserHandler} />
            </div>
        );
    }
}

export default UserCard;