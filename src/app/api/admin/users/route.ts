
import { NextResponse } from 'next/server';
import { users } from '@/lib/data';

// In-memory data store for demonstration
let usersData = [...users];

export async function GET() {
  return NextResponse.json(usersData);
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const initialLength = usersData.length;
    usersData = usersData.filter((user) => user.id !== id);

    if (usersData.length === initialLength) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
  }
}
