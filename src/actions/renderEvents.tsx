'use server';

import Event from '@/components/Event';
import { View } from 'react-native';
import { getEventsByHost, getUser } from './databasing';

export default async function renderEvents({EmplID}: { EmplID: string }) {
  const events = await getEventsByHost({EmplID: EmplID});
  const hoster = await getUser({EmplID: EmplID});

  return (
    <View>
      {events && events.map(event => 

        <Event
          id={event.EventID}
          name={event.EventName!}
          host={hoster!.Name!}
        />


      )}
    </View>
  );
}