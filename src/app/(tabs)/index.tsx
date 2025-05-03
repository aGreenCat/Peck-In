'use client';
import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';

import Scan from './scan';

export default function Index() {
  return (
	<SafeAreaView style={styles.container}>
		<React.Suspense
			fallback={
				// The view that will render while the Server Function is awaiting data.
				<ActivityIndicator />
			}>
			{/* {renderInfo({ name: 'World' })} */}
		</React.Suspense>

		{/* The above is proof of concept for server actions*/}

		{/* we will show ur qr here*/}
		<Scan />
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
