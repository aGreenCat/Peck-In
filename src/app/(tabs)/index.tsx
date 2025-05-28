import { PrevEventsList } from '@/components/EventsLists';
import { userContext, UserContextType } from '@/contexts/userContext';
import { router } from 'expo-router';
import { useContext } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const context = useContext<UserContextType>(userContext);
  const user = context?.user || null;

  return (
	<SafeAreaView style={styles.container}>
		<ScrollView style={{padding: 10}}>
			<Text style={{fontSize: 48, fontWeight: "600", textAlign: "center", marginVertical: 15, color: "#60269e"}}>Peck-In</Text>
			{!user
			?
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
				<Text style={styles.title}>Please head to the Profile tab to log in.</Text>
				<Button title="Go to Profile" onPress={() => router.push('/profile')} />
			</View>
			:
			<>
			<View style={styles.mainQRContainer}>
				<Text style={styles.title}>Personal QR</Text>
				<View style={{backgroundColor: 'white', padding: 20, borderRadius: 12}}>
					<QRCode
						value={user?.email}
						size={200}
						color="black"
						backgroundColor="transparent"
					/>
				</View>
			</View>

			<Text style={styles.title}>Events You Attended</Text>
			
			<View style={styles.eventsContainer}>
				<PrevEventsList user={user} />
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
