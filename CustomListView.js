import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});














const CustomListview = ({ displayData }) => (
    <View style={styles.container}>
        <FlatList
                data={displayData}
                renderItem={({ item }) => <CustomRow
                    address={item.address}
                    comments={item.comments}
                    coordinates={item.coordinates}
                    imageUri={item.imageUri}
                />}
            />
  
    </View>
  );


  export default CustomListview;