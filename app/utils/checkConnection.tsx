import {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

let currentNetwork: boolean | null;

NetInfo.fetch().then((state) => {
  currentNetwork = state.isConnected;
});

const checkConnection = () => {
  const [netInfo, setNetInfo] = useState(currentNetwork);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      //console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
      setNetInfo(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return netInfo;
};

export default checkConnection;