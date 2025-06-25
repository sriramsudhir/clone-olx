
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UsersClient from "./UsersClient";
import type { User } from "@/lib/types";

async function getUsers(search?: string): Promise<User[]> {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`);
    if (search) {
      url.searchParams.append('search', search);
    }
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }
    return res.json();
}

export default async function AdminUsersPage({ searchParams }: { searchParams?: { search?: string } }) {
    const search = searchParams?.search;
    const users = await getUsers(search);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage all registered users.</CardDescription>
            </CardHeader>
            <CardContent>
                <UsersClient initialUsers={users} />
            </CardContent>
        </Card>
    );
}
