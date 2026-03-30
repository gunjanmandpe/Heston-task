import { useState, useEffect, useRef } from 'react'
import './App.css'

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbcd0a" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const HalfStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
        <stop offset="50%" stopColor="#fbcd0a" />
        <stop offset="50%" stopColor="#e5e7eb" />
      </linearGradient>
    </defs>
    <path fill="url(#half)" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const StarRating = () => (
  <div className="star-rating">
    <Star /><Star /><Star /><Star /><HalfStar />
  </div>
);

function App() {
  const [count, setCount] = useState(0)
  const carouselRef = useRef(null);
  const [caseStudyIndex, setCaseStudyIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTestiModal, setShowTestiModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggleModal = () => setShowModal(!showModal);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProducts = () => setProductsExpanded(!productsExpanded);

  const handleGitSubmit = (e) => {
    if (e) e.preventDefault();
    const inputVal = document.getElementById('captcha-input')?.value;
    if (inputVal === '12') {
      setCaptchaError(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      if (document.getElementById('captcha-input')) document.getElementById('captcha-input').value = '';
      setShowModal(false);
    } else {
      setCaptchaError(true);
    }
  };

  const faqs = [
    {
      q: "Why should I choose Oyelabs for my custom app development?",
      a: "Oyelabs offers certified engineering excellence, guaranteed on-time launches, and a full ownership model. We don't just build MVPs; we create revenue-ready products tailored to your business goals with robust architecture and ongoing support."
    },
    {
      q: "How long does it take to build a pre-built solution?",
      a: "Our pre-built solutions can be launched in as little as 7 to 14 days, depending on the complexity of your custom requirements. They are designed to give you a head start with industry-proven features while remaining fully customizable."
    },
    {
      q: "Do I get full ownership of the source code?",
      a: "Yes, once the project is completed and handed over, you get 100% ownership of the source code and IP rights. We provide comprehensive documentation to ensure your team can maintain or scale the app internally."
    },
    {
      q: "What kind of support do you provide after launch?",
      a: "We provide dedicated post-launch support including bug fixes, security updates, and performance monitoring. We also offer scaling services to add new features as your user base grows."
    },
    {
      q: "Is my project data and idea secure with OyeLabs?",
      a: "Absolutely. We follow ISO 27001 compliant security protocols and are happy to sign an NDA before discussing any project details. Your intellectual property and data security are our top priorities."
    }
  ];

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const caseStudies = [
    {
      category: 'SOCIAL MEDIA',
      title: 'Fall in Veteran',
      flag: '🇺🇸',
      country: 'United States',
      subtitle: 'From Idea to Veteran-Focused Social Media Platform in Just 7 Days',
      desc: 'Our Facebook Clone, Reimagined as a Safe, Supportive Space for Veterans to Connect and Thrive',
      accentColor: '#f97316',
      bgColor1: '#1a1a2e',
      bgColor2: '#e91e63',
    },
    {
      category: 'FOOD DELIVERY',
      title: 'MoonFoodz',
      flag: '🇳🇬',
      country: 'Nigeria',
      subtitle: 'From Idea to a Full-Scale Food Delivery App Launched in Under 14 Days',
      desc: 'A UberEats-inspired platform built for the Nigerian market with multi-restaurant ordering and real-time delivery tracking.',
      accentColor: '#ff9800',
      bgColor1: '#0f1923',
      bgColor2: '#ff5722',
    },
    {
      category: 'TAXI BOOKING',
      title: 'RideSwift',
      flag: '🇬🇧',
      country: 'United Kingdom',
      subtitle: 'Launching a Taxi Booking App Rivaling Uber in 10 Days',
      desc: 'A complete InDriver-style bidding taxi app built for UK commuters with live GPS, instant booking and secure payment gateway.',
      accentColor: '#2196f3',
      bgColor1: '#0d1b2a',
      bgColor2: '#1565c0',
    },
  ];

  const currentCase = caseStudies[caseStudyIndex];

  const prevCase = () => setCaseStudyIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  const nextCase = () => setCaseStudyIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));

  const scrollLeft = () => {
    if(carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if(carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // IntersectionObserver to animate items coming up from the bottom when they scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-up-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-up, .animate-left-item');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-scroll logic for the Why Oyelabs blue cards carousel
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 380, behavior: 'smooth' });
        }
      }
    }, 3500); // 3.5 seconds per slide loop

    return () => clearInterval(scrollInterval);
  }, []);

  // Auto-slide for Real Results section
  useEffect(() => {
    const caseInterval = setInterval(() => {
      nextCase();
    }, 5000); // Swap case every 5 seconds
    return () => clearInterval(caseInterval);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="navbar">
        <div className="logo">
          <img src="/logo.jpg" alt="Oyelabs Logo" className="logo-img" />
        </div>

        <nav className="nav-links">
          <div className="nav-item-has-mega">
            <a href="#">Products ▾</a>
            <div className="mega-menu">
              <div className="mega-menu-wrapper">
                <div className="mega-col">
                  <h4>RENTALS & LISTINGS</h4>
                  <div className="mega-list">
                    <a href="#"><img src="https://logowik.com/content/uploads/images/zillow4810.jpg" alt=""/> Zillow Clone <span className="m-tag orange">Real Estate</span></a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" alt=""/> Airbnb Clone</a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Fiverr_Logo_09.2020.svg" alt=""/> Fiverr Clone</a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/a/af/Upwork-logo.svg" alt=""/> Upwork Clone</a>
                  </div>
                  <h4 style={{marginTop:'30px'}}>NETWORK & OTT</h4>
                  <div className="mega-list">
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" alt=""/> Twitter Clone <span className="m-tag orange">Microblogging</span></a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt=""/> TikTok Clone</a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt=""/> Facebook Clone</a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/OnlyFans_logo.svg" alt=""/> OnlyFans Clone</a>
                  </div>
                </div>

                <div className="mega-col">
                  <h4>MARKETPLACE</h4>
                  <div className="mega-list">
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt=""/> Amazon Clone</a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/en/a/ab/Alibaba_Group_logo.svg" alt=""/> Alibaba Clone</a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Whatnot_Logo_2022.svg" alt=""/> Whatnot Clone</a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/TaskRabbit_Logo.svg" alt=""/> TaskRabbit Clone</a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Urban_Company_Logo.svg" alt=""/> UrbanClap Clone</a>
                  </div>
                  <h4 style={{marginTop:'30px'}}>SUPER & UBER</h4>
                  <div className="mega-list">
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/1/15/InDriver_Logo.svg" alt=""/> InDriver Clone <span className="m-tag orange">Bid Rides</span></a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Gojek_logo_2019.svg" alt=""/> Gojek Clone</a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt=""/> Uber Clone</a>
                  </div>
                </div>

                <div className="mega-col">
                  <h4>FOOD DELIVERY</h4>
                  <div className="mega-list">
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Uber_Eats_2018_logo.svg" alt=""/> UberEats Clone</a>
                  </div>
                  <h4 style={{marginTop:'30px'}}>CRYPTO & NFT</h4>
                  <div className="mega-list">
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Binance_Logo.svg" alt=""/> Binance Clone <span className="m-tag orange">Crypto Exchange</span></a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1c/OpenSea_Logo.png" alt=""/> OpenSea Clone</a>
                  </div>
                  <h4 style={{marginTop:'30px'}}>E-LEARNING</h4>
                  <div className="mega-list">
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Duolingo_Logo.svg" alt=""/> Duolingo Clone</a>
                    <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg" alt=""/> Udemy Clone</a>
                  </div>
                </div>

                <div className="mega-col">
                  <h4>INDUSTRY-SPECIFIC APP SCRIPTS</h4>
                  <div className="mega-list scripts-list">
                    <a href="#">Food Delivery ↗</a>
                    <a href="#">Taxi Booking ↗</a>
                    <a href="#">Creator Marketplace ↗</a>
                    <a href="#">On Demand Service Marketplace ↗</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#">Product Videos</a>
          <a href="#">Services ▾</a>
          <a href="#">Industries ▾</a>
          <a href="#">Portfolio</a>
          <a href="#">Company ▾</a>
          <a href="#">Blog</a>
        </nav>

        <div className="nav-right">
          <button className="cta-nav" onClick={toggleModal}>Discuss Your Idea</button>
          
          <div className="mobile-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <div className="toggle-close">✕</div>
            ) : (
              <>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
              </>
            )}
          </div>
          {/* Removed mobile-dots as per request */}
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <img src="/logo.jpg" alt="Logo" className="logo-img-small" />
          <button className="drawer-close" onClick={toggleMobileMenu}>✕</button>
        </div>
        <nav className="drawer-nav">
          <div className="drawer-item" onClick={toggleProducts}>
            <span>Products</span>
            <div className={`arrow-box ${productsExpanded ? 'expanded' : ''}`}>▾</div>
          </div>
          
          {productsExpanded && (
            <div className="drawer-submenu">
              <a href="#rental" className="submenu-item" onClick={toggleMobileMenu}>Rental Booking Clone</a>
              <a href="#taxi" className="submenu-item" onClick={toggleMobileMenu}>Taxi Booking Clone</a>
              <a href="#food" className="submenu-item" onClick={toggleMobileMenu}>Food Delivery Clone</a>
              <a href="#ecommerce" className="submenu-item" onClick={toggleMobileMenu}>E-commerce Marketplace</a>
              <a href="#creator" className="submenu-item" onClick={toggleMobileMenu}>Creator Marketplace</a>
              <a href="#realestate" className="submenu-item" onClick={toggleMobileMenu}>Real Estate Marketplace</a>
              <a href="#service" className="submenu-item" onClick={toggleMobileMenu}>Service Marketplace</a>
              <a href="#elearning" className="submenu-item" onClick={toggleMobileMenu}>E-learning App</a>
            </div>
          )}

          <div className="drawer-item">
            <span>Product Videos</span>
          </div>
          <div className="drawer-item">
            <span>Services</span>
            <div className="drawer-arrow-box">▾</div>
          </div>
          <div className="drawer-item">
            <span>Industries</span>
            <div className="drawer-arrow-box">▾</div>
          </div>
          <div className="drawer-item" onClick={() => setMobileMenuOpen(false)}>
            <span>Portfolio</span>
          </div>
          <div className="drawer-item">
            <span>Company</span>
            <div className="drawer-arrow-box">▾</div>
          </div>
          <div className="drawer-item" onClick={() => setMobileMenuOpen(false)}>
            <span>Blog</span>
          </div>
        </nav>
        <div className="drawer-footer-online">
          <div className="online-badge">
            <span className="dot-blink"></span>
            Online
        </div>
        </div>
      </div>

      <a href="https://wa.me/917696921829" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      </a>

      <div className="fixed-online-badge desktop-only">
        <span className="dot-blink"></span>
        Online
        <div className="badge-count">1</div>
      </div>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            <strong>Launch Revenue-Ready App in</strong>
          </h1>

          <div className="highlight">
            60 Days or Less
          </div>

          <h1>
            <strong>Or We Pay You to Wait</strong> <span className="tnc">(T&C Apply)</span>
          </h1>

          <p className="hero-desc">
            For founders and product leaders who can’t afford a lost year,
            Oyelabs delivers a revenue-ready product, whether a mobile or web app,
            in 60 days or less, guaranteed. If we miss the date, we work for free –
            no questions asked.
          </p>

          <button className="cta-main" onClick={toggleModal}>
            Schedule Your Free 30-Min Discovery Call
          </button>
        </div>

        <div className="ratings">
          <div className="rating-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Trustpilot_Logo.svg" alt="Trustpilot" className="rating-logo" />
            <div className="rating-score-container">
              <span className="score-text">4.5/5.0</span>
              <StarRating />
            </div>
          </div>

          <div className="rating-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Capterra_logo.svg" alt="Capterra" className="rating-logo" />
            <div className="rating-score-container">
              <span className="score-text">4.5/5.0</span>
              <StarRating />
            </div>
          </div>

          <div className="rating-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Gartner_logo.svg" alt="Gartner" className="rating-logo gartner-logo" />
            <div className="rating-score-container">
              <span className="score-text">4.5/5.0</span>
              <StarRating />
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="whatsapp-float">
        <svg viewBox="0 0 32 32" width="32" height="32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.378.618 4.675 1.794 6.712L2.5 29.5l6.95-1.825A13.435 13.435 13.435 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.75c-2.025 0-4.013-.525-5.763-1.525l-.413-.25-4.288 1.125 1.138-4.175-.275-.438A11.233 11.233 11.233 0 0 1 4.75 16c0-6.206 5.044-11.25 11.25-11.25S27.25 9.794 27.25 16 22.206 27.25 16 27.25zm6.188-8.45c-.338-.175-2.013-.988-2.325-1.1s-.538-.175-.763.175-.875 1.1-1.075 1.325-.4.25-.738.075-1.438-.525-2.738-1.688c-1.013-.9-1.688-2.013-1.888-2.35s-.025-.513.138-.688c.15-.15.338-.388.5-.588.163-.2.213-.338.325-.563.113-.225.056-.425-.031-.588s-.763-1.85-1.05-2.525c-.275-.663-.563-.575-.763-.588-.188-.013-.4-.013-.613-.013s-.563.075-.85.388-1.1 1.075-1.1 2.625 1.125 3.038 1.288 3.25 2.213 3.375 5.363 4.738c.75.325 1.338.513 1.8.663.75.238 1.438.2 1.975.125.6-.088 1.838-.75 2.1-1.475.263-.725.263-1.35.188-1.475-.075-.125-.288-.2-.625-.375z" />
        </svg>
      </div>

      {/* Online Fixed Widget */}
      <div className="online-tab">
        Online
        <div className="notification-badge">1</div>
      </div>

      <section className="cost-section">
        <div className="cost-wrapper">
          {/* LEFT */}
          <div className="cost-left">
            <h2>The Real Cost of Waiting</h2>

            <h3>
              Lost time means lost customers, revenue, and trust.
            </h3>

            <p>
              Every month you delay launching gives competitors more time to win over your
              customers, sometimes <b>with your very software idea</b>, executed faster and better. Your
              cash keeps burning without results, and the excitement around your idea begins to fade.
            </p>

            <p>
              Meanwhile, you deal with <b>three big red flags: 6–12 month timelines, pay twice</b> what you
              expected, and <b>make compromises</b> that weaken your vision.
            </p>

            <p>
              You lose first-mover advantage, top talent drifts away, and competitors control the
              narrative. At the same time, investors lose confidence, and your market opportunity slips
              through your fingers. The longer you wait, the harder it becomes to catch up, costing you
              users, revenue, and momentum when you need them most.
            </p>
          </div>

          {/* RIGHT */}
          <div className="cost-right">
            <div className="video-card">
              <iframe
                width="100%"
                height="320"
                src="https://www.youtube.com/embed/cZ3iyJ5YHk0?rel=0"
                title="The Real Cost of Waiting"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONY SECTION */}
      <section className="testimony-section">
        <div className="testimony-wrapper">
          <div className="testimony-header">
            <h2>Let’s Hear From Our Clients</h2>
            <p className="testimony-sub"><b>What Do</b> Clients Say <b>About Oyelabs?</b></p>
          </div>

          <div className="testimony-content">
            {/* LEFT */}
            <div className="testimony-left">
              <iframe
                width="100%"
                height="320"
                src="https://www.youtube.com/embed/npusle3c8E8?rel=0"
                title="PopTup Success Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              ></iframe>
            </div>

            {/* RIGHT */}
            <div className="testimony-right">
              <h3><span className="text-blue">PopTup</span> Success Story</h3>
              <blockquote className="testimony-quote">
                "It's been a fantastic experience, so I would definitely rate Oyelabs a solid ten out of ten. I've had such a great experience that I wholeheartedly recommend Oyelabs to everyone. I've even generated a few new ideas and I'm exploring the other services Oyelabs has to offer."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h2 className="stat-number">97%</h2>
            <p className="stat-caption">OF PROJECTS DELIVERED ON OR BEFORE THE DEADLINE</p>
          </div>
          <div className="stat-item">
            <h2 className="stat-number">390+</h2>
            <p className="stat-caption">WORLDCLASS SOLUTIONS DELIVERED ACROSS INDUSTRIES</p>
          </div>
          <div className="stat-item">
            <h2 className="stat-number">0</h2>
            <p className="stat-caption">MISSED LAUNCHES RECORDED IN THE PAST 36 MONTHS</p>
          </div>
        </div>
      </section>

      {/* OTHER TESTIMONIALS SECTION */}
      <section className="other-testimonials-section">
        <div className="other-testimonials-wrapper">
          <h2 className="other-testimonials-header">
            Other <span className="text-blue">Client Testimonials</span>
          </h2>

          <div className="testimonials-carousel-container">
            <div className="testimonials-carousel">
              {/* Card 1 */}
              <div className="testimonial-card">
                <div className="testimonial-video-wrapper">
                  <iframe 
                    width="100%" 
                    height="160" 
                    src="https://www.youtube.com/embed/BMialtVPnPk?rel=0" 
                    title="Rita Pedroza Testimony" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="testimonial-iframe"
                  ></iframe>
                </div>
                <div className="testimonial-info">
                  <h4>Rita Pedroza</h4>
                  <p className="text-blue">Excursionist | United States</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="testimonial-card">
                <div className="testimonial-video-wrapper">
                  <iframe 
                    width="100%" 
                    height="160" 
                    src="https://www.youtube.com/embed/CcAduaefAyQ?rel=0" 
                    title="Alejandro Trejo Testimony" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="testimonial-iframe"
                  ></iframe>
                </div>
                <div className="testimonial-info">
                  <h4>Alejandro Trejo</h4>
                  <p className="text-blue">Kwiki | Mexico</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="testimonial-card">
                <div className="testimonial-video-wrapper">
                  <iframe 
                    width="100%" 
                    height="160" 
                    src="https://www.youtube.com/embed/I-SoAXTLst8?rel=0" 
                    title="Brian McDaniel Testimony" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="testimonial-iframe"
                  ></iframe>
                </div>
                <div className="testimonial-info">
                  <h4>Brian McDaniel</h4>
                  <p className="text-blue">Fall-in | United States</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="testimonial-card">
                <div className="testimonial-video-wrapper">
                  <iframe 
                    width="100%" 
                    height="160" 
                    src="https://www.youtube.com/embed/-uLq_Y6Dd64?rel=0" 
                    title="Angelica Testimony" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="testimonial-iframe"
                  ></iframe>
                </div>
                <div className="testimonial-info">
                  <h4>Angelica</h4>
                  <p className="text-blue">Philregis | Philippines</p>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonials-action" style={{textAlign: 'center', marginTop: '40px'}}>
            <button className="btn-blue-solid" style={{padding: '16px 40px', fontSize: '18px'}}>See what other 50+ clients have to say</button>
          </div>
        </div>
      </section>

      {/* GRADIENT SECTION WRAPPER */}
      <div className="gradient-section-wrapper">
        
        {/* HELPING SECTION */}
        <section className="helping-section">
          <div className="helping-wrapper">
            <h2 className="helping-heading">
              Helping you do<br />
              <span className="text-blue">what you do best, better</span>
            </h2>
            
            <p className="helping-desc">
              Boosting growth by reimagining digital experiences. From award-winning apps to scalable
              products, we create <b>solutions that vibe with users and elevate your business goals effortlessly.</b>
            </p>

            <div className="stats-grid">
              <div className="stat-item">
                <h3>97%</h3>
                <p>OF PROJECTS DELIVERED ON<br/>OR BEFORE THE DEADLINE</p>
              </div>
              
              <div className="stat-item">
                <h3>390+</h3>
                <p>WORLDCLASS SOLUTIONS<br/>DELIVERED ACROSS<br/>INDUSTRIES</p>
              </div>
              
              <div className="stat-item">
                <h3>0</h3>
                <p>MISSED LAUNCHES RECORDED<br/>IN THE PAST 36 MONTHS</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED CLIENTS SECTION */}
        <section className="trusted-clients-section">
          <div className="trusted-clients-wrapper">
            <h2 className="trusted-clients-heading">
              Trusted <span className="text-blue">Clients</span>
            </h2>

            <div className="clients-grid">
              {[
                "ELSSA", "afundy", "Asira", "Aiotize", "CXO Forest", "STARBUCKS",
                "TATA", "!dea", "SUMER", "vodafone", "McDonald's", "Hindustan Times",
                "Bewakoof", "Disney+", "Spotify", "citibank", "Nestle", "Coca-Cola"
              ].map((client, index) => (
                <div 
                  key={index} 
                  className={`client-item animate-up ${client === '!dea' ? 'client-box' : ''} ${client === 'SUMER' ? 'client-outline' : ''}`}
                  style={{ transitionDelay: `${(index % 6) * 0.08}s` }}
                >
                  {/* Basic vector mock shapes for brand logos */}
                  {client === 'TATA' && <div className="mock-logo-circle">T</div>}
                  {client === 'vodafone' && <div className="mock-logo-circle dark">V</div>}
                  {client === 'Spotify' && <div className="mock-logo-circle green">S</div>}
                  {client === 'STARBUCKS' && <div className="mock-logo-circle outline">S</div>}
                  
                  <span>{client}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* WHY OYELABS SECTION */}
      <section className="why-oyelabs-section">
        <div className="why-oyelabs-wrapper">
          <div className="why-oyelabs-header animate-left-item">
            <h2><span className="text-blue">Why Oyelabs:</span> From Bold Vision to Market Success</h2>
            <p>
              At Oyelabs, we don’t stop at code or launch day. We help founders create brands that resonate,
              products that scale, and marketing strategies that convert. Whether you’re just starting out or
              gearing up to grow, we build with one goal in mind – long-term success.
            </p>
          </div>

          <div className="cards-slider-wrapper animate-left-item" style={{ transitionDelay: '0.2s' }}>
            <button className="slider-btn left-btn" onClick={scrollLeft} aria-label="Scroll left">
               <svg fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
            </button>

            <div className="cards-carousel" ref={carouselRef}>
              <div className="blue-card">
                <h4>Built to Launch. Designed to Scale.</h4>
                <p>Speed matters, but so does staying power. Our product development approach fuses rapid execution with future-ready architecture - so you're not rebuilding six months after launch, you're scaling with confidence.</p>
              </div>

              <div className="blue-card">
                <h4>Your Brand, Ready for the Next Stage</h4>
                <p>We help you define and refine the core of your brand - from positioning and story to how it looks, sounds, and feels across channels. As you grow, your brand grows with you - consistent, credible, and built for the long haul.</p>
              </div>

              <div className="blue-card">
                <h4>Marketing That Doesn’t Just Launch - It Lifts</h4>
                <p>From day-one launch messaging to growth-phase acquisition strategies, we help you craft marketing that adapts as you scale. Our frameworks evolve with your user base, keeping you relevant, visible, and compelling.</p>
              </div>
              
              <div className="blue-card">
                <h4>Beyond Consulting. We Partner With You.</h4>
                <p>Your success is our ultimate metric. We act as an extension of your own team ensuring technical excellence and strategic alignment. That's why clients stick around past launch day.</p>
              </div>
            </div>

            <button className="slider-btn right-btn" onClick={scrollRight} aria-label="Scroll right">
               <svg fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section className="achievements-section">
        <div className="achievements-wrapper">
          <h2>Our <span className="text-blue">Achievements</span></h2>
          
          <div className="badges-container">
            <div className="achievement-badge badge-1">Top App<br/>Dev</div>
            <div className="achievement-badge badge-2">ITFirms<br/>2023</div>
            <div className="achievement-badge badge-3">App Dev<br/>Cos</div>
            <div className="achievement-badge badge-4">Top<br/>Devs</div>
            <div className="achievement-badge badge-5">Top Software<br/>Developers</div>
            <div className="achievement-badge badge-6">Top Rated<br/>App Dev</div>
          </div>
        </div>
      </section>

      {/* PRE-BUILT SECTION */}
      <section className="prebuilt-section">
        <div className="prebuilt-wrapper">
          <h2 className="prebuilt-heading">Pre-Built Solutions Tailored for Key Industries</h2>
          <h3 className="prebuilt-sub">Launch Your App 10X Faster – Before the Market Moves On</h3>
          <p className="prebuilt-desc">
            Markets don’t wait, and neither do investors. Skip the endless coding, overblown budgets, and
            missed windows. With our customizable clone templates, you can launch quickly, validate early,
            and stay ahead of competitors.
          </p>

          <div className="solutions-grid">
            {/* CARD 1: Rental Booking */}
            <div className="solution-card" id="rental">
              <div className="solution-mockup-wrapper">
                <div className="laptop-mockup">
                  <div className="laptop-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80)', backgroundSize:'cover'}}></div>
                  <div className="laptop-base"></div>
                </div>
                <div className="mobile-mockup">
                  <div className="mock-mobile-header" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80)', backgroundSize:'cover', height:'100%'}}></div>
                </div>
              </div>
              <div className="solution-ratings">
                <div className="solution-rating-item"><span className="sr-name">★ Trustpilot</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name">▲ Capterra</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name" style={{fontWeight:'900'}}>Gartner.</span><div className="stars">★★★★★</div></div>
              </div>
              <a href="#" className="solution-title">Rental Booking ↗</a>
              <p className="solution-desc">Launch platforms like Airbnb or Turo with secure reservations, payments, and property management.</p>
              <ul className="solution-features">
                <li><span className="check-icon">✔</span> Airbnb Clone</li>
                <li><span className="check-icon">✔</span> Turo Clone</li>
              </ul>
            </div>

            {/* CARD 2: Taxi Booking */}
            <div className="solution-card">
              <div className="solution-mockup-wrapper">
                <div className="laptop-mockup">
                  <div className="laptop-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=400&q=80)', backgroundSize:'cover'}}></div>
                  <div className="laptop-base"></div>
                </div>
                <div className="mobile-mockup">
                  <div className="mock-mobile-header" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=400&q=80)', backgroundSize:'cover', height:'100%'}}></div>
                </div>
              </div>
              <div className="solution-ratings">
                <div className="solution-rating-item"><span className="sr-name">★ Trustpilot</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name">▲ Capterra</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name" style={{fontWeight:'900'}}>Gartner.</span><div className="stars">★★★★★</div></div>
              </div>
              <a href="#" className="solution-title">Taxi Booking ↗</a>
              <p className="solution-desc">Readymade taxi booking app solution like Uber with driver management and trip tracking.</p>
              <ul className="solution-features">
                <li><span className="check-icon">✔</span> Uber Clone</li>
                <li><span className="check-icon">✔</span> Indriver Clone</li>
              </ul>
            </div>

            {/* CARD 3: Food Delivery */}
            <div className="solution-card">
              <div className="solution-mockup-wrapper">
                <div className="laptop-mockup">
                  <div className="laptop-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1526367790999-015078648bd7?w=400&q=80)', backgroundSize:'cover'}}></div>
                  <div className="laptop-base"></div>
                </div>
                <div className="mobile-mockup">
                  <div className="mock-mobile-header" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1526367790999-015078648bd7?w=400&q=80)', backgroundSize:'cover', height:'100%'}}></div>
                </div>
              </div>
              <div className="solution-ratings">
                <div className="solution-rating-item"><span className="sr-name">★ Trustpilot</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name">▲ Capterra</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name" style={{fontWeight:'900'}}>Gartner.</span><div className="stars">★★★★★</div></div>
              </div>
              <a href="#" className="solution-title">Food Delivery ↗</a>
              <p className="solution-desc">Inspired by UberEats, includes restaurant dashboards and delivery partner tools.</p>
              <ul className="solution-features">
                <li><span className="check-icon">✔</span> UberEats Clone</li>
                <li><span className="check-icon">✔</span> Doordash Clone</li>
              </ul>
            </div>

            {/* CARD 4: E-commerce Marketplace */}
            <div className="solution-card">
              <div className="solution-mockup-wrapper">
                <div className="laptop-mockup">
                  <div className="laptop-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&q=80)', backgroundSize:'cover'}}></div>
                  <div className="laptop-base"></div>
                </div>
                <div className="mobile-mockup">
                  <div className="mock-mobile-header" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&q=80)', backgroundSize:'cover', height:'100%'}}></div>
                </div>
              </div>
              <div className="solution-ratings">
                <div className="solution-rating-item"><span className="sr-name">★ Trustpilot</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name">▲ Capterra</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name" style={{fontWeight:'900'}}>Gartner.</span><div className="stars">★★★★★</div></div>
              </div>
              <a href="#" className="solution-title">E-commerce Marketplace ↗</a>
              <p className="solution-desc">Launch like Amazon with product listings, cart systems, and vendor management.</p>
              <ul className="solution-features">
                <li><span className="check-icon">✔</span> Amazon Clone</li>
                <li><span className="check-icon">✔</span> Alibaba Clone</li>
              </ul>
            </div>

            {/* CARD 5: Creator Marketplace */}
            <div className="solution-card">
              <div className="solution-mockup-wrapper">
                <div className="laptop-mockup">
                  <div className="laptop-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80)', backgroundSize:'cover'}}></div>
                  <div className="laptop-base"></div>
                </div>
                <div className="mobile-mockup">
                  <div className="mock-mobile-header" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80)', backgroundSize:'cover', height:'100%'}}></div>
                </div>
              </div>
              
              <div className="solution-ratings">
                <div className="solution-rating-item">
                  <span className="sr-name">★ Trustpilot</span>
                  <div className="stars">★★★★★</div>
                </div>
                <div className="solution-rating-item">
                  <span className="sr-name">▲ Capterra</span>
                  <div className="stars">★★★★★</div>
                </div>
                <div className="solution-rating-item">
                  <span className="sr-name" style={{fontWeight:'900'}}>Gartner.</span>
                  <div className="stars">★★★★★</div>
                </div>
              </div>
              
              <a href="#" className="solution-title">Creator Marketplace ↗</a>
              <p className="solution-desc">We deliver pre-built subscription platforms like OnlyFans or short-video sharing apps like TikTok with fan engagement tools and monetization features.</p>
              <ul className="solution-features">
                <li><span className="check-icon">✔</span> OnlyFans Clone</li>
                <li><span className="check-icon">✔</span> TikTok Clone</li>
              </ul>
            </div>

            {/* CARD 6: Real Estate Marketplace */}
            <div className="solution-card">
              <div className="solution-mockup-wrapper">
                <div className="laptop-mockup">
                  <div className="laptop-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80)', backgroundSize:'cover'}}></div>
                  <div className="laptop-base"></div>
                </div>
                <div className="mobile-mockup">
                   <div className="mock-mobile-header" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80)', backgroundSize:'cover', height:'100%'}}></div>
                </div>
              </div>
              <div className="solution-ratings">
                <div className="solution-rating-item"><span className="sr-name">★ Trustpilot</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name">▲ Capterra</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name" style={{fontWeight:'900'}}>Gartner.</span><div className="stars">★★★★★</div></div>
              </div>
              <a href="#" className="solution-title">Real Estate Marketplace ↗</a>
              <p className="solution-desc">Our real estate marketplace script creates Zillow or Bayut-like platforms with verified listings and property management tools.</p>
              <ul className="solution-features">
                <li><span className="check-icon">✔</span> Zillow Clone</li>
                <li><span className="check-icon">✔</span> Bayut Clone</li>
              </ul>
            </div>

            {/* CARD 7: Service Marketplace */}
            <div className="solution-card">
              <div className="solution-mockup-wrapper">
                <div className="laptop-mockup">
                  <div className="laptop-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6954?w=400&q=80)', backgroundSize:'cover'}}></div>
                  <div className="laptop-base"></div>
                </div>
                <div className="mobile-mockup">
                   <div className="mock-mobile-header" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6954?w=400&q=80)', backgroundSize:'cover', height:'100%'}}></div>
                </div>
              </div>
              <div className="solution-ratings">
                <div className="solution-rating-item"><span className="sr-name">★ Trustpilot</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name">▲ Capterra</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name" style={{fontWeight:'900'}}>Gartner.</span><div className="stars">★★★★★</div></div>
              </div>
              <a href="#" className="solution-title">Service Marketplace ↗</a>
              <p className="solution-desc">Start on-demand service marketplace apps like TaskRabbit or Handy with provider onboarding and scheduling systems.</p>
              <ul className="solution-features">
                <li><span className="check-icon">✔</span> Taskrabbit Clone</li>
                <li><span className="check-icon">✔</span> UrbanClap Clone</li>
              </ul>
            </div>

            {/* CARD 8: E-Learning App */}
            <div className="solution-card">
              <div className="solution-mockup-wrapper">
                <div className="laptop-mockup">
                  <div className="laptop-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80)', backgroundSize:'cover'}}></div>
                  <div className="laptop-base"></div>
                </div>
                <div className="mobile-mockup">
                   <div className="mock-mobile-header" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80)', backgroundSize:'cover', height:'100%'}}></div>
                </div>
              </div>
              <div className="solution-ratings">
                <div className="solution-rating-item"><span className="sr-name">★ Trustpilot</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name">▲ Capterra</span><div className="stars">★★★★★</div></div>
                <div className="solution-rating-item"><span className="sr-name" style={{fontWeight:'900'}}>Gartner.</span><div className="stars">★★★★★</div></div>
              </div>
              <a href="#" className="solution-title">E-Learning App ↗</a>
              <p className="solution-desc">Create interactive e-learning platforms like Duolingo or Udemy with course creation tools and progress tracking.</p>
              <ul className="solution-features">
                <li><span className="check-icon">✔</span> Duolingo Clone</li>
                <li><span className="check-icon">✔</span> Udemy Clone</li>
              </ul>
            </div>

          </div>

          <div className="explore-btn-wrapper">
            <a href="#" className="btn-blue-solid explore-btn">Explore All Solutions</a>
          </div>
        </div>
      </section>

      {/* DEMO VIDEOS SECTION */}
      <section className="demo-videos-section">
        <div className="demo-videos-wrapper">
          <h2 className="demo-videos-heading">
            <span className="text-blue">Our Product</span> Demo Videos
          </h2>

          <div className="demo-videos-grid">
            {/* Card 1 - Indriver */}
            <div className="demo-video-card">
              <div className="demo-card-visual" style={{background: 'linear-gradient(135deg, #00c853 0%, #1de9b6 100%)'}}>
                <div className="demo-phone-mockup">
                  <div className="demo-phone-inner">
                    <div style={{background:'#fff', height:'12px', width:'70%', margin:'0 auto', borderRadius:'4px'}}></div>
                    <div style={{background:'rgba(255,255,255,0.3)', height:'60px', margin:'8px 0', borderRadius:'6px'}}></div>
                    <div style={{background:'rgba(255,255,255,0.2)', height:'20px', width:'80%', borderRadius:'4px'}}></div>
                    <div style={{background:'rgba(255,255,255,0.2)', height:'20px', width:'60%', marginTop:'6px', borderRadius:'4px'}}></div>
                  </div>
                </div>
                <div className="demo-card-text">
                  <h3>ONLINE TAXI<br/>BOOKING APP</h3>
                  <span>DEMO</span>
                </div>
              </div>
              <p className="demo-card-label">Indriver Clone Demo</p>
            </div>

            {/* Card 2 - OnlyFans */}
            <div className="demo-video-card">
              <div className="demo-card-visual" style={{background: 'linear-gradient(135deg, #e91e63 0%, #ff80ab 100%)'}}>
                <div className="demo-phone-mockup">
                  <div className="demo-phone-inner">
                    <div style={{background:'#fff', height:'40px', borderRadius:'50%', width:'40px', margin:'0 auto'}}></div>
                    <div style={{background:'rgba(255,255,255,0.3)', height:'25px', margin:'8px auto', width:'80%', borderRadius:'4px'}}></div>
                    <div style={{background:'rgba(255,255,255,0.2)', height:'15px', width:'60%', margin:'0 auto', borderRadius:'4px'}}></div>
                    <div style={{background:'#e91e63', height:'20px', width:'50%', margin:'8px auto', borderRadius:'20px'}}></div>
                  </div>
                </div>
                <div className="demo-card-text">
                  <h3>CONTENT<br/>CREATOR<br/>MARKETPLACE</h3>
                  <span>DEMO</span>
                </div>
              </div>
              <p className="demo-card-label">Onlyfans Clone Demo</p>
            </div>

            {/* Card 3 - Zillow */}
            <div className="demo-video-card">
              <div className="demo-card-visual" style={{background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)'}}>
                <div className="demo-phone-mockup">
                  <div className="demo-phone-inner">
                    <div style={{background:'#fff', height:'50px', borderRadius:'6px', width:'100%'}}></div>
                    <div style={{background:'rgba(255,255,255,0.3)', height:'20px', marginTop:'8px', borderRadius:'4px'}}></div>
                    <div style={{background:'rgba(255,255,255,0.2)', height:'15px', width:'70%', marginTop:'6px', borderRadius:'4px'}}></div>
                    <div style={{background:'rgba(255,255,255,0.2)', height:'15px', width:'50%', marginTop:'6px', borderRadius:'4px'}}></div>
                  </div>
                </div>
                <div className="demo-card-text">
                  <h3>REAL ESTATE<br/>MARKETPLACE</h3>
                  <span>DEMO</span>
                </div>
              </div>
              <p className="demo-card-label">Zillow Clone Demo</p>
            </div>
          </div>

          <div className="explore-btn-wrapper">
            <a href="#" className="btn-blue-solid explore-btn">See More Video</a>
          </div>
        </div>
      </section>

      {/* REAL RESULTS SECTION */}
      <section className="real-results-section" style={{background: `linear-gradient(145deg, ${currentCase.bgColor1} 0%, #111 100%)`}}>
        <div className="real-results-wrapper">
          <div className="real-results-header">
            <div>
              <h2 className="real-results-heading">Real Results from Businesses Like Yours</h2>
              <p className="real-results-sub"><b>Proud projects that make us stand out</b></p>
              <a href="#" className="real-results-link">View all Case Study ↗</a>
            </div>
          </div>

          <div className="real-results-content">
            {/* LEFT */}
            <div className="real-results-left">
              <button className="case-nav-btn" onClick={prevCase} aria-label="Previous">
                ‹
              </button>
              
              <div className="case-study-info">
                <p className="case-category">{currentCase.category}</p>
                <h3 className="case-title">
                  {currentCase.title} - <span>{currentCase.flag}</span> {currentCase.country}
                </h3>
                <p className="case-subtitle" style={{color: currentCase.accentColor}}>
                  {currentCase.subtitle}
                </p>
                <p className="case-desc">{currentCase.desc}</p>
                <a href="#" className="case-study-btn" style={{background: currentCase.accentColor}}>View Case Study</a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="real-results-right">
              <div className="case-laptop-mockup">
                <div className="case-laptop-screen" style={{background: currentCase.bgColor1}}>
                  <div className="case-mock-sidebar" style={{background: '#1a1a2e'}}></div>
                  <div className="case-mock-content">
                    <div style={{background: currentCase.bgColor2, height:'80px', borderRadius:'4px', marginBottom:'8px'}}></div>
                    <div style={{background:'rgba(255,255,255,0.1)', height:'15px', borderRadius:'4px', marginBottom:'6px'}}></div>
                    <div style={{background:'rgba(255,255,255,0.07)', height:'15px', width:'70%', borderRadius:'4px'}}></div>
                  </div>
                </div>
                <div className="case-laptop-base"></div>
              </div>

              <div className="case-phone-mockup">
                <div className="case-phone-inner">
                  <div style={{background: currentCase.bgColor2, height:'30px', borderRadius:'4px', marginBottom:'8px'}}></div>
                  <div style={{background:'rgba(255,255,255,0.15)', height:'40px', borderRadius:'4px', marginBottom:'6px'}}></div>
                  <div style={{background:'rgba(255,255,255,0.1)', height:'12px', width:'80%', borderRadius:'4px', marginBottom:'5px'}}></div>
                  <div style={{background:'rgba(255,255,255,0.07)', height:'12px', width:'60%', borderRadius:'4px'}}></div>
                </div>
              </div>
            </div>

            <button className="case-nav-btn right" onClick={nextCase} aria-label="Next">
              ›
            </button>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET SECTION */}
      <section className="what-you-get-section">
        <div className="what-you-get-wrapper">
          {/* LEFT */}
          <div className="wyg-left">
            <h2 className="wyg-heading">What You Get with<br/>Oyelabs?</h2>
            <h3 className="wyg-sub">Deliverables Designed to Deliver Results</h3>
            <p className="wyg-desc">
              We deliver more than code – we deliver confidence and a product designed to fuel your growth.
              Every feature, every decision, and every handoff is focused on giving you a revenue-ready,
              investor-worthy product you can own and grow without limits.
            </p>
            <ul className="wyg-list">
              <li><span className="wyg-check">✔</span> <span>Ready-to-launch iOS, Android &amp; web apps - <b>fully yours</b></span></li>
              <li><span className="wyg-check">✔</span> <span>Revenue-ready products, not just MVPs</span></li>
              <li><span className="wyg-check">✔</span> <span>Lifetime documentation &amp; <b>full ownership</b></span></li>
              <li><span className="wyg-check">✔</span> <span>Robust architecture and clean handoff</span></li>
              <li><span className="wyg-check">✔</span> <span>Strategic prioritization of ROI-driving features</span></li>
              <li><span className="wyg-check">✔</span> <span>Dedicated launch &amp; <b>post-launch support</b></span></li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="wyg-right">
            <div className="wyg-card">
              {/* Real background from Unsplash - rocket/technology */}
              <div className="csr-card csr-img-large" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80)'}}>
                  <div className="csr-overlay">
                    <span className="csr-tag">Community</span>
                    <h3>Empowering Future Tech Leaders</h3>
                  </div>
                </div>
                <div className="csr-card" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80)'}}>
                  <div className="csr-overlay">
                    <span className="csr-tag">Charity</span>
                    <h3>Digital Literacy for All</h3>
                  </div>
                </div>
                <div className="csr-card" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&q=80)'}}>
                  <div className="csr-overlay">
                    <span className="csr-tag">Team</span>
                    <h3>Innovation Through Diversity</h3>
                  </div>
                </div>
              <img 
                src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600&q=80" 
                alt="Successful Delivery" 
                className="wyg-bg-img"
              />
              <div className="wyg-card-overlay">
                <h3 className="wyg-card-title">SUCCESSFUL<br/>DELIVERY</h3>
                <ul className="wyg-card-list">
                  <li>
                    <span className="wyg-icon">🚀</span>
                    Launch-Ready Apps
                  </li>
                  <li>
                    <span className="wyg-icon">💰</span>
                    Revenue-Ready Products
                  </li>
                  <li>
                    <span className="wyg-icon">📄</span>
                    Complete Ownership
                  </li>
                  <li>
                    <span className="wyg-icon">💻</span>
                    Robust Architecture
                  </li>
                  <li>
                    <span className="wyg-icon">🎯</span>
                    ROI-Focused Features
                  </li>
                  <li>
                    <span className="wyg-icon">⚙️</span>
                    Ongoing Support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT ELSE OYELABS CAN OFFER */}
      <section className="offer-section">
        <div className="offer-wrapper">
          <h2 className="offer-heading">
            What Else Oyelabs Can <span className="text-blue">Offer</span>
          </h2>
          <p className="offer-sub">
            Whatever you’re building – we’ve done it before, and we’ll help you launch it faster.
          </p>

          <div className="offer-cards">
            {/* Card 1: Custom Apps */}
            <div className="offer-card">
              <div className="offer-icon-wrapper">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="8" width="30" height="24" rx="4" stroke="#1a4fdb" strokeWidth="2" fill="none"/>
                  <path d="M14 24 L20 18 L26 24" stroke="#1a4fdb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 24 L22 26" stroke="#1a4fdb" strokeWidth="2"/>
                  <circle cx="44" cy="44" r="14" stroke="#1a4fdb" strokeWidth="2" fill="none"/>
                  <path d="M40 44 L42 46 L48 40" stroke="#1a4fdb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M30 38 L36 44" stroke="#1a4fdb" strokeWidth="1.5" strokeDasharray="2 2"/>
                </svg>
              </div>
              <h3 className="offer-card-title">Custom Apps Without the Custom Headaches – Guaranteed</h3>
              <p className="offer-card-desc">
                We deliver the app you imagined – built around your goals, a scalable roadmap for tomorrow,
                and guaranteed on time. If we’re late, you don’t pay a penny more.
              </p>
              <a href="#" className="offer-card-link">Let’s Talk About Your App →</a>
            </div>

            {/* Card 2: AI Solutions */}
            <div className="offer-card">
              <div className="offer-icon-wrapper">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="14" width="44" height="30" rx="4" stroke="#1a4fdb" strokeWidth="2" fill="none"/>
                  <line x1="22" y1="44" x2="22" y2="52" stroke="#1a4fdb" strokeWidth="2"/>
                  <line x1="42" y1="44" x2="42" y2="52" stroke="#1a4fdb" strokeWidth="2"/>
                  <line x1="16" y1="52" x2="48" y2="52" stroke="#1a4fdb" strokeWidth="2" strokeLinecap="round"/>
                  <text x="26" y="35" fontSize="14" fontWeight="bold" fill="#1a4fdb">AI</text>
                  <circle cx="20" cy="22" r="3" stroke="#1a4fdb" strokeWidth="1.5" fill="none"/>
                  <circle cx="44" cy="22" r="3" stroke="#1a4fdb" strokeWidth="1.5" fill="none"/>
                  <path d="M23 22 L41 22" stroke="#1a4fdb" strokeWidth="1.5" strokeDasharray="3 2"/>
                </svg>
              </div>
              <h3 className="offer-card-title">Future-Proof Your Business With Intelligent AI Solutions</h3>
              <p className="offer-card-desc">
                We design AI applications that help you meet today’s challenges and tomorrow’s opportunities
                – smarter automation, better insights, and personalized user journeys, all built to scale with you.
              </p>
              <a href="#" className="offer-card-link">Start Building AI Today →</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4-STEP PROCESS SECTION */}
      <section className="process-section">
        <div className="process-wrapper">
          <div className="process-grid">

            {/* Step 1 */}
            <div className="process-card">
              <div className="process-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="28" width="12" height="18" rx="2" stroke="#1a4fdb" strokeWidth="1.8" fill="none"/>
                  <rect x="22" y="20" width="12" height="26" rx="2" stroke="#1a4fdb" strokeWidth="1.8" fill="none"/>
                  <rect x="36" y="12" width="12" height="34" rx="2" stroke="#1a4fdb" strokeWidth="1.8" fill="none"/>
                  <path d="M12 22 C12 18 18 12 24 16" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  <circle cx="28" cy="10" r="4" stroke="#1a4fdb" strokeWidth="1.8" fill="none"/>
                  <path d="M26 8 L28 10 L32 7" stroke="#1a4fdb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="process-card-title">Bring It to Life</h3>
              <p className="process-card-desc">
                Our certified engineers develop your app using secure, scalable code – ensuring reliability,
                high performance, and full ownership of your product.
              </p>
            </div>

            {/* Step 2 */}
            <div className="process-card">
              <div className="process-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="22" r="10" stroke="#1a4fdb" strokeWidth="1.8" fill="none"/>
                  <circle cx="28" cy="22" r="4" stroke="#1a4fdb" strokeWidth="1.5" fill="none"/>
                  <path d="M28 8 L28 12" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M28 32 L28 36" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M18 22 L14 22" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M42 22 L38 22" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M22 36 C18 40 14 44 20 46 C26 48 32 44 36 40" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <h3 className="process-card-title">Perfect the Experience</h3>
              <p className="process-card-desc">
                We conduct rigorous quality assurance and real-world testing, incorporating your feedback
                to deliver a polished, user-ready app you can trust.
              </p>
            </div>

            {/* Step 3 */}
            <div className="process-card">
              <div className="process-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <rect x="8" y="12" width="40" height="26" rx="4" stroke="#1a4fdb" strokeWidth="1.8" fill="none"/>
                  <line x1="18" y1="38" x2="18" y2="46" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="38" y1="38" x2="38" y2="46" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="12" y1="46" x2="44" y2="46" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="28" cy="22" r="2" fill="#1a4fdb"/>
                  <path d="M22 22 L26 22" stroke="#1a4fdb" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M30 22 L34 22" stroke="#1a4fdb" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="24" y="17" width="8" height="5" rx="1" stroke="#1a4fdb" strokeWidth="1.2" fill="none"/>
                  <path d="M28 17 L28 14" stroke="#1a4fdb" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="28" cy="13" r="2" fill="#1a4fdb"/>
                </svg>
              </div>
              <h3 className="process-card-title">Make It Live</h3>
              <p className="process-card-desc">
                Our launch specialists handle deployment smoothly on all platforms, ensuring your app goes
                live without glitches or unnecessary delays.
              </p>
            </div>

            {/* Step 4 */}
            <div className="process-card">
              <div className="process-icon">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <path d="M14 42 C14 36 20 30 28 28 C36 26 44 30 44 36" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  <circle cx="28" cy="20" r="8" stroke="#1a4fdb" strokeWidth="1.8" fill="none"/>
                  <path d="M24 20 L27 23 L33 17" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M34 36 L38 32 L44 38" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M38 32 L38 44" stroke="#1a4fdb" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="process-card-title">Support Your Growth</h3>
              <p className="process-card-desc">
                Post-launch, we monitor, maintain, and optimize your app – proactively resolving issues
                and scaling features as your business grows confidently.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* LAUNCH GUARANTEE SECTION */}
      <section className="launch-guarantee-section">
        <div className="launch-guarantee-wrapper">
          <h2 className="launch-guarantee-heading">Launch On Time – Or Free Extended Work</h2>
          <p className="launch-guarantee-desc">
            Missed deadlines cost more than money – they cost momentum, trust, and opportunity. That's why we stand behind
            our product development timelines with a simple promise: if we miss your launch date, you pay nothing more, and
            we keep working for free until your app goes live. No excuses.
          </p>

          <h3 className="launch-guarantee-sub">Why clients trust us to keep this promise:</h3>

          <ul className="launch-guarantee-list">
            <li><span className="wyg-check">✔</span> Certified Agile Processes ensuring flexible, transparent progress tracking</li>
            <li><span className="wyg-check">✔</span> Zero missed deadlines in 95% of projects over the past 3 years</li>
            <li><span className="wyg-check">✔</span> Extended support from idea to launch – and beyond, so nothing falls through the cracks</li>
            <li><span className="wyg-check">✔</span> Proven scalability roadmap with products handling over 100,000 concurrent users in live environments</li>
            <li><span className="wyg-check">✔</span> ISO 27001 compliant security protocols to keep your data safe from day one</li>
            <li><span className="wyg-check">✔</span> Detailed project documentation provided for full transparency and smooth handovers</li>
          </ul>

          <button className="btn-blue-solid launch-cta-btn" onClick={toggleModal}>Book a Free 30-Min Discovery Call</button>
        </div>
      </section>

      {/* CSR SECTION */}
      <section className="csr-section">
        <div className="csr-wrapper">
          <div className="csr-header">
            <h2 className="csr-heading">Turning Profits Into Purpose</h2>
            <p className="csr-desc">
              People matter more than profits. That’s why we invest 1% of our profits into CSR – supporting lives, 
              fostering growth, and spreading opportunity where it’s needed most.
            </p>
          </div>

          <div className="csr-grid">
            <div className="csr-left-col">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80" 
                alt="Giving back" 
                className="csr-img"
              />
              <img 
                src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&q=80" 
                alt="Supporting communities" 
                className="csr-img"
              />
            </div>
            <div className="csr-right-col">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80" 
                alt="Children education" 
                className="csr-img-large"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section className="industries-section">
        <div className="industries-wrapper">
          <div className="industries-left">
            <h2 className="industries-heading">
              <span className="text-blue">Industries</span><br/>We Cater
            </h2>
            <h3 className="industries-sub">Startups, Mid-Sized Businesses and Enterprises</h3>
            <p className="industries-desc">
              We provide worldclass software solutions across industries to fuel innovation at every scale.
            </p>
            <a href="#" className="btn-blue-solid industries-btn">Talk to Our Experts</a>
          </div>

          <div className="industries-right">
            <div className="industries-grid">
              {[
                { name: 'Healthcare', icon: '🏥' },
                { name: 'Finance', icon: '💰' },
                { name: 'Restaurant', icon: '🍽️' },
                { name: 'eCommerce', icon: '🛒' },
                { name: 'SaaS', icon: '☁️' },
                { name: 'Travel', icon: '✈️' },
                { name: 'Entertainment', icon: '🎬' },
                { name: 'On-Demand', icon: '📦' },
                { name: 'Social Media', icon: '💬' },
                { name: 'Logistics', icon: '🚚' },
                { name: 'Education', icon: '🎓' },
                { name: 'Real Estate', icon: '🏠' }
              ].map((item, idx) => (
                <div className="industry-card" key={idx}>
                  <div className="industry-icon">{item.icon}</div>
                  <span className="industry-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOGS & NEWS SECTION */}
      <section className="blogs-section">
        <div className="blogs-wrapper">
          <div className="blogs-left-header">
            <p className="blogs-top-tag">BLOGS &amp; NEWS</p>
            <h2 className="blogs-main-heading">
              Interesting articles <span className="text-blue">updated daily</span>
            </h2>
          </div>

          <div className="blogs-content">
            {/* Sidebar list */}
            <div className="blogs-list-col">
              <ul className="trending-blogs-list">
                <li><span>➡</span> Bigo Live vs. Twitch A Comparison of Live Streaming Leaders</li>
                <li><span>➡</span> Designing Property Platforms for a Rent-First Gen-Z World</li>
                <li><span>➡</span> Fiverr’s Price War Left Room for Premium Platforms</li>
                <li><span>➡</span> Launch Your Cleaning Service App in 7 days with MoonService</li>
                <li><span>➡</span> Must Have Passenger Safety Features in a Ride Hailing App</li>
              </ul>
            </div>

            {/* Post 1 */}
            <div className="blog-post-card">
              <div className="blog-img-wrapper">
                <img src="https://images.unsplash.com/photo-1576091160550-217359f42f8c?w=600&q=80" alt="Blog 1" />
              </div>
              <div className="blog-info">
                <p className="blog-date">📅 Last Updated on March 25, 2026</p>
                <h3 className="blog-title">Olive AI’s Rise, and Fall in Healthcare: What Went Wrong?</h3>
                <p className="blog-excerpt">
                  Olive AI was once the poster child of healthcare tech innovation—fast-growing, VC-backed, and full of bold...
                </p>
                <a href="#" className="blog-read-more">Read more ⟶</a>
              </div>
            </div>

            {/* Post 2 */}
            <div className="blog-post-card">
              <div className="blog-img-wrapper">
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" alt="Blog 2" />
              </div>
              <div className="blog-info">
                <p className="blog-date">📅 Last Updated on March 25, 2026</p>
                <h3 className="blog-title">Things To Consider Before Launching Your First App</h3>
                <p className="blog-excerpt">
                  Once you’ve fully developed your mobile app, you can launch your first app in the app store correctly by...
                </p>
                <a href="#" className="blog-read-more">Read more ⟶</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GET IN TOUCH SECTION */}
      <section className="git-section">
        <div className="git-wrapper">
          <div className="git-left">
            <h2 className="git-heading">Get In Touch</h2>
            <p className="git-desc">Our goal is <b>for you to succeed</b> and that is the only way we can grow</p>
          </div>
          <div className="git-right">
            <div className="git-contact-box">
              <div className="git-phone-row">
                <span className="git-phone-icon">📞</span>
                <div className="git-phone-text">
                  <p className="git-reach-tag">REACH OUT NOW!</p>
                  <p className="git-number">+91-7696921829</p>
                </div>
              </div>
              <button className="btn-blue-solid git-btn" onClick={toggleModal}>Let's discuss your idea</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="faq-wrapper">
          <h2 className="faq-heading">FAQs</h2>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question">
                  <span>Que. {faq.q}</span>
                  <span className="faq-toggle-icon">{activeFaq === idx ? '−' : '+'}</span>
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      {/* QUOTE MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="quote-modal">
            <button className="modal-close" onClick={toggleModal}>×</button>
            <h2 className="modal-heading">Drive Your Business Forward Faster</h2>
            <p className="modal-sub">With Customized On-Demand Solutions</p>
            
            <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="text" placeholder="Your Name" />
              </div>
              
              <div className="form-row">
                <div className="phone-prefix">
                  <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="US" className="us-flag" />
                  <span>+1</span>
                  <span className="arrow">▾</span>
                </div>
                <input type="text" placeholder="Phone" className="phone-input" />
              </div>

              <div className="form-group">
                <input type="email" placeholder="Your Email" />
              </div>

              <div className="form-group">
                <select defaultValue="">
                  <option value="" disabled>Your Approx Budget</option>
                  <option value="5k-10k">$5k - $10k</option>
                  <option value="10k-25k">$10k - $25k</option>
                  <option value="25k-50k">$25k - $50k</option>
                  <option value="50k+">$50k+</option>
                </select>
              </div>

              <div className="form-group">
                <textarea placeholder="What technology solutions you need to grow your business?"></textarea>
              </div>

              <div className="captcha-row">
                <p>What is 6 + 6 ?</p>
                <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                  <input 
                    id="captcha-input"
                    type="text" 
                    placeholder="Answer" 
                    onChange={() => setCaptchaError(false)}
                    style={{borderColor: captchaError ? '#ff0000' : ''}}
                  />
                  {captchaError && <span style={{color:'#ff0000', fontSize:'12px', fontWeight:'700'}}>Wrong answer! Try again.</span>}
                </div>
              </div>

              <button type="button" className="btn-get-quote" onClick={handleGitSubmit}>Get a Quote</button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="custom-toast">
          <div className="toast-content">
            <span className="toast-icon">✅</span>
            <p>Thank you! Your request has been submitted successfully.</p>
          </div>
        </div>
      )}

      <footer className="main-footer">
        <div className="footer-wrapper">
          <div className="footer-grid">
            
            {/* Col 1: Brand */}
            <div className="footer-col brand-col">
              <div className="footer-logo">
                <img src="/logo.jpg" alt="Oyelabs Logo" className="logo-img" style={{width:'150px'}} />
              </div>
              <p className="footer-about">
                Oyelabs aim to solve complex business and social problems using technology and want to enable individuals of the country to do the same.
              </p>
              <a href="mailto:grow@oyelabs.com" className="footer-email">grow@oyelabs.com</a>
              
              <div className="footer-badges">
                <span className="badge-item">ISO 9001</span>
                <span className="badge-item">ROC</span>
                <span className="badge-item">CMMI 5</span>
                <div className="dmca-badge">DMCA PROTECTED</div>
              </div>
              <p className="footer-cin">CIN: U72900MP2019PTC049982</p>
            </div>

            {/* Col 2: Company */}
            <div className="footer-col">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Process</a></li>
                <li><a href="#">Engagement Model</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Client Testimonials</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Terms Of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Refund Policy</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Partnership</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>

            {/* Col 3: Our Products */}
            <div className="footer-col">
              <h3>Our Products</h3>
              <ul className="footer-links">
                <li><a href="#">Amazon Clone</a></li>
                <li><a href="#">Alibaba Clone</a></li>
                <li><a href="#">Facebook Clone</a></li>
                <li><a href="#">Ola Clone</a></li>
                <li><a href="#">Zillow Clone</a></li>
                <li><a href="#">TaskRabbit Clone</a></li>
                <li><a href="#">Twitter Clone</a></li>
                <li><a href="#">InDriver Clone</a></li>
                <li><a href="#">Uber Clone</a></li>
                <li><a href="#">Gojek Clone</a></li>
                <li><a href="#">Fiverr Clone</a></li>
                <li><a href="#">Upwork Clone</a></li>
              </ul>
            </div>

            {/* Col 4: Solutions & Services */}
            <div className="footer-col">
              <h3>Popular Solutions</h3>
              <ul className="footer-links">
                <li><a href="#">UberEats Clone</a></li>
                <li><a href="#">OnlyFans Clone</a></li>
                <li><a href="#">Airbnb Clone</a></li>
                <li><a href="#">UrbanClap Clone</a></li>
                <li><a href="#">TikTok Clone</a></li>
              </ul>
              <div style={{marginTop:'30px'}}>
                <h3>Our Services</h3>
                <ul className="footer-links">
                  <li><a href="#">Home Services App Development</a></li>
                  <li><a href="#">Food App Development</a></li>
                  <li><a href="#">Grocery App Development</a></li>
                  <li><a href="#">Real Estate App Development</a></li>
                  <li><a href="#">Ecommerce App Development</a></li>
                  <li><a href="#">Pet Care App Development</a></li>
                </ul>
              </div>
            </div>

            {/* Col 5: Get in Touch */}
            <div className="footer-col touch-col">
              <h3>Get in Touch</h3>
              <a href="#" className="footer-contact-link">Contact Us</a>

              <div className="address-item">
                <p><b>🇮🇳 India</b></p>
                <p>SCF 10-11, Sector 4, Mansa Devi Complex, Panchkula, Haryana 134109</p>
                <p className="footer-phone">+91-7696921829</p>
              </div>

              <div className="address-item" style={{marginTop:'20px'}}>
                <p><b>🇺🇸 USA</b></p>
                <p>2424 Loria St Union, NJ 07083</p>
                <p>23825 Anza Ave Torrance, CA 90505</p>
                <p className="footer-phone">+1 (646) 862-0866</p>
              </div>
            </div>

          </div>

          <div className="footer-bottom">
            <p className="copyright">Copyrights © 2026 Oyelabs™. All Rights Reserved.</p>
            <div className="footer-socials">
              <a href="#">Be</a>
              <a href="#">In</a>
              <a href="#">Ig</a>
              <a href="#">Fb</a>
              <a href="#">Dr</a>
              <a href="#">Pi</a>
            </div>
          </div>
        </div>
      </footer>

      {/* TESTIMONY VIDEO MODAL */}
      {showTestiModal && (
        <div className="modal-overlay" onClick={() => setShowTestiModal(false)}>
          <div className="video-card" onClick={(e) => e.stopPropagation()} style={{maxWidth:'800px', width:'95%'}}>
            <iframe 
              className="video-iframe"
              src="https://www.youtube.com/embed/npusle3c8E8?rel=0" 
              title="Client Testimonial" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
            <button className="modal-close" onClick={() => setShowTestiModal(false)}>×</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App