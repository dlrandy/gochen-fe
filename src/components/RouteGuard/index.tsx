import { useEffect } from 'react';
import { useAuth } from '@Contexts/auth-context';
import { useNavigate, useLocation } from 'react-router';

type GuardProps = {
  children: React.ReactNode;
  from?: string;
};
export default function Index({ children }: GuardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    if (user !== '') navigate('/login', { state: { from: location.pathname } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user !== '' ? children : null;
}
