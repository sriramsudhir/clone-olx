
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UsersClient from "./UsersClient";
import type { User } from "@/lib/types";

async function getUsers(): Promise<User[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }
    return res.json();
}

export default async function AdminUsersPage() {
    const users = await getUsers();

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
