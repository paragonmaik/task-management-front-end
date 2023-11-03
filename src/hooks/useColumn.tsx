import { useQuery } from '@tanstack/react-query';
import { axiosRequest } from '../utils/axiosRequest';
import { useLocalStorage } from './useLocalStorage';
import { Column } from '../types';

export default function useColumn(boardId: string | undefined) {
  const [token, _setToken] = useLocalStorage('token', '');

  return useQuery({
    queryKey: [`columns-${boardId}`],
    retry: 0,
    queryFn: async (): Promise<Column[]> => {
      const res = await axiosRequest({
        method: 'get',
        url: `/column/${boardId}`,
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    },
  });
}
