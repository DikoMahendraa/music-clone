import React from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {Search} from 'lucide-react-native';
import {Spacer, Label} from '../../components/atoms';
import Colors from '../../themes/Colors';
import ListMusic from '../../components/organizes/ListMusicScreen/ListMusic';

export default function ListMusicScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Spacer height={16} />
        <Label label="Search" />
        <Spacer height={10} />
        <View style={styles.containerInput}>
          <Search size={20} color="gray" />
          <TextInput
            placeholderTextColor={Colors.gray}
            placeholder="What do you want to listen to?"
            style={styles.textInput}
          />
        </View>
        <Spacer height={24} />

        <ListMusic />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    flex: 1,
  },
  containerInput: {
    paddingLeft: 8,
    flexDirection: 'row',
    borderColor: 'gray',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
  },
  textInput: {
    width: '90%',
    paddingVertical: 8,
    color: Colors.black,
    paddingHorizontal: 12,
  },
});
