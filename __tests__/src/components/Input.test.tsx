import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Input from '../../../src/components/Input';

describe('Input', () => {
  it('should render successfully', () => {
    render(<Input error={null} />);
    expect(screen).toMatchSnapshot();
  });

  it('should render successfully with an error message', () => {
    const errorText = 'Error occured';
    render(<Input error={errorText} />);

    const errorTextView = screen.getByText(errorText);
    expect(errorTextView).toHaveTextContent(errorText);

    expect(screen).toMatchSnapshot();
  });
});
