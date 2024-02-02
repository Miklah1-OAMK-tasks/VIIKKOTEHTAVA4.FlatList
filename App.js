import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DATA } from './Data';
import Row from './components/Row';
import Search from './components/Search';
import Add from './components/Add';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@persons_key';

export default function App() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json === null) {
        json = []
      }
      console.log(json);
      setItems(json);
    } catch (ex) {
      console.log(ex);
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    // AsyncStorage.clear() // poistaa kaikki tiedot
    // setItems(DATA)
    getData()
  }, []);

  const select = (id) => {
    setSelectedId(id);
  }

  const executeSearch = (search) => {
    const searchArray = DATA.filter((item) => item.lastName.startsWith(search));
    setItems(searchArray);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Search executeSearch={executeSearch} />
      <Add items={items} setItems={setItems} storeData={storeData} />
      <FlatList style={{ width: "80%" }}
        data={items}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        renderItem={({ item }) => (
          <Row person={item} selectedId={selectedId} select={select} />
        )}
      ></FlatList>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

// Kaksi tapaa tehdä ja esittää renderItem
// function renderItem({ item }) {     // renderItem on funktio, joka saa parametrinaan itemin
//   return (
//     <Text>{item.lastName}</Text>)   // renderItem palauttaa tekstin, joka on itemin lastName
// }

// const renderItem = ({ item }) => (  // renderItem on funktio, joka saa parametrinaan itemin
//   <Text>{item.lastName}</Text>      // renderItem palauttaa tekstin, joka on itemin lastName
// );


