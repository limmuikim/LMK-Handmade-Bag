import { Product, Artisan, Order, UserProfile } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-willow-crossbody',
    name: 'The Willow Crossbody',
    artisan: 'Elena R.',
    artisanTagBg: 'bg-[#f1e1b8] text-[#473d1f]', // tertiary-fixed
    category: 'Crossbody',
    price: 145,
    description: 'Hand-woven organic cotton with vegetable-tanned leather accents and hand-forged brass buckle detailing. Designed for light daily journeys.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATQHNEx6BoLAnbt0qhs36lEmepxOjtFCe4U6Pg_YUqZ7D_Bg4QJu1txRmKQxGLiwOSBLO7zX1vGXztCViGkuM0cqFf-6gCSvQv6wji1qXGLDFGaDlG5rkqYivYG7kNaHAj1SKdN9aIZa2qvb-RPYGSQsp2IALk-yojGDmqYXFDLIBulww_7Vx2ZiEYz9d43426XqF6r6qyQO3fh2bnvp6lVluwDN45PSL3qtrwqR9HU6TYmFoEGkE',
    rating: 4.9,
    reviewsCount: 38,
    materials: ['Organic Cotton', 'Vegetable-Tanned Leather', 'Solid Brass'],
    dimensions: '9" W x 7.5" H x 3" D',
    inStock: true,
    featured: true,
    bentoSize: 'large',
    badge: 'Artisan: Elena R.'
  },
  {
    id: 'prod-canvas-tote',
    name: 'Canvas Everyday Tote',
    artisan: 'Marcus T.',
    artisanTagBg: 'bg-[#ffdad9] text-[#2f1314]', // secondary-fixed
    category: 'Totes',
    price: 85,
    description: 'Heavyweight 18oz dusty rose cotton canvas tote with reinforced double-stitch handles, interior key loop, and magnetic tab closure.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHPDWWruFPYrfXyl4Fkeg6f2ieyTmkClCwiPUG0e1WhUgNDTy3ZQzZ6IK-FRvLAMGyovypd-1YGt46FGEGydIpevsSH35j-IeFq_HlDs_A7_2XJyUbGmEC7Inl0aGxYRg5m7_LeUUMrI9wmpelDw1zYvxi1B0ioajbN-tGlm3eOc5HIFKI3Kq7eRIJo-IPqNPMR0Y6qUPFEN8PTJ8lIL3veP4vVmfSrOqlEiZmwg-tJyScvlS7t14',
    rating: 4.8,
    reviewsCount: 52,
    materials: ['18oz Duck Canvas', 'Recycled YKK Zipper', 'Copper Rivets'],
    dimensions: '14" W x 15" H x 5" D',
    inStock: true,
    featured: true,
    bentoSize: 'small',
    badge: 'Artisan: Marcus T.'
  },
  {
    id: 'prod-sage-shopper',
    name: 'Sage Artisan Pocket Tote',
    artisan: 'Handmade Haven Studio',
    artisanTagBg: 'bg-[#d5e9bf] text-[#111f05]', // primary-fixed
    category: 'Totes',
    price: 120,
    description: 'Iconic sage green canvas tote with dual outer slip pockets and hand-burnished tan leather shoulder straps.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1gDJG7D9lJSbE7NWuk_I0XrtlVu6khIyNxxZJf_4KpViQQemgynyfPKRE7OV914m_Zn31r9spU0erwHpD9Qb072YqSkvEYp4QSNgnSweQyoj-H4gEeK7YHv0u8pQXRTi41bEaJpiGxMWSONsWeFj283Rpvx81mNDF-LL8Je-7FOaMbjpyEecQKd4cYWfRfOwa6x6dRnj-92TVZeu99HmoceK4kWlrCun7NshETWNG4CniaOxUTv0',
    rating: 5.0,
    reviewsCount: 64,
    materials: ['Sage Cotton Canvas', 'Saddle Leather', 'Linen Lining'],
    dimensions: '13" W x 14" H x 4.5" D',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-folded-clutch',
    name: 'Terracotta Foldover Clutch',
    artisan: 'Sofia K.',
    artisanTagBg: 'bg-[#ffdad9] text-[#2f1314]',
    category: 'Clutches',
    price: 95,
    description: 'Minimalist hand-stitched envelope clutch in warm terracotta canvas with hidden magnetic snap and wristlet drop.',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 21,
    materials: ['Terracotta Linen-Canvas', 'Hand-Stitched Thread'],
    dimensions: '10.5" W x 6" H folded',
    inStock: true
  },
  {
    id: 'prod-explorer-backpack',
    name: 'The Trailside Rucksack',
    artisan: 'Marcus T.',
    artisanTagBg: 'bg-[#d5e9bf] text-[#111f05]',
    category: 'Backpacks',
    price: 185,
    description: 'Waxed canvas modular backpack with padded 15" laptop sleeve, brass hardware, and roll-top weather seal.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 44,
    materials: ['14oz Waxed Canvas', 'Bridle Leather', 'Brass Hardware'],
    dimensions: '12" W x 18" H x 6" D',
    inStock: true
  },
  {
    id: 'prod-woven-bucket',
    name: 'Botanical Woven Bucket Bag',
    artisan: 'Elena R.',
    artisanTagBg: 'bg-[#f1e1b8] text-[#473d1f]',
    category: 'Crossbody',
    price: 135,
    description: 'Naturally dyed jute and linen bucket bag with cinch cord closure and adjustable shoulder strap.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 19,
    materials: ['Natural Jute', 'Botanical Dyes', 'Raw Leather'],
    dimensions: '8" W x 10" H x 8" D',
    inStock: true
  }
];

