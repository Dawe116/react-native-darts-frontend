import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

export function DartsModPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.dartsId; // Retrieve chessId from route parameters
  const [darts, setDarts] = useState({
    name: '',
    birth_date: '',
    world_ch_won: 0,
    profile_url: '',
    image_url: ''
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDartsData = async () => {
      try {
        const response = await axios.get(`https://darts.sulla.hu/darts/${id}`);
        setDarts(response.data);
      } catch (error) {
        console.log('Error fetching darts data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDartsData();
  }, [id]);

 const handleInputChange = (name, value) => {
    setDarts(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://darts.sulla.hu/darts/${id}`, darts);
      Alert.alert('Success', 'Dartsozó módosítva!', [{ text: 'OK', onPress: () => navigation.navigate('DartsList') }]);
    } catch (error) {
      console.log('Error updating darts data:', error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F5F5F5' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Egy dartsozó módosítása</Text>
      <TextInput
        placeholder="Dartsozó név"
        value={darts.name}
        onChangeText={value => handleInputChange('name', value)}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Születési dátum"
        value={darts.birth_date}
        onChangeText={value => handleInputChange('birth_date', value)}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Nyert világbajnokságok"
        keyboardType="numeric"
        value={darts.world_ch_won.toString()}
        onChangeText={value => handleInputChange('world_ch_won', parseInt(value))}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Profil URL-je"
        value={darts.profile_url}
        onChangeText={value => handleInputChange('profile_url', value)}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Kép URL-je"
        value={darts.image_url}
        onChangeText={value => handleInputChange('image_url', value)}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
      />
      {darts.image_url ? (
        <Image
          source={{ uri: darts.image_url }}
          style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 15 }}
          resizeMode="cover"
        />
      ) : null}
      <Button title="Küldés" onPress={handleSubmit} color="#28a745" />
    </View>
  );
}

export default DartsModPage;
