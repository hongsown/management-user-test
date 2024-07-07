'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
// import FileUpload from "@/components/FileUpload";
import { User } from '@/constants/data';
import { useUserStore } from '@/lib/store';
import Image from 'next/image';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

interface IFormSchema {
  firstName: string;
  lastName: string;
  imgUrl: string;
  phoneNumber: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

const formSchema: z.ZodSchema<IFormSchema> = z
  .object({
    firstName: z
      .string()
      .min(3, { message: 'First Name must be at least 3 characters' }),
    lastName: z
      .string()
      .min(3, { message: 'Last Name must be at least 3 characters' }),
    imgUrl: z.string().min(1, { message: 'At least one image must be added.' }),
    phoneNumber: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 characters' })
      .regex(/^\d+$/, { message: 'Phone number must contain only numbers' }),
    email: z.string().email(),
    role: z.string().min(1, { message: 'Please select a role' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  roles: any;
}

export const UserForm: React.FC<UserFormProps> = ({ roles }) => {
  const router = useRouter();
  const { toast } = useToast();
  const addUser = useUserStore((state) => state.addUser);
  const selectedUser = useUserStore((state) => state.getSelectedUser);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const action = useUserStore((state) => state.action);
  const [loading, setLoading] = useState(false);
  const title = selectedUser() ? 'Edit User' : 'Create User';
  const description = selectedUser() ? 'Edit a User.' : 'Add a new User';

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const defaultValues: any = selectedUser()
    ? selectedUser()
    : {
        firstName: '',
        lastName: '',
        imgUrl: '',
        phoneNumber: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
      };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      if (action === 'edit') {
        const updatedUser = {
          ...data,
          id: selectedUser()?.id,
          username: selectedUser()?.username
        };
        setSelectedUser(null);
        updateUser(updatedUser as unknown as User);
        toast({
          title: 'Successfully .',
          variant: 'default',
          description: 'User updated successfully.'
        });
      } else {
        const newUser = {
          ...data,
          username: 'default',
          id: Math.floor(Math.random() * 1000)
        };
        addUser(newUser as unknown as User);
        toast({
          title: 'Successfully .',
          variant: 'default',
          description: 'User created successfully.'
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
    }
  };

  useEffect(() => {
    if (selectedUser()) {
      form.reset({
        firstName: selectedUser()?.firstName,
        lastName: selectedUser()?.lastName,
        imgUrl: selectedUser()?.image,
        phoneNumber: selectedUser()?.phoneNumber,
        email: selectedUser()?.email,
        role: selectedUser()?.role,
        password: '123456',
        confirmPassword: '123456'
      });
    }
  }, [selectedUser, form]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col justify-evenly space-y-8"
        >
          <div className="flex flex-col justify-evenly gap-y-5 md:flex-row">
            <div className="gap-8 md:grid md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="First name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={loading}
                        {...field}
                        placeholder="Phone number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={loading}
                        {...field}
                        placeholder="Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a role"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {roles.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PassWord</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={loading}
                        {...field}
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={loading}
                        {...field}
                        placeholder="Confirm Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>

                  <FormControl>
                    <div>
                      <input
                        type="file"
                        className="hidden"
                        id="fileInput"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFile(file);
                            const reader = new FileReader();
                            reader.onload = (loadEvent) => {
                              const dataUrl = loadEvent?.target?.result;
                              field.onChange(dataUrl);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <div
                        className="h-[250px] w-[250px]  cursor-pointer border-2 border-dashed"
                        onClick={() =>
                          document.getElementById('fileInput')?.click()
                        }
                      >
                        {selectedUser() ? (
                          <Image
                            src={field.value || '/upload-img.svg'}
                            width={200}
                            height={200}
                            className="h-full w-full"
                            alt="avatar"
                          />
                        ) : selectedFile ? (
                          <Image
                            src={field.value || '/upload-img.svg'}
                            width={200}
                            height={200}
                            className="h-full w-full"
                            alt="avatar"
                          />
                        ) : (
                          <Image
                            src="/upload-img.svg"
                            alt="upload image"
                            width={120}
                            height={120}
                            className="mx-auto mt-12"
                          />
                        )}
                      </div>
                      {selectedFile && (
                        <p className="md:text-center">{selectedFile.name}</p>
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="ml-[8%] flex items-center gap-3">
            <Button
              className="h-10 w-20 border bg-transparent text-black hover:bg-transparent dark:bg-black dark:text-white"
              type="button"
              onClick={() => {
                router.push('/dashboard/user');
                setSelectedUser(null);
              }}
            >
              Back
            </Button>
            <Button className="h-10 w-20" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
