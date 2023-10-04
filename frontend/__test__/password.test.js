import axios from 'axios';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Passwordupdate from '../src/passwordupdate';

// Mock Axios
jest.mock('axios');
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => jest.fn(),
// }));


it('handles password update correctly', async () => {
  // Mock the Axios `put` function to simulate a successful password update
  axios.put.mockResolvedValue({ data: {} });

  // Render your component wrapped in a Router
  render(
    <Router>
      <Passwordupdate />
    </Router>
  );

  // Fill out the password fields
  fireEvent.change(screen.getByLabelText('Old Password'), {
    target: { value: 'welcomeW@1' },
  });
  fireEvent.change(screen.getByLabelText('New Password'), {
    target: { value: 'welcomeW@1' },
  });
  fireEvent.change(screen.getByLabelText('Confirm Password'), {
    target: { value: 'welcomeW@1' },
  });

  // Click the Update button
  fireEvent.click(screen.getByText('Update'));

  // Use findByText to wait for the success alert
  const successAlert = await screen.findByText('Password updated successfully');
  expect(successAlert).toBeInTheDocument();
});
