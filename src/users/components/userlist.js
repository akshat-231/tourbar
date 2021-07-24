import React from 'react'
import UserItem from './useritem';

import './userlist.css';

const UserList = props => {
    if(props.items.length === 0){
        return (
            <div className="center">
                <h2>
                    No users Found!!
                </h2>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {props.items.map(user => (
                <UserItem 
                    key = {user.id}
                    id = {user.id}
                    name = {user.name}
                    image = {user.image}
                    placeCount = {user.places.length}
                />
            ))}
        </ul>
    );
};

export default UserList;