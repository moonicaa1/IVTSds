/**
 * @file Sidebar.tsx
 * @description 애플리케이션의 주요 네비게이션을 담당하는 사이드바 컴포넌트입니다.
 * 3단계 계층 구조(Level 1, 2, 3)를 지원하며, 즐겨찾기(Favorites) 관리 기능을 포함합니다.
 */

"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSidebar } from "@/lib/contexts/SidebarContext";
import {
  TruckIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  Square3Stack3DIcon,
  RectangleGroupIcon,
  CloudArrowDownIcon,
  WrenchScrewdriverIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  CommandLineIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  MapPinIcon,
  ChevronRightIcon,
  ArrowTopRightOnSquareIcon,
  BookmarkIcon as BookmarkIconOutline,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";

// --- Icons Mapping ---
// Dynamic mapping from string keys to Heroicons components
const iconMap: Record<string, React.ElementType> = {
  car: TruckIcon, // Smart Test Drive
  agent: UserCircleIcon,
  "building-office": BuildingOfficeIcon,
  "building-office-2": BuildingOffice2Icon,
  "user-group": UserGroupIcon,
  "square-3-stack-3d": Square3Stack3DIcon,
  "rectangle-group": RectangleGroupIcon,
  "cloud-arrow-down": CloudArrowDownIcon,
  wrench: WrenchScrewdriverIcon,
  monitor: ComputerDesktopIcon,
  chart: ChartBarIcon,
  code: CommandLineIcon,
  form: ClipboardDocumentListIcon,
  settings: Cog6ToothIcon, // Administration
  "map-pin": MapPinIcon, // Test Drive
};


const LocationIndicator = () => (
  <div className="relative h-2.5 w-2.5">
    <div className="absolute inset-0 rounded-full bg-tealPrimary opacity-30"></div>
    <div className="absolute inset-[2px] rounded-full bg-tealPrimary opacity-60"></div>
    <div className="absolute inset-1 rounded-full bg-tealPrimary"></div>
  </div>
);

const CollapseIcon = () => (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]">
    <path d="M11.25 4.5L6.75 9L11.25 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ExpandIcon = () => (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]">
    <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Sidebar Item Component (Core) ---

interface SidebarItemProps {
  level: 1 | 2 | 3;
  label: string;
  icon?: string;
  isActive?: boolean;
  isExpanded?: boolean;
  hasSubmenu?: boolean;
  hasChevron?: boolean;
  color?: string; // For customized active color (e.g., teal)
  onClick?: () => void;
  // Bookmark props
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

const SidebarItem = ({
  level,
  label,
  icon,
  isActive = false,
  isExpanded = false,
  hasSubmenu = false,
  hasChevron = false,
  color,
  onClick,
  isFavorite,
  onToggleFavorite,
}: SidebarItemProps) => {
  // Styles based on Level
  const baseClasses = "group flex w-full items-center rounded-md text-left transition-colors relative min-w-0";

  // Height & Spacing logic
  let heightClass = "h-10"; // Default to 40px
  let paddingClass = "px-3";
  let textSizeClass = "text-sm font-medium";

  // Icon Resolution
  const IconComponent = icon ? iconMap[icon] : null;
  const iconClass = "w-5 h-5 text-current";

  if (level === 1) {
    heightClass = "h-10"; // Level 1: 40px
    textSizeClass = isActive ? "text-sm font-bold" : "text-sm font-medium";
    paddingClass = "px-3";
  } else if (level === 2) {
    heightClass = "h-9"; // Level 2: 36px
    textSizeClass = isActive ? "text-sm font-bold" : "text-[13px] font-normal";
  } else if (level === 3) {
    heightClass = "h-9"; // Level 3: 36px
    textSizeClass = isActive ? "text-sm font-bold" : "text-[13px] font-normal";
  }

  // Color logic
  const activeBgClass = isActive && level === 1 ? "bg-backgroundQuaternary" : "";
  const hoverBgClass = "hover:bg-backgroundQuaternary";
  const textColorClass = isActive
    ? (color ? "" : "text-contentPrimary") // If color is passed, use style={color}, else explicit default (can be adjusted)
    : "text-contentPrimary";

  const activeStyle = isActive && color ? { color: color } : {};

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${heightClass} ${paddingClass} ${activeBgClass} ${hoverBgClass} ${textColorClass}`}
      style={activeStyle}
    >
      {/* Indentation & Icons */}

      {/* Level 1: Icon is passed directly */}
      {level === 1 && IconComponent && (
        <div className="mr-3 flex-shrink-0">
          <IconComponent className={iconClass} />
        </div>
      )}

      {/* Level 2: 40px spacer */}
      {level === 2 && (
        <div className="w-10 flex-shrink-0"></div>
      )}

      {/* Level 3: 28px spacer + 10px gap + 16px frame + Location Indicator */}
      {level === 3 && (
        <>
          <div className="w-7 flex-shrink-0"></div>
          <div className="w-[10px] flex-shrink-0"></div>
          <div className="w-4 flex-shrink-0"></div>
          <div className="flex items-center flex-shrink-0 mr-2">
            <LocationIndicator />
          </div>
        </>
      )}

      {/* Label */}
      <div className={`flex-1 ${textSizeClass} truncate`}>
        {label}
      </div>

      {/* Right Icon (Chevron) */}
      {(hasSubmenu || hasChevron) && (
        <div className={`transition-transform duration-200 flex-shrink-0 ml-2 ${isExpanded ? "rotate-90" : ""}`}>
          <ChevronRightIcon className="w-4 h-4" />
        </div>
      )}

      {/* Bookmark Button (Level 1, 2 & 3) */}
      {onToggleFavorite && (
        <div
          role="button"
          onClick={onToggleFavorite}
          className={`${level === 1 ? "" : "opacity-0 transition-opacity group-hover:opacity-100"} flex-shrink-0 ml-2 p-1 hover:bg-black/5 rounded`}
        >
          {isFavorite ? (
            <BookmarkIconSolid className={`w-4 h-4 text-contentPrimary ${level === 1 && isActive ? "text-[#0f766e]" : ""}`} /> // Custom active color for Level 1 active
          ) : (
            <BookmarkIconOutline className="w-4 h-4" />
          )}
        </div>
      )}
    </button>
  );
};


// --- Types & Data ---

type FavoriteItem = {
  label: string;
  parentLabel?: string;
  icon?: string;
  href?: string;
};

// --- Main Sidebar Component ---

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, setIsOpen, favorites, toggleFavorite } = useSidebar();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Data
  // Data - Unified Menu Items
  // navItemsClosed is removed; we use adminMenuItems for both states to ensure consistency.

  const adminMenuItems = [
    {
      icon: "car",
      label: "Smart Test Drive",
      hasSubmenu: true,
      submenu: [
        {
          label: "Smart Test Drive",
          hasLocation: false,
          hasSubmenu: true,
          submenu: [
            { label: "Smart Test Drive", hasLocation: true },
          ]
        },
        { label: "Test drive documents", hasLocation: false },
        { label: "Test Drive Records", hasLocation: false },
      ]
    },
    { icon: "monitor", label: "Real-Time Monitoring", hasChevron: true },
    { icon: "map-pin", label: "Test Drive", hasChevron: true },
    { icon: "chart", label: "KPI Reports", hasChevron: true },
    { icon: "code", label: "Vehicle Code Manage", hasChevron: true },
    { icon: "form", label: "Survey Form", hasChevron: true },
    { icon: "agent", label: "Smart Test Drive", hasChevron: true },
    {
      icon: "building-office",
      label: "Dealers",
      href: "/",
      hasChevron: false, // Replaced by Bookmark
      color: "#0f766e"
    },
    {
      icon: "form",
      label: "Documents",
      href: "/documents",
      hasChevron: false,
      color: "#0f766e"
    },
    { icon: "building-office-2", label: "Dealers for distributor", hasChevron: true },
    { icon: "user-group", label: "Dealers for Dealer Groups", hasChevron: true },
    { icon: "square-3-stack-3d", label: "Editions", hasChevron: true },
    { icon: "rectangle-group", label: "Organization Groups", hasChevron: true },
    { icon: "cloud-arrow-down", label: "App Download", hasChevron: true },
    {
      icon: "settings",
      label: "Administration",
      hasSubmenu: true,
      submenu: [
        { label: "Vehicle Detail Chip Master" },
        { label: "Chip Assignment Rules" },
        { label: "Organization Units" },
        { label: "Roles" },
        { label: "Users" },
        { label: "Languages" },
        { label: "Audit Logs" },
        { label: "Maintenance" },
        { label: "Configuration Setting" },
        { label: "App Version" },
        { label: "Patch System" },
        { label: "System Code" },
        { label: "Application Settings" },
        { label: "System Settings" },
      ]
    },
  ];

  // Helper Functions
  const getFavoriteItems = (): FavoriteItem[] => {
    const favoriteList: FavoriteItem[] = [];
    adminMenuItems.forEach(item => {
      if (item.hasSubmenu && item.submenu) {
        item.submenu.forEach(subItem => {
          if (favorites.has(subItem.label)) {
            favoriteList.push({
              label: subItem.label,
              parentLabel: item.label,
              icon: item.icon,
              href: (subItem as any).href,
            });
          }
          // Check deep favorites if any
          if ((subItem as any).submenu) {
            (subItem as any).submenu.forEach((subSubItem: any) => {
              if (favorites.has(subSubItem.label)) {
                favoriteList.push({
                  label: subSubItem.label,
                  parentLabel: subItem.label, // or item.label
                  icon: item.icon, // Inherit usage icon
                  href: (subSubItem as any).href,
                });
              }
            });
          }
        });
      } else if (favorites.has(item.label)) {
        favoriteList.push({ label: item.label, icon: item.icon, href: (item as any).href });
      }
    });
    return favoriteList;
  };

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuKey) ? prev.filter(m => m !== menuKey) : [...prev, menuKey]
    );
  };

  // toggleFavorite moved to Context

  const favoriteItems = getFavoriteItems();

  return (
    <aside
      className={`fixed left-0 top-[60px] z-40 h-[calc(100vh-60px)] border-r border-borderPrimary bg-backgroundTertiary transition-all duration-200 ${isOpen ? "w-[292px]" : "w-[72px]"}`}
    >
      <div className="flex h-full flex-col">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {!isOpen ? (
            // Closed State - Now uses adminMenuItems to match open state
            <div className="flex flex-col items-center gap-[10px] px-4 py-5">
              {adminMenuItems.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-contentPrimary transition-colors bg-transparent hover:bg-backgroundQuaternary`}
                    title={item.label}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </button>
                );
              })}
            </div>
          ) : (
            // Opened State
            <div className="px-3 py-2">
              {/* Favorites Menu */}
              <div className="mb-2">
                <div className="mb-1 px-3 py-1 text-xs font-medium leading-4 text-contentTertiary">Favorites Menu</div>
                <div className="space-y-[2px]">
                  {favoriteItems.length > 0 ? (
                    favoriteItems.map((fav, index) => (
                      <div key={index} className="group flex h-9 w-full items-center rounded-lg px-4 hover:bg-backgroundQuaternary">
                        {/* Open/Navigate Button (Left) */}
                        <button
                          type="button"
                          className="flex-shrink-0 text-contentSecondary hover:text-contentPrimary mr-3 transition-colors"
                          onClick={() => fav.href && router.push(fav.href)}
                          title="Open Menu"
                        >
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </button>

                        {/* Label */}
                        <div className="flex-1 min-w-0 text-left">
                          <div className="text-sm font-medium leading-5 text-contentPrimary truncate">
                            {fav.label}
                          </div>
                        </div>

                        {/* Bookmark/Remove Button (Right) */}
                        <button
                          type="button"
                          className="flex-shrink-0 ml-2"
                          onClick={(e) => toggleFavorite(fav.label)}
                          title="Remove from Favorites"
                        >
                          <BookmarkIconSolid className="w-4 h-4 text-tealPrimary" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-contentSecondary">No favorites yet</div>
                  )}
                </div>
              </div>

              {favoriteItems.length > 0 && <div className="my-2 border-t border-borderPrimary"></div>}

              {/* Admin Menu */}
              <div>
                <div className="mb-1 px-3 text-xs font-medium text-contentTertiary">Admin Menu</div>
                <div className="space-y-1">
                  {adminMenuItems.map((item, index) => {
                    const isExpanded = expandedMenus.includes(item.label);
                    const isFavorite = favorites.has(item.label);

                    // Level 1 Item
                    return (
                      <div key={index}>
                        <SidebarItem
                          level={1}
                          label={item.label}
                          icon={item.icon}
                          isActive={pathname === (item as any).href}
                          color={(item as any).color}
                          hasSubmenu={item.hasSubmenu}
                          hasChevron={item.hasChevron}
                          isExpanded={isExpanded}
                          isFavorite={item.label === "Dealers" ? isFavorite : undefined} // Only dealers for now as per req
                          onToggleFavorite={item.label === "Dealers" ? (e) => { e.stopPropagation(); toggleFavorite(item.label); } : undefined}
                          onClick={() => {
                            if (item.hasSubmenu) {
                              toggleMenu(item.label);
                            } else if ((item as any).href) {
                              router.push((item as any).href);
                            }
                          }}
                        />

                        {/* Level 2 Submenu */}
                        {item.hasSubmenu && (
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                              }`}
                          >
                            <div className="space-y-1">
                              {item.submenu?.map((subItem: any, subIndex: number) => {
                                const menuKey = `${item.label}-${subItem.label}`;
                                const subExpanded = expandedMenus.includes(menuKey);
                                const isFavorite = favorites.has(subItem.label);
                                const hasSubSubmenu = subItem.hasSubmenu || (subItem.submenu && subItem.submenu.length > 0);

                                return (
                                  <div key={subIndex}>
                                    <SidebarItem
                                      level={2}
                                      label={subItem.label}
                                      isActive={subItem.active}
                                      color={subItem.color}
                                      hasSubmenu={hasSubSubmenu}
                                      isExpanded={subExpanded}
                                      isFavorite={isFavorite}
                                      onToggleFavorite={() => toggleFavorite(subItem.label)}
                                      onClick={() => hasSubSubmenu && toggleMenu(menuKey)}
                                    />

                                    {/* Level 3 Submenu */}
                                    {hasSubSubmenu && (
                                      <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${subExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                          }`}
                                      >
                                        {subItem.submenu?.map((subSubItem: any, subSubIndex: number) => {
                                          const isSubFavorite = favorites.has(subSubItem.label);
                                          return (
                                            <SidebarItem
                                              key={subSubIndex}
                                              level={3}
                                              label={subSubItem.label}
                                              isActive={subSubItem.active}
                                              color={subSubItem.color}
                                              isFavorite={isSubFavorite}
                                              onToggleFavorite={() => toggleFavorite(subSubItem.label)}
                                            />
                                          )
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Toggle */}
        <div className="h-[60px] border-t border-borderPrimary bg-backgroundQuaternary flex-shrink-0">
          <div className={`flex h-full ${isOpen ? "items-center justify-end pr-2" : "items-center justify-center"}`}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-[55px] w-[55px] items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
            >
              <div className="flex h-[35px] w-[35px] items-center justify-center rounded-lg">
                {isOpen ? <CollapseIcon /> : <ExpandIcon />}
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
