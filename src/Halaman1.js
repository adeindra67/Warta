import React from 'react';
import {View, Text} from 'react-native';

const Halaman1 = props => {
  return(
    <View>
        <Text style={{fontSize:50}}>
            Nama Saya: {props.nama_depan} {props.nama_belakang}
        </Text>
    </View>
  );
}


export default Halaman1;