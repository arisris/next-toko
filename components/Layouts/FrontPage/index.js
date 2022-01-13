import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FrontPageMenus from "./Menus";
import FrontPageSearchForm from "./SearchForm";
import FrontPageAuthMenu from "./AuthMenu";
import FrontPageFooter from "./Footer";
import FrontPageUserMenu from "./UserMenu";
import { useSession } from "next-auth/react";
import { Fab } from "konsta/react";
import { FaPlus } from "react-icons/fa";
import FrontPageUserCartMenu from "./UserCartMenu";

/**
 * @param {{ children: JSX.Element, title?: string, header?: JSX.Element | (e: { isNavHidden: boolean }) => any, headerClass?: string }} param0
 */
export default function FrontPageLayout({
  children,
  title,
  header,
  headerClass
}) {
  /** @type {import('react').MutableRefObject<HTMLElement>} */
  const navbarRef = useRef();
  const [isNavHidden, setIsNavHidden] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (navbarRef?.current?.style) {
      let prevScroll = window.scrollY;
      window.onscroll = () => {
        let currentScroll = window.scrollY;
        if (prevScroll > currentScroll) {
          navbarRef.current.style.transform = "translateY(0)";
          setIsNavHidden(false);
        } else {
          navbarRef.current.style.transform = "translateY(-100%)";
          setIsNavHidden(true);
        }
        prevScroll = currentScroll;
      };
    }
  }, [navbarRef.current]);

  return (
    <section className="absolute flex flex-col w-full min-h-full text-md">
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
          className="fixed top-0 flex flex-col z-10 w-full bg-white shadow-sm transition-all duration-300 ease-in-out"
        >
          <div className="container mx-auto flex gap-2 items-center">
            <div className="flex gap-2 flex-grow">
              <Link href="/">
                <a className="ml-2 md:ml-0 flex items-center font-bold whitespace-nowrap p-2 hover:bg-gray-100 text-primary">
                  <img className="hidden sm:block fill-current" src="/assets/logo.svg" />
                  <span className="block sm:hidden">NT</span>
                </a>
              </Link>
              <FrontPageSearchForm />
            </div>
            <div className="flex gap-2 flex-row-reverse lg:flex-row self-center p-2">
              {/* This Section For Navbar Menu */}
              <FrontPageMenus isNavHidden={isNavHidden} />
              {/* Vertical Divider */}
              <hr className="hidden md:block w-[1px] h-8 bg-gray-200" />
              {/* Regular Menu Icon */}
              <div className="flex gap-2 text-sm items-center">
                {session.status === "authenticated" ? (
                  <>
                    <FrontPageUserCartMenu session={session} />
                    <FrontPageUserMenu session={session} />
                  </>
                ) : (
                  <FrontPageAuthMenu />
                )}
              </div>
            </div>
          </div>
        </nav>
        {header && (
          <div className="relative w-full z-0">
            {typeof header === "function" ? header({ isNavHidden }) : header}
          </div>
        )}
      </header>
      <main className="flex-auto">
        <section className="container mx-auto">{children}</section>
      </main>
      <footer className="container mx-auto">
        <Fab
          className={clsx("fixed right-4-safe bottom-4-safe z-20", {
            "transition-all duration-300 opacity-0 scale-0": isNavHidden
          })}
          icon={<FaPlus />}
          text="Join Us"
        />
        <FrontPageFooter />
      </footer>
    </section>
  );
}
