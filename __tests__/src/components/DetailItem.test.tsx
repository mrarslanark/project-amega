import React from 'react';
import {render, screen} from '@testing-library/react-native';
import DetailItem from '../../../src/components/DetailItem';

describe('DetailItem', () => {
  it('should render successfully', () => {
    render(<DetailItem title="Title" value="Value" />);
    expect(screen).toMatchSnapshot();
  });

  it('should render successfully with value to be Unknown', () => {
    render(<DetailItem title="Title" />);

    const textView = screen.getByText('Unknown');
    expect(textView).toHaveTextContent('Unknown');

    expect(screen).toMatchSnapshot();
  });
});
