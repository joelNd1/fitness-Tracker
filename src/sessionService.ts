import axios from "axios";

export const AddSession = (trainingDate: string, trainingType: string) => {
    axios.post('http://localhost:3001/insert', {
      trainingType: trainingType,
      trainingDate: trainingDate,
    });
  };

  export const UpdateSessiontype = (id: any, newTrainingType: string) => {
    axios.put('http://localhost:3001/update', {
      id: id,
      newTrainingType: newTrainingType,
    });
  };

  export const DeleteSession = (id: any) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.error('Error deleting session:', error);
      });
  };