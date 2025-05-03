import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://wmjlyconmvfxepmvuibl.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indtamx5Y29ubXZmeGVwbXZ1aWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMjEwNzgsImV4cCI6MjA2MTc5NzA3OH0.BXrCEVgQK2gtLaYNbLHrX48-uG9BQqakVVQaA3nSqKs")
 
async function storing() {
    console.log("A")
  // Securely fetch data from an API, and read environment variables...
//USE ENVIRONMENT VARIABLES TO HIDE THIS INFORMATION ASAP
    const { error } = await supabase  .from('Students')  .insert([{ id:2, Name:'Tedd Lee', EmplID:24357769, Email:'tedd.lee69@myhunter.cuny.edu ' }]);
    console.log(error);
}

async function reading(){
    const { data, error } = await supabase  .from('Students')  .select()    .eq('Name', 'Tedd Lee');
    console.log(data);
    console.log(error);
}

module.exports = {
    storing,
    reading,
    supabase
}