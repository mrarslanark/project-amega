import React, {PropsWithChildren, useState} from 'react';
import {NetworkDetails} from '../services/WhoIs';

interface NetworkContextType {
  network: NetworkDetails[] | null;
  updateNetworkDetails: (newtork: NetworkDetails[] | null) => void;
}

export const NetworkContext = React.createContext<NetworkContextType>({
  network: null,
  updateNetworkDetails: () => {},
});

const NetworkProvider: React.FC<PropsWithChildren> = ({
  children,
}): React.JSX.Element => {
  const [networkDetails, setNetworkDetails] = useState<NetworkDetails[] | null>(
    null,
  );

  const updateNetworkDetails = (details: NetworkDetails[] | null) => {
    setNetworkDetails(details);
  };

  return (
    <NetworkContext.Provider
      value={{network: networkDetails, updateNetworkDetails}}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
