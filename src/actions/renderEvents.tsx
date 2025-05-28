'use server';
import Event from '@/components/Event';
import { Text, View } from 'react-native';
import { getEventsAttended, getEventsByHost } from './databasing';

export async function renderEvents({ email }: { email: string }) {
  const events = await getEventsByHost({ email: email });
  
  return (
    <View>
      {events && events.length > 0 ? events.map(event =>
        <Event
          key={event.id}
          id={event.id}
          name={event.name}
        />
      )
      : <View style={{ backgroundColor: '#60269e', padding: 16 }}>
          <Text style={{ color: 'white' }}>No events found</Text>
        </View>
      }  
    </View>
  );
}

export async function renderPrevEvents({ email }: { email: string }) {
  const prev_events = await getEventsAttended({ email: email });

  return (
    <View>
      {prev_events && prev_events.length > 0 ? prev_events.map(event =>
        <Event
          key={event.id}
          id={event.id}
          name={event.name}
          noqr={true}
        />
      )
      : <View style={{ backgroundColor: '#60269e', padding: 16 }}>
          <Text style={{ color: 'white' }}>No events found</Text>
        </View>
      }
    </View>
  );
}