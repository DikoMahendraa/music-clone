import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// Fungsi untuk melakukan fetch data
async function fetchData(url, token) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

// Fungsi untuk melakukan fetch data
async function postData(url, data, token) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

// Hook untuk menggunakan query dengan React Query
function useAuthQuery(queryKey, url, token) {
  return useQuery(queryKey, () => fetchData(url, token));
}

// Hook untuk menggunakan mutation dengan React Query
function useAuthMutation(mutateFn) {
  return useMutation(mutateFn);
}

// Component untuk menyediakan client React Query
function AuthQueryClientProvider({children, token}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  queryClient.setDefaultOptions({
    queries: {
      queryFn: async ({queryKey}) => {
        const response = await fetchData(queryKey[0], token);
        return response;
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export {useAuthQuery, useAuthMutation, AuthQueryClientProvider};
