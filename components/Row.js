import React from "react";  
import {Text, Pressable, StyleSheet} from "react-native";

export default function Row({person, selectedId, select}) {                     // Row on funktio, joka saa parametrinaan personin
    const backgroundColor = person.id === selectedId ? "#6e3b6e" : "#f9c2ff";   // Jos personin id on sama kuin selectedId, niin backgroundColor on #6e3b6e, muuten #f9c2ff
    
    return (
        <Pressable onPress={() => select(person.id)} >
            <Text
                style={[styles.row, { backgroundColor }]}>
                    {person.lastName}, {person.firstName}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        padding: 20,
        marginBottom: 5,
        backgroundColor: "#f9c2ff",
    },
});