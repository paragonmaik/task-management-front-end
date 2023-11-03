import { useQuery } from '@tanstack/react-query';
import { axiosRequest } from '../utils/axiosRequest';
import { useLocalStorage } from './useLocalStorage';
import { Task } from '../types';

export default function useTask(columnId: string | undefined) {
  const [token, _setToken] = useLocalStorage('token', '');

  return useQuery({
    queryKey: [`tasks-${columnId}`],
    retry: 0,
    queryFn: async (): Promise<Task[]> => {
      const res = await axiosRequest({
        method: 'get',
        url: `/task/${columnId}`,
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    },
  });
}
