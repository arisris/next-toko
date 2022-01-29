import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FrontPageSearchForm from "./SearchForm";
import FrontPageFooter from "./Footer";
import { useSession } from "next-auth/react";
import FrontPageCategoriesMenu from "./CategoriesMenu";
import FrontPageNavbarMenu from "./NavbarMenu";
import FrontPageFooterMenu from "./FooterMenu";
import { FaWhatsapp } from "react-icons/fa";
import { Fab } from "konsta/react";
import { useClickAway } from "ahooks";

type FrontPageLayoutNavbarHeaderCallback = (e: { isNavHidden: boolean }) => any;

export default function FrontPageLayout({
  children,
  title,
  header,
  headerClass
}: {
  children: JSX.Element;
  title?: string;
  header?: JSX.Element | FrontPageLayoutNavbarHeaderCallback;
  headerClass?: string;
}) {
  const navbarRef = useRef<HTMLDivElement>();
  const navbarBottomRef = useRef<HTMLDivElement>();
  const wrapperRef = useRef<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>();
  const footerRef = useRef<HTMLDivElement>();
  const [isNavHidden, setIsNavHidden] = useState(false);
  const session = useSession();

  useClickAway(() => {
    isNavHidden && setIsNavHidden(false);
  }, [footerRef]);

  useEffect(() => {
    const showScrollable = () => {
      navbarRef.current.style.transform = "translateY(0)";
      navbarBottomRef.current.style.transform = "translateY(0)";
    };
    const hideScrollable = () => {
      navbarRef.current.style.transform = "translateY(-100%)";
      navbarBottomRef.current.style.transform = "translateY(10vh)";
    };
    if (wrapperRef?.current) {
      isNavHidden ? hideScrollable() : showScrollable();
      let prevScroll = wrapperRef.current.scrollTop;
      wrapperRef.current.onscroll = () => {
        let currentScroll = wrapperRef.current.scrollTop;
        setIsNavHidden(prevScroll < currentScroll);
        prevScroll = currentScroll;
      };
    }
  }, [isNavHidden]);

  return (
    <section
      ref={wrapperRef}
      className="fixed overflow-auto flex flex-col w-full h-screen"
    >
      <Head>
        <title>{title || "App"}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <header className={clsx("min-h-[4rem]", headerClass)}>
        <nav
          ref={navbarRef}
          className="fixed flex flex-col z-10 w-full bg-white shadow-md transition-all duration-300 ease-in-out"
        >
          <div className="container mx-auto flex gap-2 items-center">
            <div className="flex gap-2 flex-grow">
              <Link href="/">
                <a className="ml-2 md:ml-0 flex items-center font-bold whitespace-nowrap p-2 hover:bg-gray-100 text-primary">
                  <img
                    className="hidden sm:block fill-current"
                    src="/assets/logo.svg"
                  />
                  <span className="block sm:hidden">NT</span>
                </a>
              </Link>
              <FrontPageSearchForm />
            </div>
            <div className="flex gap-1 lg:gap-2 flex-row-reverse lg:flex-row self-center p-2">
              {/* This Section For Navbar Menu */}
              <FrontPageCategoriesMenu isNavHidden={isNavHidden} />
              <FrontPageNavbarMenu session={session} />
            </div>
          </div>
        </nav>
        {header && (
          <div className="relative w-full z-0">
            {typeof header === "function" ? header({ isNavHidden }) : header}
          </div>
        )}
      </header>
      <main className="flex-auto" ref={contentRef}>
        <section className="container mx-auto">{children}</section>
      </main>
      <footer className="container mx-auto" ref={footerRef}>
        <FrontPageFooterMenu
          ref={navbarBottomRef}
          className={clsx(
            "fixed bottom-0 inset-x-0 lg:hidden z-0 transition-all duration-300 ease-in-out"
          )}
        />
        <Fab
          className={clsx(
            "fixed right-4-safe bottom-16-safe lg:bottom-4-safe",
            {
              "transition-all duration-300 opacity-0 scale-0": isNavHidden
            }
          )}
          draggable={true}
          colors={{
            bg: "bg-green-600",
            activeBg: "bg-green-700"
          }}
          icon={<FaWhatsapp />}
          //text="Join Us"
        />
        <FrontPageFooter />
      </footer>
    </section>
  );
}
