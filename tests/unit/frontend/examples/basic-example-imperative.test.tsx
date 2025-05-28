import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

it('renders button with correct text', () => {
  render(<button>Click me</button>);
  const btn = screen.getByText('Click me');
  expect(btn).toBeInTheDocument();
});
