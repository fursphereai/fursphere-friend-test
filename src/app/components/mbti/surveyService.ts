import { supabase } from "@/app/lib/supabase"

export const saveResult = async (data: any) => {
    try {
      // Debug log
      console.log('Attempting to save:', data)
  
      const { data: result, error } = await supabase
        .from('survey_results')
        .insert({
          result_data: data
        })
        .select()
  
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
  
      return result
    } catch (error) {
      console.error('Save error:', error)
      throw error
    }
  }