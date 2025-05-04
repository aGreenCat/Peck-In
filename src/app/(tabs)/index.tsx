'use client';

import { userContext, UserContextType } from '@/contexts/userContext';
import React, { useContext } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function Index() {
  const context = useContext<UserContextType>(userContext);
  const user = context?.user || null;

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
				<Text style={styles.title}>Personal QR</Text>
				<View style={{backgroundColor: 'white', padding: 20, borderRadius: 12}}>
					<QRCode
						value={user?.emplid.toString()}
						size={200}
						color="black"
						backgroundColor="transparent"
					/>
				</View>
			</View>

			<Text style={styles.title}>Events You Attended</Text>
			{/* Add events here */}

			<View style={styles.eventsContainer}>
				<React.Suspense
					fallback={
						<View
							style={{
								width: '100%',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							
								padding: 20,
								backgroundColor: '#60269e',
							}}
						>
							<ActivityIndicator />
						</View>	
					}>
					{/* {user && renderPastEvents({EmplID: user.emplid})} */}
				</React.Suspense>
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
	// flex: 1,
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
