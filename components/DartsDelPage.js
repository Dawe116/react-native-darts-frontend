import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

export function DartsDelPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.dartsId; 
  const [darts, setDarts] = useState(null);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const fetchDarts = async () => {
      setPending(true);
      try {
        const res = await axios.get(`https://darts.sulla.hu/darts/${id}`);
        setDarts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setPending(false);
      }
    };

    fetchDarts();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://darts.sulla.hu/darts/${id}`);
      Alert.alert('Success', 'Dartsozó törölve!', [{ text: 'OK', onPress: () => navigation.navigate('DartsList') }]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hiba történt a törlés során.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#E6E6FA' }}>
      {isPending || !darts ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Törlendő elem neve: {darts.name}</Text>
          <Text style={{ fontSize: 16 }}>Születési idő: {darts.birth_date}</Text>
          <Image
            source={{ uri: darts.image_url ? darts.image_url : 'https://via.placeholder.com/400x800' }}
            style={{ width: 300, height: 400, borderRadius: 10, marginVertical: 10 }}
          />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Button title="Mégsem" onPress={() => navigation.navigate('DartsList')} />
            <View style={{ width: 10 }} /> {/* Spacer */}
            <Button title="Törlés" onPress={handleDelete} color="red" />
          </View>
        </View>
      )}
    </View>
  );
}

export default DartsDelPage;
