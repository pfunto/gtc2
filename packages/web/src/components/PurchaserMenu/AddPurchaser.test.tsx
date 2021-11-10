import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddPurchaser from './AddPurchaser';

// mocking

describe('Purchaser Menu', () => {
  // let input: HTMLInputElement;

  beforeEach(() => {
    render(<AddPurchaser />);

    // input = screen.getByRole('input', { name: 'name' });

    // getByTestId
    // findBy
  });

  // beforeAll
  // afterEach
  // afterAll

  // userEvent.type(input, 'a');

  // expect error message

  test('renders input', () => {
    // expect(input).toBeInTheDocument();
  });

  // test('renders input', () => {
  //   expect(input).toBeInTheDocument();
  // });

  // test('renders input', () => {
  //   expect(input).toBeInTheDocument();
  // });
});
