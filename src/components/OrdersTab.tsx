import React, { useState } from 'react';
import { Order, CartItem } from '../types';

interface OrdersTabProps {
  orders: Order[];
  onReorder: (items: CartItem[]) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ orders, onReorder }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'In Crafting':
        return 1;
      case 'Quality Check':
        return 2;
      case 'Shipped':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="font-['Quicksand'] font-bold text-3xl text-[#1c1b1b]">
          Your Craft Orders
        </h1>
        <p className="font-['Source_Sans_3'] text-sm text-[#44483f] mt-1">
          Follow the progress of your hand-stitched artisan bags from workshop to doorway.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#f6f3f2] rounded-xl p-8 text-center border border-[#1c1b1b] space-y-3">
          <span className="material-symbols-outlined text-4xl text-[#9caf88]">
            receipt_long
          </span>
          <p className="font-['Quicksand'] font-bold text-lg text-[#1c1b1b]">
            No orders placed yet
          </p>
          <p className="font-['Source_Sans_3'] text-xs text-[#44483f]">
            Browse our artisan shop to place your first order.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const currentStep = getStatusStep(order.status);
            return (
              <div
                key={order.id}
                className="bg-[#f6f3f2] rounded-xl p-4 md:p-6 sticker-card space-y-4"
              >
                {/* Order Header */}
                <div className="flex flex-wrap justify-between items-start gap-2 pb-3 border-b border-dashed border-[#c5c8bc]">
                  <div>
                    <span className="text-xs font-['Source_Sans_3'] text-[#44483f]">
                      Order #{order.id} • {order.date}
                    </span>
                    <h3 className="font-['Quicksand'] font-bold text-lg text-[#1c1b1b]">
                      Total: ${order.totalAmount}
                    </h3>
                  </div>

                  <span
                    className={`inline-block font-['Source_Sans_3'] font-bold text-xs px-3 py-1 rounded-full border border-[#1c1b1b] ${
                      order.status === 'Delivered'
                        ? 'bg-[#d5e9bf] text-[#111f05]'
                        : 'bg-[#f1e1b8] text-[#473d1f]'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Crafting Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-['Source_Sans_3'] font-bold text-[#44483f]">
                    <span className={currentStep >= 1 ? 'text-[#526442]' : ''}>
                      1. In Crafting
                    </span>
                    <span className={currentStep >= 2 ? 'text-[#526442]' : ''}>
                      2. Quality Check
                    </span>
                    <span className={currentStep >= 3 ? 'text-[#526442]' : ''}>
                      3. Shipped
                    </span>
                    <span className={currentStep >= 4 ? 'text-[#526442]' : ''}>
                      4. Delivered
                    </span>
                  </div>

                  <div className="w-full bg-[#e5e2e1] h-2.5 rounded-full border border-[#1c1b1b] overflow-hidden">
                    <div
                      className="bg-[#526442] h-full transition-all duration-500"
                      style={{ width: `${(currentStep / 4) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-[#1c1b1b]"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-md border border-[#1c1b1b]"
                      />
                      <div className="flex-1 text-xs">
                        <div className="font-['Quicksand'] font-bold text-[#1c1b1b]">
                          {item.product.name}
                        </div>
                        <div className="text-[#44483f]">
                          Artisan: {item.product.artisan} • Qty: {item.quantity}
                        </div>
                        {item.customMonogram && (
                          <span className="text-[10px] font-bold text-[#695e3d]">
                            Tag: "{item.customMonogram}"
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-xs">
                        ${item.product.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-dashed border-[#c5c8bc]">
                  <div className="text-xs text-[#44483f]">
                    <span className="font-bold">Tracking: </span>
                    <span>{order.trackingNumber}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="bg-white border border-[#1c1b1b] text-xs font-bold px-3 py-1.5 rounded-sm hover:bg-[#eae7e7] cursor-pointer"
                    >
                      View Receipt
                    </button>
                    <button
                      type="button"
                      onClick={() => onReorder(order.items)}
                      className="bg-[#526442] text-white text-xs font-bold px-3 py-1.5 rounded-sm hover:bg-[#3b4c2c] cursor-pointer"
                    >
                      Reorder Bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Receipt Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1b1b]/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-[#1c1b1b] rounded-2xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-1.5 bg-[#f0eded] border border-[#1c1b1b] rounded-full"
            >
              <span className="material-symbols-outlined text-sm block">close</span>
            </button>

            <div className="text-center space-y-1">
              <h3 className="font-['Quicksand'] font-bold text-xl text-[#1c1b1b]">
                Handmade Haven Receipt
              </h3>
              <p className="text-xs text-[#44483f]">Order #{selectedOrder.id}</p>
            </div>

            <div className="bg-[#f6f3f2] p-3 rounded-xl border border-[#1c1b1b] text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#44483f]">Date:</span>
                <span className="font-bold">{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44483f]">Shipping Address:</span>
                <span className="font-bold text-right max-w-[200px]">{selectedOrder.shippingAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44483f]">Estimated Delivery:</span>
                <span className="font-bold text-[#526442]">{selectedOrder.estimatedDelivery}</span>
              </div>
            </div>

            <div className="space-y-2">
              {selectedOrder.items.map((i) => (
                <div key={i.id} className="flex justify-between text-xs border-b border-dashed border-[#c5c8bc] pb-1">
                  <span>{i.product.name} (x{i.quantity})</span>
                  <span className="font-bold">${i.product.price * i.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-sm pt-2">
                <span>Total Paid</span>
                <span>${selectedOrder.totalAmount}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-[#1c1b1b] text-white py-2 rounded-sm text-xs font-bold cursor-pointer hover:bg-[#44483f]"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
