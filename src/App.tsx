import React, {useCallback, useEffect} from 'react';
import SplashScreen from './modules/SplashScreen';
import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertHolder from './services/DropdownAlertHolder';
import RootNavigation from './navigation/RootNavigation';
import LoadingModal from './components/atoms/LoadingModal';
import DownloadUpdateModal from './components/atoms/DownloadUpdateModal';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import TrackPlayer, {Capability} from 'react-native-track-player';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const initiateTrackPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [Capability.Play, Capability.Pause],
          compactCapabilities: [Capability.Play, Capability.Pause],
        });
      } catch (error) {
        // caught error
      }
    };

    initiateTrackPlayer();
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
