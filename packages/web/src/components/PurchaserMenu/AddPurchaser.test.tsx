import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import AddPurchaser from './AddPurchaser';
import store from '../../app/store';

describe('Purchaser', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <AddPurchaser />
      </Provider>
    );
  });

  test('generates a user after inputs text and clicks submit button', async () => {
    // should show no user initially
    expect(screen.queryByText(/edit/i)).not.toBeInTheDocument();

    // after clicking input, user should be able to type
    userEvent.type(screen.getByRole('textbox'), 'John Doe');
    expect(screen.getByRole('textbox')).toHaveValue('John Doe');

    // after clicking submit, it should now display a Purchaser
    // and updates React state
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/edit/i)).toBeInTheDocument();
  });

  // test('edits a user after inputs text and clicks edit button', async () => {

  // });
});
