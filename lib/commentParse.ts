import { supabase } from './supabase/client';
import crypto from 'crypto';
import { Comment, CommentFormType, CommentStatus } from '@/config/types';

function hashPassword(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

function handleError(error: any, message: string): CommentStatus {
    console.error(message, error);
    return {
        status: false,
        message: `${message}: ${error.message}`,
    };
}

async function fetchAdminData() {
    try {
        const response = await fetch('/api/comments');
        if (!response.ok) {
            throw new Error(`Error fetching admin data: ${response.statusText}`);
        }
        const data: { adminId: string; adminPw: string } = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getComments(pathId: string): Promise<Comment[] | CommentStatus> {
    const { data, error } = await supabase
        .from('comments')
        .select('content, created_at, updated_at, name, id, admin')
        .eq('path', pathId);

    if (error) {
        return handleError(error, 'Failed to fetch comments');
    }

    return data as Comment[];
}

async function setAdminComments(form: CommentFormType): Promise<CommentStatus> {
    const hashedPassword = hashPassword(form.password);
    const { error } = await supabase.from('comments').insert({
        name: form.name,
        password: hashedPassword,
        content: form.content,
        path: form.path,
        admin: true,
    });

    if (error) {
        return handleError(error, 'Failed to insert admin comment');
    }

    return {
        status: true,
        message: 'Admin comment inserted successfully',
    };
}

export async function setComments(form: CommentFormType): Promise<CommentStatus> {
    const hashedPassword = hashPassword(form.password);
    const adminData = await fetchAdminData();

    if (adminData) {
        const { adminId, adminPw } = adminData;
        if (hashedPassword === adminPw && form.name === adminId) {
            return setAdminComments(form);
        }
    }

    const { error } = await supabase.from('comments').insert({
        name: form.name,
        password: hashedPassword,
        content: form.content,
        path: form.path,
    });

    if (error) {
        return handleError(error, 'Failed to insert comment');
    }

    return {
        status: true,
        message: 'Comment inserted successfully',
    };
}

export async function removeComments(
    password: string,
    commentId: string
): Promise<CommentStatus> {
    const hashedPassword = hashPassword(password);

    const { data, error } = await supabase
        .from('comments')
        .select('password')
        .eq('id', commentId)
        .single();

    if (error) {
        return handleError(error, 'Failed to fetch comment for deletion');
    }

    if (!data || data.password !== hashedPassword) {
        return {
            status: false,
            message: 'Incorrect password',
        };
    }

    const { error: deleteError } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

    if (deleteError) {
        return handleError(deleteError, 'Failed to delete comment');
    }

    return {
        status: true,
        message: 'Comment deleted successfully',
    };
}

export async function editComments(
    content: string,
    password: string,
    id: string
): Promise<CommentStatus> {
    const hashedPassword = hashPassword(password);

    const { data, error } = await supabase
        .from('comments')
        .select('id, password')
        .eq('id', id)
        .single();

    if (error) {
        return handleError(error, 'Failed to fetch comment for editing');
    }

    if (data.password !== hashedPassword) {
        return {
            status: false,
            message: 'Incorrect password',
        };
    }

    const { error: updateError } = await supabase
        .from('comments')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (updateError) {
        return handleError(updateError, 'Failed to update comment');
    }

    return {
        status: true,
        message: 'Comment updated successfully',
    };
}
