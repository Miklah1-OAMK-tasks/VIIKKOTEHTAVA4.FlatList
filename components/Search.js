import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";

export default function Search({ executeSearch }) {
    const [search, setSearch] = useState('');

    const handleSearch = (text) => {
        setSearch(text);
        executeSearch(text);
    }

    return (
        <View style={styles.searchBox}>
            <TextInput
                value={search}
                onChangeText={handleSearch}
                placeholder="Search..."
                returnKeyType="search"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        width: "80%",
        marginTop: 30,
        marginBottom: 20,
        borderColor: "#333",
        borderWidth: 1,
        padding: 5,
    }
});