import {render, screen} from '@testing-library/react-native';
import React from 'react';
import ListItem from '../../../src/components/ListItem';

describe('ListItem', () => {
  it('should render successfully', () => {
    render(
      <ListItem
        eventType="Event Type"
        price="100"
        quantity="Quantity"
        symbol="BTCUSDT"
      />,
    );
    expect(screen).toMatchSnapshot();
  });

  it('should render null if any of the props is undefined', () => {
    render(<ListItem eventType="Event Type" price="100" quantity="Quantity" />);
    expect(screen).toMatchSnapshot();
  });
});
