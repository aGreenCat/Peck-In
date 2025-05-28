'use server';
import Event from '@/components/Event';
import { View } from 'react-native';
import { getEventsAttended, getEventsByHost } from './databasing';

export async function renderEvents({ emplid }: { emplid: string }) {
  const events = await getEventsByHost({ emplid: emplid });
  
  return (
    <View>
      {events && events.map(event =>
        <Event
          key={event.id}
          id={event.id}
          name={event.name}
        />
      )}  
    </View>
  );
}

export async function renderPrevEvents({ emplid }: { emplid: string }) {
  const prev_events = await getEventsAttended({ emplid: emplid });

  return (
    <View>
      {prev_events && prev_events.map(event =>
        <Event
          key={event.id}
          id={event.id}
          name={event.name!}
          noqr={true}
        />
      )}
    </View>
  );
}