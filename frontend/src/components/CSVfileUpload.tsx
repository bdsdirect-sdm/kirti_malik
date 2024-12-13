import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const CSVfileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

 
  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('csv', file); 

    try {

      const response = await axios.post(`${config.BASE_URL}/uploadCSV`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     
      setMessage('CSV file uploaded and processed successfully!');
      setError('');
      console.log('Data:', response.data);  
    } catch (error) {
     
      setMessage('');
      setError('Error uploading file. Please try again.');
      console.error('Error uploading CSV:', error);
    }
  };

  return (
    <div>
      <h1>Upload CSV File</h1>
      
      <form onSubmit={handleUpload}>
        <div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        
        <button type="submit">Upload</button>
      </form>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}
    </div>
  );
};

export default CSVfileUpload;
