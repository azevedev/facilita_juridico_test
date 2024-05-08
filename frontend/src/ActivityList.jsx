/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
const ActivityList = ({ activities }) => {
    const [newActivities, setActivities] = useState([]);

    useEffect(() => {
        setActivities(activities);
    }, [activities])
    const toggleDone = async (activity) => {
        const url = `http://localhost:5000/activities/${activity.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                done: !activity.done
            }),
        }
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok || (response.status !== 200 && response.status !== 201) ) {
            alert(data.message);
            return;
        }
        setActivities(newActivities.map((act) => act.id === activity.id ? {...act, done: !activity.done} : act))
    }
    

    const handleDelete = async (activity) => {
        // confirm deletion
        if (!window.confirm(`Are you sure you want to delete it?`)) {
            return;
        }
        const url = `http://localhost:5000/activities/${activity.id}`;
        const options = {
            method: 'DELETE',
        }
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok || (response.status !== 200 && response.status !== 201) ) {
            alert(data.message);
            return;
        }
        setActivities(newActivities.filter((act) => act.id !== activity.id))
    }

    return <>
        <h2>Your Activities:</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Participants</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {newActivities.map((activity) => (
                    <tr key={activity.id} className='tr-activity'>
                        <td>{activity.name}</td>
                        <td>$ {(activity.price * 100).toFixed(2)}</td>
                        <td>{activity.participants}</td>
                        <td>
                            {activity.done? 
                                <div style={{ color: 'green' }}>All Done</div> : 
                                <div style={{ color: 'yellow' }}>Working on it</div>
                            }
                        </td>
                        <td>
                            <button onClick={() => toggleDone(activity)}>
                                {activity.done? 'Undo' : 'Finish!'}
                            </button> 
                            
                        </td>
                        <th></th>
                        <th></th>
                        <button className='dropbtn' onClick={() => handleDelete(activity)}>X</button>
                    </tr>
                ))}
            </tbody>
        </table>
    </>;
};

export default ActivityList;