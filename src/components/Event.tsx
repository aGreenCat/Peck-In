import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Props = {
  name: string;
  description?: string;
  location?: string;
  start_time?: Date;
  end_time?: Date;
};

const Event: React.FC<Props> = ({ name, description, location, start_time, end_time }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  
  return (
	<>
		<View style={styles.container}>
			<Text style={styles.greeting}>{name}</Text>
			<TouchableOpacity onPress={() => setShowDetails(!showDetails)} style={styles.smallButton}>
				<Ionicons name={`chevron-${showDetails ? 'back' : 'down'}`} size={24} color="black" />
			</TouchableOpacity>
		</View>
		{showDetails &&
			<View style={{backgroundColor: '#bb54e5', padding: 16}}>
				{location && <Text>{location}</Text>}
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

				{description && <Text>{description}</Text>}
			</View>
		}
	</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
	width: '100%',
	flexDirection: 'row',
    alignItems: 'center',
	justifyContent: 'space-between',

	padding: 5,
	backgroundColor: '#cc64f5',
  },
  greeting: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 16,
  },
  smallButton: {
	padding: 8,
	backgroundColor: 'none',
  },
});

export default Event;