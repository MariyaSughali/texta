import React from 'react';
import { render, screen, fireEvent,waitFor} from '@testing-library/react';
import ProfileUpdate from '../src/profileUpdate';
import Passwordupdate from '../src/passwordupdate';
// import axios from 'axios';

//jest.mock('axios');

// Mock the react-router-dom useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));


describe('ProfileUpdate', () => {
  it('renders the component', () => {
    render(<ProfileUpdate />);
    expect(screen.getByText('DETAILS')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(<ProfileUpdate />);   
    const firstNameInput = screen.getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'NewName' } });
    // Check if the input field's value has changed
    expect(firstNameInput).toHaveValue('NewName');
  });
  it('validates email', () => {
    render(<ProfileUpdate />);
    
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    // Check if the "invalid email" message appears
    fireEvent.click(screen.getByText('Update'));
    expect(screen.getByText("Invalid Email")).toBeInTheDocument();
  });

  it('validates phone number', () => {
    render(<ProfileUpdate />);
    
    const phoneInput = screen.getByLabelText('Phone');
    fireEvent.change(phoneInput, { target: { value: '12345' } });

    // Check if the "invalid Phone number" message appears
    fireEvent.click(screen.getByText('Update'));
    expect(screen.getByText('Invalid Phone number')).toBeInTheDocument();
  });

  

//   it('handles file input change', () => {
//     render(<ProfileUpdate />);
    
//     const fileInput = screen.getByLabelText('Upload Profile Picture');
//     fireEvent.change(fileInput, { target: { files: [new File(['profile.jpg'], 'profile.jpg')] } });

//     // Check if the selected file is set in the component's state
//     expect(screen.getByLabelText('Selected File')).toHaveTextContent('profile.jpg');
//   });

//   it('navigates to account page', () => {
//     const navigate = jest.fn();
//     render(<ProfileUpdate />);
    
//     fireEvent.click(screen.getByText('ACCOUNT'));

//     // Check if the navigate function was called with the correct route
//     expect(navigate).toHaveBeenCalledWith('/account');
//   });
//   it('navigates to account page', () => {
//     const navigate = jest.fn(); // Mock the navigate function
//     render(<ProfileUpdate navigate={navigate} />); // Pass the mock function as a prop to your component
  
//     fireEvent.click(screen.getByText('ACCOUNT'));
  
//     // Check if the navigate function was called with the correct route
//     expect(navigate).toHaveBeenCalledWith('/account');
//   });
});

describe('PasswordUpdate', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    it('renders the component', () => {
      render(<Passwordupdate />);
    });
  
    it('updates state on input change', () => {
      render(<Passwordupdate />);   
      const input = screen.getByLabelText('Old Password');
      fireEvent.change(input, { target: { value: 'oldpassword' } });
      // Check if the input field's value has changed
      expect(input).toHaveValue('oldpassword');
    });

      it('validates password match', () => {
        render(<Passwordupdate />);
    
        const newPasswordInput = screen.getByLabelText('New Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    
        fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'mismatchedpassword' } });
    
        // Check if the "New password and confirmation password don't match" message appears
        fireEvent.click(screen.getByText('Update'));
        expect(screen.getByText("New password and confirmation password don't match")).toBeInTheDocument();
      });

      it('validates password format', () => {
        render(<Passwordupdate />);
    
        const newPasswordInput = screen.getByLabelText('New Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');

        fireEvent.change(newPasswordInput, { target: { value: 'invalidpassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'invalidpassword' } });
  
        // Check if the "Invalid password format" message appears
        fireEvent.click(screen.getByText('Update'));
        expect(screen.getByText("Invalid password format")).toBeInTheDocument();
      });
//try
      
    //   it('handles password update correctly', async () => {
    //     // Mock the axios.put function to simulate a successful password update
    //     axios.put.mockResolvedValueOnce({ data: {} });
    
    //     render(<Passwordupdate />);
    
    //     // Fill out the password fields
    //     fireEvent.change(screen.getByLabelText('Old Password'), {
    //       target: { value: 'welcomeW@1' },
    //     });
    //     fireEvent.change(screen.getByLabelText('New Password'), {
    //       target: { value: 'welcomeW@1' },
    //     });
    //     fireEvent.change(screen.getByLabelText('Confirm Password'), {
    //       target: { value: 'welcomeW@1' },
    //     });
    
    //     // Click the Update button
    //     fireEvent.click(screen.getByText('Update'));
    
    //     // Use findByText to wait for the success alert
    //     const successAlert = await screen.findByText('Password updated successfully');
    //     expect(successAlert).toBeInTheDocument();
    // });
      
});