import React, {PropsWithChildren, useState} from 'react';
import {NetworkDetails} from '../services/WhoIs';

interface NetworkContextType {
  network: NetworkDetails[] | null;
  image: string | null;
  updateNetworkDetails: (newtork: NetworkDetails[] | null) => void;
  updateImage: (image: string | null) => void;
}

export const NetworkContext = React.createContext<NetworkContextType>({
  network: null,
  image: null,
  updateNetworkDetails: () => {},
  updateImage: () => {},
});

const NetworkProvider: React.FC<PropsWithChildren> = ({
  children,
}): React.JSX.Element => {
  const [networkDetails, setNetworkDetails] = useState<NetworkDetails[] | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const updateNetworkDetails = (details: NetworkDetails[] | null) => {
    setNetworkDetails(details);
  };

  const updateImage = (image: string | null) => {
    setSelectedImage(image);
  };

  return (
    <NetworkContext.Provider
      value={{
        network: networkDetails,
        image: selectedImage,
        updateNetworkDetails,
        updateImage,
      }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
