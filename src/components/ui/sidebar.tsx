"use client";
import Image from "next/image";
import SidebarButton from "./sidebar-button";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ShoppingCartIcon,
  InformationCircleIcon,
  PaintBrushIcon,
  TagIcon,
  ArrowLeftEndOnRectangleIcon,
  RectangleGroupIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { logoutAction } from "@/server-actions/auth/auth-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

const sidbarItemsData = {
  dashboard: [
    {
      id: 1,
      title: "dashboard.menu",
      navigate: "/",
      icon: <RectangleGroupIcon />,
    },
    {
      id: 2,
      title: "dashboard.dashboard",
      navigate: "/dashboard",
      icon: <HomeIcon />,
    },
    {
      id: 3,
      title: "dashboard.categories",
      navigate: "/dashboard/categories",
      icon: <ShoppingCartIcon />,
    },
    {
      id: 4,
      title: "dashboard.items",
      navigate: "/dashboard/items",
      icon: <TagIcon />,
    },
    {
      id: 5,
      title: "dashboard.about",
      navigate: "/dashboard/about",
      icon: <InformationCircleIcon />,
    },
    {
      id: 6,
      title: "dashboard.customization",
      navigate: "/dashboard/customization",
      icon: <PaintBrushIcon />,
    },
  ],
  menu: [
    {
      id: 1,
      title: "menu.menu",
      navigate: "/",
      isIndex: true,
      icon: <RectangleGroupIcon />,
    },
    { id: 2, title: "menu.notes", navigate: "/notes", icon: <BookmarkIcon /> },
    { id: 3, title: "menu.about", navigate: "/about", icon: <HomeIcon /> },
  ],
};

export default function Sidebar({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardSidebar = pathname.includes("dashboard");
  const { t } = useTranslation(locale, "sidebar");
  const logoutHandler = async () => {
    const { ok } = await logoutAction();
    if (ok) {
      toast.success(`خارج شدید`);
      router.replace(`/${locale}/admin/login`);
    }
  };
  return (
    <div className="hidden h-full w-64 flex-col items-center rounded-lg bg-white px-5 py-6 xl:flex">
      {/* Logo Layer */}
      <div className="flex h-16 w-full items-center gap-x-3">
        <Image width={25} height={25} src={"/logo.png"} alt="Logo" />
        <h1 className="text-sm font-medium">
          {isDashboardSidebar ? t("dashboard.title") : t("menu.title")}
        </h1>
      </div>

      <hr className="my-2 h-[1px] w-full bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      {/* Buttons Container Layer */}
      <div className="flex h-[calc(100%-72px)] w-full flex-col gap-2 py-2">
        {!isDashboardSidebar ? (
          <>
            {sidbarItemsData.menu.map((item) => (
              <Link key={item.id} href={`/${locale}${item.navigate}`}>
                <SidebarButton
                  buttonTitle={t(`${item.title}`)}
                  icon={item.icon}
                  isActive={pathname === `/${locale}${item.navigate}` && true}
                />
              </Link>
            ))}
          </>
        ) : (
          <>
            {sidbarItemsData.dashboard.map((item) => {
              return (
                <Link key={item.id} href={`/${locale}${item.navigate}`}>
                  <SidebarButton
                    buttonTitle={t(`${item.title}`)}
                    icon={item.icon}
                    isActive={pathname === `/${locale}${item.navigate}` && true}
                  />
                </Link>
              );
            })}
            <SidebarButton
              buttonTitle={t("dashboard.logout")}
              variant="logout"
              onClick={logoutHandler}
              icon={<ArrowLeftEndOnRectangleIcon />}
            />
          </>
        )}
      </div>
    </div>
  );
}
