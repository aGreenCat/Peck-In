import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import renderInfo from '@/actions/render-info';


export default function Index() {
  return (
	<View style={styles.container}>
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
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
  },
});
