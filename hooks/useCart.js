import {useContext} from 'react'
import { CartContext } from '@/contexts/CartContext';

export default function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('Auth context must be use inside AuthProvider');
    return context;
}