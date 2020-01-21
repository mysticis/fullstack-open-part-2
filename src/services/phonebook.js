import axios from "axios";
const baseUrl = "http://localhost:4000/persons";
const createRecord = newRecord => {
  const request = axios.post(baseUrl, newRecord);
  return request.then(response => response.data);
};

const updateRecord = (id, updatedRecord) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedRecord);
  return request.then(response => response.data);
};

const getRecords = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const deleteResource = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(res => res.data);
};

export default { createRecord, updateRecord, getRecords, deleteResource };
