import { User } from '@/contexts/userContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type AttendeesDisplayProps = {
	attendees: User[]
};

const AttendeesDisplay: React.FC<AttendeesDisplayProps> = ({ attendees }) => {
	if (!attendees || attendees.length === 0) {
		return (
			<View style={styles.container}>
				<Text>No attendees found.</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{attendees.map((attendee, index) => (
				<React.Fragment key={index}>
					<Text style={styles.name}>{attendee.name}</Text>
					<View style={styles.idContainer}>
						<Text style={styles.idLabel}>ID:</Text>
						<Text style={styles.idValue}>{attendee.emplid}</Text>
					</View>
				</React.Fragment>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  padding: 20,
	  backgroundColor: 'white',
	  borderRadius: 12,
	  margin: 20,
	  shadowColor: '#000',
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.2,
	  shadowRadius: 4,
	  elevation: 5,
	},
	idContainer: {
		flexDirection: 'row',
		marginBottom: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	idLabel: {
		fontWeight: 'bold',
		marginRight: 8,
		color: '#333',
	},
	idValue: {
		fontSize: 18,
		fontFamily: 'monospace',
		backgroundColor: '#f5f5f5',
		paddingHorizontal: 8,
		borderRadius: 4,
	},
	name: {
		marginTop: 8,
		color: '#60269e',
		textAlign: 'center',
	},
});
  
export default AttendeesDisplay;