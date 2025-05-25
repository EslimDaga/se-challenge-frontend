"use client";

import * as Button from "@/components/ui/button";
import * as Divider from "@/components/ui/divider";
import * as Dropdown from "@/components/ui/dropdown";
import * as Switch from "@/components/ui/switch";

import {
  BellDot,
  ChevronRight,
  CreditCard,
  FileDown,
  Fingerprint,
  Home,
  LayoutPanelLeft,
  Lock,
  LogOut,
  MessageSquareDot,
  Moon,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import { AddUserDrawer } from "@/components/add-user-drawer";
import { CreateUserRequest } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { UsersTable } from "@/components/users-table";
import { usePathname } from "next/navigation";
import { useUsers } from "@/hooks/use-users";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { users, total, isLoading, error, hasInitialized } = useUsers();

  const menuLinks = [
    {
      href: "/dashboard",
      icon: <Home className="size-5" />,
      label: "Dashboard",
    },
    {
      href: "/notifications",
      icon: <MessageSquareDot className="size-5" />,
      label: "Notificaciones",
    },
    {
      href: "/appearances",
      icon: <LayoutPanelLeft className="size-5" />,
      label: "Apariencia",
    },
  ];

  const companyLinks = [
    {
      href: "/authentication",
      icon: <Fingerprint className="size-5" />,
      label: "Autenticación",
    },
    {
      href: "/",
      icon: <Users className="size-5" />,
      label: "Usuarios",
    },
    {
      href: "/security",
      icon: <Lock className="size-5" />,
      label: "Seguridad",
    },
    {
      href: "/pagos",
      icon: <CreditCard className="size-5" />,
      label: "Pagos",
    },
    {
      href: "/settings",
      icon: <Settings className="size-5" />,
      label: "Configuración",
    },
  ];

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      console.log(userData);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (hasInitialized && !isLoading) {
      console.group("🔍 Users Data from API");
      console.log("📊 Total users:", total);
      console.log("👥 Users list:", users);
      console.log("🔄 Loading state:", isLoading);
      console.log("❌ Error state:", error);
      console.groupEnd();
    }
  }, [users, total, isLoading, error, hasInitialized]);

  return (
    <div className="flex min-h-screen flex-col items-start lg:grid lg:grid-cols-[auto_minmax(0,_1fr)] bg-zinc-100">
      <div className="transition-all-default fixed left-0 top-0 z-40 hidden h-full overflow-hidden duration-300 lg:block w-[272px] bg-zinc-100">
        <div className="flex h-full w-[272px] min-w-[272px] flex-col overflow-auto">
          <div className="lg:p-3">
            <Dropdown.Root>
              <Dropdown.Trigger asChild>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  className="flex w-full items-center gap-3 p-3 text-left outline-none focus:outline-none transition-all cursor-pointer justify-between hover:bg-zinc-50 rounded-10 duration-200 ease-out data-[state=open]:bg-zinc-50 data-[state=open]:text-primary-base"
                >
                  <Image
                    src={"/logo.svg"}
                    alt="Logo"
                    width={100}
                    height={40}
                    className="w-auto h-9"
                    priority
                  />
                  <div
                    className="flex w-auto items-center gap-3 overflow-hidden transition duration-300"
                    data-hide-collapsed="true"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs">
                      <ChevronRight className="size-4 text-text-sub-600" />
                    </div>
                  </div>
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content
                side="right"
                align="start"
                sideOffset={35}
                alignOffset={12}
              >
                <Dropdown.Group>
                  <Dropdown.Item>
                    <Dropdown.ItemIcon as={Settings} />
                    Configuración
                  </Dropdown.Item>
                </Dropdown.Group>

                <Divider.Root variant="line-spacing" />
                <div className="p-2 text-paragraph-sm text-text-soft-400">
                  v.1.0.0 · Terminos de uso
                </div>
              </Dropdown.Content>
            </Dropdown.Root>
          </div>

          <div className="px-5">
            <Divider.Root className="bg-stroke-soft-200" />
          </div>
          <div className="flex flex-1 flex-col gap-5 pb-4 pt-5 px-5">
            <div className="space-y-2">
              <div className="p-1 text-subheading-xs uppercase text-text-soft-400">
                General
              </div>
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  prefetch={false}
                  className="group relative flex items-center gap-2 whitespace-nowrap rounded-10 py-2 text-text-sub-600 hover:bg-zinc-200 hover:text-zinc-700 transition duration-200 ease-out aria-[current=page]:text-white aria-[disabled]:pointer-events-none aria-[disabled]:opacity-50 w-full px-3 aria-[current=page]:bg-black"
                >
                  {link.icon}
                  <div className="flex w-[180px] shrink-0 items-center gap-2 transition duration-300">
                    <div className="flex-1 text-label-sm">{link.label}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <div className="p-1 text-subheading-xs uppercase text-text-soft-400">
                Empresa
              </div>
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  prefetch={false}
                  className="group relative flex items-center gap-2 whitespace-nowrap rounded-10 py-2 text-text-sub-600 hover:bg-zinc-200 hover:text-zinc-700 transition duration-200 ease-out aria-[current=page]:text-white aria-[disabled]:pointer-events-none aria-[disabled]:opacity-50 w-full px-3 aria-[current=page]:bg-black"
                >
                  {link.icon}
                  <div className="flex w-[180px] shrink-0 items-center gap-2 transition duration-300">
                    <div className="flex-1 text-label-sm">{link.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="px-5">
            <Divider.Root className="bg-stroke-soft-200" />
          </div>
          <div className="p-3">
            <Dropdown.Root>
              <Dropdown.Trigger asChild>
                <button className="flex w-full items-center gap-3 whitespace-nowrap rounded-10 p-3 text-left outline-none focus:outline-none transition-all duration-200 ease-out hover:bg-zinc-200 cursor-pointer">
                  <div className="relative flex shrink-0 items-center justify-center rounded-full select-none text-center uppercase size-10 text-label-md bg-yellow-200 text-yellow-950">
                    <Image
                      className="size-full rounded-full object-cover"
                      src="https://avatar.vercel.sh/edaga@latamairlines.com"
                      alt=""
                      width={40}
                      height={40}
                      priority
                    />
                  </div>
                  <div className="flex w-[172px] shrink-0 items-center gap-3 transition duration-300">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-0.5 text-label-sm">
                        Eslim Daga
                      </div>
                      <div className="text-paragraph-xs text-text-sub-600">
                        edaga@latamairlines.com
                      </div>
                    </div>
                    <div className="flex size-6 items-center justify-center rounded-md">
                      <ChevronRight className="size-6 text-text-sub-600" />
                    </div>
                  </div>
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content
                side="right"
                align="end"
                sideOffset={35}
                alignOffset={12}
              >
                <Dropdown.Item
                  onSelect={(e) => {
                    e.preventDefault();
                    setIsDarkMode((p) => !p);
                  }}
                >
                  <Dropdown.ItemIcon as={Moon} />
                  Dark Mode
                  <span className="flex-1" />
                  <Switch.Root checked={isDarkMode} />
                </Dropdown.Item>
                <Divider.Root variant="line-spacing" />
                <Dropdown.Group>
                  <Dropdown.Item>
                    <Dropdown.ItemIcon as={User} />
                    Mi perfil
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Dropdown.ItemIcon as={LogOut} />
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Group>
                <Divider.Root variant="line-spacing" />
                <div className="p-2 text-paragraph-sm text-text-soft-400">
                  v.1.0.0 · Terminos de uso
                </div>
              </Dropdown.Content>
            </Dropdown.Root>
          </div>
        </div>
      </div>
      <div className="shrink-0 w-[272px]"></div>

      <div className="flex h-[60px] w-full items-center justify-between border-b border-stroke-soft-200 px-4 lg:hidden">
        <Image
          src={"/logo.svg"}
          alt="Logo"
          width={40}
          height={40}
          className="w-20 h-8"
          priority
        />
        <div className="flex gap-3">
          <button className="transition duration-200 ease-out relative flex size-10 shrink-0 items-center justify-center rounded-10 text-text-sub-600 hover:bg-bg-weak-50 data-[state=open]:bg-bg-weak-50 data-[state=open]:text-primary-base">
            <Search className="size-5" />
          </button>
          <button className="transition duration-200 ease-out relative flex size-10 shrink-0 items-center justify-center rounded-10 text-text-sub-600 hover:bg-bg-weak-50 data-[state=open]:bg-bg-weak-50 data-[state=open]:text-primary-base">
            <BellDot className="size-5" />
            <div className="absolute right-2.5 top-2.5 size-2 rounded-full border-2 border-stroke-white-0 bg-error-base shadow-regular-xs"></div>
          </button>
        </div>
      </div>

      <div className="relative z-50 flex w-auto rounded-2xl m-3 flex-1 flex-col self-stretch bg-white">
        {pathname === "/dashboard" ? (
          <header className="flex h-auto flex-col gap-4 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-3 lg:px-8">
            <div className="flex flex-1 gap-4 lg:gap-3.5">
              <div className="relative flex shrink-0 items-center justify-center rounded-full select-none text-center uppercase size-12 text-label-lg bg-yellow-200 text-yellow-950">
                <Image
                  className="size-full rounded-full object-cover"
                  src="https://avatar.vercel.sh/edaga@aira.com"
                  alt=""
                  width={40}
                  height={40}
                  priority
                />
              </div>
              <div className="space-y-1">
                <div className="text-label-md lg:text-label-lg">Eslim Daga</div>
                <div className="text-paragraph-sm text-text-sub-600">
                  Bienvenid@ de nuevo a Aira
                </div>
              </div>
            </div>
            <div className="items-center gap-3 hidden lg:flex">
              <Button.Root variant="neutral" mode="ghost">
                <Button.Icon as={Search} />
              </Button.Root>
              <Button.Root variant="neutral" mode="ghost">
                <Button.Icon as={BellDot} />
              </Button.Root>
            </div>
          </header>
        ) : (
          <header className="flex h-auto flex-col gap-4 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-3 lg:px-8">
            <div className="flex flex-1 gap-4 lg:gap-3.5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bg-white-0 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200">
                <Users className="size-6 text-text-sub-600" />
              </div>
              <div className="space-y-1">
                <div className="text-label-md lg:text-label-lg">Usuarios</div>
                <div className="text-paragraph-sm text-text-sub-600">
                  Gestión de Usuarios
                </div>
              </div>
            </div>
            <div className="items-center gap-3 hidden lg:flex">
              <Button.Root variant="neutral" mode="ghost">
                <Button.Icon as={Search} />
              </Button.Root>
              <Button.Root variant="neutral" mode="ghost">
                <Button.Icon as={BellDot} />
              </Button.Root>
              <Button.Root variant="neutral" mode="stroke">
                <Button.Icon as={FileDown} />
                Exportar
              </Button.Root>
              <AddUserDrawer onSubmit={handleCreateUser} />
            </div>
          </header>
        )}

        <div className="lg:px-8">
          <Divider.Root className="bg-stroke-soft-200 " />
        </div>
        <div className="flex flex-col gap-6 overflow-hidden p-6">
          {pathname === "/" ? <UsersTable /> : children}
        </div>
      </div>
    </div>
  );
}
