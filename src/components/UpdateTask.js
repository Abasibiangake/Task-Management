import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useLocation } from 'react-router-dom';
import "./login.css";


function TaskForm({ props}) {
    let navigate = useNavigate();
    //use useLocation to get the state of id in previous page using useNavigate
    const {state} = useLocation();
    const { id } = state;
    const [data, setData] = useState([]);
    const [task, setTask] = useState({ _id: '', taskId: data.taskId, taskName: data.taskName, taskDescription: data.taskDescription, 
    startDate: data.startDate, endDate: data.endDate, owner: data.owner });
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);

  console.log('current id:',id)

  const apiUrl = "http://localhost:3000/tasks/"+id;
  const fetchData = async () => {
    axios.get(apiUrl)
      .then(result => {
        console.log('result.data:',result.data)
        setData(result.data);
        setShowLoading(false);
        
      }).catch((error) => {
        console.log('error in fetchData:', error)
        setListError(true)
      });
    };  
  //
  // retrieve all tasks
  useEffect(() => {
    // load the tasks
    fetchData();
  }, []);



  const handleUpdateTask = (event) => {
    setShowLoading(true);
    event.preventDefault();
    const updatedTask = {
        taskId: task.taskId,
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      startDate: task.startDate,
      endDate: task.endDate,
      owner: task.owner
    };
    axios.put(apiUrl, updatedTask)
      .then((result) => {
        setShowLoading(false);
        navigate('/list')
      }).catch((error) => setShowLoading(false));
  };

    // handles onChange event
    const onChange = (e) => {
        e.persist();
        //copies initial task item and replaces it with new value for each field name
        setTask({...task, [e.target.name]: e.target.value});
      }

      //use value to set an immutable value but if want to be changeable use defaultValue
  return (
    <div className='login'>
        {showLoading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> }

        <Form onSubmit={handleUpdateTask}>
          <Form.Group>
            <Form.Label> Task Id:</Form.Label>
            <Form.Control type="text" name="taskId" id="taskId" placeholder="Enter taskId" defaultValue={data.taskId} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Task Name</Form.Label>
            <Form.Control type="text" name="taskName" id="taskName" placeholder="Enter task name" defaultValue={data.taskName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Task Description</Form.Label>
            <Form.Control type="text" name="taskDescription" id="taskDescription" rows="3" placeholder="Enter task description" defaultValue={data.taskDescription} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" name="startDate" id="startDate" placeholder="Enter start date" defaultValue={data.startDate} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" name="endDate" id="endDate" placeholder="Enter end date" defaultValue={data.endDate} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Owner</Form.Label>
            <Form.Control type="text" name="owner" id="owner" placeholder="Enter owner" defaultValue={data.owner} onChange={onChange} />
          </Form.Group>


          <Button variant="primary" type="submit">
            Save
          </Button>


        </Form>
    </div>
  );
}
export default TaskForm;