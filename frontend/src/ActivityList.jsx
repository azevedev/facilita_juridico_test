/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { updateActivity, deleteActivity } from '../services/api';
const ActivityList = ({ activities }) => {
    const [newActivities, setActivities] = useState([]);

    useEffect(() => {
        setActivities(activities);
    }, [activities])

    const handleUpdateActivity = async (activity) => {
        try {
          const updatedActivity = await updateActivity(activity);
          setActivities( newActivities.map((activity) =>
              activity.id === updatedActivity.id ? updatedActivity : activity)
          );
        } catch (error) {
            console.error(error);
            alert(error);
            return;
        }
      };
    
    const handleDeleteActivity = async (activity) => {
        if (!window.confirm(`Are you sure you want to delete it?`)) {
            return;
        }
        try {
          await deleteActivity(activity.id);
          setActivities( newActivities.filter((act) => act.id !== activity.id)
          );
        } catch (error) {
          console.error(error);
          alert(error);
          return;
        }
    };

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
                            <button onClick={() => handleUpdateActivity(activity)}>
                                {activity.done? 'Undo' : 'Finish!'}
                            </button> 
                            
                        </td>
                        <th></th>
                        <th>
                            <button className='dropbtn' onClick={() => handleDeleteActivity(activity)}>X</button>
                        </th>
                    </tr>
                ))}
            </tbody>
        </table>
    </>;
};

export default ActivityList;