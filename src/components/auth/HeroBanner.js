import { Image, StyleSheet, Text, View } from 'react-native';

export default function HeroBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.circleOuter} />
      <View style={styles.circleInner} />
      <Image
        source={require('../../../assets/images/senaclogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>SIGHC</Text>
      <Text style={styles.disclaimer}>
        ESSE APLICATIVO É PARA TESTES E NÃO PERTENCE À INSTITUIÇÃO SENAC
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a3d8c',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
    overflow: 'hidden',
  },
  circleOuter: {
    position: 'absolute',
    width: 260,
    height: 260,
    right: -80,
    top: 10,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  circleInner: {
    position: 'absolute',
    width: 160,
    height: 160,
    right: -30,
    top: 60,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  logo: { width: 140, height: 56, marginBottom: 24 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
    marginTop: 6,
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 11,
    fontWeight: '700',
    color: '#f5c842',
    textAlign: 'center',
    lineHeight: 17,
  },
});
