import React from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import {styles} from './styles';
import Text from '../Text';

interface InputProps extends TextInputProps {
  error: string | null;
}

const Input: React.FC<InputProps> = ({error, ...props}): React.JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={'gray'}
      />
      {error && error.length > 0 && (
        <View style={styles.errorWrapper}>
          <Text variant="error">{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;
