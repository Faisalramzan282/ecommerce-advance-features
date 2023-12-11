import React, { useState, ChangeEvent, FormEvent, InputHTMLAttributes } from 'react';

interface formData{
  name:string,
  email: string,
  password: string
}
const SignUp:React.FC = () => {
  const [formData, setFormData] = useState<formData>({
    name: '',
    email: '',
    password: '',
  });
  // Handle form field changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    console.log('Submitted Form:', formData);
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default SignUp;