import { IUser } from '../shared/interfaces';
import UserCard from './UserCard';
import './UsersList.css';

interface UsersListProps {
    usersList: IUser[],
    needUpdateHandler: () => void
}

function UsersList({ usersList, needUpdateHandler }: UsersListProps) {

    return (
        <div className='users-list__container'>
            {usersList.map((user, i) => {
                let previousUserRank, nextUserRank;
                usersList[i - 1] === undefined ? previousUserRank = null : previousUserRank = usersList[i - 1].rank;
                usersList[i + 1] === undefined ? nextUserRank = null : nextUserRank = usersList[i + 1].rank;
                return <UserCard key={user.id} name={user.name} rank={user.rank} id={user.id} previousUserRank={previousUserRank} nextUserRank={nextUserRank} needUpdateHandler={needUpdateHandler} />;
            })}
        </div>
    );
}

export default UsersList;