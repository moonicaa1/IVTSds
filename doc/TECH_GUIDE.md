# TECH GUIDE
## Catalyst Docs & Pixel-Perfect Execution Standard

---

## 0. 목적과 범위
본 문서는 공통 레이아웃을 우선 고정한 뒤, 이후 Figma MCP 기반 화면 단위 코드화를 안정적으로 수행하기 위한 기술 집행 지침서다.  
본 프로젝트는 글로벌 AUTOMOTIVE 최고 수준의 에이전시가 제작한 것과 동일하거나 그 이상의 퀄리티를 목표로 한다.

---

## 1. 최우선 명제: 데이터 무결성 및 참조 표준

### 1.1 Reference Standard
- 모든 UI 아키텍처와 컴포넌트 패턴은 Catalyst Docs를 절대적 기술 표준으로 삼는다.
- Figma MCP를 통해 전달된 Variable, Props, Component 구조를 코드에서 그대로 재현한다.

### 1.2 Pixel-Perfect 원칙
- Figma 프레임에 정의된 모든 수치(Spacing, Color, Radius)는 토큰 기반으로 100% 반영한다.
- Catalyst 디자인 시스템 패턴 위에 이식하되, 임의 보정은 허용하지 않는다.

### 1.3 Zero Arbitrary Logic
- 모든 스타일 값은 Figma Variable 및 Tailwind Config에 정의된 토큰만 사용한다.
- 토큰으로 치환 불가능한 값이 발생할 경우 구현을 중단하고 보고한다.

---

## 2. 레이아웃 및 폴더 구조 (2026.01.15 Updated)

### 2.1 디렉토리 구조 (2026.01.14 Refined)
- **`app/`**: Next.js App Router (Pages, Layouts)
- **`components/`**: 공통 및 기능 컴포넌트
  - **`layout/`**: 전역/공통 레이아웃 (`Navbar`, `Sidebar` 등)
  - **`ui/`**: 재사용 가능한 UI 컴포넌트 (`Table` 등)
  - **`features/`**: 비즈니스 로직 및 도메인별 기능 (`MainContent` 등)
- **`lib/`**: 공용 라이브러리 및 유틸리티
  - **`contexts/`**: Context Provider (`SidebarContext` 등)
  - **`data/`**: 데이터 및 Mock Data
  - **`utils/`**: 유틸리티 함수 (`tokens.ts` 등)
- **`styles/`**: 스타일 파일
- **`tokens/`**: Design Tokens Raw JSON

### 2.2 AppShell 구조
- Header와 Sidebar(LNB)는 Catalyst 패턴에 따라 각각 독립 컴포넌트로 분리한다.
- 두 컴포넌트는 fixed 위치로 고정하며, 전역 레이아웃(Global Layout)으로 재사용한다.

### 2.2 Main Content 영역
- 메인 콘텐츠 영역은 overflow-y-auto를 기본으로 사용한다.
- 레이아웃 구조가 전환되는 지점에는 반드시 구조적 주석을 추가한다.

### 2.3 Grid & Responsive
- 모바일 퍼스트가 아닌 Grid 기반 레이아웃을 사용한다.
- Tailwind 반응형 유틸리티를 활용하되, 임의 breakpoint 정의는 허용하지 않는다.

---

## 3. 디자인 시스템 및 인터랙션 규칙

### 3.1 토큰 우선순위
- 인터랙션 코드나 샘플에 변칙 토큰이 존재하더라도, 반드시 Figma 토큰으로 강제 치환한다.
- 구현 후 코드 상의 토큰 일치 여부를 검증한다.

### 3.2 아이콘 표준 (New)
- 모든 UI 아이콘은 **[Heroicons](https://github.com/tailwindlabs/heroicons)** (v2) 라이브러리를 사용한다.
- 기본적으로 **Outline** 스타일(Stroke 1.5px)을 사용하며, Active/Filled 상태에서만 **Solid** 스타일을 사용한다.
- 로고, 국기(Flag) 등 특수 목적의 벡터 그래픽을 제외하고는 임의의 SVG 코드를 직접 작성하지 않는다.

### 3.2 텍스트 케이스 규칙

#### Title Case
- Page Title
- Section / Card Title
- Modal Title
- Table Header
- Breadcrumb

#### Sentence case
- Button / CTA
- Input Label
- Dropdown / Filter Label
- Checkbox / Toggle Label
- Placeholder
- Helper / Description
- Status / Badge
- Error / Success Message
- Inline Link

---

## 4. 컴포넌트 설계 원칙

### 4.1 공통 컴포넌트
- Header, Sidebar, Button, Card 등 공통 요소는 반드시 재사용 가능한 형태로 설계한다.
- 일회성 컴포넌트 생성을 지양한다.

### 4.2 모듈 컴포넌트
- 각 모듈은 독립적으로 재사용 가능한 컴포넌트 단위로 구성한다.
- 모듈별 톤앤매너는 다르되, UI 규칙과 인터랙션 패턴은 통일한다.

---

## 5. 애니메이션 및 인터랙션

- 애니메이션은 UX 흐름을 보조하는 수준으로 제한한다.
- 리스트 진입, 상태 전환 중심으로 사용한다.
- 공통 애니메이션 유틸 또는 전역 클래스 기반으로 구현한다.
- 과도한 모션, 임의 이징 정의는 허용하지 않는다.

---

## 6. 개발 기록 및 히스토리 관리

- 모든 구조 및 기능 변경에는 한글 주석으로 변경 이유와 날짜를 기록한다.
- 가능할 경우 작업 소요 시간(Time Taken)을 주석으로 남겨 생산성 추적에 활용한다.

---

## 7. 예외 상황 및 중단 기준 (Stop & Report)

다음 상황 발생 시 구현을 즉시 중단하고 사용자 승인을 받는다:
1. Figma 수치가 토큰과 매칭되지 않는 경우
2. 구현할 UI가 Catalyst Docs에 존재하지 않는 경우
3. 반응형(Breakpoint) 기준이 디자인에 명시되지 않은 경우

디자인에 정의되지 않은 Hover/Active 상태는 임의로 생성하지 않는다.

---

## 8. 단계별 실행 프로토콜

1. Audit  
   - Figma MCP 또는 figma_data.json을 통해 수치 데이터 추출

2. Mapping  
   - 추출된 수치와 Catalyst 패턴 간 1:1 매칭
   - 불일치 항목(Gap) 별도 표기

3. Implementation Plan  
   - Catalyst 구조 기반 구현 계획 수립

4. Validation  
   - 구현 결과와 Figma / Catalyst 패턴 간 최종 대조 및 보고
