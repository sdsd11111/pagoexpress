
import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/admin-utils';

export async function POST() {
    await deleteSession();
    return NextResponse.json({ success: true });
}
