import React, {useMemo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Text from '../Text';
import {styles} from './styles';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}): React.JSX.Element => {
  const selectedVariant = useMemo(() => {
    let currentVariant = variant;
    if (props.disabled) {
      currentVariant = 'disabled';
    }
    return currentVariant;
  }, [props.disabled, variant]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      style={styles[selectedVariant]}>
      <Text variant={`button-${selectedVariant}`}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
