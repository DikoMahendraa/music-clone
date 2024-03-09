import React, {useCallback, useEffect} from 'react';
import SplashScreen from './modules/SplashScreen';
import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertHolder from './services/DropdownAlertHolder';
import RootNavigation from './navigation/RootNavigation';
import LoadingModal from './components/atoms/LoadingModal';
import DownloadUpdateModal from './components/atoms/DownloadUpdateModal';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = props => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const setDropdownHolder = useCallback((ref: any) => {
    DropdownAlertHolder.setInstance(ref);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
      <LoadingModal />
      <DropdownAlert alert={setDropdownHolder} />
      <DownloadUpdateModal />
    </QueryClientProvider>
  );
};

export default App;
