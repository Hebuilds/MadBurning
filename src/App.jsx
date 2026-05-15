import { useState, useEffect, useRef } from "react";

import {
  FaHamburger, FaBoxOpen, FaPlus, FaWhatsapp, FaPhone,
  FaMapMarkerAlt, FaClock, FaFacebook, FaTiktok,
  FaShoppingCart, FaFire, FaArrowLeft, FaArrowRight,
  FaMobileAlt,   // <-- added for MoMo (Mobile Money)
  FaInstagram
} from "react-icons/fa";

import { GiChickenOven, GiMeal, GiFrenchFries, GiCow } from "react-icons/gi";
import { MdFastfood, MdLocalDrink, MdDeliveryDining } from "react-icons/md";

const PHONE = "250796899214";
const LOGO_URL = "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778502547/ChatGPT_Image_May_11_2026_05_28_20_AM_un2ize.png";

// ─────────────────────────────────────────────────────────────────
// 🍔🍟🥤 MENU DATA – EDIT YOUR PRODUCTS HERE 🍔🍟🥤
// ─────────────────────────────────────────────────────────────────
// HOW TO ADD / EDIT / DELETE PRODUCTS:
//
// 1. Each category (chicken, beef, etc.) has an "items" array.
// 2. To ADD a new product: copy an existing item block, paste it inside the array,
//    then change the name, price, image URL, and description.
// 3. To EDIT: change any value (name, price, image URL, desc).
// 4. To DELETE: remove the entire { ... } block for that product.
// 5. To CHANGE AN IMAGE: replace the "image" URL with your new Cloudinary link.
// 6. For categories without images yet (pilau, wraps), set image: null → it will show an icon instead.
//
// Example of a product item:
//   { name: "Chicken Burger", price: 3500, icon: <FaHamburger />,
//     image: "https://...burger.jpg", desc: "Tasty description" }
// ─────────────────────────────────────────────────────────────────
const menuData = {
  chicken: {
    id: "chicken", label: "Chicken", icon: <GiChickenOven className="text-xl" />, accent: "#E8380D",
    items: [
      { name: "Chicken Burger", price: 3500, icon: <FaHamburger />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765521/2h_e8edkx.jpg", desc: "Crispy chicken patty with fresh toppings" },
      { name: "Chicken Burger & Chips", price: 4000, icon: <FaHamburger />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765520/4h_gnxgay.jpg", desc: "Burger + golden fries combo" },
      { name: "Double Chicken Burger & Chips", price: 5000, icon: <FaHamburger />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765519/1h_eend6j.jpg", desc: "Double stacked, double the fire" },
      { name: "Chicken Fries", price: 3000, icon: <GiFrenchFries />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765518/3h_y5l63w.jpg", desc: "Crispy seasoned chicken strips" },
      { name: "Omelette Burger & Chips", price: 3000, icon: <MdFastfood />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765518/5h_lehezc.jpg", desc: "Egg omelette burger with chips" },
    ],
  },
  chickenBox: {
    id: "chickenBox", label: "Chicken Combos", icon: <FaBoxOpen className="text-xl" />, accent: "#FF6B35",
    items: [
      { name: "Chicken Burger & Chips & Fanta", price: 5200, icon: <FaHamburger />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765521/2h_e8edkx.jpg", desc: "Full meal deal — burger, chips, cold drink" },
      { name: "Double Chicken Burger & Chips & Fanta", price: 6200, icon: <FaHamburger />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765520/4h_gnxgay.jpg", desc: "Double burger meal — ultimate combo" },
      { name: "Chicken Fries & Fanta", price: 4200, icon: <GiFrenchFries />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765519/1h_eend6j.jpg", desc: "Crispy strips + refreshing Fanta" },
    ],
  },
  beef: {
    id: "beef", label: "Beef", icon: <GiCow className="text-xl" />, accent: "#C0392B",
    items: [
      { name: "Beef Burger", price: 3000, icon: <FaHamburger />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765518/3h_y5l63w.jpg", desc: "Juicy beef patty, classic style" },
      { name: "Beef Burger & Chips", price: 3500, icon: <FaHamburger />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765518/5h_lehezc.jpg", desc: "Beef burger paired with golden fries" },
      { name: "Double Beef Burger & Chips", price: 4500, icon: <FaHamburger />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765521/2h_e8edkx.jpg", desc: "Extra beef, extra satisfaction" },
      { name: "Beef Fries", price: 2500, icon: <GiFrenchFries />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765520/4h_gnxgay.jpg", desc: "Seasoned loaded fries" },
    ],
  },
  beefBox: {
    id: "beefBox", label: "Beef Combos", icon: <FaBoxOpen className="text-xl" />, accent: "#E67E22",
    items: [
      { name: "Beef Burger & Chips & Fanta", price: 4700, icon: <FaHamburger />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765519/1h_eend6j.jpg", desc: "Beef meal combo with cold Fanta" },
      { name: "Double Beef Burger & Chips & Fanta", price: 5700, icon: <FaHamburger />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765518/3h_y5l63w.jpg", desc: "Double beef feast with drink" },
      { name: "Beef Fries & Fanta", price: 3700, icon: <GiFrenchFries />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765518/5h_lehezc.jpg", desc: "Loaded fries with Fanta" },
    ],
  },
  pilau: {
    id: "pilau", label: "Pilau & Wraps", icon: <GiMeal className="text-xl" />, accent: "#27AE60",
    items: [
      { name: "MadRolex", price: 2500, icon: <GiMeal />, image: null, desc: "Rwandan-style rolex wrap — local favorite" },
      { name: "Beef Wrap & Chips", price: 3500, icon: <GiMeal />, image: null, desc: "Spiced beef wrap with crispy chips" },
      { name: "Chicken Wrap & Chips", price: 4000, icon: <GiMeal />, image: null, desc: "Tender chicken wrap with chips" },
      { name: "Shawarma", price: 4000, icon: <GiMeal />, image: null, desc: "Packed shawarma with sauces" },
      { name: "Pilau with Meat", price: 4000, icon: <GiMeal />, image: null, desc: "Spiced rice with tender meat" },
      { name: "Pilau without Meat", price: 3500, icon: <GiMeal />, image: null, desc: "Aromatic spiced rice" },
    ],
  },
  extras: {
    id: "extras", label: "Extras", icon: <FaPlus className="text-xl" />, accent: "#8E44AD",
    items: [
      { name: "Sauces", price: 1000, icon: <MdFastfood />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765518/2hh_lotcth.jpg", desc: "Choice of dipping sauces" },
      { name: "Cheese", price: 500, icon: <MdFastfood />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765516/1hh_u5cfeq.jpg", desc: "Add melted cheese to any item" },
      { name: "Fanta", price: 1200, icon: <MdLocalDrink />, image: "https://res.cloudinary.com/dmqwlcjec/image/upload/v1778765518/2hh_lotcth.jpg", desc: "Cold refreshing Fanta" },
    ],
  },
};

const LIGHT_BG = `
  radial-gradient(ellipse at 8% 20%, rgba(245,166,35,0.18) 0%, transparent 50%),
  radial-gradient(ellipse at 85% 75%, rgba(214,43,43,0.14) 0%, transparent 50%),
  #FAF5EE
`;

const CHALK_BG_STYLE = {
  backgroundColor: "#0a0a0a",
  backgroundImage: `
    radial-gradient(ellipse at 50% 40%, rgba(30,25,20,0.0) 0%, rgba(0,0,0,0.55) 100%),
    repeating-linear-gradient(
      127deg,
      transparent 0px,
      transparent 38px,
      rgba(255,255,255,0.013) 38px,
      rgba(255,255,255,0.013) 39px,
      transparent 39px,
      transparent 74px,
      rgba(255,255,255,0.008) 74px,
      rgba(255,255,255,0.008) 75px
    ),
    repeating-linear-gradient(
      47deg,
      transparent 0px,
      transparent 55px,
      rgba(255,255,255,0.007) 55px,
      rgba(255,255,255,0.007) 56px
    ),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E"),
    radial-gradient(ellipse at 15% 80%, rgba(214,43,43,0.06) 0%, transparent 45%),
    radial-gradient(ellipse at 85% 15%, rgba(245,166,35,0.05) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 50%, rgba(20,15,10,0) 30%, rgba(5,3,2,0.7) 100%)
  `,
};

const navSections = ["home", "menu", "about", "contact"];
function fmt(p) { return `${p.toLocaleString()} RWF`; }

function whatsappOrder(items) {
  const list = items.map((i) => `• ${i.name} — ${fmt(i.price)}`).join("\n");
  const total = items.reduce((s, i) => s + i.price, 0);
  const msg = encodeURIComponent(
    `Hello Mad Burning! 🔥\n\nI'd like to order:\n${list}\n\nTotal: ${fmt(total)}\n\nPlease confirm. Thank you!`
  );
  window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
}

// ─────────────────────────────────────────────────────────────────
// FOOD CARD – shows image if "image" is set, otherwise shows icon
// ─────────────────────────────────────────────────────────────────
const FoodCard = ({ item, onAdd }) => {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:shadow-[0_6px_30px_rgba(214,43,43,0.22)]">
      <div className="relative h-24 sm:h-44 bg-gradient-to-br from-red-950/70 to-amber-900/25 flex items-center justify-center overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-4xl sm:text-6xl text-amber-400/90 transition-transform duration-300 group-hover:scale-110 drop-shadow">
            {item.icon}
          </span>
        )}
        <div className="absolute top-1.5 right-1.5 bg-gradient-to-r from-amber-500 to-red-600 text-white text-[0.5rem] sm:text-[0.55rem] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5 tracking-wide">
          <FaFire size={7} /> FIRE
        </div>
      </div>
      <div className="p-2.5 sm:p-4">
        <h3 className="font-bold text-gray-100 text-[0.7rem] sm:text-sm leading-snug line-clamp-2 mb-1 sm:mb-2">
          {item.name}
        </h3>
        <p className="hidden sm:block text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
          {item.desc}
        </p>
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-amber-400 font-black text-xs sm:text-base whitespace-nowrap">
            {fmt(item.price)}
          </span>
          <button
            onClick={handleAdd}
            className={`
              flex-shrink-0 px-2.5 sm:px-4 py-1 sm:py-1.5
              rounded-md text-[0.62rem] sm:text-xs font-bold tracking-wide
              transition-all duration-200
              ${added
                ? "bg-green-600 text-white scale-95"
                : "bg-gradient-to-r from-[#F5A623] to-[#D62B2B] text-white hover:brightness-110 hover:shadow-[0_0_10px_rgba(245,166,35,0.45)] active:scale-95"
              }
            `}
          >
            {added ? "✓" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MadBurning() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("chicken");
  const [toast, setToast] = useState(null);
  const [activeNav, setActiveNav] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const tabsContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      for (const id of navSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) { setActiveNav(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const checkScrollButtons = () => {
    const c = tabsContainerRef.current;
    if (c) {
      setShowLeftArrow(c.scrollLeft > 0);
      setShowRightArrow(c.scrollLeft + c.clientWidth < c.scrollWidth - 5);
    }
  };

  const scrollTabs = (dir) => {
    const c = tabsContainerRef.current;
    if (c) {
      c.scrollBy({ left: dir === "left" ? -180 : 180, behavior: "smooth" });
      setTimeout(checkScrollButtons, 200);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, [activeMenu]);

  useEffect(() => {
    setTimeout(() => {
      const c = tabsContainerRef.current;
      const btn = c?.querySelector(`[data-cat="${activeMenu}"]`);
      if (btn) btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      checkScrollButtons();
    }, 60);
  }, [activeMenu]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const addToCart = (item) => {
    setCart((prev) => [...prev, { ...item, cartId: Date.now() + Math.random() }]);
    setToast(`${item.name} added!`);
    setTimeout(() => setToast(null), 2000);
  };
  const removeFromCart = (cartId) => setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  const total = cart.reduce((s, i) => s + i.price, 0);
  const currentCategory = menuData[activeMenu];
  const onLightBg = !scrolled;

  return (
    <div className="font-sans min-h-screen overflow-x-hidden">

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg z-50 whitespace-nowrap animate-fade-in">
          {toast}
        </div>
      )}

      {/* FIXED NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.6)] border-white/5"
            : "bg-[#FAF5EE]/85 backdrop-blur-sm border-[#e8d8c4]/60"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollTo("home")}>
            <img src={LOGO_URL} alt="Mad Burning Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
            <span className="font-black text-lg sm:text-xl tracking-tight">
              <span className={onLightBg ? "text-[#111]" : "text-white"}>Mad</span>
              <span className="text-[#F5A623]">Burning</span>
            </span>
          </div>

          <div className="hidden md:flex gap-1">
            {[["home","Home"],["menu","Menu"],["about","About"],["contact","Contact"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeNav === id
                    ? "bg-[#D62B2B]/10 text-[#D62B2B]"
                    : onLightBg
                      ? "text-gray-600 hover:text-[#D62B2B] hover:bg-red-50"
                      : "text-gray-400 hover:text-[#F5A623] hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="bg-gradient-to-r from-[#D62B2B] to-[#F5A623] text-white rounded-full px-3 sm:px-4 py-1.5 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] hover:scale-105 transition-all duration-300"
          >
            <FaShoppingCart size={13} />
            Cart
            {cart.length > 0 && (
              <span className="bg-white text-[#D62B2B] rounded-full w-4 h-4 sm:w-5 sm:h-5 text-[0.6rem] font-black inline-flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className="h-[52px] sm:h-[60px]" /> {/* spacer for fixed navbar */}

      {/* HERO SECTION */}
      <section id="home" className="relative overflow-hidden" style={{ background: LIGHT_BG }}>
        <div className="absolute top-[-60px] left-[-60px] w-[350px] h-[350px] rounded-full bg-amber-400/10 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-40px] w-[300px] h-[300px] rounded-full bg-red-600/10 blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-4 sm:gap-10 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-red-100 text-[#D62B2B] rounded-full px-4 py-1 text-xs font-bold mb-3 sm:mb-4 border border-red-200">
              🔥 Kigali's Hottest Fast Food
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight text-[#111]">
              Taste the{" "}
              <span className="bg-gradient-to-r from-[#D62B2B] via-[#E8380D] to-[#F5A623] bg-clip-text text-transparent">
                Fire!
              </span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg max-w-md mx-auto md:mx-0 mt-3 sm:mt-4 leading-relaxed">
              Mad Burning Fast Food — bold flavors, crispy burgers, loaded wraps. Open daily in Kanombe Sector.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4 sm:mt-6">
              <button
                onClick={() => scrollTo("menu")}
                className="bg-gradient-to-r from-[#D62B2B] to-[#F5A623] text-white rounded-full px-7 sm:px-8 py-3 font-bold shadow-lg hover:shadow-[0_0_30px_rgba(245,166,35,0.55)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Order Now <FaHamburger />
              </button>
              <a
                href={`tel:+${PHONE}`}
                className="border-2 border-[#D62B2B]/40 text-[#D62B2B] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-red-50 hover:border-[#D62B2B] transition flex items-center gap-2"
              >
                <FaPhone /> Call Us
              </a>
            </div>
            <div className="hidden sm:flex flex-wrap gap-2 justify-center md:justify-start mt-5 text-gray-500 text-xs">
              <span className="bg-white/70 border border-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                <FaMapMarkerAlt className="text-[#D62B2B]" /> Kanombe Sector
              </span>
              <span className="bg-white/70 border border-gray-200 px-3 py-1 rounded-full flex items-center gap-1">
                <FaClock className="text-[#D62B2B]" /> 10:30am – 10:30pm
              </span>
              <span className="bg-white/70 border border-gray-200 px-3 py-1 rounded-full">7 Days a Week</span>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={LOGO_URL}
              alt="Mad Burning Fast Food"
              className="w-32 h-32 sm:w-56 sm:h-56 md:w-96 md:h-96 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* MENU SECTION – chalkboard texture */}
      <section
        id="menu"
        className="py-10 sm:py-16 px-4 relative"
        style={CHALK_BG_STYLE}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.6,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-amber-900/8 blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-amber-500/80 tracking-widest uppercase">— What We Serve —</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
              Our Menu
            </h2>
            <p className="text-gray-500 text-sm mt-1">Tap any item to add to cart</p>
          </div>

          {/* STICKY CATEGORY TABS */}
          <div
            className="sticky top-[52px] sm:top-[60px] z-30 py-3"
            style={{ background: "linear-gradient(180deg, #0a0a0a 75%, transparent)" }}
          >
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollTabs("left")}
                aria-hidden={!showLeftArrow}
                className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/10 text-amber-400 transition-all duration-200 hover:bg-white/20 ${
                  showLeftArrow ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <FaArrowLeft size={11} />
              </button>

              <div
                ref={tabsContainerRef}
                onScroll={checkScrollButtons}
                className="flex-1 flex overflow-x-auto gap-1.5 sm:gap-2 hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", justifyContent: "safe center" }}
              >
                {Object.values(menuData).map((cat) => (
                  <button
                    key={cat.id}
                    data-cat={cat.id}
                    onClick={() => setActiveMenu(cat.id)}
                    className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-[0.7rem] sm:text-sm transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                      activeMenu === cat.id
                        ? "bg-gradient-to-r from-[#F5A623] to-[#D62B2B] text-white shadow-[0_0_14px_rgba(245,166,35,0.4)]"
                        : "bg-white/8 text-gray-400 hover:bg-white/15 hover:text-white border border-white/10"
                    }`}
                  >
                    <span className="text-[0.8rem] sm:text-base">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollTabs("right")}
                aria-hidden={!showRightArrow}
                className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/10 text-amber-400 transition-all duration-200 hover:bg-white/20 ${
                  showRightArrow ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <FaArrowRight size={11} />
              </button>
            </div>
          </div>

          {/* Active category label */}
          <div className="rounded-xl px-3 sm:px-4 py-2.5 mb-4 sm:mb-5 flex items-center gap-3 bg-white/4 border border-white/8"
               style={{ backdropFilter: "blur(4px)" }}>
            <span className="text-lg sm:text-2xl text-amber-400">{currentCategory.icon}</span>
            <span className="font-black text-white text-sm sm:text-lg">{currentCategory.label}</span>
            <span className="ml-auto text-xs text-gray-500">{currentCategory.items.length} items</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {currentCategory.items.map((item, idx) => (
              <FoodCard key={idx} item={item} onAdd={() => addToCart(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="py-16 sm:py-20 px-4 relative overflow-hidden"
        style={{ background: LIGHT_BG }}
      >
        <div className="absolute top-[-40px] left-[-40px] w-[300px] h-[300px] rounded-full bg-amber-400/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-40px] w-[250px] h-[250px] rounded-full bg-red-600/8 blur-[70px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs font-bold text-[#D62B2B] tracking-widest uppercase">Who We Are</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111] mt-2">About Us</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#D62B2B] to-[#F5A623] rounded-full mx-auto mt-4" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 sm:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-[#111] mb-4">Mad Burning Fast Food</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We started with one mission: bring fire-level flavor to Kigali. Every burger, every wrap, every combo is
                made with passion and seasoned to perfection. Based in Kanombe Sector — come taste what the hype is about.
              </p>
              <div className="flex justify-center md:justify-start gap-5 sm:gap-6 mt-7">
                {[
                  [<FaHamburger key="h" />, "Burgers"],
                  [<GiMeal key="m" />, "Wraps"],
                  [<FaBoxOpen key="b" />, "Combos"],
                  [<MdLocalDrink key="d" />, "Drinks"],
                ].map(([icon, label]) => (
                  <div key={label} className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-red-100 shadow-sm flex items-center justify-center text-lg sm:text-xl text-[#D62B2B] mb-1.5 mx-auto">
                      {icon}
                    </div>
                    <div className="text-xs text-gray-500 font-semibold">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 w-56 sm:w-64 md:w-72">
              <div
                className="rounded-3xl p-6 sm:p-8 text-center shadow-xl border border-red-100"
                style={{ background: "linear-gradient(135deg, rgba(214,43,43,0.06) 0%, rgba(245,166,35,0.06) 100%)" }}
              >
                <img src={LOGO_URL} alt="Mad Burning" className="w-24 sm:w-28 h-24 sm:h-28 object-contain mx-auto mb-4 drop-shadow-lg" />
                <p className="font-black text-[#111] text-base sm:text-lg leading-tight">Kigali's<br />Hottest Spot 🔥</p>
                <p className="text-gray-500 text-xs mt-2">Kanombe Sector · Open Daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / FIND US – with MoMo icon fixed to FaMobileAlt */}
      <section
        id="contact"
        className="relative overflow-hidden py-16 sm:py-20 px-4"
        style={{ background: LIGHT_BG }}
      >
        <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-amber-400/12 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-40px] w-[250px] h-[250px] rounded-full bg-red-600/8 blur-[70px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold text-[#D62B2B] tracking-widest uppercase">Come See Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111] mt-2">Find Us</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#D62B2B] to-[#F5A623] rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
            {[
              [<FaMapMarkerAlt key="map" />, "Location", "Kanombe Sector\nKigali, Rwanda"],
              [<FaClock key="clk" />, "Hours", "Mon–Sun\n10:30am – 10:30pm"],
              [<FaPhone key="ph" />, "Phone", "0796 899 214"],
              [<FaMobileAlt key="momo" />, "MoMo", "004421\nMADBURNING"],   // <-- fixed icon
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-5 text-center border border-red-100 hover:border-[#D62B2B]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-[#D62B2B]">{icon}</div>
                <div className="font-bold text-xs sm:text-sm text-[#111] mb-1">{title}</div>
                <div className="text-xs text-gray-500 whitespace-pre-line leading-relaxed">{text}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center border border-red-100 shadow-sm">
            <p className="text-[#111] text-base sm:text-lg font-semibold mb-2">Ready to order?</p>
            <p className="text-gray-500 text-sm mb-5 sm:mb-6">We're just a WhatsApp away — fast and easy!</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => whatsappOrder(cart.length ? cart : [{ name: "Custom Order", price: 0 }])}
                className="bg-[#25D366] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm"
              >
                <FaWhatsapp /> Order on WhatsApp
              </button>
              <a
                href={`tel:+${PHONE}`}
                className="border-2 border-[#D62B2B]/40 text-[#D62B2B] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-red-50 hover:border-[#D62B2B] transition flex items-center gap-2 text-sm"
              >
                <FaPhone /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/5 text-center py-6 sm:py-7 text-gray-500 text-xs">
        <div className="flex justify-center items-center gap-1 mb-3">
          <span className="font-black text-white text-sm">Mad</span>
          <span className="font-black text-[#F5A623] text-sm">Burning</span>
          <span className="text-gray-600 text-sm ml-1">· Fast Food</span>
        </div>
        <p className="text-gray-600">© 2026 Mad Burning Fast Food · Kigali, Rwanda · Taste the Fire! 🔥</p>
        <div className="flex justify-center gap-3 mt-3">
          <span className="bg-gray-900 border border-white/5 px-3 py-1 rounded-full flex items-center gap-1.5">
            <FaInstagram className="text-red-400" /> @mad_burning
          </span>
          <span className="bg-gray-900 border border-white/5 px-3 py-1 rounded-full flex items-center gap-1.5">
            <FaTiktok /> @mad_burning
          </span>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center animate-fade-in"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="bg-[#111] border border-white/10 w-full max-w-lg rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-lg text-white">Your Order 🛒</h3>
              <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-white text-xl transition">✕</button>
            </div>
            {cart.length === 0 ? (
              <div className="text-center py-10">
                <FaHamburger className="text-5xl text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500">Your cart is empty.<br />Add something delicious!</p>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex items-center gap-3 bg-white/5 border border-white/8 p-3 rounded-xl">
                      <span className="text-2xl text-amber-400">{item.icon}</span>
                      <span className="flex-1 text-sm font-semibold text-white">{item.name}</span>
                      <span className="text-amber-400 font-black text-sm">{fmt(item.price)}</span>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-gray-600 hover:text-red-400 transition">✕</button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 font-bold text-base mb-4">
                  <span className="text-gray-400">Total</span>
                  <span className="text-amber-400 text-xl">{fmt(total)}</span>
                </div>
                <button
                  onClick={() => { whatsappOrder(cart); setCartOpen(false); }}
                  className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold mb-2 hover:bg-green-600 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition flex items-center justify-center gap-2"
                >
                  <FaWhatsapp /> Order via WhatsApp 🚀
                </button>
                <button
                  onClick={() => setCart([])}
                  className="w-full border border-white/10 text-gray-500 py-2 rounded-xl text-sm hover:bg-white/5 transition"
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}