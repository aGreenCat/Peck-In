import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
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
    const check = getUser({emplid});
    if (check != null){
        console.log("DUPLICATE USER");
    }
    const {error} = await supabase.from('Students').insert([{Name: name, EmplID: emplid, Email: email}]);
    if (error){
        console.log(error); //Placeholder?
    }
}

export async function storeEvent({name} : {name: string}){
    const {error} = await supabase.from('Events').insert([{Name: name}]);
    if (error){
        console.log(error); //Placeholder?
    }
}

export async function getUser({emplid} : {emplid: string}){
    const {data, error } = await supabase.from('Students').select().eq('EmplID', emplid);
    return data;
}

export async function getEvent({name} : {name: string}){
    const {data, error} = await supabase.from('Events').select().eq('Name', name);
    return data;
}
/*
async function reading(){
    const { data, error } = await supabase  .from('Students')  .select()    .eq('Name', 'Tedd Lee');
    console.log(data);
    console.log(error);
}
*/
