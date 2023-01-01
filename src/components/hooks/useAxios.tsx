import { useState, useEffect } from 'react';
import axios from 'axios';

interface IAxios {
	url: string;
	method: 'get' | 'post' | 'patch' | 'put' | 'delete';
	data?: object;
	headers?: object;
}

axios.defaults.baseURL = 'http://localhost:3000';

export const useAxios = (axiosParams: IAxios) => {
	const [response, setResponse] = useState(null);
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
	}, []);

	return { response, error, loading };
};
