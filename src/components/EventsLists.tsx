import Event from '@/components/Event';
import { User } from '@/contexts/userContext';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getEventsAttended, getEventsByHost, subscribeToNewEvents } from '../db/database';

export function EventsList({ user }: { user: User }) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const fetchedEvents = await getEventsByHost({ id: user.id });
      setEvents(fetchedEvents || []);
      setLoading(false);
    };

    fetchEvents();

    // real-time subscription for new events
    const subscription = subscribeToNewEvents(user.id, (payload) => {
      console.log('New event created:', payload);
      fetchEvents();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user.id]);

  if (loading) {
    return (
      <View style={{ backgroundColor: '#60269e', padding: 16 }}>
        <Text style={{ color: 'white' }}>Loading events...</Text>
      </View>
    );
  }
  
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
          host={`${user.name} (you)`}
        />
      )
      : <View style={{ backgroundColor: '#60269e', padding: 16 }}>
          <Text style={{ color: 'white' }}>No events found</Text>
        </View>
      }  
    </View>
  );
}

export function PrevEventsList({ user }: { user: User }) {
  const [prevEvents, setPrevEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrevEvents = async () => {
      setLoading(true);
      const fetchedPrevEvents = await getEventsAttended({ id: user.id });
      setPrevEvents(fetchedPrevEvents || []);
      setLoading(false);
    };

    fetchPrevEvents();
  }, [user.id]);

  if (loading) {
    return (
      <View style={{ backgroundColor: '#60269e', padding: 16 }}>
        <Text style={{ color: 'white' }}>Loading events...</Text>
      </View>
    );
  }

  return (
    <View>
      {prevEvents && prevEvents.length > 0 ? prevEvents.map(event =>
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