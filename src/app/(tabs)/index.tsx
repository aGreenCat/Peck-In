'use client';

import Event from '@/components/Event';
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

export default function Index() {
  return (
	<SafeAreaView style={styles.container}>
		<ScrollView style={{padding: 10}}>
			<React.Suspense
				fallback={
					// The view that will render while the Server Function is awaiting data.
					<ActivityIndicator />
				}>
				{/* {renderInfo({ name: 'World' })} */}
			</React.Suspense>

			{/* The above is proof of concept for server actions*/}

			{/* we will show ur qr here*/}

			<View style={styles.eventsContainer}>
				<Event
					id={273}
					name="Hunter CS Club Meeting"
				/>
				<Event
					id={349}
					name="GWC Meeting"
					location='Hunter East 706'
					description='A meeting for members to chill and hang out.'
					start_time={new Date('2025-05-03T18:00:00')}
					end_time={new Date('2025-05-03T20:00:00')}
				/>
				<Event
					id={538}
					name="Finals Wellness"
				/>
			</View>
		</ScrollView>
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
  eventsContainer: {
	flex: 1,
	width: '100%',

	borderRadius: 12,
	backgroundColor: "#cc64f5",
	overflow: 'hidden',
  }
});
