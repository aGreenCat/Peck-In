'use client';

import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import QRCodeDisplay from './QRCodeDisplay';

export type EventProps = {
  id: number;	// for accessibility
  name: string;
  description?: string;
  location?: string;
  host?: string;
  start_time?: Date;
  end_time?: Date;
  noqr?: boolean; // if true, don't show QR code
};

const Event: React.FC<EventProps> = ({ id, name, description, location, host, start_time, end_time, noqr=false }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  
  return (
	<>
		<View style={styles.container}>
			<Text style={styles.greeting}>{name}</Text>
			<TouchableOpacity onPress={() => setShowDetails(!showDetails)} style={styles.smallButton}>
				<Ionicons name={`chevron-${showDetails ? 'back' : 'down'}`} size={24} color="white" />
			</TouchableOpacity>
		</View>
		{showDetails &&
			<View style={{backgroundColor: '#D8C1F0', padding: 16}}>
				{location && <Text>{location}</Text>}
				{host && <Text>Hosted By {host}</Text>}
				{start_time && (
					<Text>
						{start_time.toLocaleString([], {
						month: 'short',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						})}
						{end_time && ` - ${end_time.toLocaleString([], {
							month: 'short',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}`}
					</Text>
				)}

				{description && 
					<Text style={styles.dropdownText}>
						{description}
					</Text>
				}


				{!noqr && <QRCodeDisplay 
					eventId={id} 
					eventName={name} 
				/>}
			</View>
		}
	</>
  );
};

const styles = StyleSheet.create({
  container: {
	width: '100%',
	flexDirection: 'row',
    alignItems: 'center',
	justifyContent: 'space-between',

	padding: 5,
	backgroundColor: '#60269e',
  },
  greeting: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 16,
	color: '#fff',
  },
  smallButton: {
	padding: 8,
	backgroundColor: 'transparent',
  },
  dropdownText: {
	color: '#60269e',
	marginBottom: 4,
  },
});

export default Event;