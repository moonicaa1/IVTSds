"use client";

import { useSidebar } from "@/lib/contexts/SidebarContext";
import { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ViewfinderCircleIcon,
  MicrophoneIcon,
  InformationCircleIcon,
  ClockIcon,
  BuildingOffice2Icon,
  UserPlusIcon,
  ArrowUpTrayIcon,
  LockClosedIcon,
  ChevronDownIcon,
  BellIcon,
  UserGroupIcon,
  TruckIcon,
  ChartBarIcon,
  PlusIcon,
  SunIcon,
  MoonIcon
} from "@heroicons/react/24/outline";
import { useTheme } from "@/lib/contexts/ThemeContext";

// 국기 SVG 컴포넌트
function FlagIcon({ code }: { code: string }) {
  const flagStyles: Record<string, JSX.Element> = {
    jp: (
      <svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-3">
        <rect width="16" height="12" fill="white" />
        <circle cx="8" cy="6" r="3" fill="#BC002D" />
      </svg>
    ),
    es: (
      <svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-3">
        <rect width="16" height="4" fill="#AA151B" />
        <rect y="4" width="16" height="4" fill="#F1BF00" />
        <rect y="8" width="16" height="4" fill="#AA151B" />
      </svg>
    ),
    en: (
      <svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-3">
        <rect width="16" height="12" fill="#012169" />
        <path d="M0 0L16 12M16 0L0 12" stroke="white" strokeWidth="2" />
        <path d="M0 0L16 12M16 0L0 12" stroke="#C8102E" strokeWidth="1.5" />
        <rect x="0" y="4" width="16" height="4" fill="white" />
        <rect x="6" y="0" width="4" height="12" fill="white" />
        <rect x="0" y="4.5" width="16" height="3" fill="#C8102E" />
        <rect x="6.5" y="0" width="3" height="12" fill="#C8102E" />
      </svg>
    ),
  };

  return flagStyles[code] || <div className="w-4 h-3 bg-gray-300" />;
}

