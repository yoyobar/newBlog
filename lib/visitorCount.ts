import dayjs from 'dayjs';
import { supabase } from './supabase/client';
import Cookies from 'js-cookie';

export const updateVisitCount = async () => {
    const today = dayjs(Date.now()).format('YYYY-MM-DD');

    const { data, error } = await supabase.from('daily_visitors').select('*').eq('visit_date', today).single();

    if (error) {
        const { data: TableCreateData, error: TableCreateError } = await supabase
            .from('daily_visitors')
            .insert({ visit_date: today, visit_count: 1 })
            .select()
            .single();

        if (TableCreateData) console.log('날짜 갱신');
        if (TableCreateError) return console.error(TableCreateError);
    }

    const { data: updatedData, error: updateError } = await supabase
        .from('daily_visitors')
        .update({ visit_count: data.visit_count + 1 })
        .eq('visit_date', today)
        .select()
        .single();

    if (!updateError) return updatedData.visit_count;
    if (updateError) return 0;
};

export const viewVisitCount = async () => {
    const today = dayjs(Date.now()).format('YYYY-MM-DD');
    const cookie = Cookies.get('currentDate');

    if (today !== cookie) {
        Cookies.remove('currentDate');
        Cookies.set('currentDate', today, { expires: 1 });
        const data = await updateVisitCount();
        return data;
    }

    const { data, error } = await supabase.from('daily_visitors').select('*').eq('visit_date', today).single();

    if (error) {
        const { data, error } = await supabase.from('daily_visitors').insert({ visit_date: today, visit_count: 1 }).select().single();

        data && console.log('날짜 갱신');
        error && console.error(error);
    }

    if (data) {
        const { data: updatedData, error: updateError } = await supabase.from('daily_visitors').select().eq('visit_date', today).single();

        if (!updateError) return updatedData.visit_count;
        if (updateError) return 0;
    }
};

export const getCookie = () => {
    const cookie = Cookies.get('currentDate');

    if (!cookie) {
        const currentDate = dayjs(Date.now()).format('YYYY-MM-DD');
        Cookies.set('currentDate', currentDate, { expires: 1 });
    }
};
