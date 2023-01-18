import { IAxios } from '../../typescript/types';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || process.env.API_URL;

export const axiosRequest = async (params: IAxios) => {
	const response = await axios(params);

	return response;
};
