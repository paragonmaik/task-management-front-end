import { useQuery } from '@tanstack/react-query';
import { axiosRequest } from '../../utils/axiosRequest';
import { useLocalStorage } from './useLocalStorage';
import { board } from '../../typescript/types';

export default function useBoard() {
  const [token, _setToken] = useLocalStorage('token', '');

  return useQuery({
    queryKey: ['boards'],
    retry: 0,
    queryFn: async (): Promise<board[]> => {
      const res = await axiosRequest({
        method: 'get',
        url: '/board',
        headers: {
          Authorization: token,
        },
      });

      return res.data;
    },
  });
}
