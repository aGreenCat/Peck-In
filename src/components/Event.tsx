import { User } from '@/contexts/userContext';
import { getAttendees, subscribeToEventAttendance } from '@/db/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FC, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AttendeesDisplay from './AttendeesDisplay';
import QRCodeDisplay from './QRCodeDisplay';

export type EventProps = {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  checkedIn?: string | null;
  time: string | null;
  host: string;
  noqr?: boolean; // if true, don't show QR code
};

const Event: FC<EventProps> = ({ id, name, description, location, checkedIn, host, time, noqr=false }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showAttendees, setShowAttendees] = useState(false);

  const [attendees, setAttendees] = useState<User[]>([]);

  const fetchAttendees = async () => {
	const raw_attendees = await getAttendees({event_id: id});
	const attendees = raw_attendees?.map((attendee) => {
	  return {
		id: attendee.id,
		name: attendee.name,
		emplid: attendee.emplid,
		email: attendee.email,
	  }
	});
	setAttendees(attendees || []);
  };

  useEffect(() => {
	if (!noqr) {
		// Initial fetch
		fetchAttendees();
		
		// Set up real-time subscription
		const subscription = subscribeToEventAttendance(id, (payload) => {
			console.log('New attendance recorded:', payload);
			// Refetch attendees when someone checks in
			fetchAttendees();
		});

		// Cleanup subscription on unmount
		return () => {
			subscription.unsubscribe();
		};
	}
  }, [id, noqr]);
  
  return (
	<>
		<View style={styles.container}>
			<Text style={styles.greeting}>{name + ((!noqr && attendees) ? ` (${attendees.length} Attendees)` : '')}</Text>
			<TouchableOpacity onPress={() => setShowDetails(!showDetails)} style={styles.smallButton}>
				<Ionicons name={`chevron-${showDetails ? 'back' : 'down'}`} size={24} color="white" />
			</TouchableOpacity>
		</View>
		{showDetails &&
			<View style={{backgroundColor: '#D8C1F0', padding: 16}}>
				<Text>{location && location}{location && (checkedIn || time) && ' • '}{checkedIn ? `Checked in: ${new Date(checkedIn).toLocaleString(undefined, { 
					year: 'numeric', 
					month: 'short', 
					day: 'numeric', 
					hour: '2-digit', 
					minute: '2-digit' 
				})}` : time}</Text>
				{host && <Text>Hosted By {host}</Text>}

				{description && 
					<Text style={styles.dropdownText}>
						{description}
					</Text>
				}

				{!noqr && (
					<>
						{showAttendees && 
							<AttendeesDisplay 
								attendees={attendees} 
								visible={showAttendees} 
								onClose={() => setShowAttendees(false)}
							/>
						}
						
						<QRCodeDisplay 
							eventId={id} 
							eventName={name} 
						/>

						<Button 
							title="View Attendance"
							onPress={() => {
								fetchAttendees();
								setShowAttendees(!showAttendees)
							}}
						/>

						<View style={{height: 10}} />

						<Button 
							title="Download List"
							onPress={() => alert('List has been downloaded!')}
							color={'gray'}
						/>
					</>
				)}
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