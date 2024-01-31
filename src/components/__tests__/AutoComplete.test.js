import React from 'react';
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import AutoComplete from '../AutoComplete';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { name: { common: 'Germany' }, flags: { png: 'https://flagcdn.com/w320/de.png' } },
      { name: { common: 'Israel' }, flags: { png: 'https://flagcdn.com/w320/il.png' } },
    ])
  }))

describe('AutoComplete Component Tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { name: { common: 'Germany' }, flags: { png: 'https://flagcdn.com/w320/de.png' } },
          { name: { common: 'Israel' }, flags: { png: 'https://flagcdn.com/w320/il.png' } },
        ])
      })
    );
    fetch.mockClear();
  });

  it('renders without crashing', async () => {
    render(<AutoComplete />);
    const inputElement = await screen.findByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });

  it('initial state is as expected', async () => {
    render(<AutoComplete />);
    const inputElement = await screen.findByPlaceholderText('Search...');
    expect(inputElement.value).toBe('');
  });


  it('updates state on input change', async () => {
    render(<AutoComplete />);
    const inputElement = await screen.findByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'a' } });
    expect(inputElement.value).toBe('a');
  });

  it('fetches categories on component mount', async () => {
    render(<AutoComplete />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it('filters data based on the query', async () => {
    render(<AutoComplete />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'Isr' } });

    await waitFor(() => {
      const listItem = screen.queryByText('Isr');
      expect(listItem).toBeInTheDocument();
    }, { timeout: 3000 });
  });


  it('displays a loading indicator while fetching data', async () => {
    global.fetch.mockImplementationOnce(() =>
      new Promise(resolve => setTimeout(() => resolve({
        json: () => Promise.resolve([])
      }), 100))
    );

    render(<AutoComplete />);

    const loadingIndicator = screen.getByText(/loading/i);
    expect(loadingIndicator).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });



});