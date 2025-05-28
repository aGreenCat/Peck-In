import { User } from '@/contexts/userContext';
import { FC } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type AttendeesDisplayProps = {
	attendees: User[];
	visible: boolean;
	onClose: () => void;
};

const AttendeesDisplay: FC<AttendeesDisplayProps> = ({ attendees, visible, onClose }) => {
	if (!attendees || attendees.length === 0) {
		return (
			<Modal
				visible={visible}
				animationType="fade"
				transparent={true}
				onRequestClose={onClose}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<View style={styles.header}>
							<Text style={styles.title}>Attendees</Text>
							<TouchableOpacity onPress={onClose} style={styles.closeButton}>
								<Text style={styles.closeButtonText}>✕</Text>
							</TouchableOpacity>
						</View>
						<Text>No attendees found.</Text>
					</View>
				</View>
			</Modal>
		);
	}

	return (
		<Modal
			visible={visible}
			animationType="fade"
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<View style={styles.header}>
						<Text style={styles.title}>Attendees ({attendees.length})</Text>
						<TouchableOpacity onPress={onClose} style={styles.closeButton}>
							<Text style={styles.closeButtonText}>✕</Text>
						</TouchableOpacity>
					</View>
					
					<ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
						{/* Header Row */}
						<View style={styles.gridRow}>
							<View style={styles.gridCell}>
								<Text style={styles.headerText}>Name</Text>
							</View>
							<View style={styles.gridCell}>
								<Text style={styles.headerText}>Employee ID</Text>
							</View>
							<View style={styles.gridCell}>
								<Text style={styles.headerText}>Email</Text>
							</View>
						</View>
						
						{/* Attendee Rows */}
						{attendees.map((attendee, index) => (
							<View key={index} style={[styles.gridRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
								<View style={styles.gridCell}>
									<Text style={styles.cellText} selectable>{attendee.name}</Text>
								</View>
								<View style={styles.gridCell}>
									<Text style={styles.cellText} selectable>{attendee.emplid}</Text>
								</View>
								<View style={styles.gridCell}>
									<Text style={styles.cellText} selectable>{attendee.email}</Text>
								</View>
							</View>
						))}
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		width: '90%',
		maxHeight: '80%',
		backgroundColor: 'white',
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 10,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
	},
	closeButton: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#f0f0f0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeButtonText: {
		fontSize: 18,
		color: '#666',
		fontWeight: 'bold',
	},
	scrollContainer: {
		maxHeight: 400,
		padding: 20,
	},
	gridRow: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
		paddingVertical: 12,
	},
	gridCell: {
		flex: 1,
		paddingHorizontal: 8,
		justifyContent: 'center',
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#333',
		textAlign: 'center',
	},
	cellText: {
		fontSize: 14,
		color: '#555',
		textAlign: 'center',
	},
	evenRow: {
		backgroundColor: '#f9f9f9',
	},
	oddRow: {
		backgroundColor: 'white',
	},
});
  
export default AttendeesDisplay;