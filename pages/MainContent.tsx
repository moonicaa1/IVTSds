/**
 * @file MainContent.tsx
 * @description 대시보드의 주요 컨텐츠를 구성하는 메인 컴포넌트입니다.
 * 비즈니스 핵심 지표(KPI) 시각화와 딜러 관리 테이블을 통합하여 보여줍니다.
 */

"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Table from "@/components/ui/Table";
import ContentHeader from "@/components/layout/ContentHeader";
import { DEALERS_DATA, getGrowthTrendData, type Dealer } from "@/lib/data/mockData";
import Badge, { BadgeColor } from "@/components/ui/Badge";

/**
 * @component MainContent
 * @description
 * 메인 페이지의 비즈니스 로직과 UI 구성을 담당하는 핵심 컴포넌트입니다.
 * KPI 카드, 차트(데이터 시각화), 그리고 딜러 목록 테이블을 포함합니다.
 * 
 * - 데이터 소스: `@/app/data/mockData`
 * - 하위 컴포넌트: `ContentHeader`, `Table`
 */
export default function MainContent() {
  // Data State
  const [dealers, setDealers] = useState<Dealer[]>(DEALERS_DATA);

  // UI State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, Set<string>>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  // Graph tab states
  const [growthTrendTab, setGrowthTrendTab] = useState<"Daily" | "Weekly" | "Monthly" | "Yearly">("Daily");
  const [dealerGoalTab, setDealerGoalTab] = useState<"Daily" | "Weekly" | "Monthly" | "Yearly">("Daily");
  const [editionTab, setEditionTab] = useState<"Daily" | "Weekly" | "Monthly" | "Yearly">("Daily");

  // Filter & Sort Logic
  const filteredData = dealers.filter((item) => {
    // Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      if (!item.name.toLowerCase().includes(lowerTerm) && !item.code.toLowerCase().includes(lowerTerm)) {
        return false;
      }
    }
    // Filter Buttons (Multi-Select)
    if (filters["Dealer Type"]?.size > 0 && !filters["Dealer Type"].has(item.dealerType)) return false;
    if (filters["Side Menu Set"]?.size > 0 && !filters["Side Menu Set"].has(item.sideMenuSet)) return false;
    if (filters["Status"]?.size > 0 && !filters["Status"].has(item.active)) return false;

    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = (a as any)[key];
    const bValue = (b as any)[key];
    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalItems = sortedData.length;
  // Reset page if filtered results are less than current page start
  if (currentPage > Math.ceil(totalItems / itemsPerPage) && totalItems > 0) {
    setCurrentPage(1);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentDealers = sortedData.slice(startIndex, endIndex);

  // Handlers
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilter = (newFilters: Record<string, Set<string>>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
  };

  const handleAddDealer = (newData: any) => {
    const newDealer: Dealer = {
      id: Math.max(...dealers.map(d => d.id)) + 1,
      code: newData.dealerId,
      name: newData.dealerName,
      edition: "Basic", // Default for now or map from type
      dealerType: newData.dealerType,
      sideMenuSet: newData.sideMenuSet,
      active: newData.isActive ? "Active" : "Inactive",
      creationTime: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      email: `${newData.dealerId.toLowerCase()}@example.com`,
    };
    setDealers([newDealer, ...dealers]);
  };

  // Define Columns for the Table
  const columns = [
    {
      key: "code",
      header: "Dealer Code",
      width: "140px",
      render: (item: Dealer) => <span className="font-bold text-[#09090B]">{item.code}</span>
    },
    {
      key: "name",
      header: "Name",
      render: (item: Dealer) => <span className="font-bold text-[#09090B]">{item.name}</span>
    },
    {
      key: "edition",
      header: "Edition",
      width: "80px",
      render: (item: Dealer) => <span className="font-semibold text-[#09090B]">{item.edition}</span>
    },
    {
      key: "dealerType",
      header: "Dealer Type",
      render: (item: Dealer) => {
        const colorMap: Record<string, BadgeColor> = {
          "Standard": "Blue",
          "Premium": "Pink",
          "Enterprise": "Purple",
          "Basic": "Zinc"
        };
        return (
          <Badge color={colorMap[item.dealerType] || "Zinc"}>
            {item.dealerType}
          </Badge>
        );
      }
    },
    {
      key: "sideMenuSet",
      header: "Side Menu Set",
      width: "120px",
      render: (item: Dealer) => {
        const colorMap: Record<string, BadgeColor> = {
          "SSC": "Orange",
          "Genesis": "Zinc"
        };
        return (
          <Badge color={colorMap[item.sideMenuSet] || "Zinc"}>
            {item.sideMenuSet}
          </Badge>
        );
      }
    },
    {
      key: "active",
      header: "Active",
      render: (item: Dealer) => {
        const colorMap: Record<string, BadgeColor> = {
          "Active": "Green",
          "Inactive": "Zinc"
        };
        return (
          <Badge color={colorMap[item.active] || "Zinc"}>
            {item.active}
          </Badge>
        );
      }
    },
    {
      key: "creationTime",
      header: "Creation Time",
      width: "120px",
      render: (item: Dealer) => <span className="font-bold text-[#09090B]">{item.creationTime}</span>
    },

  ];

  const getFilterBadgeColor = (column: string, value: string): string => {
    if (column === "Dealer Type") {
      const colorMap: Record<string, string> = {
        "Standard": "Blue",
        "Premium": "Pink",
        "Enterprise": "Purple",
        "Basic": "Zinc"
      };
      return colorMap[value] || "Zinc";
    }
    if (column === "Side Menu Set") {
      const colorMap: Record<string, string> = {
        "SSC": "Orange",
        "Genesis": "Zinc"
      };
      return colorMap[value] || "Zinc";
    }
    if (column === "Status") { // Assuming the label is "Status" based on screenshot, or "Active"
      const colorMap: Record<string, string> = {
        "Active": "Green",
        "Inactive": "Zinc"
      };
      return colorMap[value] || "Zinc";
    }
    return "Zinc";
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <ContentHeader onAddDealer={handleAddDealer} />

      {/* KPI Section - Figma: 3 KPI Cards, 124px height each */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-6">
          {/* KPI Card 1: Active Dealers Now */}
          <div className="h-[124px] rounded-lg border border-[#D4D4D8] bg-white p-6">
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <div className="mb-1 text-base font-semibold leading-6 text-[#000000]">Active Dealers Now</div>
                <div className="flex items-baseline gap-2">
                  <div className="flex items-baseline gap-1">
                    <div className="text-[30px] font-semibold leading-9 tracking-[-0.75px] text-[#09090B]">142</div>
                    <div className="text-xl font-semibold leading-7 tracking-[-0.5px] text-[#09090B]">Case</div>
                  </div>
                  <div className="flex items-center gap-0.5 rounded-md bg-[#dcfce7] px-1.5 py-0.5">
                    <svg className="h-3 w-3 text-[#15803d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    <span className="text-xs font-medium leading-4 text-[#15803d]">+2</span>
                    <span className="text-[10px] font-medium leading-4 text-[#15803d]">/vs last mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Card 2: Pending Approvals */}
          <div className="h-[124px] rounded-lg border border-[#D4D4D8] bg-white p-6">
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <div className="mb-1 text-base font-semibold leading-6 text-[#000000]">Pending Approvals</div>
                <div className="flex items-baseline gap-2">
                  <div className="flex items-baseline gap-1">
                    <div className="text-[30px] font-semibold leading-9 tracking-[-0.75px] text-[#09090B]">8</div>
                    <div className="text-xl font-semibold leading-7 tracking-[-0.5px] text-[#09090B]">Case</div>
                  </div>
                  <div className="flex items-center gap-0.5 rounded-md bg-[#dcfce7] px-1.5 py-0.5">
                    <svg className="h-3 w-3 text-[#15803d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    <span className="text-xs font-medium leading-4 text-[#15803d]">-3</span>
                    <span className="text-[10px] font-medium leading-4 text-[#15803d]">/vs last mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Card 3: New Registrations */}
          <div className="h-[124px] rounded-lg border border-[#D4D4D8] bg-white p-6">
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <div className="mb-1 text-base font-semibold leading-6 text-[#000000]">New Registrations</div>
                <div className="flex items-baseline gap-2">
                  <div className="flex items-baseline gap-1">
                    <div className="text-[30px] font-semibold leading-9 tracking-[-0.75px] text-[#09090B]">3</div>
                    <div className="text-xl font-semibold leading-7 tracking-[-0.5px] text-[#09090B]">Case</div>
                  </div>
                  <div className="flex items-center gap-0.5 rounded-md bg-[#ffe4e6] px-1.5 py-0.5">
                    <svg className="h-3 w-3 text-[#be123c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    <span className="text-xs font-medium leading-4 text-[#be123c]">-1</span>
                    <span className="text-[10px] font-medium leading-4 text-[#b91c1c]">/vs last mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Box Section - Figma: 3 Chart Widgets, 505px × 316px each */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Widget 1: Dealer Growth Trend */}
          <div className="flex h-[316px] flex-col rounded-lg border border-contentQuaternary bg-backgroundPrimary p-6">
            <div className="mb-4 text-base font-semibold leading-6 text-contentPrimary">Dealer Growth Trend</div>
            <div className="mb-4 flex items-center border-b border-contentQuaternary">
              {(["Daily", "Weekly", "Monthly", "Yearly"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setGrowthTrendTab(tab)}
                  className={`px-2 py-2 text-sm font-semibold leading-5 ${growthTrendTab === tab
                    ? "border-b-2 border-contentPrimary text-contentPrimary"
                    : "text-contentSecondary"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getGrowthTrendData(growthTrendTab).map((val, i) => ({ year: 2016 + i, value: val }))}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#F1F1F2" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 10, fill: '#71717A' }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#71717A' }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 200]}
                    ticks={[0, 50, 100, 150, 200]}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E4E4E7' }}
                    itemStyle={{ color: '#09090B', fontWeight: 600 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    dot={{ fill: "#14b8a6", stroke: "#fff", strokeWidth: 2, r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Widget 2: Active Dealer Goal */}
          <div className="flex h-[316px] flex-col rounded-lg border border-contentQuaternary bg-backgroundPrimary p-6">
            <div className="mb-4 text-base font-semibold leading-6 text-contentPrimary">Active Dealer Goal</div>
            <div className="mb-4 flex items-center border-b border-contentQuaternary">
              {(["Daily", "Weekly", "Monthly", "Yearly"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDealerGoalTab(tab)}
                  className={`px-2 py-2 text-sm font-semibold leading-5 ${dealerGoalTab === tab ? "border-b-2 border-contentPrimary text-contentPrimary" : "text-contentSecondary"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative flex w-full flex-1 items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {/* Background Track (Gray) */}
                  <Pie
                    data={[{ value: 100 }]}
                    cx="50%"
                    cy="85%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius="110%"
                    outerRadius="140%"
                    fill="#E4E4E7"
                    dataKey="value"
                    stroke="none"
                    isAnimationActive={false}
                  />
                  {/* Value Arc (Gradient) */}
                  <Pie
                    data={[
                      { value: { Daily: 84, Weekly: 82, Monthly: 80, Yearly: 78 }[dealerGoalTab] },
                      { value: 100 - ({ Daily: 84, Weekly: 82, Monthly: 80, Yearly: 78 }[dealerGoalTab]) }
                    ]}
                    cx="50%"
                    cy="85%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius="110%"
                    outerRadius="140%"
                    dataKey="value"
                    cornerRadius={10}
                    stroke="none"
                  >
                    <Cell fill="url(#gaugeGradient)" />
                    <Cell fill="none" />
                  </Pie>
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#0f766e" />
                    </linearGradient>
                  </defs>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-x-0 bottom-8 text-center">
                <div className="text-[40px] font-semibold leading-[48px] tracking-[-1px] text-contentPrimary">
                  {{ Daily: "84%", Weekly: "82%", Monthly: "80%", Yearly: "78%" }[dealerGoalTab]}
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3: Dealers by Edition */}
          <div className="flex h-[316px] flex-col rounded-lg border border-contentQuaternary bg-backgroundPrimary p-6">
            <div className="mb-4 text-base font-semibold leading-6 text-[#131313]">Dealers by Edition</div>
            <div className="mb-4 flex items-center border-b border-contentQuaternary">
              {(["Daily", "Weekly", "Monthly", "Yearly"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setEditionTab(tab)}
                  className={`px-2 py-2 text-sm font-semibold leading-5 ${editionTab === tab ? "border-b-2 border-contentPrimary text-contentPrimary" : "text-contentSecondary"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4">
              {(() => {
                const widths = {
                  Daily: { standard: "90%", premium: "65%", enterprise: "45%", basic: "30%" },
                  Weekly: { standard: "88%", premium: "63%", enterprise: "43%", basic: "28%" },
                  Monthly: { standard: "86%", premium: "61%", enterprise: "41%", basic: "26%" },
                  Yearly: { standard: "84%", premium: "59%", enterprise: "39%", basic: "24%" },
                }[editionTab];
                return ["Standard", "Premium", "Enterprise", "Basic"].map((type) => (
                  <div key={type} className="relative flex h-8 items-center rounded bg-gradient-to-r from-teal-500 to-teal-50 px-3" style={{ width: widths[type.toLowerCase() as keyof typeof widths] }}>
                    <span className="flex-1 text-sm font-medium leading-5 text-[#131313]">{type}</span>
                    <span className="text-xs font-medium leading-4 text-[#131313]">
                      {type === "Standard" ? "120k" : type === "Premium" ? "80k" : type === "Enterprise" ? "50k" : "30k"}
                    </span>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <Table
        data={currentDealers}
        columns={columns as any}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onRowCountChange={setItemsPerPage}
        onSearch={handleSearch}
        onFilter={handleFilter}
        getFilterBadgeColor={getFilterBadgeColor}
        onSort={handleSort}
        searchPlaceholder="Search for dealer code, dealer name"
      />
    </div>
  );
}
