import { Global, Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
@Global()
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
  