import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingBag, Search, Plus, Trash2, Edit, ChevronLeft, ChevronRight, 
  LogIn, LogOut, Check, X, Eye, EyeOff, Sparkles, Filter, 
  RefreshCw, ArrowUpRight, Ruler, Tag, ShieldCheck, Truck, 
  Heart, Share2, UploadCloud, Image as ImageIcon, AlertCircle, 
  Scissors, Compass, Layers, Phone, MessageSquare
} from 'lucide-react';

// Danh mục chuẩn của 117 THRIFT
const CATEGORIES = [
  { id: 'all', name: 'Tất cả Items', group: 'all' },
  { id: 'tees', name: 'Vintage Graphic Tees', group: 'top' },
  { id: 'jackets', name: 'Outerwear & Work Jackets', group: 'top' },
  { id: 'hoodies', name: 'Hoodies & Sweats', group: 'top' },
  { id: 'pants', name: 'Cargo Pants & Workwear', group: 'bottom' },
  { id: 'denim', name: 'Vintage Denim & Jeans', group: 'bottom' },
  { id: 'shorts', name: 'Shorts & Jorts', group: 'bottom' },
  { id: 'accessories', name: 'Hats, Belts & Bags', group: 'acc' },
];

// Dữ liệu mẫu chuẩn 1 of 1 với bộ số đo phân loại chuẩn
const INITIAL_ITEMS = [
  {
    id: 'th-01',
    title: '1998 Harley-Davidson 3D Emblem Vintage Tee',
    category: 'tees',
    type: 'top', // top | bottom | acc
    price: 680000,
    originalPrice: 850000,
    size: 'L (Boxy Fit)',
    condition: '9.5/10',
    color: 'Faded Charcoal Black',
    brand: 'Harley-Davidson (Made in USA)',
    era: '1990s',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ],
    // Bộ đo cho ÁO
    measurements: {
      length: 72,      // Dài áo
      chest: 58,       // Rộng ngực
      shoulder: 52,    // Rộng vai
      sleeve: 22       // Dài tay / Rộng ống tay
    },
    status: 'available',
    description: 'Chất vải single stitch may đơn, cổ áo ôm khít cực đẹp. Hiệu ứng wash tự nhiên bạc màu faded vintage, họa tiết in nứt 3D đặc trưng không bong tróc.',
    defectNote: 'Không lủng rách, không ố vàng, tem vải USA nguyên bản.'
  },
  {
    id: 'th-02',
    title: 'Carhartt Detroit Work Jacket J97 Faded Moss Green',
    category: 'jackets',
    type: 'top',
    price: 1850000,
    originalPrice: 2200000,
    size: 'XL',
    condition: '9.0/10',
    color: 'Faded Moss Green',
    brand: 'Carhartt Workwear',
    era: 'Early 2000s',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80'
    ],
    // Bộ đo cho ÁO KHOÁC
    measurements: {
      length: 68,
      chest: 64,
      shoulder: 54,
      sleeve: 63
    },
    status: 'available',
    description: 'Chiếc Detroit J97 huyền thoại với lớp vải Canvas Duck bền bỉ, lót dạ sọc blanket ấm áp, cổ nhung corduroy màu nâu đất. Dáng cropped đặc trưng streetwear.',
    defectNote: 'Vết bạc màu tự nhiên do thời gian ở tay áo, khóa zip YKK đồng nguyên khối hoạt động trơn tru.'
  },
  {
    id: 'th-03',
    title: 'Vintage Levi\'s 501 Original Fit Selvedge Denim',
    category: 'denim',
    type: 'bottom',
    price: 1150000,
    originalPrice: 1400000,
    size: 'W32 - L32',
    condition: '9.2/10',
    color: 'Indigo Stone Wash',
    brand: 'Levi\'s',
    era: 'Late 1990s',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=800&q=80'
    ],
    // Bộ đo cho QUẦN
    measurements: {
      waist: 82,       // Vòng eo
      pantLength: 104, // Dài quần
      legOpening: 20,  // Rộng ống
      thigh: 30        // Rộng đùi / đáy
    },
    status: 'available',
    description: 'Dòng 501 cúc cài button fly kinh điển. Màu chàm mài tự nhiên (whiskers wash), đường dệt mép chuẩn vintage, ống đứng timeless dễ phối sneaker & boots.',
    defectNote: 'Đáy quần còn dày dặn chắc chắn, gấu quần nguyên bản chưa qua cắt sửa.'
  },
  {
    id: 'th-04',
    title: 'Dickies 874 Original Skate Work Cargo Pants',
    category: 'pants',
    type: 'bottom',
    price: 620000,
    originalPrice: 750000,
    size: 'W34',
    condition: '9.6/10',
    color: 'Khaki Sand',
    brand: 'Dickies Skateboarding',
    era: '2010s',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
    ],
    // Bộ đo cho QUẦN CARGO / TÂY
    measurements: {
      waist: 86,
      pantLength: 102,
      legOpening: 22,
      thigh: 32
    },
    status: 'available',
    description: 'Chất vải twill chống nhăn đặc trưng của Dickies, form đứng rộng rãi chuẩn baggy skatestyle. Cạp quần chắc nịch.',
    defectNote: 'Như mới (Like new), cúc khuy và tem mác sắc nét.'
  },
  {
    id: 'th-05',
    title: 'Champion Reverse Weave Heavyweight College Hoodie',
    category: 'hoodies',
    type: 'top',
    price: 890000,
    originalPrice: 1100000,
    size: 'L',
    condition: '9.3/10',
    color: 'Heather Grey',
    brand: 'Champion Authentic',
    era: '2000s',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    // Bộ đo cho HOODIE
    measurements: {
      length: 70,
      chest: 60,
      shoulder: 53,
      sleeve: 65
    },
    status: 'available',
    description: 'Chất nỉ bông Reverse Weave dày dặn 12oz, chống co rút theo chiều dọc. Bo gân hông co giãn thoải mái, nón 2 lớp dày dặn đứng form.',
    defectNote: 'Bo tay ôm tốt, logo thêu chữ C nhỏ ở cổ tay còn nguyên vẹn.'
  }
];

