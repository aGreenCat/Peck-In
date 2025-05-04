import { User, userContext } from '@/contexts/userContext';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
	const fetchUser = async () => {
	  try {
		const name = await SecureStore.getItemAsync('name');
		const emplid = await SecureStore.getItemAsync('emplid');
		const email = await SecureStore.getItemAsync('email');

		if (name && emplid && email) {
		  setUser({
			name: name,
			emplid: emplid,
			email: email,
		  });
		  console.log("User fetched successfully. Name: " + name + ", EmplID: " + emplid + ", Email: " + email);
		  return;
		}
		
		console.log("User not found in SecureStore");
	  } catch (error) {
		console.error("Error fetching user:", error);
	  }
	}

	console.log("Fetching user...");
	fetchUser();
  }, []);

  return (
	<userContext.Provider value={{ user, setUser }}>
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	</userContext.Provider >
  );
}
