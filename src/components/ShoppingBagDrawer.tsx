import React, { useState } from 'react';
import { CartItem, Order } from '../types';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckoutSuccess: (newOrder: Order) => void;
}

export const ShoppingBagDrawer: React.FC<ShoppingBagDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmation'>('bag');
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // e.g., 0.1 for 10%
  const [promoError, setPromoError] = useState<string>('');
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Form State
  const [fullName, setFullName] = useState('Maya Lin');
  const [address, setAddress] = useState('742 Evergreen Terrace, Springfield, OR 97477');
  const [email, setEmail] = useState('maya.lin@handmadehaven.com');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const shippingFee = subtotal >= 100 || cartItems.length === 0 ? 0 : 12;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'SLOWFASHION' || promoCode.trim().toUpperCase() === 'ARTISAN10') {
      setAppliedDiscount(0.1);
    } else {
      setPromoError('Invalid sticker code. Try "SLOWFASHION" for 10% off!');
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: `HH-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...cartItems],
      totalAmount: grandTotal,
      status: 'In Crafting',
      trackingNumber: `TRK-${Math.floor(1000000 + Math.random() * 9000000)}-US`,
      shippingAddress: address,
      estimatedDelivery: '5-7 business days',
    };

    setLastCreatedOrder(newOrder);
    onCheckoutSuccess(newOrder);
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#1c1b1b]/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#fcf9f8] border-l-2 border-[#1c1b1b] w-full max-w-md h-full flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-4 md:p-5 border-b-[1.5px] border-[#1c1b1b] flex items-center justify-between bg-[#f0eded]">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-2xl text-[#526442]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              shopping_bag
            </span>
            <h2 className="font-['Quicksand'] font-bold text-xl text-[#1c1b1b]">
              {step === 'bag' && 'Your Shopping Bag'}
              {step === 'checkout' && 'Checkout & Address'}
              {step === 'confirmation' && 'Order Confirmed!'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-[#eae7e7] border border-[#1c1b1b] rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg block">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {step === 'bag' && (
            <>
              {cartItems.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <span className="material-symbols-outlined text-5xl text-[#9caf88]">
                    shopping_basket
                  </span>
                  <p className="font-['Quicksand'] font-bold text-lg text-[#1c1b1b]">
                    Your bag is empty
                  </p>
                  <p className="font-['Source_Sans_3'] text-sm text-[#44483f]">
                    Explore our artisan hand-stitched collection to add items.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#f6f3f2] p-3 rounded-xl hand-drawn-border flex gap-3 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover border border-[#1c1b1b] bg-white flex-shrink-0"
                      />
                      <div className="flex-1 text-xs space-y-1">
                        <div className="font-['Quicksand'] font-bold text-sm text-[#1c1b1b] line-clamp-1">
                          {item.product.name}
                        </div>
                        <div className="text-[#44483f]">
                          Artisan: {item.product.artisan}
                        </div>
                        {item.customMonogram && (
                          <span className="inline-block bg-[#f1e1b8] text-[#473d1f] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1c1b1b]">
                            Monogram: "{item.customMonogram}"
                          </span>
                        )}
                        <div className="font-['Source_Sans_3'] font-bold text-sm text-[#1c1b1b]">
                          ${item.product.price}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#ba1a1a] hover:underline text-xs cursor-pointer"
                        >
                          Remove
                        </button>

                        <div className="flex items-center border border-[#1c1b1b] rounded-sm bg-white text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 py-0.5 font-bold hover:bg-[#f0eded] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-0.5 font-bold hover:bg-[#f0eded] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Sticker Code / Promo */}
                  <div className="bg-[#f1e1b8] p-3 rounded-xl border border-[#1c1b1b] space-y-2">
                    <label className="block font-['Source_Sans_3'] font-bold text-xs text-[#221b02]">
                      Artisan Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try SLOWFASHION"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 bg-white border border-[#1c1b1b] rounded-sm px-2.5 py-1 text-xs uppercase"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-[#1c1b1b] text-white px-3 py-1 rounded-sm text-xs font-bold cursor-pointer hover:bg-[#44483f]"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-[#ba1a1a] font-medium">{promoError}</p>
                    )}
                    {appliedDiscount > 0 && (
                      <p className="text-[11px] text-[#324224] font-bold">
                        ✓ 10% Slow Fashion discount applied!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <div className="space-y-4">
              <div className="bg-[#f6f3f2] p-4 rounded-xl border border-[#1c1b1b] space-y-3">
                <h3 className="font-['Quicksand'] font-bold text-base text-[#1c1b1b]">
                  Delivery Information
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-[#1c1b1b] rounded-sm px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#1c1b1b] rounded-sm px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Shipping Address</label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-[#1c1b1b] rounded-sm px-2.5 py-1.5"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#f6f3f2] p-4 rounded-xl border border-[#1c1b1b] space-y-2">
                <h3 className="font-['Quicksand'] font-bold text-base text-[#1c1b1b]">
                  Payment Method
                </h3>
                <div className="p-2.5 bg-white border border-[#1c1b1b] rounded-sm flex items-center gap-2 text-xs font-bold">
                  <span className="material-symbols-outlined text-[#526442]">credit_card</span>
                  <span>Handmade Haven Easy Checkout (Simulated)</span>
                </div>
              </div>
            </div>
          )}

          {step === 'confirmation' && lastCreatedOrder && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#d5e9bf] rounded-full border-2 border-[#1c1b1b] flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl text-[#111f05]">check</span>
              </div>
              <h3 className="font-['Quicksand'] font-bold text-2xl text-[#1c1b1b]">
                Crafting Has Begun!
              </h3>
              <p className="font-['Source_Sans_3'] text-sm text-[#44483f]">
                Your order <span className="font-bold text-[#1c1b1b]">{lastCreatedOrder.id}</span> has been assigned to our artisan workshops.
              </p>

              <div className="bg-[#f6f3f2] p-4 rounded-xl border border-[#1c1b1b] text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-dashed border-[#c5c8bc] pb-1">
                  <span className="text-[#44483f]">Tracking No:</span>
                  <span className="font-bold">{lastCreatedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-[#c5c8bc] pb-1">
                  <span className="text-[#44483f]">Status:</span>
                  <span className="font-bold text-[#526442]">{lastCreatedOrder.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#44483f]">Est. Delivery:</span>
                  <span className="font-bold">{lastCreatedOrder.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Action */}
        <div className="p-4 border-t-[1.5px] border-[#1c1b1b] bg-[#f0eded] space-y-3">
          {step !== 'confirmation' && (
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#44483f]">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#324224] font-bold">
                  <span>10% Discount</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#44483f]">
                <span>Artisan Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
              </div>
              <div className="flex justify-between font-['Quicksand'] font-bold text-base text-[#1c1b1b] pt-2 border-t border-[#1c1b1b]">
                <span>Total</span>
                <span>${grandTotal}</span>
              </div>
            </div>
          )}

          {step === 'bag' && (
            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={() => setStep('checkout')}
              className="w-full bg-[#526442] text-white font-['Source_Sans_3'] font-bold text-sm py-3 rounded-sm sticker-effect cursor-pointer hover:bg-[#3b4c2c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Checkout (${grandTotal})
            </button>
          )}

          {step === 'checkout' && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep('bag')}
                className="w-1/3 bg-white border border-[#1c1b1b] font-bold text-xs py-2.5 rounded-sm hover:bg-[#eae7e7] cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-2/3 bg-[#526442] text-white font-['Source_Sans_3'] font-bold text-sm py-2.5 rounded-sm sticker-effect cursor-pointer hover:bg-[#3b4c2c]"
              >
                Place Artisan Order
              </button>
            </div>
          )}

          {step === 'confirmation' && (
            <button
              type="button"
              onClick={() => {
                setStep('bag');
                onClose();
              }}
              className="w-full bg-[#526442] text-white font-['Source_Sans_3'] font-bold text-sm py-3 rounded-sm sticker-effect cursor-pointer"
            >
              Done & View Orders
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
