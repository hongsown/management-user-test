'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { roles, rows, User } from '@/constants/data';
import { useUserStore } from '@/lib/store';
import { ArrowRightFromLine, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import MyTableComponent from './columns';
import { ConfirmDelete } from './confirm-delete';

export const UserClient = () => {
  const router = useRouter();
  const data = useUserStore((state) => state.users);
  const selectedUser = useUserStore((state) => state.getSelectedUser);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);
  const setAction = useUserStore((state) => state.setAction);
  const action = useUserStore((state) => state.action);
  const [filteredData, setFilteredData] = useState<User[]>(data);
  const [filterText, setFilterText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showConfirm, setShowConfirm] = useState(false);

  const totalUsers = filteredData.length;
  const totalPages = Math.ceil(totalUsers / pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Calculate the slice of data to display based on currentPage and pageSize
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
  };

  // Filter data based on the filter text
  useEffect(() => {
    const filteredData = data.filter((item) => {
      const textMatch =
        item.username.toLowerCase().includes(filterText.toLowerCase()) ||
        item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.email.toLowerCase().includes(filterText.toLowerCase()) ||
        item.phoneNumber.includes(filterText);
      const roleMatch = selectedRole === '' || item.role === selectedRole;
      if (selectedRole === 'Role') {
        return textMatch;
      }
      return textMatch && roleMatch;
    });
    setFilteredData(filteredData);
  }, [filterText, selectedRole, data]);

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  };

  const handleSelectRow = (value: string) => {
    setPageSize(parseInt(value));
    setCurrentPage(1);
  };
  useEffect(() => {
    if (action === 'edit' && selectedUser()) {
      router.push(`/dashboard/user/${selectedUser()?.id}`);
    } else if (action === 'delete' && selectedUser()) {
      setShowConfirm(true);
    }
  }, [action]);
  useEffect(() => {
    setAction(null);
  }, [showConfirm]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users (Client side table functionalities.)"
        />
        <div className="flex items-center gap-4">
          <Button
            className="text-xs md:text-sm"
            onClick={() => handleExportExcel()}
          >
            <ArrowRightFromLine className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button
            className="text-xs md:text-sm"
            onClick={() => {
              setSelectedUser(null);
              router.push(`/dashboard/user/new`);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex items-center gap-3">
        <Input
          type="text"
          placeholder="Search Users..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full md:max-w-sm"
        />

        <Select onValueChange={(value) => handleSelectRole(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((item, index) => (
              <SelectItem value={item} key={index}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <MyTableComponent
        data={paginatedData}
        setFilteredData={setFilteredData}
        setAction={setAction}
      />

      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <Select onValueChange={(value) => handleSelectRow(value)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              {rows.map((item, index) => (
                <SelectItem value={item.toString()} key={index}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>Rows per page</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      {showConfirm && <ConfirmDelete setShowConfirm={setShowConfirm} />}
    </>
  );
};
