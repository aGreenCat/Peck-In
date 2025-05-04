'use client';
import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Scan() {
	const isFocused = useIsFocused();
	const cameraRef = useRef(null);

	const [scanned, setScanned] = useState(false);				// prevent multiple scans
	const [permission, requestPermission] = useCameraPermissions();

	useEffect(() => {
		if (!permission) {
			requestPermission();
		}
	}, [permission, requestPermission]);
	
	if (!permission) {
	return (
		<View style={styles.permissionContainer}>
			<Text>Requesting camera permission…</Text>
		</View>
	);
	}

	// if denied permissions
	if (!permission.granted) {
		return (
		  <View style={styles.permissionContainer}>
			<Text>No access to camera</Text>
		  </View>
		);
	}

	// display confirmation page
	if (scanned) {
		return (
		  <View style={styles.confirmationContainer}>
			<Text style={styles.confirmationTitle}>✅ Peck-in complete!</Text>
		  </View>
		);
	}

	return (
	<View style={styles.container}>
		{isFocused && 
		<CameraView
			ref={cameraRef}
			style={StyleSheet.absoluteFillObject}
			onBarcodeScanned={({ data }) => {
				const eventId = parseInt(data);
				if (!isNaN(eventId)) {
					console.log("Scanned event ID:", eventId);
					{/*Process check-in using the numeric ID*/}
				  	setScanned(true);
				}
			}}	
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
	</View>
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
  