import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Landing({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Usuario sin loggear</Text>
            <Button 
                title='Crear cuenta'
                onPress={() => navigation.navigate('Register')} />
            <Button 
                title='Login'
                onPress={() => navigation.navigate('Login')} />
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
