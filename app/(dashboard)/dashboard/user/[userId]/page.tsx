import BreadCrumb from '@/components/breadcrumb';
import { UserForm } from '@/components/forms/product-form';

import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  const breadcrumbItems = [
    { title: 'User', link: '/dashboard/user' },
    { title: 'Create', link: '/dashboard/user/create' }
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <UserForm
          roles={[
            { _id: 'Admin', name: 'Admin' },
            { _id: 'Editor', name: 'Editor' },
            { _id: 'User', name: 'User' }
          ]}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