export const ARTISANS: Artisan[] = [
  {
    id: 'artisan-elena',
    name: 'Elena R.',
    tagline: 'Master Weaver & Textile Designer',
    bio: 'Based in Portland, OR, Elena harnesses traditional loom weaving and organic plant-based dyes to create tactile bags with timeless stories.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    location: 'Portland, Oregon',
    yearsOfCraft: 12,
    specialties: ['Organic Weaving', 'Botanical Dyes', 'Crossbody Ergonomics'],
    featuredProductIds: ['prod-willow-crossbody', 'prod-woven-bucket']
  },
  {
    id: 'artisan-marcus',
    name: 'Marcus T.',
    tagline: 'Canvas Worker & Leather Craftsman',
    bio: 'Marcus crafts heavy-duty utility bags inspired by vintage maritime equipment and heritage workwear. Every rivet is hand-hammered.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    location: 'Asheville, North Carolina',
    yearsOfCraft: 9,
    specialties: ['Waxed Canvas', 'Copper Riveting', 'Modular Rucksacks'],
    featuredProductIds: ['prod-canvas-tote', 'prod-explorer-backpack']
  },
  {
    id: 'artisan-sofia',
    name: 'Sofia K.',
    tagline: 'Minimalist Leather & Envelope Specialist',
    bio: 'Focusing on zero-waste patterns and clean lines, Sofia creates clutches and small accessories designed for effortless everyday use.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    location: 'Austin, Texas',
    yearsOfCraft: 7,
    specialties: ['Zero-Waste Patterning', 'Hand-Stitched Envelopes'],
    featuredProductIds: ['prod-folded-clutch']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'HH-88402',
    date: 'Aug 2, 2026',
    items: [
      {
        id: 'ci-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Sage Green',
        customMonogram: 'E.R.'
      }
    ],
    totalAmount: 145,
    status: 'In Crafting',
    trackingNumber: 'TRK-9921405-US',
    shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
    estimatedDelivery: 'Aug 10, 2026'
  },
  {
    id: 'HH-87119',
    date: 'Jul 18, 2026',
    items: [
      {
        id: 'ci-2',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedColor: 'Dusty Rose'
      }
    ],
    totalAmount: 85,
    status: 'Delivered',
    trackingNumber: 'TRK-8812391-US',
    shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
    estimatedDelivery: 'Jul 22, 2026'
  }
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Maya Lin',
  email: 'maya.lin@handmadehaven.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  memberSince: 'March 2025',
  wishlistIds: ['prod-sage-shopper', 'prod-explorer-backpack'],
  favoriteArtisanNames: ['Elena R.', 'Marcus T.']
};
