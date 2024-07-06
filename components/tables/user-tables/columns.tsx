'use client';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { ArrowDownWideNarrow, ArrowDownZA, ArrowUpAZ } from 'lucide-react';

export const roles = ['Admin', 'User', 'Editor'];

interface IUserTableProps {
  data: User[];
  setFilteredData: (data: User[]) => void;
}
const MyTableComponent = (props: IUserTableProps) => {
  const { data, setFilteredData } = props;

  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const handleSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredData(sortedData);
  };

  const columns: ColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'phoneNumber',
      header: 'PHONE NUMBER'
    },
    {
      accessorKey: 'username',
      header: 'USERNAME'
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => (
        <div
          onClick={() => handleSort('firstName')}
          className="flex cursor-pointer items-center gap-1"
        >
          FIRST NAME{' '}
          {sortConfig?.key === 'firstName' ? (
            sortConfig.direction === 'ascending' ? (
              <ArrowUpAZ size={20} />
            ) : (
              <ArrowDownZA size={20} />
            )
          ) : (
            <ArrowDownZA size={20} />
          )}
        </div>
      )
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => (
        <div
          onClick={() => handleSort('lastName')}
          className="flex cursor-pointer items-center gap-1"
        >
          LAST NAME{' '}
          {sortConfig?.key === 'lastName' ? (
            sortConfig.direction === 'ascending' ? (
              <ArrowUpAZ size={20} />
            ) : (
              <ArrowDownZA size={20} />
            )
          ) : (
            <ArrowDownZA size={20} />
          )}
        </div>
      )
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <div
          onClick={() => handleSort('role')}
          className="flex cursor-pointer items-center gap-1"
        >
          ROLE{' '}
          {sortConfig?.key === 'role' ? (
            sortConfig.direction === 'ascending' ? (
              <ArrowUpAZ size={20} />
            ) : (
              <ArrowDownZA size={20} />
            )
          ) : (
            <ArrowDownZA size={20} />
          )}
        </div>
      )
    },
    {
      id: 'edit',
      cell: ({ row }) => <div className="cursor-pointer">Edit</div>
    },
    {
      id: 'delete',
      cell: ({ row }) => <div className="cursor-pointer underline">Delete</div>
    }
  ];

  return <DataTable columns={columns} data={data} />;
};

export default MyTableComponent;
