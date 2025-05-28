import { Database } from '@/actions/supabase';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string, 
  process.env.EXPO_PUBLIC_SUPABASE_KEY as string
);

// Export the Students table row type for use as User type
export type Students = Database['public']['Tables']['Students']['Row'];

export async function storeUser({ name, emplid, email }: { name: string, emplid?: string, email: string }) {
  // Check if user already exists by email
  const { data: existingUser } = await supabase.from('Students').select().eq('email', email).single();
  
  if (existingUser) {
    return { existingUser };
  } else {
    const { data, error } = await supabase.from('Students').insert([{ name: name, emplid: emplid, email: email }]).select().single();
    if (error) {
      return { error: error };
    }
    return { newUser: data };
  }
}

export async function storeEvent({ name, host, description, location }: { name: string, host: string, description?: string, location?: string }) {
  const { error } = await supabase.from('Events').insert([{ name, description, location, host }]);
  if (error) {
    return { error: error };
  }
  return {};
}

export async function storeAttendance({ event_id, student_id }: { event_id: string, student_id: string }) {
  // Updated to match EventAttendance table schema: event_id (string) and student_id (string)
  const { error } = await supabase.from('EventAttendance').insert([{ event_id: event_id, student_id: student_id }]);
  if (error) {
    console.log(error);
  }
}

export async function getUserByEmail({ email }: { email: string }) {
  // Get user by email - needed for authentication/profile scenarios
  const { data, error } = await supabase.from('Students').select().eq('email', email).single();
  return data;
}

export async function getUserById({ id }: { id: string }) {
  // Get user by ID - more efficient than email lookup
  const { data, error } = await supabase.from('Students').select().eq('id', id).single();
  return data;
}

export async function getEvent({ id }: { id: string }) {
  // Updated to use correct field names: id (string) and name
  const { data, error } = await supabase.from('Events').select('name').eq('id', id).single();
  return data;
}

export async function getEventsByHost({ id }: { id: string }) {
  let student = await getUserById({ id });
  
  if (!student) return [];
  
  // Then get events hosted by that student
  const { data } = await supabase
    .from('Events')
    .select()
    .eq('host', student.id);

  return data;
}

export async function getEventsAttended({ id }: { id: string }) {
  let student = await getUserById({ id });
  
  if (!student) return [];

  // Get events attended by this student using a flattened join with aliases
  const { data: events } = await supabase
    .from('EventAttendance')
    .select(`
      event_id,
      Events!inner (
        id,
        name,
        description,
        location,
        created_at,
        host,
        Students!host (
          name
        )
      )
    `)
    .eq('student_id', student.id);

  // Flatten the structure manually
  const flattenedEvents = events?.map(item => ({
    id: item.Events.id,
    name: item.Events.name,
    description: item.Events.description,
    location: item.Events.location,
    created_at: item.Events.created_at,
    host: item.Events.host,
    host_name: item.Events.Students.name
  }));

  return flattenedEvents;
}

export async function getAttendees({ event_id }: { event_id: string }) {
  // Updated to use correct field names
  const { data: attendanceData } = await supabase
    .from('EventAttendance')
    .select('student_id')
    .eq('event_id', event_id);

  if (!attendanceData || attendanceData.length === 0) return [];

  // Extract student IDs
  const studentIds = attendanceData.map(record => record.student_id);

  // Get the actual students
  const { data: students } = await supabase
    .from('Students')
    .select()
    .in('id', studentIds);

  return students;
}