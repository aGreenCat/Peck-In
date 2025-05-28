import { storeEvent } from '@/actions/databasing';
import { User } from '@/contexts/userContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FC, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type EventFormData = {
  name: string;
  description?: string;
  location?: string;
  start_time?: string;
  end_time?: string;
};

const EventForm: FC<{ user : User}> = ({ user }) => {
  const [showForm, setForms] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
	control,
	handleSubmit,
	formState: { errors },
  } = useForm<EventFormData>();

  const onSubmit = async (data: EventFormData) => {
	console.log(data);
	setLoading(true);

	let { error } = await storeEvent({
	  EventName: data.name,
	  EmplID: user!.emplid
	});

	if (error)
	  console.error("Error storing event:", error);
	else
	  console.log("Event stored successfully");

	setLoading(false);
	setForms(false);

	console.log("Event added successfully");
  }
  
  return (
	<>
		<View style={styles.container}>
			<Text style={styles.greeting}>Add Event</Text>
			<TouchableOpacity onPress={() => setForms(!showForm)} style={styles.smallButton}>
				<Ionicons name='add' size={24} color="white" />
			</TouchableOpacity>
		</View>
		{showForm &&
			<View style={{backgroundColor: '#D8C1F0', padding: 16}}>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={{ backgroundColor: 'white', marginBottom: 10, padding: 8, borderRadius: 8 }}
							placeholder="Event Name"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name="name"
					rules={{ required: true }}
				/>
				{errors.name && <Text style={styles.dropdownText}>This is required.</Text>}
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={{ backgroundColor: 'white', marginBottom: 10, padding: 8, borderRadius: 8 }}
							placeholder="Description"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name="description"
					rules={{ required: false }}
				/>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={{ backgroundColor: 'white', marginBottom: 10, padding: 8, borderRadius: 8 }}
							placeholder="Location"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name="location"
					rules={{ required: false }}
				/>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={{ backgroundColor: 'white', marginBottom: 10, padding: 8, borderRadius: 8 }}
							placeholder="Start Time"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name="start_time"
					rules={{ required: false }}
				/>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							style={{ backgroundColor: 'white', marginBottom: 10, padding: 8, borderRadius: 8 }}
							placeholder="End Time"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
					name="end_time"
					rules={{ required: false }}
				/>
				<TouchableOpacity onPress={handleSubmit(onSubmit)} style={{backgroundColor: '#60269e', padding: 10, borderRadius: 8}} disabled={loading}>
					{loading 
					? <Text style={{color: 'white', textAlign: 'center'}}>Loading...</Text>
					: <Text style={{color: 'white', textAlign: 'center'}}>Add Event</Text>}
				</TouchableOpacity>
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

export default EventForm;