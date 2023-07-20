import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ShopModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useShopModal = create<ShopModalState>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }))
);

export default useShopModal;
