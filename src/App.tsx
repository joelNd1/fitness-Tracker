import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import { AddSession, UpdateSessiontype, DeleteSession } from './sessionService';

export type GymSession = {
  _id: any;
  Date: Date;
  DayType: string;
}

export function App() {
  const [trainingList, setTrainingList] = useState([] as GymSession[]);
  const [trainingType, setTrainingType] = useState('');
  const [trainingDate, setTrainingDate] = useState('00/00/0000');

  // Destructure the useToggle return values
  const [viewData, setViewData] = useState(false);
  const [newTrainingType, setNewTrainingType] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((Response) => {
      console.log(Response);
      setTrainingList(Response.data);
    }).catch((err) => {
      // do something here
      console.log('failed');
    });
  }, []);

  return (
    <div className="App">
      <h1>crud 1 with mern</h1>

      <div className="form-container">
        <label>what were you training:</label>
        <input type="text" onChange={(event) => setTrainingType(event.target.value)} />

        <label>what is the date:</label>
        <input type="date" onChange={(event) => setTrainingDate(event.target.value)} />

        <button onClick={()=>AddSession(trainingDate, trainingType)}>Add Session</button>

        <br />
        <br />

        <button data-testid="toggle-button" onClick={()=>setViewData(!viewData)}>Toggle View</button>
      </div>

      {viewData && (
        <div className="training-list-container">
          <h1 data-testid="training-head">Training Record</h1>

          {trainingList.map((val, key) => (
            <div className="training-list-item" key={key}>
              <h1>{val.DayType}</h1>
              <div className="Update-container">
                <input
                  type="text"
                  placeholder="updated version ..."
                  onChange={(event) => setNewTrainingType(event.target.value)}
                />
                <button onClick={() => UpdateSessiontype(val._id, newTrainingType)}>update</button>
              </div>
              <h1>{val.Date.toLocaleString()}</h1>

              <button onClick={() => DeleteSession(val._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
