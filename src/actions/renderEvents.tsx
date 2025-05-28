'use server';
import Event from '@/components/Event';
import { Text, View } from 'react-native';
import { getEventsAttended, getEventsByHost } from './databasing';

export async function renderEvents({ email }: { email: string }) {
  const events = await getEventsByHost({ email: email });
  
  return (
    <View>
      {events ? events.map(event =>
        <Event
          key={event.id}
          id={event.id}
          name={event.name}
        />
      )
      : <Text>No events found</Text>
      }  
    </View>
  );
}

export async function renderPrevEvents({ email }: { email: string }) {
  const prev_events = await getEventsAttended({ email: email });

  return (
    <View>
      {prev_events ? prev_events.map(event =>
        <Event
          key={event.id}
          id={event.id}
          name={event.name}
          noqr={true}
        />
      )
      : <Text>No events found</Text>
      }
    </View>
  );
}