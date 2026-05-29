import { Feather } from '@expo/vector-icons';
import React, { useState } from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const screenWidth = Dimensions.get('window').width;

export default function Navbar() {
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  function toggleNotification() {
    setIsNotificationOn(!isNotificationOn);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        <Image source={require('../../assets/images/senaclogo.png')} style={styles.logo} resizeMode="contain"/>

        <View style={styles.rightContainer}>

          <TouchableOpacity style={styles.iconButton} onPress={toggleNotification}>
            <Feather name={isNotificationOn ? 'bell' : 'bell-off'} size={20} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileButton}>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>TF</Text>
            </View>

            <Feather name="user" size={18} color="#2B5CAB"
            />
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.bottomBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },

  container: {
    width: '100%',
    maxWidth: 1400,

    height: 75,

    paddingHorizontal: screenWidth < 768 ? 20 : 40,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    width: screenWidth < 768 ? 95 : 120,
    height: 40,
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: screenWidth < 768 ? 10 : 16,
  },

  iconButton: {
    width: 42,
    height: 42,

    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',
  },

  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#ECECEC',

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 14,

    gap: 8,
  },

  avatar: {
    width: 35,
    height: 35,

    borderRadius: 50,

    backgroundColor: '#D9E5F7',

    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',

    color: '#2B5CAB',
  },

  bottomBorder: {
    width: '100%',
    height: 2,

    backgroundColor: '#0056D2',
  },
});