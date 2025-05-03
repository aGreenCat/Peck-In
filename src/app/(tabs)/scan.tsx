import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function Scan() {
  return (
	<SafeAreaView style={styles.container}>
		<Text>Scan</Text>
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#fff',
  },
});
