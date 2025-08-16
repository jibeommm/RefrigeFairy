# 냉장고 요정 프로젝트

## 프로젝트 개요

냉장고 요정 프로젝트는 사용자가 냉장고에 보관 중인 식품을 손쉽게 관리하고, 유통기한 임박 및 재고 부족 알림을 통해 식품 관리를 효율적으로 돕는 웹 애플리케이션입니다. 바코드 인식과 외부 API 연동으로 자동으로 식품 정보를 등록하고, 다양한 필터 기능 및 실시간 데이터 갱신을 지원합니다.

## 폴더 구조

```
project/
├── src/
│ ├── api/ # 외부 API 연동 관련 코드
│ ├── assets/ # 이미지, 아이콘
│ ├── components/ # 재사용 가능한 UI 컴포넌트 모음
│ │ ├── BarcodeInput # 바코드 입력 컴포넌트
│ │ ├── DBadge # 알림 배지 컴포넌트
│ │ ├── QPercent # 퍼센트 표시 컴포넌트
│ │ ├── FoodDetail # 식품 상세 정보 컴포넌트
│ │ ├── Header # 헤더 컴포넌트
│ │ ├── Popover # 팝오버 UI 컴포넌트
│ │ ├── QuantityControl # 수량 조절 컴포넌트
│ ├── data/ # 샘플 데이터 등록
│ ├── hooks/ 
│ ├── pages/ 
│ │ ├── HomePage # 홈 페이지
│ │ ├── NotificationsPage # 알림 페이지
│ │ ├── RegisterFood # 식품 등록 페이지
│ │ ├── ProductDetailPage # 수정 페이지
│ │ ├── StoragePage # 보관 리스트 페이지
│ ├── stores/ # Zustand 전역 상태 관리 코드
│ ├── types/ # TypeScript 타입 정의
│ ├── utils/ # 공통 유틸리티 함수 모음
│ ├── App.tsx # 애플리케이션 최상위 컴포넌트
│ ├── main.tsx # 애플리케이션 진입점 파일
├── .env # API 키와 환경 변수 파일
```

## 페이지 소개

### 1. 홈 페이지 (HomePage)

<img width="1258" height="952" alt="image" src="https://github.com/user-attachments/assets/21bede33-0995-4fe7-aa76-f50032010bea" />

- 바코드 검색 입력 창 (검색 시 상품 등록 페이지로 이동)
- 보관 리스트 페이지 이동 창
- 알림 페이지 이동창

### 2. 보관 리스트 페이지 (StoragePage)

<img width="2833" height="1420" alt="image" src="https://github.com/user-attachments/assets/e6807a67-48a9-486e-a631-6887e693cb41" />

- 헤더
  바코드 검색 기능
  알림창
  설정창 : 주의, 경고 정도 조절 가능
- 사용자가 냉장고에 등록한 모든 식품 목록을 확인
  아래 세그멘트로 두쪽보기 조절가능
- 보관장소 조건으로 필터링 가능, 냉장고 속 검색 가능
- 해당 페이지에서 수량 조절 가능

### 3. 알림 페이지 (NotificationsPage)

<img width="2840" height="1392" alt="image" src="https://github.com/user-attachments/assets/448a314d-ef6b-45d9-a71a-b380f4ed6c7d" />

- 헤더
- 유통기한 임박, 재고 부족 등 식품 상태 알림 표시
- 사용자가 원하는 기준에 따라 필터링하여 우선 처리 대상 식별 가능
- 해당 페이지에서 수량 조절 가능

### 4. 상품 등록 페이지 (RegisterFood)

<img width="2842" height="1446" alt="image" src="https://github.com/user-attachments/assets/b2c8047e-697a-49d3-8537-18da56a2ef10" />

- 헤더
- 바코드 입력 시 식품안전나라 API를 통해 제품 정보 자동 조회 및 등록
- 수동으로 정보 수정 가능

### 5. 상품 수정 페이지 (ProductDetailPage)

<img width="2845" height="1448" alt="image" src="https://github.com/user-attachments/assets/458bd84b-2be7-4acd-bff7-e69c880922d5" />

- 헤더
- 수동으로 정보 수정 가능

## 기술 스택

- **프레임워크:** React 19.x, Vite
- **상태 관리:** Zustand
- **API 데이터 관리:** TanStack Query (React Query)
- **유틸리티:** date-fns, debounce, useMemo, useEffect
- **라우팅:** react-router-dom 7.x
- **라이브러리:** react-select, react-datepicker, react-tiny-popover, react-circular-
- **외부 API:**
  - 유통바코드 [식품안전나라 오픈 API]
  - 바코드 연계 정보 [식품안전나라 데이터셋]
