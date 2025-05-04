'use client';

import Event from '@/components/Event';
import { userContext, UserContextType } from '@/contexts/userContext';
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function Index() {
  const context = useContext<UserContextType>(userContext);
  const user = context?.user || null;

  console.log("User context in Profile:", user);

  return (
	<SafeAreaView style={styles.container}>
		<ScrollView style={{padding: 10}}>
			{!user
			?
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text style={styles.title}>Please log in to view your profile.</Text>
			</View>
			:
			<>
			<View style={styles.mainQRContainer}>
				<Text style={styles.title}>Your QR Code</Text>
				<View style={{backgroundColor: 'white', padding: 20, borderRadius: 12}}>
					<QRCode
						value={user?.emplid.toString()}
						size={200}
						color="black"
						backgroundColor="transparent"
					/>
				</View>
			</View>

			<Text style={styles.title}>Your Events</Text>
			{/* Add events here */}

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
			</>
			}
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
  title: {
	fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
	marginBottom: 20,
  },
  eventsContainer: {
	flex: 1,
	width: '100%',

	borderRadius: 12,
	backgroundColor: "#cc64f5",
	overflow: 'hidden',

	marginBottom: 20,
  },
  mainQRContainer: {
	flex: 1,
	borderRadius: 12,
	backgroundColor: "#bf77f6",
	overflow: 'hidden',

	padding: 50,
	justifyContent: 'center',
	alignItems: 'center',

	marginBottom: 20,
  }
});
