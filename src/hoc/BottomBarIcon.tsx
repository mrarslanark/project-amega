import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IconProps {
  focused: boolean;
  color: string;
  size: number;
}

/**
 * Allows creating a bottom bar icon from the material icons directory
 * @param name name of the icon
 * @returns an icon from the material icons directory
 */
export const createBottomBarIcon = (name: string): React.FC<IconProps> => {
  /**
   * Creates the bottom bar icon from the matieral icons directory
   * @param color Color of the icon
   * @param size Size of the icon
   * @returns an icon from material icon directory
   */
  const BottomBarIcon: React.FC<IconProps> = ({color, size}) => {
    return <Icon name={name} size={size} color={color} />;
  };

  return BottomBarIcon;
};
