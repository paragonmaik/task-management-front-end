import { useState, useEffect } from 'react';
import axios from 'axios';
import { IAxios } from '../../typescript/types';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const useAxios = (axiosParams: IAxios, dependency: any[]) => {
	const [response, setResponse] = useState<null | []>(null);
	const [error, setError] = useState<string | unknown>('');
	const [loading, setLoading] = useState(true);

	const fetchData = async (params: IAxios) => {
		try {
			const result = await axios.request(params);
			setResponse(result.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(axiosParams);
	}, [...dependency]);

	return { response, error, loading };
};
