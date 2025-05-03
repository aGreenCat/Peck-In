import renderInfo from '@/actions/render-info';
import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
export default function Index() {
  return (
	<SafeAreaView style={styles.container}>
		<React.Suspense
			fallback={
				// The view that will render while the Server Function is awaiting data.
				<ActivityIndicator />
			}>
			{renderInfo({ name: 'World' })}
		</React.Suspense>

		{/* The above is proof of concept for server actions*/}

		{/* we will show ur qr here*/}
		<Text>QR</Text>
	</SafeAreaView>
  );
}
const DB = require('@/actions/databasing');
console.log(DB);
//console.log(DB.storing());
//console.log(DB.reading());
const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#fff',
  },
});
