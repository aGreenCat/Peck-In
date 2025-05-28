import { Database } from '@/actions/supabase';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string, 
  process.env.EXPO_PUBLIC_SUPABASE_KEY as string
);

// Export the Students table row type for use as User type
export type Students = Database['public']['Tables']['Students']['Row'];

export async function storeUser({ name, emplid, email }: { name: string, emplid?: string, email: string }) {
  const check = await getUser({ email: email });
  
  if (check) {
    return {};
  } else {
    const { error } = await supabase.from('Students').insert([{ name: name, emplid: emplid, email: email }]);
    if (error) {
      return { error: error };
    }
  }
  return {};
}

export async function storeEvent({ name, host }: { name: string, host: string }) {
  // Updated to match Events table schema: name and host fields
  const { error } = await supabase.from('Events').insert([{ name: name, host: host }]);
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

export async function getUser({ email }: { email: string }) {
  // Updated to use email as the primary identifier
  const { data, error } = await supabase.from('Students').select().eq('email', email).single();
  return data;
}

export async function getEvent({ id }: { id: string }) {
  // Updated to use correct field names: id (string) and name
  const { data, error } = await supabase.from('Events').select('name').eq('id', id).single();
  return data;
}

export async function getEventsByHost({ email }: { email: string }) {
  // First get the student's id using their email
  const student = await getUser({ email });
  if (!student) return null;
  
  // Then get events hosted by that student
  const { data } = await supabase
    .from('Events')
    .select()
    .eq('host', student.id);
  return data;
}

export async function getEventsAttended({ email }: { email: string }) {
  // First get the student's id using their email
  const student = await getUser({ email });
  if (!student) return null;

  // Get event attendance records for this student
  const { data: attendanceData } = await supabase
    .from('EventAttendance')
    .select('event_id')
    .eq('student_id', student.id);

  if (!attendanceData || attendanceData.length === 0) return [];

  // Extract event IDs
  const eventIds = attendanceData.map(record => record.event_id);

  // Get the actual events
  const { data: events } = await supabase
    .from('Events')
    .select()
    .in('id', eventIds);

  return events;
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