export default function App() {
  // Sản phẩm & Danh mục
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [maxPrice, setMaxPrice] = useState(3000000);

  // Xem chi tiết (Inspection Modal)
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Giỏ hàng & Voucher
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // form | success
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'qr' // qr | cod
  });

  // Quản trị viên Bon
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminTab, setAdminTab] = useState('inventory'); // inventory | orders
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [orders, setOrders] = useState([]);

  // Modal Thêm / Sửa sản phẩm của Bon
  const [showItemModal, setShowItemModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [itemFormData, setItemFormData] = useState({
    id: '',
    title: '',
    category: 'tees',
    type: 'top', // top | bottom | acc
    price: 550000,
    originalPrice: 700000,
    size: 'L',
    condition: '9.5/10',
    color: '',
    brand: '',
    era: '1990s',
    images: [],
    // Số đo cho Áo
    topMeasurements: {
      length: 70,
      chest: 56,
      shoulder: 50,
      sleeve: 22
    },
    // Số đo cho Quần
    bottomMeasurements: {
      waist: 80,
      pantLength: 102,
      legOpening: 21,
      thigh: 30
    },
    accSizeDesc: 'One Size / Có khóa điều chỉnh',
    description: '',
    defectNote: 'Không lỗi lủng rách.'
  });

  // Upload ảnh hàng loạt
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const compressImageFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 900;
          const MAX_HEIGHT = 900;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Nén JPEG 72% giữ độ chi tiết của vải 2hand
          const compressed = canvas.toDataURL('image/jpeg', 0.72);
          resolve(compressed);
        };
      };
    });
  };

  const handleBatchImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsCompressing(true);
    setUploadProgress(10);
    try {
      const compressedList = [];
      for (let i = 0; i < files.length; i++) {
        const res = await compressImageFile(files[i]);
        compressedList.push(res);
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }

      setItemFormData(prev => ({
        ...prev,
        images: [...prev.images, ...compressedList]
      }));
      triggerToast(`Đã upload & nén thành công ${files.length} ảnh sản phẩm!`);
    } catch (err) {
      console.error(err);
      triggerToast('Có lỗi khi xử lý ảnh, vui lòng thử lại!', 'error');
    } finally {
      setIsCompressing(false);
      setUploadProgress(0);
    }
  };

  const removeImageAt = (idx) => {
    setItemFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  const setAsCoverImage = (idx) => {
    setItemFormData(prev => {
      const target = prev.images[idx];
      const rest = prev.images.filter((_, i) => i !== idx);
      return { ...prev, images: [target, ...rest] };
    });
    triggerToast('Đã đặt làm ảnh bìa chính!');
  };

  const handleCategoryChange = (newCat) => {
    let resolvedType = 'top';
    if (['pants', 'denim', 'shorts'].includes(newCat)) {
      resolvedType = 'bottom';
    } else if (newCat === 'accessories') {
      resolvedType = 'acc';
    } else {
      resolvedType = 'top';
    }

    setItemFormData(prev => ({
      ...prev,
      category: newCat,
      type: resolvedType
    }));
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginForm.username.trim().toLowerCase() === 'bon' && loginForm.password === 'bon117admin') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginError('');
      setLoginForm({ username: '', password: '' });
      triggerToast('Chào mừng Bon quay trở lại quản trị 117 THRIFT!');
    } else {
      setLoginError('Tài khoản hoặc mật khẩu không chính xác!');
    }
  };

  const handleToggleSoldOut = (itemId) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const nextStatus = item.status === 'available' ? 'sold' : 'available';
        triggerToast(`Đã chuyển item sang: ${nextStatus === 'available' ? 'Còn hàng' : 'ĐÃ BÁN (SOLD)'}`);
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const handleDeleteItem = (itemId) => {
    setItems(prev => prev.filter(it => it.id !== itemId));
    triggerToast('Đã xóa món đồ khỏi kho hàng 117 THRIFT!');
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const finalImages = itemFormData.images.length > 0 
      ? itemFormData.images 
      : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'];

    // Lắp ráp số đo theo phân loại type
    let finalMeasurements = {};
    if (itemFormData.type === 'top') {
      finalMeasurements = { ...itemFormData.topMeasurements };
    } else if (itemFormData.type === 'bottom') {
      finalMeasurements = { ...itemFormData.bottomMeasurements };
    } else {
      finalMeasurements = { desc: itemFormData.accSizeDesc };
    }

    const payload = {
      id: isEditing ? itemFormData.id : `th-${Date.now().toString().slice(-4)}`,
      title: itemFormData.title,
      category: itemFormData.category,
      type: itemFormData.type,
      price: Number(itemFormData.price),
      originalPrice: Number(itemFormData.originalPrice || itemFormData.price),
      size: itemFormData.size,
      condition: itemFormData.condition,
      color: itemFormData.color || 'Vintage Wash',
      brand: itemFormData.brand || 'Vintage Curated',
      era: itemFormData.era || '1990s',
      images: finalImages,
      measurements: finalMeasurements,
      status: 'available',
      description: itemFormData.description,
      defectNote: itemFormData.defectNote || 'Không lỗi lủng rách'
    };

    if (isEditing) {
      setItems(prev => prev.map(it => it.id === payload.id ? payload : it));
      triggerToast('Cập nhật thông tin item thành công!');
    } else {
      setItems(prev => [payload, ...prev]);
      triggerToast('Đã đăng món đồ vintage mới lên kệ!');
    }
    setShowItemModal(false);
  };

  const addToCart = (item) => {
    if (item.status === 'sold') {
      triggerToast('Món đồ này đã có người chốt mất rồi bạn ơi!', 'error');
      return;
    }
    if (cart.some(c => c.id === item.id)) {
      triggerToast('Đồ 2hand độc bản (1 of 1), bạn đã thêm chiếc này vào giỏ rồi!', 'error');
      setIsCartOpen(true);
      return;
    }
    setCart(prev => [...prev, item]);
    triggerToast(`Đã thêm "${item.title}" vào giỏ hàng!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
    triggerToast('Đã bỏ món khỏi giỏ hàng');
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((subtotal * discountPercent) / 100);
  }, [subtotal, discountPercent]);

  // Freeship cho đơn từ 600k
  const freeShippingThreshold = 600000;
  const isFreeShip = subtotal >= freeShippingThreshold;
  const shippingFee = cart.length === 0 ? 0 : (isFreeShip ? 0 : 30000);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromoCode = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === '117VIBE') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError('');
      triggerToast('Áp dụng mã 117VIBE: Giảm 10% tổng đơn hàng!');
    } else {
      setPromoError('Mã giảm giá không hợp lệ (Thử: 117VIBE)');
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      orderId: `117-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      totalAmount: finalTotal,
      customer: { ...customerInfo },
      createdAt: new Date().toLocaleString('vi-VN')
    };

    // Đánh dấu các món trong giỏ hàng thành SOLD OUT ngay
    const boughtIds = cart.map(i => i.id);
    setItems(prev => prev.map(it => boughtIds.includes(it.id) ? { ...it, status: 'sold' } : it));
    setOrders(prev => [newOrder, ...prev]);

    setCheckoutStep('success');
    setCart([]);
    triggerToast('Chốt đơn thành công! Bon đã nhận thông tin.');
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSize = selectedSize === 'all' || item.size.toLowerCase().includes(selectedSize.toLowerCase());
      const matchPrice = item.price <= maxPrice;
      const kw = searchQuery.toLowerCase().trim();
      const matchKw = !kw || 
        item.title.toLowerCase().includes(kw) || 
        item.brand?.toLowerCase().includes(kw) ||
        item.era?.toLowerCase().includes(kw);

      return matchCat && matchSize && matchPrice && matchKw;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // newest by default
    });
  }, [items, selectedCategory, selectedSize, maxPrice, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 font-sans antialiased selection:bg-amber-400 selection:text-stone-950 relative">
      {/* Styles Micro-interactions & Streetwear Accents */}
      <style>{`
        * { -webkit-tap-highlight-color: transparent; }
        @keyframes sweep {
          0% { transform: translate3d(-150%, 0, 0) skewX(-20deg); }
          100% { transform: translate3d(250%, 0, 0) skewX(-20deg); }
        }
        @keyframes softFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -4px, 0); }
        }
        .btn-sheen {
          position: relative;
          overflow: hidden;
        }
        .btn-sheen::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translate3d(-150%, 0, 0) skewX(-20deg);
        }
        .btn-sheen:hover::after {
          animation: sweep 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-spring {
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease;
        }
        .btn-spring:active {
          transform: scale3d(0.96, 0.96, 1) !important;
        }
        .vintage-card {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (hover: hover) {
          .vintage-card:hover {
            transform: translate3d(0, -6px, 0);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
          }
        }
        .vintage-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
      `}</style>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-50 pointer-events-none transition-all">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md text-xs font-bold border ${
            toastMessage.type === 'error' 
              ? 'bg-rose-900/95 text-white border-rose-700/80' 
              : 'bg-stone-900/95 text-amber-300 border-stone-800'
          }`}>
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-spin" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-stone-950 text-stone-300 text-[11px] font-medium py-1.5 px-4 text-center tracking-wider border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        <span>117 THRIFT • MỖI MÓN DUY NHẤT 1 CHIẾC (1 OF 1) • FREESHIP TOÀN QUỐC TỪ 600K</span>
      </div>

      {/* MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-stone-300/80">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div 
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-stone-950 text-amber-400 flex items-center justify-center font-black text-xl tracking-tighter shadow-md group-hover:scale-105 group-active:scale-95 transition-transform border border-amber-400/40">
              117
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight leading-none flex items-center gap-1.5">
                <span>117 THRIFT</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-stone-950 font-mono font-bold">VINTAGE</span>
              </div>
              <p className="text-[10px] text-stone-500 font-semibold tracking-widest mt-0.5">CURATED STREETWEAR • SÀI GÒN</p>
            </div>
          </div>

          {/* Actions & Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a 
              href="tel:0559655085"
              className="btn-spring flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-amber-400/20 text-stone-900 border border-amber-400/50 text-xs font-bold hover:bg-amber-400/30"
            >
              <Phone className="w-3.5 h-3.5 text-stone-900" />
              <span className="hidden sm:inline">0559.655.085 (Bon)</span>
              <span className="sm:hidden">Hotline</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-sheen btn-spring relative flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-stone-950 text-white rounded-full font-bold text-xs shadow-md shadow-stone-950/20 hover:bg-stone-900"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Túi đồ</span>
              {cart.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 text-[11px] font-black flex items-center justify-center -ml-0.5">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Admin Switch */}
            {isAdmin ? (
              <div className="flex items-center gap-1.5 pl-1">
                <span className="hidden sm:inline-block px-2.5 py-1 bg-stone-950 text-amber-400 text-[11px] font-mono font-bold rounded-xl border border-amber-400/40">
                  👑 BON ADMIN
                </span>
                <button
                  onClick={() => { setIsAdmin(false); triggerToast('Đã đăng xuất quản trị!'); }}
                  className="btn-spring p-2 text-stone-500 hover:text-rose-600 rounded-xl hover:bg-rose-50"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="btn-spring p-2 text-stone-600 hover:text-stone-950 rounded-xl border border-stone-300 bg-white hover:border-stone-400"
                title="Đăng nhập quản trị"
              >
                <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {}
      {isAdmin && (
        <section className="bg-stone-950 text-stone-100 py-6 border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-amber-400 flex items-center gap-2">
                  <span>Trang Quản Trị Kho Hàng 117 THRIFT</span>
                  <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded-full font-mono">
                    Owner: Bon
                  </span>
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Quản lý số đo Áo / Quần linh hoạt, đăng đồ 1 of 1 và cập nhật đơn hàng khách chốt.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsEditing(false);
                  setItemFormData({
                    id: '',
                    title: '',
                    category: 'tees',
                    type: 'top',
                    price: 550000,
                    originalPrice: 700000,
                    size: 'L',
                    condition: '9.5/10',
                    color: 'Faded Black',
                    brand: 'Vintage USA',
                    era: '1990s',
                    images: [],
                    topMeasurements: { length: 72, chest: 56, shoulder: 50, sleeve: 22 },
                    bottomMeasurements: { waist: 82, pantLength: 102, legOpening: 21, thigh: 30 },
                    accSizeDesc: 'One Size / Có khóa điều chỉnh',
                    description: '',
                    defectNote: 'Không lỗi lủng rách.'
                  });
                  setShowItemModal(true);
                }}
                className="btn-sheen btn-spring flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl font-bold text-xs sm:text-sm self-start shadow-md shadow-amber-400/20"
              >
                <Plus className="w-4 h-4 text-stone-950" />
                <span>Đăng Món Đồ Mới (1 of 1)</span>
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setAdminTab('inventory')}
                className={`btn-spring px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  adminTab === 'inventory' 
                    ? 'bg-amber-400 text-stone-950 shadow-md' 
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                Kho Hàng ({items.length})
              </button>
              <button
                onClick={() => setAdminTab('orders')}
                className={`btn-spring px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  adminTab === 'orders' 
                    ? 'bg-amber-400 text-stone-950 shadow-md' 
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>Đơn Hàng Khách Chốt</span>
                {orders.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono">
                    {orders.length}
                  </span>
                )}
              </button>
            </div>

            {/* TAB INVENTORY */}
            {adminTab === 'inventory' && (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-stone-800">
                <table className="w-full text-left text-xs text-stone-300 border-collapse">
                  <thead>
                    <tr className="border-b border-stone-800 text-[11px] uppercase tracking-wider text-stone-400 bg-stone-900/70">
                      <th className="py-3 px-4">Ảnh</th>
                      <th className="py-3 px-4">Tên Sản Phẩm & Thương Hiệu</th>
                      <th className="py-3 px-4">Loại & Size</th>
                      <th className="py-3 px-4">Bộ Số Đo (cm)</th>
                      <th className="py-3 px-4">Giá Bán</th>
                      <th className="py-3 px-4">Trạng Thái</th>
                      <th className="py-3 px-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/80 bg-stone-950/60">
                    {items.map(it => (
                      <tr key={it.id} className="hover:bg-stone-900/40">
                        <td className="py-3 px-4">
                          <img 
                            src={it.images?.[0]} 
                            alt="" 
                            className="w-12 h-14 object-cover rounded-lg border border-stone-700 shadow-sm" 
                          />
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-bold text-white truncate">{it.title}</div>
                          <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                            {it.brand} • {it.era} • Cond {it.condition}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-stone-200 uppercase">{it.category}</span>
                          <div className="text-stone-400 font-mono text-[11px]">{it.size}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-stone-300">
                          {it.type === 'top' ? (
                            <div>
                              <span>Dài: {it.measurements?.length}cm</span> | <span>Ngực: {it.measurements?.chest}cm</span>
                              <div className="text-[10px] text-stone-400">Vai: {it.measurements?.shoulder}cm | Tay: {it.measurements?.sleeve}cm</div>
                            </div>
                          ) : it.type === 'bottom' ? (
                            <div>
                              <span>Eo: {it.measurements?.waist}cm</span> | <span>Dài: {it.measurements?.pantLength}cm</span>
                              <div className="text-[10px] text-stone-400">Ống: {it.measurements?.legOpening}cm | Đùi: {it.measurements?.thigh}cm</div>
                            </div>
                          ) : (
                            <span className="text-stone-400">{it.measurements?.desc || 'Free size'}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-bold text-amber-400">
                          {Number(it.price).toLocaleString('vi-VN')} đ
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleSoldOut(it.id)}
                            className={`btn-spring px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                              it.status === 'available'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                                : 'bg-rose-950 text-rose-400 border border-rose-700'
                            }`}
                          >
                            {it.status === 'available' ? '● CÒN HÀNG' : '× ĐÃ BÁN (SOLD)'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setIsEditing(true);
                                setItemFormData({
                                  ...it,
                                  topMeasurements: it.type === 'top' ? it.measurements : { length: 70, chest: 56, shoulder: 50, sleeve: 22 },
                                  bottomMeasurements: it.type === 'bottom' ? it.measurements : { waist: 80, pantLength: 102, legOpening: 21, thigh: 30 },
                                  accSizeDesc: it.type === 'acc' ? (it.measurements?.desc || 'Free size') : 'One Size',
                                  images: it.images || []
                                });
                                setShowItemModal(true);
                              }}
                              className="btn-spring p-1.5 bg-stone-800 hover:bg-amber-400 hover:text-stone-950 rounded-lg text-stone-300"
                              title="Sửa món này"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(it.id)}
                              className="btn-spring p-1.5 bg-stone-800 hover:bg-rose-600 hover:text-white rounded-lg text-stone-300"
                              title="Xóa khỏi kho"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB ORDERS */}
            {adminTab === 'orders' && (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-stone-800">
                {orders.length === 0 ? (
                  <div className="text-center py-10 text-stone-400 text-xs">Chưa có đơn hàng nào được ghi nhận.</div>
                ) : (
                  <table className="w-full text-left text-xs text-stone-300 border-collapse">
                    <thead>
                      <tr className="border-b border-stone-800 text-[11px] uppercase text-stone-400 bg-stone-900/70">
                        <th className="py-3 px-4">Mã Đơn</th>
                        <th className="py-3 px-4">Khách Hàng & SĐT</th>
                        <th className="py-3 px-4">Địa Chỉ Giao Hàng</th>
                        <th className="py-3 px-4">Món Đồ Đã Mua</th>
                        <th className="py-3 px-4">Tổng Tiền</th>
                        <th className="py-3 px-4 text-right">Liên Hệ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800">
                      {orders.map(od => (
                        <tr key={od.orderId} className="hover:bg-stone-900/40">
                          <td className="py-3 px-4 font-mono font-bold text-amber-400">{od.orderId}</td>
                          <td className="py-3 px-4 font-semibold text-white">
                            <div>{od.customer.name}</div>
                            <div className="text-stone-400 font-mono">{od.customer.phone}</div>
                          </td>
                          <td className="py-3 px-4 text-stone-300 max-w-xs truncate">{od.customer.address}</td>
                          <td className="py-3 px-4">
                            {od.items.map(i => (
                              <div key={i.id} className="text-[11px] truncate">
                                • {i.title} ({i.size})
                              </div>
                            ))}
                          </td>
                          <td className="py-3 px-4 font-bold text-emerald-400">
                            {Number(od.totalAmount).toLocaleString('vi-VN')} đ
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a 
                                href={`tel:${od.customer.phone}`} 
                                className="btn-spring p-1.5 bg-emerald-600/20 text-emerald-400 rounded-lg hover:bg-emerald-600 hover:text-white"
                                title="Gọi khách chốt đơn"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a 
                                href={`https://zalo.me/${od.customer.phone}`} 
                                target="_blank"
                                rel="noreferrer"
                                className="btn-spring p-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white"
                                title="Nhắn Zalo"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* HERO BANNER - STREETWEAR VIBE */}
      <section className="bg-stone-950 text-white py-12 md:py-16 px-4 relative overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-mono font-bold mb-3 tracking-widest">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            <span>ARCHIVE & VINTAGE STREETWEAR COLLECTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none uppercase">
            117 THRIFT <span className="text-amber-400">SAIGON</span>
          </h1>
          <p className="mt-3 text-stone-400 text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed">
            Tuyển chọn từng chiếc áo thun 90s single stitch, áo khoác workwear Detroit, quần cargo & denim vintage chuẩn số đo thực tế (cm). Mỗi món chỉ có 1 chiếc duy nhất.
          </p>
        </div>
      </section>

      {/* FILTER CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-xl shadow-stone-300/40 border border-stone-200 flex flex-col gap-3.5">
          {/* Top Row: Search & Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="relative sm:col-span-5">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                type="text"
                placeholder="Tìm graphic tee, Carhartt, Levi's 501, 90s..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Size Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 outline-none cursor-pointer focus:ring-2 focus:ring-amber-400/50"
              >
                <option value="all">📏 Tất cả kích cỡ (Size)</option>
                <option value="S">Size S</option>
                <option value="M">Size M</option>
                <option value="L">Size L (Boxy Fit)</option>
                <option value="XL">Size XL / 2XL</option>
                <option value="W30">Quần W30 / W31</option>
                <option value="W32">Quần W32 / W33</option>
                <option value="W34">Quần W34 / W36</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="sm:col-span-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 outline-none cursor-pointer focus:ring-2 focus:ring-amber-400/50"
              >
                <option value="newest">⚡ Mới lên kệ trước</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {/* Categories Horizontal Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 hide-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn-spring px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-stone-950 text-amber-400 shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.group === 'top' && <Scissors className="w-3 h-3" />}
                {cat.group === 'bottom' && <Layers className="w-3 h-3" />}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-stone-950 tracking-tight flex items-center gap-2">
              <span>Kho Đồ Vintage Tuyển Chọn</span>
              <span className="text-xs bg-stone-200 text-stone-800 px-2 py-0.5 rounded-md font-mono">
                {filteredItems.length} Món
              </span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">Số đo cm chuẩn thực tế, ảnh chụp thật 100% không chỉnh sửa màu.</p>
          </div>

          {(selectedCategory !== 'all' || selectedSize !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSize('all');
                setSearchQuery('');
                triggerToast('Đã đặt lại bộ lọc');
              }}
              className="btn-spring flex items-center gap-1 px-3 py-1.5 bg-stone-200 hover:bg-stone-300 rounded-xl text-xs font-bold text-stone-700"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Đặt lại</span>
            </button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 shadow-sm">
            <Filter className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="font-bold text-stone-800">Không tìm thấy món đồ phù hợp!</p>
            <p className="text-xs text-stone-500 mt-1">Hãy thử chọn lại phân loại hoặc tìm từ khóa khác.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedSize('all'); }}
              className="btn-spring mt-4 px-4 py-2 bg-stone-950 text-amber-400 rounded-xl text-xs font-bold"
            >
              Xem tất cả kho hàng
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="vintage-card bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm flex flex-col justify-between group"
              >
                {/* Image Section */}
                <div 
                  className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer select-none"
                  onClick={() => { setSelectedItem(item); setActiveImageIdx(0); }}
                >
                  <img 
                    src={item.images?.[0]} 
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <span className="absolute top-3 left-3 bg-stone-950/90 backdrop-blur-xs text-amber-400 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-400/30">
                    {item.era} • Cond {item.condition}
                  </span>

                  <span className="absolute top-3 right-3 bg-white/95 text-stone-900 px-2.5 py-1 rounded-md text-xs font-black shadow-sm border border-stone-200">
                    {item.size}
                  </span>

                  {item.status === 'sold' ? (
                    <div className="absolute inset-0 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center">
                      <span className="px-4 py-2 bg-rose-600 text-white font-black text-xs sm:text-sm rounded-xl uppercase tracking-widest shadow-lg">
                        SOLD OUT (ĐÃ BÁN)
                      </span>
                    </div>
                  ) : (
                    <span className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-stone-200 px-2.5 py-0.5 rounded-full text-[10px] font-mono">
                      1 of 1 độc bản
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                    📸 {item.images?.length || 1} ảnh
                  </span>
                </div>

                {/* Card Body & Dynamic Measurement Badges */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-stone-500 font-bold uppercase tracking-wider mb-1">
                      {item.brand}
                    </div>

                    <h3 
                      onClick={() => { setSelectedItem(item); setActiveImageIdx(0); }}
                      className="font-black text-stone-950 text-sm sm:text-base line-clamp-2 cursor-pointer hover:text-amber-600 transition-colors leading-snug mb-2.5"
                    >
                      {item.title}
                    </h3>

                    {/* DYNAMIC MEASUREMENT PREVIEW BADGES */}
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 mb-3 text-xs font-mono">
                      {item.type === 'top' ? (
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-stone-700">
                          <div>📏 Dài: <strong className="text-stone-950">{item.measurements?.length} cm</strong></div>
                          <div>📐 Ngực: <strong className="text-stone-950">{item.measurements?.chest} cm</strong></div>
                          <div>👕 Vai: <strong className="text-stone-950">{item.measurements?.shoulder} cm</strong></div>
                          <div>🧥 Tay: <strong className="text-stone-950">{item.measurements?.sleeve} cm</strong></div>
                        </div>
                      ) : item.type === 'bottom' ? (
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-stone-700">
                          <div>👖 Vòng eo: <strong className="text-stone-950">{item.measurements?.waist} cm</strong></div>
                          <div>📏 Dài quần: <strong className="text-stone-950">{item.measurements?.pantLength} cm</strong></div>
                          <div>👟 Ống quần: <strong className="text-stone-950">{item.measurements?.legOpening} cm</strong></div>
                          <div>📐 Đùi/Đáy: <strong className="text-stone-950">{item.measurements?.thigh} cm</strong></div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-stone-700 truncate">
                          ✨ Thông số: <strong className="text-stone-950">{item.measurements?.desc || 'Free size tiêu chuẩn'}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Quick Action */}
                  <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-base sm:text-lg font-black text-stone-950">
                        {Number(item.price).toLocaleString('vi-VN')} đ
                      </div>
                      {item.originalPrice > item.price && (
                        <div className="text-[10px] text-stone-400 line-through">
                          {Number(item.originalPrice).toLocaleString('vi-VN')} đ
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => { setSelectedItem(item); setActiveImageIdx(0); }}
                        className="btn-spring px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold"
                      >
                        Soi số đo
                      </button>

                      {item.status === 'available' ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="btn-sheen btn-spring px-3 py-2 bg-stone-950 hover:bg-stone-900 text-amber-400 rounded-xl text-xs font-bold shadow-md shadow-stone-950/15 flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Chốt</span>
                        </button>
                      ) : (
                        <button disabled className="px-3 py-2 bg-stone-200 text-stone-400 rounded-xl text-xs font-bold cursor-not-allowed">
                          Đã bán
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-auto animate-scale-in">
            {/* Image Slider */}
            <div className="relative aspect-[16/10] bg-stone-950">
              <img 
                src={selectedItem.images?.[activeImageIdx] || selectedItem.images?.[0]} 
                alt="" 
                className="w-full h-full object-contain"
              />

              {selectedItem.images?.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImageIdx(prev => prev > 0 ? prev - 1 : selectedItem.images.length - 1)}
                    className="btn-spring absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setActiveImageIdx(prev => prev < selectedItem.images.length - 1 ? prev + 1 : 0)}
                    className="btn-spring absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <button 
                onClick={() => setSelectedItem(null)}
                className="btn-spring absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] px-2.5 py-1 rounded-full font-mono">
                {activeImageIdx + 1} / {selectedItem.images?.length || 1}
              </div>
            </div>

            {/* Thumbnails */}
            {selectedItem.images?.length > 1 && (
              <div className="p-2 bg-stone-950 flex gap-2 overflow-x-auto hide-scrollbar">
                {selectedItem.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === activeImageIdx ? 'border-amber-400 scale-105' : 'border-transparent opacity-50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Detailed Body */}
            <div className="p-5 sm:p-6 max-h-[55vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-600 font-bold uppercase">
                  {selectedItem.brand} • {selectedItem.era}
                </span>
                <span className="text-xs bg-stone-100 font-mono font-bold px-2 py-0.5 rounded text-stone-800">
                  Độ mới: {selectedItem.condition}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-stone-950 mt-1">{selectedItem.title}</h3>
              <div className="text-xl sm:text-2xl font-black text-stone-950 mt-1">
                {Number(selectedItem.price).toLocaleString('vi-VN')} đ
              </div>

              {/* DYNAMIC MEASUREMENT CARD IN MODAL */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30">
                <div className="flex items-center justify-between pb-2 border-b border-amber-400/20 mb-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-amber-600" />
                    <span>
                      {selectedItem.type === 'top' ? 'BẢNG SỐ ĐO ÁO THỰC TẾ (CM)' : 
                       selectedItem.type === 'bottom' ? 'BẢNG SỐ ĐO QUẦN THỰC TẾ (CM)' : 
                       'THÔNG SỐ KÍCH THƯỚC CHI TIẾT'}
                    </span>
                  </h4>
                  <span className="text-xs font-mono font-bold bg-amber-400 text-stone-950 px-2 py-0.5 rounded">
                    Size: {selectedItem.size}
                  </span>
                </div>

                {selectedItem.type === 'top' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono">
                    <div className="bg-white p-2 rounded-xl border border-amber-300/40">
                      <span className="text-[10px] text-stone-500 uppercase block">Dài Áo</span>
                      <strong className="text-base text-stone-950">{selectedItem.measurements?.length} cm</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-amber-300/40">
                      <span className="text-[10px] text-stone-500 uppercase block">Rộng Ngực</span>
                      <strong className="text-base text-stone-950">{selectedItem.measurements?.chest} cm</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-amber-300/40">
                      <span className="text-[10px] text-stone-500 uppercase block">Rộng Vai</span>
                      <strong className="text-base text-stone-950">{selectedItem.measurements?.shoulder} cm</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-amber-300/40">
                      <span className="text-[10px] text-stone-500 uppercase block">Dài / Ống Tay</span>
                      <strong className="text-base text-stone-950">{selectedItem.measurements?.sleeve} cm</strong>
                    </div>
                  </div>
                ) : selectedItem.type === 'bottom' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono">
                    <div className="bg-white p-2 rounded-xl border border-amber-300/40">
                      <span className="text-[10px] text-stone-500 uppercase block">Vòng Eo</span>
                      <strong className="text-base text-stone-950">{selectedItem.measurements?.waist} cm</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-amber-300/40">
                      <span className="text-[10px] text-stone-500 uppercase block">Dài Quần</span>
                      <strong className="text-base text-stone-950">{selectedItem.measurements?.pantLength} cm</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-amber-300/40">
                      <span className="text-[10px] text-stone-500 uppercase block">Rộng Ống</span>
                      <strong className="text-base text-stone-950">{selectedItem.measurements?.legOpening} cm</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-amber-300/40">
                      <span className="text-[10px] text-stone-500 uppercase block">Rộng Đùi / Đáy</span>
                      <strong className="text-base text-stone-950">{selectedItem.measurements?.thigh} cm</strong>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-3 rounded-xl border border-amber-300/40 font-mono text-xs text-stone-800 text-center">
                    {selectedItem.measurements?.desc || 'Free size tiêu chuẩn cho phụ kiện vintage.'}
                  </div>
                )}
                <p className="text-[10px] text-stone-500 mt-2 text-center italic">
                  * 117 THRIFT đo thủ công khi trải phẳng sản phẩm trên mặt bàn (sai số ±1cm).
                </p>
              </div>

              {/* Description & Defect Note */}
              <div className="mt-4 text-xs text-stone-600 leading-relaxed">
                <h5 className="font-bold text-stone-900 uppercase text-[11px] mb-1">Mô tả chi tiết:</h5>
                <p>{selectedItem.description}</p>
                {selectedItem.defectNote && (
                  <div className="mt-2.5 p-2.5 bg-stone-100 rounded-xl border border-stone-200 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900">Tình trạng lỗi (nếu có): </span>
                      <span>{selectedItem.defectNote}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex gap-2.5">
                <a
                  href={`https://zalo.me/0559655085?text=${encodeURIComponent(`Chào Bon 117 THRIFT, mình muốn hỏi chiếc ${selectedItem.title} - Giá: ${selectedItem.price.toLocaleString('vi-VN')}đ`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-spring flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Hỏi Bon qua Zalo</span>
                </a>

                {selectedItem.status === 'available' ? (
                  <button
                    onClick={() => {
                      addToCart(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="btn-sheen btn-spring flex-1 py-3 bg-stone-950 hover:bg-stone-900 text-amber-400 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Thêm vào giỏ hàng</span>
                  </button>
                ) : (
                  <button disabled className="flex-1 py-3 bg-stone-200 text-stone-400 font-bold text-xs sm:text-sm rounded-xl cursor-not-allowed">
                    Đã có người chốt
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              {/* Cart Header */}
              <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-stone-950" />
                  <h3 className="font-black text-stone-950 text-base sm:text-lg">Túi Đồ Vintage ({cart.length})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="btn-spring p-1 text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="p-4 bg-amber-400/10 border-b border-amber-400/30 text-xs">
                {isFreeShip ? (
                  <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <Truck className="w-4 h-4" />
                    <span>Bạn đã được FREESHIP toàn quốc cho đơn hàng này!</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between font-semibold text-stone-700 mb-1">
                      <span>Mua thêm {(freeShippingThreshold - subtotal).toLocaleString('vi-VN')} đ để được Freeship:</span>
                      <span className="font-bold">{Math.round((subtotal / freeShippingThreshold) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="p-4 overflow-y-auto flex-1 divide-y divide-stone-100">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-stone-400 text-xs">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    <p className="font-bold text-stone-700">Túi đồ của bạn đang trống!</p>
                    <p className="mt-1">Hãy lướt kho hàng và chọn những món 1 of 1 ưng ý.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="py-3.5 flex gap-3 items-center">
                      <img src={item.images?.[0]} alt="" className="w-14 h-16 object-cover rounded-xl border border-stone-200" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-stone-900 text-xs truncate">{item.title}</h4>
                        <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                          Size: {item.size} • {item.brand}
                        </div>
                        <div className="text-xs font-black text-stone-950 mt-1">
                          {Number(item.price).toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn-spring p-2 text-stone-400 hover:text-rose-600 rounded-lg"
                        title="Bỏ món này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3 text-xs">
                  {/* Promo Form */}
                  <form onSubmit={applyPromoCode} className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Mã giảm giá (vd: 117VIBE)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 p-2 bg-white border border-stone-300 rounded-xl outline-none font-mono text-xs uppercase"
                    />
                    <button type="submit" className="btn-spring px-3.5 py-2 bg-stone-950 text-amber-400 rounded-xl font-bold">
                      Áp dụng
                    </button>
                  </form>
                  {promoApplied && (
                    <p className="text-emerald-600 font-bold text-[11px]">✓ Đã giảm 10% từ voucher 117VIBE</p>
                  )}
                  {promoError && (
                    <p className="text-rose-600 text-[11px]">{promoError}</p>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-200">
                    <div className="flex justify-between text-stone-600">
                      <span>Tạm tính ({cart.length} món):</span>
                      <span className="font-bold">{subtotal.toLocaleString('vi-VN')} đ</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Giảm voucher (10%):</span>
                        <span>-{discountAmount.toLocaleString('vi-VN')} đ</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-600">
                      <span>Phí vận chuyển:</span>
                      <span>{shippingFee === 0 ? 'MIỄN PHÍ' : `${shippingFee.toLocaleString('vi-VN')} đ`}</span>
                    </div>
                    <div className="flex justify-between text-stone-950 text-base font-black pt-1 border-t border-stone-300">
                      <span>Tổng thanh toán:</span>
                      <span className="text-amber-600">{finalTotal.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                      setCheckoutStep('form');
                    }}
                    className="btn-sheen btn-spring w-full py-3 bg-stone-950 hover:bg-stone-900 text-amber-400 font-bold rounded-xl text-sm shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Tiến hành chốt đơn</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative my-auto">
            <button onClick={() => setIsCheckoutOpen(false)} className="btn-spring absolute top-4 right-4 text-stone-400 hover:text-stone-700">
              <X className="w-5 h-5" />
            </button>

            {checkoutStep === 'success' ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-stone-950">Chốt Đơn Thành Công!</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Cảm ơn bạn đã ủng hộ 117 THRIFT. Bon sẽ kiểm tra và gọi điện xác nhận đơn hàng cho bạn ngay.
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  <a 
                    href={`https://zalo.me/0559655085?text=${encodeURIComponent(`Chào Bon, mình vừa chốt đơn tại 117 THRIFT. Tên: ${customerInfo.name} - SĐT: ${customerInfo.phone}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-sheen btn-spring w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs sm:text-sm text-center shadow-md"
                  >
                    Nhắn Zalo xác nhận đơn cho Bon
                  </a>
                  <button onClick={() => setIsCheckoutOpen(false)} className="btn-spring w-full py-2.5 bg-stone-100 text-stone-700 font-bold rounded-xl text-xs">
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit}>
                <h3 className="text-base sm:text-lg font-black text-stone-950 mb-0.5">Thông Tin Nhận Hàng</h3>
                <p className="text-xs text-stone-500 mb-4">Giao hàng toàn quốc • Hỗ trợ kiểm tra hàng trước khi thanh toán.</p>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Họ và tên của bạn</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full p-2.5 border border-stone-300 rounded-xl outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Số điện thoại nhận hàng</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Ví dụ: 0901234567"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full p-2.5 border border-stone-300 rounded-xl outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Địa chỉ chi tiết</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện..."
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full p-2.5 border border-stone-300 rounded-xl outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Phương thức thanh toán</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setCustomerInfo({...customerInfo, paymentMethod: 'qr'})}
                        className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                          customerInfo.paymentMethod === 'qr'
                            ? 'border-amber-500 bg-amber-50 text-stone-950 shadow-xs'
                            : 'border-stone-200 bg-stone-50 text-stone-600'
                        }`}
                      >
                        <span>Chuyển khoản QR</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomerInfo({...customerInfo, paymentMethod: 'cod'})}
                        className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                          customerInfo.paymentMethod === 'cod'
                            ? 'border-amber-500 bg-amber-50 text-stone-950 shadow-xs'
                            : 'border-stone-200 bg-stone-50 text-stone-600'
                        }`}
                      >
                        <span>Thanh toán COD</span>
                      </button>
                    </div>
                  </div>

                  {customerInfo.paymentMethod === 'qr' && (
                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl text-center space-y-2">
                      <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl border border-stone-300 shadow-sm flex items-center justify-center">
                        <img 
                          src={`https://api.vietqr.io/image/970422-0559655085-compact2.jpg?amount=${finalTotal}&addInfo=${encodeURIComponent(`117THRIFT ${customerInfo.phone || ''}`)}&accountName=BON%20117`} 
                          alt="VietQR"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-[11px] font-mono text-stone-600">
                        MB Bank • STK: <strong>0559655085</strong> (Bon)
                      </p>
                    </div>
                  )}

                  <div className="pt-2 text-stone-950 font-black flex justify-between text-sm">
                    <span>Tổng số tiền:</span>
                    <span className="text-amber-600">{finalTotal.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="btn-sheen btn-spring w-full mt-4 py-3 bg-stone-950 hover:bg-stone-900 text-amber-400 font-bold rounded-xl text-xs sm:text-sm shadow-xl"
                >
                  Xác Nhận Đặt Hàng
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {}
      {showItemModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base sm:text-lg font-black text-stone-950">
                {isEditing ? 'Chỉnh Sửa Món Đồ 117 THRIFT' : 'Đăng Món Đồ Vintage Mới (1 of 1)'}
              </h3>
              <button onClick={() => setShowItemModal(false)} className="btn-spring text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="mt-4 space-y-4 text-xs">
              {/* Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Tên món đồ (Tiêu đề)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ví dụ: 1998 Harley-Davidson 3D Emblem Tee"
                    value={itemFormData.title}
                    onChange={(e) => setItemFormData({...itemFormData, title: e.target.value})}
                    className="w-full p-2.5 border border-stone-300 rounded-xl outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Thương hiệu / Xuất xứ</label>
                  <input 
                    type="text" 
                    placeholder="Ví dụ: Carhartt, Levi's, Made in USA..."
                    value={itemFormData.brand}
                    onChange={(e) => setItemFormData({...itemFormData, brand: e.target.value})}
                    className="w-full p-2.5 border border-stone-300 rounded-xl outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Category, Size, Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Danh mục sản phẩm</label>
                  <select
                    value={itemFormData.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-xl outline-none font-bold bg-white focus:border-amber-500 cursor-pointer"
                  >
                    <optgroup label="Áo (Tops)">
                      <option value="tees">Vintage Graphic Tees</option>
                      <option value="jackets">Outerwear & Jackets</option>
                      <option value="hoodies">Hoodies & Sweats</option>
                    </optgroup>
                    <optgroup label="Quần (Bottoms)">
                      <option value="pants">Cargo & Workwear Pants</option>
                      <option value="denim">Vintage Denim & Jeans</option>
                      <option value="shorts">Shorts & Jorts</option>
                    </optgroup>
                    <optgroup label="Phụ kiện (Accessories)">
                      <option value="accessories">Hats, Belts & Bags</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Size tag (Form dáng)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="vd: L (Boxy Fit), W32..."
                    value={itemFormData.size}
                    onChange={(e) => setItemFormData({...itemFormData, size: e.target.value})}
                    className="w-full p-2.5 border border-stone-300 rounded-xl outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Giá bán (VNĐ)</label>
                  <input 
                    type="number" 
                    required
                    value={itemFormData.price}
                    onChange={(e) => setItemFormData({...itemFormData, price: e.target.value})}
                    className="w-full p-2.5 border border-stone-300 rounded-xl outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* BATCH IMAGE UPLOAD ZONE */}
              <div className="p-3.5 bg-stone-50 border border-stone-300 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-stone-800 flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4 text-amber-600" />
                    <span>Upload ảnh hàng loạt (Chọn nhiều ảnh từ máy)</span>
                  </label>
                  <span className="font-mono text-stone-500 font-bold">{itemFormData.images.length} ảnh đã chọn</span>
                </div>

                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={handleBatchImageUpload}
                  className="w-full p-2 bg-white border border-stone-300 rounded-xl cursor-pointer"
                />

                {isCompressing && (
                  <div className="mt-2 text-[11px] text-amber-600 font-mono font-bold flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang nén ảnh tự động: {uploadProgress}%</span>
                  </div>
                )}

                {itemFormData.images.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
                    {itemFormData.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-stone-300 group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-amber-400 text-stone-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                            Bìa
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => setAsCoverImage(idx)}
                              className="p-1 bg-amber-400 text-stone-950 rounded text-[10px]"
                              title="Đặt làm bìa"
                            >
                              ⭐
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImageAt(idx)}
                            className="p-1 bg-rose-600 text-white rounded text-[10px]"
                            title="Xóa ảnh này"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DYNAMIC MEASUREMENT INPUT SECTION */}
              <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-2xl">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-amber-400/20">
                  <span className="font-bold text-stone-950 uppercase flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-amber-600" />
                    <span>
                      {itemFormData.type === 'top' ? 'Nhập Số Đo Cho Áo (cm)' : 
                       itemFormData.type === 'bottom' ? 'Nhập Số Đo Cho Quần (cm)' : 
                       'Thông Số Cho Phụ Kiện'}
                    </span>
                  </span>
                  <span className="text-[10px] font-mono text-stone-500">* Tự động chuyển theo danh mục</span>
                </div>

                {itemFormData.type === 'top' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Dài áo (cm)</label>
                      <input 
                        type="number"
                        value={itemFormData.topMeasurements.length}
                        onChange={(e) => setItemFormData({
                          ...itemFormData,
                          topMeasurements: { ...itemFormData.topMeasurements, length: Number(e.target.value) }
                        })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xl outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Rộng ngực (cm)</label>
                      <input 
                        type="number"
                        value={itemFormData.topMeasurements.chest}
                        onChange={(e) => setItemFormData({
                          ...itemFormData,
                          topMeasurements: { ...itemFormData.topMeasurements, chest: Number(e.target.value) }
                        })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xl outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Rộng vai (cm)</label>
                      <input 
                        type="number"
                        value={itemFormData.topMeasurements.shoulder}
                        onChange={(e) => setItemFormData({
                          ...itemFormData,
                          topMeasurements: { ...itemFormData.topMeasurements, shoulder: Number(e.target.value) }
                        })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xl outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Dài/Ống tay (cm)</label>
                      <input 
                        type="number"
                        value={itemFormData.topMeasurements.sleeve}
                        onChange={(e) => setItemFormData({
                          ...itemFormData,
                          topMeasurements: { ...itemFormData.topMeasurements, sleeve: Number(e.target.value) }
                        })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xl outline-none font-mono"
                      />
                    </div>
                  </div>
                ) : itemFormData.type === 'bottom' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Vòng eo (cm)</label>
                      <input 
                        type="number"
                        value={itemFormData.bottomMeasurements.waist}
                        onChange={(e) => setItemFormData({
                          ...itemFormData,
                          bottomMeasurements: { ...itemFormData.bottomMeasurements, waist: Number(e.target.value) }
                        })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xl outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Dài quần (cm)</label>
                      <input 
                        type="number"
                        value={itemFormData.bottomMeasurements.pantLength}
                        onChange={(e) => setItemFormData({
                          ...itemFormData,
                          bottomMeasurements: { ...itemFormData.bottomMeasurements, pantLength: Number(e.target.value) }
                        })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xl outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Rộng ống (cm)</label>
                      <input 
                        type="number"
                        value={itemFormData.bottomMeasurements.legOpening}
                        onChange={(e) => setItemFormData({
                          ...itemFormData,
                          bottomMeasurements: { ...itemFormData.bottomMeasurements, legOpening: Number(e.target.value) }
                        })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xl outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Rộng đùi/đáy (cm)</label>
                      <input 
                        type="number"
                        value={itemFormData.bottomMeasurements.thigh}
                        onChange={(e) => setItemFormData({
                          ...itemFormData,
                          bottomMeasurements: { ...itemFormData.bottomMeasurements, thigh: Number(e.target.value) }
                        })}
                        className="w-full p-2 bg-white border border-stone-300 rounded-xl outline-none font-mono"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Kích thước phụ kiện</label>
                    <input 
                      type="text"
                      value={itemFormData.accSizeDesc}
                      onChange={(e) => setItemFormData({ ...itemFormData, accSizeDesc: e.target.value })}
                      placeholder="vd: One Size, Dài 110cm rộng 3.5cm..."
                      className="w-full p-2 bg-white border border-stone-300 rounded-xl outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Condition, Era & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Độ mới (Condition)</label>
                  <input 
                    type="text" 
                    value={itemFormData.condition}
                    onChange={(e) => setItemFormData({...itemFormData, condition: e.target.value})}
                    placeholder="vd: 9.5/10, Like New..."
                    className="w-full p-2.5 border border-stone-300 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Niên đại / Năm sản xuất</label>
                  <input 
                    type="text" 
                    value={itemFormData.era}
                    onChange={(e) => setItemFormData({...itemFormData, era: e.target.value})}
                    placeholder="vd: 1990s, Early 2000s..."
                    className="w-full p-2.5 border border-stone-300 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Mô tả sản phẩm</label>
                <textarea 
                  rows={2}
                  value={itemFormData.description}
                  onChange={(e) => setItemFormData({...itemFormData, description: e.target.value})}
                  placeholder="Chi tiết chất vải, kiểu dệt, chi tiết in ấn..."
                  className="w-full p-2.5 border border-stone-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Ghi chú lỗi (nếu có)</label>
                <input 
                  type="text" 
                  value={itemFormData.defectNote}
                  onChange={(e) => setItemFormData({...itemFormData, defectNote: e.target.value})}
                  placeholder="vd: Không lỗi lủng rách, khóa zip nguyên bản..."
                  className="w-full p-2.5 border border-stone-300 rounded-xl outline-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowItemModal(false)}
                  className="btn-spring px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-sheen btn-spring px-5 py-2.5 bg-stone-950 hover:bg-stone-900 text-amber-400 font-bold rounded-xl shadow-lg"
                >
                  Lưu Món Đồ Lên Kệ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl relative my-auto">
            <button onClick={() => setShowLoginModal(false)} className="btn-spring absolute top-4 right-4 text-stone-400 hover:text-stone-700">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-950 text-amber-400 flex items-center justify-center mx-auto mb-2 font-black text-xl border border-amber-400/40">
                117
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-950">Đăng Nhập Quản Trị</h3>
              <p className="text-xs text-stone-500">Hệ thống kho hàng 117 THRIFT</p>
            </div>

            {loginError && (
              <div className="p-2 mb-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold text-center border border-rose-200">
                {loginError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Tài khoản</label>
                <input 
                  type="text" 
                  required
                  placeholder="Nhập tài khoản (bon)"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="w-full p-2.5 border border-stone-300 rounded-xl outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Mật khẩu</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="Nhập mật khẩu"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full p-2.5 pr-10 border border-stone-300 rounded-xl outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-sheen btn-spring w-full py-3 bg-stone-950 hover:bg-stone-900 text-amber-400 font-bold rounded-xl text-xs sm:text-sm shadow-md mt-2"
              >
                Đăng Nhập
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-stone-950 text-stone-400 py-10 border-t border-stone-800 text-xs text-center mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-stone-200 text-sm tracking-wider">117 THRIFT • CURATED VINTAGE & STREETWEAR</p>
          <p className="text-stone-400">Hotline & Zalo: <strong>0559.655.085</strong> (Bon) • TP. Hồ Chí Minh</p>
          <p className="text-[11px] text-stone-500">Mỗi món duy nhất 1 chiếc • Đo chuẩn cm từng chiếc • Freeship toàn quốc từ 600K</p>
        </div>
      </footer>
    </div>
  );
}
