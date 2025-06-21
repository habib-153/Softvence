"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Tabs,
  Tab,
} from "@heroui/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { User } from "@heroui/user";

import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";
import bg from "@/src/assets/reset-bg.png"

interface DashboardHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardHeader = ({ activeTab, onTabChange }: DashboardHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="bg-gradient-to-r from-[#214f3b] via-[#0F2027] to-[#193a36] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-full opacity-40">
        <img
          alt=""
          className="w-72 absolute opacity-60 right-20 top-20 object-cover"
          src={bg.src}
        />
      </div>

      {/* Navbar */}
      <Navbar
        className="bg-transparent text-white relative z-10"
        maxWidth="full"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-white"
          />
          <NavbarBrand>
            <div className="font-bold text-xl flex items-center gap-1 text-white">
              <svg
                fill="none"
                height="20"
                viewBox="0 0 22 20"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.0182 11.0417C19.0182 15.0667 15.4249 18.3333 10.9974 18.3333C6.5699 18.3333 2.97656 15.0667 2.97656 11.0417C2.97656 7.01667 6.5699 3.75 10.9974 3.75C15.4249 3.75 19.0182 7.01667 19.0182 11.0417Z"
                  stroke="white"
                />
                <path d="M11 6.6665V10.8332" stroke="white" />
                <path d="M8.25 1.6665H13.75" stroke="white" />
              </svg>
              Tasko
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <Tabs
            classNames={{
              tabList: "bg-transparent",
              tab: "text-white data-[selected=true]:text-white",
              tabContent: "text-white group-data-[selected=true]:text-white",
              cursor: "bg-white/20",
            }}
            selectedKey={activeTab}
            onSelectionChange={(key) => onTabChange(key as string)}
          >
            <Tab
              key="tasklist"
              title={
                <div className="flex items-center gap-2">
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 24 24"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.3478 2H9.64781C8.60781 2 7.75781 2.84 7.75781 3.88V4.82C7.75781 5.86 8.59781 6.7 9.63781 6.7H14.3478C15.3878 6.7 16.2278 5.86 16.2278 4.82V3.88C16.2378 2.84 15.3878 2 14.3478 2Z"
                      fill="#60E5AE"
                    />
                    <path
                      d="M17.2391 4.81998C17.2391 6.40998 15.9391 7.70998 14.3491 7.70998H9.64906C8.05906 7.70998 6.75906 6.40998 6.75906 4.81998C6.75906 4.25998 6.15906 3.90998 5.65906 4.16998C4.24906 4.91998 3.28906 6.40998 3.28906 8.11998V17.53C3.28906 19.99 5.29906 22 7.75906 22H16.2391C18.6991 22 20.7091 19.99 20.7091 17.53V8.11998C20.7091 6.40998 19.7491 4.91998 18.3391 4.16998C17.8391 3.90998 17.2391 4.25998 17.2391 4.81998ZM12.3791 16.95H7.99906C7.58906 16.95 7.24906 16.61 7.24906 16.2C7.24906 15.79 7.58906 15.45 7.99906 15.45H12.3791C12.7891 15.45 13.1291 15.79 13.1291 16.2C13.1291 16.61 12.7891 16.95 12.3791 16.95ZM14.9991 12.95H7.99906C7.58906 12.95 7.24906 12.61 7.24906 12.2C7.24906 11.79 7.58906 11.45 7.99906 11.45H14.9991C15.4091 11.45 15.7491 11.79 15.7491 12.2C15.7491 12.61 15.4091 12.95 14.9991 12.95Z"
                      fill="#60E5AE"
                    />
                  </svg>
                  Task List
                </div>
              }
            />
            <Tab
              key="spin"
              title={
                <div className="flex items-center gap-2">
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 13.7812C12.3624 13.7812 12.6562 13.4874 12.6562 13.125C12.6562 12.7626 12.3624 12.4688 12 12.4688C11.6376 12.4688 11.3438 12.7626 11.3438 13.125C11.3438 13.4874 11.6376 13.7812 12 13.7812Z"
                      fill="white"
                    />
                    <path
                      d="M13.8517 2.5065L14.4784 1.00238C14.52 0.902666 14.5364 0.794213 14.526 0.686658C14.5156 0.579102 14.4788 0.475776 14.4189 0.385863C14.359 0.29595 14.2778 0.222237 14.1825 0.171276C14.0872 0.120314 13.9808 0.0936831 13.8727 0.0937501H10.1227C10.0147 0.0936831 9.9083 0.120314 9.81301 0.171276C9.71773 0.222237 9.63652 0.29595 9.57659 0.385863C9.51666 0.475776 9.47987 0.579102 9.4695 0.686658C9.45912 0.794213 9.47548 0.902666 9.51713 1.00238L10.1437 2.5065C8.12156 2.85976 6.24228 3.78307 4.72688 5.16784C3.21148 6.55261 2.12297 8.34128 1.58934 10.3235C1.05572 12.3058 1.09916 14.3992 1.71457 16.3576C2.32998 18.3159 3.49176 20.0579 5.06331 21.3786C6.63486 22.6993 8.55083 23.5439 10.5859 23.8129C12.621 24.082 14.6907 23.7644 16.5514 22.8975C18.4122 22.0305 19.9868 20.6503 21.09 18.9192C22.1932 17.188 22.7792 15.1778 22.779 13.125C22.7919 10.5839 21.9012 8.12093 20.2659 6.17586C18.6307 4.2308 16.3573 2.93027 13.8517 2.5065ZM21.4665 13.125C21.4666 14.1477 21.3002 15.1637 20.9738 16.1329L15.2179 13.7486C15.2994 13.3369 15.2994 12.9131 15.2179 12.5014L20.9835 10.1134C21.3045 11.085 21.4676 12.1018 21.4665 13.125ZM20.4855 8.89875L14.7157 11.2875C14.4807 10.9409 14.1819 10.642 13.8353 10.407L16.2244 4.63912C18.0742 5.55218 19.5718 7.04921 20.4855 8.89875ZM11.9977 15.0938C11.6084 15.0938 11.2277 14.9783 10.904 14.762C10.5802 14.5456 10.3279 14.2381 10.1789 13.8784C10.0299 13.5187 9.99086 13.1228 10.0668 12.7409C10.1428 12.359 10.3303 12.0082 10.6056 11.7329C10.881 11.4575 11.2318 11.27 11.6137 11.1941C11.9956 11.1181 12.3914 11.1571 12.7512 11.3061C13.1109 11.4551 13.4184 11.7075 13.6347 12.0312C13.851 12.355 13.9665 12.7356 13.9665 13.125C13.9659 13.647 13.7583 14.1474 13.3892 14.5165C13.0201 14.8855 12.5197 15.0932 11.9977 15.0938ZM12.8884 1.40625L11.9977 3.54375L11.1071 1.40625H12.8884ZM11.3921 5.50238C11.4419 5.62202 11.5259 5.72426 11.6337 5.79618C11.7415 5.86809 11.8682 5.90648 11.9977 5.90648C12.1273 5.90648 12.254 5.86809 12.3618 5.79618C12.4696 5.72426 12.5536 5.62202 12.6034 5.50238L13.3328 3.75187C13.9018 3.83152 14.4625 3.96205 15.0082 4.14188L12.621 9.90487C12.2095 9.82338 11.786 9.82338 11.3745 9.90487L8.98725 4.14188C9.53297 3.96205 10.0937 3.83152 10.6628 3.75187L11.3921 5.50238ZM7.77225 4.63987L10.1602 10.407C9.8136 10.642 9.5148 10.9409 9.27975 11.2875L3.51 8.89875C4.424 7.04903 5.92197 5.55198 7.77225 4.63912V4.63987ZM2.529 13.125C2.52794 12.1018 2.69101 11.085 3.012 10.1134L8.77763 12.5014C8.69613 12.9131 8.69613 13.3369 8.77763 13.7486L3.02175 16.1329C2.69528 15.1637 2.52885 14.1477 2.529 13.125ZM3.525 17.3449L9.27975 14.9625C9.5148 15.3091 9.8136 15.608 10.1602 15.843L7.7775 21.5978C5.93814 20.6763 4.44633 19.1843 3.525 17.3449ZM8.99025 22.1014L11.3745 16.3451C11.786 16.4266 12.2095 16.4266 12.621 16.3451L15.0052 22.1014C13.054 22.7579 10.9415 22.7579 8.99025 22.1014ZM16.218 21.5978L13.8353 15.843C14.1819 15.608 14.4807 15.3091 14.7157 14.9625L20.4705 17.3464C19.5489 19.1853 18.0571 20.6766 16.218 21.5978Z"
                      fill="white"
                    />
                  </svg>
                  Spin
                </div>
              }
            />
          </Tabs>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                avatarProps={{
                  src: user?.profilePhoto,
                  size: "sm",
                }}
                className="text-white cursor-pointer"
                description="Welcome to Dashboard"
                name={user?.name}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          <NavbarMenuItem>
            <button
              className={`w-full text-left ${activeTab === "tasklist" ? "text-primary font-semibold" : "text-foreground"}`}
              onClick={() => onTabChange("tasklist")}
            >
              📋 Task List
            </button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <button
              className={`w-full text-left ${activeTab === "spin" ? "text-primary font-semibold" : "text-foreground"}`}
              onClick={() => onTabChange("spin")}
            >
              🎯 Spin
            </button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      <div className="relative z-10 px-4 py-6 lg:py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            👋 Hi {user?.name || "Thomas"},
          </h1>
          <h2 className="text-lg sm:text-xl text-white/90">
            Welcome to Dashboard
          </h2>
        </div>
      </div>

      <div className="absolute top-4 right-4 opacity-30 z-10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white/40 rounded-full" />
          <div className="w-3 h-3 bg-white/30 rounded-full" />
          <div className="w-3 h-3 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
