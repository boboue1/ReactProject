import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, createUser } from './users.api';

export const useUsers = () =>
  useQuery({ queryKey: ['users'], queryFn: getUsers });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};