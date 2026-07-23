import { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Menu,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle2,
  Truck,
  FileText,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  MessageCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import './App.css';
import { AboutPage } from './AboutPage';
import { FaqPage } from './FaqPage';

// Interfaces
interface Product {
  id: string;
  name: string;
  category: 'writing' | 'office' | 'everyday';
  price: number;
  description: string;
  material: string;
  weight: string;
  image: string;
  inStock: boolean;
  stockCount: number;
  gstAvailable: boolean;
  engravable: boolean;
}

interface QuoteItem {
  product: Product;
  quantity: number;
  engraving: string;
}

// Full 351 products catalog extracted from live storefront
const PRODUCTS: Product[] = [
  {
    "id": "prod_01KPGRDE4E49VHWAB76VWV35C2",
    "name": "Metal Keychain with Custom Print",
    "category": "everyday",
    "price": 349,
    "description": "Keep your keys organized with this high-quality metal keychain featuring a glossy round design. Custom printed with branding, it&#39;s perfect for promotional use or as a practical accessory. Its sturdy metal construction ensures long-lasting usage, while the vibrant print elevates your everyday esse...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/5875db42-a267-43a9-affa-58dd8e89d41e.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KPGRDE0ZH2EZEWQ09N35BV1Z",
    "name": "Custom Printed Metal Keychains",
    "category": "everyday",
    "price": 349,
    "description": "Stand out with these stylish custom printed metal keychains! Ideal for promotions, gifts, or personal branding, each keychain features vibrant, eye-catching prints and durable metal construction. Perfect for businesses, events, or everyday use. Get your logo or message printed and make a memorabl...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e83adc25-cbac-4dd5-996c-080989a22914.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KPGRDDTT02GJGGK4ESMNJWKG",
    "name": "Medinetix Branded Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Showcase your professional style with the Medinetix branded keychain. Crafted from durable metal, this sleek and modern accessory is perfect for keeping your keys organized while highlighting your brand loyalty. Its lightweight design and premium finish make it an ideal gift or everyday essential...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/fcf38111-feb4-4dc5-b73b-740892bd5b11.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KPGRDDSRTX1XTWDFN3RA0VHP",
    "name": "Ortex Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your keys with the Ortex Metal Keychain, featuring a vibrant neon green design and sturdy metal construction. Perfect for adding a pop of color and ensuring your keys stay organized. Ideal for daily use or as a thoughtful gift.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8f85fd6d-5bbb-489e-aa46-75f344b86c44.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KPGRDDS1CCK43H5T0VSJEYS7",
    "name": "Titan Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday essentials with this elegant Titan Metal Keychain. Featuring a sleek rectangular design with the iconic Titan logo, it’s perfect for organizing your keys in style. Durable, lightweight, and a great gift for Titan lovers.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/fd21ea04-6611-449c-87df-c44498cbc0ba.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KPGRDDR5MAGZZ8994S88AV07",
    "name": "Mahindra Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Show your pride with this stylish Mahindra metal keychain. Featuring a sleek blue finish and sturdy metal ring, it&#39;s perfect for keeping your keys safe and organized while representing your favorite brand. Ideal for Mahindra car owners and fans alike.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ddb60ffd-dd48-48bc-b9c2-71fbca186709.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KPGRDDQ541V4P57BF1M8XGM4",
    "name": "Polo Arrow Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of elegance to your daily essentials with the Polo Arrow Keychain. Crafted from durable metal with a sleek arrow design, it is perfect for keeping your keys organized. The attractive &#39;Polo&#39; branding makes it a great gift for car lovers and style enthusiasts.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d6bcb811-4329-4acd-9c43-f638c6d5c3df.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPRTQZ52ZVAR02ACYSN7WC",
    "name": "Gold-Rimmed Black Compact Mirror",
    "category": "everyday",
    "price": 899,
    "description": "This compact mirror features a sleek black center with a stunning gold rim, providing a luxurious look that fits perfectly in your purse or pocket. Ideal for quick makeup touch-ups and on-the-go grooming, it combines both style and functionality. Its sturdy build and reflective clarity make it an...",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "85 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/23d5d71e-528f-46b2-8d56-a62b8fff476a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMPRTPT7GNHVBADG3PWAFJ8",
    "name": "Elegant Gold-Plated Wall Hook",
    "category": "office",
    "price": 699,
    "description": "Upgrade your décor with this elegant gold-plated wall hook, featuring a sleek circular design with a glossy black center. Perfect for modern homes and offices, it serves as both a functional and stylish accent piece for hanging keys, hats, or purses. Durable and easy to install, it combines aesth...",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/842e4510-2df4-4a6e-a1cb-ffb1939f7dc5.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMPRTP4DDCT35Y4E8VFDC6V",
    "name": "Luxury Round Wall Decor",
    "category": "everyday",
    "price": 2499,
    "description": "Enhance your space with this luxury round wall decor piece featuring a striking black center surrounded by a polished gold frame. Perfect for living rooms, bedrooms, or office spaces, this decor item instantly elevates any wall with a touch of modern elegance. Durable, easy to hang, and visually ...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/173b2115-de45-45ec-bfd0-62701040ed03.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMPRTJCY30KFZ47K77G101D",
    "name": "Black Ceramic Coaster",
    "category": "everyday",
    "price": 499,
    "description": "Add a touch of sophistication to your table with this Black Ceramic Coaster. Featuring a sleek black surface with a golden edge, this coaster blends style and functionality, protecting your surfaces from heat and moisture. Perfect for homes, offices, or as a gift.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/fdfd403c-da8a-45d4-91b3-e0d48a345c06.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMPRTD6CGH32B8MTYKF982Z",
    "name": "Gold Bar Paper Weight",
    "category": "office",
    "price": 12500,
    "description": "Invest in excellence with this 1 Kg gold bar featuring 999.9 purity. Perfect for secure savings, gifting, or collectibles, this solid gold bar offers outstanding value and reliability. Ideal for investors looking to add a premium asset to their portfolio. Certified quality for peace of mind.",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM%2Fassets%2F0f786d92-46c4-4b09-b19d-795dc4785c0d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPRTDB4KDE9BK92FFNP0DG",
    "name": "Metal Card Holder",
    "category": "office",
    "price": 1299,
    "description": "Elevate your professional style with this sleek metal card holder featuring a luxurious gold finish. Designed to keep your business cards organized and protected, its compact and lightweight build fits easily in your pocket or bag. Make a lasting impression at meetings with this modern, elegant a...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a2c8a4ee-68c4-4616-981f-67210c0b5d14.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPRTCTGZDVH8FH3XQM09X8",
    "name": "Pure Gold Bar 1000g",
    "category": "office",
    "price": 85000,
    "description": "Invest in timeless value with this Pure Gold Bar weighing 1000 grams. Ideal for high-value investors and collectors, this bar boasts 999.9 fine gold purity, making it a secure asset for your portfolio or a prestigious gift. Securely packaged for protection and authenticity.",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "1000 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/94034e88-d0fa-47b5-b37e-bc83aabd2802.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPRTCJTM890AVA90JTR7XQ",
    "name": "Whiteboard Eraser",
    "category": "office",
    "price": 199,
    "description": "Easily clean whiteboards or blackboards with this lightweight and portable eraser. The soft felt surface removes marker or chalk residue without damaging the board, making it perfect for classrooms, offices, and homes. Ergonomic design ensures comfortable grip and efficient cleaning every time.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/847d957a-622c-4b55-9c84-5ade807baf0e.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMPRTAXBPD4W7BJKDG6KQPA",
    "name": "Gold Metal Card Holder",
    "category": "office",
    "price": 1299,
    "description": "Keep your business and credit cards organized with this stylish gold metal card holder. Its slim and lightweight design makes it perfect for your pocket or bag, and the metallic finish adds a sophisticated touch to your professional look. Ideal for daily use or as a gift for executives.",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/5bba6a8e-6bac-4e9c-a82c-fe3aad523424.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPP41D4VXW1J53M2W635EC",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your daily essentials with this stylish round metal keychain featuring a sturdy ring and a sleek, reflective surface. Perfect for organizing your keys or adding a touch of sophistication to your bag. Durable, lightweight, and ideal for gifting.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/61131a5c-a9eb-4220-8e6d-b7468c26b2d7.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPP41JTM01QRFXFN29DT03",
    "name": "Vintage Oval Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of sophistication to your keys with this stylish vintage oval metal keychain. Featuring a durable silver-toned frame with a classic black center, this keychain is perfect for daily use or as a thoughtful gift. Its sturdy construction ensures your keys stay secure while adding a unique...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/71edd2f2-559f-4968-a544-af9e49c0e614.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPP404SQHM6BZRA8GGY8G7",
    "name": "Metallic Round Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this metallic round keychain. Crafted from high-quality metal, it offers a sleek and elegant look, perfect for holding your keys securely and in style. Its lightweight design and robust construction ensure long-lasting use. Ideal for personal use or as a thou...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/94f1dc2a-6c95-4854-ae58-d1728d283d57.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPP3ZEWYQVXAKV49TYD805",
    "name": "Elegant Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your accessory collection with this elegant metal keychain featuring a sleek oval design with a black centerpiece. Perfect for keeping your keys organized and adding a touch of sophistication to your everyday routine. Durable and lightweight, it makes an ideal gift for friends and family.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e1082b4d-b990-4d01-99a4-bb5b7088e27b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPP3R1B91GK1GB0TEYMN71",
    "name": "Black Stone Silver Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your style with this sophisticated black stone silver keychain. Featuring a sleek oval black stone set in a polished silver frame, this accessory is both functional and fashionable. Perfect for attaching to your keys, bags, or as a unique gift for loved ones. Durable and designed to stand...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a726a9ae-4fc3-44a4-b6aa-56f3081f1aaa.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPP3R85ATAFG2H5V37H3ZZ",
    "name": "Metallic Round Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday carry with this stylish metallic round keychain. Crafted from high-quality metal, it’s perfect for holding your keys securely while adding a touch of elegance to your keyring. The smooth, blank surface is ideal for personalization—add your name, logo, or favorite design and ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/383fbd6b-65f1-46fb-b7c3-121cb25b71e2.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPP3QAENFH7V9JFQ16C6HX",
    "name": "Metal Keychain with Black Center",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of style and sophistication to your everyday essentials with this Metal Keychain featuring a sleek black center and a sturdy silver finish. Its unique gear-like shape makes it an eye-catching accessory for keys, bags, or gifts. Built to last and perfect for daily use or gifting.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/850373f0-0ab2-4fc2-ae60-99cd00df77d9.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPP3MZRKCDS4P0AA6KR7SS",
    "name": "Metallic Rectangle Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your style with this premium metallic rectangle keychain. Featuring a modern black panel design and sturdy metal construction, it’s perfect for organizing your keys or adding a personal touch to your everyday essentials. Durable, lightweight, and ideal for custom engraving or gifting.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0dad4985-9d63-4e76-859f-3111653a790a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPP3MTNAARH3WFA6J1ZN3C",
    "name": "Metal Rectangle Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this stylish metal rectangle keychain. Featuring a sleek black face and durable silver-toned construction, it&#39;s perfect for organizing and carrying your keys. Compact, lightweight, and designed for both men and women, it adds a touch of sophistication to your...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/65afc2ce-5e74-47b6-bd8d-3d39b4539436.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPMSN4JBMBB3D5SC5FYYHG",
    "name": "Metal Rectangle Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday essentials with this stylish Metal Rectangle Keychain. Crafted from durable, shiny metal, its sleek geometry adds a modern touch to your keys or bag. Lightweight, sturdy, and rust-resistant, this keyring is perfect for daily use or as a thoughtful gift.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/80dd6fb6-c088-41e4-8ef4-525b410a234f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPMSKWWWWGPZ8M4BJCGW93",
    "name": "Metal Rotating Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This premium metal rotating keychain combines modern style with functionality. The sturdy metallic build ensures long-lasting use, while the unique rotating design adds a playful yet elegant touch to your daily essentials. Perfect for organizing your keys or gifting to friends.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c3398327-a83b-4f4e-b1e7-30ff80d85ac7.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPMSKATWDW1WVBHBP2GDH9",
    "name": "Rectangular Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this sleek rectangular metal keychain. Perfect for daily use, its sturdy metal construction ensures durability while the classic silver finish adds a touch of elegance. Its blank center panel is great for customization, making it ideal for gifts or promotion...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/dd09303e-3ab3-4b5a-b9a6-e7a36c04463c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPMSJXMQMJR5DBW8YD9Z3C",
    "name": "Metal Oval Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of elegance to your keys with this stylish metal oval keychain. Crafted from premium quality metal, it features a smooth, polished surface for a modern look. Its sturdy build ensures longevity, making it perfect for everyday use or gifting. Carry your keys in style or personalize it f...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/3d82da27-811f-4087-91b5-f38e1a946902.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPMSJ2CD3X4V64SK348X3H",
    "name": "Metallic Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Stylish and sturdy metallic keychain with a sleek rectangular design, perfect for organizing your keys in style. Crafted with a polished metal frame and a smooth white insert, it fits easily in your pocket or bag. Ideal for personal use or gifting.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d37b5685-bf0e-4313-bd13-737400d2884d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPMSABS4NTRWT7JH5T5M0H",
    "name": "Metal Mirror Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This stylish metal mirror keychain is a perfect blend of elegance and utility. Carry your keys with ease and check your reflection on-the-go. Its sturdy metal build ensures durability, making it an excellent gift or personal accessory for everyday use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f3f13b74-ff91-416a-9ba7-fd0552d74512.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPMSA3W9HMGFZH3B6350W4",
    "name": "Round Keychain Mirror",
    "category": "everyday",
    "price": 299,
    "description": "Carry style and convenience wherever you go with this sleek round keychain mirror. Designed for quick touch-ups and easy access, it features a sturdy metal frame and a handy keyring. Perfect for personal use or gifting, it combines functionality with portable charm.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b8628c87-6967-4f24-bb64-8baf9c5bd7b7.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPMS899DMAV3ZWH28ASGAD",
    "name": "Rectangular Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized and stylish with this sleek rectangular keychain. Featuring a durable metal ring and a modern, minimalist design, it&#39;s perfect for everyday use. Lightweight and portable, this keychain makes a great gift or a practical addition to your collection.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f5d3d07f-70f0-4858-9f6f-5cf07760e261.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPMS8QAS1TT7M677M1BE56",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this sleek round metal keychain. Crafted from high-quality stainless steel, it features a polished finish for a sophisticated look. Perfect for gifting or everyday use, it adds a touch of elegance to your essentials. Lightweight and durable, this keychain is...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/6e90ad7e-6464-4502-8528-f5718932a4a8.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPMS778ZA9ENGECRDQGZJ5",
    "name": "Metal Rectangle Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday carry with this sleek metal rectangle keychain. Crafted for durability and designed with a minimalist flair, it keeps your keys organized and easily accessible. Perfect for gifts or personal use, the sturdy frame ensures lasting quality. Enhance your style with this must-hav...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b171484d-e8de-4e79-879f-d70f919a8937.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPKFGHQ441EMA2TBD45MA2",
    "name": "Silver Geometric Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this stylish silver geometric keychain. Crafted from durable metal with a sleek rectangular design, it adds a contemporary touch to your keys or bags. Perfect for gifting or personal use, its robust construction ensures longevity and its minimalistic look sui...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/01c9fc7a-94c0-473b-86a8-4961c578a9e0.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPKFG2PMAJPPYRDCNNCKNX",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal keychain is crafted for durability and style. Its polished finish adds a touch of sophistication, making it perfect for keeping your keys secure and easy to find. Ideal for everyday use or as a gift for friends and family.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/5282bea7-15d6-4d14-a323-c4682ec05c26.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPKFF3NW1FV5P0PY0GWXJB",
    "name": "Metal Rectangle Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this sleek metal rectangle keychain. Featuring a sturdy build and a minimalist design, it keeps your keys organized and adds a touch of style. Perfect for personalization or gifting to friends and family.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a128ed1b-cfc7-47e6-89da-05765c46c4e4.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPKFEGMA40TBVEKC6TE922",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of elegance to your everyday essentials with this sleek metal keychain. Durable and lightweight, it features a modern rectangular design that keeps your keys secure and easy to find. Perfect as a gift or for personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/bc8ac3da-1a9f-4db4-a601-1cc41b797176.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPKFERZ9Y3K9HTE0JF5HAW",
    "name": "Metal Rectangular Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Enhance your everyday carry with this sleek metal rectangular keychain. Designed with a sturdy frame and polished finish, it&#39;s perfect for securing your keys and adding a touch of elegance to your accessories. Ideal for gifting or personal use, this keychain is lightweight, rust-resistant, and ea...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/beed246c-b17c-4049-9aa9-51d02f5701e8.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPKF6A3R38CT6RNAD7SR0E",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday style with this sleek round metal keychain. Featuring a polished finish and a sturdy design, it&#39;s perfect for securing your keys and adding a touch of elegance to your essentials. Ideal for gifting or personal use, it is lightweight and fits comfortably in your pocket or bag.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/7c978724-8b73-403d-86e7-76576f061ba8.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPKF5AERGBGCC07V9T6R93",
    "name": "Metal Rectangular Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal rectangular keychain adds a touch of elegance and practicality to your everyday essentials. Perfect for car keys, office fobs, or home keys, its sturdy construction ensures long-lasting use. The blank area allows for easy customization, making it suitable for gifts or promotional...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/389753d4-ff5f-40ac-b087-37ba2e6709a9.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPKF5GVDC3X4KGJDNGXWK8",
    "name": "Metal Round Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys secure and stylish with this metal round keychain. Crafted from high-quality metal, its polished finish adds a modern touch to your everyday carry. Lightweight and durable, it’s perfect for personal use or as a thoughtful gift. Attach it easily to your bag or key set and enjoy both...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ac34408f-127c-40ec-a7bc-24ca5bc3f962.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPKF5314E7GS7MXF6AEP5C",
    "name": "Rectangular Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this sleek rectangular metal keychain. Its modern design is perfect for everyday use and makes it easy to find your keys in your bag. Lightweight and sturdy, it adds a touch of elegance to your accessories collection. Perfect as a gift or for personal use!",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/2bd4ea12-6fb7-480b-961e-73e10a43ee79.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPKF3PXRJ0ZQEQ679Q1WER",
    "name": "Round Keychain Mirror",
    "category": "everyday",
    "price": 299,
    "description": "Stay stylish and prepared on the go with this sleek round keychain mirror. Perfect for quick touch-ups, its durable metal design ensures longevity, while the convenient keyring makes it easy to attach to your keys or bag. A must-have accessory for anyone who values practicality and elegance.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f527cbe9-8e64-4ada-a5cd-bffdc78d53b4.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPJCDQ8G9HCP35AZBGGV0Q",
    "name": "Round Silver Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this premium round silver keychain. Featuring a sleek mirror-finish center and durable metal frame, this keychain adds a touch of sophistication to your everyday essentials. Perfect for gifting or personal use, enhance your accessory collection with this pra...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/891c038c-8396-4986-bc4a-8042cebfca46.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPJCCR2TYKPW61VCNNWW8B",
    "name": "Silver Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your keys with this stylish silver metal keychain. Featuring a sleek round design and durable finish, it adds a touch of sophistication to your everyday essentials. The sturdy ring ensures your keys stay secure, making it a perfect choice for gifting or personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8784edfa-bed1-46b1-bb97-1b0855f200ee.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPJCBR40GB95JKKGADVRY5",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal keychain combines sturdy construction with a modern design to keep your keys secure and easily accessible. Perfect for everyday use, it fits comfortably in your pocket or bag. Its polished finish adds a touch of elegance to your key collection, making it a great gift for friends ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e812a925-a2f6-4c92-9776-48e807ac5810.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPJCATNZEVMNJPSW2Z513Y",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This round metal keychain features a sleek black center and a polished finish, making it a stylish accessory for your keys or bag. Durable and lightweight, it’s perfect for everyday use and easy gifting. Enhance your daily essentials with this chic keychain.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a79a3a98-5b16-4eef-810f-adb42e25196c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPJCA39QPN00DW5GRGX7ZD",
    "name": "Round Black Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your keys with this sleek and durable round black metal keychain. Its minimalist design suits any style, making it perfect for personal use or as a thoughtful gift. The sturdy ring ensures your keys stay safe and secure, while the elegant black finish adds a touch of sophistication.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c5f1e2b1-f4df-4165-b269-aec047df7616.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPJC28M5AM5BF6NVBYWKMG",
    "name": "Metal Mirror Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Stay stylish and prepared on the go with this Metal Mirror Keychain! Featuring a sleek, durable metal frame and a handy compact mirror, it&#39;s perfect for quick checks and touch-ups anytime, anywhere. Lightweight and portable, this keychain keeps your keys organized and adds a touch of elegance to ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/2926ed77-f287-4ef8-817f-d95e26008318.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPJC2PDVT0MEQNRQ8JFDN1",
    "name": "Yellow Leather Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this sleek yellow leather keychain. Durable and lightweight, it&#39;s perfect for organizing your keys with a pop of color. Ideal for personal use or as a thoughtful gift.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ea81867d-29fe-424b-a1f7-f747ea6587e6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPJC1P6KZFE4XNV5J1R07J",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this sleek metal keychain. Featuring a modern rectangular design with a smooth black surface, it&#39;s perfect for gifting or daily use. Durable and lightweight, it adds a touch of sophistication to your essentials.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c3720e93-5553-4032-b39f-116e3ecb49ee.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPJC1590QAJHW3K8397ED1",
    "name": "Metal Oval Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this sleek oval metal keychain. Featuring a sturdy metal construction and elegant design, it&#39;s perfect for everyday use or as a thoughtful gift. The smooth surface is ideal for custom engraving or personal touch. Carry your essentials with a touch of sophist...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/283099cb-b329-4ede-b712-733b5d7ed0a4.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPJC0EEWXW05627R6HA9T2",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this round metal keychain. Made from high-quality stainless steel, it&#39;s designed for durability and longevity. Its sleek, polished appearance makes it a perfect accessory for your everyday essentials or a thoughtful gift for loved ones. Lightweight and compa...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/165eb6d5-3ce1-45b0-aeb3-0cb773df397a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPH7HFBADF2P36YPAD70EX",
    "name": "Classic Wooden Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of sophistication to your accessories with this Classic Wooden Keychain. Crafted from quality wood with a sturdy metal ring, it is designed to keep your keys organized while adding a minimalistic yet stylish look. Perfect as a gift or for personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/cd20af96-5cd5-46bc-8573-0652d70edfa6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPH7D5H1JNV2MMF79MZCFQ",
    "name": "Metal Keychain Ring",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this premium metal keychain ring. Featuring a sleek, polished finish and sturdy construction, this key holder adds a touch of elegance to your daily essentials. Lightweight and compact, it&#39;s perfect for house keys, car keys, and more. Makes an excellent gift or perso...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d7e19b57-6fca-4a1e-84d9-d4b4c3f49c0e.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPH7DDWFB2T0T2FKSSWX4M",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of style to your everyday essentials with this round metal keychain. Crafted with a shiny metal body and a small circular mirror inset, it&#39;s perfect for keeping your keys organized and easy to find. Durable, lightweight, and suitable for gifting or personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b0670c73-d419-436c-9dd4-3d3112c7c23d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPH7BQ7BSE8ZRXGJDFRHJX",
    "name": "Metal Round Keychain with Mirror",
    "category": "everyday",
    "price": 299,
    "description": "This stylish metal keychain combines practicality with elegance, featuring a durable ring and a built-in mini mirror for on-the-go touch-ups. Perfect for keeping your keys organized while adding a touch of sophistication to your daily routine. A great gift option for friends and family!",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0587d634-554a-4706-8c2b-3d4d0382bc09.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPH7A3VA8JKWMM3CFAWWBX",
    "name": "Metal Keychain with Mirror",
    "category": "everyday",
    "price": 299,
    "description": "This stylish metal keychain features a compact round design and includes a built-in mini mirror, making it both practical and elegant. Perfect for daily use, it helps you keep your keys organized while offering a convenient mirror for quick touch-ups. Its durable construction ensures long-lasting...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/6cd553d6-5128-4a06-b05a-3d0c6e64241f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPH72DKY2RAA4Z80YK6F5R",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal keychain features a stylish black rectangular plate, perfect for adding a touch of sophistication to your keys. Durable and lightweight, it&#39;s ideal for everyday use or as a smart gift for friends and colleagues.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/1928e978-01a5-4ee6-b05d-68352263f909.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPH7273J88TGMPERNAR74K",
    "name": "Metal Rotating Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this premium metal rotating keychain. Designed for durability and ease of use, it features a smooth rotating center for easy accessibility. Its modern finish adds a touch of elegance, making it perfect for everyday use or as a stylish gift.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/1a68d167-4459-464d-bed5-5456b4cd8cb3.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPH72M2TQEZH5Y91T3C0PA",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your daily essentials with this stylish Round Metal Keychain. Crafted from high-quality metal, this keychain features a polished finish, making it both elegant and durable. Its compact design is perfect for organizing your keys while adding a touch of sophistication to your accessories. I...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/df63368b-a90b-4f0d-ad7f-a7af5629c1e0.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPH71SNZMEMY8YHM84MNCP",
    "name": "Metal Keychain with Mirror",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized and enjoy the added convenience of a small built-in mirror. This stylish metal keychain is lightweight, sturdy, and perfect for daily use. Ideal for quick touch-ups on the go, making it a practical accessory for both men and women.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/245112d0-8c93-42b7-81e2-324ede8a1248.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPH70QYW5DYCWAHRPCYQ14",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this round metal keychain featuring a minimalist mirror insert. Perfect for keeping your keys organized while adding a touch of style to your accessories. Its sturdy construction ensures longevity, making it an ideal gift or personal item.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/abc64ecc-aeab-4da2-a21d-123531c4afea.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPFT4RJ6NX67HFMPZN5AEG",
    "name": "Sleek Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this stylish metal keychain, featuring a sleek black rectangular insert. Durable and elegant, it&#39;s perfect for keeping your keys secure and adding a touch of sophistication to your daily carry. Ideal for gifting or personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b9fa7ca2-5a76-4a4d-b123-2dab45f6d806.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPFT3XQ9ZFHH6M0Q5N3DC7",
    "name": "Sleek Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys secure and stylish with this sleek metal keychain. Crafted from premium materials for long-lasting durability, its minimalist design adds a touch of elegance to your everyday essentials. Perfect for personal use or as a thoughtful gift.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c0eeae0c-eaa6-4465-8bb3-14874efcec2a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPFT4654GJGVWMNDPH2RD6",
    "name": "Sleek Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this sleek metal keychain featuring a modern black finish. Designed for durability and style, it’s perfect for keeping your keys organized and easy to find. Its lightweight and sturdy build make it an ideal accessory for both personal use and gifting.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/af2ab804-a70b-4771-9207-1148e5a14a0f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPFT2W0V7YF89WPJ05KEWT",
    "name": "Sleek Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday carry with this sleek metal keychain. Crafted from durable stainless steel, it features a modern, polished finish with a rectangular design center. Perfect for organizing your keys or as a stylish gift for friends and family. Lightweight, sturdy, and built to last.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/37684cc2-c0cc-41e1-b0f7-9aee9bd61673.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPFSZMBAAC4MY078C3W1TT",
    "name": "Metallic Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday essentials with this stylish metallic keychain. Crafted from high-quality metal, it offers both durability and a sophisticated look. The polished finish makes it perfect for car keys, house keys, or gifting. Lightweight yet sturdy, it&#39;s designed to keep your keys secure and ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/117126bf-4e04-4cbd-9f68-99c7e413309f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPFSTNKGK5DPKYXN8PR3Z7",
    "name": "Gold Metal Bar Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of elegance to your keys with this gold metal bar keychain. Its minimalist design makes it perfect for everyday use or as a gift. Durable construction and lightweight feel ensure long-lasting style and convenience.",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/dd39a28b-dea6-4338-9bc1-d1800c47343f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPFSTWA2PH824573EYYBA6",
    "name": "Stainless Steel Nail Clipper",
    "category": "everyday",
    "price": 499,
    "description": "Keep your nails clean and neat with this premium stainless steel nail clipper. Engineered for precise trimming and long-lasting sharpness, it&#39;s perfect for everyday grooming. Its ergonomic design ensures a comfortable grip, making it ideal for home or travel use.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ba323b96-9d42-4c69-bfba-7c961633587c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMPFST0V9X708KBC9TB7GF6",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday carry with this premium metal keychain featuring a stylish chrome finish. Designed for durability and ease of use, it&#39;s perfect for keeping your keys organized and always within reach. Its modern look makes it suitable for both personal use and thoughtful gifting.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a4f380d4-7315-47ec-80ce-c5c2eed7f5a4.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPFST7SEMSDAHNQQJRNY89",
    "name": "Sleek Black Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday carry with this stylish and durable black metal keychain. The sophisticated rectangular design features a glossy black panel set in a polished metal frame, making it both practical and elegant. Perfect for organizing keys or as a thoughtful gift for friends and colleagues.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f6730d65-5b19-4743-bd98-bbced810ad6d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPFSRB1YRJ21YZZ3BMGAE3",
    "name": "Car Shape Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this stylish car-shaped metal keychain! Crafted from durable metal, it&#39;s perfect for car enthusiasts and makes a great gift or accessory for your keys or bag. Compact, lightweight, and rust-resistant for daily use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e11cbeb3-0f90-4f59-9171-ad7b0c40137d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPEJC9867SH7EYZGCAWKNZ",
    "name": "Metal Bar Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this stylish metal bar keychain. Crafted from durable material, its minimalist gold finish adds an elegant touch to your keys, bags, or backpacks. Perfect for gifting or personal use, this keychain doubles up as a chic statement and practical accessory.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/15286c08-5a8b-403c-b9d1-5e16f05ad708.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPEJBAJNK1DT1FTYP27QQ0",
    "name": "Brass Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday essentials with this modern brass keychain. Crafted from high-quality metal, it offers both durability and style. The sleek cylindrical design and compact size make it perfect for keeping your keys secure and easy to find. Ideal for gifting or personal use, add a touch of el...",
    "material": "Solid C360 Brass",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/9ba7d5bf-21ac-40c9-b9d2-2f23a8ae193a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPEJAFQ0JPV7P2G6GEV9DT",
    "name": "Metal Oval Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this sleek metal oval keychain. Featuring a polished finish and sturdy construction, it&#39;s perfect for organizing keys and adding a touch of elegance to your style. Ideal for gifting or personal use, this keychain comes packaged for convenience and durability.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8534cfb0-810b-4864-9f68-07394ee23dd6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPEJ9KS7AJPDA1JDHAN19S",
    "name": "Silver Oval Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys stylishly organized with this silver oval metal keychain. Crafted from high-quality metal, its sleek design offers a polished look for everyday use or gifting. Lightweight yet durable, it fits effortlessly onto your bag or pocket. Perfect for personal use, corporate gifting, or eve...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/cd663ef9-1b7c-46dc-8f8f-772c3a4018b2.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPEJ6QXR7ZWQ0D55KTRH6M",
    "name": "Metal Oval Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Get organized in style with this Metal Oval Keychain. Crafted from high-quality metal, it features a smooth oval design that complements any set of keys. Lightweight yet sturdy, it&#39;s perfect for everyday use or as a gift for friends and colleagues. The shiny silver finish gives it a modern, premi...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8eac056e-0743-46d9-9f09-3f75077ccbd9.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPEJ1HJZ23WV43WWA32BCY",
    "name": "Metal Oval Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Sleek and elegant, this Metal Oval Keychain is the perfect accessory for organizing your keys. Made from high-quality stainless steel, it offers both durability and style. Its polished finish makes it suitable for customization, gifting, or daily use. Lightweight and easy to carry, it&#39;s a practic...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/82a29992-782b-49c9-9e1a-d2d0afd1b7de.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPEJ1RV2CKD15F32BZ01QB",
    "name": "Square Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your keys with this stylish square metal keychain. Crafted from high-quality metal, it offers durability and a modern look. Its compact and lightweight design ensures your keys are always secure and easy to manage. Perfect for personal use or as a thoughtful gift!",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/052cab7b-a604-487c-ab7a-59c159436d91.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPEJ1393GV8EQAPJN2JAP7",
    "name": "Square Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday carry with this elegant square metal keychain. Crafted for both style and durability, its modern black finish and sturdy ring ensure your keys are secure and easy to find. Perfect for personal use or gifting, it&#39;s ideal for customizing with engravings or logos.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/6e84c5b9-290e-406c-9d91-8ada1df6fb64.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPEJ0HWYTPRX51FC7AVBDP",
    "name": "Square Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this sleek square metal keychain. Featuring a sturdy construction and a modern, minimalist design, it&#39;s perfect for daily use or as a personalized gift. Its polished finish adds a touch of sophistication to your essentials.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/9337c90f-b375-444e-b8a4-dfa8e50a9983.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPEHZQERN2ZDQRT7AM99H2",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your style with this sleek metal keychain featuring a classic oval shape. Built with durable, high-quality metal, it keeps your keys organized while adding a touch of sophistication to your everyday essentials. Perfect for gifting or personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a51d2525-9b99-4d9c-ae0c-335bcb4b3d21.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPD87WBF4HCXAZCSAT2S04",
    "name": "Square Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this sturdy Square Metal Keychain. Crafted from high-quality metal with a sleek, classic design, it&#39;s perfect for keeping your keys secure and stylish. The blank square surface is ideal for personalization, making it a great gift or promotional item. Compact,...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/73703ad1-1068-49fd-9ba2-c0520832028c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPD886TPSD8T4HSN30NNPC",
    "name": "Stainless Steel Scissors",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your everyday cutting tasks with these high-quality stainless steel scissors. Designed for precision and comfort, these scissors are perfect for use in the kitchen, office, or crafting projects. The sharp blades provide smooth and effortless cutting, while the ergonomic handle ensures a s...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/56b259f0-593d-4ec0-822c-022fd02b13d9.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMPD86SB0WPPXGT90GZ9DMK",
    "name": "Square Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this stylish square metal keychain. Featuring a minimalist black finish and sturdy construction, it&#39;s perfect for everyday use or gifting. Compact and lightweight, it easily fits in pockets or bags, making your keys easy to find.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d1f64bc5-aa28-4029-934d-9354829177ca.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPD86E8NDF8CNY2MDKNHV3",
    "name": "Square Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this square metal keychain. Crafted from high-quality metal, it boasts a polished finish and a modern, minimalist design. Perfect for personal use or gifting, its sturdy ring ensures your keys are securely in place. Compact and lightweight, it&#39;s great for ev...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a51dd69c-86a0-4d30-9258-9ab88fc370a0.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPD85EPZN5A81EACDAFNVK",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this sleek metal keychain. Featuring a sturdy rectangular design and a high-quality finish, it&#39;s perfect for daily use or as a stylish gift. Lightweight and compact, it fits easily in your pocket or bag.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f8615dda-2462-4b28-bec6-22e2dfc23597.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPD7Z1KF6SC58WH1H196FY",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday carrying essentials with this sleek metal keychain featuring a modern square shape. Durable and compact, it&#39;s perfect for keeping your keys organized or using as a fashionable accessory. Makes for a great gift or promotional item.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8fb01a1e-7ac8-4603-a8e9-90590f2796b6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPD7XSC0SCYH90HES7QHRK",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday essentials with this stylish metal keychain featuring a sleek square frame. Durable and lightweight, it keeps your keys secure and adds a touch of sophistication to your accessories. Perfect for personal use or gifting.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c6aabc54-1ce9-40da-a617-776fd551c5a1.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPD7XN64VKFBNHQAZPY38X",
    "name": "Square Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this square metal keychain. Crafted from durable stainless steel, its sleek and minimalist design adds a touch of sophistication to your everyday essentials. Ideal for gifting or personal use, this lightweight keychain is easy to carry and resists rust and s...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b170aee3-dc1b-444c-89b2-f6e8b8723f10.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPD7X94TQMK2MA4BPQ5J1J",
    "name": "Square Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys stylishly organized with this square metal keychain. Crafted from high-quality metal with a sleek black finish, it&#39;s both sturdy and elegant, perfect for everyday use or gifting. Compact, lightweight, and easy to carry. Comes in a protective plastic wrapper for added convenience.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/84e4f00e-d033-4b31-a8ae-fd6c3edc7bb2.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPD7WQB40WFF68DPTDJ7DX",
    "name": "Metal Square Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday essentials with this sleek metal square keychain. Durable and lightweight, it features a modern square design and a sturdy ring for secure attachment. Ideal for personal use or as a thoughtful gift. Keep your keys organized in style!",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/6925fd02-b195-4c08-8b12-6b5907b54316.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPC2J71EDZCW3724M082ZT",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized and secure with this stylish metal keychain. Featuring a sleek silver finish and a sturdy build, it&#39;s perfect for car keys, house keys, or office use. Lightweight and easy to carry, this keychain is both practical and elegant—making it an ideal gift for anyone.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/182c02fa-f058-4e0c-bd2b-1f983f03f29f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPC2J2E5Z98VGZMFGS54R7",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday essentials with this sleek metal keychain featuring a modern rectangular design. Perfect for securely holding your keys or adding a touch of elegance to your bag. Lightweight, durable, and resistant to rust, it&#39;s ideal for daily use or gifting.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0aad8e9b-6c56-4727-8be7-2787e51fa0b6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPC2HXXE0WVS00B43NZME0",
    "name": "Metallic Rectangle Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday essentials with this stylish Metallic Rectangle Keychain. Made from sturdy metal, it offers durability and a sleek, modern design. Perfect for organizing your keys or adding a touch of elegance to your bag. Its mirror-finish surface is ideal for engraving or personalizing gi...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/cdafcda9-1dfb-4bb2-808b-46e17f27e53a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPC2H2S7G0H8ATZ61H9ZFX",
    "name": "Metal Keychain Blank",
    "category": "everyday",
    "price": 299,
    "description": "This metal keychain blank is perfect for personalizing with engravings or designs. Durable, lightweight, and comes with a sturdy ring, it makes a great accessory for keys or bags. Ideal for gifting or promotional use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/fce950fb-602e-43f5-b2d4-ea40b4879d55.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPC2FCJHCG8HD5FSQYCY21",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your style with this premium metal keychain. With its sleek silver finish and durable build, it&#39;s perfect for securely holding keys while adding a modern touch to your accessories. Ideal for personal use or as a thoughtful gift.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8ea7d359-17c0-4a24-9642-a1f8288974de.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPC27T8XKXP0WBXR0TV7ND",
    "name": "Car Shape Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of style to your keys with this car-shaped metal keychain. Crafted from durable stainless steel, it features a minimalist design that&#39;s perfect for car enthusiasts or anyone who appreciates unique accessories. It is lightweight, rust-resistant, and fits easily in your pocket or bag.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/93e9e99d-9b15-4a16-a3a3-1d9f7b5fd1f2.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPC28287YM41Z97GF682TC",
    "name": "Car Shape Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday essentials with this sleek car-shaped metal keychain. Crafted from durable stainless steel, this lightweight keychain adds a touch of automotive flair to your keys, bags, or backpacks. It makes a perfect gift for car enthusiasts or anyone who appreciates unique accessories. ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/64cc73fd-143b-4d6d-aff0-d12ab4f8e9d7.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPC287Y9BV2ETHEWH6MNQ6",
    "name": "Metal Rectangle Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this sleek metal rectangle keychain. Featuring a sturdy ring and a polished rectangular plate, this accessory is perfect for everyday use or gifting. Its minimalist design suits both personal and professional environments, ensuring durability and style wherever you go.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a3681d73-8232-4f2e-9f3d-f17383f5db2b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPC28CGDGAB4G6NNZ7P236",
    "name": "Metal Teardrop Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add elegance to your everyday essentials with this metal teardrop keychain. Crafted from high-quality alloy, it’s sturdy and resistant to wear and tear. Its sleek design is ideal for personal use or as a corporate gift. Lightweight and easy to attach to keys, bags, or backpacks.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/96e55af5-e3bd-4c4d-9406-b61b0a980300.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPC26K2378PSWJNFV4QFT0",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday essentials with this sleek and sturdy metal keychain. Crafted from high-quality stainless steel, it&#39;s perfect for keeping your keys secure and organized. Its minimalist design makes it a great gift option, fitting comfortably in your pocket or bag. Ideal for both personal an...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d3e096a1-c861-4364-b378-805bc2fb321b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPAV8TKJ0AVV7M60G7TXFJ",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday carry with this stylish metal keychain. Featuring a sleek rectangular shape and durable construction, it is perfect for securing your keys in a sophisticated way. Ideal for gifts, corporate branding, or personal use, this keychain offers both practicality and modern appeal.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a2b65a8a-72df-483e-95ff-5ffe1b317261.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPAV8A07ZHS6DKG0QCFARM",
    "name": "Car Shape Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your keys with this sleek car shaped metal keychain. Durable and lightweight, it makes a perfect gift for car enthusiasts and adds a personal touch to your everyday essentials. Modern design ensures it stands out while keeping your keys together securely.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c8c5c2f2-6097-4886-94c5-ee275d352aa2.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPAV7SRPHBDXAWBSSNF6KM",
    "name": "Metal Black Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this sleek metal keychain featuring a glossy black rectangular tag. Durable and lightweight, it’s perfect for daily use and adds a touch of elegance to your accessories. Ideal for gifts or personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/6e50697b-62c4-444e-ab3c-c63f8ab0086e.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPAV72XXJQAXQZ3JV81MS0",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday carry with this stylish metal keychain. Featuring a sleek silver finish and a sturdy ring, it&#39;s perfect for keys, bags, or gifting. Lightweight yet durable, it adds a touch of elegance to your essentials.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/25a03e65-da15-419c-bae2-41d57b4970e2.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPAV6YGFH4WHYEB6C4FQXH",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal keychain features a classic design with a sturdy ring, perfect for keeping your keys organized and secure. Its polished finish adds a touch of sophistication, making it ideal for daily use or as a stylish gift. Lightweight and compact, it&#39;s easy to carry in your pocket or bag.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/9cd2c6b0-153e-4658-b0fe-59a268f22194.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPAV0F091937MGA2JRYP92",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys secure and organized with this sleek metal keychain. Featuring a durable rectangular design, it’s perfect for everyday use and makes a great accessory for bags or vehicles. The premium zinc alloy finish ensures lasting shine and strength. Upgrade your essentials with this simple ye...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/1c39f2ad-ad21-4487-915e-156ff65c4169.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPATZCKEMRG5YNPY6FTRE3",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys secure in style with this sleek metal keychain. Featuring a sturdy ring and polished finish, it&#39;s perfect for gifting or everyday use. Compact and lightweight, it easily fits in pockets or bags. Add your own engraving to make it personalized!",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/38f41ea9-4f68-4194-b874-0198bf40a262.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPATYB5ZRAKP9W4VVH7188",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your daily routine with this sleek and sturdy metal keychain. Its polished finish and solid construction make it perfect for keeping your keys organized and easy to find. Ideal for gifting or personal use, this keychain adds a touch of elegance to any set of keys. Compact and lightweight,...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/2c345050-c539-430a-aabb-20b37c32a667.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPATYP210NP8Q7V535Y7GQ",
    "name": "Metal Teardrop Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of sophistication to your essentials with this Metal Teardrop Keychain. Crafted from durable metal, its sleek design makes it perfect for car keys, home keys, or gifting. Lightweight, stylish, and easy to carry, this keychain is ideal for daily use and will help keep your keys organized.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/1ad58d70-4c48-47ab-8017-67afb0aa4328.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMPATXAZ2JBXH33EV4G6G8W",
    "name": "Metal Ballpoint Pen",
    "category": "writing",
    "price": 499,
    "description": "Experience effortless writing with this sleek metal ballpoint pen. Known for its durability and elegant design, it is perfect for daily use in the office, school, or at home. With a polished metallic finish, this pen combines style and functionality, making it an ideal choice for professionals an...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/084f5e1d-4643-4bc1-bf08-70c93a4e2ac6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP8WAHZS87JCXHT5VBGRSY",
    "name": "Metal Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Premium stainless steel mobile stand designed for stability and durability. Keeps your phone upright for easy viewing, perfect for video calls, watching videos, or working hands-free. Non-slip base ensures secure placement on desks or tables.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/4af3644d-af80-44ab-b399-f011bc0e8aa8.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP8WA0NE2CBTF2QXXCFW9S",
    "name": "Adjustable Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your workspace with this adjustable mobile stand, designed for durability and stability. Its sleek black finish and slip-resistant pads keep your device secure and accessible for video calls, streaming, or charging. Compact and easily foldable, it fits any desk or tabletop, making it perf...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a091309e-e5df-4dbb-9a5c-73860f0e4d65.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP8W8M0VZBPVYWDWMK43N4",
    "name": "Wall Mounted Mobile Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your smartphone safe and accessible with this wall mounted mobile holder. Crafted from high-quality stainless steel, it offers durability and a sleek, modern look. Ideal for use near charging points, kitchens, offices, or bedrooms. Easy to install and compatible with all phone sizes. A must-...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a6ff5fb1-e77a-4b09-9d1f-dc834d1a3803.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP8W6ZJZ3ZWP14WV2621ZY",
    "name": "Metal Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your workspace with this sturdy metal mobile stand, crafted from high-quality stainless steel. Its sleek design ensures stability and protection for your phone, making it ideal for desks, bedside tables, and kitchen counters. Easy to clean and resistant to rust, this holder is perfect for...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/14de01c5-b3e3-4460-836e-810a1d8baf72.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP8VZDJ56XNWQ8AD00NVF1",
    "name": "Foldable Stainless Steel Stove",
    "category": "everyday",
    "price": 499,
    "description": "Perfect for outdoor adventures, this foldable stainless steel stove is designed for durability and easy setup. Lightweight and rust-resistant, it&#39;s ideal for camping, hiking, or emergency situations. Simply unfold and you&#39;re ready to cook – works with solid fuel tablets for quick meal preparation...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/41de5415-9aa9-4b89-8a06-cee1261b6be4.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP8VZNWG97B3ZGGXVNA01X",
    "name": "Wooden Desk Organizer",
    "category": "office",
    "price": 499,
    "description": "This elegant wooden desk organizer is perfect for keeping your workspace clutter-free. Featuring two compartments and a stylish natural wood finish, it’s ideal for holding pens, notepads, and office supplies. Its compact design fits seamlessly on any desk, adding a touch of modern appeal while ma...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ed5fbe40-8dfa-46c0-9d30-477fb4eb7161.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP8VZ7N3P69XKVRP6STXC7",
    "name": "Wooden Pen and Mobile Holder",
    "category": "office",
    "price": 499,
    "description": "Organize your workspace in style with this multifunctional wooden holder. Featuring separate slots for your mobile phone and pens, it keeps your essentials within easy reach. Crafted from quality wood with a smooth finish, it&#39;s durable, compact, and perfect for both office and home use.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/cc705e1d-5bbb-4533-8e22-de6e1a8fda27.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP8VYT9AFJC6GP10ECQ9NQ",
    "name": "Wooden Wall Shelf",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your home décor with this sleek Wooden Wall Shelf. Crafted from premium wood, it features a unique modern design with two open shelves and one spacious compartment, perfect for organizing books, décor items, or essentials. Suitable for living rooms, bedrooms, or office spaces, it combines...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/56cccf91-c853-4684-aca5-73e67bbf346d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP8VXQB05CCNN72Z23AWMF",
    "name": "Stainless Steel Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Experience convenience and elegance with this stainless steel mobile stand. Featuring a sturdy construction, anti-slip design, and a modern brushed finish, it safely holds your phone for hands-free usage—perfect for desks, kitchens, or bedside tables. Easy to clean and corrosion-resistant, a must...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b5683985-4d11-45ac-81b4-b7dbcfddfa2d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP75YWSNPKG9EQ1XCR74YD",
    "name": "Stainless Steel Mounting Bracket",
    "category": "everyday",
    "price": 499,
    "description": "This Stainless Steel Mounting Bracket is perfect for securely attaching components to walls or equipment. Made from high-quality stainless steel, it offers excellent strength, corrosion resistance, and long-lasting durability. Its versatile design fits various installation needs in both residenti...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f460da5b-b7e8-46d9-832f-2c66b1b45813.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP75XN39SEQHNC8PSFWMN9",
    "name": "Stainless Steel Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "This high-quality stainless steel wall mount bracket is perfect for securely holding various fixtures or devices in place. Its robust construction ensures longevity and rust-resistance, making it ideal for both indoor and outdoor applications. Easy to install and versatile, this bracket is suitab...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/334cf51f-d4bf-433d-bf9b-c7383c2f3717.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP75X8BGJ565GW4YHJS79D",
    "name": "Stainless Steel Wall-Mount Toothbrush Holder",
    "category": "office",
    "price": 499,
    "description": "Upgrade your bathroom with this sleek stainless steel wall-mount toothbrush holder. Featuring two slots to neatly store toothbrushes and an additional compartment for toothpaste or small accessories, this modern holder keeps your essentials within easy reach. Its high-quality build ensures rust-r...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/1cd8f582-22db-4e4c-9a40-fae51bfb75a6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP75XDBJW6JCPWXSBJSTEY",
    "name": "Wall Mount Metal Hook Shelf",
    "category": "office",
    "price": 699,
    "description": "Maximize your space with this sturdy wall mount metal hook shelf. Perfect for organizing keys, tools, or small accessories, its sleek black finish adds elegance to any room. Easy to install and built for daily use, it combines modern design with reliable strength.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/74456202-2583-48cd-ab66-26896856290f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP75VM44P0PG1W5VDPYQ2E",
    "name": "Stainless Steel Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your home or workspace with this premium Stainless Steel Wall Mount Bracket. Crafted for maximum strength and a polished finish, it&#39;s ideal for securely holding pipes or rods in place. Easy to install and resistant to corrosion, making it a reliable solution for bathrooms, wardrobes, or i...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/654ecedd-06cf-4660-8149-f715accaacc3.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP75MHSGJGHDA8H7GCY066",
    "name": "Stainless Steel Wall Hook",
    "category": "office",
    "price": 699,
    "description": "Add style and functionality to your space with this durable stainless steel wall hook. Designed for easy installation and reliable support, it securely holds towels, keys, kitchen utensils, or bathroom accessories. Its sleek, corrosion-resistant finish fits any modern decor and makes it easy to c...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/931666b2-27b2-45fd-ba34-2bf4ef803617.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP75KEHGEW3WVT41970XKN",
    "name": "Desk Card Holder",
    "category": "office",
    "price": 1299,
    "description": "Keep your business cards neat and easily accessible with this sleek metal desk card holder. Durable, modern and designed for office use, it accommodates a stack of cards and adds a professional touch to your workspace.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/18eee473-5146-4b17-bd41-57724147dd9b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP75K5ZS49GYKYM0H7JAWW",
    "name": "Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your setup with this durable wall mount bracket, perfect for securely holding shelves, appliances, or fixtures. Crafted from high-quality metal with a polished finish, it offers robust support and modern appeal. Easy to install and suitable for homes, offices, or garages.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0825c3ed-f747-4438-b505-13bb2626a9b6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP75JGTRNHVZGZTF2V7BZY",
    "name": "Stainless Steel Wall Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your home or office with this high-quality stainless steel wall bracket. Ideal for mounting shelves, appliances, or other equipment, its robust build ensures long-lasting durability and reliable support. The sleek, polished finish adds a modern touch to any setting. Easy to install, rust-...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/08dd49c1-b199-4285-a8af-aa5aa2e93646.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP75JQ7NCV5V2MKQSMNFA8",
    "name": "Wall Mounted Stainless Steel Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your home or office organized with this wall mounted stainless steel holder. Perfect for holding a variety of items such as toothbrushes, razors, or small tools, its sleek design suits any décor. Easy to install and rust-resistant, it provides long-lasting functionality and style.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/851d953b-14b2-4b23-b6a1-55dcfb1164f1.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP5XRW6D5CMCE6EVE1QXM9",
    "name": "Stainless Steel Wall Hook",
    "category": "office",
    "price": 699,
    "description": "Upgrade your home or office organization with this premium Stainless Steel Wall Hook. Built with high-quality, rust-resistant material for long-lasting strength and a sleek, modern look, it’s perfect for holding bags, coats, towels, or kitchen accessories. Easy to install on any wall, it seamless...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/9ab92156-e4c4-478a-807e-fe805f7f0af7.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP5XQT3NTXPX4M0BYGDM6M",
    "name": "Stainless Steel Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your workspace with this Stainless Steel Mobile Stand, designed for stability and style. Its reflective finish, durable construction, and ergonomic angle make it perfect for hands-free viewing, video calls, and keeping your phone accessible. Compact and easy to transport, it&#39;s an ideal so...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b88bb163-ee07-4385-a6e3-22c10c58641d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP5XR8P89Z4RRC1PMMX4M8",
    "name": "Stainless Steel Wall Mount Holder",
    "category": "office",
    "price": 499,
    "description": "Upgrade your organization with this premium Stainless Steel Wall Mount Holder. Designed for durability, it features a sturdy triangular base, a cylindrical holder ideal for tools or accessories, and dual hooks for hanging items. Its polished finish resists rust and stains, making it perfect for k...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/50814373-64d8-4282-9fa4-2d8083f6c514.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP5XQ37M4KXXPW1E9PGC83",
    "name": "Stainless Steel Wall Mount Holder",
    "category": "office",
    "price": 499,
    "description": "Upgrade your bathroom or kitchen with this premium Stainless Steel Wall Mount Holder. Designed for strength and durability, it features a sleek, rust-resistant finish that is perfect for holding razors, toothbrushes, or small toiletries. Easy to install and maintain, its modern design complements...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/db7b876b-e461-42f3-87f6-5a1105664651.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP5XP9YWMRTTWYK4GJSV5B",
    "name": "Stainless Steel Wall-Mounted Toothbrush Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your bathroom neat and organized with this sleek wall-mounted toothbrush holder made from high-quality stainless steel. Featuring an integrated cup, it provides a modern look and practical storage solution for toothbrushes, toothpaste, and other essentials. Rust-resistant and easy to clean, ...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/97658919-b04d-4cc7-936c-dc8e7b3b2335.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP5XCGHERQKEXVBKCSMDET",
    "name": "Metal Mobile Stand with Pen Holder",
    "category": "office",
    "price": 499,
    "description": "Upgrade your workspace with this stylish metal mobile stand, featuring a convenient pen holder. Made from high-quality stainless steel, it offers durability, stability, and a mirror finish, making it perfect for offices and study tables. Keep your phone upright and pens organized for efficient mu...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a150003f-4b18-463f-b672-0b3a423e39ea.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP5XC5SK0C681JZZ34BVX0",
    "name": "Stainless Steel Wall Hook",
    "category": "office",
    "price": 699,
    "description": "Upgrade your space with this stainless steel wall hook, perfect for hanging towels, kitchen utensils, or bathroom essentials. Its modern finish adds elegance to any décor, while corrosion-resistant material ensures long-lasting use. Easy to install and maintain.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b88d32aa-69f2-4f67-a7d5-856e06ac41d5.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP5XAKH2ARQKT5AXFHR2B0",
    "name": "Metal Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your phone secure and upright with this sleek metal mobile stand. Perfect for desks, tables, or nightstands, it offers non-slip support and a modern look. Compatible with most smartphones and tablets, this holder is ideal for video calls, watching videos, or charging your device.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8970f556-51b5-41fc-8cca-a6b75ade3e99.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP5XAYG33YSYKF4JC9NGE6",
    "name": "Stainless Steel Toothbrush Holder",
    "category": "office",
    "price": 499,
    "description": "Upgrade your bathroom with this sleek stainless steel toothbrush holder. Designed for wall mounting, it keeps your toothbrushes organized and hygienic, while its modern design complements any bathroom decor. Durable and easy to install, it&#39;s a practical addition for daily convenience.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/78e9b555-2fa1-445b-b638-3c65cc2f6b5d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP5XB91RHHG0F49ACX507E",
    "name": "Stainless Steel Wall Mount Toothbrush Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your bathroom organized with this stainless steel toothbrush holder. Designed for durability and easy installation, it features a sleek modern look and holds multiple toothbrushes securely. Perfect for families or shared bathrooms, this rust-resistant accessory enhances hygiene and style.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8498b531-5925-4476-8f38-744b9cc7fc40.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP4PS78BZX3BYNM8PCC9Z0",
    "name": "Stainless Steel Wall Hook",
    "category": "office",
    "price": 699,
    "description": "Upgrade your organization with this sleek stainless steel wall hook, perfect for hanging towels, keys, bags, or accessories. Rust-resistant and easy to install, it blends seamlessly with modern or classic décor. Its robust build ensures lasting performance for any room in your home or workspace.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b52213f1-9216-4328-b5c2-cae26ec18621.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP4PRNA1MT3WHZ6C3G671K",
    "name": "Metal Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "This durable metal mobile stand is designed for optimal hands-free viewing and support for your smartphone or small tablet. Its adjustable angle ensures comfortable use while watching videos, video calling, or browsing. Sleek, lightweight, and easy to carry, it&#39;s perfect for your office desk, bed...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f62ea73a-d504-40d3-9010-84238fecde2f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP4PQ7Q2BP1A8RXCQC8VSY",
    "name": "Stainless Steel Toothbrush Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your bathroom neat and organized with this sleek stainless steel toothbrush holder. Designed for durability and easy wall mounting, it features slots for toothbrushes and a detachable cup for rinsing or storage. Its rust-resistant finish and modern design complement any bathroom décor, makin...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a542b36d-df6c-4769-a027-083debacd824.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP4PPGTZMF0X9M38NB1SWY",
    "name": "Stainless Steel Wall Mount Broom Holder",
    "category": "office",
    "price": 499,
    "description": "Organize your cleaning tools in style with this high-quality stainless steel wall mount broom holder. Rust-resistant, sturdy, and easy to install, it features a sleek design with flexible grips to securely hold brooms, mops, and cleaning tools. Perfect for kitchens, garages, or utility rooms, thi...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/76500078-b1ec-4d1d-86f7-279a02dd1443.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP4PKZ5XVRKXG7S2ECFDDE",
    "name": "Stainless Steel Wall Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your space with this durable, corrosion-resistant stainless steel wall bracket. Featuring a sleek, polished finish, it is perfect for securely mounting pipes, fixtures, or handrails. Engineered with precision hole placements for easy installation and a stylish modern look, this bracket de...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b56f8572-4ee4-4faa-8e83-c2659faf40a4.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP4PEPM7CEHVNBFJKVAMWQ",
    "name": "Metal Mobile Holder with Pen Stand",
    "category": "office",
    "price": 499,
    "description": "Upgrade your workspace with this stylish metal mobile holder featuring a built-in pen stand. The sturdy construction securely holds your mobile phone, while the attached cylindrical pen holder keeps your writing essentials within easy reach. Ideal for home, office, or study desks, this compact or...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0bddc79b-531a-4605-9b97-768357032cd0.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP4PEBN5QD9D81CX5SRD42",
    "name": "Stainless Steel Wall Hook",
    "category": "office",
    "price": 699,
    "description": "Upgrade your space with this durable stainless steel wall hook. Perfect for kitchens, bathrooms, or workspaces, it features a modern design and sturdy build for hanging utensils, towels, or tools. Easy to install and rust-resistant, this hook provides both function and style.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e40540ea-6ce1-442d-8aeb-092c21057e34.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP4PEHTWPF5QNMMREX8467",
    "name": "Stainless Steel Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your space with this premium stainless steel wall mount bracket. Ideal for securely holding rods or pipes in bathrooms, kitchens, or offices. The sleek, rust-resistant finish ensures both strength and style, making installation easy and reliable. Perfect for modern interiors!",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f0cbb517-7b6f-4a7e-9393-f9bde42ed694.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP4PDERQKWPPGMV1V03RHX",
    "name": "Metal Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Experience convenience and style with this durable metal mobile stand. Perfect for your workspace, it keeps your phone upright for easy viewing and charging. Sleek, minimalist design fits any decor. Ideal for hands-free use during video calls or streaming.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a1d930b3-8e84-413b-abad-460ed13454fa.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP4PC6HZ3EZWSBFMEDRWC4",
    "name": "Stainless Steel Toothbrush Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your bathroom tidy and stylish with this durable stainless steel toothbrush holder. Featuring a sleek, rust-resistant design and wall-mount capability, it&#39;s perfect for storing toothbrushes and toothpaste. Easy to install, it adds a modern touch to your bathroom essentials.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/80140d7a-09ed-4731-bd1c-3fc7f9c3c15b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP2YPF5GHB0340NZ05FDMW",
    "name": "Anti-Slip Furniture Pad",
    "category": "everyday",
    "price": 499,
    "description": "Ensure your furniture stays in place and your floors remain scratch-free with this anti-slip furniture pad. Made from durable material, it features four sturdy grips for enhanced stability. Ideal for tables, chairs, or any household item, this pad offers reliable protection while maintaining a sl...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/25664324-0938-43f3-9ca3-f1c4cd6d14cb.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP2YNX04BG09GW2HD0TJ5J",
    "name": "Metal Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "This robust metal wall mount bracket is ideal for securely supporting shelves, signage, or fixtures in homes and offices. Made from high-quality steel with pre-drilled holes for easy installation, its sturdy construction ensures lasting stability. The unique angled design maximizes load-bearing s...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/43fe7c4f-b8bc-4e14-98e1-f87721c86b5c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP2YNRV77HV8BB9QYM0XAQ",
    "name": "Stainless Steel Card Holder",
    "category": "office",
    "price": 1299,
    "description": "Elevate your professional image with this stylish stainless steel card holder. Designed for durability and modern appeal, it safely stores your business cards, keeping them crisp and ready for any meeting. Compact and lightweight, this case fits comfortably in your pocket or bag, making it perfec...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/31f2f271-6b9e-40e7-916a-540148d76808.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP2YMGZ5XR15VYW8YW80MK",
    "name": "Metal Shelf Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your storage solutions with this sturdy metal shelf bracket. Perfect for mounting shelves securely to walls, its durable construction ensures long-lasting support for books, decor, and kitchen items. Easy to install and fits standard shelf sizes, making it an ideal choice for home or offi...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/22820bbd-b2c9-43d7-ba9e-299469a74b97.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP2YKJ2ZSA0Y8Y932PG4GZ",
    "name": "Metal Wall Shelf Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Sturdy and sleek metal wall shelf bracket with a triangular design for maximum strength and durability. Perfect for supporting bookshelves, kitchen racks, or decorative ledges. Its minimalist style seamlessly fits any modern home or office decor. Easy to install and built to last, this bracket pr...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b1e5b0c3-c4a1-4820-aa76-b8d929bd5620.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP2YBVWBTZDJP8WRNG0REP",
    "name": "Foldable Metal Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Elevate your phone experience with this foldable metal phone stand. Designed for durability and portability, it features a sleek gold finish and anti-slip pads for stability. Perfect for watching videos, video calls, or reading, this stand fits most smartphones and small tablets. Enjoy hands-free...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f0dab805-1081-4110-aa00-4c7b89a74e73.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP2YBP66BBJWRSA5V69M10",
    "name": "Stainless Steel Wall Hook",
    "category": "office",
    "price": 699,
    "description": "Upgrade your home or office organization with this stainless steel wall hook. Designed for durability and style, it features a strong adhesive backing for easy installation on any smooth surface. Perfect for hanging towels, keys, bags, or kitchen utensils, this rust-resistant hook blends seamless...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e60f2ee6-a2f2-4b70-84e5-d508291147ba.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP2YC3YKF63VW3V891D358",
    "name": "Stainless Steel Wall Hook",
    "category": "office",
    "price": 699,
    "description": "Upgrade your wall storage with this sleek stainless steel wall hook. Featuring two sturdy hooks, it’s ideal for hanging towels, keys, bags, or kitchen accessories. The polished finish adds a modern touch, while its rust-resistant design ensures long-lasting use. Easy to install and perfect for an...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/6ac40f21-5b14-435b-8fc5-881d6d221d5f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP2YAQ85310J6PDR5N0TQB",
    "name": "Aluminum Corner Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your mounting solutions with this premium aluminum corner bracket. Featuring a sleek gold finish and reinforced corners with anti-slip rubber pads, this bracket is ideal for supporting shelves, frames, or custom projects. Built for strength and style, it resists corrosion and adds a moder...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d15ed453-c87e-4e59-b665-568d8f08fbe1.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP2YA5NKB84V954A3THEQR",
    "name": "Foldable Metal Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your workspace with this sleek foldable metal phone stand. Made from durable aluminium alloy, it offers stability and flexibility for all smartphones. Its adjustable hinge allows you to find the perfect viewing angle, while rubberized grips keep your device secure. Compact and portable, i...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/3156f926-a089-46c3-b1bd-1d841904cbe3.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP1KKBMEN105P5701D7171",
    "name": "Stainless Steel Corner Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Enhance the stability of your shelves, cabinets, or frames with this durable stainless steel corner bracket. Featuring two pre-drilled holes for easy installation, its robust construction ensures long-lasting support, making it ideal for both residential and commercial use. The sleek finish adds ...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/7843651e-8b97-4b8a-adbb-246d7f21df14.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP1KK23C2T8QMB5ERQ89SS",
    "name": "Aluminum Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your workspace with this stylish and sturdy aluminum mobile stand. Designed for stability and convenience, it features adjustable angles, anti-slip pads, and a modern metallic finish. Perfect for hands-free calls, watching videos, or reading, this stand suits all smartphone models and add...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ba4f99fb-0514-4e29-819d-36c141981b05.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP1KJNVS32S4F7G17M27GW",
    "name": "Triangular Wall Shelf",
    "category": "everyday",
    "price": 499,
    "description": "Maximize your space with this stylish triangular wall shelf. Designed to fit perfectly into corners, it provides a sturdy surface for displaying small decor items, plants, or essentials. Its sleek design and neutral color make it suitable for any room in your home or office. Easy to install and c...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/1ac24519-edd7-4ef2-b4c7-ae632fb203a7.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP1KHDXY00Z46BACY3WRES",
    "name": "Mobile Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your phone upright and accessible with this durable metal mobile phone stand. Ideal for desks and tables, this holder features a protective coating to prevent scratches and anti-slip pads for stability. Its minimalistic design holds your device securely and enhances your workspace.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/dab5ee07-13ea-4a5e-ac88-f09136b15500.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP1KH8SWD1JVSX5ZNXAZSE",
    "name": "Stainless Steel Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your smartphone secure and accessible with this sturdy stainless steel mobile stand. Its anti-slip base ensures stability, while the sleek design fits perfectly on any desk or nightstand. Suitable for all phone sizes, ideal for home, office, or study use.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/638b548b-cb5f-4c71-8003-4e0459327c2a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP1K868B9VJG63EY4TM322",
    "name": "Stainless Steel Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your storage and display solutions with this high-quality stainless steel wall mount bracket. Designed for strength and durability, it is perfect for supporting shelves, equipment, or electrical installations in homes, offices, or workshops. Its corrosion-resistant finish ensures a long-l...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e21a2fd3-46c5-464c-b6b5-be746f998350.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP1K726BA2M1X9VRE90J8M",
    "name": "Stainless Steel Mounting Bracket",
    "category": "everyday",
    "price": 499,
    "description": "This high-quality stainless steel mounting bracket is perfect for securely attaching devices or panels to walls or flat surfaces. Rust-resistant and sturdy, it features precision bends and mounting holes for easy installation, making it ideal for industrial, commercial, or home use.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/21e7c323-7920-4827-99a8-4c871559f6ef.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP1K6S6RE7Y434HM9GNG8V",
    "name": "Stainless Steel Wall Mount Holder",
    "category": "office",
    "price": 499,
    "description": "Upgrade your space with this sleek Stainless Steel Wall Mount Holder, perfect for organizing razors, small tools, or bathroom accessories. Easy to install with strong adhesive pads included, it&#39;s rust-resistant and designed to blend with any modern décor. The compact size makes it ideal for bathr...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/16071325-1958-4d1f-8da1-93a87c1b1aec.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP1K685M2TVPS3CJ48R100",
    "name": "Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your space with this heavy-duty wall mount bracket. Ideal for securely fastening shelves, devices, or small fixtures, this bracket is crafted from high-quality metal for superior strength and stability. Its sleek design and pre-drilled holes allow for easy and versatile installation in ho...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ed05a60d-677e-4b85-990b-c59d68608cd7.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP1K6H4BBVDCPG145K04H5",
    "name": "Wall Mount File Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your workspace clutter-free with this durable Wall Mount File Holder. Made from high-quality metal, it is perfect for holding files, notepads, or mail. Simple to mount and ideal for home or office use, this organizer saves desk space and offers quick access to important documents.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f718e392-c8bd-4624-aeba-59d88ad13e4f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP09T9JJPFNBNVVBTH760D",
    "name": "Metal Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Secure your devices with this premium Metal Wall Mount Bracket, designed for easy installation and long-lasting durability. Perfect for organizing and mounting small electronics, routers, or office accessories, this sturdy and compact bracket offers a sleek look for home or workplace. Rust-resist...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e19082e1-827e-480e-be02-b194c933238e.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP09SREFCRVQRB72FT304F",
    "name": "Wall Mount Metal Hook",
    "category": "office",
    "price": 699,
    "description": "Upgrade your space with this Wall Mount Metal Hook, crafted from high-quality, durable metal. Perfect for organizing coats, bags, cables, or tools, this hook provides reliable support with a sleek design. Its matte black finish suits any modern or industrial décor, while the easy installation mak...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c4e1c431-4418-4601-8fc9-804a9aa2333e.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP09RHZJYCYFK32K4V3SYY",
    "name": "Triangular Metal Wall Shelf",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your home or office with this sleek Triangular Metal Wall Shelf. Crafted from high-quality metal, this shelf is perfect for utilizing unused corner spaces. Its sturdy design allows you to store books, decorations, or kitchen essentials with style. Easy to install and maintain, it’s both p...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/45c86cc6-d1c2-411c-81ff-d164e3de8295.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP09QC090V4D4EWTCAAQAG",
    "name": "Metal Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "This stylish and sturdy metal phone stand is designed for convenience and durability. Its compact, foldable design makes it perfect for desks, bedside tables, or travel. The stand securely holds your phone at an optimal viewing angle, while its non-slip base ensures stability. Includes a round me...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/86d6be0d-cf19-44c1-8778-f868368054e6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP09Q69N5YME5R86AG4YQN",
    "name": "Wall Mount Metal Mobile Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your desk or wall clutter-free with this sleek Wall Mount Metal Mobile Holder. Made from sturdy metal with a durable finish, it securely holds your smartphone in place and features easy wall installation with included adhesive. Suitable for home, office, kitchens, and more, it adds both conv...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/492d5286-2d46-4bd1-8ece-87d1cef60ada.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP09ER9T27TQ2KSDG24KC7",
    "name": "Wall Mounted Paper Towel Holder",
    "category": "office",
    "price": 499,
    "description": "Upgrade your kitchen or bathroom with this wall mounted paper towel holder. Designed for durability and convenience, it easily attaches to any flat surface, maximizing your counter space and keeping towels within easy reach. Its sleek black finish and simple design blend seamlessly with any décor...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/2fb932b3-f6a4-4f66-b80e-592081fc44da.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP09EBZJQ85T2DHAJGFS3D",
    "name": "Round Metal Coaster Set",
    "category": "everyday",
    "price": 499,
    "description": "Protect your furniture in style with this round metal coaster set, complete with a sleek and sturdy holder. Designed with a smooth, gold-toned surface, they are perfect for homes, offices, or cafes. The unique stand offers convenient storage and a modern touch to any space.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/50837a25-2595-4eeb-8fe7-fdb807f5c066.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP09E59727NMCNDZHDAEE6",
    "name": "Gold Finish Table Mirror",
    "category": "everyday",
    "price": 899,
    "description": "Enhance your workspace or vanity with this Gold Finish Table Mirror. Featuring a round, reflective gold-toned surface and a sturdy black metal frame, it combines style and practicality for touch-ups, grooming, or decorative use. Compact and modern, it&#39;s a perfect addition to any home or office.",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "85 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/74aee80e-de0f-47c3-801c-e5dfcd4ffbd3.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMP09E1P0WD49DQ2CG84W1T",
    "name": "Wall Mount Cup Holder",
    "category": "office",
    "price": 499,
    "description": "Upgrade your kitchen or office with this durable Wall Mount Cup Holder. Featuring a sleek black metal frame and a stable base, it securely holds your cups or mugs, maximizing your counter space. Easy to install and designed for everyday use, it&#39;s both practical and stylish, making it a must-have ...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d3bf8ac8-1b77-4991-8358-6555d6b53cfb.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMP09DRT6SYS9NGQBVFSHJX",
    "name": "Wall Mounted Metal Headphone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your headphones organized and accessible with this durable wall-mounted metal headphone stand. Featuring a sleek black design and robust construction, it&#39;s perfect for home, office, or studio use. Easy to install and suitable for all headphone sizes, this stylish accessory helps declutter yo...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e1a480c0-0f70-4c30-85d6-f4d09e23da00.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNYT2HPMTMAQ83BV30R0D2",
    "name": "Wall Mounted Multi-Purpose Hook",
    "category": "office",
    "price": 699,
    "description": "Upgrade your home organization with this durable wall mounted multi-purpose hook. Crafted from high-quality metal with a sleek black finish, it features four strong hooks and a corner-friendly design, perfect for hanging bags, headphones, cables, or kitchen utensils. Easy to install and ideal for...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/2caa2047-5ea4-432c-9278-92d2dabde7c0.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNYT1Z9G80WPYJMWWEMM8R",
    "name": "Metal Desktop Stand",
    "category": "office",
    "price": 499,
    "description": "Stylish and sturdy, this metal desktop stand is perfect for holding your smartphone or tablet at an optimal angle. Its sleek triangular design ensures durability and stability, while the soft pads protect your device from scratches. Ideal for home, office, or study desk setups, it supports a wide...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a7c27e73-8df6-4fc4-bfef-114933649423.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNYT0RDAQWMB4495QQ0RPB",
    "name": "Metal Corner Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Sturdy and reliable, this metal corner bracket is designed for strong support in a variety of DIY and professional assembly projects. Made of high-quality steel with a corrosion-resistant finish, it is perfect for shelving, furniture reinforcement, or frame construction. Easy to install and highl...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/bba64792-e726-4b7f-badb-4951270f71ec.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNYT0WXZSF83E9VXYNFK7K",
    "name": "Triangle Multi-Device Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your workspace neat with this sleek triangle multi-device stand, perfect for holding smartphones, tablets, or other small gadgets. The sturdy construction offers stability and features padded grips to protect your devices from scratches. Ideal for home, office, or study, this stand brings co...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/3a796798-00c0-4c7a-b8a6-fa270134acca.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNYSZMMK36GHP37QP8J5M4",
    "name": "Wooden Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your workspace with this stylish Wooden Mobile Stand. Crafted from durable wood, it securely holds your mobile device upright, perfect for hands-free use, video calls, or viewing content. Its natural finish adds a touch of sophistication to any desk or table. Lightweight, portable, and ea...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/4db06c50-0da7-4e14-858e-22c53c9a6f85.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNYSRK426CCMQG74R1EFBE",
    "name": "Mini Wooden Table",
    "category": "everyday",
    "price": 499,
    "description": "Add a touch of elegance to your workspace with this handcrafted mini wooden table. Perfect for showcasing small items, organizing office essentials, or as a charming décor piece. Built with durable wood and precision-cut joints for a unique look.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/38e5e081-623d-40cd-ad27-8e062c38440d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNYSRCYKJCXEQET7RCP1BV",
    "name": "Wooden Desk Organizer",
    "category": "office",
    "price": 499,
    "description": "Keep your workspace tidy with this stylish wooden desk organizer. Designed for durability and a touch of elegance, it perfectly holds pens, notepads, and office essentials. The natural wood finish adds warmth to your desk while optimizing your storage. Ideal for home or office use.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ada95f42-876f-4c37-9818-0b4b6211867a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNYSRT2BXN8GFVZ15W7HYC",
    "name": "Wooden Gear Coaster",
    "category": "everyday",
    "price": 499,
    "description": "Elevate your tabletop with this stylish wooden gear-themed coaster. Crafted from high-quality wood and precision laser-cut, it features geometric detailing and a contemporary look. Perfect for coffee, tea, or cold drinks, it protects surfaces and adds a modern touch to any home or office. Easy to...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/81acc601-1870-44f0-bd0a-1a3be9ba6eb8.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNYSQK7X5VCWNE21ZD0BJP",
    "name": "Wooden Corner Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your shelves or furniture with this stylish wooden corner bracket, crafted from durable MDF and featuring a precision laser-cut gear design. Easy to install and perfect for DIY projects, this accessory adds a unique touch to any decor. Ideal for modern and industrial-themed interiors.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/6af55046-852e-49df-b42d-5d7b1e9b713a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNYSPDS7PXWS9W1DRQ2EJG",
    "name": "Wooden Storage Box",
    "category": "everyday",
    "price": 499,
    "description": "This finely crafted wooden storage box offers a sleek and sturdy design, perfect for organizing small items like jewelry, coins, or stationery. Its compact build ensures it fits seamlessly on any desk or shelf. Made from high-quality wood, it adds a touch of elegance to any space while keeping yo...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/df9ca690-3126-4358-a0b1-d2ad8e1b086a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNXKRBTZYN21TC7HKHP9HB",
    "name": "Adjustable Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "This sturdy, adjustable mobile stand is designed for desktops and workspaces. With a foldable hinge for easy portability and rubber grips for stability, it securely holds your phone for hands-free video calls, streaming, or browsing. Durable metal construction guarantees long-lasting use, making ...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d2814bfb-ee92-4bb5-9fd8-5e15f3661c9b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNXKRMYFGJ8V7BXS70M1YG",
    "name": "Foldable Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your work and entertainment experience with this portable foldable mobile stand. Designed for stability and convenience, it supports smartphones and small tablets in both portrait and landscape orientations. Perfect for use at your desk, bedside, or while traveling. Durable metal construc...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/2a055940-912b-442e-9ad3-4dd91ade76dc.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNXKQ3Z42MW973WQHVVBVF",
    "name": "Portable Foldable Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "This portable foldable mobile stand is designed for convenience wherever you go. Its sturdy metal construction ensures durability, while its adjustable angles make it perfect for watching videos, video calls, or reading. Lightweight and easy to carry, it suits any mobile device and fits seamlessl...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/56c5b4c2-d2ed-4ec2-ba84-4c5f21d45c7a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNXKPSC7MSAFN734M15P5Y",
    "name": "Foldable Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your device secure with this compact foldable mobile stand! Designed with sturdy metal construction, it offers adjustable angles for comfortable viewing whether you&#39;re working, watching videos, or video calling. Its lightweight build makes it easy to carry and perfect for desks, travel, or h...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e988e6bb-1cb2-42d0-b5bc-f574bc8524ce.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNXKND3RAYKNAD8PBAFB84",
    "name": "Foldable Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your workspace or entertainment zone with this sleek foldable mobile stand. Designed for universal compatibility, it securely holds your smartphone or small tablet in place, offering adjustable angles for comfortable viewing and hands-free usage. Lightweight and portable, it&#39;s ideal for t...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/46451722-03ea-409f-a4e9-576be0d4e2b5.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNXKF4E97XB34EVF33A4XN",
    "name": "Adjustable Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your workspace with this adjustable mobile stand. Made from durable plastic, it securely holds your phone at a comfortable viewing angle, perfect for video calls, reading or watching videos hands-free. Its foldable design ensures easy portability, making it an ideal accessory for home, of...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0dccf1ba-45a5-4a9e-af76-049f43ee89ca.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNXKE2H9260NKY56W2SEC9",
    "name": "Foldable Laptop Stand",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your workspace with this sturdy foldable laptop stand. Crafted from durable metal, it provides reliable support for laptops, tablets, or books. Its adjustable angles ensure ergonomic comfort, helping reduce neck and back strain. Lightweight and compact, perfect for travel or office use. N...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ab880be0-3823-4d41-83db-35e656f0135d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNXKDRVDS13DNKBC36BEP9",
    "name": "Metal Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your workspace with this sturdy metal phone stand. Designed for stability and adjustability, it securely holds your smartphone at the perfect viewing angle for video calls, streaming, or reading. The sleek black finish complements any desk setup, making it both functional and stylish. Ide...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/fd2412e4-c30c-4bb5-807d-5fad2ecc95b9.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNXKDCJMXQ69A6P48DX59P",
    "name": "Metal Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your smartphone upright and stable with this premium metal phone stand. Designed for convenience and durability, it features a sleek black finish and an anti-slip base for reliable support on any desk or table. Perfect for video calls, streaming, or charging your device hands-free.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/55ca597f-a32e-41e6-b233-5fc4b124f01c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNXKCC5XRXESGVECRJGPQA",
    "name": "Metal Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your phone secure and accessible with this robust metal mobile stand. Designed for stability and convenience, it features a sleek, foldable design that&#39;s perfect for desks, bedsides, or travel. The stand holds your device at an optimal viewing angle and is compatible with most smartphones an...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/31aa673e-7d8f-4533-890c-cb4bd459f531.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNWD88KSWBSTXGS1R9YVPQ",
    "name": "Adjustable Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "This adjustable wall mount bracket is crafted from sturdy metal, designed to securely hold devices or accessories. Perfect for use in offices, homes, or workshops, the bracket features an easy-to-install design and adjustable angle for optimal positioning. Ideal for shelves, routers, or small ele...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/951735f9-248a-428e-a0f8-eb132d4681c6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNWD7NJYFTDT1XPMDWTPCS",
    "name": "Adjustable Metal Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your phone upright and accessible with this adjustable metal phone stand. Crafted from durable, high-quality steel and featuring a sleek black finish, it provides stable support for hands-free use at your desk or bedside. The pivot mechanism allows you to adjust the viewing angle for optimal...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/87ca9d18-c4c2-4967-8b2f-3787b4442510.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNWD6YZ7TRBJEYAGD1MN1G",
    "name": "Mobile Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your phone upright and stable with this durable mobile phone stand. Ideal for watching videos, video calls, or browsing, its compact design ensures portability and is perfect for any workspace or bedside table. The anti-slip base guarantees your phone stays safely in place.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d85e6bd6-f823-4dad-9ea0-dc160c17c3df.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNWD5T1KAHFC0HS2B5KMF9",
    "name": "Foldable Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your workspace with this foldable mobile stand, designed for stability and adjustability. The sleek metal construction ensures durability and a modern look, making it perfect for watching videos, video calls, or reading. Its compact foldable design makes it easy to carry and ideal for tra...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d4b49fac-e756-49a3-ac53-a663e9ec1bea.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNWD4FJJ683TCZMTA5W9SY",
    "name": "Mobile Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your phone easily accessible and secure with this stylish mobile phone stand. Designed for stability and convenience, it&#39;s perfect for video calls, watching content, or just keeping your device within reach. Its compact and modern design fits any workspace or bedside table.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/9aede89b-112a-4273-9560-0cfec7bd8089.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNWCXCAMAG0TVX7PYJ7H7B",
    "name": "Adjustable Metal Mobile Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your device secure and within reach with this adjustable metal mobile holder. Designed for durability and stability, its foldable structure allows for easy portability and space-saving storage. Suitable for all smartphones, it is ideal for desks, workspaces, or bedside tables. Enjoy hands-fr...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/229b16e9-8923-423f-97bd-c9e8d93ccc73.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNWCXVQQPXBWH3EC2Z7VZH",
    "name": "Foldable Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your workspace with this versatile foldable mobile stand! Crafted from durable metal, it offers a sleek design and adjustable angles for optimal viewing, making it perfect for your smartphone or small tablet. Its lightweight, portable construction ensures easy storage and transport – idea...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/34a753d5-122c-4114-bc72-807312b7efba.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNWCXM650G56PBEHB3N59J",
    "name": "Metal Wall Shelf Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your storage with this robust metal wall shelf bracket, perfect for creating foldable shelves in your home or office. Made from high-quality steel with a sleek black finish, it provides excellent stability and strength. Easy to install with the included screws, this bracket is ideal for m...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/7e41e2a8-3a86-43be-b00c-8b6d4990f9c9.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNWCWKHWWFPZ37NSWCT5PX",
    "name": "Mobile Phone Table Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your device secure and accessible with this sturdy mobile phone table stand. Designed for convenience, it features an adjustable angle for comfortable viewing, rubber pads for anti-slip protection, and a sleek, compact build perfect for any workspace or bedside table. Use it for video calls,...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/050e98c4-3113-48d3-b6fa-602874c2a37c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNWCVK0TG2YVE0KT0QSKCN",
    "name": "Adjustable Wall-Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your space with this versatile Adjustable Wall-Mount Bracket, perfect for securely holding shelves, signage, or other items. Made from durable metal with a sleek black finish, this bracket features an adjustable arm for optimal positioning. Easy to install and built to last, it&#39;s ideal fo...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/49798a2e-e639-48d7-aed8-0ce895347a32.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNTYYW5WGAXMQQ9GXYQDCB",
    "name": "Metal Bottle Holder",
    "category": "office",
    "price": 499,
    "description": "Sturdy and stylish, this metal bottle holder is perfect for securely storing your bottle on tables or shelves. Its vibrant red finish adds a pop of color to your kitchen or dining area, while the stable wire construction ensures long-lasting use. Ideal for both home and commercial settings, this ...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8eda40f9-8900-43bf-9365-d6f6d4f2ccfd.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNTYZ6BJRQXH5ZYHZAT888",
    "name": "Red Metal Cup Holder",
    "category": "office",
    "price": 499,
    "description": "This stylish red metal cup holder is perfect for desks, kitchens, or cafes. Its durable build holds mugs, small cups, or goblets securely and adds a pop of color to your space. With its compact size and non-slip base, it&#39;s ideal for everyday use or as a decorative item.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/397ae939-6974-4329-9eb8-cea11f13cc33.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNTYX5M76QMVMFZH45PF3N",
    "name": "Universal Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your storage solutions with this universal wall mount bracket, made from premium metal for enhanced strength and durability. Its sleek design and easy installation make it perfect for securely mounting devices, shelves, or accessories in your home or office. Rust-resistant finish ensures ...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b81fdb01-7477-4767-bee0-f0a362694953.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNTYWDSFXNNY7DBBXKNNR6",
    "name": "Metal Cup Holder Stand",
    "category": "office",
    "price": 499,
    "description": "Keep your cups neatly organized and easily accessible with this sturdy metal cup holder stand. Made from quality metal with a stylish red coating, it’s perfect for kitchens, offices, or cafes. Its compact and modern design ensures it fits in any space while adding a splash of color. Easy to clean...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/be68b873-00c3-45d7-afbb-34aeb9f7784f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNTYTZWB0KVRPZ2H0RTJ6E",
    "name": "Red Metal Bottle Holder",
    "category": "office",
    "price": 499,
    "description": "Elevate your storage with this robust red metal bottle holder, perfect for keeping bottles secure and organized. Its sturdy design ensures long-lasting use in your kitchen, garage, or workshop. Easy to install and ideal for both home and commercial spaces.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c0fe3d13-742e-446f-bf11-42af1f7a5d85.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNTYKNASH3SF7WD9N4B0N6",
    "name": "Heavy Duty Metal Bracket",
    "category": "everyday",
    "price": 499,
    "description": "This heavy duty metal bracket is designed for reliable and stable mounting applications. Crafted from robust steel with a sleek black finish, it offers superior strength for industrial and home use. Ideal for securing equipment, shelves, or machinery, its precision-engineered design ensures long-...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ecfda85f-71c2-496b-a679-8258a873e1a2.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNTYKE33SG7Q349SAKHG2W",
    "name": "Red Metal Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your phone secure and easily accessible with this sturdy red metal mobile stand. Perfect for watching videos, video calls, or just keeping your device organized on your desk. Its sleek design blends well with any workspace and is compatible with most smartphone sizes.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f2476b4a-5704-4a19-ba4e-b45101af3324.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNTYK79FHQPGCDXBZY0YE2",
    "name": "Wall Mount Bracket",
    "category": "everyday",
    "price": 499,
    "description": "Secure your items with this robust wall mount bracket, made from durable metal and featuring a sleek black finish. Perfect for organizing tools or accessories in your workshop, garage, or home. Its strong design ensures stability and long-lasting performance.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/1bf63e7d-d73c-496b-8438-621f63800fad.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNTYJND0YQDJHX642AD0D4",
    "name": "Multipurpose Metal Wall Hook",
    "category": "office",
    "price": 699,
    "description": "Keep your space neat with this multipurpose metal wall hook. Made from high-quality steel and featuring a sleek black finish, this organizer is perfect for holding keys, bags, cables, or other daily essentials. Easy to install and designed for durability, it adds both style and function to any wall.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/9d4eff5c-d895-430b-a312-b590643db00c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNTYHKNRGK4QC7JN3DWE5M",
    "name": "Metal Desk Phone Stand",
    "category": "office",
    "price": 499,
    "description": "Upgrade your workspace with this sturdy metal desk phone stand. Crafted from premium steel and finished in matte black, it securely holds most smartphones for easy viewing and hands-free operation. Ideal for office and home, its minimalist design helps organize your desk and complements any décor.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/3611322e-59cf-4bf9-bff6-5941f73a5e9c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNSRHP6H6NYC2WFZ83KBHJ",
    "name": "Wall Mount Spotlight Fixture",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your interiors with this sleek Wall Mount Spotlight Fixture. Designed to hold LED spotlights, its durable metal construction and matte black finish perfectly complement modern décor styles. Easy to install and adjust, it&#39;s ideal for accent lighting in your living room, hallway, or gallery...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d93dfb28-3b57-4101-96c0-e568fead95fd.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNSRHEWPAY1DZQPXA49X4B",
    "name": "Metal Mobile Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your phone secure and your desk organized with this durable metal mobile holder. Featuring a sleek black finish, it offers stable support for your device and a convenient cable slot to keep chargers out of the way. Suitable for office and home use, it’s perfect for calls, watching videos, or...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0033ceed-9ce2-4797-9a1b-c106414e8137.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNSRH4FBB8E9X5YS1E3FCE",
    "name": "Multipurpose Mobile Stand with Pen Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your workspace tidy and efficient with this multipurpose mobile stand featuring a built-in pen holder. Perfect for home or office use, this sturdy stand offers secure support for your smartphone or small tablet, while the attached pen holder keeps your writing instruments organized and easil...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d094dce4-5b94-40a6-b03a-5bea5e38748f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNSRFW100GZR6E60224MT2",
    "name": "Gold-Plated Round Decorative Knob",
    "category": "everyday",
    "price": 2499,
    "description": "Upgrade your furniture with this elegant gold-plated round decorative knob. Featuring a sleek black center and a glossy gold border, it adds a touch of luxury and modern style to cabinets, drawers, or dressers. Easy to install, durable, and perfect for a refined home interior.",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/1e90e7cb-6552-4a12-a686-b7175e92c1b3.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNSRE7DM3M9VYBJP31HAAZ",
    "name": "Magnetic Wall Mount Holder",
    "category": "office",
    "price": 499,
    "description": "Upgrade your space with this sturdy Magnetic Wall Mount Holder. Easily attach and organize accessories or gadgets using strong embedded magnets. Suitable for remotes, keys, tools, or small electronics, it&#39;s perfect for home, office, or workshop use. Durable build and easy installation make it a m...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/3799bcd0-eb5f-48da-abb6-1d9681b10b71.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNSR8577E8KN0RXKP6DZES",
    "name": "Wooden Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your workspace tidy and your phone easily accessible with this durable wooden phone stand. Its minimalist design fits seamlessly into modern decor, offering both stability and elegance for your device. Perfect for charging, video calls, or viewing content hands-free. Crafted from high-qualit...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/6c4d30cc-52cb-44c2-90cb-8b55e4b8634f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNSR7BFXA0BGMRGS13TQ7T",
    "name": "Wooden Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your phone secure and accessible with this sleek wooden phone stand. Crafted from durable wood, it offers a minimalist design that fits perfectly on any desk or workspace. Ideal for hands-free viewing, video calls, or charging, this stand is lightweight and easy to carry. Enhance your worksp...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c825b8b4-765e-4fd3-a816-990c09acc173.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNSR6B9AY2MY7HMQRJCNFY",
    "name": "Wall Mount Metal Bracket Set",
    "category": "everyday",
    "price": 499,
    "description": "This wall mount metal bracket set is perfect for securely holding various devices such as routers, adapters, or small gadgets. Made from sturdy metal with a sleek black finish, it offers easy installation and a modern look. Ideal for organizing and optimizing your workspace or home setup.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/846138a5-8c17-4fc5-906a-9195e61b0ede.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNSR5TQ00C5FKM13V0Q166",
    "name": "Wooden Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Elevate your phone experience with this stylish wooden mobile stand. Perfect for desks, nightstands, or workspaces, it provides stable support for your device while maintaining a sleek, natural look. Portable and lightweight design with easy slotting mechanism. Ideal for hands-free viewing, video...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/93577d39-5c1a-42ee-913c-5e6367148d89.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNSR4ZCEYYA4R27MDWSGBE",
    "name": "Wooden Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your workspace with this minimalist wooden mobile stand. Perfect for desks or bedside tables, it securely holds your phone upright for easy viewing and hands-free use. Crafted from high-quality wood, it offers a stylish and durable solution to keep your mobile device organized. Ideal for ...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b2ad0f8c-1639-4f87-864f-ffc83ffba1fb.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNRKKMS9K931N37VYR3CXX",
    "name": "Wooden Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your smartphone secure and accessible with this stylish wooden mobile stand. Crafted from durable wood, it features a smooth finish and a sturdy base—perfect for your desk, office, or bedside. Suitable for most phone sizes, it also makes a great gift for professionals and students alike.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c6464916-ee3c-4fa1-a25d-6cd54d97e894.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNRKK60EXAK2F31VGXMACF",
    "name": "Wooden Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Upgrade your workspace or home with this stylish Wooden Mobile Stand. Made from durable, sustainably sourced wood, it securely holds your phone upright for easy viewing and hands-free use. Perfect for video calls, watching videos, or simply keeping your device organized. Its elegant and minimalis...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/adb07f28-0c04-47b1-ac30-870cfd384bde.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNRKJZ3Z61308JG8JT4DHZ",
    "name": "Wooden Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "This stylish wooden mobile stand is perfect for keeping your phone upright and accessible on your desk. Designed with a modern finish, it&#39;s compact, sturdy, and holds most smartphones securely. Ideal for work or home, it adds a touch of elegance to any setup and is easy to assemble and move.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ea396177-9842-410a-8f39-f414931f7e7d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNRKJ3F00ES1Q7SNFTE71D",
    "name": "Wooden Phone Stand",
    "category": "everyday",
    "price": 499,
    "description": "Keep your phone easily accessible and upright with this stylish wooden phone stand. Made from quality wood with a smooth finish, it securely holds your device in both portrait and landscape orientation. Perfect for office desks, home use, or video calls, its compact and portable design makes it a...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a4f6c97a-9a48-4de5-9b66-895e43110da1.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNRKH4CCBBFS6T9MNN8SF4",
    "name": "Wooden Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Organize your workspace with this stylish wooden mobile stand. Designed for stability and elegance, it securely holds your phone at an ideal viewing angle, making it perfect for calls, videos, or charging. Crafted from high-quality wood, it adds a natural aesthetic to any desk or nightstand.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/92be2f46-b9f3-4d46-9c2a-d56b188e5f85.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNRKAZEG8BE48PP4XJ1PEH",
    "name": "Gold Plated Card Holder",
    "category": "office",
    "price": 1299,
    "description": "Elevate your professional image with this sleek gold plated card holder. Crafted for durability and style, it keeps your business cards pristine and instantly accessible during meetings and networking events. Compact design fits easily into your pocket or bag, making it a sophisticated accessory ...",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a84ae27b-5ea2-4fac-8639-2a15a0e9d0b1.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNRKANSPK1V7XW04ZDGHAV",
    "name": "Wooden Mobile Stand",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your workspace with this elegant wooden mobile stand, designed to hold your smartphone securely and stylishly. Crafted from durable plywood, it features a smooth finish and sturdy build, perfect for hands-free video calls, watching videos, or charging your phone. Its sleek design fits sea...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/4c0ff781-f85f-45ee-90c7-3fb201720ee9.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNRK9BS2WK0F4Y3SKYQXRS",
    "name": "Black Ceramic Coaster",
    "category": "everyday",
    "price": 499,
    "description": "This stylish black ceramic coaster features a sleek gold rim, adding a touch of luxury to your home or office decor. Protect your surfaces from stains and spills while elevating your space with its modern design. Perfect for coffee tables, desks, and gift giving.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b8597e8b-f23c-497f-aefc-9d30284f30ec.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNRK8FQ5CMQCZYBXQRXPTB",
    "name": "Elegant Gold-Black Coaster",
    "category": "everyday",
    "price": 499,
    "description": "Enhance your table setting with this elegant gold-black round coaster. The sleek black center perfectly complements the shiny gold rim, making it an ideal addition to both modern and classic decor. Prevents scratches and water rings on any surface. Perfect for homes, offices, or as a gift.",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f5bdb7f7-77f8-4071-b746-3169cf6d1cea.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNRK86FEQF2JJH0HRZ7JCC",
    "name": "Elegant Black & Gold Badge",
    "category": "everyday",
    "price": 499,
    "description": "Elevate your style with this Elegant Black & Gold Badge. Featuring a sleek black center surrounded by a shiny gold rim, this pin is perfect for clothing, bags, or as a statement accessory. The sophisticated design offers a touch of luxury and class to any outfit, making it ideal for formal events...",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/12ebc55e-926e-4eaa-8a2b-9b7a8eabbb00.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNQ31EFHNF1GRJZ5H1CMZF",
    "name": "Metal Card Holder",
    "category": "office",
    "price": 1299,
    "description": "Keep your business cards neatly organized and protected with this robust metal card holder. Featuring a sleek, minimalistic design and sturdy metal construction, this holder ensures your cards stay safe from bends and wear. Perfect for professionals looking to make a lasting impression with a tou...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/267da75e-c3df-4b36-b56f-1a4459dc8e5c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNQ2KD6SH008MBMN2WQ8XR",
    "name": "Gold Bar 1000g",
    "category": "office",
    "price": 85000,
    "description": "Invest in your future with this premium 1000g gold bar. Crafted from fine 24K gold, this bar is an ideal asset for secure investment or gifting. Its impeccable quality and exceptional purity make it a top choice for collectors and investors alike.",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "1000 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f193da6c-5466-4d96-9b9f-50eb5e90ff67.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNQ2FBV59HR171RZG47FTP",
    "name": "1kg Gold Bar",
    "category": "office",
    "price": 12500,
    "description": "Invest in purity and security with this 1kg gold bar, crafted from 999.9 fine gold. Ideal for investors, collectors, and those seeking premium quality bullion, this bar offers exceptional value and authenticity. Perfect for gifting or long-term wealth preservation.",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/cb6b043d-9d81-4b1f-a542-db0095f38777.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNQ2DQ1SG09BJGA5WSQ80R",
    "name": "Rectangular Blackboard Eraser",
    "category": "office",
    "price": 199,
    "description": "Efficiently clean chalkboards with this rectangular blackboard eraser. Its compact and lightweight design fits comfortably in your hand, making it easy to remove chalk dust and keep boards clear. Ideal for classrooms, offices, and home learning spaces. Durable and long-lasting for daily use.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0aefd906-3041-470a-9acc-96259daa8892.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNQ2DBBSDXVBHTPBVC1HXY",
    "name": "Gold-Plated Card Case",
    "category": "everyday",
    "price": 499,
    "description": "This gold-plated card case offers a stylish and professional solution for storing your business cards. With a sleek metallic finish and compact design, it&#39;s perfect for making a great first impression. Durable construction ensures your cards stay safe and crisp during meetings and travels.",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c9d0166f-3e9a-4a30-978c-5599ee2ecff9.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNQ2C9S9S8ZDGTX70FX3WJ",
    "name": "1000g Fine Gold Bar",
    "category": "office",
    "price": 85000,
    "description": "Experience premium investment value with this 1000g Fine Gold Bar. Crafted with 999.9 purity, it is ideal for secure investments, wealth preservation, and gifting. This bar offers assured quality and purity, making it a prestigious addition to your precious metals portfolio. Perfect for investors...",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ac6701d2-6ae0-4158-a1fd-bbfd980ab547.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNQ24RJ8HC85TAAZE6PM9Y",
    "name": "Compact Whiteboard",
    "category": "everyday",
    "price": 499,
    "description": "This compact whiteboard is perfect for quick notes and reminders on the go. Lightweight and easy to carry, it features a smooth writing surface suitable for markers or pens. Ideal for students, professionals, or anyone who needs a handy writable surface. Durable build ensures longevity and repeat...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/632bf234-54cd-452c-8f3c-3330d39c2e90.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNQ24W0WK0C2KWTJ1VG98H",
    "name": "Metal Card Holder",
    "category": "office",
    "price": 1299,
    "description": "Keep your cards organized and protected with this sleek metal card holder. Featuring a sturdy folding mechanism, it is ideal for daily use and fits easily in your pocket or bag. Stylish and practical, perfect for professionals and frequent travelers.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ca1ff5b0-a7aa-45cc-99b9-b5e7c2f9b21b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNQ251J5TAJB90FFECG8X7",
    "name": "Metal Card Holder",
    "category": "office",
    "price": 1299,
    "description": "Keep your business and credit cards protected with this sleek metal card holder. Designed for durability and a professional look, this holder easily fits into pockets or bags. The secure flap ensures your cards stay safe and organized, making it ideal for office and travel use.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/90714361-d773-439f-8453-4786d584dff3.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNQ241NMMMB2Z31V57GCB6",
    "name": "Metal Card Holder",
    "category": "office",
    "price": 1299,
    "description": "Keep your business cards safe and stylish with this sleek metal card holder. Its sturdy construction ensures your cards are protected from bending and damage, making it perfect for professionals on the go. Compact and lightweight, it fits easily in your pocket or bag.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/4fdc2484-a442-479c-aa19-533068b03bcc.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNM4T3PA7RHSK4F2SPC22T",
    "name": "Cricket Bat Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Show your love for the game with this elegant cricket bat keychain. Crafted from durable metal, it features a miniature bat design and a secure keyring, perfect for sports fans and collectors. Lightweight, trendy, and easy to carry – a great accessory for your keys, bags, or gifts.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a598e175-df6a-4770-8c0a-5af199ea138b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNM4TE34C9691H5SHCJA98",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "This stylish metal keychain doubles as a handy bottle opener, making it perfect for both everyday use and special occasions. Durable and compact, it easily attaches to your keys for convenient access. Ideal for gifting, travel, and adding utility to your daily essentials.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a7b2bd5f-58e2-422e-be86-ecbd812713f1.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNM4GZQGF445JW1WGA669W",
    "name": "Metal Keychain with Amber Accent",
    "category": "everyday",
    "price": 299,
    "description": "Crafted from high-quality metal, this keychain features a sleek design and an eye-catching amber accent for a touch of elegance. Perfect for keeping your keys organized and easy to find. Its sturdy build ensures long-lasting use. Great as a gift or personal accessory.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/529030cc-db62-4869-b298-8c19cd703a32.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNM4HAS3C5W16R3W5D9XTG",
    "name": "Square Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this classic square metal keychain. Its minimalist design suits all styles, while the sturdy metal construction ensures durability for daily use. Perfect for personal use or gifting, this keychain is lightweight and easy to carry anywhere.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/312e2fa9-e2d1-4081-b933-114ceb34f135.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNM4GF38ND49MREVB8TMR8",
    "name": "Chef Knife Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of culinary flair to your everyday carry with this Chef Knife Keychain. Crafted with a sleek metallic finish and a vibrant red accent, it&#39;s perfect for cooking enthusiasts and collectors alike. Durable, lightweight, and easy to attach to any keyring, this unique accessory is sure to s...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e35f4f94-8ae5-4018-93d0-f6bc7ed66c25.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNM4FC3JHMPFXN2GKFEHDC",
    "name": "Cricket Bat Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Show off your love for cricket with this stylish Cricket Bat Keychain. Crafted from durable metal and featuring a miniature bat design with a small red ball, this keychain is perfect for sports enthusiasts. Attach it to your keys, bag, or backpack for a unique and eye-catching accessory. Ideal as...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f8a11d80-17a4-4bc4-87d6-32cbca762b38.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNM4FSTJB2KW6W85VRYB7E",
    "name": "Medical Symbol Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Carry your passion for medicine wherever you go with this durable metal keychain featuring the iconic medical caduceus symbol. Ideal for doctors, nurses, medical students, and healthcare professionals. Perfect for gifting or daily use, this keychain adds both style and meaning to your keys.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/bfc7e77f-ae1e-4dfc-9946-16e05f1d6824.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNJRPGTXVNYEKA7EMB7JBF",
    "name": "Medical Symbol Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this Medical Symbol Keychain, featuring an elegant caduceus design. Perfect for doctors, healthcare professionals, or anyone passionate about medicine. Makes a thoughtful gift and adds a touch of sophistication to your daily essentials.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d1a1bd2d-481c-4ab5-a031-bbcc447ce200.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNJRP9540YHX893VCD9DPE",
    "name": "Metal Square Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this stylish metal square keychain. Featuring a sturdy ring and a sleek blank plate, it’s perfect for personalization or everyday use. Ideal for gifting or adding a personal touch to your belongings, this keychain is lightweight and corrosion-resistant.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a1e56538-f72c-4a9b-a0a2-b9cb1fd4bf1b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNJRNDX7NXQ1CS79TFTBN7",
    "name": "Medical Symbol Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Perfect for healthcare professionals and enthusiasts, this sturdy keychain features a prominent caduceus design, symbolizing medicine and healing. Durable metal construction ensures longevity, ideal for everyday use or as a thoughtful gift for doctors, nurses, and medical students.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a7a981b8-b175-439e-acd5-ba0aa7c76833.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNJRN65CW3BP7FVN79Y6ZR",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized and enjoy opening bottles with ease using this sleek, stainless steel keychain. Its compact design is perfect for everyday use, combining convenience and durability for those on the go. Makes a practical gift or a handy accessory for any occasion.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0aa4c4f1-c5f0-4b78-a4ae-21177bb90057.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNJRGY37JC1RDHYC3SKY8P",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal bottle opener keychain is perfect for everyday use. Easily open your favorite beverages and keep your keys secure, all with a stylish, polished finish. Durable and lightweight, it fits comfortably in your pocket or bag, making it ideal for travel, parties, or gifting.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/647871b7-1041-49a0-a12e-f89860f624f4.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNJRCHN0GRSTED92Z25GZK",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday carry with this sleek Metal Bottle Opener Keychain. Designed for convenience, it fits easily on your keyring and doubles as a quick-access bottle opener whenever you need it. Made from durable metal with a polished finish, it&#39;s perfect for parties, travel, or gifting. A must...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b5788035-710f-4be1-9119-4637b53e91a3.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNJRC0E3DVC6JDBCR8J1H6",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal bottle opener keychain is the perfect accessory for your keys. Compact and durable, it combines the practicality of a bottle opener with the convenience of a keyring. Ideal for parties, travel, and everyday use, this stylish tool ensures you&#39;re never without a bottle opener when ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8c364506-2530-4124-b9e8-7300f285c110.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNJRCAN3R10NB3FQVHB89H",
    "name": "Metallic Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your key organization with this stylish metallic keychain. Crafted from high-quality metal, it offers durability and a reflective finish that resists scratches. Perfect for car keys, house keys, or as a thoughtful gift. Its compact and modern look makes it a must-have accessory.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c2d05a8b-b231-4932-a082-8ee1ecfbef13.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNJRBC7DAXHCCYE8HJVK6V",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized and always have a bottle opener handy with this sleek metal keychain. Durable and lightweight, it&#39;s perfect for daily use and ideal for parties, picnics, or travel. A practical accessory for any occasion!",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/07ee998d-c8bb-4f4f-9b2b-326b30ad99a8.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNJR9PNWRMTJ45HR58H8ZN",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal keychain doubles as a robust bottle opener, perfect for everyday carry. Compact and lightweight, it securely holds your keys while offering added functionality whenever you need to open a bottle. Ideal for personal use or as a practical gift for friends and colleagues.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/9456fdf1-e981-46e3-8292-b5609f39750d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNH260XJVXGYQ87TNRG1R7",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys secure and always be ready to open a bottle with this sleek, stainless steel keychain bottle opener. Compact, lightweight, and stylish, it’s perfect for everyday use or gifting. The sturdy build ensures long-lasting performance and the polished finish adds a modern touch.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/3b45b272-61b7-4e5c-b183-af3a934feb47.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNH24T9QASQKAE6VGZ3YV5",
    "name": "Multipurpose Bottle Opener",
    "category": "writing",
    "price": 499,
    "description": "This durable multipurpose bottle opener is crafted from high-quality stainless steel for long-lasting performance. Compact and lightweight, it easily fits in your pocket or kitchen drawer, making it perfect for parties, picnics, and everyday use. The ergonomic design ensures a comfortable grip an...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/990e1144-30cf-40fb-881b-ac9986816cdb.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNH23WVVJY939AYGCPS5BX",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal bottle opener keychain is your go-to tool for any occasion. Made from durable stainless steel, it easily opens bottles and doubles as a handy accessory for your keys. Lightweight, functional, and polished for a premium look, it&#39;s perfect for daily use or gifting. Enjoy convenienc...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ff1edd27-c9af-4359-bac4-5aa742a5790d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNH244XND02B4GK1SX46EQ",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "This sturdy metal keychain bottle opener is a must-have for your everyday carry. Designed to open bottles effortlessly, it doubles as a stylish key holder, making it perfect for parties, travel, and daily use. Made from durable stainless steel and featuring a practical design, it fits easily in y...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a1a498cf-c683-4d03-b7ac-cd8995e90722.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNH237SX6V6YA4GHMYAGQB",
    "name": "Stainless Steel Multipurpose Hook",
    "category": "office",
    "price": 699,
    "description": "Upgrade your storage solutions with this stainless steel multipurpose hook. Perfect for hanging keys, kitchen utensils, or tools, it features a sleek design and offers lasting durability. Easy to install and comes in protective packaging for a premium finish.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/4afe55a1-bd33-46e7-9420-7e51c02e109a.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNH1V5MT8J8CKQYVMDXPDN",
    "name": "Metal Wrench Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your keys with this sleek metal wrench keychain. Crafted from durable metal, it not only keeps your keys organized but also adds a unique touch. Perfect for auto enthusiasts, engineers, or anyone who loves practical accessories. Lightweight and portable, it can also be used as a mini tool...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/291f9d87-cdcd-4bd8-9b4d-d34832d3b336.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNH1TTY2C11CDR5AMENNYJ",
    "name": "Arrow Shape Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this unique arrow-shaped metal keychain. Durable, lightweight, and featuring a sleek black finish, it&#39;s perfect for daily use or as a trendy accessory. Ideal for gifting and personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/9e8243bb-bd90-48b5-ae6d-a056d7362b41.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNH1TKMFE4XA71CCTA6EE5",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized and always be ready to pop open a drink with this sleek metal keychain bottle opener. Crafted from high-quality stainless steel, it&#39;s lightweight, rust-resistant, and built for everyday use. Perfect for gifting or as a practical addition to your daily essentials.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d3d67c7e-53e1-4a0c-872d-a921089fdc9c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNH1T0JBBTX531VC17QKTV",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal bottle opener keychain is perfect for everyday use. Made from high-quality aluminum, it fits easily in your pocket or attaches to your keys. Effortlessly open bottles anytime, anywhere, making it an essential tool for parties, picnics, or on-the-go. Stylish, lightweight, and buil...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c8fa0a87-eb02-471f-8e6c-6a8833c3f574.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNH1T7SAXVMG82X318REJV",
    "name": "Metal Key Holder Clip",
    "category": "office",
    "price": 499,
    "description": "Keep your keys secure and easily accessible with this premium metal key holder clip. Crafted from high-quality stainless steel, it offers strong durability and a sleek, modern look. The sturdy ring and clip design allows for quick attachment to belts, bags, or pockets—perfect for everyday use and...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ac38dbab-eae7-4b5d-a062-42ec88450c31.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNFPVSRPCQJKWY04BHZWMT",
    "name": "Arrow Shape Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized and easy to spot with this unique arrow-shaped keychain. Crafted with a sleek metal finish and bold black center, it&#39;s perfect for adding a touch of style to your daily essentials. Durable and lightweight, this keychain makes a great accessory or gift.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/29cffdfe-980b-4a04-bf73-8854e334ce28.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNFPW1WZ6QTBJX79CJH75G",
    "name": "House-Shaped Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this house-shaped metal keychain. Crafted from high-quality metal, it is both sturdy and attractive, making it a perfect accessory for your work, home, or car keys. Its sleek design is ideal for everyday use or as a thoughtful gift for new homeowners.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/20f8808a-0e65-476f-9158-c9ca52de2ccd.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNFPVCVN9DWJK3QETGW9QC",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This stylish gold metal keychain doubles as a convenient bottle opener, making it the perfect pocket tool for any occasion. Lightweight, durable, and easy to attach to your keys, it&#39;s a functional accessory for parties, travel, or everyday use. Impress friends and always be prepared to open a bot...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/cb1a659f-98a6-47c6-90db-657dba14cf5f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNFPTSYNBH5M6JZ8413J7W",
    "name": "Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek bottle opener keychain is perfect for those who value convenience and style. Made from durable metal, it effortlessly opens bottles and fits comfortably on your keyring. Lightweight, portable, and ideal for daily use, this accessory makes a great gift for friends, family, or yourself.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/da7ca7d7-6927-4a53-9e64-3c0990de569b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNFPRYH631FEY3PS7GRHM0",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Open bottles with ease anywhere you go using this sleek and durable metal bottle opener keychain. Crafted from high-quality aluminum alloy, it&#39;s designed for portability and strength, making it a perfect addition to your keys, backpack, or pocket. Ideal for home, travel, and outdoor adventures, i...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/edf3ab26-fadc-4014-bdb5-6d49075e3a7d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNFPJN68ZPKRTH0Z695ZVY",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "This stylish metal keychain doubles as a convenient bottle opener, making it perfect for daily use or as a gift. Durable and lightweight, it securely holds your keys while providing quick access for opening bottles at parties, picnics, and gatherings. Its sleek design fits easily in your pocket o...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/04338297-f8f2-41d9-a19d-321cca2fbf34.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNFPHJFTG4VBMYXCQF8G4Q",
    "name": "Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This stylish metal bottle opener keychain combines convenience and functionality. Its slim, lightweight design makes it easy to carry anywhere, perfect for opening bottles on the go. Durable construction ensures long-lasting use and the golden finish adds a touch of elegance to your everyday esse...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f8463baa-5b6f-454a-a63b-d85eca9545b1.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNFPHCJZSV0GXRXPBZTGA2",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal keychain not only keeps your keys organized but also features a built-in bottle opener for on-the-go convenience. Its durable, modern design makes it a perfect accessory for everyday use or gifting. Lightweight and easy to carry, this keychain combines functionality with style.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/630b13ab-ef4b-4122-a9f8-a64bd20db915.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNFPHTH8854G9Q0GKQ74CW",
    "name": "Metal Keychain with Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal keychain features a sturdy design with an integrated bottle opener, making it the perfect accessory for your keys. Compact and modern, it&#39;s ideal for daily use and great for gifting. Durable and rust-resistant, this keychain adds convenience and style to your everyday carry.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/cdf5320c-24b9-4249-a141-5a811dbd4942.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNFPG3SBVTWXE6SJ1FW01Q",
    "name": "Wooden & Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday essentials with this Wooden & Metal Keychain. Featuring a sleek, minimalist design, it combines the durability of polished metal with the natural beauty of a wooden insert. Perfect for personal use or gifting, this keychain keeps your keys stylishly organized and easily acce...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/50be703d-3abf-46dc-98fd-17f77882707b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNEB5A0DD1A7QQQD5Q9S75",
    "name": "Metal House Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of elegance to your keys with this metal house-shaped keychain. Crafted from durable metal, it features a sleek and modern design perfect for homeowners, real estate professionals, or anyone who loves unique accessories. Lightweight and sturdy, it easily attaches to all types of keys ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/803d55a6-be8d-4f43-8bd8-f32b999dc837.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNEB4WNYY88GCY4K3CJ3BP",
    "name": "Classic Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday carry with this classic metal keychain. Crafted from high-quality stainless steel, it provides reliable durability while maintaining a sleek and stylish look. Perfect for securing your keys or adding a touch of sophistication to your bag. Lightweight and easy to carry, it&#39;s ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/33a7b622-e13f-46f3-9604-d7981b229863.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNEB44QN0NHFQ2HAKP362S",
    "name": "Wooden Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This stylish keychain features a sleek rectangular wooden accent combined with durable metal hardware. Perfect for organizing your keys, it offers a blend of natural charm and modern design. Ideal as a gift or for daily use, it fits comfortably in your pocket and adds a touch of sophistication to...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/dd266c00-ab36-424c-adfc-8cc782ea857c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNEB3AGD6JMXFH2TXQT6QP",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "Carry convenience everywhere with this metal keychain bottle opener. Sleek and durable, it combines both a practical key holder and a bottle opener in one compact design. Perfect for daily use or gifting, it offers easy access to your keys and quick bottle opening on the go.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/9c84d650-7d33-48de-8e5d-318c175c1490.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNEB34MFGA901AGM8ANMG5",
    "name": "Metal Keychain with Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized and enjoy the convenience of a built-in bottle opener. This sleek metal keychain is both durable and practical, making it a must-have accessory for daily use. Its elegant design fits easily in your pocket, and the bottle opener functionality ensures you&#39;re always ready fo...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/eb839458-68eb-42f6-9c97-177b1d62f772.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNEAVSFBM9C8NBASS2PBBP",
    "name": "Metal USB Flash Drive Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your important files safe and accessible with this stylish metal USB flash drive keychain. Durable, lightweight, and easy to carry—simply attach it to your keys or bag for data on the go. Perfect for students, professionals, and tech enthusiasts.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/76addbb6-d6a7-477e-8384-8ce3910f48bb.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNEAV62TRWR4X74AZQ0MZ4",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "This stylish metal keychain doubles as a durable bottle opener, perfect for on-the-go convenience. Lightweight and compact, it easily attaches to your keys, backpack, or bag, ensuring you always have a bottle opener within reach. Ideal for everyday use or as a thoughtful gift for friends and coll...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/28f57db7-23fb-419a-a99d-73437b5d695d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNEAV0JNFTP691E9Y2VB0T",
    "name": "Metal Key Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your keys organized and stylish with this high-quality metal key holder. Designed for durability and a polished look, it&#39;s perfect for daily use or as a thoughtful gift. Compact, lightweight, and rust-resistant.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/dda9fb94-50bf-4f8b-a8f5-9080aad8d9ff.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNEATD8PAXF6HEKA0NSEV0",
    "name": "Metallic Rectangle Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday carry with this sleek Metallic Rectangle Keychain. Crafted from durable metal, it&#39;s perfect for securing your keys in style. With a minimalist rectangular design and a sturdy ring, it&#39;s both elegant and practical—ideal for gifts, corporate branding, or personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0fab8487-3ecb-4476-a70a-dba65b407f1e.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNEASZR91AE0Z851ZZW02J",
    "name": "Multipurpose Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your keyring with this sleek Multipurpose Bottle Opener Keychain. Crafted from sturdy metal, it conveniently acts as both a bottle opener and a handy key holder. Perfect for on-the-go convenience, this compact accessory ensures you&#39;ll never be without a bottle opener during parties, picni...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/58f27bff-5fbd-4775-b596-2dec802fb208.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNCZ712VRC814KWEG6M320",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this sturdy metal keychain featuring a sleek square design. Its robust construction ensures longevity and the polished finish adds a touch of style to your everyday essentials. Perfect for gifting or personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/87dc8b58-3183-4673-8d7c-57a504ad8217.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNCZ61QR2N98Y1K68F08K4",
    "name": "Aluminum Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your daily essentials with this sleek aluminum keychain bottle opener. Designed for portability and durability, it effortlessly opens bottles and keeps your keys organized. Its modern, minimalistic design ensures it feels just as good as it looks. Perfect for travel, parties, and outdoor ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e330da8b-7dd0-4109-8ff8-aaf6e92ee0d3.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNCZ69KFQ3EYBEHTMSNX3V",
    "name": "Metal House Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this sleek metal house-shaped keychain. Lightweight and durable, it&#39;s perfect for everyday use, making a great gift for new homeowners or anyone who wants a touch of style to their key ring.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/57c3575f-9f43-42fc-9832-d19912a4d15c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNCZ4T5MCC06E47Z66F2DF",
    "name": "Aluminum Carabiner Bottle Opener",
    "category": "writing",
    "price": 499,
    "description": "This lightweight aluminum carabiner doubles as a bottle opener and keychain holder, making it a perfect addition to your everyday carry. Its sleek, durable design ensures secure attachment to bags, belts, or keys. Stay prepared with this compact and functional accessory, ideal for outdoor adventu...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/4a5b8ccb-a3a7-4c9e-8508-142012de4588.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNCZ497CZPF25W6M1GG4PW",
    "name": "Metal Cup Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this trendy metal keychain featuring a unique cup shape design. Perfect as a gift or to add a touch of personality to your daily essentials. Built with durable metal for long-lasting use and a polished finish for a modern look.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/18d3bcca-d4fd-4274-b90b-64069133f15f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNCYVN2YSG7NCTKQZ1FV7Q",
    "name": "House-Shaped Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Carry your keys with style using this elegant house-shaped metal keychain. Crafted from high-quality alloy, it is lightweight, sturdy, and features a unique reflective surface. Its chic design makes it perfect for gifting or daily use, adding a touch of charm to your key collection.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/edd3880c-232e-458a-9ad0-c489889fb193.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNCYW0YTEBM60MBZHRRD3J",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized and always have a bottle opener handy with this stylish metal keychain. Durable, sleek, and lightweight, it&#39;s perfect for daily use or gifting. Its unique design ensures easy access and an elegant touch to your routine.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/2708b9ab-eb9d-4e08-9a2f-e5f7308a3790.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNCYVTWQ3JGSYX04KS33KY",
    "name": "Metallic Shape Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your daily essentials with this unique metallic shape keychain. Crafted from durable metal, it features a modern design and sturdy key ring, perfect for securing keys and adding a touch of elegance. Lightweight and easy to carry, this accessory is ideal for both men and women.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e60fd57b-f33f-4b97-80b3-711948489965.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNCYVBEE1MQ6JDT3EMNTPT",
    "name": "House-Shaped Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of personality to your keys with this house-shaped metal keychain. Featuring a sleek design and sturdy build, it&#39;s perfect for daily use or gifting. The mirror finish enhances its charm, ensuring your keys are easy to spot and secure.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/7f41ad41-be0c-4477-b640-57dcacb14748.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNCYTN5ZGQFE2QXWVR28AR",
    "name": "Metal Buckle Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this elegant metal buckle keychain. Crafted with premium metal, it offers sturdy durability and sleek design, making it the perfect accessory for everyday use or gifting. Easy to attach to bags or belts, this keychain ensures your keys stay secure and accessible.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8509a8e5-59b5-439c-aa54-d44c03e65e4d.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNBJDQ7QRR0GQPTVQZV879",
    "name": "House-Shaped Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Carry your keys with style using this sleek house-shaped metal keychain. Its durable design ensures longevity, while the unique shape makes it a perfect gift for homeowners, real estate agents, or anyone who loves modern accessories. Lightweight and easy to carry, this keychain adds a touch of so...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f39bc323-8718-43c8-856a-8ef1b64bc9db.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNBJCZ1NXEMS2YXK7QR4YV",
    "name": "House Shape Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This stylish house-shaped keychain is perfect for keeping your keys organized and easy to find. Crafted from durable metal with a sleek design, it makes a lovely accessory or a thoughtful gift for new homeowners and real estate professionals.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/4df65e76-af69-4b4b-9b45-2b96f9b8ced3.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNBJCB6NEZAMFQJGJ8XXGD",
    "name": "House-Shaped Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this stylish house-shaped keychain. Crafted from durable metal and featuring a polished finish, it is perfect for personal use or as a thoughtful gift. Its eye-catching design makes it easy to spot your keys in any bag or pocket.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/b2ede645-bdc8-4a70-b2d6-5df715714584.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNBJC092F4BJF4EKNQA9X4",
    "name": "House Shape Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Stylish and durable, this house-shaped keychain is perfect for keeping your keys organized. Its sleek metal design adds a personal touch to your everyday essentials, making it ideal for homeowners, real estate agents, or anyone who loves creative accessories.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0f5dc205-a3e7-4b15-8d71-6caf5dd3c1e2.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNBJB6B7QKNJ3XYK47NXJH",
    "name": "House Shaped Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a touch of charm to your keys with this house-shaped metal keychain. Durable and lightweight, it&#39;s perfect for everyday use and makes a thoughtful gift for friends or family. Easy to attach and carry, this unique design stands out wherever you go.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/c6c9edb1-c992-4d62-b7d3-465f309aa42b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNBJ3TDE3RZZAFJ6RV9PJ7",
    "name": "Arrow-Shaped Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your everyday carry with this arrow-shaped metal keychain. Crafted from high-quality metal, it is both sleek and sturdy—perfect for keeping your keys organized and adding a touch of style to your belongings. Its unique shape makes it easy to find and hold, ideal for gifting or personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/fe93565a-4647-4441-82a2-e2ddcdc9cbf2.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNBJ2WRKFMJAYBZSN59CEB",
    "name": "Cute Dinosaur Phone Ring Holder",
    "category": "office",
    "price": 499,
    "description": "Enhance your phone experience with this adorable dinosaur-shaped ring holder. Secure your grip and add a playful touch to your device, making it easier to hold, carry, and use. Durable, easy to install, and perfect for all phone models. Great for both kids and adults!",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/2f5a1927-3504-4be5-906a-07d4c47761e8.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNBJ33JGGQEKV5PX3GPFVS",
    "name": "Geometric Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday carry with this sleek geometric metal keychain. Designed with a unique shape and durable metal finish, it&#39;s perfect for keeping your keys organized while adding a touch of contemporary style. Lightweight and compact, this keychain makes for a great gift or personal accessory.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8b44ab0e-0142-449b-84df-e9b5161d5998.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNBJ2D8M9AW5Q8DF4TQAK6",
    "name": "Metal Wizard Hat Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Add a magical touch to your everyday essentials with this Metal Wizard Hat Keychain. Crafted from durable metal, it features a whimsical wizard hat silhouette perfect for fans of fantasy and magic. Ideal for decorating your keys, bags, or gifting to a Potterhead or fantasy lover.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/86ae6685-359b-4f6c-bcdb-43bbfc4dc358.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNBJ26667TJPB06GK0YBF5",
    "name": "Square Mobile Phone Ring Holder",
    "category": "office",
    "price": 499,
    "description": "Enhance your smartphone experience with this stylish square mobile phone ring holder. Crafted from durable metal with a sleek reflective finish, it ensures a secure grip and prevents accidental drops. Perfect for one-handed use and can also act as a convenient stand for watching videos. Easy to a...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/daacafee-d4f1-4cd5-b7ad-c303f8fc0d52.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNA3TDKEY2CPBK02T7JG44",
    "name": "Caduceus Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Showcase your passion for medicine with this stylish Caduceus Metal Keychain. Crafted from durable metal, it features the iconic Caduceus symbol, making it a perfect accessory for doctors, healthcare workers, or medical students. Its sturdy construction ensures long-lasting use, while its eye-cat...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/1d41ed33-a4db-444e-984d-9e5fc6cd0c54.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNA3QW0FEAWN28K5SFKKPV",
    "name": "Silver Sword Pendant",
    "category": "writing",
    "price": 499,
    "description": "Add a unique touch to your jewelry collection with this finely crafted silver sword pendant. Featuring intricate detailing, it is perfect for everyday wear or as a standout accessory for special occasions. Durable, stylish, and designed to impress.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/8565bdeb-b7f4-4fde-af9b-1476260fc309.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMNA3Q606KDK96KJ83RH86P",
    "name": "Medical Symbol Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Show off your passion for the medical field with this uniquely designed Medical Symbol Keychain. Featuring the iconic caduceus emblem, this sturdy key ring is perfect for doctors, nurses, students, or anyone in healthcare. Durable and elegant, it makes a thoughtful gift and keeps your keys organi...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e31e310f-c652-4832-b5a7-fa9615573fed.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNA3PXZ8KAHQ75PR625XXB",
    "name": "Square Metallic Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized with this square metallic keychain. Featuring a sleek and sturdy design, it is perfect for daily use and prevents misplacement of your keys. Lightweight and stylish, this keychain is ideal for gifting or personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/e82fdb9b-5a13-4c5a-99f2-77af9d6017ca.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNA3MSMB7395EY3MD81DGX",
    "name": "Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This stylish and durable metallic keychain doubles as a handy bottle opener, making it the perfect companion for your keys and daily needs. Compact and lightweight, it easily fits in your pocket, ensuring you’re always prepared for opening bottles on the go. Ideal for gifting and personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/3f9943ff-d0b0-4c3d-b030-0bf5cd253090.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNA3FG4RJ1QJMJ2H5C2NDM",
    "name": "Metal Key Ring Holder",
    "category": "office",
    "price": 499,
    "description": "Keep your keys secure and organized with this sturdy metal key ring holder. Designed with a sleek silver finish and a strong clasp, it is perfect for everyday use. Ideal for both home and office, this compact accessory adds a touch of elegance and utility to your daily routine.",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/877f626a-73a9-4d76-9607-99755ee57223.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNA3F33SDT7VMQ3BZS223Z",
    "name": "Metal Alphabet Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your accessory collection with this premium Metal Alphabet Keychain, designed in the sleek shape of the letter &#39;K&#39;. Made from durable stainless steel, it adds a personalized touch to your keys, bags, or backpacks. Perfect as a thoughtful gift or a classy statement piece for yourself. The ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/4faf3eb6-72e9-4fcf-aeb2-76b671d85648.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNA3EQW9F6W6VQ2SM78JSR",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your everyday carry with this sleek metal bottle opener keychain. Crafted from durable stainless steel, it&#39;s perfect for opening bottles on-the-go while keeping your keys organized. Ideal for both home and travel use, this compact accessory combines convenience and style, making it a must...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/4528cd34-2b52-4e7e-9d95-fa55b9f8d164.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNA3E8R0Z44VRAFQHMG8NW",
    "name": "Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek bottle opener keychain offers convenience anytime, anywhere. Made from durable metal, it&#39;s lightweight and easily attaches to your bag or keys. Perfect for opening bottles on the go, it’s a must-have accessory for parties, picnics, and travel enthusiasts.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a666b70e-6fc9-4235-a976-02425f4fb0e9.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMNA3D9EEDECTKNZ427B02Y",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This Metal Bottle Opener Keychain is a stylish and functional accessory for everyday use. Made with durable metal, it combines a key holder and bottle opener in one sleek design. Perfect for adding convenience to your daily routine or gifting to friends. Lightweight and easy to carry, it fits com...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/3d321bb4-4781-443a-89bf-badbc5f9f614.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN83XKA6GJ8KRDEQ8Z9FK0",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys secure and organized with this sleek round metal keychain. Its sturdy construction ensures longevity, while the polished finish adds a touch of elegance to your everyday essentials. Perfect for personal use or as a gift.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/6aa7f90f-5f00-48c9-b07a-5b758cd74957.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN83NYFAHQ6KBW8P3DH3MT",
    "name": "Gold Medical Symbol Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Showcase your appreciation for the medical profession with this stylish gold-colored keychain featuring the classic caduceus symbol. Perfect for doctors, nurses, medical students, or anyone wanting a unique and meaningful accessory. Durable and lightweight, it&#39;s ideal for everyday use or as a tho...",
    "material": "Solid Gold Plated / Pure Gold",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/3a677203-7172-4a53-a84b-cf931c17bbb6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN838YYE7M6YJBYWTJMW59",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Combine convenience and style with this Metal Bottle Opener Keychain. Made from high-quality metal, it functions as both a sturdy keychain and a handy bottle opener, perfect for everyday use or gifting. Lightweight, portable, and sleek, it keeps your keys organized while ensuring you&#39;re always re...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/5e38ae27-7a3f-4eed-b3f5-f4cbc787a81b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN837D295PK0WWSQ8DPM5V",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "This sleek metal keychain doubles as a convenient bottle opener, making it the perfect everyday accessory. Its sturdy construction ensures durability, while the polished finish adds a touch of elegance to your keys. Ideal for travel, parties, or gifting, this multifunctional tool keeps you prepar...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/5e6329f0-ad40-4459-bb7c-11d2313fe894.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN831M4D3XK1RS0T4KR4V0",
    "name": "Medical Symbol Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Carry a touch of professionalism and pride with this stylish Medical Symbol Keychain. Crafted with a gold finish and featuring the iconic caduceus emblem, it’s perfect for doctors, nurses, medical students, and healthcare enthusiasts. Durable and lightweight, this keychain makes an ideal gift or ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/5eebf641-f1fa-42e7-a59b-09596e6e80d1.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN831C91MYYYRQYZ5Q7J03",
    "name": "Metal Bottle Opener Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This Metal Bottle Opener Keychain combines practical convenience with a sleek, durable design. Easily attach to your keys and always have a reliable bottle opener at hand for parties, travel, or daily use. Compact and lightweight, it&#39;s perfect for gifts and personal use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/40873a16-38ce-4de3-b855-775f6d1ef42b.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN83009ERQRCFEDBB8TSF8",
    "name": "Round Metal Keychain Mirror",
    "category": "everyday",
    "price": 299,
    "description": "Keep style and convenience always with you using this sleek round metal keychain mirror. Perfect for quick touch-ups on the go, this mirror doubles as a unique accessory for your keys or bag. Lightweight and durable, it&#39;s great for daily use or gifting to friends and family.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0c5f1786-7e7c-4989-826e-292dda2aa29e.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN82S5SDGSZQCCGDC1XY0R",
    "name": "Wooden Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Carry your keys in style with this classic round wooden keychain. Crafted with smooth natural wood and sturdy metal ring, it is both lightweight and durable. Perfect for those who appreciate minimalist and eco-friendly accessories. Makes an excellent gift for family and friends.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/ddee7bcc-23bd-4447-ad6d-cf6ff0728ece.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN82RNANC4TCJJJ55PK4N9",
    "name": "Wooden Round Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys secure and stylish with this wooden round keychain. Featuring a smooth metal frame and a natural wood center, it is perfect for everyday use or gifting. The lightweight design makes it convenient to carry and its sturdy build ensures long-lasting durability. Suitable for personal, ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/88cfded7-7495-4592-b99c-2a32b016640e.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN82R6E6F0GMNZW2FKF2VG",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This metal keychain features a polished circular base with a sturdy ring, perfect for keeping your keys organized. Its elegant and minimalist style makes it a great accessory for both personal and professional use. Durable, lightweight, and ideal for gifting or everyday use.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/19fa955b-09f8-4e31-8ab2-20d68f40198f.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN5MHTFVBA3ZAQVMXR8XH0",
    "name": "Stainless Steel Keychain",
    "category": "everyday",
    "price": 299,
    "description": "This sleek and durable stainless steel keychain offers a modern look and a sturdy build, ensuring your keys are organized and secure. Its minimalist design makes it perfect for everyday use or as a stylish gift.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/d9973e1c-1c2d-4aae-970a-5297cdf20997.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN5MGAMKQN9X5DPX3275JH",
    "name": "Metallic Rectangle Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Elevate your style with this elegant metallic rectangle keychain. Crafted with a shiny finish and sturdy construction, it&#39;s perfect for organizing your keys or adding a touch of class to your bag. Durable and stylish, it&#39;s ideal for everyday use or gifting.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f5888f15-646a-48b4-abbf-0c2007c34af5.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN5MESDKG9B2P22S200NZQ",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Upgrade your daily essentials with this stylish round metal keychain. Perfect for keeping your keys organized, it features a durable metal body and a smooth finish for a modern look. Its compact size makes it ideal for pockets, purses, or backpacks. A practical accessory for everyone.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/2f7cbdd0-b32f-47bf-b6eb-c69d4d15c1f6.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN5MDVVJ5DGH3AGB5SSTQ4",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys secure and organized with this premium metal keychain. Designed for daily use, it features a sleek, modern finish and sturdy construction, making it perfect for personal use or as a thoughtful gift. The keychain comes individually packed for added protection and convenience.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/7286ecac-d82c-4958-97a5-d5c2732bc0da.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN5MBZDT3546YR477DNVA5",
    "name": "Classic Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized and stylish with this Classic Metal Keychain. Made from sturdy metal with a polished finish, it&#39;s perfect for everyday use and makes a great gift for friends and family. Lightweight yet durable, this keychain is a must-have for anyone on the go.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/0152b333-de4f-415d-a1e2-0718600cac97.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN5M9GXP5W6MZ1F2JD4W7Y",
    "name": "Metal Keychain Bottle Opener",
    "category": "everyday",
    "price": 299,
    "description": "This compact metal keychain bottle opener is designed for convenience and style. Easily attach it to your keys and always have a functional bottle opener at hand, perfect for home, travel, or parties. Durable metal construction ensures long-lasting use. A must-have accessory for everyday utility ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/a8451989-1f51-47c7-a428-acdc3f869408.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN5M238B52ZE0RK419M1RR",
    "name": "Stainless Steel Scissors",
    "category": "everyday",
    "price": 499,
    "description": "Experience precision cutting with these stainless steel scissors, perfect for home, office, or school use. Lightweight and ergonomically designed for comfortable handling, these scissors are rust-resistant and reliable for everyday tasks. Conveniently packaged and ready to use, they&#39;re an essenti...",
    "material": "Machined Alloy Steel",
    "weight": "150 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/253cabac-6746-4124-bcec-f53a46bcb725.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": false
  },
  {
    "id": "prod_01KHMN5KVCQJNNNNR07XMJ8ACM",
    "name": "Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this sturdy metal keychain. Featuring a sleek round design and a robust key ring, this accessory is perfect for daily use or gifting. Lightweight and compact, it easily fits in your pocket or bag, ensuring your keys are always within reach.",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/534256ef-b722-40ba-9d1e-c7629b53590c.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN5KKXQSZ0Y90C387JQC62",
    "name": "Round Metal Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Keep your keys organized in style with this sleek round metal keychain. Crafted from high-quality metal, it offers durability and a sophisticated look. Perfect for daily use or as a thoughtful gift, this keychain adds a touch of class to your essentials. Its minimalist design makes it suitable fo...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/9c97339e-13cd-4aae-8917-49a392a5a2b2.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  },
  {
    "id": "prod_01KHMN5KASP4MHEP7GX6N17RDM",
    "name": "Metallic Photo Frame Keychain",
    "category": "everyday",
    "price": 299,
    "description": "Carry your favorite memories or a personal touch with this stylish metallic photo frame keychain. Durable and lightweight, it features a rectangular frame perfect for inserting a small photo or a custom design. Ideal for gifting or personal use, this keychain keeps your keys organized and adds a ...",
    "material": "Machined Alloy Steel",
    "weight": "22 grams",
    "image": "https://cdn.zyrosite.com/cdn-ecommerce/store_01KHMJTPDBTSK9JKTXBKCVCDCM/assets/f63bb676-cb31-42cc-b02e-8ad1788c4ce7.jpg",
    "inStock": true,
    "stockCount": 25,
    "gstAvailable": true,
    "engravable": true
  }
];

// Real Verified Client Reviews (No images - Initial badge styling)
const REAL_CLIENT_REVIEWS = [
  {
    initial: 'S',
    color: '#2563eb',
    name: 'S LAL',
    location: 'Greater Noida, Uttar Pradesh',
    date: '22-Jan-23',
    product: 'Promotional Keychain',
    comment: 'One of the best promotional product manufacturer in India. Highly recommended!'
  },
  {
    initial: 'S',
    color: '#0d9488',
    name: 'Suresh Kumar Saini',
    location: 'New Delhi, Delhi',
    date: '14-Feb-24',
    product: 'Custom Corporate Keychains',
    comment: 'There were excellent discussions with the vendor. High quality metal finishes.'
  },
  {
    initial: 'I',
    color: '#7c3aed',
    name: 'Irfan Mushtaq Wani',
    location: 'Srinagar, Jammu & Kashmir',
    date: '21-Nov-23',
    product: 'Promotional Cap & Accessories',
    comment: 'A bit late but still good in response and product quality.'
  },
  {
    initial: 'M',
    color: '#ea580c',
    name: 'Mandeep Singh',
    location: 'Ludhiana, Punjab',
    date: '11-Oct-25',
    product: 'Leather Keychain',
    comment: 'Good product quality, clean finishing and prompt response from vendor.'
  },
  {
    initial: 'N',
    color: '#0284c7',
    name: 'NL Parthasarathi',
    location: 'Kalpakkam, Tamil Nadu',
    date: '05-Jul-26',
    product: 'Keychains',
    comment: 'Prompt response, excellent product quality and on-time shipment.'
  },
  {
    initial: 'N',
    color: '#16a34a',
    name: 'Nishant Kumar',
    location: 'New Delhi, Delhi',
    date: '04-Jul-26',
    product: 'Keychains',
    comment: 'Great custom metal keychains for corporate client gifting.'
  },
  {
    initial: 'R',
    color: '#dc2626',
    name: 'Rupsha',
    location: 'Kolkata, West Bengal',
    date: '25-Jun-26',
    product: 'Keychains',
    comment: 'Very good quality metal finish and fast order processing.'
  },
  {
    initial: 'S',
    color: '#0891b2',
    name: 'Sushil',
    location: 'New Delhi, Delhi',
    date: '07-Mar-26',
    product: 'Acrylic Keychain',
    comment: 'Clean laser cutting and precise design proofing.'
  },
  {
    initial: 'P',
    color: '#9333ea',
    name: 'PRADEEP MATERA',
    location: 'Bahraich, Uttar Pradesh',
    date: '02-Jun-26',
    product: 'PVC Keychain',
    comment: 'Excellent bulk volume rates and great team communication.'
  },
  {
    initial: 'B',
    color: '#d97706',
    name: 'Balachandran Aarthy',
    location: 'Bengaluru, Karnataka',
    date: '07-Jan-26',
    product: 'Leather Keychain',
    comment: 'High quality leather & metal finish. Very satisfied with order.'
  },
  {
    initial: 'L',
    color: '#4f46e5',
    name: 'Luxury Fragrances',
    location: 'Mohali, Punjab',
    date: '09-Aug-24',
    product: 'QR Code Stand',
    comment: 'Sturdy metal QR code stand crafted perfectly for our retail counters.'
  },
  {
    initial: 'P',
    color: '#e11d48',
    name: 'Priya Ramkrishna Dubey',
    location: 'Pune, Maharashtra',
    date: '15-Jul-25',
    product: 'Acrylic Keychain',
    comment: 'Superb clarity and sturdy ring attachment for corporate gifts.'
  },
  {
    initial: 'S',
    color: '#059669',
    name: 'Sanjiv',
    location: 'New Delhi, Delhi',
    date: '01-Aug-24',
    product: 'Engraved Key Chains',
    comment: 'Professional laser engraving and quick customer support response.'
  },
  {
    initial: 'A',
    color: '#2563eb',
    name: 'Ajay Kumar Gupta',
    location: 'New Delhi, Delhi',
    date: '30-Dec-24',
    product: 'Wish Pyramid Accessories',
    comment: 'Excellent quality items and smooth purchasing discussion.'
  },
  {
    initial: 'K',
    color: '#7c3aed',
    name: 'Kevitatuo Kesiezie',
    location: 'Kohima, Nagaland',
    date: '05-Aug-25',
    product: 'Customized Key Chain',
    comment: 'Great craftsmanship and prompt delivery all the way to Nagaland.'
  },
  {
    initial: 'S',
    color: '#ea580c',
    name: 'Sri Laxmi',
    location: 'Aska, Odisha',
    date: '21-Jan-24',
    product: 'MDF Sublimation Keychain',
    comment: 'Responsive vendor and precise print quality on bulk order.'
  }
];

function getProductCategory(product: Product): { id: string; name: string; badge: string; icon: string } {
  const nameLower = product.name.toLowerCase();
  const descLower = product.description.toLowerCase();

  if (nameLower.includes('pen') || nameLower.includes('pencil') || nameLower.includes('writing') || descLower.includes('pen') || product.category === 'writing') {
    return { id: 'writing', name: 'Precision Metal Pens', badge: 'Metal Pens', icon: '✒️' };
  }
  if (nameLower.includes('keychain') || nameLower.includes('key ring') || nameLower.includes('key chain') || descLower.includes('keychain')) {
    return { id: 'keychains', name: 'Keychains & EDC', badge: 'Keychains & EDC', icon: '🔑' };
  }
  if (nameLower.includes('coaster') || nameLower.includes('flask') || nameLower.includes('mug') || nameLower.includes('glass') || descLower.includes('coaster')) {
    return { id: 'coasters', name: 'Coasters & Drinkware', badge: 'Coasters & Drinkware', icon: '☕' };
  }
  if (nameLower.includes('card holder') || nameLower.includes('paper weight') || nameLower.includes('paperweight') || nameLower.includes('desk') || nameLower.includes('tray') || nameLower.includes('organizer') || descLower.includes('holder') || product.category === 'office') {
    return { id: 'office', name: 'Executive Desk & Office', badge: 'Executive Desk', icon: '💼' };
  }
  if (nameLower.includes('hook') || nameLower.includes('frame') || nameLower.includes('badge') || nameLower.includes('trophy') || nameLower.includes('wall') || nameLower.includes('plated') || nameLower.includes('gold')) {
    return { id: 'gifts', name: 'Corporate Gifts & Awards', badge: 'Gifts & Awards', icon: '🏆' };
  }

  return { id: 'everyday', name: 'Custom Metal EDC', badge: 'Custom Metal EDC', icon: '⚙️' };
}

function App() {
  // Page Navigation State: 'home' | 'catalog' | 'quote' | 'contact'
  const [activePage, setActivePage] = useState<string>('home');
  
  // RFQ Quote List State (Replaces B2C Shopping Cart)
  const [quoteList, setQuoteList] = useState<QuoteItem[]>([]);
  
  // Catalog Filter/Search/Pagination States
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  
  // Mobile Nav Drawer State
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  
  // Selected Product (PDP Modal)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [pdpQuantity, setPdpQuantity] = useState<number>(50); // B2B MOQ starts at 50
  const [pdpEngraving, setPdpEngraving] = useState<string>('');
  
  // Loading simulations
  const [catalogLoading, setCatalogLoading] = useState<boolean>(false);

  // steppers focus & carousel refs
  const pdpTriggerRef = useRef<HTMLButtonElement | null>(null);
  const recContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollRecLeft = () => {
    if (recContainerRef.current) {
      recContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
    announce('Scrolled recommendations left');
  };

  const scrollRecRight = () => {
    if (recContainerRef.current) {
      recContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
    announce('Scrolled recommendations right');
  };

  const homeCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollHomeLeft = () => {
    if (homeCarouselRef.current) {
      homeCarouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
    announce('Scrolled product catalog left');
  };

  const scrollHomeRight = () => {
    if (homeCarouselRef.current) {
      homeCarouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
    announce('Scrolled product catalog right');
  };

  const testimonialScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollTestimonialsLeft = () => {
    if (testimonialScrollRef.current) {
      testimonialScrollRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
    announce('Scrolled client reviews left');
  };

  const scrollTestimonialsRight = () => {
    if (testimonialScrollRef.current) {
      testimonialScrollRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
    announce('Scrolled client reviews right');
  };

  const [selectedIndustrySector, setSelectedIndustrySector] = useState<string>('all');

  // Quote cart zero confirmation dialog
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<{
    isOpen: boolean;
    itemIndex: number;
  }>({ isOpen: false, itemIndex: -1 });

  // Corporate Contact Us page states
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactCompany, setContactCompany] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [contactLoading, setContactLoading] = useState<boolean>(false);

  // RFQ Submission states
  const [rfqName, setRfqName] = useState<string>('');
  const [rfqEmail, setRfqEmail] = useState<string>('');
  const [rfqPhone, setRfqPhone] = useState<string>('');
  const [rfqCompany, setRfqCompany] = useState<string>('');
  const [rfqDesignation, setRfqDesignation] = useState<string>('');
  const [rfqGst, setRfqGst] = useState<string>('');
  const [rfqGstEnabled, setRfqGstEnabled] = useState<boolean>(false);
  const [rfqInstructions, setRfqInstructions] = useState<string>('');
  const [rfqErrors, setRfqErrors] = useState<Record<string, string>>({});
  const [rfqSuccess, setRfqSuccess] = useState<boolean>(false);
  const [rfqSubmitLoading, setRfqSubmitLoading] = useState<boolean>(false);

  // Scrolled state for header styles
  const [scrolled, setScrolled] = useState<boolean>(false);
  
  // Screen Reader Announcer
  const [srAnnouncement, setSrAnnouncement] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility listeners (Escape closes modals/menus)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (confirmDeleteDialog.isOpen) {
          setConfirmDeleteDialog({ isOpen: false, itemIndex: -1 });
          return;
        }
        if (selectedProduct) {
          closePdp();
          return;
        }
        if (mobileNavOpen) {
          setMobileNavOpen(false);
          return;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, mobileNavOpen, confirmDeleteDialog]);

  // Screen reader announcer helper
  const announce = (message: string) => {
    setSrAnnouncement(message);
    setTimeout(() => setSrAnnouncement(''), 1000);
  };

  // Nav actions
  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo(0, 0);
    announce('Navigated to ' + page + ' page.');
  };

  // PDP Modal handlers
  const openPdp = (product: Product, triggerBtn: HTMLButtonElement) => {
    pdpTriggerRef.current = triggerBtn;
    setSelectedProduct(product);
    setPdpQuantity(50); // MOQ starts at 50
    setPdpEngraving('');
    announce('Opened specifications details for ' + product.name);
  };

  const closePdp = () => {
    setSelectedProduct(null);
    announce('Closed details modal');
    setTimeout(() => {
      if (pdpTriggerRef.current) pdpTriggerRef.current.focus();
    }, 50);
  };

  // B2B RFQ Cart functions (Quote List)
  const addToQuoteList = (product: Product, qty: number, engraving: string) => {
    if (qty < 50) {
      announce('Minimum order quantity is 50 units.');
      return;
    }
    
    announce('Adding ' + qty + ' ' + product.name + ' to RFQ list...');
    
    setQuoteList((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.engraving === engraving
      );
      
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [...prev, { product, quantity: qty, engraving }];
      }
    });

    announce('Successfully added ' + qty + ' units of ' + product.name + ' to Quote List.');
    setSelectedProduct(null);
    navigateTo('quote'); // switch to Quote List page to build request
  };

  const updateQuoteItemQty = (index: number, newQty: number) => {
    const item = quoteList[index];
    if (newQty < 1) {
      setConfirmDeleteDialog({ isOpen: true, itemIndex: index });
      announce('Confirm removal of ' + item.product.name + ' from Quote Cart.');
      return;
    }

    if (newQty < 50) {
      announce('MOQ warning: Minimum quantity for corporate orders is 50 units.');
      newQty = 50;
    }

    setQuoteList((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
    announce('Updated ' + item.product.name + ' quantity to ' + newQty + ' units.');
  };

  const confirmDeleteQuoteItem = () => {
    const index = confirmDeleteDialog.itemIndex;
    if (index > -1 && index < quoteList.length) {
      const removed = quoteList[index];
      setQuoteList((prev) => prev.filter((_, i) => i !== index));
      announce('Removed ' + removed.product.name + ' from Quote List.');
    }
    setConfirmDeleteDialog({ isOpen: false, itemIndex: -1 });
  };

  // Category Filter changes with loading simulations
  const handleCategorySelect = (category: string) => {
    setCatalogLoading(true);
    setCatalogCategory(category);
    navigateTo('catalog');
    setTimeout(() => {
      setCatalogLoading(false);
    }, 400);
  };

  // Stepper arrow navigation
  const handleQtyKeyDown = (e: React.KeyboardEvent, curVal: number, setVal: (n: number) => void) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      e.preventDefault();
      setVal(curVal + 50);
      announce('Quantity increased to ' + (curVal + 50));
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      e.preventDefault();
      if (curVal > 50) {
        setVal(curVal - 50);
        announce('Quantity decreased to ' + (curVal - 50));
      }
    }
  };

  // Email validations
  const validateCorporateEmail = (email: string) => {
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'mail.com'];
    const parts = email.trim().toLowerCase().split('@');
    if (parts.length < 2) return { isValid: false, isCorporate: false };
    const domain = parts[1];
    return {
      isValid: /^[^s@]+@[^s@]+.[^s@]+$/.test(email),
      isCorporate: !freeDomains.includes(domain)
    };
  };



  // Contact Us B2B Form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    setContactErrors({});
    setContactSuccess(false);

    if (!contactName.trim()) errors.name = 'Please enter your name.';
    if (!contactCompany.trim()) errors.company = 'Please enter your company name.';
    if (!contactPhone.trim()) errors.phone = 'Please enter a contact phone number.';
    if (!contactMessage.trim()) errors.message = 'Please write details of your requirement.';

    const emailStatus = validateCorporateEmail(contactEmail);
    if (!emailStatus.isValid) {
      errors.email = 'Enter a valid email address.';
    } else if (!emailStatus.isCorporate) {
      errors.emailWarning = 'We recommend using your corporate email domain for priority business review.';
    }

    if (Object.keys(errors).length > 0 && !errors.emailWarning) {
      setContactErrors(errors);
      announce('Contact form validation failed.');
      return;
    }

    setContactErrors(errors);

    setContactLoading(true);
    announce('Sending your B2B inquiry to Ortex corporate desk...');
    setTimeout(() => {
      setContactLoading(false);
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactCompany('');
      setContactMessage('');
      setContactErrors({});
      announce('Contact inquiry sent successfully! Our executive will call you within 2 hours.');
    }, 1200);
  };

  // B2B RFQ Submit
  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    setRfqErrors({});
    setRfqSuccess(false);

    if (!rfqName.trim()) errors.name = 'Please enter your full name.';
    if (!rfqCompany.trim()) errors.company = 'Please enter corporate business name.';
    if (!rfqDesignation.trim()) errors.designation = 'Please enter your corporate title.';
    if (!rfqPhone.trim()) errors.phone = 'Please enter your corporate phone number.';
    
    const emailStatus = validateCorporateEmail(rfqEmail);
    if (!emailStatus.isValid) {
      errors.email = 'Enter a valid corporate email address.';
    } else if (!emailStatus.isCorporate) {
      errors.emailWarning = 'Please use your corporate work email (e.g. name@company.com) for RFQs.';
    }

    if (rfqGstEnabled) {
      const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      const cleanedGst = rfqGst.trim().toUpperCase();
      if (!cleanedGst) {
        errors.gst = 'Please enter your business GSTIN.';
      } else if (cleanedGst.length !== 15) {
        errors.gst = 'GSTIN must be exactly 15 characters.';
      } else if (!gstPattern.test(cleanedGst)) {
        errors.gst = 'Enter a valid GSTIN format (e.g. 27AAAAA1111A1Z1).';
      }
    }

    if (Object.keys(errors).length > 0 && !errors.emailWarning) {
      setRfqErrors(errors);
      announce('RFQ submission validation failed.');
      return;
    }

    setRfqErrors(errors);
    setRfqSubmitLoading(true);
    announce('Submitting wholesale Request For Quote...');
    
    setTimeout(() => {
      setRfqSubmitLoading(false);
      setRfqSuccess(true);
      setQuoteList([]);
      announce('RFQ Request submitted successfully! Reference ID RFQ-2026-94820.');
    }, 1500);
  };

  // Calculations for indicative B2B discount credit
  const calculatedSubtotal = quoteList.reduce((acc, item) => {
    let discountRate = 1;
    if (item.quantity >= 250) {
      discountRate = 0.85; // 15% discount
    } else if (item.quantity >= 100) {
      discountRate = 0.90; // 10% discount
    }
    return acc + (item.product.price * discountRate * item.quantity);
  }, 0);

  const estimatedGst = Math.round(calculatedSubtotal * 0.18);
  const totalRfqEstimate = calculatedSubtotal + estimatedGst;

  // Filter products by search query
  const searchedProducts = PRODUCTS.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.material.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Group products by actual project category
  const keychainProducts = searchedProducts.filter(p => getProductCategory(p).id === 'keychains');
  const officeProducts = searchedProducts.filter(p => getProductCategory(p).id === 'office');
  const writingProducts = searchedProducts.filter(p => getProductCategory(p).id === 'writing');
  const coasterProducts = searchedProducts.filter(p => getProductCategory(p).id === 'coasters');
  const giftProducts = searchedProducts.filter(p => getProductCategory(p).id === 'gifts');
  const everydayProducts = searchedProducts.filter(p => getProductCategory(p).id === 'everyday');

  // Active list of products to display
  const filteredProducts =
    catalogCategory === 'keychains' ? keychainProducts :
    catalogCategory === 'office' ? officeProducts :
    catalogCategory === 'writing' ? writingProducts :
    catalogCategory === 'coasters' ? coasterProducts :
    catalogCategory === 'gifts' ? giftProducts :
    catalogCategory === 'everyday' ? everydayProducts :
    searchedProducts;

  // Pagination calculations
  const itemsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPageNum, totalPages);
  const paginatedProducts = filteredProducts.slice((validCurrentPage - 1) * itemsPerPage, validCurrentPage * itemsPerPage);

  // Pre-filled WhatsApp Link: Indian number +919211947188
  const whatsappPreFilledLink = "https://wa.me/919211947188?text=Hello%20Ortex%20Industries,%20I%20am%20interested%20in%20inquiring%20about%20custom%20metal%20promotional%20gifts%20for%20my%20company.%20Please%20share%20your%20latest%20corporate%20catalog%20and%20wholesale%20price%20list.";

  return (
    <div className="app-container">
      {/* Live Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {srAnnouncement}
      </div>

      {/* --- SITE HEADER --- */}
      <header className={`ss-header ${activePage === 'home' ? (scrolled ? 'scrolled is-home' : 'is-home') : 'scrolled'}`}>
        <div className="ss-header-container">
          <button 
            className="ss-menu-toggle-btn"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileNavOpen}
          >
            <Menu size={20} />
          </button>

          <button 
            onClick={() => navigateTo('home')}
            className="ss-logo" 
            aria-label="Ortex Industries Metcraft Home"
          >
            <img src="/logo.jpg" alt="Ortex Industries Logo" style={{ height: '32px', borderRadius: '4px', mixBlendMode: 'multiply' as const }} />
            <span style={{ fontSize: '18px' }}>metcraft.</span>
          </button>

          {/* Desktop Nav Links */}
          <div className="ss-nav-pill" role="navigation" aria-label="Main navigation">
            <button 
              className={`ss-nav-link ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              Home
            </button>
            <button 
              className={`ss-nav-link ${activePage === 'catalog' ? 'active' : ''}`}
              onClick={() => {
                setCatalogCategory('all');
                navigateTo('catalog');
              }}
            >
              Corporate Catalog
            </button>
            <button 
              className={`ss-nav-link ${activePage === 'about' ? 'active' : ''}`}
              onClick={() => navigateTo('about')}
            >
              About
            </button>
            <button 
              className={`ss-nav-link ${activePage === 'contact' ? 'active' : ''}`}
              onClick={() => navigateTo('contact')}
            >
              Request Quote
            </button>
          </div>

          {/* Header Actions */}
          <div className="ss-header-actions">
            {quoteList.length > 0 && (
              <button
                className="ss-quote-btn"
                onClick={() => navigateTo('quote')}
                aria-label={`View RFQ Quote List. ${quoteList.length} items.`}
              >
                <Briefcase size={16} />
                <span className="ss-quote-badge">{quoteList.length}</span>
              </button>
            )}

            {/* Direct WhatsApp Action Button */}
            <a 
              href={whatsappPreFilledLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ss-btn-whatsapp"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>

            {/* Primary Get Quote Button */}
            <button 
              className="ss-btn-collaborate" 
              onClick={() => navigateTo('contact')}
              aria-label="Navigate to Request Quote form"
            >
              <span>Get Quote</span>
              <span className="ss-btn-arrow-circle">
                <ArrowRight size={13} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE NAVIGATION DRAWER --- */}
      {mobileNavOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileNavOpen(false)}>
          <div 
            className={'mobile-nav-drawer ' + (mobileNavOpen ? 'open' : '')}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation panel"
          >
            <div className="drawer-header">
              <img src="/logo.jpg" alt="Ortex Industries Logo" className="logo-img" />
              <button
                className="icon-btn"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close navigation menu"
              >
                <X />
              </button>
            </div>
            
            <nav className="mobile-links" aria-label="Mobile menu links" style={{ marginTop: '24px' }}>
              <button 
                className={'mobile-nav-btn ' + (activePage === 'home' ? 'active' : '')}
                onClick={() => {
                  navigateTo('home');
                  setMobileNavOpen(false);
                }}
              >
                Home
              </button>
              <button 
                className={'mobile-nav-btn ' + (activePage === 'catalog' ? 'active' : '')}
                onClick={() => {
                  setCatalogCategory('all');
                  navigateTo('catalog');
                  setMobileNavOpen(false);
                }}
              >
                Corporate Catalog
              </button>
              <button 
                className={'mobile-nav-btn ' + (activePage === 'about' ? 'active' : '')}
                onClick={() => {
                  navigateTo('about');
                  setMobileNavOpen(false);
                }}
              >
                About
              </button>
              <button 
                className={'mobile-nav-btn ' + (activePage === 'contact' ? 'active' : '')}
                onClick={() => {
                  navigateTo('contact');
                  setMobileNavOpen(false);
                }}
              >
                Request Quote & Samples
              </button>
              <button 
                className={'mobile-nav-btn ' + (activePage === 'quote' ? 'active' : '')}
                onClick={() => {
                  navigateTo('quote');
                  setMobileNavOpen(false);
                }}
              >
                Inquiry Quote List ({quoteList.length})
              </button>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', borderRadius: '999px', background: '#0b0f19', justifyContent: 'center' }}
                  onClick={() => {
                    navigateTo('contact');
                    setMobileNavOpen(false);
                  }}
                >
                  <span>Get Quote</span>
                  <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                </button>

                <a 
                  href={whatsappPreFilledLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ss-btn-whatsapp"
                  style={{ width: '100%', justifyContent: 'center', borderRadius: '999px' }}
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* --- PAGE RENDER SWITCH --- */}
      
      {/* 1. HOME PAGE VIEW (Matching Reference Nexora / Architectural Design) */}
      {activePage === 'home' && (
        <div className="nx-home-wrapper">
          {/* Dark Modern Hero */}
          <section 
            className="nx-home-hero"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2000&auto=format&fit=crop')` }}
          >
            <div className="nx-hero-overlay">
              <div className="nx-hero-container">
                <span className="nx-hero-subtag">WELCOME TO METCRAFT</span>
                <h1 className="nx-hero-heading">
                  We Build Precision Metal Experiences That <span className="accent-blue">Inspire.</span>
                </h1>
                <p className="nx-hero-desc">
                  We are a premier precision metal manufacturing agency helping corporate brands grow with high-quality CNC items, custom engraving & B2B manufacturing strategy.
                </p>

                <div className="nx-hero-actions">
                  <button className="nx-btn-primary" onClick={() => navigateTo('catalog')}>
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </button>

                  <a 
                    href={whatsappPreFilledLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ss-btn-whatsapp"
                    style={{ padding: '14px 28px', fontSize: '15px', fontWeight: 700 }}
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp Get Quote</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Stats Banner Section */}
          <section className="py-12 bg-primary border-b border-white/10">
            <div className="lp-wrap">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  className="flex flex-col items-center text-center"
                  style={{ opacity: 1, filter: 'blur(0px)', transform: 'none' }}
                >
                  <div className="nx-stat-num">17+</div>
                  <div className="nx-stat-label">Years Crafting Custom Products</div>
                </div>

                <div 
                  className="flex flex-col items-center text-center"
                  style={{ opacity: 1, filter: 'blur(0px)', transform: 'none' }}
                >
                  <div className="nx-stat-num">5L+</div>
                  <div className="nx-stat-label">Products Delivered to Date</div>
                </div>

                <div 
                  className="flex flex-col items-center text-center"
                  style={{ opacity: 1, filter: 'blur(0px)', transform: 'none' }}
                >
                  <div className="nx-stat-num">1,200+</div>
                  <div className="nx-stat-label">Brands & Businesses Served</div>
                </div>

                <div 
                  className="flex flex-col items-center text-center"
                  style={{ opacity: 1, filter: 'blur(0px)', transform: 'none' }}
                >
                  <div className="nx-stat-num">99%</div>
                  <div className="nx-stat-label">Orders Dispatched On Time</div>
                </div>
              </div>
            </div>
          </section>

          {/* WHAT WE DO - Services Grid */}
          <section className="nx-section">
            <div className="nx-section-header">
              <div>
                <span className="nx-section-subtag">WHAT WE DO</span>
                <h2 className="nx-section-title">
                  Services That Drive Real <span className="accent-blue">Results</span>
                </h2>
              </div>

              <button className="nx-btn-outline" onClick={() => navigateTo('catalog')}>
                <span>View All Services</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="nx-services-grid">
              <div className="nx-service-card" onClick={() => handleCategorySelect('office')} style={{ cursor: 'pointer' }}>
                <div className="nx-service-card-img-wrapper">
                  <img 
                    src="/steel_desk_tray.jpg" 
                    alt="Precision CNC Milling" 
                    className="nx-service-card-img" 
                  />
                </div>
                <div className="nx-service-card-content">
                  <h3 className="nx-service-title">Precision CNC Milling</h3>
                  <p className="nx-service-desc">High tolerance titanium, brass & stainless steel machining for executive accessories.</p>
                  
                  <div className="nx-trust-badge-group">
                    <span className="nx-trust-pill">ISO 9001:2015</span>
                    <span className="nx-trust-pill">±0.02mm CNC</span>
                  </div>

                  <span className="nx-service-link" style={{ marginTop: 'auto' }}>Learn More →</span>
                </div>
              </div>

              <div className="nx-service-card" onClick={() => handleCategorySelect('writing')} style={{ cursor: 'pointer' }}>
                <div className="nx-service-card-img-wrapper">
                  <img 
                    src="/brass_hex_pen.jpg" 
                    alt="Fiber Laser Engraving" 
                    className="nx-service-card-img" 
                  />
                </div>
                <div className="nx-service-card-content">
                  <h3 className="nx-service-title">Fiber Laser Engraving</h3>
                  <p className="nx-service-desc">Micron-level custom corporate logo etching and serial numbering on all metal alloys.</p>

                  <div className="nx-trust-badge-group">
                    <span className="nx-trust-pill">Sub-Micron Laser</span>
                    <span className="nx-trust-pill">Permanent Etch</span>
                  </div>

                  <span className="nx-service-link" style={{ marginTop: 'auto' }}>Learn More →</span>
                </div>
              </div>

              <div className="nx-service-card" onClick={() => handleCategorySelect('everyday')} style={{ cursor: 'pointer' }}>
                <div className="nx-service-card-img-wrapper">
                  <img 
                    src="/copper_coasters.jpg" 
                    alt="Bulk OEM White Label" 
                    className="nx-service-card-img" 
                  />
                </div>
                <div className="nx-service-card-content">
                  <h3 className="nx-service-title">Bulk OEM White Label</h3>
                  <p className="nx-service-desc">Custom branded corporate gifting solutions, custom presentation packaging & volume runs.</p>

                  <div className="nx-trust-badge-group">
                    <span className="nx-trust-pill">OEM White Label</span>
                    <span className="nx-trust-pill">MOQ: 50 Units</span>
                  </div>

                  <span className="nx-service-link" style={{ marginTop: 'auto' }}>Learn More →</span>
                </div>
              </div>

              <div className="nx-service-card" onClick={() => navigateTo('contact')} style={{ cursor: 'pointer' }}>
                <div className="nx-service-card-img-wrapper">
                  <img 
                    src="/titanium_card_holder.jpg" 
                    alt="Bespoke Product Design" 
                    className="nx-service-card-img" 
                  />
                </div>
                <div className="nx-service-card-content">
                  <h3 className="nx-service-title">Bespoke Product Design</h3>
                  <p className="nx-service-desc">Custom 3D CAD mockup modeling, rapid prototype milling & physical sample courier.</p>

                  <div className="nx-trust-badge-group">
                    <span className="nx-trust-pill">3D CAD Proofing</span>
                    <span className="nx-trust-pill">Free Prototype</span>
                  </div>

                  <span className="nx-service-link" style={{ marginTop: 'auto' }}>Learn More →</span>
                </div>
              </div>
            </div>

            {/* B2B Trust & Quality Guarantee Strip */}
            <div className="nx-guarantee-strip" aria-label="B2B Trust and Quality Assurances">
              <div className="nx-guarantee-item">
                <div className="nx-guarantee-icon-box">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 className="nx-guarantee-title">Certified Alloys</h4>
                  <p className="nx-guarantee-desc">Grade 5 Aerospace Titanium, C360 Brass & 304 Stainless Steel certified composition.</p>
                </div>
              </div>

              <div className="nx-guarantee-item">
                <div className="nx-guarantee-icon-box">
                  <Award size={22} />
                </div>
                <div>
                  <h4 className="nx-guarantee-title">2-Hour Digital Proofs</h4>
                  <p className="nx-guarantee-desc">Free 3D logo CAD mockups & placement alignment proofs before production.</p>
                </div>
              </div>

              <div className="nx-guarantee-item">
                <div className="nx-guarantee-icon-box">
                  <Truck size={22} />
                </div>
                <div>
                  <h4 className="nx-guarantee-title">Pan-India GST Logistics</h4>
                  <p className="nx-guarantee-desc">Insured express cargo shipment with 100% GST input tax credit invoice.</p>
                </div>
              </div>

              <div className="nx-guarantee-item">
                <div className="nx-guarantee-icon-box">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h4 className="nx-guarantee-title">Zero-Defect Quality</h4>
                  <p className="nx-guarantee-desc">Every piece undergoes QA inspection with 100% free replacement guarantee.</p>
                </div>
              </div>
            </div>
          </section>



          {/* CURATED 100 PREMIUM PRODUCTS SHOWCASE (SINGLE ROW HORIZONTAL CAROUSEL WITH NAV ARROWS) */}
          <section className="nx-section" style={{ background: '#ffffff', maxWidth: '100%', padding: '80px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
              <div className="nx-section-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span className="nx-section-subtag">PREMIUM CORPORATE CATALOG</span>
                  <h2 className="nx-section-title">
                    Selected High-Quality <span className="accent-blue">Corporate Products</span>
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '15px', marginTop: '6px', margin: 0 }}>
                    100 hand-curated precision metal products, executive gifts & EDC accessories arranged in a single catalog row.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '8px 16px', borderRadius: '999px', border: '1px solid #dbeafe' }}>
                    Showcase: 100 Items
                  </span>
                  <div className="mc-carousel-arrows">
                    <button 
                      className="mc-arrow-btn" 
                      aria-label="Scroll products left" 
                      onClick={scrollHomeLeft}
                      style={{ width: '44px', height: '44px', fontSize: '18px' }}
                    >
                      ←
                    </button>
                    <button 
                      className="mc-arrow-btn" 
                      aria-label="Scroll products right" 
                      onClick={scrollHomeRight}
                      style={{ width: '44px', height: '44px', fontSize: '18px' }}
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>

              {/* Single Row Horizontal Scroll Track (100 products) */}
              <div className="mc-single-row-carousel" ref={homeCarouselRef}>
                {PRODUCTS.slice(0, 100).map((product, idx) => {
                  const catInfo = getProductCategory(product);
                  const tagBadge = catInfo.badge;
                  const ratingScore = (4.8 + (idx % 3) * 0.1).toFixed(1);
                  const reviewCount = (1.2 + (idx % 5) * 0.3).toFixed(1) + 'k';
                  const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`;

                  return (
                    <div className="mc-card" key={'home-catalog-100-' + product.id + '-' + idx}>
                      <div className="mc-card-top">
                        <span className="mc-badge-tag">{tagBadge}</span>
                        <img src={product.image} alt={product.name} className="mc-card-img" />
                      </div>

                      <div className="mc-card-body">
                        <div className="mc-card-title-row">
                          <h3 className="mc-card-title">{product.name}</h3>
                          <span className="mc-card-price">{formattedPrice}</span>
                        </div>

                        <div className="mc-card-rating">
                          <span className="mc-star-icon">★</span>
                          <span>{ratingScore} ({reviewCount} Reviews)</span>
                        </div>

                        <div style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 12px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          ⚙️ {product.material}
                        </div>

                        <div className="mc-card-actions">
                          <button
                            className="mc-btn-chart"
                            onClick={() => addToQuoteList(product, 50, '')}
                          >
                            Add to Quote
                          </button>
                          <button
                            className="mc-btn-buy"
                            onClick={(e) => openPdp(product, e.currentTarget)}
                          >
                            View Item
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* WORKFLOW PROCESS SECTION */}
          <section className="nx-section" style={{ background: '#f8fafc', maxWidth: '100%', padding: '80px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
              <div className="nx-section-header" style={{ textAlign: 'center', margin: '0 auto 48px auto', maxWidth: '720px' }}>
                <span className="nx-section-subtag">OUR WORKFLOW PROCESS</span>
                <h2 className="nx-section-title" style={{ fontSize: '32px' }}>
                  From CAD Concept to <span className="accent-blue">Precision Delivery</span>
                </h2>
                <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>
                  A battle-tested 4-step B2B manufacturing pipeline ensuring micron-level quality, OEM branding & seamless PAN India & global delivery.
                </p>
              </div>

              <div className="workflow-grid">
                <div className="workflow-card">
                  <div className="workflow-step-num">01</div>
                  <div className="workflow-icon">📋</div>
                  <h3 className="workflow-title">1. CAD Design & Spec Review</h3>
                  <p className="workflow-desc">
                    Submit your 2D/3D CAD blueprints or vector artwork. Our engineering team conducts instant DFM feasibility checks, alloy selection & volume quote calculation.
                  </p>
                  <div className="workflow-tag">Step 1 • Spec & Quote</div>
                </div>

                <div className="workflow-card">
                  <div className="workflow-step-num">02</div>
                  <div className="workflow-icon">⚙️</div>
                  <h3 className="workflow-title">2. Prototyping & Sample Sign-off</h3>
                  <p className="workflow-desc">
                    High-speed CNC milling and fiber laser logo etching produce physical pre-production samples. Dispatched via express courier for physical client sign-off.
                  </p>
                  <div className="workflow-tag">Step 2 • Prototype Milling</div>
                </div>

                <div className="workflow-card">
                  <div className="workflow-step-num">03</div>
                  <div className="workflow-icon">🏭</div>
                  <h3 className="workflow-title">3. Mass OEM Production & QA</h3>
                  <p className="workflow-desc">
                    High-volume automated machine runs with anodizing, nickel/gold plating, custom laser engraving & 100% CMM dimensional quality inspection.
                  </p>
                  <div className="workflow-tag">Step 3 • OEM Batch Run</div>
                </div>

                <div className="workflow-card">
                  <div className="workflow-step-num">04</div>
                  <div className="workflow-icon">📦</div>
                  <h3 className="workflow-title">4. Branded Packaging & Shipping</h3>
                  <p className="workflow-desc">
                    Custom executive presentation packaging, velvet pouch inserts, GST tax compliant documentation & insured PAN India & worldwide door delivery.
                  </p>
                  <div className="workflow-tag">Step 4 • Express Dispatch</div>
                </div>
              </div>
            </div>
          </section>

          {/* BUILT FOR YOUR INDUSTRY SECTION (MATCHING REFERENCE IMAGE 0 & 1 WITH SCROLLABLE SECTOR TABS & CARDS) */}
          <section className="nx-section" style={{ background: '#ffffff', maxWidth: '100%', padding: '80px 0' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
              {/* Royal Blue Header Banner (Image 1 Reference) */}
              <div className="nx-industry-banner-wrapper" style={{ marginBottom: 0 }}>
                <div className="nx-industry-banner-top">
                  <div>
                    <span className="nx-industry-banner-subtag">VERTICAL SOLUTIONS</span>
                    <h2 className="nx-industry-banner-heading">Built for your industry</h2>
                  </div>
                  <p className="nx-industry-banner-desc">
                    Every sector buys differently. We build to the standards yours works to.
                  </p>
                </div>

                {/* Scrollable Sector Badges Row (Image 1 Scroll Track) */}
                <div className="industry-pill-scroll-track">
                  {[
                    { id: 'all', label: 'All Sectors' },
                    { id: 'retail', label: 'Retail & Brands' },
                    { id: 'startups', label: 'Startups & SMEs' },
                    { id: 'hospitality', label: 'Hotels & Hospitality' },
                    { id: 'oem', label: 'Resellers & OEM' },
                    { id: 'realestate', label: 'Real Estate' },
                    { id: 'gifting', label: 'Corporate Gifting' },
                    { id: 'education', label: 'Schools & Colleges' },
                    { id: 'gov', label: 'Government & Defense' },
                    { id: 'automotive', label: 'Automotive & Aviation' },
                    { id: 'it', label: 'IT & Enterprises' }
                  ].map((sector) => (
                    <button
                      key={sector.id}
                      className={`industry-sector-pill ${selectedIndustrySector === sector.id ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedIndustrySector(sector.id);
                        announce(`Selected ${sector.label} industry sector`);
                      }}
                    >
                      {sector.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS WITHOUT IMAGES (REAL CLIENT REVIEWS) */}
          <section className="nx-section" aria-label="Verified Customer Feedback">
            <div className="nx-section-header">
              <div>
                <span className="nx-section-subtag">TESTIMONIALS</span>
                <h2 className="nx-section-title">
                  What Our Clients Say About <span className="accent-blue">Us</span>
                </h2>
              </div>

              <div className="mc-carousel-arrows">
                <button 
                  className="mc-arrow-btn" 
                  aria-label="Scroll previous testimonials" 
                  onClick={scrollTestimonialsLeft}
                >
                  ←
                </button>
                <button 
                  className="mc-arrow-btn" 
                  aria-label="Scroll next testimonials" 
                  onClick={scrollTestimonialsRight}
                >
                  →
                </button>
              </div>
            </div>

            {/* Testimonials Without Images Carousel */}
            <div className="no-img-testimonial-carousel" ref={testimonialScrollRef}>
              {REAL_CLIENT_REVIEWS.map((review, idx) => (
                <div className="no-img-testimonial-card" key={review.name + '-' + idx}>
                  <div>
                    <div className="no-img-card-top">
                      <div className="initial-avatar-badge" style={{ backgroundColor: review.color }}>
                        {review.initial}
                      </div>
                      <div className="no-img-client-info">
                        <h4>{review.name}</h4>
                        <p>{review.location} • {review.date}</p>
                        <span className="verified-buyer-badge">
                          ✓ Verified Buyer
                        </span>
                      </div>
                    </div>

                    <div style={{ marginTop: '16px', marginBottom: '12px' }}>
                      <span className="testimonial-product-tag">
                        Product: {review.product}
                      </span>
                    </div>

                    <div className="no-img-stars">★★★★★</div>
                  </div>

                  <p className="no-img-comment">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 2. CORPORATE CATALOG PAGE VIEW */}
      {activePage === 'catalog' && (
        <div className="mc-catalog-wrapper" aria-label="Metcraft Corporate Catalog">
          {/* Top Hero Banner with Large Typographic Watermark */}
          <div 
            className="mc-hero-container"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')` }}
          >
            <div className="mc-hero-overlay">
              <h1 className="mc-hero-watermark">Shop</h1>
            </div>
          </div>

          {/* Floating Sub-bar Search Container */}
          <div className="mc-search-subbar">
            <span className="mc-search-title">Give All You Need</span>
            
            <div className="mc-search-input-group">
              <Search size={18} style={{ color: '#94a3b8' }} />
              <input
                type="text"
                className="mc-search-input"
                placeholder="Search catalog by name, material, or keyword..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPageNum(1);
                }}
              />
            </div>

            <button className="mc-search-btn" onClick={() => announce('Searching catalog...')}>
              Search
            </button>
          </div>

          {/* Main Catalog 2-Column Layout */}
          <div className="mc-main-layout">
            {/* Left Sidebar Filter */}
            <aside className="mc-sidebar">
              <div className="mc-category-box">
                <h3 className="mc-sidebar-heading">Category</h3>
                
                <div className="mc-category-dropdown">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Briefcase size={15} style={{ marginRight: '8px' }} />
                    <span>
                      {catalogCategory === 'all' ? 'All Products' :
                       catalogCategory === 'keychains' ? 'Keychains & EDC' :
                       catalogCategory === 'office' ? 'Executive Desk' :
                       catalogCategory === 'writing' ? 'Metal Pens' :
                       catalogCategory === 'coasters' ? 'Coasters & Drinkware' :
                       catalogCategory === 'gifts' ? 'Gifts & Awards' : 'Custom EDC'}
                    </span>
                    <span className="count-badge">{filteredProducts.length}</span>
                  </div>
                  <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
                </div>

                <div className="mc-category-list">
                  <button
                    className={`mc-category-item ${catalogCategory === 'all' ? 'active' : ''}`}
                    onClick={() => { setCatalogLoading(true); setCatalogCategory('all'); setCurrentPageNum(1); setTimeout(() => setCatalogLoading(false), 200); }}
                  >
                    <span>🏢</span> All Products ({searchedProducts.length})
                  </button>
                  <button
                    className={`mc-category-item ${catalogCategory === 'keychains' ? 'active' : ''}`}
                    onClick={() => { setCatalogLoading(true); setCatalogCategory('keychains'); setCurrentPageNum(1); setTimeout(() => setCatalogLoading(false), 200); }}
                  >
                    <span>🔑</span> Keychains & EDC ({keychainProducts.length})
                  </button>
                  <button
                    className={`mc-category-item ${catalogCategory === 'office' ? 'active' : ''}`}
                    onClick={() => { setCatalogLoading(true); setCatalogCategory('office'); setCurrentPageNum(1); setTimeout(() => setCatalogLoading(false), 200); }}
                  >
                    <span>💼</span> Executive Desk & Office ({officeProducts.length})
                  </button>
                  <button
                    className={`mc-category-item ${catalogCategory === 'writing' ? 'active' : ''}`}
                    onClick={() => { setCatalogLoading(true); setCatalogCategory('writing'); setCurrentPageNum(1); setTimeout(() => setCatalogLoading(false), 200); }}
                  >
                    <span>✒️</span> Precision Metal Pens ({writingProducts.length})
                  </button>
                  <button
                    className={`mc-category-item ${catalogCategory === 'coasters' ? 'active' : ''}`}
                    onClick={() => { setCatalogLoading(true); setCatalogCategory('coasters'); setCurrentPageNum(1); setTimeout(() => setCatalogLoading(false), 200); }}
                  >
                    <span>☕</span> Coasters & Drinkware ({coasterProducts.length})
                  </button>
                  <button
                    className={`mc-category-item ${catalogCategory === 'gifts' ? 'active' : ''}`}
                    onClick={() => { setCatalogLoading(true); setCatalogCategory('gifts'); setCurrentPageNum(1); setTimeout(() => setCatalogLoading(false), 200); }}
                  >
                    <span>🏆</span> Corporate Gifts & Awards ({giftProducts.length})
                  </button>
                </div>

                <div className="mc-filter-accordion">
                  <button className="mc-accordion-btn">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Search size={14} />
                      <span>New Arrival</span>
                    </div>
                    <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
                  </button>
                  <button className="mc-accordion-btn">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={14} />
                      <span>Best Seller</span>
                    </div>
                    <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
                  </button>
                  <button className="mc-accordion-btn">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={14} />
                      <span>On Discount</span>
                    </div>
                    <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
                  </button>
                </div>
              </div>
            </aside>

            {/* Right Product Grid (3 Columns) */}
            <main>
              {catalogLoading ? (
                <div className="mc-product-grid">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div className="skeleton-card" key={idx} style={{ height: '320px', borderRadius: '24px' }}>
                      <div className="skeleton-image" style={{ height: '180px' }}></div>
                      <div className="skeleton-content">
                        <div className="skeleton-text skeleton-title"></div>
                        <div className="skeleton-text skeleton-price"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="empty-state-container" style={{ background: '#f8fafc', borderRadius: '24px', padding: '48px 24px' }}>
                  <AlertCircle className="empty-state-icon" />
                  <h3 className="empty-state-title">No products found matching your filter.</h3>
                  <p>Try searching for keywords like 'keychain', 'card holder', 'pen' or 'coasters'.</p>
                  <button className="mc-search-btn" style={{ marginTop: '16px' }} onClick={() => { setSearchQuery(''); setCatalogCategory('all'); setCurrentPageNum(1); }}>Clear Search & Filters</button>
                </div>
              ) : (
                <>
                  <div className="mc-product-grid">
                    {paginatedProducts.map((product, idx) => {
                      const catInfo = getProductCategory(product);
                      const tagBadge = catInfo.badge;
                      const ratingScore = (4.7 + (idx % 4) * 0.1).toFixed(1);
                      const reviewCount = (1.2 + (idx % 5) * 0.3).toFixed(1) + 'k';
                      const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`;

                      return (
                        <div className="mc-card" key={product.id}>
                          <div className="mc-card-top">
                            <span className="mc-badge-tag">{tagBadge}</span>
                            <img src={product.image} alt={product.name} className="mc-card-img" />
                          </div>

                          <div className="mc-card-body">
                            <div className="mc-card-title-row">
                              <h3 className="mc-card-title">{product.name}</h3>
                              <span className="mc-card-price">{formattedPrice}</span>
                            </div>

                            <div className="mc-card-rating">
                              <span className="mc-star-icon">★</span>
                              <span>{ratingScore} ({reviewCount} Reviews)</span>
                            </div>

                            <div className="mc-card-actions">
                              <button
                                className="mc-btn-chart"
                                onClick={() => addToQuoteList(product, 50, '')}
                              >
                                Add to Chart
                              </button>
                              <button
                                className="mc-btn-buy"
                                onClick={(e) => openPdp(product, e.currentTarget)}
                              >
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Pagination Navigation */}
                  <div className="mc-pagination">
                    <button
                      className="mc-page-nav-btn"
                      disabled={validCurrentPage <= 1}
                      style={{ opacity: validCurrentPage <= 1 ? 0.4 : 1, cursor: validCurrentPage <= 1 ? 'not-allowed' : 'pointer' }}
                      onClick={() => {
                        if (validCurrentPage > 1) {
                          setCurrentPageNum(validCurrentPage - 1);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                          announce(`Navigated to page ${validCurrentPage - 1}`);
                        }
                      }}
                    >
                      ← Previous
                    </button>

                    <div className="mc-page-numbers">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            className={`mc-page-num ${validCurrentPage === pageNum ? 'active' : ''}`}
                            onClick={() => {
                              setCurrentPageNum(pageNum);
                              window.scrollTo({ top: 300, behavior: 'smooth' });
                              announce(`Navigated to page ${pageNum}`);
                            }}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      {totalPages > 5 && <span style={{ color: '#94a3b8' }}>...</span>}
                      {totalPages > 5 && (
                        <button
                          className={`mc-page-num ${validCurrentPage === totalPages ? 'active' : ''}`}
                          onClick={() => {
                            setCurrentPageNum(totalPages);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                        >
                          {totalPages}
                        </button>
                      )}
                    </div>

                    <button
                      className="mc-page-nav-btn"
                      disabled={validCurrentPage >= totalPages}
                      style={{ opacity: validCurrentPage >= totalPages ? 0.4 : 1, cursor: validCurrentPage >= totalPages ? 'not-allowed' : 'pointer' }}
                      onClick={() => {
                        if (validCurrentPage < totalPages) {
                          setCurrentPageNum(validCurrentPage + 1);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                          announce(`Navigated to page ${validCurrentPage + 1}`);
                        }
                      }}
                    >
                      Next →
                    </button>
                  </div>
                </>
              )}
            </main>
          </div>

          {/* "Explore Our Recommendations" Section */}
          <section className="mc-recommendations-wrapper">
            <div className="mc-section-header-row">
              <h2 className="mc-section-heading">Explore our recomendations</h2>
              
              <div className="mc-carousel-arrows">
                <button className="mc-arrow-btn" aria-label="Previous recommendation" onClick={scrollRecLeft}>
                  ←
                </button>
                <button className="mc-arrow-btn" aria-label="Next recommendation" onClick={scrollRecRight}>
                  →
                </button>
              </div>
            </div>

            <div className="mc-recommendations-grid" ref={recContainerRef}>
              {PRODUCTS.slice(0, 10).map((product, idx) => {
                const catInfo = getProductCategory(product);
                const tagBadge = catInfo.badge;
                const ratingScore = (4.8 + (idx % 3) * 0.1).toFixed(1);
                const reviewCount = (1.1 + (idx % 4) * 0.4).toFixed(1) + 'k';
                const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`;

                return (
                  <div className="mc-card" key={'rec-' + product.id}>
                    <div className="mc-card-top">
                      <span className="mc-badge-tag">{tagBadge}</span>
                      <img src={product.image} alt={product.name} className="mc-card-img" />
                    </div>

                    <div className="mc-card-body">
                      <div className="mc-card-title-row">
                        <h3 className="mc-card-title">{product.name}</h3>
                        <span className="mc-card-price">{formattedPrice}</span>
                      </div>

                      <div className="mc-card-rating">
                        <span className="mc-star-icon">★</span>
                        <span>{ratingScore} ({reviewCount} Reviews)</span>
                      </div>

                      <div className="mc-card-actions">
                        <button
                          className="mc-btn-chart"
                          onClick={() => addToQuoteList(product, 50, '')}
                        >
                          Add to Chart
                        </button>
                        <button
                          className="mc-btn-buy"
                          onClick={(e) => openPdp(product, e.currentTarget)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Call To Action Dark Container */}
          <div className="mc-cta-card">
            <div className="mc-cta-left">
              <h2 className="mc-cta-title">Ready to Get Our New Stuff?</h2>
              
              <form onSubmit={(e) => { e.preventDefault(); announce('Subscribed to corporate updates!'); }} className="mc-cta-input-group">
                <input
                  type="email"
                  className="mc-cta-input"
                  placeholder="Your Email"
                  required
                />
                <button type="submit" className="mc-cta-send-btn">
                  Send
                </button>
              </form>
            </div>

            <div className="mc-cta-right">
              <div className="mc-cta-subheading">Metcraft for Homes and Needs</div>
              <p className="mc-cta-text">
                We'll listen to your needs, identify the best approach, and then create a bespoke smart EV & corporate metal solution that's right for you.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. CORPORATE RFQ INQUIRY & QUOTE LIST PAGE VIEW */}
      {activePage === 'quote' && (
        <section className="quote-page-container" aria-label="Corporate RFQ quote list building">
          <div className="section-header">
            <span className="section-tag" style={{ background: '#f1f5f9', color: '#0f172a', fontWeight: '700', fontSize: '11px', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Metcraft B2B RFQ Builder
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.03em', margin: '8px 0 4px 0' }}>
              Your Request For Quote List
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
              Modify target quantities (MOQ: 50 units) and specify custom laser engravings before submitting your bulk corporate RFQ request.
            </p>
          </div>

          {rfqSuccess ? (
            <div className="success-screen" aria-live="assertive">
              <CheckCircle2 className="success-icon" />
              <h2 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--color-success)' }}>RFQ Submitted Successfully!</h2>
              <p style={{ maxWidth: '520px', lineHeight: '1.6' }}>
                Thank you for your bulk inquiry. We have sent a confirmation email copy to <strong>{rfqEmail}</strong>. 
                Your RFQ reference tracking code is <strong>RFQ-2026-94820</strong>.
              </p>
              <div className="checkout-summary-box" style={{ width: '100%', margin: '16px 0', textAlign: 'left' }}>
                <div className="checkout-summary-title">Corporate Contact Info Registered</div>
                <p style={{ fontSize: '14px' }}>Account Representative: {rfqName} ({rfqDesignation})</p>
                <p style={{ fontSize: '14px' }}>Company: {rfqCompany}</p>
                {rfqGstEnabled && rfqGst && (
                  <p style={{ fontSize: '14px' }}>Registered GSTIN: {rfqGst.toUpperCase()}</p>
                )}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                Our designated production account manager will email your digital mockup designs and wholesale catalog quote sheet within 2 business hours.
              </p>
              <button onClick={() => navigateTo('home')} className="btn btn-secondary" style={{ marginTop: '12px' }}>
                Return to Home Desk
              </button>
            </div>
          ) : quoteList.length === 0 ? (
            <div className="cart-empty-state" style={{ padding: '64px 0' }}>
              <Briefcase style={{ width: '64px', height: '64px', color: 'var(--color-text-secondary)', opacity: '0.4' }} />
              <p style={{ fontWeight: '700', fontSize: '18px', marginTop: '16px' }}>Your RFQ Quote List is currently empty.</p>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
                Please browse our CNC metal product catalog to add keychains, card holders, pens, and coasters to build a bulk RFQ query.
              </p>
              <button onClick={() => navigateTo('catalog')} className="btn btn-secondary" style={{ marginTop: '24px' }}>
                Browse Product Catalog
              </button>
            </div>
          ) : (
            <div style={{ marginTop: '32px' }}>
              {/* Quote List items */}
              <div className="quote-items-card">
                <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '12px' }}>
                  Inquired Product Specifications ({quoteList.length} Items)
                </h3>
                
                <div className="quote-items-list">
                  {quoteList.map((item, idx) => {
                    let discountPercent = 0;
                    if (item.quantity >= 250) discountPercent = 15;
                    else if (item.quantity >= 100) discountPercent = 10;
                    
                    return (
                      <div className="quote-item-row" key={item.product.id + '-' + idx}>
                        <img src={item.product.image} alt="" className="quote-item-thumb" />
                        
                        <div className="quote-item-info">
                          <h4 className="quote-item-name">{item.product.name}</h4>
                          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', display: 'block' }}>
                            Base Price: ₹{item.product.price.toLocaleString('en-IN')} | Material: {item.product.material}
                          </span>
                          {item.engraving && (
                            <span className="quote-item-engraving">
                              Laser Engraving: "{item.engraving}"
                            </span>
                          )}
                          
                          {discountPercent > 0 && (
                            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-success)', display: 'block', marginTop: '4px' }}>
                              Bulk Volume discount applied: {discountPercent}% Off!
                            </span>
                          )}
                        </div>

                        {/* Qty Stepper starting at 50 MOQ */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <label htmlFor={'item-qty-' + idx} className="sr-only">Quantity for {item.product.name}</label>
                          <div className="qty-stepper" style={{ transform: 'scale(0.9)' }}>
                            <button
                              className="qty-btn"
                              onClick={() => updateQuoteItemQty(idx, item.quantity - 50)}
                              aria-label={'Decrease ' + item.product.name + ' quantity'}
                            >
                              <Minus size={16} />
                            </button>
                            <span
                              className="qty-val"
                              tabIndex={0}
                              aria-label={'Quantity for ' + item.product.name + ' is ' + item.quantity}
                              onKeyDown={(e) => handleQtyKeyDown(e, item.quantity, (n) => updateQuoteItemQty(idx, n))}
                            >
                              {item.quantity}
                            </span>
                            <button
                              className="qty-btn"
                              onClick={() => updateQuoteItemQty(idx, item.quantity + 50)}
                              aria-label={'Increase ' + item.product.name + ' quantity'}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>
                            MOQ: 50 units (steps of 50)
                          </span>
                        </div>

                        {/* Remove item */}
                        <button
                          className="cart-remove-btn"
                          style={{ alignSelf: 'center' }}
                          onClick={() => updateQuoteItemQty(idx, 0)}
                          aria-label={'Remove ' + item.product.name + ' from Quote Cart'}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* B2B Quote Submission RFQ Form */}
              <div className="quote-form-card">
                <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '12px' }}>
                  Corporate RFQ Requester Details
                </h3>
                
                <form onSubmit={handleRfqSubmit} style={{ marginTop: '20px' }}>
                  <div className="quote-form-grid">
                    {/* Full Name */}
                    <div className="form-group">
                      <label htmlFor="rfq-fullname">Contact Person Full Name *</label>
                      <input
                        type="text"
                        id="rfq-fullname"
                        className={'form-input ' + (rfqErrors.name ? 'input-error' : '')}
                        placeholder="John Doe"
                        value={rfqName}
                        onChange={(e) => setRfqName(e.target.value)}
                      />
                      {rfqErrors.name && (
                        <span className="input-error-msg">
                          <AlertCircle size={12} />
                          {rfqErrors.name}
                        </span>
                      )}
                    </div>

                    {/* Corporate designation */}
                    <div className="form-group">
                      <label htmlFor="rfq-designation">Corporate Designation / Title *</label>
                      <input
                        type="text"
                        id="rfq-designation"
                        className={'form-input ' + (rfqErrors.designation ? 'input-error' : '')}
                        placeholder="e.g. Procurement Lead / VP HR"
                        value={rfqDesignation}
                        onChange={(e) => setRfqDesignation(e.target.value)}
                      />
                      {rfqErrors.designation && (
                        <span className="input-error-msg">
                          <AlertCircle size={12} />
                          {rfqErrors.designation}
                        </span>
                      )}
                    </div>

                    {/* Corporate Email Address */}
                    <div className="form-group">
                      <label htmlFor="rfq-email">Corporate Work Email *</label>
                      <input
                        type="email"
                        id="rfq-email"
                        className={'form-input ' + (rfqErrors.email ? 'input-error' : '')}
                        placeholder="procurement@yourcompany.com"
                        value={rfqEmail}
                        onChange={(e) => setRfqEmail(e.target.value)}
                      />
                      {rfqErrors.email && (
                        <span className="input-error-msg">
                          <AlertCircle size={12} />
                          {rfqErrors.email}
                        </span>
                      )}
                      {rfqErrors.emailWarning && (
                        <span className="input-error-msg" style={{ color: '#ea580c' }}>
                          <AlertCircle size={12} />
                          {rfqErrors.emailWarning}
                        </span>
                      )}
                    </div>

                    {/* Corporate Phone Number */}
                    <div className="form-group">
                      <label htmlFor="rfq-phone">Contact Phone Number *</label>
                      <input
                        type="tel"
                        id="rfq-phone"
                        className={'form-input ' + (rfqErrors.phone ? 'input-error' : '')}
                        placeholder="+91 98765 43210"
                        value={rfqPhone}
                        onChange={(e) => setRfqPhone(e.target.value)}
                      />
                      {rfqErrors.phone && (
                        <span className="input-error-msg">
                          <AlertCircle size={12} />
                          {rfqErrors.phone}
                        </span>
                      )}
                    </div>

                    {/* Company Name */}
                    <div className="form-group">
                      <label htmlFor="rfq-company">Corporate Business Name *</label>
                      <input
                        type="text"
                        id="rfq-company"
                        className={'form-input ' + (rfqErrors.company ? 'input-error' : '')}
                        placeholder="Tata Motors Limited"
                        value={rfqCompany}
                        onChange={(e) => setRfqCompany(e.target.value)}
                      />
                      {rfqErrors.company && (
                        <span className="input-error-msg">
                          <AlertCircle size={12} />
                          {rfqErrors.company}
                        </span>
                      )}
                    </div>

                    {/* GST Input Option */}
                    <div className="form-group" style={{ justifyContent: 'center' }}>
                      <div className="form-checkbox-group" onClick={() => setRfqGstEnabled(!rfqGstEnabled)}>
                        <input
                          type="checkbox"
                          id="rfq-gst-check"
                          className="form-checkbox"
                          checked={rfqGstEnabled}
                          onChange={() => {}}
                        />
                        <label htmlFor="rfq-gst-check" style={{ cursor: 'pointer' }}>
                          Enter Business GSTIN (Input Tax Credit)
                        </label>
                      </div>
                    </div>

                    {/* GST Entry field */}
                    {rfqGstEnabled && (
                      <div className="form-group quote-form-col-full" style={{ backgroundColor: 'var(--color-surface-subtle)', padding: '16px', borderRadius: '10px' }}>
                        <label htmlFor="rfq-gstin">15-Digit Corporate GSTIN Number</label>
                        <input
                          type="text"
                          id="rfq-gstin"
                          className={'form-input ' + (rfqErrors.gst ? 'input-error' : '')}
                          placeholder="e.g. 27AAAAA1111A1Z1"
                          maxLength={15}
                          value={rfqGst}
                          onChange={(e) => setRfqGst(e.target.value)}
                        />
                        {rfqErrors.gst && (
                          <span className="input-error-msg">
                            <AlertCircle size={12} />
                            {rfqErrors.gst}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Special requirements */}
                    <div className="form-group quote-form-col-full">
                      <label htmlFor="rfq-instructions">Logo branding location or packaging instructions (Optional)</label>
                      <textarea
                        id="rfq-instructions"
                        className="form-textarea"
                        placeholder="Please laser engrave our corporate logo in the center of card holders. Need custom gift box packaging for each."
                        value={rfqInstructions}
                        onChange={(e) => setRfqInstructions(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Summary indications */}
                  <div className="checkout-summary-box" style={{ margin: '24px 0' }}>
                    <div className="checkout-summary-title">Indicative wholesale estimate</div>
                    <div className="summary-row" style={{ fontSize: '14px', fontWeight: '500' }}>
                      <span>Wholesale Quote List Subtotal</span>
                      <span>₹{calculatedSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-row" style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: '400' }}>
                      <span>Estimated GST credit amount (18%)</span>
                      <span>₹{estimatedGst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-row summary-total" style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '8px' }}>
                      <span>Indicative Total Quote (incl. GST)</span>
                      <span>₹{totalRfqEstimate.toLocaleString('en-IN')}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px', textAlign: 'right' }}>
                      * Final pricing depends on brand setup complexity, packaging, and shipping options.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-secondary"
                    style={{ width: '100%' }}
                    disabled={rfqSubmitLoading}
                  >
                    {rfqSubmitLoading ? 'Submitting Corporate RFQ…' : 'Submit Wholesale Request For Quote'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4. CONTACT PAGE — MOCKUP REDESIGN */}
      {activePage === 'contact' && (
        <section className="ss-contact-page" aria-label="Contact Us">
          <div className="ss-contact-breadcrumb">
            Home / <span>Contact_Us</span>
          </div>
          <h2 className="ss-contact-page-title">Contact Us</h2>

          <div className="ss-contact-grid">
            {/* Left column: Info */}
            <div className="ss-contact-info">
              <h3 className="ss-contact-info-heading">
                Need more information?<br />
                Get in touch with us
              </h3>
              <p className="ss-contact-info-sub">
                Premium CNC-machined corporate metal gifts — from strategy to sample dispatch at scale.
              </p>

              <div className="ss-contact-detail">
                <div className="ss-contact-detail-icon">
                  <Phone size={18} />
                </div>
                <div className="ss-contact-detail-text">
                  <h4>Phone Number</h4>
                  <p>+91 92119 47188<br />+91 84486 63297</p>
                </div>
              </div>

              <div className="ss-contact-detail">
                <div className="ss-contact-detail-icon">
                  <Mail size={18} />
                </div>
                <div className="ss-contact-detail-text">
                  <h4>Email</h4>
                  <p>sales@ortexindustries.in</p>
                </div>
              </div>

              <div className="ss-contact-detail">
                <div className="ss-contact-detail-icon">
                  <MapPin size={18} />
                </div>
                <div className="ss-contact-detail-text">
                  <h4>Address</h4>
                  <p>Ortex Industries Private Limited,<br />Delhi, India</p>
                </div>
              </div>
            </div>

            {/* Right column: Form */}
            <div className="ss-contact-form-section">
              {contactSuccess ? (
                <div className="ss-contact-success">
                  <CheckCircle2 />
                  <h3>Corporate Message Received!</h3>
                  <p>
                    We have successfully logged your B2B inquiry. Our corporate procurement desk representative will contact you via email or phone within 2 hours.
                  </p>
                  <button onClick={() => setContactSuccess(false)} className="ss-form-submit" style={{ width: 'auto', display: 'inline-block' }}>
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="ss-contact-form-title">Send Message</h3>
                  <p className="ss-contact-form-sub">
                    Please fill out the form below with your details and message to contact with us
                  </p>

                  <form onSubmit={handleContactSubmit}>
                    {/* First Name + Company side by side */}
                    <div className="ss-form-row">
                      <div className="ss-form-field">
                        <input
                          type="text"
                          id="contact-form-name"
                          className={`ss-form-input ${contactErrors.name ? 'has-error' : ''}`}
                          placeholder="Full Name"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                        />
                        {contactErrors.name && (
                          <span className="ss-form-error">
                            <AlertCircle size={11} />
                            {contactErrors.name}
                          </span>
                        )}
                      </div>
                      <div className="ss-form-field">
                        <input
                          type="text"
                          id="contact-form-company"
                          className={`ss-form-input ${contactErrors.company ? 'has-error' : ''}`}
                          placeholder="Company Name"
                          value={contactCompany}
                          onChange={(e) => setContactCompany(e.target.value)}
                        />
                        {contactErrors.company && (
                          <span className="ss-form-error">
                            <AlertCircle size={11} />
                            {contactErrors.company}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Email or Phone */}
                    <div className="ss-form-row">
                      <div className="ss-form-field">
                        <input
                          type="email"
                          id="contact-form-email"
                          className={`ss-form-input ${contactErrors.email ? 'has-error' : ''}`}
                          placeholder="Corporate Email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                        />
                        {contactErrors.email && (
                          <span className="ss-form-error">
                            <AlertCircle size={11} />
                            {contactErrors.email}
                          </span>
                        )}
                      </div>
                      <div className="ss-form-field">
                        <input
                          type="tel"
                          id="contact-form-phone"
                          className={`ss-form-input ${contactErrors.phone ? 'has-error' : ''}`}
                          placeholder="Phone Number"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                        />
                        {contactErrors.phone && (
                          <span className="ss-form-error">
                            <AlertCircle size={11} />
                            {contactErrors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="ss-form-field">
                      <textarea
                        id="contact-form-msg"
                        className={`ss-form-textarea ${contactErrors.message ? 'has-error' : ''}`}
                        placeholder="Write Message Here..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                      />
                      {contactErrors.message && (
                        <span className="ss-form-error">
                          <AlertCircle size={11} />
                          {contactErrors.message}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="ss-form-submit"
                      disabled={contactLoading}
                    >
                      {contactLoading ? 'Sending Inquiry…' : 'Submit Corporate Inquiry'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. TERMS OF SERVICE B2B POLICY PAGE */}
      {activePage === 'terms' && (
        <section className="terms-page-container" aria-label="Ortex Industries Terms of Service" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px', color: 'var(--color-text-primary)', lineHeight: '1.7' }}>
          <div className="section-header" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '16px', marginBottom: '32px' }}>
            <span className="section-tag">Ortex Industries Legal Desk</span>
            <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Terms of Service & Conditions</h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Effective Date: July 23, 2026 | Last Updated: July 23, 2026
            </p>
          </div>

          <div className="terms-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '15px' }}>
            <div style={{ backgroundColor: 'var(--color-surface-subtle)', borderLeft: '4px solid var(--color-surface-base)', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontWeight: '600' }}>
                Welcome to Ortex Industries Private Limited. These terms govern the request, custom proofing, production setup, and cargo dispatch of all promotional metal gifts, executive desk accents, and everyday carry items machined at our plant.
              </p>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>1. Agreement to Terms</h3>
            <p>
              By accessing this website, located at <a href="https://www.ortexindustries.in/" style={{ color: 'var(--color-text-primary)', fontWeight: '600' }}>https://www.ortexindustries.in/</a>, we assume you accept these terms and conditions in full. Do not continue to use Ortex Industries' services or website if you do not agree to be bound by all the conditions stated on this page.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>2. Cookies Policy</h3>
            <p>
              The website uses cookies to help personalize your online experience. By accessing Ortex Industries, you agreed to use the required cookies.
            </p>
            <p>
              A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you and can only be read by a web server in the domain that issued the cookie to you.
            </p>
            <p>
              We may use cookies to collect, store, and track information for statistical or marketing purposes to operate our website. You have the ability to accept or decline optional Cookies. There are some required Cookies that are necessary for the operation of our website. These cookies do not require your consent as they always work. 
            </p>
            <p>
              Please keep in mind that by accepting required Cookies, you also accept third-party Cookies, which might be used via third-party provided services if you use such services on our website, for example, a video display window or a 3D canvas viewer integrated into our website.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>3. Intellectual Property License</h3>
            <p>
              Unless otherwise stated, Ortex Industries and/or its licensors own the intellectual property rights for all material, design CAD files, machinery codes, and product photographs on Ortex Industries. All intellectual property rights are reserved. You may access this from Ortex Industries for your own personal or authorized corporate use subject to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
              <li>• Copy or republish material, 3D assets, or code configurations from Ortex Industries.</li>
              <li>• Sell, rent, or sub-license material or catalog items from Ortex Industries.</li>
              <li>• Reproduce, duplicate or copy material from Ortex Industries for retail redistribution.</li>
              <li>• Redistribute content from Ortex Industries, except promotional material intended for corporate gifting reviews.</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>4. B2B Custom Production, MOQs, & Cancellations</h3>
            <p>
              Because our promotional metal gifts are custom precision-milled via CNC machinery and laser-etched with corporate branding logos, they are subject to the following business rules:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
              <li><strong>Minimum Order Quantity (MOQ):</strong> All custom production runs require a minimum of 50 units. Requests below 50 units are treated as pre-production prototype samples subject to tooling setup fees.</li>
              <li><strong>Digital CAD & Mockup Approvals:</strong> Prior to CNC milling, customer must sign off on the digital CAD branding mockup. Ortex Industries is not liable for errors in logo position, font size, or alignment if milled according to the approved CAD sheet.</li>
              <li><strong>Bespoke Non-Cancellation Policy:</strong> Once a custom order goes into production, or once a pre-production physical prototype has been couriered and approved, orders cannot be canceled, refunded, or modified due to the bespoke nature of CNC metal milling.</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>5. User-Submitted Content & Comments</h3>
            <p>
              Parts of this website offer users an opportunity to post, inquire, or exchange opinions and information in certain areas of the website. Ortex Industries does not filter, edit, publish or review Comments before their presence on the website. Comments do not reflect the views and opinions of Ortex Industries, its agents, and/or affiliates. 
            </p>
            <p>
              To the extent permitted by applicable laws, Ortex Industries shall not be liable for the Comments or any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
            </p>
            <p>
              Ortex Industries reserves the right to monitor all Comments and remove any Comments that can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>6. Hyperlinking to our Content</h3>
            <p>
              The following organizations may link to our Website without prior written approval:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
              <li>• Government agencies, Search engines, and News organizations.</li>
              <li>• Online directory distributors when linking in the same manner as they hyperlink to other listed business websites.</li>
              <li>• System-wide Accredited Businesses (excluding soliciting non-profit organizations, charity shopping malls, and fundraising groups).</li>
            </ul>
            <p>
              If you are interested in linking to our website, you must inform us by sending an e-mail to our desk. Please wait 2-3 weeks for a response. No use of Ortex Industries' logo or other artwork will be allowed for linking absent a trademark license agreement.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>7. Content Liability</h3>
            <p>
              We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are raised on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>8. Reservation of Rights & Link Removal</h3>
            <p>
              We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time.
            </p>
            <p>
              If you find any link on our Website that is offensive for any reason, you are free to contact and inform us. We will consider requests to remove links, but we are not obligated to do so or to respond to you directly.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>9. Disclaimer of Liability</h3>
            <p>
              To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury resulting from negligence, fraud, or fraudulent misrepresentation.
            </p>
            <p>
              As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '24px' }}>
            <button onClick={() => navigateTo('home')} className="btn btn-secondary">
              Back to Home Desk
            </button>
          </div>
        </section>
      )}

      {/* 6. PRIVACY POLICY B2B POLICY PAGE */}
      {activePage === 'privacy' && (
        <section className="privacy-page-container" aria-label="Ortex Industries Privacy Policy" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px', color: 'var(--color-text-primary)', lineHeight: '1.7' }}>
          <div className="section-header" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '16px', marginBottom: '32px' }}>
            <span className="section-tag">Ortex Industries Legal Desk</span>
            <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Privacy Policy</h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Effective Date: July 4, 2026 | Last Updated: July 4, 2026
            </p>
          </div>

          <div className="privacy-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '15px' }}>
            <div style={{ backgroundColor: 'var(--color-surface-subtle)', borderLeft: '4px solid var(--color-surface-base)', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontWeight: '600' }}>
                At Ortex Industries Private Limited, we prioritize the protection and confidentiality of our clients' data. This Privacy Policy outlines how we collect, store, share, and protect your personal information and custom product assets when you interact with our website, use our quote tools, or procure custom manufacturing services from us.
              </p>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us when requesting custom quotes, placing orders, or contacting our support team. This includes:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
              <li><strong>Personal Identification Information:</strong> Name, business email address, corporate domain, phone number, and shipping address.</li>
              <li><strong>Business Identification details:</strong> Company name, registration documents, and Tax / GST registration numbers.</li>
              <li><strong>Custom Manufacturing Assets:</strong> Brand logos, corporate vector designs (.AI, .EPS, .SVG, .DXF), product specifications, and engraving text commands.</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>2. How We Use Your Information</h3>
            <p>
              We process your information to fulfill our manufacturing obligations and provide high-quality customized services. Specifically, we use your data to:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
              <li>• Generate accurate B2B price estimates via our corporate quote calculator.</li>
              <li>• Coordinate pre-production artwork approvals, digital mockups, and client confirmations.</li>
              <li>• Process bulk invoices, verify GST tax credits, and coordinate secure bank transactions.</li>
              <li>• Manage cargo routing and shipping logistics with our PAN India and global courier networks.</li>
              <li>• Analyze site visits anonymously to optimize load times and rendering performance.</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>3. Data Sharing and Third-Party Disclosures</h3>
            <p>
              Ortex Industries does not sell, lease, or trade your personal data. We share information only with the providers necessary to run this website and complete your custom order.
            </p>
            <p><strong>Specifically, our named data processors are:</strong></p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
              <li>• <strong>Supabase Inc.</strong> (Secure cloud database and file storage for bulk inquiries and uploaded artwork vectors).</li>
              <li>• <strong>ipapi.co</strong> (with <em>api.ipify.org</em> as fallback) for geo-targeting logic, enabling our site to present tailored PAN India delivery options or Worldwide Export trust elements.</li>
              <li>• Authorized commercial transport and logistics carriers to execute cargo dispatch to your company's physical hubs.</li>
            </ul>
            <p>
              We do not use Google Analytics, Facebook tracking pixels, or retail retargeting networks of any kind.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>4. Analytics, IP Address, and Consent</h3>
            <p>
              We collect page-visit records containing your device type, browser, operating system, and referring site. If — and only if — you accept analytics on our consent banner, these records additionally include your public IP address and the approximate city, region, and country derived from it by ipapi.co. 
            </p>
            <p>
              Declining means no request is sent to ipapi.co and no IP address or location is stored. You can withdraw consent at any time by clearing this site's browser storage. See our Cookie Policy for the precise list of what is stored in your browser.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>5. Intellectual Property and Asset Retention</h3>
            <p>
              Custom design files, brand logos, and artwork templates uploaded through our platform are retained solely for the purpose of executing your production orders and enabling convenient re-ordering. We implement access control systems to ensure your proprietary designs are restricted to authorized design and manufacturing staff.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>6. Security Standards</h3>
            <p>
              We implement robust technical and organizational security measures to prevent unauthorized access, alteration, disclosure, or destruction of your personal details and custom assets. This includes secure data transmission protocols (HTTPS), server-side encryption, and regular vulnerability checks on our local network infrastructures.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>7. Your Global Rights (GDPR / CCPA / DPDP)</h3>
            <p>
              Depending on your location, you hold legal rights regarding your personal data. This includes the right to request a copy of your records, request the rectification of incorrect details, withdraw consent for marketing communications, or demand the deletion of your account history (subject to legal or tax audit retention requirements). To exercise these rights, contact us directly at our compliance email.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>8. Contact Information</h3>
            <p>
              For questions about this policy, data removal requests, or privacy concerns, please contact our data team at:
            </p>
            <div style={{ backgroundColor: 'var(--color-surface-subtle)', padding: '16px', borderRadius: '4px', fontSize: '14px' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: '700' }}>Ortex Industries Compliance Office</p>
              <p style={{ margin: '0 0 4px 0' }}><strong>Email:</strong> sales@ortexindustries.in</p>
              <p style={{ margin: 0 }}><strong>Address:</strong> Custom Manufacturing Division, New Delhi, India</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '24px' }}>
            <button onClick={() => navigateTo('home')} className="btn btn-secondary">
              Back to Home Desk
            </button>
          </div>
        </section>
      )}

      {/* 7. COOKIE POLICY B2B POLICY PAGE */}
      {activePage === 'cookie' && (
        <section className="cookie-page-container" aria-label="Ortex Industries Cookie Policy" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px', color: 'var(--color-text-primary)', lineHeight: '1.7' }}>
          <div className="section-header" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '16px', marginBottom: '32px' }}>
            <span className="section-tag">Ortex Industries Legal Desk</span>
            <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Cookie Policy</h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Effective Date: July 4, 2026 | Last Updated: July 4, 2026
            </p>
          </div>

          <div className="cookie-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '15px' }}>
            <div style={{ backgroundColor: 'var(--color-surface-subtle)', borderLeft: '4px solid var(--color-surface-base)', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontWeight: '600' }}>
                This Cookie Policy explains what Ortex Industries Private Limited stores in your browser and what we collect when you use this website. We have written it to describe our actual behaviour rather than a generic template — if you find a discrepancy, please tell us and we will correct it.
              </p>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)' }}>1. This Website Does Not Set Cookies</h3>
            <p>
              Ortex Industries does not set any HTTP cookies, and we do not use Google Analytics, Meta Pixel, advertising pixels, or any third-party advertising or retargeting network. We do use two browser storage mechanisms that behave similarly, and this policy explains exactly what they hold.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>2. Browser Storage We Use</h3>
            <p>
              We utilize local sandbox values to keep the web application functioning smoothly and to avoid losing your custom quotes or engraving states:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px', margin: 0 }}>
              <li>
                <strong>localStorage:</strong> 
                <br />
                Holds a randomly generated visitor identifier (e.g. <code>'usr_k3f9a2b1x'</code>), your dark theme preference, your analytics consent choice, and — only if a submission fails to reach our servers — a temporary copy of your corporate enquiry so it can be re-sent rather than lost.
              </li>
              <li>
                <strong>sessionStorage:</strong> 
                <br />
                Holds a random session identifier that is discarded when you close the tab.
              </li>
            </ul>
            <p>
              Neither mechanism contains your name, email, or password, and neither is transmitted to any advertiser.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>3. Optional Analytics and IP-Based Location</h3>
            <p>
              If, and only if, you press <strong>'Accept analytics'</strong> on our consent banner, we record which pages you visit, your device type, browser, and referring site, together with your public IP address and the approximate city and region derived from it. 
            </p>
            <p>
              The IP lookup is performed by <strong>ipapi.co</strong> (with <em>api.ipify.org</em> as a fallback), which means your IP address is disclosed to that provider. Records are stored on our secure infrastructure at Supabase. If you decline, no request is made to ipapi.co, no IP address is stored, and no location is derived.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>4. Changing or Withdrawing Your Choice</h3>
            <p>
              You can withdraw consent at any time by clearing this site's data in your browser settings, which removes the stored choice and causes the consent banner to appear again. Declining analytics does not affect any functionality — the quote builder, calculator, and contact forms all work exactly the same. 
            </p>
            <p>
              You may also block browser storage entirely, though the site will then be unable to preserve an enquiry that fails to submit.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>5. Policy Updates and Contact</h3>
            <p>
              We may update this policy periodically to reflect changes in our technology or compliance guidelines. For inquiries regarding cookie usage, contact:
            </p>
            <div style={{ backgroundColor: 'var(--color-surface-subtle)', padding: '16px', borderRadius: '4px', fontSize: '14px' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: '700' }}>Ortex Industries Compliance Group</p>
              <p style={{ margin: '0 0 4px 0' }}><strong>Email:</strong> sales@ortexindustries.in</p>
              <p style={{ margin: 0 }}><strong>Address:</strong> Custom Manufacturing Division, New Delhi, India</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '24px' }}>
            <button onClick={() => navigateTo('home')} className="btn btn-secondary">
              Back to Home Desk
            </button>
          </div>
        </section>
      )}

      {/* 8. ACCEPTABLE USE B2B POLICY PAGE */}
      {activePage === 'use' && (
        <section className="use-page-container" aria-label="Ortex Industries Acceptable Use Policy" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px', color: 'var(--color-text-primary)', lineHeight: '1.7' }}>
          <div className="section-header" style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '16px', marginBottom: '32px' }}>
            <span className="section-tag">Ortex Industries Legal Desk</span>
            <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Acceptable Use Policy</h2>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Effective Date: July 4, 2026 | Last Updated: July 4, 2026
            </p>
          </div>

          <div className="use-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '15px' }}>
            <div style={{ backgroundColor: 'var(--color-surface-subtle)', borderLeft: '4px solid var(--color-surface-base)', padding: '16px', borderRadius: '4px', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontWeight: '600' }}>
                This Acceptable Use Policy defines the standards and restrictions for uploading custom designs and interacting with the Ortex Industries Private Limited website and manufacturing services.
              </p>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)' }}>1. Upload Guidelines for Custom Designs</h3>
            <p>
              When uploading graphics, text, brand logo layouts, or vector files for custom manufacturing (corporate gifting, OEM white label designs, bespoke executive accessories, laser-engraving setups), you agree that you will not submit any content that:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
              <li>• Infringes upon copyrights, trademarks, design patents, or proprietary trade rights of third parties.</li>
              <li>• Contains offensive, defamatory, hateful, or discriminatory imagery or text.</li>
              <li>• Violates any local, state, national, or international laws or commercial regulations.</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>2. Prohibited Platform Activities</h3>
            <p>
              You are prohibited from:
            </p>
            <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
              <li>• Running automated scripts, bots, spiders, or scrapers on our B2B price quote calculators, bulk weight estimators, or inventory listings.</li>
              <li>• Attempting to bypass security barriers, scan vulnerabilities, or reverse-engineer our custom CAD mockup positioning logic.</li>
              <li>• Injecting malicious code, viruses, trojan horses, or corrupt document files into our contact forms, RFP uploads, or enquiry submissions.</li>
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>3. Compliance & Design Review</h3>
            <p>
              Ortex Industries maintains sole discretion to review all custom artwork uploads. We reserve the right to cancel any order or refuse production of any design we determine violates these terms or conflicts with our corporate compliance policies.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>4. Reporting Violations</h3>
            <p>
              If you believe any user is violating this policy or uploading designs that infringe on your intellectual property, please report the incident to our compliance team with supporting documentation.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: '700', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px', color: 'var(--color-surface-base)', marginTop: '16px' }}>5. Enforcement</h3>
            <p>
              Violations of this policy may result in immediate order cancellation, withholding of production deposits, and restrictions on future business relations.
            </p>
            <div style={{ backgroundColor: 'var(--color-surface-subtle)', padding: '16px', borderRadius: '4px', fontSize: '14px', marginTop: '16px' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: '700' }}>Ortex Industries Compliance Group</p>
              <p style={{ margin: '0 0 4px 0' }}><strong>Email:</strong> sales@ortexindustries.in</p>
              <p style={{ margin: 0 }}><strong>Address:</strong> Custom Manufacturing Division, New Delhi, India</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '24px' }}>
            <button onClick={() => navigateTo('home')} className="btn btn-secondary">
              Back to Home Desk
            </button>
          </div>
        </section>
      )}

      {/* 9. ABOUT ORTEX INDUSTRIES MODULAR DETAIL SECTION */}
      {activePage === 'about' && (
        <AboutPage navigateTo={navigateTo} />
      )}

      {/* 10. FREQUENTLY ASKED QUESTIONS MODULAR SECTION */}
      {activePage === 'faq' && (
        <FaqPage navigateTo={navigateTo} />
      )}

      {/* --- FLOATING WHATSAPP BUTTON (Indian country code linked) --- */}
      <a 
        href={whatsappPreFilledLink} 
        className="whatsapp-floating-btn" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Direct chat with Ortex Industries B2B gifting rep on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* --- PRODUCT SPECIFICATION DETAILS MODAL (PDP View) --- */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closePdp} role="dialog" aria-modal="true" aria-labelledby="pdp-modal-title">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={closePdp}
              aria-label="Close product specs modal"
            >
              <X />
            </button>

            <div className="pdp-grid">
              {/* Product Visuals & Live Engraving Preview */}
              <div className="pdp-visuals">
                <div className="pdp-preview-wrapper">
                  <img 
                    src={selectedProduct.image} 
                    alt={'Enlarged view of ' + selectedProduct.name} 
                    className="pdp-main-image" 
                  />

                  {/* Engraving Overlay text positioned directly onto product image surface */}
                  {selectedProduct.engravable && pdpEngraving.trim() && (
                    <div 
                      className={'engraving-live-overlay preview-' + selectedProduct.id}
                      aria-hidden="true"
                    >
                      {pdpEngraving}
                    </div>
                  )}
                </div>

                {selectedProduct.engravable && (
                  <p style={{ fontSize: '11px', marginTop: '12px', color: 'var(--color-text-secondary)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={12} />
                    Live laser engraving preview.
                  </p>
                )}
              </div>

              {/* Product Details Specs & B2B Options */}
              <div className="pdp-details">
                <div>
                  <span className="section-tag" style={{ marginBottom: '4px' }}>
                    {selectedProduct.category === 'writing' ? 'CNC Writing Instrument' : selectedProduct.category === 'office' ? 'Executive Office Valet' : 'Everyday Carry & Gifting'}
                  </span>
                  <h2 className="pdp-title" id="pdp-modal-title">{selectedProduct.name}</h2>
                </div>

                {/* B2B Tiered Volume Pricing Grid */}
                <div className="pdp-price-row">
                  <span className="pdp-volume-pricing-title">Tiered Volume Pricing Schedule (per unit):</span>
                  <div className="pdp-volume-grid">
                    <div className="pdp-volume-box">
                      <span className="volume-qty">50-99 units</span>
                      <span className="volume-price">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pdp-volume-box">
                      <span className="volume-qty">100-249 units</span>
                      <span className="volume-price">₹{Math.round(selectedProduct.price * 0.9).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pdp-volume-box">
                      <span className="volume-qty">250+ units</span>
                      <span className="volume-price">₹{Math.round(selectedProduct.price * 0.85).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{selectedProduct.description}</p>

                {/* Specs Table */}
                <div className="pdp-meta-table">
                  <div className="pdp-meta-row">
                    <span className="pdp-meta-label">Primary Material</span>
                    <span className="pdp-meta-val">{selectedProduct.material}</span>
                  </div>
                  <div className="pdp-meta-row">
                    <span className="pdp-meta-label">Weight Specification</span>
                    <span className="pdp-meta-val">{selectedProduct.weight}</span>
                  </div>
                  <div className="pdp-meta-row">
                    <span className="pdp-meta-label">Minimum Order Qty</span>
                    <span className="pdp-meta-val">50 Units</span>
                  </div>
                  <div className="pdp-meta-row">
                    <span className="pdp-meta-label">Bulk Lead Time Estimate</span>
                    <span className="pdp-meta-val">10-14 days (Insured cargo dispatch)</span>
                  </div>
                </div>

                {/* Live Customization Input */}
                {selectedProduct.engravable && (
                  <div className="personalization-box">
                    <label htmlFor="pdp-engraving-input">Laser-Etched Logo Text (Optional)</label>
                    <input
                      id="pdp-engraving-input"
                      type="text"
                      className="personalization-input"
                      placeholder="e.g. TATA STEEL 2026"
                      maxLength={24}
                      value={pdpEngraving}
                      onChange={(e) => setPdpEngraving(e.target.value)}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                      Max 24 characters. Fiber laser etched into metal casing.
                    </span>
                  </div>
                )}

                {/* Stepper starting at 50 units MOQ */}
                <div className="pdp-actions">
                  <div className="quantity-section">
                    <span className="quantity-label" id="qty-stepper-label">Inquiry Qty</span>
                    <div 
                      className="qty-stepper"
                      role="group"
                      aria-labelledby="qty-stepper-label"
                    >
                      <button
                        className="qty-btn"
                        onClick={() => setPdpQuantity(Math.max(50, pdpQuantity - 50))}
                        disabled={pdpQuantity <= 50}
                        aria-label="Decrease inquiry volume"
                      >
                        <Minus size={16} />
                      </button>
                      <span 
                        className="qty-val"
                        tabIndex={0}
                        aria-label={'Current volume selected is ' + pdpQuantity + ' units'}
                        onKeyDown={(e) => handleQtyKeyDown(e, pdpQuantity, setPdpQuantity)}
                      >
                        {pdpQuantity}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => setPdpQuantity(pdpQuantity + 50)}
                        aria-label="Increase inquiry volume"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>
                      (steps of 50)
                    </span>
                  </div>

                  <button
                    className="btn btn-secondary"
                    onClick={() => addToQuoteList(selectedProduct, pdpQuantity, pdpEngraving)}
                  >
                    Add to wholesale Quote List
                  </button>
                </div>

                <div className="trust-badges-pdp">
                  <div className="pdp-badge">
                    <FileText />
                    <span>GST Invoices Provided</span>
                  </div>
                  <div className="pdp-badge">
                    <Truck />
                    <span>Insured Cargo Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRM REMOVE FROM QUOTE LIST DIALOG --- */}
      {confirmDeleteDialog.isOpen && (
        <div className="modal-overlay" style={{ zIndex: 350 }}>
          <div 
            className="modal-content"
            style={{ maxWidth: '400px', padding: '24px', textAlign: 'center' }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            aria-describedby="confirm-delete-desc"
          >
            <h3 id="confirm-delete-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
              Remove from Quote List?
            </h3>
            <p id="confirm-delete-desc" style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
              Are you sure you want to remove "{quoteList[confirmDeleteDialog.itemIndex]?.product.name}" from your RFQ query?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                className="btn btn-ghost-dark"
                style={{ padding: '8px 16px', borderRadius: '10px' }}
                onClick={() => setConfirmDeleteDialog({ isOpen: false, itemIndex: -1 })}
              >
                Cancel
              </button>
              <button
                className="btn btn-secondary"
                style={{ padding: '8px 16px', borderRadius: '10px', backgroundColor: 'var(--color-error)' }}
                onClick={confirmDeleteQuoteItem}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SITE FOOTER (Matching Reference Nexora Dark Theme) --- */}
      <footer className="nx-footer" id="footer">
        <div className="nx-footer-container">
          {/* Brand Col */}
          <div>
            <div className="nx-footer-brand-logo">
              <img src="/logo.jpg" alt="Metcraft Logo" style={{ height: '32px', borderRadius: '4px', background: '#ffffff', padding: '2px' }} />
              <span>metcraft.</span>
            </div>
            <p className="nx-footer-desc">
              We help businesses grow through precision engineered metal solutions. Let's build something great together.
            </p>
            <div className="nx-social-links">
              <a href="#" className="nx-social-btn" aria-label="Facebook">f</a>
              <a href="#" className="nx-social-btn" aria-label="Twitter">t</a>
              <a href="#" className="nx-social-btn" aria-label="LinkedIn">in</a>
              <a href="#" className="nx-social-btn" aria-label="Instagram">ig</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="nx-footer-col-title">Quick Links</h3>
            <ul className="nx-footer-links-list">
              <li><button className="nx-footer-link" onClick={() => navigateTo('home')}>Home</button></li>
              <li><button className="nx-footer-link" onClick={() => navigateTo('about')}>About Us</button></li>
              <li><button className="nx-footer-link" onClick={() => navigateTo('catalog')}>Corporate Catalog</button></li>
              <li><button className="nx-footer-link" onClick={() => navigateTo('catalog')}>Portfolio</button></li>
              <li><button className="nx-footer-link" onClick={() => navigateTo('contact')}>Contact</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="nx-footer-col-title">Services</h3>
            <ul className="nx-footer-links-list">
              <li><button className="nx-footer-link" onClick={() => handleCategorySelect('office')}>Precision CNC Milling</button></li>
              <li><button className="nx-footer-link" onClick={() => handleCategorySelect('writing')}>Fiber Laser Engraving</button></li>
              <li><button className="nx-footer-link" onClick={() => handleCategorySelect('everyday')}>Bulk OEM White Label</button></li>
              <li><button className="nx-footer-link" onClick={() => navigateTo('contact')}>Bespoke Product Design</button></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="nx-footer-col-title">Contact Us</h3>
            <ul className="nx-footer-links-list">
              <li className="nx-contact-item">
                <Mail size={16} style={{ color: '#2563eb' }} />
                <span>sales@ortexindustries.in</span>
              </li>
              <li className="nx-contact-item">
                <Phone size={16} style={{ color: '#2563eb' }} />
                <span>+91 92119 47188</span>
              </li>
              <li className="nx-contact-item">
                <MapPin size={16} style={{ color: '#2563eb' }} />
                <span>Metcraft Complex, Okhla Phase 3, New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="nx-footer-bottom">
          <span>© 2026 Metcraft. All Rights Reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button className="nx-footer-link" onClick={() => navigateTo('privacy')}>Privacy Policy</button>
            <span>|</span>
            <button className="nx-footer-link" onClick={() => navigateTo('terms')}>Terms & Conditions</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
