import { User, userContext } from '@/contexts/userContext';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
	const fetchUser = async () => {
	  try {
		// Get the entire user object from SecureStore
		const userJson = await SecureStore.getItemAsync('user');

		if (userJson) {
		  const userData = JSON.parse(userJson) as User;
		  setUser(userData);
		  console.log("User fetched successfully:", userData);
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
