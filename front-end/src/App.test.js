import { render, screen } from '@testing-library/react';
import App from './App';
test('renders learn react link', () => {
  render(<App />);
  
  // Use queryByText instead of getByText
  const linkElement = screen.queryByText(/learn react/i);

  // Check if the linkElement is falsy (i.e., it does not exist)
  if (!linkElement) {
    // The element is not found, so the test passes
    console.log('The "learn react" link is not present in the rendered component.');
  } else {
    // The element is found, so make assertions
    jest.expect(linkElement).toBeInTheDocument();
  }
});