import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Button from '../../../src/components/Button';

describe('Button', () => {
  it('should render successfully', () => {
    render(<Button>Button</Button>);
    expect(screen).toMatchSnapshot();
  });
});
