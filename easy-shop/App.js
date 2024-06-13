import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, LogBox } from 'react-native';
import { StatusBar } from 'react-native';

//Screen
import Header from './Shared/Header';
import ProductContainer from 'react-native';
LogBox.ignoreAllLogs(true);

export default function App(){
    return(
        <View style={styles.container}>
            <Header/>
            <ProductContainer/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent:'center',
    }
})
