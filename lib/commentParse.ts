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
    commentId: string
): Promise<void> {
    // 비밀번호 해시 함수 호출
    const hashedPassword = hashPassword(password);

    // Supabase를 통해 주어진 pathId에 대한 비밀번호를 조회
    const { data: tableData, error: passwordParsingError } = await supabase
        .from('comments')
        .select('password')
        .eq('path', pathId);

    // 비밀번호 조회 중 에러가 발생한 경우
    if (passwordParsingError) {
        console.error('Password parsing error:', passwordParsingError);
        return;
    }

    // 데이터가 없는 경우나 비밀번호가 일치하지 않는 경우
    if (!tableData || !tableData.length || tableData[0].password !== hashedPassword) {
        alert('암호가 일치하지 않습니다.');
        return;
    }

    // 주어진 pathId, 비밀번호, commentId에 해당하는 댓글 삭제
    const { error: deleteError } = await supabase
        .from('comments')
        .delete()
        .eq('path', pathId)
        .eq('password', hashedPassword)
        .eq('id', commentId);

    // 삭제 중 에러가 발생한 경우
    if (deleteError) {
        console.error('Delete error:', deleteError);
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
