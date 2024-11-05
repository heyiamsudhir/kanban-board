import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home component', () => {
  render(<App />);
  const homeElement = screen.getByText(/welcome to the home page/i); // Adjust this to the text present in your Home component
  expect(homeElement).toBeInTheDocument();
});

test('renders navbar', () => {
  render(<App />);
  const navbarElement = screen.getByRole('navigation'); // Assuming your Navbar has a role of 'navigation'
  expect(navbarElement).toBeInTheDocument();
});
