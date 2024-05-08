/* eslint-disable no-undef */
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
export const getActivities = async () => {
  try {
    const response = await axios.get(`${API_URL}/activities`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewActivity = async (params) => {
  try {
    const response = await axios.post(`${API_URL}/activities`, {
        ...params
    });
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const updateActivity = async (activity) => {
  try {
    const response = await axios.put(`${API_URL}/activities/${activity.id}`, 
        {
            done: !activity.done
        }
    );
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteActivity = async (id) => {
  try {
    await axios.delete(`${API_URL}/activities/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};