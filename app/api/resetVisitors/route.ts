// app/api/resetVisitors/route.js
import { supabase } from '@/lib/supabase/client';

export const POST = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase.from('daily_visitors').delete().eq('visit_date', today);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({ message: 'Visit counts reset' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