/**
 * @component Navbar
 * @description 
 * 애플리케이션의 최상단 헤더 네비게이션바입니다. 
 * 단순한 대시보드 기능을 넘어, AI 기반 지능형 검색과 다국어 대응 기능을 포함한 디자인 시스템의 핵심 레이아웃 요소입니다.
 * 
 * ### 주요 기능
 * - **지능형 검색 (AI Search):** 사용자의 입력 의도를 분석하여 연관된 페이지나 액션을 추천합니다.
 * - **다국어 선택 (i18n):** 일본어, 스페인어, 영어 등 현재 선택된 언어 환경에 맞게 UI를 대응합니다.
 * - **테마 전환:** 다크 모드와 라이트 모드를 실시간으로 전환할 수 있습니다.
 * - **알림 및 프로필:** 사용자 정보와 실시간 시스템 알림을 중앙 집중형으로 관리합니다.
 * 
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [alertDropdownOpen, setAlertDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState<"changePassword" | "mySettings" | "loginAttempts" | "changeProfilePicture" | "logOut" | null>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const alertDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: "jp", name: "Japanese" },
    { code: "es", name: "Spanish" },
    { code: "en", name: "English" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[2]); // English

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setLanguageDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setSearchDropdownOpen(false);
      }
      if (
        alertDropdownRef.current &&
        !alertDropdownRef.current.contains(event.target as Node)
      ) {
        setAlertDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 최근 검색 항목
  const recentSearches = [
    { label: "Smart Test Drive", icon: "clock" },
    { label: "Dealers", icon: "clock" },
    { label: "Admin", icon: "clock" },
  ];

  // Quick Actions (AI 기능 제안)
  const quickActions = [
    { label: "Register New Dealer", icon: "building-office-2" },
    { label: "Create New Role", icon: "user-plus" },
    { label: "Upload New Documents", icon: "arrow-up-tray" },
    { label: "Manage Permissions", icon: "lock-closed" },
  ];

  // 검색어에 따른 AI 제안 버튼 텍스트 결정 (2글자 이상일 때만, 다국어 지원)
  const getAISuggestionButton = (query: string) => {
    const lowerQuery = query.toLowerCase().trim();
    const searchKeywords = getSearchKeywords(query, selectedLanguage.code);
    const hasKeyword = (keyword: string) => searchKeywords.some(k => k.includes(keyword));

    // 언어별 제안 텍스트
    const getLocalizedSuggestion = (en: string, jp: string, es: string) => {
      if (selectedLanguage.code === "jp") return jp;
      if (selectedLanguage.code === "es") return es;
      return en;
    };

    // 2-3글자일 때는 시작 문자로 추론
    if (lowerQuery.length >= 2 && lowerQuery.length <= 3) {
      if (lowerQuery.startsWith("de") || lowerQuery.startsWith("ディ") || lowerQuery.startsWith("딜")) {
        return getLocalizedSuggestion("Register new dealer", "新しいディーラーを登録", "Registrar nuevo distribuidor");
      } else if (lowerQuery.startsWith("us") || lowerQuery.startsWith("ユー") || lowerQuery.startsWith("사용")) {
        return getLocalizedSuggestion("Go to Permissions & Roles", "権限とロールへ移動", "Ir a Permisos y Roles");
      } else if (lowerQuery.startsWith("te") || lowerQuery.startsWith("テスト") || lowerQuery.startsWith("테스트")) {
        return getLocalizedSuggestion("View Test Drive Records", "試乗記録を表示", "Ver registros de prueba");
      } else if (lowerQuery.startsWith("ve") || lowerQuery.startsWith("車両") || lowerQuery.startsWith("차량")) {
        return getLocalizedSuggestion("Browse Vehicle Inventory", "車両在庫を閲覧", "Explorar inventario de vehículos");
      } else if (lowerQuery.startsWith("kp") || lowerQuery.includes("kpi")) {
        return getLocalizedSuggestion("View KPI Reports", "KPIレポートを表示", "Ver informes KPI");
      }
    }

    // 검색어에 따라 다른 제안 버튼 제공 (다국어 지원)
    if (hasKeyword("user") || hasKeyword("role") || hasKeyword("permission")) {
      return getLocalizedSuggestion("Go to Permissions & Roles", "権限とロールへ移動", "Ir a Permisos y Roles");
    } else if (hasKeyword("dealer") || hasKeyword("register")) {
      return getLocalizedSuggestion("Register new dealer", "新しいディーラーを登録", "Registrar nuevo distribuidor");
    } else if (hasKeyword("test") || hasKeyword("drive")) {
      return getLocalizedSuggestion("View Test Drive Records", "試乗記録を表示", "Ver registros de prueba");
    } else if (hasKeyword("vehicle") || hasKeyword("car")) {
      return getLocalizedSuggestion("Browse Vehicle Inventory", "車両在庫を閲覧", "Explorar inventario de vehículos");
    } else if (hasKeyword("kpi") || hasKeyword("report")) {
      return getLocalizedSuggestion("View KPI Reports", "KPIレポートを表示", "Ver informes KPI");
    }

    // 검색 결과가 있을 때만 기본 제안 표시, 없으면 null 반환
    return null;
  };

  // 다국어 검색어 매핑
  const getSearchKeywords = (query: string, langCode: string) => {
    const lowerQuery = query.toLowerCase().trim();
    const keywords: string[] = [lowerQuery];

    // 언어별 동의어 및 번역 추가
    if (langCode === "jp") {
      // 일본어 검색어
      if (lowerQuery.includes("ディーラー") || lowerQuery.includes("ディラー")) keywords.push("dealer");
      if (lowerQuery.includes("ユーザー") || lowerQuery.includes("ユーザ")) keywords.push("user");
      if (lowerQuery.includes("ロール") || lowerQuery.includes("役割")) keywords.push("role");
      if (lowerQuery.includes("テスト") || lowerQuery.includes("試乗")) keywords.push("test", "drive");
      if (lowerQuery.includes("車両") || lowerQuery.includes("自動車")) keywords.push("vehicle", "car");
    } else if (langCode === "es") {
      // 스페인어 검색어
      if (lowerQuery.includes("distribuidor") || lowerQuery.includes("concesionario")) keywords.push("dealer");
      if (lowerQuery.includes("usuario") || lowerQuery.includes("usuarios")) keywords.push("user");
      if (lowerQuery.includes("rol") || lowerQuery.includes("roles")) keywords.push("role");
      if (lowerQuery.includes("prueba") || lowerQuery.includes("conducción")) keywords.push("test", "drive");
      if (lowerQuery.includes("vehículo") || lowerQuery.includes("coche")) keywords.push("vehicle", "car");
    } else if (langCode === "en") {
      // 영어는 기본
    }

    // 한국어 검색어 (언어 설정과 무관하게 지원)
    if (lowerQuery.includes("딜러") || lowerQuery.includes("대리점")) keywords.push("dealer");
    if (lowerQuery.includes("사용자") || lowerQuery.includes("유저")) keywords.push("user");
    if (lowerQuery.includes("역할") || lowerQuery.includes("권한")) keywords.push("role", "permission");
    if (lowerQuery.includes("테스트") || lowerQuery.includes("시승") || lowerQuery.includes("예약")) keywords.push("test", "drive");
    if (lowerQuery.includes("차량") || lowerQuery.includes("자동차")) keywords.push("vehicle", "car");
    if (lowerQuery.includes("지표") || lowerQuery.includes("리포트")) keywords.push("kpi", "report");

    return keywords;
  };

  // AI 기반 검색 결과 생성 (시뮬레이션) - 2글자 이상일 때만, 다국어 지원
  const getSearchResults = (query: string) => {
    if (!query.trim() || query.trim().length < 2) return [];

    const lowerQuery = query.toLowerCase().trim();
    const results = [];

    // 선택된 언어에 따른 검색어 확장
    const searchKeywords = getSearchKeywords(query, selectedLanguage.code);
    const hasKeyword = (keyword: string) => searchKeywords.some(k => k.includes(keyword));

    // 딜러 관련 검색 (다국어 지원)
    if (hasKeyword("dealer") || (lowerQuery.length >= 2 && lowerQuery.startsWith("de"))) {
      results.push({
        type: "page",
        title: "Dealers",
        path: "/dealers",
        description: "Manage dealer information and settings",
        relevance: 95,
        icon: "building-office-2",
      });
      results.push({
        type: "action",
        title: "Register New Dealer",
        path: "/dealers/new",
        description: "Create a new dealer account",
        relevance: 90,
        icon: "plus",
      });
    }

    // 사용자/역할 관련 검색 (다국어 지원)
    if (hasKeyword("user") || hasKeyword("role") || hasKeyword("permission")) {
      results.push({
        type: "page",
        title: "Users & Roles",
        path: "/admin/users",
        description: "Manage user accounts and role permissions",
        relevance: 95,
        icon: "user-group",
      });
      results.push({
        type: "page",
        title: "Roles",
        path: "/admin/roles",
        description: "Configure role-based access control",
        relevance: 90,
        icon: "lock-closed",
      });
    }

    // 테스트 드라이브 관련 검색 (다국어 지원)
    if (hasKeyword("test") || hasKeyword("drive")) {
      results.push({
        type: "page",
        title: "Test Drive Reservations",
        path: "/test-drives",
        description: "View and manage test drive appointments",
        relevance: 95,
        icon: "car",
      });
      results.push({
        type: "page",
        title: "Test Drive Records",
        path: "/test-drives/records",
        description: "Historical test drive data and analytics",
        relevance: 85,
        icon: "chart",
      });
    }

    // 차량 관련 검색 (다국어 지원)
    if (hasKeyword("vehicle") || hasKeyword("car")) {
      results.push({
        type: "page",
        title: "Vehicle Inventory",
        path: "/vehicles",
        description: "Browse and manage vehicle listings",
        relevance: 95,
        icon: "car",
      });
    }

    // KPI 관련 검색
    if (lowerQuery.includes("kpi") || lowerQuery.startsWith("kp")) {
      results.push({
        type: "page",
        title: "KPI Reports",
        path: "/reports/kpi",
        description: "View dealer KPI metrics and analytics",
        relevance: 95,
        icon: "chart",
      });
    }

    // 일반 검색어에 대한 기본 결과는 제거 (의미 없는 검색어에 대한 결과 표시 안 함)

    // 관련성 순으로 정렬
    return results.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
  };

  // 아이콘 컴포넌트
  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      "building-office-2": (
        // Heroicons: building-office-2
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
      "user-group": (
        // Heroicons: user-group
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      "lock-closed": (
        // Heroicons: lock-closed
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      "car": (
        // Heroicons: truck (used as car)
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H18m0 0a1.5 1.5 0 003 0m-3 0a1.5 1.5 0 013 0m0 0h1.5m-1.5 0h-6m0 0H8.25m-6-6.75h15M3.75 12h15m-15-6.75h15" />
        </svg>
      ),
      "chart": (
        // Heroicons: chart-bar
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      "plus": (
        // Heroicons: plus
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
      "magnifying-glass": (
        // Heroicons: magnifying-glass
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
    };
    return icons[iconName] || icons["magnifying-glass"];
  };

  const searchResults = getSearchResults(searchValue);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-[60px] border-b border-[var(--border-primary)] bg-[var(--background-tertiary)]">
      <div className="flex h-full items-center justify-between px-4">
        {/* Leading: Logo/Text - "DEALERS" 로고 */}
        <div className="flex w-[200px] items-center">
          <div className="flex flex-col items-start justify-center">
            {/* Car silhouette SVG */}
            {/* Car silhouette SVG */}
            <svg
              viewBox="0 0 90 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-[2px] w-[90px] h-[15px]"
            >
              <path d="M28.7656 7.99712C28.7656 7.99712 10.2204 6.74804 0 15.0728C0 15.0728 5.71638 8.21755 20.4482 6.75539C26.8259 4.22784 33.3137 1.14922 40.8229 0.267516C48.3321 -0.614188 61.2344 0.781843 68.9272 3.01549C68.9272 3.01549 55.4445 6.97581 48.2219 6.64517C53.5121 6.35127 60.2057 3.30939 60.2057 3.30939C51.4842 1.00227 45.5841 0.781843 39.2799 1.9501C32.9757 3.12571 23.0125 6.85825 23.0125 6.85825C24.2983 7.29911 28.7656 7.99712 28.7656 7.99712ZM86.8111 6.02063C86.8111 6.02063 89.3019 5.61652 90 4.55113C86.8479 5.39609 75.709 4.73482 72.2557 3.77964C67.4798 6.19698 55.2167 8.07794 45.4372 8.98169C68.9272 7.52688 84.842 0.627544 89.5811 14.4042C90.4482 9.49602 86.8111 6.01329 86.8111 6.01329V6.02063Z" fill="var(--content-secondary)" />
              <path d="M12.1379 13.7129C13.7103 11.6041 16.6272 10.1861 19.9704 10.1861C23.3135 10.1861 26.2672 11.6262 27.8322 13.757H25.7161C24.254 12.0303 21.7485 10.8914 18.905 10.8914C16.0615 10.8914 13.6001 12.0083 12.1305 13.7129H12.1379Z" fill="var(--content-secondary)" />
              <path d="M64.8207 12.6183C66.5253 10.5096 69.6921 9.09153 73.3218 9.09153C76.9515 9.09153 80.1624 10.5316 81.8596 12.6624H79.5599C77.9728 10.9358 75.2542 9.7969 72.1682 9.7969C69.0823 9.7969 66.4078 10.9137 64.8134 12.6183H64.8207Z" fill="var(--content-secondary)" />
            </svg>
            <div className="flex items-start gap-[8px]">
              {/* DEALER */}
              <svg width="59" height="8" viewBox="0 0 59 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.4701 0.615097C8.92703 0.171452 7.92016 0.0328125 7.27402 0.0328125H3.05176e-06C0.753171 0.318013 1.46273 0.797309 1.46273 1.6133V7.49161H7.31366C7.94791 7.49161 8.95477 7.37673 9.47803 6.90932C9.89029 6.50529 10.0092 5.9032 10.0092 5.40409V2.10844C10.0092 1.64103 9.92596 0.987443 9.4701 0.615097ZM7.65457 5.27734C7.65457 5.56254 7.44051 5.76456 7.14717 5.76456H3.80548V1.75986H7.14717C7.43258 1.75986 7.65457 1.96188 7.65457 2.2352V5.27734Z" fill="var(--content-secondary)" />
                <path d="M13.3744 5.24453V4.30178H19.5028V2.57473H13.3586V1.71517H19.5028V0H9.56895C10.334 0.285201 11.0119 0.764497 11.0119 1.58049V5.47427H11.0317C11.0634 5.93376 11.1982 6.54773 11.5629 6.87651C12.094 7.35184 13.1643 7.45879 13.8105 7.45879H19.5147V5.73174H13.8739C13.5647 5.73174 13.3744 5.52973 13.3744 5.24453Z" fill="var(--content-secondary)" />
                <path d="M21.2076 0.0117188C21.7705 0.19393 22.2264 0.574198 22.2264 1.06934C22.2264 1.2159 22.1828 1.37831 22.1312 1.53675L20.0303 7.45863H22.3928L22.8447 6.23068H27.4827L27.9068 7.45863H30.3883L27.7284 0.0117188H21.2076ZM25.0448 4.50363V4.49571H23.483L24.5017 1.71896H25.9129L26.8762 4.50363H25.0408H25.0448Z" fill="var(--content-secondary)" />
                <path d="M33.4168 0.0117188H29.6232C30.3764 0.29692 31.0741 0.776215 31.0741 1.59221V7.4507H38.2292V5.72366H33.4168V0.0117188Z" fill="var(--content-secondary)" />
                <path d="M41.6108 5.24453V4.30178H47.7392V2.57473H41.583V1.71517H47.7392V0H37.8053C38.5703 0.285201 39.2482 0.764497 39.2482 1.58049V1.71913H39.2601V5.52577H39.272C39.3076 5.98129 39.4464 6.56358 39.7992 6.88047C40.3304 7.3558 41.4007 7.46275 42.0468 7.46275H47.7511V5.7357H42.1102C41.801 5.7357 41.6108 5.53369 41.6108 5.24849V5.24453Z" fill="var(--content-secondary)" />
                <path d="M57.9978 2.9786V2.22599C57.9978 0.487053 57.1614 0.0117188 55.3895 0.0117188H48.0322C48.7973 0.29692 49.4831 0.776215 49.4831 1.60013V7.44674H51.8258V5.1691H55.3142C56.9236 5.1691 57.9978 4.5987 57.9978 2.97464V2.9786ZM51.8258 3.45393V2.56268H51.8179V1.73481H55.1556C55.441 1.73481 55.6551 1.94871 55.6551 2.22202V2.96275C55.6551 3.24003 55.441 3.44997 55.1556 3.44997H51.8258V3.45393Z" fill="var(--content-secondary)" />
                <path d="M54.6797 5.73281L55.5042 7.44798H58.0927L57.2206 5.73281H54.6797Z" fill="var(--content-secondary)" />
              </svg>
              {/* 365 */}
              <svg width="31" height="8" viewBox="0 0 31 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5998 2.10839C10.5998 1.15021 9.68291 0 8.51183 0H0C0.766706 0.288053 1.57745 0.702129 1.57745 1.57629V1.72432H7.43684C7.90527 1.72432 8.28963 1.90635 8.28963 2.27842C8.28963 2.68249 7.94932 2.88453 7.46887 2.88453H1.56544V4.63085H7.43484C7.91328 4.63085 8.2556 4.77888 8.2556 5.16295C8.2556 5.56702 7.92529 5.73705 7.44685 5.73705H1.57745V7.47137H8.4798C9.779 7.47137 10.5897 6.40718 10.5897 5.34298C10.5897 4.62885 10.0793 4.06475 9.47072 3.71468C10.0773 3.37462 10.5998 2.82052 10.5998 2.10639V2.10839Z" fill="var(--content-secondary)" />
                <path d="M19.704 3.08794C19.1175 2.60985 18.0745 2.51384 17.3819 2.51384H13.8987C13.7826 2.51384 13.6545 2.51384 13.5464 2.52384V1.74569H17.3699C17.488 1.74569 17.6682 1.81971 17.7422 1.89572L17.7963 1.93773H20.2245L20.2145 1.7877C20.1825 1.40363 20.0644 0.903539 19.692 0.605484C19.1375 0.159402 18.1166 0.009375 17.444 0.009375H9.7749C10.5416 0.297428 11.1802 0.79752 11.1802 1.60567C11.1802 2.80789 11.1902 4.36217 11.2022 5.5764C11.2022 6.06649 11.2122 6.79062 11.7247 7.19469C12.2572 7.64278 13.2701 7.7808 13.9287 7.7808H17.3799C18.0725 7.7808 19.1275 7.66478 19.702 7.19469C20.1384 6.84263 20.2345 6.19451 20.2345 5.74643V4.53221C20.2345 4.09613 20.1384 3.426 19.702 3.08394L19.704 3.08794ZM17.8824 5.5784C17.8824 5.85445 17.6802 6.06849 17.3919 6.06849H14.0468C13.7586 6.06849 13.5564 5.85645 13.5564 5.5784V4.70624C13.5564 4.43019 13.7486 4.24815 14.0468 4.24815H17.3919C17.6902 4.24815 17.8824 4.44019 17.8824 4.71624V5.5784Z" fill="var(--content-secondary)" />
                <path d="M28.7686 3.00255C28.2361 2.67249 27.2552 2.61848 26.6907 2.61848H24.1544C24.0263 2.61848 23.8241 2.59648 23.6639 2.54447C23.5138 2.48046 23.4397 2.39444 23.4397 2.28842V1.73432H29.0329V1.59629C29.0329 0.734135 29.8116 0.286053 30.5883 0H21.0855V2.38444C21.0855 2.94854 21.3618 3.64067 21.9063 3.98073C22.4168 4.30079 23.4818 4.3528 24.0363 4.3528H26.4965C26.7948 4.3528 27.0711 4.40681 27.1892 4.58684C27.2212 4.61885 27.2312 4.66086 27.2312 4.67286V5.24696C27.2312 5.54502 26.8909 5.73705 26.4965 5.73705H21.4259V7.45137H26.6987C28.2862 7.45137 29.5854 7.14331 29.5854 5.35498V4.57684C29.5854 4.00274 29.3191 3.35262 28.7646 3.00255H28.7686Z" fill="var(--content-secondary)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative" ref={searchDropdownRef}>
            <div
              className="relative h-[40px] w-[680px] cursor-text rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary"
              onClick={() => {
                setSearchDropdownOpen(true);
                searchInputRef.current?.focus();
              }}
            >
              <div className="flex h-full items-center px-3">
                {/* Search icon - 24x24 */}
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0 text-[var(--content-secondary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {/* Search input placeholder */}
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setSearchDropdownOpen(true)}
                  placeholder="Please enter your search term"
                  className="flex-1 text-sm font-medium text-[var(--content-secondary)] outline-none placeholder:text-[var(--content-secondary)]"
                />
                {/* Action icons - 20x20 each */}
                <div className="ml-3 flex gap-2">
                  {/* Viewfinder icon */}
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-[var(--content-secondary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {/* Microphone icon */}
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-[var(--content-secondary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Search Dropdown Menu - Figma: 680px × 312px, rounded-md (6px), bg var(--background-primary) */}
            {searchDropdownOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-[60] w-[680px] rounded-md border border-[var(--border-secondary)] bg-backgroundPrimary p-1 shadow-lg">
                {/* AI Intelligent Response 알림 - 검색어 2글자 이상일 때만 표시 */}
                {searchValue.trim().length >= 2 && (
                  <>
                    <div className="mb-2 rounded-lg bg-[#CCFBF1] p-4">
                      <div className="flex items-start gap-3">
                        {/* Info icon */}
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
                          <svg
                            className="h-5 w-5 text-[#0F766E]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 text-base font-medium leading-6 text-[#0F766E]">
                            AI Intelligent Response
                          </div>
                          <div className="text-sm leading-5 text-[#314158]">
                            {searchResults.length > 0
                              ? `Found ${searchResults.length} relevant result${searchResults.length > 1 ? 's' : ''} for '${searchValue}'`
                              : `Searching for '${searchValue}' across dealer records`}
                          </div>
                        </div>
                        {/* Action button - 검색어에 따라 다른 텍스트, 제안이 있을 때만 표시 */}
                        {getAISuggestionButton(searchValue) && (
                          <button
                            type="button"
                            className="flex-shrink-0 rounded-md bg-backgroundPrimary px-3 py-1.5 text-sm font-semibold text-[#0F766E] hover:bg-[#E6FFFA]"
                          >
                            {getAISuggestionButton(searchValue)}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* AI 검색 결과 표시 */}
                    {searchResults.length > 0 && (
                      <div className="mb-2 max-h-[300px] overflow-y-auto">
                        <div className="mb-1 px-2 text-xs font-semibold text-[var(--content-tertiary)]">
                          Search Results
                        </div>
                        <div className="space-y-1">
                          {searchResults.map((result, index) => (
                            <button
                              key={index}
                              type="button"
                              className="flex w-full items-start gap-3 rounded-md px-2 py-2 text-left hover:bg-[var(--background-secondary)]"
                            >
                              {/* Icon */}
                              <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center text-[var(--content-secondary)]">
                                {getIcon(result.icon)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="mb-0.5 text-sm font-medium text-[var(--content-primary)]">
                                  {result.title}
                                </div>
                                <div className="text-xs text-[var(--content-secondary)]">
                                  {result.description}
                                </div>
                                <div className="mt-0.5 text-xs text-[var(--content-tertiary)]">
                                  {result.path}
                                </div>
                              </div>
                              {/* Relevance indicator */}
                              <div className="flex-shrink-0">
                                <div className="text-xs font-medium text-[var(--content-secondary)]">
                                  {result.relevance}%
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Recently open 섹션 - 검색어가 없을 때만 표시 */}
                {!searchValue.trim() && (
                  <div className="mb-1 px-2 py-1">
                    <div className="mb-1 px-2 text-xs font-semibold text-[var(--content-tertiary)]">
                      Recently open
                    </div>
                    {recentSearches.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-xs font-semibold text-[var(--content-primary)] hover:bg-[var(--background-secondary)]"
                      >
                        {/* Clock icon - 16x16 */}
                        <svg
                          className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Actions 섹션 */}
                <div className="px-2 py-1">
                  <div className="mb-1 px-2 text-xs font-semibold text-[var(--content-tertiary)]">
                    Quick Actions
                  </div>
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`flex h-8 w-full items-center justify-between rounded-md px-2 text-left text-xs font-semibold text-[var(--content-primary)] hover:bg-[var(--background-secondary)] ${index === 0 ? "bg-black/5" : ""
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Icon - 16x16 */}
                        {action.icon === "building-office-2" && (
                          <svg
                            className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                            />
                          </svg>
                        )}
                        {action.icon === "user-plus" && (
                          <svg
                            className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />
                          </svg>
                        )}
                        {action.icon === "arrow-up-tray" && (
                          <svg
                            className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                          </svg>
                        )}
                        {action.icon === "lock-closed" && (
                          <svg
                            className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        )}
                        <span>{action.label}</span>
                      </div>
                      {/* Arrow icon - 16x16 */}
                      <svg
                        className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trailing: Language, Divider, Alert, User Profile */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-borderPrimary bg-backgroundPrimary hover:bg-backgroundTertiary transition-all duration-300 shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5 text-contentSecondary" />
            ) : (
              <SunIcon className="h-5 w-5 text-contentSecondary" />
            )}
          </button>
          {/* Language Selector with Dropdown */}
          <div className="relative" ref={languageDropdownRef}>
            <button
              type="button"
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex h-[36px] w-[150px] items-center justify-between rounded-lg border border-borderPrimary bg-backgroundTertiary px-4"
            >
              <div className="flex items-center gap-2">
                {/* Flag icon - 16x16 */}
                <FlagIcon code={selectedLanguage.code} />
                <div className="text-sm font-medium text-contentPrimary">
                  {selectedLanguage.name}
                </div>
              </div>
              {/* Chevron icon - 20x20 */}
              <svg
                className="h-5 w-5 flex-shrink-0 text-contentPrimary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </button>

            {/* Language Dropdown Menu - Figma: 149px × 116px, rounded-xl (12px), bg var(--background-tertiary) */}
            {languageDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[60] w-[149px] rounded-xl border border-borderPrimary bg-backgroundTertiary p-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setLanguageDropdownOpen(false);
                    }}
                    className={`flex h-[36px] w-full items-center gap-2 rounded-lg px-4 text-left text-sm font-medium ${selectedLanguage.code === lang.code
                      ? "bg-backgroundPrimary text-contentPrimary"
                      : "bg-transparent text-contentPrimary hover:bg-backgroundPrimary/50"
                      }`}
                  >
                    {/* Flag icon - 16x16 */}
                    <FlagIcon code={lang.code} />
                    <span className="flex-1">{lang.name}</span>
                    {/* Check icon for selected - 16x16 */}
                    {selectedLanguage.code === lang.code && (
                      <svg
                        className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider - Figma: 1px × 24px, color var(--border-primary) */}
          <div className="h-8 w-px bg-[var(--border-primary)]" />

          {/* Alert with Dropdown - Figma: 24px × 24px */}
          <div className="relative" ref={alertDropdownRef}>
            <button
              type="button"
              onClick={() => setAlertDropdownOpen(!alertDropdownOpen)}
              className="relative flex h-6 w-6 items-center justify-center rounded-md"
            >
              {/* Alert icon - 16x16 */}
              <svg
                className="h-4 w-4 text-[var(--content-primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {/* 빨간 점 표시 - Figma: 4px × 4px, #EF4444 */}
              <div className="absolute right-0 top-0 h-1 w-1 rounded-full bg-[#EF4444] ring-1 ring-[#F4F4F5]" />
            </button>

            {/* Alert Dropdown Menu - Figma: 296px × 448px, rounded-xl (12px), bg var(--background-secondary) */}
            {alertDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[60] w-[296px] rounded-xl border border-[var(--border-primary)] bg-[var(--background-secondary)] p-1 shadow-lg">
                {/* Notification 헤더 */}
                <div className="px-4 py-2">
                  <div className="text-sm font-semibold text-[var(--content-tertiary)]">
                    Notification
                  </div>
                </div>

                {/* 알림 아이템들 */}
                <div className="space-y-1">
                  {/* New Reservation Request */}
                  <button
                    type="button"
                    className="flex w-full items-start gap-3 rounded-lg bg-backgroundPrimary px-4 py-3 text-left hover:bg-[var(--background-secondary)]"
                  >
                    {/* Icon - exclamation-circle, 16x16 */}
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div className="flex-1">
                      <div className="mb-1 text-sm font-medium text-[var(--content-primary)]">
                        New Reservation Request
                      </div>
                      <div className="mb-1 text-xs text-[var(--content-secondary)]">
                        Alice Johnson requested a test drive for IONIQ 5.
                      </div>
                      <div className="text-xs text-[var(--content-tertiary)]">10 min ago</div>
                    </div>
                    {/* Arrow icon - 16x16 (invisible) */}
                    <div className="h-4 w-4 flex-shrink-0" />
                  </button>

                  {/* Inventory Threshold Alert */}
                  <button
                    type="button"
                    className="flex w-full items-start gap-3 rounded-lg border border-[var(--border-secondary)] bg-backgroundPrimary px-4 py-3 text-left hover:bg-[var(--background-secondary)]"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div className="flex-1">
                      <div className="mb-1 text-sm font-medium text-[var(--content-primary)]">
                        Inventory Threshold Alert
                      </div>
                      <div className="mb-1 text-xs text-[var(--content-secondary)]">
                        Genesis GV80 (Vik Black) stock is running low (Only 1
                        left).
                      </div>
                      <div className="text-xs text-[var(--content-tertiary)]">10 min ago</div>
                    </div>
                    <div className="h-4 w-4 flex-shrink-0" />
                  </button>

                  {/* Service Completed */}
                  <button
                    type="button"
                    className="flex w-full items-start gap-3 rounded-lg bg-backgroundPrimary px-4 py-3 text-left hover:bg-[var(--background-secondary)]"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div className="flex-1">
                      <div className="mb-1 text-sm font-medium text-[var(--content-primary)]">
                        Service Completed
                      </div>
                      <div className="mb-1 text-xs text-[var(--content-secondary)]">
                        Maintenance #4022 for Tucson Hybrid has been completed.
                      </div>
                      <div className="text-xs text-[var(--content-tertiary)]">10 min ago</div>
                    </div>
                    <div className="h-4 w-4 flex-shrink-0" />
                  </button>

                  {/* System Update Scheduled */}
                  <button
                    type="button"
                    className="flex w-full items-start gap-3 rounded-lg bg-backgroundPrimary px-4 py-3 text-left hover:bg-[var(--background-secondary)]"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div className="flex-1">
                      <div className="mb-1 text-sm font-medium text-[var(--content-primary)]">
                        System Update Scheduled
                      </div>
                      <div className="mb-1 text-xs text-[var(--content-secondary)]">
                        Patch v4.0.2 will be installed tonight at 02:00 AM.
                      </div>
                      <div className="text-xs text-[var(--content-tertiary)]">10 min ago</div>
                    </div>
                    <div className="h-4 w-4 flex-shrink-0" />
                  </button>
                </div>

                {/* Setting 항목 - Divider 포함 */}
                <div className="mt-1 border-t border-[var(--border-secondary)] pt-1">
                  <button
                    type="button"
                    className="flex h-[36px] w-full items-center gap-3 rounded-lg px-4 text-left text-sm font-medium text-[var(--content-secondary)] hover:bg-backgroundPrimary"
                  >
                    {/* Icon - cog-8-tooth, 16x16 */}
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-[var(--content-secondary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    <div className="flex-1">setting</div>
                    <span className="text-xs text-[var(--content-secondary)]">⌘ O</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile with Dropdown */}
          <div className="relative" ref={userDropdownRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex h-6 w-6 items-center justify-center rounded-md bg-[#18181B]"
            >
              <div className="text-xs font-medium leading-4 text-white">D1</div>
            </button>

            {/* User Profile Dropdown Menu - Figma: width/height hug, rounded-xl (12px), bg var(--background-secondary) */}
            {userDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[60] min-w-fit rounded-xl border border-[var(--border-primary)] bg-[var(--background-secondary)] p-1">
                {/* Change password - Figma: width hug, height 36px */}
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setModalOpen("changePassword");
                  }}
                  className="flex h-[36px] w-full min-w-fit items-center gap-3 rounded-lg px-4 text-left text-sm font-medium text-[var(--content-primary)] hover:bg-backgroundPrimary/50"
                >
                  {/* Icon - 16x16 */}
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <div className="flex-1 whitespace-nowrap">Change password</div>
                  {/* Shortcut - ⌘ O */}
                  <span className="text-xs text-[var(--content-secondary)] whitespace-nowrap">⌘ O</span>
                </button>

                {/* Login attempts - Figma: width hug, height 36px */}
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setModalOpen("loginAttempts");
                  }}
                  className="flex h-[36px] w-full min-w-fit items-center gap-3 rounded-lg px-4 text-left text-sm font-medium text-[var(--content-primary)] hover:bg-backgroundPrimary/50"
                >
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="flex-1 whitespace-nowrap">Login attempts</div>
                  <span className="text-xs text-[var(--content-secondary)] whitespace-nowrap">⌘ O</span>
                </button>

                {/* Change profile picture - Figma: width hug, height 36px */}
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setModalOpen("changeProfilePicture");
                  }}
                  className="flex h-[36px] w-full min-w-fit items-center gap-3 rounded-lg px-4 text-left text-sm font-medium text-[var(--content-primary)] hover:bg-backgroundPrimary/50"
                >
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1 whitespace-nowrap">Change profile picture</div>
                  <span className="text-xs text-[var(--content-secondary)] whitespace-nowrap">⌘ O</span>
                </button>

                {/* My setting - Figma: width hug, height 36px */}
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setModalOpen("mySettings");
                  }}
                  className="flex h-[36px] w-full min-w-fit items-center gap-3 rounded-lg px-4 text-left text-sm font-medium text-[var(--content-primary)] hover:bg-backgroundPrimary/50"
                >
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-[var(--content-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  <div className="flex-1 whitespace-nowrap">My setting</div>
                  <span className="text-xs text-[var(--content-secondary)] whitespace-nowrap">⌘ O</span>
                </button>

                {/* Divider - Figma: 높이 9px, 실제 separator 1px */}
                <div className="my-1 flex items-center px-4">
                  <div className="h-px flex-1 bg-[var(--border-primary)]" />
                </div>

                {/* Sign out - Figma: width hug, height 36px, text color #EF4444 */}
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setModalOpen("logOut");
                  }}
                  className="flex h-[36px] w-full min-w-fit items-center gap-3 rounded-lg px-4 text-left text-sm font-medium text-[#EF4444] hover:bg-backgroundPrimary/50"
                >
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-[#EF4444]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <div className="flex-1 whitespace-nowrap">Sign out</div>
                  <span className="text-xs text-[var(--content-secondary)] whitespace-nowrap">⌘ O</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setModalOpen(null)}
          />

          {/* Change Password Modal */}
          {modalOpen === "changePassword" && (
            <div className="fixed left-1/2 top-1/2 z-50 w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--content-tertiary)] bg-backgroundPrimary p-6">
              {/* Heading - Figma: fontSize 20, lineHeight 28, Semi Bold */}
              <h2 className="mb-6 text-xl font-semibold leading-7 text-[var(--content-primary)]">
                Change password
              </h2>

              {/* Content */}
              <div className="space-y-4">
                {/* Current password input */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    Current password
                  </label>
                  <div className="relative rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <svg
                        className="mr-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="password"
                        placeholder="place holder"
                        className="flex-1 text-base font-medium leading-6 text-[var(--content-tertiary)] outline-none placeholder:text-[var(--content-tertiary)]"
                      />
                      <svg
                        className="ml-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>

                {/* New password input */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    New password
                  </label>
                  <div className="relative rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <svg
                        className="mr-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="password"
                        placeholder="place holder"
                        className="flex-1 text-base font-medium leading-6 text-[var(--content-tertiary)] outline-none placeholder:text-[var(--content-tertiary)]"
                      />
                      <svg
                        className="ml-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>

                {/* New password (repeat) input */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    New password(repeat)
                  </label>
                  <div className="relative rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <svg
                        className="mr-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="password"
                        placeholder="place holder"
                        className="flex-1 text-base font-medium leading-6 text-[var(--content-tertiary)] outline-none placeholder:text-[var(--content-tertiary)]"
                      />
                      <svg
                        className="ml-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(null)}
                  className="flex h-9 items-center gap-2 rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary px-4 text-sm font-semibold leading-5 text-[var(--content-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex h-9 items-center gap-2 rounded-lg bg-[#18181B] px-4 text-sm font-semibold leading-5 text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Log Out Confirmation Modal */}
          {modalOpen === "logOut" && (
            <div className="fixed left-1/2 top-1/2 z-50 w-[513px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--content-tertiary)] bg-backgroundPrimary p-6">
              {/* Content */}
              <div className="mb-4">
                <h2 className="mb-2 text-sm font-semibold leading-5 text-[var(--content-primary)]">
                  Are you sure you want to log out?
                </h2>
                <p className="text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                  You will be signed out of your account for security reasons.
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(null)}
                  className="flex h-9 items-center gap-2 rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary px-4 text-sm font-semibold leading-5 text-[var(--content-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // TODO: 로그아웃 로직 구현
                    console.log("Log out");
                    setModalOpen(null);
                  }}
                  className="flex h-9 items-center gap-2 rounded-lg bg-[#18181B] px-4 text-sm font-semibold leading-5 text-white"
                >
                  Log out
                </button>
              </div>
            </div>
          )}

          {/* My Settings Modal */}
          {modalOpen === "mySettings" && (
            <div className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[720px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-[var(--content-tertiary)] bg-backgroundPrimary p-6">
              {/* Heading */}
              <h2 className="mb-6 text-xl font-semibold leading-7 text-[var(--content-primary)]">
                My settings
              </h2>

              {/* Content */}
              <div className="space-y-4">
                {/* Name input */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    Name*
                  </label>
                  <div className="relative rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <svg
                        className="mr-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="text"
                        defaultValue="admin"
                        className="flex-1 text-base font-medium leading-6 text-[var(--content-primary)] outline-none"
                      />
                      <svg
                        className="ml-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>

                {/* Surname input */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    Surname*
                  </label>
                  <div className="relative rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <svg
                        className="mr-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="text"
                        defaultValue="admin"
                        className="flex-1 text-base font-medium leading-6 text-[var(--content-primary)] outline-none"
                      />
                      <svg
                        className="ml-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>

                {/* Email address input */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    Email address*
                  </label>
                  <div className="relative rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <svg
                        className="mr-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="email"
                        defaultValue="admin@test.com"
                        className="flex-1 text-base font-medium leading-6 text-[var(--content-primary)] outline-none"
                      />
                      <svg
                        className="ml-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>

                {/* Email address (second) input */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    Email address
                  </label>
                  <div className="relative rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <svg
                        className="mr-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="email"
                        defaultValue="admin@test.com"
                        className="flex-1 text-base font-medium leading-6 text-[var(--content-primary)] outline-none"
                      />
                      <svg
                        className="ml-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>

                {/* Phone number input */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    Phone number
                  </label>
                  <div className="relative rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <svg
                        className="mr-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="tel"
                        placeholder="placeholder"
                        className="flex-1 text-base font-medium leading-6 text-[var(--content-tertiary)] outline-none placeholder:text-[var(--content-tertiary)]"
                      />
                      <svg
                        className="ml-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>

                {/* User id(Login id) input */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    User id(Login id)*
                  </label>
                  <div className="relative rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <svg
                        className="mr-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="text"
                        defaultValue="admin"
                        className="flex-1 text-base font-medium leading-6 text-[var(--content-primary)] outline-none"
                      />
                      <svg
                        className="ml-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>

                {/* Timezone input */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    Timezone
                  </label>
                  <div className="relative rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <svg
                        className="mr-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        type="text"
                        defaultValue="Default[(UTC+07:00) Bangkok, Hanoi, Jakarta]"
                        className="flex-1 text-base font-medium leading-6 text-[var(--content-primary)] outline-none"
                      />
                      <svg
                        className="ml-2 h-4 w-4 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(null)}
                  className="flex h-9 items-center gap-2 rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary px-4 text-sm font-semibold leading-5 text-[var(--content-primary)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex h-9 items-center gap-2 rounded-lg bg-[#18181B] px-4 text-sm font-semibold leading-5 text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Login Attempts Modal */}
          {modalOpen === "loginAttempts" && (
            <div className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[720px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-[var(--content-tertiary)] bg-backgroundPrimary p-6">
              {/* Heading */}
              <h2 className="mb-6 text-xl font-semibold leading-7 text-[var(--content-primary)]">
                Login attempts
              </h2>

              {/* Content */}
              <div className="space-y-4">
                {/* Search and Filter */}
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg border border-[var(--border-secondary)] bg-backgroundPrimary">
                    <div className="flex items-center px-3 py-2">
                      <input
                        type="text"
                        placeholder="Search"
                        className="flex-1 text-sm font-semibold leading-5 text-[var(--content-secondary)] outline-none placeholder:text-[var(--content-secondary)]"
                      />
                      <svg
                        className="h-5 w-5 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="h-9 w-[94px] rounded-lg border border-[var(--border-secondary)] bg-backgroundPrimary"></div>
                </div>

                {/* Table */}
                <div className="rounded-lg border border-[var(--border-primary)]">
                  {/* Table Header */}
                  <div className="flex border-b border-[var(--border-primary)]">
                    <div className="flex w-[160px] items-center gap-2 border-r border-[var(--border-primary)] px-6 py-2.5">
                      <span className="text-sm font-semibold leading-5 text-[var(--content-secondary)]">
                        Vehicle
                      </span>
                      <svg
                        className="h-5 w-5 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                      </svg>
                    </div>
                    <div className="flex w-[216px] items-center gap-2 border-r border-[var(--border-primary)] px-6 py-2.5">
                      <span className="text-sm font-semibold leading-5 text-[var(--content-secondary)]">
                        Email
                      </span>
                      <svg
                        className="h-5 w-5 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-1 items-center gap-2 px-6 py-2.5">
                      <span className="text-sm font-semibold leading-5 text-[var(--content-secondary)]">
                        Email
                      </span>
                      <svg
                        className="h-5 w-5 text-[var(--content-secondary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Table Rows */}
                  {[
                    { vehicle: "175.209.251.44", email: "Chrome / 143.0 / WinNT", time: "31 minutes ago(2026-01-07 02:02:02)" },
                    { vehicle: "175.209.251.44", email: "Chrome / 143.0 / WinNT", time: "31 minutes ago(2026-01-07 02:02:02)" },
                    { vehicle: "175.209.251.44", email: "Chrome / 143.0 / WinNT", time: "31 minutes ago(2026-01-07 02:02:02)" },
                  ].map((row, index) => (
                    <div
                      key={index}
                      className={`flex border-b border-[var(--border-secondary)] last:border-b-0 ${index % 2 === 1 ? "bg-[var(--background-secondary)]" : ""
                        }`}
                    >
                      <div className="w-[160px] border-r border-[var(--border-secondary)] px-6 py-4">
                        <div className="text-sm font-semibold leading-5 text-[var(--content-primary)]">
                          {row.vehicle}
                        </div>
                        <div className="text-sm font-medium leading-5 text-[var(--content-secondary)]">
                          jane.cooper@example.com
                        </div>
                      </div>
                      <div className="w-[216px] border-r border-[var(--border-secondary)] px-6 py-4">
                        <div className="text-sm font-semibold leading-5 text-[var(--content-primary)]">
                          {row.email}
                        </div>
                        <div className="text-sm font-medium leading-5 text-[var(--content-secondary)]">
                          jane.cooper@example.com
                        </div>
                      </div>
                      <div className="flex-1 px-6 py-4">
                        <div className="text-sm font-semibold leading-5 text-[var(--content-primary)]">
                          {row.time}
                        </div>
                        <div className="text-sm font-medium leading-5 text-[var(--content-secondary)]">
                          jane.cooper@example.com
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(null)}
                  className="flex h-9 items-center gap-2 rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary px-4 text-sm font-semibold leading-5 text-[var(--content-primary)]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Change Profile Picture Modal */}
          {modalOpen === "changeProfilePicture" && (
            <div className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[720px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-[var(--content-tertiary)] bg-backgroundPrimary p-6">
              {/* Heading */}
              <h2 className="mb-6 text-xl font-semibold leading-7 text-[var(--content-primary)]">
                Change profile picture
              </h2>

              {/* Content */}
              <div className="space-y-4">
                {/* Document File Label */}
                <div>
                  <label className="mb-1 block text-sm font-semibold leading-5 text-[var(--content-primary)]">
                    Document File
                  </label>
                  <p className="text-sm font-medium leading-5 text-[var(--content-tertiary)]">
                    Helper text
                  </p>
                </div>

                {/* File Upload Area */}
                <div className="space-y-4">
                  {/* Open File Button */}
                  <div className="flex gap-2">
                    <div className="flex-1 rounded-lg border border-[var(--border-primary)] bg-backgroundPrimary px-3 py-2">
                      <input
                        type="text"
                        placeholder="Choose file"
                        className="w-full text-base font-medium leading-6 text-contentPrimary outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      className="rounded-lg bg-backgroundInversePrimary px-4 py-2 text-sm font-semibold leading-5 text-white"
                    >
                      Browse
                    </button>
                  </div>

                  {/* Drag and Drop Area */}
                  <div className="rounded-lg border-2 border-dashed border-contentTertiary bg-backgroundQuaternary p-8 text-center">
                    <div className="mb-4 flex justify-center">
                      <svg
                        className="h-6 w-6 text-contentSecondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <p className="mb-2 text-base font-normal leading-7 text-contentPrimary">
                      Drag and drop files here
                    </p>
                    <p className="mb-4 text-sm font-normal leading-5 text-contentSecondary">
                      JPG, JPEG, PNG - Up to 5MB
                    </p>
                    <button
                      type="button"
                      className="rounded-lg border border-borderPrimary bg-backgroundSecondary px-4 py-2 text-sm font-semibold leading-5 text-contentPrimary"
                    >
                      Choose files
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(null)}
                  className="flex h-9 items-center gap-2 rounded-lg border border-borderPrimary bg-backgroundPrimary px-4 text-sm font-semibold leading-5 text-contentPrimary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex h-9 items-center gap-2 rounded-lg bg-backgroundInversePrimary px-4 text-sm font-semibold leading-5 text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Create
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </header>
  );
}
