'use server';

import Event from '@/components/Event';
import { View } from 'react-native';
import { getEventsByHost } from './databasing';

export default async function renderEvents({EmplID}: { EmplID: string }) {
  const events = await getEventsByHost({EmplID: EmplID});

  return (
    <View>
      {events && events.map(event => 

        <Event
          id={event.EventID}
          name={event.EventName!}
        />


      )}
    </View>
  );
}