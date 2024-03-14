import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MLFunction from './MLFunction';

test('MLFunction returns the correct prediction', async () => {
  // Mock the fetch API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          prediction: [1, 0],
        }),
    })
  );

  // Render the component
  render(<MLFunction />);

  // Find the input fields
  const aInput = screen.getByLabelText('a:');
  const bInput = screen.getByLabelText('b:');
  const cInput = screen.getByLabelText('c:');
  const dInput = screen.getByLabelText('d:');

  // Fill out the form
  fireEvent.change(aInput, { target: { value: '11' } });
  fireEvent.change(bInput, { target: { value: '0' } });
  fireEvent.change(cInput, { target: { value: '3' } });
  fireEvent.change(dInput, { target: { value: '1' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button'));

  // Wait for the fetch request to complete
  await waitFor(() => expect(fetch).toHaveBeenCalled());

  // Verify that the prediction is displayed
  expect(
    screen.getByText('The prediction is: 1, 0')
  ).toBeInTheDocument();
});
