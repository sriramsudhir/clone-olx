
import { NextResponse, type NextRequest } from 'next/server';
import { users } from '@/lib/data';
import type { User } from '@/lib/types';

// In-memory data store for demonstration
let usersData: User[] = [...users];

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search');
  let filteredUsers = usersData;

  if (search) {
    filteredUsers = usersData.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json(filteredUsers);
}

export async function POST(request: Request) {
    try {
        const { id, action } = await request.json();
        if (!id || !action) {
            return NextResponse.json({ message: 'User ID and action are required' }, { status: 400 });
        }

        const userIndex = usersData.findIndex(u => u.id === id);
        if (userIndex === -1) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (action === 'suspend') {
            usersData[userIndex].status = 'suspended';
        } else if (action === 'activate') {
            usersData[userIndex].status = 'active';
        } else {
             return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }
        
        return NextResponse.json(usersData[userIndex], { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
    }
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
    
    // Also remove from original mock data if you want persistence across server restarts in dev
    // This is a simplified approach. In a real app, you'd be talking to a database.
    const indexInOriginal = users.findIndex(u => u.id === id);
    if (indexInOriginal > -1) {
        users.splice(indexInOriginal, 1);
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
  }
}
