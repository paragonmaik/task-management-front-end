import { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import axios from 'axios';
import { IAxios } from '../../typescript/types';

axios.defaults.baseURL = 'http://localhost:3000';

export const useAxios = (axiosParams: IAxios) => {
	const { createdBoards } = useContext(TaskContext);
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
	}, [createdBoards]);

	return { response, error, loading };
};
