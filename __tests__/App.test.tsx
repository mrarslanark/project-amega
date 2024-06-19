import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import {render, screen} from '@testing-library/react-native';

describe('App.tsx', () => {
  it('should renders successfully', () => {
    render(<App />);
    expect(screen).toMatchSnapshot();
  });
});
