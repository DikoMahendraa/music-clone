import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {LibraryBig} from 'lucide-react-native';
import Colors from '../../themes/Colors';
import {Spacer} from '../atoms';

let ScreenHeight = Dimensions.get('window').height;

const EmptyState = ({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) => {
  return (
    <View style={styles.container}>
      <LibraryBig size={80} color={Colors.gray} />
      <Spacer height={24} />
      <Text style={styles.label}>{label}</Text>

      <Spacer height={24} />
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonLabel}>Browse Music</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: ScreenHeight / 2,
  },
  label: {
    fontSize: 14,
    fontStyle: 'italic',
    maxWidth: '50%',
    textAlign: 'center',
    color: Colors.gray,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonLabel: {
    color: Colors.white,
    fontWeight: '500',
  },
});
