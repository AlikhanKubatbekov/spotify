import React from 'react';
import CustomDrawer from '../CustomDrawer/CustomDrawer';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <CustomDrawer>
        {children}
      </CustomDrawer>
    </>
  );
};

export default Layout;