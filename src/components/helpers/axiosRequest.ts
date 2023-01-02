import { IAxios } from '../../typescript/types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const axiosRequest = async (params: IAxios) => {
	const response = await axios(params);

	return response;
};
