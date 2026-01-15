# 프로젝트 작업 진행 내역

## 작업 개요
- **프로젝트명**: PP_ADMIN_02(CRUD Table) - Dealers 페이지
- **Figma 프레임 ID**: 4406:44380
- **시작일**: 2026-01-14
- **현재 상태**: Table Section 재구현 진행 중

---

## 작업 범위
현재 단계의 목적은 **공통 레이아웃 구조 확립**이며, 비즈니스 로직, 세부 기능 구현, 고도화 작업은 범위 외로 간주합니다.

---

## 완료된 작업

### 1. 공통 레이아웃 구조 (완료)
- **Header (Navbar)**: `app/components/Navbar.tsx`
  - Global Search 포함
  - 언어 선택, 알림, 사용자 프로필
- **Sidebar**: `app/components/Sidebar.tsx`
  - 축소/확장 기능
  - 즐겨찾기 메뉴
  - 다단계 메뉴 구조
- **AppShell**: `app/components/AppShell.tsx`
  - 공통 레이아웃 래퍼

### 2. Dealers 페이지 구조 (`app/page.tsx`)
#### 2-1. Page Header (완료)
- **Breadcrumb**: Home 아이콘 → Smart Test Drive → KPI Reports → Dealers
- **Page Title**: "Dealers"
- **Subtitle**: "Manage dealer information and settings"
- **Create Button**: "Create dealer" 버튼 (Plus 아이콘)

#### 2-2. KPI Section (완료)
- 3개 KPI 카드:
  1. **Active Dealers Now**: 125 Case (+2 /vs last mo)
  2. **Pending Approvals**: 8 Case (+1 /vs last mo)
  3. **New Registrations**: 45 Case (+5 /vs last mo)
- 각 카드에 Badge (trending 아이콘, 색상, 텍스트)
- **변경 사항 (2026-01-14)**: 아이콘 박스 제거 (사용자 요청)

#### 2-3. Graph Box Section (완료)
- 3개 위젯 (각 505px × 316px):
  1. **Dealer Growth Trend**
     - 탭: Daily, Weekly, Monthly, Yearly
     - Line Chart (SVG 기반)
     - Teal 그라데이션 선과 영역
     - 데이터 포인트 마커
     - 탭별 동적 데이터 변경
  2. **Active Dealer Goal**
     - 탭: Daily, Weekly, Monthly, Yearly
     - Semi-circular Progress Bar (SVG 기반)
     - Teal 그라데이션 아크
     - 퍼센트 표시 (탭별로 84%, 82%, 80%, 78%)
  3. **Dealers by Edition**
     - 탭: Daily, Weekly, Monthly, Yearly
     - Bar Chart (4개 항목: Standard, Premium, Enterprise, Basic)
     - Teal 그라데이션 바
     - 탭별 동적 너비 변경

**구현 상세**:
- Client Component로 변환 (`"use client"`)
- 탭 상태 관리 (`useState`)
- SVG 기반 차트 구현
- Figma 디자인 픽셀 퍼펙트 반영

#### 2-4. Table Section (재구현 진행 중)
- **현재 상태**: Figma 디자인 기준으로 재구현 중
- **데이터 구조 업데이트**: Figma 테이블 구조에 맞춘 dealer 데이터
  ```typescript
  {
    id, code, name, edition, dealerType, 
    sideMenuSet, active, creationTime, email
  }
  ```
- **필요 작업**:
  - Table Header (체크박스, Dealer Code, Name, Edition, Dealer Type, Side Menu Set, Active, Creation Time)
  - Table Setting 섹션 (Search Bar, 필터 입력 필드들, Edit columns 버튼, Excel 버튼)
  - Striped Rows (56px height)
  - Row 데이터 렌더링 (Badge, Description 포함)
  - Actions 드롭다운
  - Expandable rows (chevron-right 아이콘)

#### 2-5. Pagination (기본 구조 있음)
- Row Count 드롭다운
- 페이지 번호 버튼
- 이전/다음 버튼
- **상태**: Figma 디자인에 맞춰 수정 필요

---

## 기술 스택 및 구조
- **프레임워크**: Next.js (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS (토큰 기반)
- **상태 관리**: React `useState`
- **컴포넌트 구조**: 
  - 공통 컴포넌트: `app/components/`
  - 페이지 컴포넌트: `app/page.tsx`
  - Context: `app/contexts/SidebarContext.tsx`

---

## 디자인 기준
- **토큰 기반 스타일링**: 모든 스타일 값은 Figma Variable 및 Tailwind Config 토큰 사용
- **Pixel-Perfect**: Figma 프레임 수치(Spacing, Color, Radius) 100% 반영
- **디자인 시스템**: Catalyst Docs 기준

---

## 주의 사항 및 변경 이력

### 2026-01-14
1. **KPI Section 아이콘 제거**
   - 사유: 사용자 요청 ("컴포넌트에는 아이콘은 없어")
   - 변경: Icon Box 및 관련 SVG 제거, 레이아웃을 `flex-col`로 조정

2. **Graph Section 그래프 구현**
   - 사유: 사용자 요청 ("그래프도 없고 daily weekly monthly 다 적용도 안 돼")
   - 변경: Client Component로 변환, 탭 상태 관리 추가, SVG 기반 차트 구현

3. **그래프 색상 및 반원형 그래프 추가**
   - 사유: 사용자 요청 ("선택한 그래프 컴포넌트와 동일하게 색도 들어가게 해줘 active dealer goal에는 반원형 그래프? 더 넣어주고")
   - 변경: Line Chart에 teal 그라데이션 및 데이터 포인트 마커 추가, Active Dealer Goal에 semi-circular progress bar 추가

---

## 다음 작업 예정
1. **Table Section 완전 재구현**
   - Figma 디자인 기준 Table Header, Table Setting, Striped Rows 구현
   - Row 데이터 렌더링 (Badge, Description 포함)
   - Actions 드롭다운 구현
2. **Pagination 디자인 반영**
   - Figma 디자인에 맞춘 Row Count 드롭다운 및 페이지 버튼 스타일

---

## 참고 문서
- `/doc/TECH_GUIDE.md`: 기술 가이드 및 구현 기준
- `/doc/TROUBLESHOOTING.md`: 문제 해결 및 중단 규칙
- `.cursorrules`: Cursor 작업 행동 규칙
