'use server';

import Event from '@/components/Event';
import { View } from 'react-native';
import { getEventsAttended, getEventsByHost, getUser } from './databasing';

export async function renderEvents({EmplID}: { EmplID: string }) {
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

export async function renderPrevEvents({EmplID}: { EmplID: string}){
  const prev_events = await getEventsAttended({EmplID: EmplID});

  return (
    <View>
      {prev_events && prev_events.map(event => 

        <Event
          id={event.EventID}
          name={event.EventName!}
        />


      )}
    </View>
  );
}