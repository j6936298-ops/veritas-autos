import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';
import './react-bridge.css';
import './legacy.js';

function App() {
  useEffect(() => {
    // The supplied original site script uses document-level handlers and is kept intact.
    if (typeof window.initializeVeritas === 'function') window.initializeVeritas();
  }, []);
  return <div id="veritas-original" dangerouslySetInnerHTML={{ __html: ORIGINAL_MARKUP }} />;
}

const ORIGINAL_MARKUP = `
<header class="header">
  <div class="nav container">
    <a class="logo" href="#home"><img src="assets/veritas-autos-logo-transparent.png" alt="Veritas Autos"></a>
    <nav class="navlinks">
      <a href="#shop">Shop Parts</a><a href="#vehicle">Find Parts</a><a href="#bulk">Bulk Purchase</a><a href="#vendors">Vendors</a><a href="#about">About</a>
    </nav>
    <div class="navtools"><button class="search-trigger" aria-label="Search" onclick="goSearch()">⌕</button><a class="cart" href="#shop" aria-label="Shopping cart"><span class="cart-icon">▱</span><span class="cart-label">Cart</span><b>0</b></a><a class="signin" href="#vendors">Sign in</a><button class="hamb" onclick="toggleMenu()" aria-label="Menu">☰</button></div>
  </div>
  <div class="mobile-nav" id="mobileNav"><a href="#shop">Shop Parts</a><a href="#vehicle">Find Parts</a><a href="#bulk">Bulk Purchase</a><a href="#vendors">Vendors</a><a href="#about">About</a></div>
</header>

<main>
<section class="hero" id="home">
  <div class="hero-art"><div class="hero-photo"></div><div class="hero-photo-shade"></div><div class="hero-ad"><span>VERITAS AUTOS</span><strong>Genuine parts.<br>Greater journeys.</strong><small>Verified sellers · Retail & bulk buying</small></div></div>
  <div class="hero-overlay"></div>
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="kicker">VERITAS AUTOS</p>
      <h1>Find the part.<br><span>Keep moving.</span></h1>
      <p class="hero-sub">A focused marketplace for spare parts and automotive essentials. Search what you need, compare available sellers and buy with confidence.</p>
      <div class="search" id="search">
        <span>⌕</span><input id="q" placeholder="Search parts, brands or part numbers"><button onclick="searchNow()">Search</button>
      </div>
      <div class="hero-actions"><a class="red-btn" href="#shop">Shop Parts <span>↗</span></a><a class="outline-btn" href="#vehicle">Find Parts for My Vehicle <span>→</span></a></div>
      <div class="hero-proof"><span><b>Verified</b> sellers</span><span><b>Secure</b> Paystack checkout</span><span><b>Flexible</b> retail and bulk buying</span></div>
    </div>
  </div>
</section>

<section class="brands"><div class="brandstrip container"><span>TOYOTA</span><span>HONDA</span><span>LEXUS</span><span>HYUNDAI</span><span>KIA</span><span>BMW</span><span>MERCEDES BENZ</span><span>NISSAN</span><span>HOWO</span><span>MACK</span><span>DAF</span></div></section>

<section class="section" id="shop">
  <div class="container">
    <div class="section-head"><div><p class="kicker red">SHOP BY CATEGORY</p><h2>One hub for every part your vehicle needs.</h2></div><div class="category-intro-side"><strong>A first of its kind spare parts marketplace.</strong><p class="section-note">Browse car parts, oils and lubricants, tyres, rims and heavy duty truck parts, then compare listings from available sellers.</p></div></div>
    <div id="categorySections"></div>
  </div>
</section>

<section class="vehicle" id="vehicle">
  <div class="container">
    <div class="vehicle-finder">
      <div class="vehicle-finder-copy">
        <p class="kicker">VEHICLE MATCH</p>
        <h2>Find parts that fit your car.</h2>
        <p>Choose a vehicle type, make, model and year and we will narrow the catalogue to compatible parts.</p>
        <div class="vehicle-meta"><span>✓ Vehicle specific</span><span>✓ Retail and bulk listings</span></div>
      </div>
      <div class="vehicle-form">
        <div class="vehicle-form-head"><span>Select your vehicle</span><small>All fields are required</small></div>
        <div class="selectors">
          <label>Vehicle Type<select id="vehicleType"><option value="">Select vehicle type</option></select></label>
          <label>Make<select id="vehicleMake" disabled><option value="">Select vehicle type first</option></select></label>
          <label>Model<select id="vehicleModel" disabled><option value="">Select make first</option></select></label>
          <label>Year<select id="vehicleYear"><option value="">Select year</option></select></label>
        </div>
        <button class="red-btn full vehicle-submit" onclick="findCompatibleParts()">Find Compatible Parts <span>→</span></button>
      </div>
    </div>
  </div>
</section>

<section class="bulk" id="bulk">
  <div class="container bulk-grid">
    <div><p class="kicker red">BULK PURCHASE</p><h2>Buying for your store?</h2><p>Browse wholesale listings with the minimum order quantity, unit price and stock shown before you commit.</p><a class="dark-btn" href="#bulkProducts">Browse Wholesale <span>→</span></a></div>
    <div class="bulk-card" id="bulkProducts"><div class="bulk-top"><span>WHOLESALE</span><b>VERIFIED</b></div><div class="bulk-item"><img src="assets/products/engine-1.svg" alt="Oil filter"><div><small>ENGINE PARTS</small><h3>Premium Oil Filter</h3><p>XYZ Auto Distribution</p></div></div><div class="bulk-numbers"><div><small>Unit price</small><b>₦5,500</b></div><div><small>MOQ</small><b>20 units</b></div><div><small>Stock</small><b>500 units</b></div></div><button onclick="toast('Wholesale product details will open when vendor inventory is connected.')">View Listing <span>→</span></button></div>
  </div>
</section>

<section class="section vendors" id="vendors">
  <div class="container"><div class="section-head"><div><p class="kicker red">SELLER NETWORK</p><h2>Find the seller behind the product.</h2></div><a class="view-more" href="#vendorCta">Become a Vendor →</a></div>
    <div class="vendor-grid"><article><div class="avatar">AA</div><small>VERIFIED SELLER</small><h3>ABC Auto Parts</h3><p>Ibadan</p><div><span>1,240 products</span><b>★ 4.9</b></div><a href="#shop">Visit Store →</a></article><article><div class="avatar">XD</div><small>VERIFIED SELLER</small><h3>XYZ Auto Distribution</h3><p>Lagos</p><div><span>850 products</span><b>★ 4.8</b></div><a href="#bulk">View Wholesale →</a></article><article><div class="avatar redavatar">VA</div><small>OFFICIAL STORE</small><h3>Veritas Autos</h3><p>Nigeria</p><div><span>Marketplace store</span><b>★ 5.0</b></div><a href="#shop">Visit Store →</a></article></div>
  </div>
</section>

<section class="vendor-cta" id="vendorCta"><div class="container"><div><p class="kicker">SELL ON VERITAS AUTOS</p><h2>Put your inventory in front of buyers.</h2><p>Retailer or wholesaler, create a store, publish your listings and manage your orders from one place.</p></div><a class="white-btn" href="#home">Become a Vendor <span>↗</span></a></div></section>

<section class="section about" id="about"><div class="container about-grid"><div class="about-logo"><img src="assets/veritas-autos-logo-transparent.png" alt="Veritas Autos"></div><div><p class="kicker red">VERITAS AUTOS</p><h2>A marketplace built around the way people actually buy parts.</h2><p class="about-text">Search the part. Check compatibility. Compare sellers. Choose retail or bulk listings when available. Pay securely and keep your order history in one place.</p><div class="about-points"><div><b>01</b><strong>Clear listings</strong><p>See price, stock, seller and product information before buying.</p></div><div><b>02</b><strong>Multiple sellers</strong><p>Compare available listings for the part you are looking for.</p></div><div><b>03</b><strong>Secure checkout</strong><p>Complete payments through Paystack.</p></div></div></div></div></section>
</main>

<footer><div class="container footer-grid"><div><img src="assets/veritas-autos-logo-transparent.png" alt="Veritas Autos"><p>Genuine parts. Greater journeys.</p></div><div><h4>Marketplace</h4><a href="#shop">Shop Parts</a><a href="#vehicle">Find Parts</a><a href="#bulk">Bulk Purchase</a><a href="#vendors">Vendors</a></div><div><h4>Company</h4><a href="#about">About</a><a href="#home">Contact</a><a href="#home">Help Centre</a></div><div><h4>For Sellers</h4><a href="#vendorCta">Become a Vendor</a><a href="#vendorCta">Vendor Login</a></div></div><div class="container footer-bottom"><span>© 2026 Veritas Autos. All rights reserved.</span><span>Genuine parts. Greater journeys.</span></div></footer>
<div class="toast" id="toast"></div>

`;

createRoot(document.getElementById('root')).render(<App />);
