import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Servizio singleton globale che mette a disposizione il client di supabase per le operazioni semplici sul db lato client. 
 * La anonKey è sicura da esporre se si attiva la  row level security (RLS) da supabase
 */

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private client: SupabaseClient;

  constructor() { 
    const supabaseUrl = 'https://cvguhrjtntwddxptzhhg.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Z3Vocmp0bnR3ZGR4cHR6aGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgwOTcxOTYsImV4cCI6MjAzMzY3MzE5Nn0.TAo82-wXzZEY4tBmF19ZpxtjhUH24xBOvZsuYe4QF7Q'
    
    this.client = createClient(supabaseUrl, supabaseAnonKey);
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
