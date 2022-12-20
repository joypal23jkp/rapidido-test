import { useContext } from 'react';

import { DrawerContext } from '../contexts/DrawerContext';

const useDrawer = () => {
    const context = useContext(DrawerContext);

    if (!context) throw new Error('Drawer context must be use inside AuthProvider');

    return context;
};

export default useDrawer;
