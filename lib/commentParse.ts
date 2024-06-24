import { supabase } from './supabase/client';
import crypto from 'crypto';
import { Comment, CommentFormType } from '@/config/types';

function hashPassword(password: string): string {
    const hash = crypto.createHash('sha256'); // SHA-256 해시 알고리즘 사용
    hash.update(password);
    return hash.digest('hex');
}

export async function getComments(pathId: string): Promise<Comment[] | null> {
    const { data, error } = await supabase
        .from('comments')
        .select('content, created_at, updated_at, name, id, admin')
        .eq('path', pathId);

    if (error) {
        console.log('error:', error);
        return null;
    }

    return data;
}

async function fetchAdminList() {
    try {
        const response = await fetch('/api/comments');
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data: { adminId: string; adminPw: string } = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function setAdminComments(form: CommentFormType): Promise<Comment[] | null> {
    const hashedPassword = hashPassword(form.password);
    const { data, error } = await supabase.from('comments').insert({
        name: form.name,
        password: hashedPassword,
        content: form.content,
        path: form.path,
        admin: true,
    });

    if (error) {
        console.log('insert error:', error);
        return null;
    }

    return data;
}
export async function setComments(form: CommentFormType): Promise<Comment[] | null> {
    const hashedPassword = hashPassword(form.password);

    const adminData = await fetchAdminList();
    if (adminData) {
        const { adminId, adminPw } = adminData;
        if (hashedPassword === adminPw && form.name === adminId) {
            return setAdminComments(form);
        }
    }

    const { data, error } = await supabase.from('comments').insert({
        name: form.name,
        password: hashedPassword,
        content: form.content,
        path: form.path,
    });

    if (error) {
        console.log('insert error:', error);
        return null;
    }

    return data;
}

export async function removeComments(
    pathId: string,
    password: string,
    id: string
): Promise<void> {
    const hashedPassword = hashPassword(password);

    const { data, error: passwordParsingError } = await supabase
        .from('comments')
        .select('password')
        .eq('path', pathId);

    if (passwordParsingError) {
        console.log('parsing error:', passwordParsingError);
        return;
    }

    if (data.some((comment) => comment.password === hashedPassword)) {
        const { error: deleteError } = await supabase
            .from('comments')
            .delete()
            .eq('path', pathId)
            .eq('password', hashedPassword)
            .eq('id', id);

        if (deleteError) {
            console.log('delete error:', deleteError);
        }
    }
}

export async function editComments(
    pathId: string,
    content: string,
    password: string,
    id: string
): Promise<void> {
    const hashedPassword = hashPassword(password);

    const { data: comments, error: passwordParsingError } = await supabase
        .from('comments')
        .select('id, password')
        .eq('path', pathId);

    if (passwordParsingError) {
        console.log('parsing error:', passwordParsingError);
        return;
    }

    const commentToUpdate = comments.find((comment) => comment.id === id);
    if (!commentToUpdate) {
        console.log('Comment not found.');
        return;
    }

    if (commentToUpdate.password !== hashedPassword) {
        alert('암호가 일치하지 않습니다.');
        return;
    }

    const { error: updateError } = await supabase
        .from('comments')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (updateError) {
        console.log('update error:', updateError);
    }
}
