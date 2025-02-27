import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export function DartsListPage() {
  const [dartses, setDartses] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const navigation = useNavigation();

  // Lekérdező függvény
  const fetchDartses = async () => {
    setFetchPending(true);
    try {
      const res = await axios.get("https://darts.sulla.hu/darts");
      setDartses(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetchPending(false);
    }
  };

  // useFocusEffect a frissítéshez
  useFocusEffect(
    React.useCallback(() => {
      fetchDartses(); // Lekérdezzük az adatokat, amikor a képernyő fókuszba kerül
    }, [])
  );

  return (
    <View style={styles.container}>
      {isFetchPending ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <Text style={styles.title}>Dartsozók</Text>
          {dartses.map((darts, index) => (
            <View style={styles.card} key={index}>
              <Text style={styles.dartsName}>Név: {darts.name}</Text>
              <Text style={styles.birthDate}>Születési dátum: {darts.birth_date}</Text>
              <Text style={styles.worldCh}>Megnyert világbajnokságok: {darts.world_ch_won}</Text>

              <Image
                source={{ uri: darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800" }}
                style={styles.image}
                alt={darts.name}
              />

              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DartsSingle', { dartsId: darts.id })}>
                <Text style={styles.buttonText}>Részletek</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WebViewScreen', { url: darts.profile_url })}>
                <Text style={styles.buttonText}>Wikipédia link</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DartsMod', { dartsId: darts.id })}>
                <Text style={styles.buttonText}>Módosítás</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DartsDel', { dartsId: darts.id })}>
                <Text style={styles.buttonText}>Törlés</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  dartsName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  birthDate: {
    color: 'red',
    marginVertical: 5,
  },
  worldCh: {
    color: 'green',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF', // Gomb háttérszín
    borderRadius: 20, // Lekerekítés
    paddingVertical: 10, // Felső és alsó padding
    paddingHorizontal: 20, // Bal és jobb padding
    marginVertical: 5, // Függőleges távolság a gombok között
    alignItems: 'center', // Középre igazítás
  },
  buttonText: {
    color: '#FFFFFF', // Gomb szöveg színe
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DartsListPage;
