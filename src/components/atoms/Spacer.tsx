import React from 'react';
import {View} from 'react-native';

type SpacerProps = {
  height?: number;
  width?: number;
};

const Spacer: React.FC<SpacerProps> = props => {
  const {height, width} = props;
  return <View style={{width, height}} />;
};

export default Spacer;
