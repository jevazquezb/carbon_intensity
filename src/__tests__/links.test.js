import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockAppHome from '../__mocks__/mock_app_home';
import MockAppDetails from '../__mocks__/mock_app_details';

describe('Navigate between components', () => {
  test('Navigate to details page from home page', async () => {
    render(<MockAppHome />);
    const itemLinkSeven = await screen.findByTestId('det7');
    fireEvent.click(itemLinkSeven);
    expect(document.body.textContent).toMatch(/carbon sources/i);
  });

  test('Navigate to home page from details page', async () => {
    render(<MockAppDetails />);
    const returnLink = document.querySelector('.return-cont');
    fireEvent.click(returnLink);
    expect(document.body.textContent).toMatch(/South Wales/i);
  });  
});