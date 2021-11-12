import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import AddPurchaser from './AddPurchaser';
// import PurchaserItem from './PurchaserItem';
import store from '../../app/store';

describe('Purchaser', () => {
  // beforeEach(() => {});

  test('generates a user after inputs text and clicks submit button', async () => {
    render(
      <Provider store={store}>
        <AddPurchaser />
      </Provider>
    );

    // should show no user initially
    expect(screen.queryByText(/edit/i)).not.toBeInTheDocument();

    // after clicking input, user should be able to type
    userEvent.type(screen.getByRole('textbox'), 'John Doe');
    expect(screen.getByRole('textbox')).toHaveValue('John Doe');

    // after clicking submit, it should now display a Purchaser
    // and updates React state
    userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(await screen.findByText(/edit/i)).toBeInTheDocument();
  });

  test('edits a user after inputs text and clicks edit button', async () => {
    render(
      <Provider store={store}>
        <AddPurchaser />
      </Provider>
    );

    // confirm there is a user
    expect(await screen.findByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();

    // click the edit button, input should have previous user name
    const editButton = screen.getByRole('button', { name: /^Edit/i });

    userEvent.click(editButton);

    const input = await screen.findByTestId('editName');

    expect(input).toHaveValue('John Doe');

    // select all input text then delete, type in new user name
    userEvent.type(input, '{selectall}');
    userEvent.type(input, '{del}');
    userEvent.type(input, 'Edited User');

    expect(input).toHaveValue('Edited User');

    // click edit button, input user name should change into text
    userEvent.click(editButton);

    expect(input).not.toBeInTheDocument();
    expect(screen.getByText(/Edited User/i)).toBeInTheDocument();
  });
});
