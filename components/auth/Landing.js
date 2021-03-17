import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Landing() {
    return (
        <View style={styles.container}>
            <Text>Usuario sin loggear</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'teal'
    }
})
