import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { useUserStore } from '@/lib/store';
interface ConfirmDeleteProps {
  setShowConfirm: (value: boolean) => void;
}
export function ConfirmDelete(props: ConfirmDeleteProps) {
  const { setShowConfirm } = props;
  const { toast } = useToast();
  const deleteUSer = useUserStore((state) => state.deleteUser);
  const selectedUser = useUserStore((state) => state.getSelectedUser);
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to delete these records? This process cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowConfirm(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (selectedUser()) {
                deleteUSer(selectedUser()?.id!);
                toast({
                  title: 'User deleted successfully'
                });
                setShowConfirm(false);
              }
            }}
            className="bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
