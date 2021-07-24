import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FromElements/Button';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = props => {
    if(props.items.length === 0){
        return <div className="center place-list">
            <Card>
                <h2>No places found. Maybe add one?</h2>
                <Button to="/places/new">Share Place</Button>
            </Card>
        </div>
    }

    return <ul className="place-list">
        {props.items.map(place => (
            <PlaceItem 
                key = {place.id}
                id = {place.id}
                image = {place.image}
                title = {place.title}
                description = {place.description}
                address = {place.address}
                creatorId = {place.creator}
                coordinates = {place.location}
                onDelete = {props.deletePlace}
            />
        ))}
    </ul>
};

export default PlaceList;