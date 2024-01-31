import { render, screen } from '@testing-library/react';
import ListItem from '../ListItem';

describe('ListItem Component Tests', () => {
  it('renders without crashing', () => {
    render(<ListItem item="Israel" query="Is" />);
    expect(screen.getByText("Is")).toBeInTheDocument();
  });

  it('highlights multiple instances of query text', () => {
    render(<ListItem item="Israel Banana Israel" query="Is" />);
    const highlightedElements = screen.getAllByText("Is");
    expect(highlightedElements).toHaveLength(2);
    highlightedElements.forEach(element => {
      expect(element).toHaveStyle('fontWeight: bold');
    });
  });

  it('is case insensitive in highlighting', () => {
    render(<ListItem item="Israel" query="RA" />);
    expect(screen.getByText("ra")).toHaveStyle('fontWeight: bold');
  });

  it('displays item normally when no match is found', () => {
    render(<ListItem item="Israel" query="b" />);
    expect(screen.getByText("Israel")).toBeInTheDocument();
    expect(screen.queryByText("is")).toBeNull();
  });

  it('handles empty query string', () => {
    render(<ListItem item="Israel" query="" />);
    expect(screen.getByText("Israel")).toBeInTheDocument();
  });

  it('handles special characters in item and query', () => {
    render(<ListItem item="Isra&el! #1" query="&el" />);
    const highlightedElement = screen.getByText("&el");
    expect(highlightedElement).toHaveStyle('fontWeight: bold');
  });

  it('handles long text without issues', () => {
    const longText = 'A'.repeat(1000);
    render(<ListItem item={longText} query="A" />);
    const boldElements = screen.getAllByText("A");
    boldElements.forEach(element => {
      expect(element).toHaveStyle('fontWeight: bold');
    });
  });

});

