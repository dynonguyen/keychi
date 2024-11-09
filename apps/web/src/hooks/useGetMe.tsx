import React from 'react';

export const useGetMe = (shouldGetMe?: boolean) => {
  React.useEffect(() => {
    if (!shouldGetMe) return;
    console.log(`☕ DYNO LOG ~ useGetMe.tsx:6 🥺`);
  }, [shouldGetMe]);
};

export default useGetMe;
