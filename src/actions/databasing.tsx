import { Database } from '@/actions/supabase';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string, 
  process.env.EXPO_PUBLIC_SUPABASE_KEY as string
);

export async function storeUser({ name, emplid, email }: { name: string, emplid: string, email: string }) {
  const check = await getUser({ emplid: emplid });
  if (check) {
    return {};
  } else {
    // Updated to match Students table schema: name, emplid, email (all lowercase)
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

export async function getUser({ emplid }: { emplid: string }) {
  // Updated to use lowercase field name
  const { data, error } = await supabase.from('Students').select().eq('emplid', emplid).single();
  return data;
}

export async function getEvent({ id }: { id: string }) {
  // Updated to use correct field names: id (string) and name
  const { data, error } = await supabase.from('Events').select('name').eq('id', id).single();
  return data;
}

export async function getEventsByHost({ emplid }: { emplid: string }) {
  // Updated to use correct field names and join properly
  const { data } = await supabase
    .from('Events')
    .select()
    .eq('host', emplid); // host field references Students.id, so we need to find the student first
  return data;
}

// Alternative implementation that finds student by emplid first
export async function getEventsByHostEmplid({ emplid }: { emplid: string }) {
  // First get the student's id using their emplid
  const student = await getUser({ emplid });
  if (!student) return null;
  
  // Then get events hosted by that student
  const { data } = await supabase
    .from('Events')
    .select()
    .eq('host', student.id);
  return data;
}

export async function getEventsAttended({ emplid }: { emplid: string }) {
  // First get the student's id using their emplid
  const student = await getUser({ emplid });
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