// /src/components/FoodDetail/data/categories.ts

export interface CategoryOption {
  value: string;
  label: string;
}

export const BIG_CATEGORIES: CategoryOption[] = [
  { value: "과일", label: "과일" },
  { value: "채소", label: "채소" },
  { value: "육류", label: "육류" },
  { value: "해산물", label: "해산물" },
  { value: "유제품", label: "유제품" },
  { value: "곡류", label: "곡류" },
  { value: "음료", label: "음료" },
  { value: "조미료", label: "조미료" },
  { value: "냉동식품", label: "냉동식품" },
  { value: "가공식품", label: "가공식품" },
  { value: "기타", label: "기타" }
];

export const MID_CATEGORIES: Record<string, CategoryOption[]> = {
  과일: [
    { value: "사과", label: "사과" },
    { value: "바나나", label: "바나나" },
    { value: "오렌지", label: "오렌지" },
    { value: "포도", label: "포도" },
    { value: "딸기", label: "딸기" },
    { value: "기타과일", label: "기타과일" }
  ],
  채소: [
    { value: "잎채소", label: "잎채소" },
    { value: "뿌리채소", label: "뿌리채소" },
    { value: "열매채소", label: "열매채소" },
    { value: "기타채소", label: "기타채소" }
  ],
  육류: [
    { value: "소고기", label: "소고기" },
    { value: "돼지고기", label: "돼지고기" },
    { value: "닭고기", label: "닭고기" },
    { value: "기타육류", label: "기타육류" }
  ],
  해산물: [
    { value: "생선", label: "생선" },
    { value: "조개류", label: "조개류" },
    { value: "갑각류", label: "갑각류" },
    { value: "기타해산물", label: "기타해산물" }
  ],
  유제품: [
    { value: "우유", label: "우유" },
    { value: "치즈", label: "치즈" },
    { value: "요구르트", label: "요구르트" },
    { value: "버터", label: "버터" },
    { value: "기타유제품", label: "기타유제품" }
  ]
};

export const SMALL_CATEGORIES: CategoryOption[] = [
  { value: "일반", label: "일반" },
  { value: "특별", label: "특별" },
  { value: "프리미엄", label: "프리미엄" }
];
