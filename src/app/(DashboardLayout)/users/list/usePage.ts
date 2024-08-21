import { apiAuth, apiUser } from '@/api';
import { UserDto } from '@/common/dto';
import React from 'react';
import { UserAddPath, UserEditPath } from '@/common/constants/routes';
import { useRouter } from 'next/navigation';

export default function usePage() {
  const router = useRouter();
  const [userList, setUserList] = React.useState<UserDto[]>([]);

  const [pageSize, setPageSize] = React.useState<number>(10);
  const [pageIndex, setPageIndex] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const useQueryUsers = apiUser.useQueryUsers({ pageSize, pageIndex });
  const useDeleteUser = apiUser.useDeleteUser();
  const currentUser = apiAuth.useCurrentUser();

  React.useEffect(() => {
    (async () => {
      if (useQueryUsers.isSuccess && useQueryUsers.data) {
        const updatedUserList = useQueryUsers.data.rows.map(
          (user: UserDto) => ({
            ...user,
            NombreCompleto: `${user.first_name} ${user.last_name}`,
          })
        );
        setUserList(updatedUserList);
      }
    })();
  }, [useQueryUsers.data, useQueryUsers.isSuccess]);

  const onHandleTablePagination = ({
    name,
    value,
  }: {
    name: string;
    value: number;
  }) => {
    if (name === 'pageSize') {
      setPageSize(value);
      setPageIndex(0);
    }
    if (name === 'pageIndex') {
      setPageIndex(value);
    }
  };

  const handleCreate = () => {
    router.push(UserAddPath);
  };

  const handleEdit = (id: number) => {
    router.push(UserEditPath + '?id=' + id);
  };

  const onHandleDelete = async (id: number | undefined) => {
    if (id) {
      setIsLoading(true);
      await useDeleteUser.mutateAsync(id);
      await useQueryUsers.refetch();
      setIsLoading(false);
    }
  };

  return {
    userList,
    isPendingUsers: useQueryUsers.isPending,
    isLoadingUsers: useQueryUsers.isFetching || useQueryUsers.isLoading,
    isLoading,
    total: useQueryUsers?.data?.count ?? 0,
    pageSize,
    pageIndex,
    onHandleTablePagination,
    handleCreate,
    handleEdit,
    onHandleDelete,
  };
}
