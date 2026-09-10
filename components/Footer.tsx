import Image from "next/image";
import Link from "next/link";
import {
    FaXTwitter,
    FaInstagram,
    FaLinkedin,
    FaFacebook,
    FaGithub,
} from "react-icons/fa6";

export default function Footer() {

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { href: "https://x.com/", icon: FaXTwitter },
        { href: "https://instagram.com/", icon: FaInstagram },
        { href: "https://linkedin.com/", icon: FaLinkedin },
        { href: "https://facebook.com/", icon: FaFacebook },
        { href: "https://github.com/", icon: FaGithub },
    ];

    return (
        <footer className="bg-[#00203d] border-t border-slate-800 text-slate-300">
            <div className="max-w-7xl mx-auto px-8 py-16">

                <div className="grid lg:grid-cols-12 gap-14">

                    {/* ================= Brand ================= */}

                    <div className="lg:col-span-5">

                        <Link
                            href="/"
                            className="inline-flex items-center gap-x-6"
                        >
                            <Image
                                src="/logo.png"
                                alt="Cyber Mart logo"
                                width={46}
                                height={46}
                                className="rounded-full shadow-md"
                            />

                            <div className="flex flex-col gap-1">

                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    Cyber Mart
                                </h2>

                                <p className="md:text-sm text-xs text-slate-400">
                                    Your everyday shopping destination.
                                </p>

                            </div>

                        </Link>

                        <p className="mt-6 max-w-md leading-relaxed md:leading-loose text-sm md:text-base text-slate-100">
                            Cyber Mart makes online shopping simple with a wide
                            selection of quality products, easy browsing, secure
                            checkout, and a smooth shopping experience.
                        </p>

                        <div className="h-px bg-slate-500 my-8 w-full max-w-sm" />

                        {/* Social Links */}

                        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">

                            {socialLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-11 w-11 rounded-xl bg-slate-600 hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                                >
                                    <link.icon size={24} />
                                </Link>
                            ))}

                        </div>

                    </div>

                    {/* ================= Links ================= */}

                    <div className="lg:col-span-7">

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

                            {/* Shop */}

                            <div>

                                <h3 className="text-white font-semibold uppercase tracking-widest text-sm md:text-base mb-5">
                                    Shop
                                </h3>

                                <ul className="space-y-3">

                                    {[
                                        ["All Products", "/products"],
                                        ["Categories", "/categories"],
                                        ["New Arrivals", "/products?sort=newest"],
                                        ["Best Sellers", "/products?sort=popular"],
                                    ].map(([title, href]) => (

                                        <li key={title}>

                                            <Link
                                                href={href}
                                                className="text-slate-400 text-xs md:text-base hover:text-white transition hover:translate-x-1 inline-block"
                                            >
                                                {title}
                                            </Link>

                                        </li>

                                    ))}

                                </ul>

                            </div>

                            {/* Company */}

                            <div>

                                <h3 className="text-white font-semibold uppercase tracking-widest text-sm md:text-base mb-5">
                                    Company
                                </h3>

                                <ul className="space-y-3">

                                    {[
                                        ["Home", "/"],
                                        ["About Us", "/about"],
                                        ["Contact", "/contact"],
                                        ["Track Order", "/orders"],
                                    ].map(([title, href]) => (

                                        <li key={title}>

                                            <Link
                                                href={href}
                                                className="text-slate-400 text-xs md:text-base hover:text-white transition hover:translate-x-1 inline-block"
                                            >
                                                {title}
                                            </Link>

                                        </li>

                                    ))}

                                </ul>

                            </div>

                            {/* Support & Legal */}

                            <div className="col-span-2 md:col-span-1">

                                <h3 className="text-white font-semibold uppercase tracking-widest text-sm md:text-base mb-5">
                                    Support
                                </h3>

                                <ul className="space-y-3">

                                    {[
                                        ["Help Center", "/help"],
                                        ["Shipping", "/shipping"],
                                        ["Returns & Refunds", "/returns"],
                                        ["Privacy Policy", "/privacy"],
                                        ["Terms of Service", "/terms"],
                                    ].map(([title, href]) => (

                                        <li key={title}>

                                            <Link
                                                href={href}
                                                className="text-slate-400 text-xs md:text-base hover:text-white transition hover:translate-x-1 inline-block"
                                            >
                                                {title}
                                            </Link>

                                        </li>

                                    ))}

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= Bottom ================= */}

                <div className="border-t border-slate-700 mt-12 pt-8">

                    <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400">

                        <p className="text-center w-full">
                            © {currentYear} Cyber Mart. All rights reserved.
                        </p>

                        <div className="flex items-center gap-2 text-center">
                            <span>Built with ❤️ for shoppers.</span>
                        </div>

                    </div>

                </div>

            </div>
        </footer>
    );
}