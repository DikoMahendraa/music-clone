import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Label from '../../components/atoms/Label';
import Spacer from '../../components/atoms/Spacer';
import {Search} from 'lucide-react-native';
import Hero from '../../components/molecules/Hero';
import Colors from '../../themes/Colors';

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
            placeholder="What do you want to listen to?"
            style={styles.textInput}
          />
        </View>
        <Spacer height={24} />
        <View>
          <Hero
            backgroundImg=""
            description="Dengarkan lagu terbaru Sarah Suhairi dan Alfie Zumi sekarang."
            label="Sarah Suhairi, Aflie Zumi - SAH"
          />

          <Spacer height={24} />

          <Label label="Browse All" />
          <Spacer height={16} />

          <View style={styles.containerBrowse}>
            <TouchableOpacity style={styles.column}>
              <Text style={styles.columnText}>Music</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}>
              <Text style={styles.columnText}>Live Events</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}>
              <Text style={styles.columnText}>Podcast</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}>
              <Text style={styles.columnText}>Made for you</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}>
              <Text style={styles.columnText}>Ramadhan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.column}>
              <Text style={styles.columnText}>Music Indonesia</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: 12,
  },
  column: {
    width: '48%',
    borderRadius: 6,
    height: 100,
    backgroundColor: Colors.primary,
    padding: 12,
  },
  columnText: {
    fontWeight: '600',
    color: Colors.white,
  },
  containerBrowse: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 12,
  },
});
