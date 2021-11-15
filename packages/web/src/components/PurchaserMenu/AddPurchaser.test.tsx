import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createTestStore } from '../../app/store';

import AddPurchaser from './AddPurchaser';

test('generates a user after inputs text and clicks submit button', async () => {
  const store = createTestStore();

  const { getByRole, findByText } = render(
    <Provider store={store}>
      <AddPurchaser />
    </Provider>
  );

  userEvent.type(getByRole('textbox'), 'John Doe');
  expect(getByRole('textbox')).toHaveValue('John Doe');

  userEvent.click(getByRole('button', { name: /Submit/i }));
  expect(await findByText(/edit/i)).toBeInTheDocument();
});

test('edits a user after inputs text and clicks edit button', async () => {
  const store = createTestStore();

  const { findByText, getByText, getByRole, findByTestId } = render(
    <Provider store={store}>
      <AddPurchaser />
    </Provider>
  );

  userEvent.type(getByRole('textbox'), 'John Doe');
  expect(getByRole('textbox')).toHaveValue('John Doe');

  userEvent.click(getByRole('button', { name: /Submit/i }));
  expect(await findByText(/edit/i)).toBeInTheDocument();
  expect(getByText(/John Doe/i)).toBeInTheDocument();

  const editButton = getByRole('button', { name: /^Edit/i });
  userEvent.click(editButton);

  const input = await findByTestId('editName');
  expect(input).toHaveValue('John Doe');

  userEvent.type(input, '{selectall}');
  userEvent.type(input, '{del}');
  userEvent.type(input, 'Edited User');

  expect(input).toHaveValue('Edited User');

  userEvent.click(editButton);

  expect(input).not.toBeInTheDocument();
  expect(getByText(/Edited User/i)).toBeInTheDocument();
});

test('removes user after clicks X button', async () => {
  const store = createTestStore();

  const {
    getByRole,
    getByText,
    findByRole,
    queryByText,
    queryByTestId,
    queryByRole,
  } = render(
    <Provider store={store}>
      <AddPurchaser />
    </Provider>
  );

  userEvent.type(getByRole('textbox'), 'John Doe');
  userEvent.click(getByRole('button', { name: /Submit/i }));
  expect(await findByRole('button', { name: /^X/i })).toBeInTheDocument();
  expect(getByText(/John Doe/i)).toBeInTheDocument();

  userEvent.click(getByRole('button', { name: /^X/i }));

  expect(queryByRole('button', { name: /^X/i })).not.toBeInTheDocument();
  expect(queryByTestId('editName')).not.toBeInTheDocument();
  expect(queryByText(/John Doe/i)).not.toBeInTheDocument();
});
