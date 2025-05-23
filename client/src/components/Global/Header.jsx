import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { X } from "lucide-react";
import { gsap } from "gsap";
import "../custome.css";
import Logo from "../../assets/UDEMYGO-LOGO.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled , setIsScrolled] =  useState(false)
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const tl = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      } 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      tl.current = gsap.timeline({ paused: true });
      tl.current.fromTo(menuRef.current, { x: "100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.4, ease: "power3.out" });
      tl.current.fromTo(linksRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, delay: 0.05, stagger: 0.08, ease: "power3.out" });
    }
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "University", path: "/explore-universities/university-catalog" },
    { name: "Courses", path: "/explore-universities/course-catalog" },
    { name: "Contact", path: "/contact" },
    { name: "Placement", path: "/placement" },
  ];

  useEffect(() => {
    if (tl.current) {
      isOpen ? tl.current.play() : tl.current.reverse();
    }
  }, [isOpen]);

  return (
    <div className="w-full md:max-w-[1322px] flex justify-center uppercase bg-amber-100">
      <div className={`h-20 p-4 mt-6 w-[90%] md:w-[70%] md:max-w-[1150px] bg-amber-0 fixed z-50 flex items-center justify-between rounded-full shadow-2xl backdrop-blur-xl
       ${ isScrolled ? "-translate-y-5 md:-translate-y-15" : "translate-y-0"} `}>
        <div className="w-16">
          <NavLink to={"/"}><img src={Logo} alt="logo" className="cursor-pointer" /></NavLink>
        </div>

        <ul className="hidden lg:flex items-center space-x-1 bg-gray-200 py-3 px-2 rounded-full text-lg font-semibold">
          <li><NavLink to="/" className={({ isActive }) => `px-4 py-3 rounded-full transition-all ${isActive ? "bg-black text-white" : "hover:bg-black hover:text-white cursor-pointer"}`}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => `px-4 py-3 rounded-full transition-all ${isActive ? "bg-black text-white" : "hover:bg-black hover:text-white cursor-pointer"}`}>About</NavLink></li>
          <li className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="px-4 rounded-full transition-all hover:bg-black hover:text-white cursor-pointer uppercase">Explore Universities</button>
            {isOpen && (
              <div className="absolute mt-2 w-full bg-white text-gray-800 shadow-lg rounded-md">
                <NavLink to="/explore-universities/university-catalog" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setIsOpen(false)}>University Catalog</NavLink>
                <NavLink to="/explore-universities/course-catalog" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setIsOpen(false)}>Course Catalog</NavLink>
              </div>
            )}
          </li>
          <li><NavLink to="/contact" className={({ isActive }) => `px-4 py-3 rounded-full transition-all ${isActive ? "bg-black text-white" : "hover:bg-black hover:text-white cursor-pointer"}`}>Contact</NavLink></li>
          <li><NavLink to="/placement" className={({ isActive }) => `px-4 py-3 rounded-full transition-all ${isActive ? "bg-black text-white" : "hover:bg-black hover:text-white cursor-pointer"}`}>Placement</NavLink></li>
        </ul>

        <div className="relative cursor-pointer flex items-center">
          <div className="custome-bg"></div>
          <a href="https://api.whatsapp.com/send?phone=918104550586&text=hello%20iam%20intrested">
          <button className="bg-black text-white text-sm rounded-full px-4 py-3 hover:bg-gray-800 transition-all cursor-pointer">WhatsApp Us</button>
          </a>
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-4xl py-3">{isOpen ? <X size={30} /> : <IoReorderThreeOutline />}</button>
          </div>
        </div>
      </div>

      <div ref={menuRef} className={`lg:hidden fixed top-[15%] right-5 h-fit w-4/6 sm:w-3/6 bg-gray-800 text-white transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50 rounded-2xl shadow-xl`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white text-3xl z-20"><X /></button>
        <ul className="flex flex-col my-5 space-y-6 text-lg text-center">
          {navItems.map((item, index) => (
            <li key={index} ref={(el) => (linksRef.current[index] = el)}>
              <NavLink to={item.path} className="mobile-nav-link" onClick={() => setIsOpen(false)}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
