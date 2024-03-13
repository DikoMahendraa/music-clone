import React from 'react';
import {View} from 'react-native';
import {SimplyCard} from '../../molecules';
import {Spacer} from '../../atoms';

const ListAlbum = () => {
  return (
    <View>
      {[1, 2, 3].map(key => (
        <>
          <SimplyCard img="" label="Gita Wirjawan - Endgame" key={key} />
          <Spacer height={4} />
        </>
      ))}
    </View>
  );
};

export default ListAlbum;
