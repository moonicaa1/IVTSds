/**
 * @file mockData.ts
 * @description 애플리케이션 데모 및 개발을 위한 가상 데이터 정의 파일입니다.
 * 딜러 정보 구조(Dealer) 및 초기 데이터셋을 포함합니다.
 */

/**
 * @interface Dealer
 * @description 시스템에서 관리하는 딜러 객체의 데이터 구조입니다.
 */
export interface Dealer {
    id: number;
    code: string;
    name: string;
    edition: string;
    dealerType: string;
    sideMenuSet: string;
    active: "Active" | "Inactive";
    creationTime: string;
    email: string;
    region?: string;
    totalSales?: number;
    lastUpdated?: string;
    status?: string;
    subRows?: Dealer[];
}

export const DEALERS_DATA: Dealer[] = [
    {
        id: 1,
        code: "A11AD70701",
        name: "Metro Vehicle Agency",
        edition: "DLR",
        dealerType: "Standard",
        sideMenuSet: "SSC",
        active: "Active",
        creationTime: "2024.02.25",
        email: "jane.cooper@example.com",
        region: "Seoul",
        totalSales: 1250000,
        lastUpdated: "2 min ago",
        status: "Active",
        subRows: [
            { id: 101, code: "A11AD70701-1", name: "Metro Branch A", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.02.25", email: "branch.a@example.com", region: "Seoul", totalSales: 500000, lastUpdated: "2 min ago", status: "Active" },
            { id: 102, code: "A11AD70701-2", name: "Metro Branch B", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.02.25", email: "branch.b@example.com", region: "Seoul", totalSales: 750000, lastUpdated: "5 min ago", status: "Inactive" }
        ]
    },
    {
        id: 2,
        code: "A11AD50502",
        name: "Seoul Motor Group",
        edition: "DGP",
        dealerType: "Premium",
        sideMenuSet: "SSC",
        active: "Active",
        creationTime: "2024.03.20",
        email: "seoul.motor@example.com",
        region: "Busan",
        totalSales: 980000,
        lastUpdated: "1 hour ago",
        status: "Active",
        subRows: [
            { id: 201, code: "A11AD50502-1", name: "Busan Center", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Active", creationTime: "2024.03.20", email: "busan.center@example.com", region: "Busan", totalSales: 400000, lastUpdated: "1 hour ago", status: "Active" },
            { id: 202, code: "A11AD50502-2", name: "Haeundae Center", edition: "DGP", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.03.25", email: "haeundae@example.com", region: "Busan", totalSales: 300000, lastUpdated: "2 hours ago", status: "Active" }
        ]
    },
    { id: 3, code: "A11AD60612", name: "Green Energy Motors", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.04.01", email: "green@example.com", region: "Incheon", totalSales: 450000, lastUpdated: "1 day ago", status: "Inactive" },
    { id: 4, code: "A11AD60603", name: "Urban Mobility Hub", edition: "DGP", dealerType: "Standard", sideMenuSet: "Genesis", active: "Inactive", creationTime: "2024.05.10", email: "urban@example.com", region: "Daegu", totalSales: 320000, lastUpdated: "2 days ago", status: "Inactive" },
    { id: 5, code: "A11AD70701", name: "Metro Vehicle Agency", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.06.05", email: "metro@example.com", region: "Gwangju", totalSales: 890000, lastUpdated: "3 days ago", status: "Active" },
    { id: 6, code: "A11AD50502", name: "Seoul Motor Group", edition: "DGP", dealerType: "Premium", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.08.30", email: "seoul@example.com", region: "Daejeon", totalSales: 1100000, lastUpdated: "4 days ago", status: "Active" },
    {
        id: 7,
        code: "A11AD60601",
        name: "Elite Drive Systems",
        edition: "DLR",
        dealerType: "Enterprise",
        sideMenuSet: "Genesis",
        active: "Active",
        creationTime: "2024.02.12",
        email: "elite@example.com",
        region: "Ulsan",
        totalSales: 2100000,
        lastUpdated: "1 week ago",
        status: "Active",
        subRows: [
            { id: 701, code: "A11AD60601-1", name: "Ulsan Main", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.02.12", email: "ulsan.main@example.com", region: "Ulsan", totalSales: 1500000, lastUpdated: "1 week ago", status: "Active" },
            { id: 702, code: "A11AD60601-2", name: "Ulsan South", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Inactive", creationTime: "2024.02.15", email: "ulsan.south@example.com", region: "Ulsan", totalSales: 600000, lastUpdated: "1 week ago", status: "Inactive" }
        ]
    },
    { id: 8, code: "A11AD70701", name: "Metro Vehicle Agency", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.11.05", email: "metro.gj@example.com", region: "Sejong", totalSales: 670000, lastUpdated: "1 week ago", status: "Active" },
    { id: 9, code: "A11AD50502", name: "Seoul Motor Group", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Active", creationTime: "2025.12.18", email: "seoul.jj@example.com", region: "Jeju", totalSales: 540000, lastUpdated: "2 weeks ago", status: "Active" },
    { id: 10, code: "A11AD60601", name: "Elite Drive Systems", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.02.12", email: "elite.suwon@example.com", region: "Suwon", totalSales: 1800000, lastUpdated: "1 month ago", status: "Active" },

    // Additional Records (11-50) - Sanitized Side Menu Set
    { id: 11, code: "A11AD80801", name: "Apex Auto Solutions", edition: "DGP", dealerType: "Premium", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.01.10", email: "apex@example.com", region: "Seoul", totalSales: 920000, lastUpdated: "10 mins ago", status: "Active", subRows: [{ id: 1101, code: "A11AD80801-1", name: "Apex Seoul", edition: "DGP", dealerType: "Premium", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.01.10", email: "apex.seoul@example.com", region: "Seoul", totalSales: 920000, lastUpdated: "10 mins ago", status: "Active" }] },
    { id: 12, code: "A11AD80802", name: "Blue Ridge Motors", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.01.15", email: "blue@example.com", region: "Busan", totalSales: 310000, lastUpdated: "2 hours ago", status: "Inactive" },
    { id: 13, code: "A11AD80803", name: "Cyber Drive Ltd", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.01.20", email: "cyber@example.com", region: "Incheon", totalSales: 1850000, lastUpdated: "5 hours ago", status: "Active" },
    { id: 14, code: "A11AD80804", name: "Delta Works", edition: "DLR", dealerType: "Standard", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.01.25", email: "delta@example.com", region: "Daegu", totalSales: 660000, lastUpdated: "1 day ago", status: "Active", subRows: [{ id: 1401, code: "A11AD80804-1", name: "Delta Daegu", edition: "DLR", dealerType: "Standard", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.01.25", email: "delta.daegu@example.com", region: "Daegu", totalSales: 660000, lastUpdated: "1 day ago", status: "Active" }] },
    { id: 15, code: "A11AD80805", name: "Echo Vehicle Systems", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.01.28", email: "echo@example.com", region: "Gwangju", totalSales: 780000, lastUpdated: "2 days ago", status: "Inactive" },
    { id: 16, code: "A11AD80806", name: "Falcon Motors", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.02.01", email: "falcon@example.com", region: "Daejeon", totalSales: 290000, lastUpdated: "3 days ago", status: "Active" },
    { id: 17, code: "A11AD80807", name: "Galaxy Car Center", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.02.05", email: "galaxy@example.com", region: "Ulsan", totalSales: 2200000, lastUpdated: "4 days ago", status: "Active" },
    { id: 18, code: "A11AD80808", name: "Horizon Auto", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.02.10", email: "horizon@example.com", region: "Sejong", totalSales: 550000, lastUpdated: "5 days ago", status: "Inactive", subRows: [{ id: 1801, code: "A11AD80808-1", name: "Horizon Sejong", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.02.10", email: "horizon.sejong@example.com", region: "Sejong", totalSales: 550000, lastUpdated: "5 days ago", status: "Inactive" }] },
    { id: 19, code: "A11AD80809", name: "Ironclad Vehicles", edition: "DGP", dealerType: "Premium", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.02.15", email: "ironclad@example.com", region: "Jeju", totalSales: 1150000, lastUpdated: "6 days ago", status: "Active" },
    { id: 20, code: "A11AD80810", name: "Jetstream Motors", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.02.18", email: "jetstream@example.com", region: "Suwon", totalSales: 480000, lastUpdated: "1 week ago", status: "Active" },
    { id: 21, code: "A11AD90901", name: "Kinetix Auto", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.02.20", email: "kinetix@example.com", region: "Changwon", totalSales: 1950000, lastUpdated: "10 mins ago", status: "Active" },
    { id: 22, code: "A11AD90902", name: "Lunar Drive", edition: "DLR", dealerType: "Standard", sideMenuSet: "Genesis", active: "Inactive", creationTime: "2024.02.22", email: "lunar@example.com", region: "Goyang", totalSales: 620000, lastUpdated: "20 mins ago", status: "Inactive" },
    { id: 23, code: "A11AD90903", name: "Matrix Motors", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Active", creationTime: "2024.02.25", email: "matrix@example.com", region: "Yongin", totalSales: 1350000, lastUpdated: "30 mins ago", status: "Active" },
    { id: 24, code: "A11AD90904", name: "Nebula Cars", edition: "DLR", dealerType: "Basic", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.02.28", email: "nebula@example.com", region: "Seongnam", totalSales: 410000, lastUpdated: "1 hour ago", status: "Active" },
    { id: 25, code: "A11AD90905", name: "Omega Auto Group", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.03.01", email: "omega@example.com", region: "Bucheon", totalSales: 1750000, lastUpdated: "2 hours ago", status: "Inactive", subRows: [{ id: 2501, code: "A11AD90905-1", name: "Omega Bucheon", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.03.01", email: "omega.bucheon@example.com", region: "Bucheon", totalSales: 1750000, lastUpdated: "2 hours ago", status: "Inactive" }] },
    { id: 26, code: "A11AD90906", name: "Pulsar Vehicles", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.03.05", email: "pulsar@example.com", region: "Cheongju", totalSales: 700000, lastUpdated: "3 hours ago", status: "Active" },
    { id: 27, code: "A11AD90907", name: "Quantum Drive", edition: "DGP", dealerType: "Premium", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.03.10", email: "quantum@example.com", region: "Ansan", totalSales: 1050000, lastUpdated: "4 hours ago", status: "Active" },
    { id: 28, code: "A11AD90908", name: "Radial Motors", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.03.12", email: "radial@example.com", region: "Jeonju", totalSales: 380000, lastUpdated: "5 hours ago", status: "Inactive" },
    { id: 29, code: "A11AD90909", name: "Stellar Auto", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.03.15", email: "stellar@example.com", region: "Cheonan", totalSales: 2050000, lastUpdated: "6 hours ago", status: "Active", subRows: [{ id: 2901, code: "A11AD90909-1", name: "Stellar Cheonan", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.03.15", email: "stellar.cheonan@example.com", region: "Cheonan", totalSales: 2050000, lastUpdated: "6 hours ago", status: "Active" }] },
    { id: 30, code: "A11AD90910", name: "Terra Vehicles", edition: "DLR", dealerType: "Standard", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.03.18", email: "terra@example.com", region: "Namyangju", totalSales: 590000, lastUpdated: "1 day ago", status: "Active" },
    { id: 31, code: "A11AD10101", name: "Unity Motors", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.03.20", email: "unity@example.com", region: "Hwaseong", totalSales: 880000, lastUpdated: "2 days ago", status: "Inactive" },
    { id: 32, code: "A11AD10102", name: "Vertex Auto", edition: "DLR", dealerType: "Basic", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.03.22", email: "vertex@example.com", region: "Anyang", totalSales: 440000, lastUpdated: "3 days ago", status: "Active" },
    { id: 33, code: "A11AD10103", name: "Warp Drive Ltd", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.03.25", email: "warp@example.com", region: "Gimhae", totalSales: 2150000, lastUpdated: "4 days ago", status: "Active", subRows: [{ id: 3301, code: "A11AD10103-1", name: "Gimhae Branch", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.03.25", email: "warp.branch@example.com", region: "Gimhae", totalSales: 500000, lastUpdated: "4 days ago", status: "Active" }] },
    { id: 34, code: "A11AD10104", name: "Xenon Motors", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.03.28", email: "xenon@example.com", region: "Pyeongtaek", totalSales: 530000, lastUpdated: "5 days ago", status: "Inactive" },
    { id: 35, code: "A11AD10105", name: "Yellowstone Auto", edition: "DGP", dealerType: "Premium", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.03.30", email: "yellow@example.com", region: "Uijeongbu", totalSales: 960000, lastUpdated: "6 days ago", status: "Active" },
    { id: 36, code: "A11AD10106", name: "Zephyr Cars", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.04.02", email: "zephyr@example.com", region: "Siheung", totalSales: 350000, lastUpdated: "1 week ago", status: "Active" },
    { id: 37, code: "A11AD10107", name: "Aria Motors", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.04.05", email: "aria@example.com", region: "Paju", totalSales: 1650000, lastUpdated: "1 week ago", status: "Inactive" },
    { id: 38, code: "A11AD10108", name: "Beacon Auto", edition: "DLR", dealerType: "Standard", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.04.08", email: "beacon@example.com", region: "Gimpo", totalSales: 680000, lastUpdated: "1 week ago", status: "Active", subRows: [{ id: 3801, code: "A11AD10108-1", name: "Beacon Gimpo", edition: "DLR", dealerType: "Standard", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.04.08", email: "beacon.gimpo@example.com", region: "Gimpo", totalSales: 680000, lastUpdated: "1 week ago", status: "Active" }] },
    { id: 39, code: "A11AD10109", name: "Comet Vehicles", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Active", creationTime: "2024.04.10", email: "comet@example.com", region: "Gwangmyeong", totalSales: 1250000, lastUpdated: "2 weeks ago", status: "Active" },
    { id: 40, code: "A11AD10110", name: "Dynamo Drive", edition: "DLR", dealerType: "Basic", sideMenuSet: "Genesis", active: "Inactive", creationTime: "2024.04.12", email: "dynamo@example.com", region: "Gwangju (Gyeonggi)", totalSales: 390000, lastUpdated: "2 weeks ago", status: "Inactive" },
    { id: 41, code: "A11AD10111", name: "Eclipse Autos", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.04.15", email: "eclipse@example.com", region: "Wonju", totalSales: 1900000, lastUpdated: "2 weeks ago", status: "Active" },
    { id: 42, code: "A11AD10112", name: "Flux Motors", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.04.18", email: "flux@example.com", region: "Jinju", totalSales: 610000, lastUpdated: "3 weeks ago", status: "Active" },
    { id: 43, code: "A11AD10113", name: "Graviton Auto", edition: "DGP", dealerType: "Premium", sideMenuSet: "Genesis", active: "Inactive", creationTime: "2024.04.20", email: "graviton@example.com", region: "Asan", totalSales: 940000, lastUpdated: "3 weeks ago", status: "Inactive", subRows: [{ id: 4301, code: "A11AD10113-1", name: "Graviton Asan", edition: "DGP", dealerType: "Premium", sideMenuSet: "Genesis", active: "Inactive", creationTime: "2024.04.20", email: "graviton.asan@example.com", region: "Asan", totalSales: 940000, lastUpdated: "3 weeks ago", status: "Inactive" }] },
    { id: 44, code: "A11AD10114", name: "Helix Vehicles", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.04.22", email: "helix@example.com", region: "Gumi", totalSales: 420000, lastUpdated: "1 month ago", status: "Active" },
    { id: 45, code: "A11AD10115", name: "Ion Drive", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.04.25", email: "ion@example.com", region: "Iksan", totalSales: 2300000, lastUpdated: "1 month ago", status: "Active" },
    { id: 46, code: "A11AD10116", name: "Joule Motors", edition: "DLR", dealerType: "Standard", sideMenuSet: "Genesis", active: "Inactive", creationTime: "2024.04.28", email: "joule@example.com", region: "Yeosu", totalSales: 580000, lastUpdated: "1 month ago", status: "Inactive" },
    { id: 47, code: "A11AD10117", name: "Kelvin Auto", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Active", creationTime: "2024.05.01", email: "kelvin@example.com", region: "Suncheon", totalSales: 1080000, lastUpdated: "1 month ago", status: "Active" },
    { id: 48, code: "A11AD10118", name: "Lumen Vehicles", edition: "DLR", dealerType: "Basic", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.05.05", email: "lumen@example.com", region: "Gunsan", totalSales: 370000, lastUpdated: "2 months ago", status: "Active" },
    { id: 49, code: "A11AD10119", name: "Magneton Motors", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.05.10", email: "magneton@example.com", region: "Chuncheon", totalSales: 1800000, lastUpdated: "2 months ago", status: "Inactive" },
    { id: 50, code: "A11AD10120", name: "Neutron Auto", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.05.15", email: "neutron@example.com", region: "Gyeongju", totalSales: 640000, lastUpdated: "2 months ago", status: "Active" },

    // Additional Expanded Rows (51-80) with sub-rows
    {
        id: 51, code: "A11AD10121", name: "Omni Motors", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.05.20", email: "omni@example.com", region: "Mokpo", totalSales: 2200000, lastUpdated: "2 months ago", status: "Active", subRows: [
            { id: 5101, code: "A11AD10121-1", name: "Omni North", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.05.20", email: "omni.north@example.com", region: "Mokpo", totalSales: 1000000, lastUpdated: "2 months ago", status: "Active" },
            { id: 5102, code: "A11AD10121-2", name: "Omni South", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.05.22", email: "omni.south@example.com", region: "Mokpo", totalSales: 1200000, lastUpdated: "2 months ago", status: "Inactive" }
        ]
    },
    { id: 52, code: "A11AD10122", name: "Proton Auto", edition: "DLR", dealerType: "Standard", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.05.25", email: "proton@example.com", region: "Gangneung", totalSales: 600000, lastUpdated: "2 months ago", status: "Active" },
    { id: 53, code: "A11AD10123", name: "Quasar Vehicles", edition: "DGP", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.06.01", email: "quasar@example.com", region: "Chungju", totalSales: 330000, lastUpdated: "3 months ago", status: "Active", subRows: [{ id: 5301, code: "A11AD10123-1", name: "Quasar Branch", edition: "DGP", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.06.01", email: "quasar.br@example.com", region: "Chungju", totalSales: 330000, lastUpdated: "3 months ago", status: "Active" }] },
    { id: 54, code: "A11AD10124", name: "Radian Drive", edition: "DLR", dealerType: "Premium", sideMenuSet: "Genesis", active: "Inactive", creationTime: "2024.06.05", email: "radian@example.com", region: "Gimcheon", totalSales: 850000, lastUpdated: "3 months ago", status: "Inactive" },
    { id: 55, code: "A11AD10125", name: "Synergy Motors", edition: "DGP", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.06.10", email: "synergy@example.com", region: "Andong", totalSales: 720000, lastUpdated: "3 months ago", status: "Active", subRows: [{ id: 5501, code: "A11AD10125-1", name: "Synergy Remote", edition: "DGP", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.06.10", email: "synergy.rem@example.com", region: "Andong", totalSales: 720000, lastUpdated: "3 months ago", status: "Active" }] },
    { id: 56, code: "A11AD10126", name: "Tachyon Auto", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.06.15", email: "tachyon@example.com", region: "Pocheon", totalSales: 1950000, lastUpdated: "3 months ago", status: "Active" },
    { id: 57, code: "A11AD10127", name: "Umbra Vehicles", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.06.20", email: "umbra@example.com", region: "Yangju", totalSales: 980000, lastUpdated: "4 months ago", status: "Inactive", subRows: [{ id: 5701, code: "A11AD10127-1", name: "Umbra Yangju", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.06.20", email: "umbra.y@example.com", region: "Yangju", totalSales: 980000, lastUpdated: "4 months ago", status: "Inactive" }] },
    { id: 58, code: "A11AD10128", name: "Vortex Motors", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.06.25", email: "vortex@example.com", region: "Osan", totalSales: 400000, lastUpdated: "4 months ago", status: "Active" },
    { id: 59, code: "A11AD10129", name: "Wavefront Auto", edition: "DGP", dealerType: "Standard", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.06.30", email: "wavefront@example.com", region: "Hanam", totalSales: 670000, lastUpdated: "4 months ago", status: "Active" },
    { id: 60, code: "A11AD10130", name: "X-Ray Drive", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.07.05", email: "xray@example.com", region: "Icheon", totalSales: 2100000, lastUpdated: "5 months ago", status: "Inactive", subRows: [{ id: 6001, code: "A11AD10130-1", name: "X-Ray Icheon", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.07.05", email: "xray.ich@example.com", region: "Icheon", totalSales: 2100000, lastUpdated: "5 months ago", status: "Inactive" }] },
    {
        id: 61, code: "A11AD10131", name: "Yield Motors", edition: "DGP", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.07.10", email: "yield@example.com", region: "Yangsan", totalSales: 350000, lastUpdated: "5 months ago", status: "Active", subRows: [
            { id: 6101, code: "A11AD10131-1", name: "Yield Yangsan A", edition: "DGP", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.07.10", email: "yield.a@example.com", region: "Yangsan", totalSales: 150000, lastUpdated: "5 months ago", status: "Active" },
            { id: 6102, code: "A11AD10131-2", name: "Yield Yangsan B", edition: "DGP", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.07.12", email: "yield.b@example.com", region: "Yangsan", totalSales: 200000, lastUpdated: "5 months ago", status: "Active" }
        ]
    },
    { id: 62, code: "A11AD10132", name: "Zenith Auto", edition: "DLR", dealerType: "Standard", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.07.15", email: "zenith@example.com", region: "Geoje", totalSales: 620000, lastUpdated: "5 months ago", status: "Active" },
    { id: 63, code: "A11AD10133", name: "Alpha Global", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.07.20", email: "alpha@example.com", region: "Tongyeong", totalSales: 890000, lastUpdated: "6 months ago", status: "Inactive" },
    { id: 64, code: "A11AD10134", name: "Beta Systems", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.07.25", email: "beta@example.com", region: "Sacheon", totalSales: 2300000, lastUpdated: "6 months ago", status: "Active", subRows: [{ id: 6401, code: "A11AD10134-1", name: "Beta Sacheon", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.07.25", email: "beta.sac@example.com", region: "Sacheon", totalSales: 2300000, lastUpdated: "6 months ago", status: "Active" }] },
    { id: 65, code: "A11AD10135", name: "Gamma Tech", edition: "DGP", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.07.30", email: "gamma@example.com", region: "Miryang", totalSales: 750000, lastUpdated: "6 months ago", status: "Active" },
    { id: 66, code: "A11AD10136", name: "Delta Dynamics", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.08.05", email: "delta.dyn@example.com", region: "Gimje", totalSales: 310000, lastUpdated: "7 months ago", status: "Active", subRows: [{ id: 6601, code: "A11AD10136-1", name: "Delta Gimje", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.08.05", email: "delta.gimje@example.com", region: "Gimje", totalSales: 310000, lastUpdated: "7 months ago", status: "Active" }] },
    { id: 67, code: "A11AD10137", name: "Epsilon Energy", edition: "DGP", dealerType: "Premium", sideMenuSet: "Genesis", active: "Inactive", creationTime: "2024.08.10", email: "epsilon@example.com", region: "Namwon", totalSales: 1100000, lastUpdated: "7 months ago", status: "Inactive" },
    { id: 68, code: "A11AD10138", name: "Zeta Zone", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.08.15", email: "zeta@example.com", region: "Jeongeup", totalSales: 1800000, lastUpdated: "7 months ago", status: "Active" },
    { id: 69, code: "A11AD10139", name: "Eta Engineering", edition: "DGP", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.08.20", email: "eta@example.com", region: "Naju", totalSales: 660000, lastUpdated: "8 months ago", status: "Active", subRows: [{ id: 6901, code: "A11AD10139-1", name: "Eta Naju", edition: "DGP", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.08.20", email: "eta.naju@example.com", region: "Naju", totalSales: 660000, lastUpdated: "8 months ago", status: "Active" }] },
    { id: 70, code: "A11AD10140", name: "Theta Corp", edition: "DLR", dealerType: "Basic", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.08.25", email: "theta@example.com", region: "Gwangyang", totalSales: 430000, lastUpdated: "8 months ago", status: "Active" },
    { id: 71, code: "A11AD10141", name: "Iota Industries", edition: "DGP", dealerType: "Premium", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.08.30", email: "iota@example.com", region: "Sokcho", totalSales: 940000, lastUpdated: "9 months ago", status: "Inactive" },
    {
        id: 72, code: "A11AD10142", name: "Kappa Motors", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.09.05", email: "kappa@example.com", region: "Donghae", totalSales: 2500000, lastUpdated: "9 months ago", status: "Active", subRows: [
            { id: 7201, code: "A11AD10142-1", name: "Kappa Donghae", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.09.05", email: "kappa.donghae@example.com", region: "Donghae", totalSales: 1250000, lastUpdated: "9 months ago", status: "Active" },
            { id: 7202, code: "A11AD10142-2", name: "Kappa Samcheok", edition: "DLR", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.09.07", email: "kappa.samcheok@example.com", region: "Samcheok", totalSales: 1250000, lastUpdated: "9 months ago", status: "Active" }
        ]
    },
    { id: 73, code: "A11AD10143", name: "Lambda Logistics", edition: "DGP", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.09.10", email: "lambda@example.com", region: "Taebaek", totalSales: 550000, lastUpdated: "9 months ago", status: "Active" },
    { id: 74, code: "A11AD10144", name: "Mu Mobility", edition: "DLR", dealerType: "Basic", sideMenuSet: "SSC", active: "Active", creationTime: "2024.09.15", email: "mu@example.com", region: "Boryeong", totalSales: 290000, lastUpdated: "10 months ago", status: "Active" },
    { id: 75, code: "A11AD10145", name: "Nu Networks", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.09.20", email: "nu@example.com", region: "Gongju", totalSales: 1850000, lastUpdated: "10 months ago", status: "Active", subRows: [{ id: 7501, code: "A11AD10145-1", name: "Nu Gongju", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.09.20", email: "nu.gongju@example.com", region: "Gongju", totalSales: 1850000, lastUpdated: "10 months ago", status: "Active" }] },
    { id: 76, code: "A11AD10146", name: "Xi Systems", edition: "DLR", dealerType: "Premium", sideMenuSet: "SSC", active: "Inactive", creationTime: "2024.09.25", email: "xi@example.com", region: "Nonsan", totalSales: 1150000, lastUpdated: "11 months ago", status: "Inactive" },
    { id: 77, code: "A11AD10147", name: "Omicron Autos", edition: "DGP", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.10.01", email: "omicron@example.com", region: "Seosan", totalSales: 680000, lastUpdated: "11 months ago", status: "Active" },
    { id: 78, code: "A11AD10148", name: "Pi Performance", edition: "DLR", dealerType: "Basic", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.10.05", email: "pi@example.com", region: "Dangjin", totalSales: 370000, lastUpdated: "11 months ago", status: "Active", subRows: [{ id: 7801, code: "A11AD10148-1", name: "Pi Dangjin", edition: "DLR", dealerType: "Basic", sideMenuSet: "Genesis", active: "Active", creationTime: "2024.10.05", email: "pi.dangjin@example.com", region: "Dangjin", totalSales: 370000, lastUpdated: "11 months ago", status: "Active" }] },
    { id: 79, code: "A11AD10149", name: "Rho Racing", edition: "DGP", dealerType: "Enterprise", sideMenuSet: "SSC", active: "Active", creationTime: "2024.10.10", email: "rho@example.com", region: "Gyeryong", totalSales: 2150000, lastUpdated: "1 year ago", status: "Active" },
    { id: 80, code: "A11AD10150", name: "Sigma Speed", edition: "DLR", dealerType: "Standard", sideMenuSet: "SSC", active: "Active", creationTime: "2024.10.15", email: "sigma@example.com", region: "Yeoju", totalSales: 710000, lastUpdated: "1 year ago", status: "Active" }
];

export const getGrowthTrendData = (tab: "Daily" | "Weekly" | "Monthly" | "Yearly") => {
    if (tab === "Daily") {
        return [120, 135, 110, 145, 130, 150, 140, 160];
    } else if (tab === "Weekly") {
        return [100, 120, 140, 130, 150, 160, 155, 170];
    } else if (tab === "Monthly") {
        return [80, 100, 120, 140, 150, 160, 170, 180];
    } else {
        return [50, 70, 90, 110, 130, 150, 170, 190];
    }
};

/**
 * @interface Document
 * @description 시스템에서 관리하는 문서 객체의 데이터 구조입니다.
 */
export interface Document {
    id: number;
    docId: string;
    name: string;
    category: string;
    owner: string;
}

export const DOCUMENTS_DATA: Document[] = [
    { id: 1, docId: "DE-2024-001", name: "Privacy Policy.pdf", category: "Legal", owner: "admin" },
    { id: 2, docId: "DE-2024-002", name: "Terms of Service.pdf", category: "Legal", owner: "admin" },
    { id: 3, docId: "DE-2024-003", name: "User Manual.pdf", category: "Product", owner: "user" },
    { id: 4, docId: "DE-2024-004", name: "Release Notes.pdf", category: "Product", owner: "developer" },
    { id: 5, docId: "DE-2024-005", name: "API Documentation.pdf", category: "Technical", owner: "developer" },
    { id: 6, docId: "DE-2024-006", name: "Security Audit Report.pdf", category: "Legal", owner: "admin" },
    { id: 7, docId: "DE-2024-007", name: "Marketing Strategy.pdf", category: "Product", owner: "user" },
    { id: 8, docId: "DE-2024-008", name: "System Architecture.pdf", category: "Technical", owner: "developer" },
    { id: 9, docId: "DE-2024-009", name: "Meeting Minutes.pdf", category: "Internal", owner: "admin" },
    { id: 10, docId: "DE-2024-010", name: "Project Plan.pdf", category: "Internal", owner: "admin" },
];
