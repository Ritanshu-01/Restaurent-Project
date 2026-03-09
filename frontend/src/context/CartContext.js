import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'restaurant_cart';
const ORDERS_STORAGE_KEY = 'restaurant_orders';
const FAVORITES_STORAGE_KEY = 'restaurant_favorites';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
      const storedOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      const storedFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
      setItems(storedCart);
      setOrders(storedOrders);
      setFavorites(storedFavorites);
    } catch {
      setItems([]);
      setOrders([]);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const deliveryFee = subtotal > 0 ? 30 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast('Item added to cart');
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const addOrderToHistory = (serverOrder) => {
    if (!serverOrder) return;
    const mapped = {
      id: serverOrder._id,
      items: serverOrder.items || [],
      subtotal: serverOrder.items?.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0,
      deliveryFee: 30,
      tax: serverOrder.items ? serverOrder.items.reduce((s, i) => s + i.price * i.quantity, 0) * 0.05 : 0,
      total: serverOrder.totalAmount ?? 0,
      paymentMethod: serverOrder.paymentMethod,
      deliveryAddress: serverOrder.deliveryAddress,
      coupon: serverOrder.coupon,
      orderStatus: serverOrder.orderStatus || 'Preparing',
      estimatedDelivery: serverOrder.estimatedDelivery || '30-40 min',
      createdAt: serverOrder.createdAt || new Date().toISOString()
    };
    setOrders((prev) => [mapped, ...prev]);
  };

  const reorder = (orderOrId) => {
    const order = typeof orderOrId === 'object' ? orderOrId : orders.find((o) => o.id === orderOrId);
    if (!order || !order.items?.length) return;
    setItems(order.items.map((i, idx) => ({ ...i, id: i.id || i._id || `${i.name}-${idx}` })));
    showToast('Items added back to cart');
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const value = {
    items,
    loading,
    subtotal,
    deliveryFee,
    tax,
    total,
    orders,
    favorites,
    toast,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    addOrderToHistory,
    reorder,
    toggleFavorite,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}

