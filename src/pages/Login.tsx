import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { axiosRequest } from '../utils/axiosRequest';
import { AxiosError } from 'axios';
import { useLocalStorage } from '../components/hooks/useLocalStorage';
import BaseAuthForm from '../components/ui/BaseAuthForm';
import DemoForm from '../components/ui/DemoForm';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [_token, setToken] = useLocalStorage('token', '');
  const navigate = useNavigate();
  const navigateHome = '/home';
  const navigateRegister = '/register';

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
    onSuccess: (response) => {
      setIsLoading(false);
      setToken(response.data.token);
      navigate(navigateHome);
    },
    onError: (error: AxiosError) => {
      const data: any = error?.response?.data;
      setIsLoading(false);
      setErrorMessage(data.message);
    },
  });

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password1 } = e.target as typeof e.currentTarget;

    if (password1.value.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    mutate({
      method: 'post',
      url: '/login',
      data: {
        email: email.value,
        password: password1.value,
      },
    });

    setIsLoading(true);
  }

  function handleDemoLogin() {
    mutate({
      method: 'post',
      url: '/login',
      data: {
        email: import.meta.env.VITE_DEMO_USER,
        password: import.meta.env.VITE_DEMO_PASSWORD,
      },
    });

    setIsLoading(true);
  }

  return (
    <BaseAuthForm
      navigateUrl={navigateRegister}
      isLoading={isLoading}
      formType="LOGIN"
      errorMessage={errorMessage}
      handleSubmit={handleLogin}
    >
      <DemoForm handleDemoLogin={handleDemoLogin} />
    </BaseAuthForm>
  );
}
