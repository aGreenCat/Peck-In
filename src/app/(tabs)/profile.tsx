import { Controller, useForm } from "react-hook-form";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type FormData = {
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
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Profile</Text>

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

          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSubmit(onSubmit)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
	  
	  <ScrollView>
	 	{/* Add events here */}
	  </ScrollView>
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
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
