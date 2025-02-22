import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTelegramPlane, FaTiktok, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#FF781E] text-white pt-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Logo and About Section */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-4/12 xl:w-3/12">
            <Link href="/">
              <h1 className="text-2xl font-bold mb-4">Eva Engineering</h1>
              {/* <Image
                src="/images/logo/eva-logo-white.png"
                alt="Eva Engineering Logo"
                width={200}
                height={40}
                className="mb-4"
              /> */}
            </Link>
            <p className="mb-6 max-w-[270px] text-base">
              Eva Engineering is a leading provider of construction, media, and event management services, delivering excellence across multiple industries.
            </p>
            <div className="flex items-center gap-4 text-xl">
              <a aria-label="Facebook" target="_blank" href="https://www.facebook.com/evaengineering" className="hover:text-gray-200">
                <FaFacebook />
              </a>
              <a
                aria-label="Telegram"
                href="https://t.me/evaengineering"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200"
              >
                <FaTelegramPlane />
              </a>
              <a aria-label="LinkedIn" target="_blank" href="https://www.linkedin.com/company/evaengineering" className="hover:text-gray-200">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-2/12">
            <h4 className="mb-4 text-lg font-medium">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="#about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link href="#services" className="hover:underline">Services</Link>
              </li>
              <li>
                <Link href="#projects" className="hover:underline">Projects</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Join Our Community Section */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-3/12">
            <h4 className="mb-4 text-lg font-medium">Join Our Community</h4>
            <p className="mb-4">Stay connected and updated with our latest projects and innovations.</p>
            <a
              href="https://t.me/evaengineering"
              target="_blank"
              className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <FaTelegramPlane className="text-xl" /> Join Our Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-white border-opacity-40 py-6 mt-6">
        <div className="container mx-auto px-6 lg:px-12 text-center md:flex md:justify-between">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Eva Engineering. All Rights Reserved.</p>
          <p>
            Designed and Developed by {" "}
            <a
              href="https://www.pixeladdis.com/"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="hover:underline"
            >
              Pixel Addis Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
