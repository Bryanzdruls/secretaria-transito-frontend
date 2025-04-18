import * as React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { extendTheme,  } from '@mui/material/styles';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { getSessionService, logoutService } from '../services/AuthService';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'Vehicles',
    title: 'Vehicles',
    icon: <DirectionsCarIcon />,    
  },  
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },  
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(): Router {
    const navigate = useNavigate();
    const location = useLocation();
  
    const router = React.useMemo(() => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => navigate(String('/dashboard'+path)),
    }), [location, navigate]);
  
    return router;
  }


export default function DashboardLayoutBasic() {
  const router = useDemoRouter();
  const navigate = useNavigate();
  const [session, setSession] = React.useState<any>({
    user: {
      name: 'Usuario',
      email: getSessionService(),
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {       
      },
      signOut: () => {
        setSession(null);
        logoutService();
        navigate('/auth/login');
      },
    };
  }, []);
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        title: 'Secretaria Movilidad',
        homeUrl: '/vehicles',
      }}
      session={session}
      authentication={authentication}
    >        
      <DashboardLayout>
        <PageContainer title='Dashboard De Vehiculos'>        
          <Outlet/>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
