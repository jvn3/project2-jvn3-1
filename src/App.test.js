import {
  render, screen, fireEvent, 
} from '@testing-library/react';
import App from './App';

const React = require('react');

test('join modal disappears', () => {
  render(<App />);
  const joinModalElement = screen.getByText('Log In');
  expect(joinModalElement).toBeInTheDocument();
  fireEvent.click(joinModalElement);
  expect(joinModalElement).not.toBeInTheDocument();
});

test('ChatRoom, UserList, high score board shows up after clicking log in', () => {
  render(<App />);
  const userList = screen.getByText('USER LIST');
  const logInButton = screen.getByText('Log In');
  const chatRoomElement = screen.getByText('CHAT ROOM');
  fireEvent.click(logInButton);
  expect(userList).toBeInTheDocument();
  expect(chatRoomElement).toBeInTheDocument();
});

test('highScore board disappears and appears when clicked the button', () => {
  render(<App />);
  const logInButton = screen.getByText('Log In');
  fireEvent.click(logInButton);
  const highScoreButtonElement = screen.getByText('Show High Score Board');
  fireEvent.click(highScoreButtonElement);
  const highScoreBoard = screen.getByText('High Score Board');
  expect(highScoreBoard).toBeInTheDocument();
  const closeButtonElement = screen.getByText('Close');
  fireEvent.click(closeButtonElement);
  expect(highScoreBoard).not.toBeInTheDocument();
});


