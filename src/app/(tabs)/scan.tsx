'use client';
import { storeAttendance } from '@/actions/databasing';
import { userContext } from '@/contexts/userContext';
import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Scan() {
	const isFocused = useIsFocused();
	const cameraRef = useRef(null);

	const [scanned, setScanned] = useState(false);				// prevent multiple scans
	const [permission, requestPermission] = useCameraPermissions();

	const context = useContext(userContext);
	const user = context?.user || null;

	useEffect(() => {
		if (!permission) {
			requestPermission();
		}
	}, [permission, requestPermission]);
	
	if (!permission) {
	return (
		<SafeAreaView style={styles.permissionContainer}>
			<Text>Requesting camera permission…</Text>
		</SafeAreaView>
	);
	}

	// if denied permissions
	if (!permission.granted) {
		return (
		  <SafeAreaView style={styles.permissionContainer}>
			<Button title="Give Camera Permission" onPress={() => requestPermission()} />
		  </SafeAreaView>
		);
	}

	// display confirmation page
	if (scanned) {
		return user ? (
			<SafeAreaView style={styles.confirmationContainer}>
				<Text style={styles.confirmationTitle}>✅ Peck-In complete!</Text>
				<Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
			</SafeAreaView>
		) : (
			<SafeAreaView style={styles.confirmationContainer}>
				<Text style={styles.confirmationTitle}>❌ Peck-In failed!</Text>
				<Text style={styles.confirmationData}>Please log in to your account.</Text>
				<Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
			</SafeAreaView>
		);
	}

	return (
	<SafeAreaView style={styles.container}>
		{isFocused && 
		<CameraView
			ref={cameraRef}
			style={StyleSheet.absoluteFillObject}
			onBarcodeScanned={({ data }) => {
				if (!user) {
					console.log("User not logged in. Cannot scan.");
					}
					else {
						storeAttendance({event_id: data, student_id: user.emplid});
					}

					console.log("Scanned event ID:", data);
					{/*Process check-in using the numeric ID*/}
				  	setScanned(true);
				}
			}
			barcodeScannerSettings={{
				barcodeTypes: ['qr'],
			}}
			active={!scanned && isFocused}
		>
		</CameraView>
		}
		
		{/* translucent overlay for aligning QR */}
		<View style={styles.boxContainer}>
			<View style={styles.scanBox} />
		</View>
	</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#000',
	},
	permissionContainer: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
  
	// overlay on top of camera preview
	boxContainer: {
	  ...StyleSheet.absoluteFillObject,
	  alignItems: 'center',
	  justifyContent: 'center',
	},

	scanBox: {
	  width: 250,
	  height: 250,
	  borderWidth: 2,
	  borderStyle: 'dashed',
	  borderColor: '#fff',
	  borderRadius: 12,
	  backgroundColor: 'transparent',
	},
  
	// result panel
	resultContainer: {
	  position: 'absolute',
	  bottom: 40,
	  left: 20,
	  right: 20,
	  backgroundColor: 'rgba(0,0,0,0.6)',
	  padding: 16,
	  borderRadius: 8,
	},
	resultText: {
	  color: '#fff',
	  marginBottom: 8,
	  textAlign: 'center',
	},

	confirmationContainer: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},

	confirmationTitle: {
		fontSize: 24,
		color: '#0f0',
		marginBottom: 12,
	},
	
	confirmationData: {
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
	},	  
});
  