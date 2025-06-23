// components/UserTable.tsx
"use client";
import { useEffect, useState } from "react";
import { User } from "@/types";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`/api/user/list?page=${page}&limit=10`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setTotal(data.total);
      }
    };
    fetchUsers();
  }, [page]);

  return (
    <div>
      <h2 className="text-xl mb-2">All Users</h2>
      <table className="min-w-full bg-white dark:bg-gray-900">
        <thead>
          <tr>
            <th className="px-2 py-1">Name</th>
            <th className="px-2 py-1">Email</th>
            <th className="px-2 py-1">Role</th>
            <th className="px-2 py-1">Logins</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="px-2 py-1">{u.name}</td>
              <td className="px-2 py-1">{u.email}</td>
              <td className="px-2 py-1">{u.role}</td>
              <td className="px-2 py-1">{u.loginHistory.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 mt-2">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>Page {page}</span>
        <button
          disabled={page * 10 >= total}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
