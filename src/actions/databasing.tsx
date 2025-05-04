import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL as string, process.env.EXPO_PUBLIC_SUPABASE_KEY as string);
 /*
async function storing() {
    console.log("A")
  // Securely fetch data from an API, and read environment variables...
//USE ENVIRONMENT VARIABLES TO HIDE THIS INFORMATION ASAP
    const { error } = await supabase  .from('Students')  .insert([{ id:2, Name:'Tedd Lee', EmplID:24357769, Email:'tedd.lee69@myhunter.cuny.edu ' }]);
    console.log(error);
}
    */
export async function storeUser({name, emplid, email} : {name: string, emplid: string, email: string}) {
    const check = await getUser({emplid});
    if (check){
        console.log("DUPLICATE USER");
    }
    const {error} = await supabase.from('Students').insert([{Name: name, EmplID: emplid, Email: email}]);
    if (error){
        console.log(error); //Placeholder?
    }
}

export async function storeEvent({EventName, EmplID} : {EventName: string, EmplID: string}){
    const {error} = await supabase.from('Events').insert([{'EventName': EventName, 'EmplID': EmplID}]);
    if (error){
        console.log(error); //Placeholder?
    }
}
/*
export async function storeClub({clubname, clubleader} : {clubname: string, clubleader: string}){

}
*/
export async function storeAttendance({EventID, EmplID} : {EventID: number, EmplID: string}){
    const {error} = await supabase.from('EventAttendace').insert([{'EventID': EventID, 'EmplID': EmplID}]);
    if (error){
        console.log(error);
    }
}

export async function getUser({emplid} : {emplid: string}){
    const {data, error } = await supabase.from('Students').select().eq('EmplID', emplid);
    return data;
}

export async function getEvent({EventID} : {EventID: number}){
    const {data, error} = await supabase.from('Events').select().eq('EventID', EventID).limit(1);
    return data;
}

export async function getEventsAttended({emplid} : {emplid: string}){
    const {data, error} = await supabase.from('EventAttendance').select('EventID').eq('EmplID', emplid);
    //console.log(emplid);
    //console.log(data);
    let i = 0;
    while( i < data!.length){
        console.log(await getEvent(await data![i]));
        i+= 1;
    }
}

export async function getAttendees({EventID}: {EventID: number}){

}
/*
async function reading(){
    const { data, error } = await supabase  .from('Students')  .select()    .eq('Name', 'Tedd Lee');
    console.log(data);
    console.log(error);
}
*/
