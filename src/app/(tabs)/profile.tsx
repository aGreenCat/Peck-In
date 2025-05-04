import { storeUser } from '@/actions/databasing';
import Event, { EventProps } from '@/components/Event';
import EventForm from '@/components/EventForm';
import { userContext, UserContextType } from '@/contexts/userContext';
import * as SecureStore from 'expo-secure-store';
import { useContext, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import {
	Button,
	KeyboardAvoidingView,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from "react-native";

type ProfileFormData = {
	firstName: string;
  	lastName: string;
  	emplid: string;
  	email: string;
};

export default function Profile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const context = useContext<UserContextType>(userContext);
  const user = context?.user || null;
  const setUser = context?.setUser!;

  const onSubmit = async (data: ProfileFormData) => {
    console.log(data);
	setLoading(true);
	
    let { error } = await storeUser({
      name: (data.firstName + " " + data.lastName), 
      emplid: data.emplid, 
      email: data.email
    });

	if (error) {
	  console.error("Error storing user:", error);
	  // TODO: Handle error (e.g., show a message to the user)
	  setError(error as unknown as string);
	  setLoading(false);
	  return;
	}
	
	await SecureStore.setItemAsync('name', data.firstName + " " + data.lastName);
	await SecureStore.setItemAsync('emplid', data.emplid);
	await SecureStore.setItemAsync('email', data.email);
	console.log("User stored successfully");

	// TODO: actually set the user context!
	setUser({
		name: data.firstName + " " + data.lastName,
		emplid: data.emplid,
		email: data.email,
	});

	setLoading(false);
	setError(null);
  };

  const addEvent = async (event: EventProps) => {
	console.log("Adding event:", event);
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Profile</Text>
		  {user && 
		  	<Text style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 24, }}>Welcome, {user?.name}.</Text>
		  }

		  {user 
		  ? 
		  <>
		  <Text>EMPLID: {user.emplid}</Text>
		  <Text>Email: {user.email}</Text>
		  </>
		  :
		  <>
          <Controller
            control={control}
            name="firstName"
            rules={{ required: "First name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}

          <Controller
            control={control}
            name="lastName"
            rules={{ required: "Last name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}

          <Controller
            control={control}
            name="emplid"
            rules={{
              required: "EMPLID is required",
              pattern: { value: /^[0-9]+$/, message: "EMPLID must be numeric" },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="EMPLID"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.emplid && <Text style={styles.error}>{errors.emplid.message}</Text>}

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
		  {error && <Text style={styles.error}>{error}</Text>}
		  
		  </>
		  }

		  {user
		  ?
		  <View style={styles.buttonContainer}>
			<Button color='gray' title="Change User" onPress={async () => {
				// TODO: remove from supabase

				await SecureStore.deleteItemAsync('name');
				await SecureStore.deleteItemAsync('emplid');
				await SecureStore.deleteItemAsync('email');

				setUser(null);

				console.log("User deleted successfully");
			}} />
		  </View>
		  :
		  <View style={styles.buttonContainer}>
            {loading 
			?	<Button title="Saving..." onPress={handleSubmit(onSubmit)} />
			:	<Button title="Save" onPress={handleSubmit(onSubmit)} />
			}
          </View>
		  }

		<Text style={{...styles.title, marginVertical: 15}}>Your Club Events</Text>
		{user && (
			<View style={styles.eventsContainer}>
				<EventForm addEvent={addEvent} />
				<Event
					id={273}
					name="Hunter CS Club Meeting"
				/>
			</View>
		)}
		
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    color: "#60269e",
  },
  eventsContainer: {
	// flex: 1,
	width: '100%',

	borderRadius: 12,
	backgroundColor: "#cc64f5",
	overflow: 'hidden',

	marginBottom: 20,
  },
});
