# 컴포넌트

각 부품은 배포본(`prototype/index.html`)의 실제 요소를 측정해서 옮겼고, 쓰는 토큰은 `tokens/tokens.css`의 이름입니다.

| 부품 | 배포본 요소 | 상태 |
|---|---|---|
| `Chip` | 제안 칩 (`.preset-chip`, 추천 항목) | 단일 |
| `Keypad` | 키패드 숫자 (`.keypad-btn`) | `State=Default`, `State=Pressed` |
| `Checkbox` | 체크박스 (`.daangn-checkbox`) | `State=Off`, `State=On` |
| `PriceCard` | 판매 희망 가격 카드 (`#priceDisplayBox`) | 단일 (체크박스 인스턴스 2개 포함) |
| `Toast` | 알림 토스트 (`#toastNotification`) | 단일 |

## Chip

- 글자 `--type-small`(11px), 굵기 Bold(700)
- 배경 `--neutral-white`, 테두리 `--orange-200` 1px (배포본은 링으로 구현)
- 모서리 `--radius-md`(8px), 여백 세로 6px · 가로 10px, 글자와 아이콘 사이 `--space-5`

## Keypad

- 크기 122×48, 모서리 `--radius-md`(8px)
- `State=Default`: 배경 `--neutral-white`
- `State=Pressed`(눌렀을 때): 배경 `--neutral-press`
- 글자 `--type-keypad`(22px), Medium(500), 색 `--neutral-900`
- 키 아래 작은 글자 `--type-keypad-sub`(8px)

## Checkbox

- 크기 18×18, 모서리 `--radius-xs`(5px), 테두리 1px
- `State=Off`: 배경 `--neutral-white`, 테두리 `--neutral-300`
- `State=On`: 배경과 테두리 `--daangn`, 체크 표시 `--neutral-white`

## PriceCard

- 크기 358 × 142, 모서리 `--radius-2xl`(16px), 여백 16px
- 배경 `--neutral-white`, 테두리 `--daangn` 2px 안쪽
- 그림자 `--shadow-sm`
- 1행: 라벨 "판매 희망 가격" (`--type-small`, Bold, `--neutral-400`), 배지 "AI 최적 단위가 일치 ✨" (배경 `--orange-50`, 테두리 `--orange-200`, 글자 `--daangn`, `--type-caption`, 모서리 `--radius-full`)
- 2행: "₩" (`--type-2xl`, `--neutral-400`), "20,000" (`--type-3xl`, `--neutral-900`, 배포본은 800 굵기), "원" (`--type-xl`, `--neutral-700`), 닫기 "×" (`--type-body`, `--neutral-400`)
- 구분선: 1px, `--neutral-100`
- 3행: 체크박스 인스턴스 2개 — "나눔하기"(Off, Medium `--neutral-700`), "가격 제안 받기 (네고)"(On, Regular `--neutral-600`), `--type-caption`

## Toast

- 배경 `--neutral-900`(90% 투명), 글자 `--neutral-white` `--type-caption`(12px), Medium(500)
- 모서리 `--radius-2xl`(16px), 여백 세로 12px · 가로 16px
- 그림자 `--shadow-lg`

## 배포본에만 있는 부품

다음 부품은 프로토타입 코드에만 있습니다.
- 뒤로가기 칩 (`#backToProposalChip`, `.dg-back-chip`): 배경 `--surface-glass`, 글자 `--daangn-gray800`, `--type-caption`, 모서리 `--radius-full`
- 설명 모달 (`#infoModal`): 뒤 막 `--scrim-40`
- 완료 팝업 (`#doneOverlay`): 뒤 막 `--scrim-50`, 확인 아이콘 배경 `--daangn-light`, 체크 색 `--daangn`
