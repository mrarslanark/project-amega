import React from 'react';
import {TextProps as RNTextProps, Text as RNText} from 'react-native';
import {styles} from './styles';

interface TextProps extends RNTextProps {
  variant?:
    | 'heading'
    | 'title'
    | 'subtitle'
    | 'regular'
    | 'medium'
    | 'button-primary'
    | 'error'
    | 'button-secondary'
    | 'button-tertiary'
    | 'button-disabled';
}

const Text: React.FC<TextProps> = ({
  variant = 'regular',
  children,
  ...props
}): React.JSX.Element => {
  return (
    <RNText style={styles[variant]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
