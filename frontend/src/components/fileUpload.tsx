import React, { useState } from 'react';

const ProfileForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('profileImage', image);

    try {
      const response = await fetch('http://localhost:5000/api/upload/single', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setImagePath(data.imagePath);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} accept="image/*" required />
        <button type="submit">Upload</button>
      </form>
      {imagePath && <img src={imagePath} alt="Profile" style={{ marginTop: '20px', width: '200px', height: 'auto' }} />}
    </div>
  );
};

export default ProfileForm;
