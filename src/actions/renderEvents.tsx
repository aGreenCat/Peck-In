'use server';
import Event from '@/components/Event';
import { User } from '@/contexts/userContext';
import { Text, View } from 'react-native';
import { getEventsAttended, getEventsByHost } from './databasing';

export async function renderEvents({ user }: { user: User }) {
  const events = await getEventsByHost({ id: user.id });
  
  return (
    <View>
      {events && events.length > 0 ? events.map(event =>
        <Event
          key={event.id}
          id={event.id}
          name={event.name}
          description={event.description}
          location={event.location}
          time={new Date(event.created_at).toLocaleString(undefined, { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
          host={user.name}
        />
      )
      : <View style={{ backgroundColor: '#60269e', padding: 16 }}>
          <Text style={{ color: 'white' }}>No events found</Text>
        </View>
      }  
    </View>
  );
}

export async function renderPrevEvents({ user }: { user: User }) {
  const prev_events = await getEventsAttended({ id: user.id });

  return (
    <View>
      {prev_events && prev_events.length > 0 ? prev_events.map(event =>
        <Event
          key={event.id}
          id={event.id}
          name={event.name}
          description={event.description}
          location={event.location}
          checkedIn={event.checkedIn}
          time={new Date(event.created_at).toLocaleString(undefined, { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
          host={event.host_name}
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