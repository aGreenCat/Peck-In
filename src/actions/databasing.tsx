import { Database } from '@/actions/supabase';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(process.env.EXPO_PUBLIC_SUPABASE_URL as string, process.env.EXPO_PUBLIC_SUPABASE_KEY as string);
 /*
async function storing() {
    console.log("A")
  // Securely fetch data from an API, and read environment variables...
//USE ENVIRONMENT VARIABLES TO HIDE THIS INFORMATION ASAP
    const { error } = await supabase  .from('Students')  .insert([{ id:2, Name:'Tedd Lee', EmplID:24357769, Email:'tedd.lee69@myhunter.cuny.edu ' }]);
    console.log(error);
}
    */
export async function storeUser({name, emplid, email} : { name: string, emplid: string, email: string}) {
    const check = await getUser({EmplID: emplid});
    if (check){
        return {};
    }
    else{
        const {error} = await supabase.from('Students').insert([{Name: name, EmplID: emplid, Email: email}]);
        if (error){
            return { error: error };
        }
    }

	return {};
}

export async function storeEvent({EventName, EmplID} : {EventName: string, EmplID: string}){
    const {error} = await supabase.from('Events').insert([{'EventName': EventName, 'EmplID': EmplID}]).single();
    if (error){
        return { error: error };
    }

	return {};
}
/*
export async function storeClub({clubname, clubleader} : {clubname: string, clubleader: string}){

}
*/
export async function storeAttendance({EventID, EmplID} : {EventID: number, EmplID: string}){
    const {error} = await supabase.from('EventAttendance').insert([{'EventID': EventID, 'EmplID': EmplID}]);
    if (error){
        console.log(error);
    }
}

export async function getUser({EmplID} : {EmplID: string}){
    const {data, error } = await supabase.from('Students').select().eq('EmplID', EmplID).single();
    return data;
}

export async function getEvent({EventID} : {EventID: number}){
    const {data, error} = await supabase.from('Events').select('EventName').eq('EventID', EventID).single();
    return data;
}

export async function getEventsByHost({EmplID} : {EmplID: string}){
    const obj = await supabase.from('Events').select().eq('EmplID', EmplID );
    return obj.data;

}

export async function getEventsAttended({EmplID} : {EmplID: string}){
    const obj = await supabase.from('EventAttendance').select('EventID').eq('EmplID', EmplID);
    //console.log(emplid);
    //console.log(obj.data);
    //console.log(obj.data![0].EventID);
    let ids = [];
    for (let i = 0; i < obj.data!.length; i++){
        ids.push(obj.data![i].EventID);
    }
    console.log(ids);
    const events = await supabase.from('Events').select().in('EventID', ids);
    return (events.data);
     
}

export async function getAttendees({EventID}: {EventID: number}){
    const obj = await supabase.from('EventAttendance').select('EmplID').eq('EventID', EventID);
    let i = 0;
    let attenders = [];
    for (let i = 0; i < obj.data!.length; i++){
        attenders.push(obj.data![i].EmplID);
    }
    const people = await supabase.from('Students').select().in('EmplID', attenders);
    return (people.data);
}


/*
async function reading(){
    const { data, error } = await supabase  .from('Students')  .select()    .eq('Name', 'Tedd Lee');
    console.log(data);
    console.log(error);
}
*/
