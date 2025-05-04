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
export async function storeUser({name, emplid, email} : { name: string, emplid: string, email: string}) {
    const check = await getUser({EmplID: emplid});
    if (check == null || check!.length > 0){
		return { error: "User already exists" };
    }
    else{
        const {error} = await supabase.from('Students').insert([{Name: name, EmplID: emplid, Email: email}]);
        if (error){
            return { error: error };
        }
    }

	return {};
}

export async function storeEvent({name} : {name: string}){
    const {data, error} = await supabase.from('Events').insert([{"Event Name": name}]).select('id').single();
    if (error){
        return { error: error };
    }

	return { data: data };
}

export async function getUser({EmplID} : {EmplID: string}){
    const {data, error } = await supabase.from('Students').select().eq('EmplID', EmplID);
    return data;
}

export async function getEvent({id} : {id: number}){
    const {data, error} = await supabase.from('Events').select('*').eq('id', id);
    return data?.[0];
}
/*
async function reading(){
    const { data, error } = await supabase  .from('Students')  .select()    .eq('Name', 'Tedd Lee');
    console.log(data);
    console.log(error);
}
*/
