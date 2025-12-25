"use client";
import { useEffect, useState } from "react";
import { Card } from "@/app/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Sparkles } from "lucide-react";
import { User } from "@/app/types/model";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">Users</h1>
      </div>
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar>
                    <img
                      src={user.avatar_url || "https://i.pravatar.cc/150"}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
