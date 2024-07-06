'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
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
import { roles, User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MyTableComponent from './columns';
interface ProductsClientProps {
  data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<User[]>(data);
  const [filterText, setFilterText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Set your page size
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
  }, [filterText, selectedRole]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
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
              <SelectItem
                value={item}
                key={index}
                onChange={() => handleSelectRole(item)}
              >
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <MyTableComponent
        data={paginatedData}
        setFilteredData={setFilteredData}
      />
      <div className="flex items-center justify-center gap-6">
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
    </>
  );
};
