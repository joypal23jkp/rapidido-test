import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import LocalSwitch from "./LocalSwitch";
import { locals } from "../hooks/useLocal";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { UserCircleIcon, MenuAlt2Icon, ShoppingCartIcon } from "@heroicons/react/solid";
import NavigationDrawer from "./NavigationDrawer/index";
import useDrawer from "../hooks/useDrawer";
import useCart from "@/hooks/useCart";

export default function TopBar({
  logoVisible = true,
  hasBottomBorder = true,
  render = null,
}) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const t = useTranslations("top_menu");
  const {toggleDrawer} = useDrawer();

  const renderTopRight = useCallback(
    (params) => {
      if (isAuthenticated) {
        const token = window.localStorage.getItem("accessToken");
        return (
          isAuthenticated && (
              <div onClick={toggleDrawer} className="w-auto flex items-center text-white cursor-pointer">
                  <MenuAlt2Icon className="h-6 w-6 mr-1" />
                  <span className="text-xs">Menu</span>
              </div>
          )
        );
      }

      if (!isAuthenticated && !params) {
        return (
          <Link
            href={
              router.pathname === "/partner" ||
              router.pathname === "/partner/signup"
                ? "/partner/signin"
                : "/login"
            }
            passHref
          >
            <div className="flex items-center text-white cursor-pointer">
              <UserCircleIcon className="h-6 w-6 mr-1" />
              <span className="text-xs">{t("login")}</span>
            </div>
          </Link>
        );
      }

      return params;
    },
    [isAuthenticated]
  );

  const { itemCount: cartItemCount } = useCart();

  return (
    <div
      className={`h-16 bg-primary px-5 py-4 ${
        hasBottomBorder ? "border-b-[1px] border-[#019D3E]" : ""
      }`}
    >
      {/** Logo */}
      <div className="flex items-center justify-between h-full">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <img
            src="/logo-sm.png"
            alt="Rapedido logo"
            className="top-bar__logo"
          />
        </div>
        <div>
          <div className="flex">
            <LocalSwitch localList={locals} />
            <Badge countItem={cartItemCount} />
            {renderTopRight(render)}
          </div>
        </div>
      </div>
        <NavigationDrawer></NavigationDrawer>
    </div>
  );
}

const Badge = ({ countItem = 0 }) => {
    return (
        <div className={'relative text-white hover:text-sky-50 flex justify-center items-center mx-2 cursor-pointer'}>
            <ShoppingCartIcon className={'w-8 h-8'}/>
            <span className={'absolute text-[10px] h-4 min-w-4 font-bold -top-0 -right-1 p-1 rounded-full bg-black flex justify-center items-center '}>{countItem}</span>
        </div>
    )
}
