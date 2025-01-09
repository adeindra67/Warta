import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // npm install react-native-linear-gradient
import { ShadowView } from '@dimaportenko/react-native-shadow-view'; // npm install @dimaportenko/react-native-shadow-view
import { useNavigation } from '@react-navigation/native'; // Import useNavigation



// Komponen utama untuk layar profil
const ProfilScreen = () => {
  // Sumber gambar untuk avatar
  const avatars = [
    require('../assets/images/avatar1.jpg'), // Gambar untuk Aliffian
    require('../assets/images/avatar2.jpg'), // Gambar untuk Azzahra
    require('../assets/images/avatar3.jpg'), // Gambar untuk Indra
    require('../assets/images/avatar4.jpg'), // Gambar untuk Nicodemus
    require('../assets/images/avatar5.jpg'), // Gambar untuk Nurhasanah
  ];
  const navigation = useNavigation(); // Inisialisasi useNavigation

  return (
    <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/back.png')} // Path ke gambar tombol back 
            style={styles.backButton} 
          />
        </TouchableOpacity>
       
      </View>
      {/* Bagian Header */}
      <LinearGradient colors={['#00036d', '#0081ff']} style={styles.header}>
      <Text style={styles.headerText}>Profile</Text>
        {/* Pembungkus Logo */}
        <ShadowView style={[styles.logoWrapper, styles.shadowlogo]}>
          <Image
            source={require('../assets/images/logo.png')} // Path ke gambar logo
            style={styles.logo} // Gaya untuk gambar logo
          />
        </ShadowView>
      </LinearGradient>

      {/* Kartu Profil Statis yang Dapat Digulir */}
      <ScrollView>
        <View>
          {/* Kartu Profil Pertama dengan margin atas */}
          <View style={[styles.card, styles.firstCard]}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Aliffian Cahya Mauluddin</Text> {/* Nama profil */}
              <Text style={styles.number}>17223021</Text> {/* NIM profil */}
            </View>
            <Image source={avatars[0]} style={styles.avatar} /> {/* Gambar avatar */}
          </View>
          {/* Kartu Profil Lainnya */}
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Az'zahra Adriana Jasmine</Text>
              <Text style={styles.number}>17223022</Text>
            </View>
            <Image source={avatars[1]} style={styles.avatar} /> {/* Gambar avatar */}
          </View>
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Indra Dwi Septianto</Text>
              <Text style={styles.number}>17221034</Text>
            </View>
            <Image source={avatars[2]} style={styles.avatar} /> {/* Gambar avatar */}
          </View>
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Nicodemus Nira</Text>
              <Text style={styles.number}>17223027</Text>
            </View>
            <Image source={avatars[3]} style={styles.avatar} /> {/* Gambar avatar */}
          </View>
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Nurhasanah</Text>
              <Text style={styles.number}>17223001</Text>
            </View>
            <Image source={avatars[4]} style={styles.avatar} /> {/* Gambar avatar */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Gaya untuk komponen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Mengambil seluruh tinggi layar
    backgroundColor: '#F5F5F5', // Warna latar belakang abu-abu terang
  },
  customHeader: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,  // Sesuaikan paddingTop agar tidak terlalu mepet ke atas
    height: 40,       // Tambahkan height agar LinearGradient memenuhi header
    position: 'absolute', 
    top: 0, 
    left: 0,
    right: 0,
    zIndex: 1, 
  },
  backButton: {
    width: 35, // Sesuaikan ukuran gambar
    height: 15, // Sesuaikan ukuran gambar
  },
  header: {
    alignItems: 'center', // Menyusun item secara horizontal di tengah
    paddingVertical: 120, // Padding vertikal untuk header
    paddingTop: 22, // Padding tambahan di bagian atas
  },
  headerText: {
    fontSize: 20, // Ukuran font untuk teks header
    color: '#FFFFFF', // Warna teks
    fontWeight: 'bold', // Font tebal
    marginBottom: 18, // Jarak antara teks dan logo
  },
  logoWrapper: {
    width: 111, // Lebar pembungkus logo
    height: 115, // Tinggi pembungkus logo
    borderRadius: 56, // Membuat pembungkus berbentuk lingkaran
    backgroundColor: '#FFF', // Warna latar belakang putih untuk pembungkus logo
    justifyContent: 'center', // Menyusun logo secara vertikal di tengah
    alignItems: 'center', // Menyusun logo secara horizontal di tengah
    position: 'absolute', // Memposisikan pembungkus logo secara absolut
    bottom: -20, // Memindahkan pembungkus logo ke bawah
    zIndex: 2, // Memastikan logo berada di atas elemen lain
    padding: 1, // Padding di sekitar logo
  },
  shadowlogo: {
    shadowColor: 'black', // Warna bayangan
    shadowOffset: {
      width: 0, // Offset horizontal
      height: 4, // Offset vertikal
    },
    shadowOpacity: 0.9, // Opasitas bayangan
    shadowRadius: 7, // Radius bayangan
    elevation: 7, // Efek bayangan 
  },
  logo: {
    width: '100%', // Lebar logo relatif terhadap pembungkus
    height: '140%', // Tinggi logo relatif terhadap pembungkus
    borderRadius: 60, // Mempertahankan bentuk lingkaran untuk logo
    resizeMode: 'cover', // Memastikan logo sesuai dengan pembungkus
  },
  card: {
    flexDirection: 'row', // Menyusun item dalam baris
    justifyContent: 'space-between', // Jarak antara nama/nomor dan avatar
    alignItems: 'center', // Menyusun item secara vertikal di tengah
    backgroundColor: '#FFF', // Warna latar belakang putih untuk kartu
    marginHorizontal: 15, // Margin horizontal untuk kartu
    marginVertical: 15, // Margin vertikal untuk kartu
    padding: 20, // Padding di dalam kartu
    borderRadius: 15, // Sudut melengkung untuk kartu
    elevation: 9, // Efek bayangan untuk Android
    marginTop: 3, // Margin atas untuk jarak antara kartu
    
  },
  firstCard: {
    marginTop: 50, // Jarak atas khusus untuk kartu pertama
  },
  infoContainer: {
    flex: 1, // Mengambil ruang yang tersedia
  },
  name: {
    fontSize: 16, // Ukuran font untuk nama
    fontWeight: 'bold', // Font tebal untuk nama
    color: '#333', // Warna abu-abu gelap untuk nama
  },
  number: {
    fontSize: 14, // Ukuran font untuk nomor
    color: '#777', // Warna abu-abu medium untuk nomor
  },
  avatar: {
    width: 85, // Lebar gambar avatar
    height: 85, // Tinggi gambar avatar
    borderRadius: 43, // Membuat gambar avatar berbentuk lingkaran
    backgroundColor: '#E0E0E0', // Warna latar belakang abu-abu terang untuk placeholder
  },
});

// Mengekspor komponen ProfilScreen
export default ProfilScreen;
