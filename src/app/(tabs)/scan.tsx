'use client';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Scan() {
	const [displayText, setDisplayText] = useState("");			// what the user scanned
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
			<Text style={styles.confirmationTitle}>✅ Check-in complete!</Text>
			<Text style={styles.confirmationData}>{displayText}</Text>
		  </View>
		);
	}

	return (
	<View style={styles.container}>
		<CameraView
			style={StyleSheet.absoluteFillObject}
			onBarcodeScanned={({ data }) => {
				setScanned(true);
				setDisplayText(data);
			}}
			barcodeScannerSettings={{
				barcodeTypes: ['qr'],
			}}
			active={!scanned}
		>
			{/* translucent overlay for aligning QR */}
			<View style={styles.boxContainer}>
				<View style={styles.scanBox} />
			</View>
		</CameraView>
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
  