# 컴포넌트 상세

이 문서는 프로토타입(`prototype/index.html`)에 쓰인 반복 부품을 정리합니다. 각 부품이 쓰는 토큰은 `tokens/tokens.css` 이름을 그대로 적었습니다. 새 화면을 만들 때 같은 부품을 같은 토큰으로 다시 쓰기 위한 기준입니다.

## 제안 칩 (preset chip)

- 위치: 제안 화면의 가격 제안 칩 줄 (`.preset-chip`)
- 글자: `--type-small`(11px), 굵기 600~700
- 배경: 기본 `--neutral-white`(90% 투명), 마우스 올림 시 100%
- 추천 칩 테두리와 링: `--orange-200` (Tailwind `orange-200`을 토큰으로 연결)
- 나머지 칩의 테두리는 칩마다 다르므로 이 문서에서는 적지 않습니다

## 뒤로가기 칩 (`#backToProposalChip`)

- 제안 화면으로 돌아가는 칩. 입력 화면 왼쪽 위에 놓입니다.
- 클래스: `.dg-back-chip` (프로토타입 CSS)
- 배경 `--surface-glass`, 글자색 `--daangn-gray800`, 글자 `--type-caption`
- 모서리 `--radius-full`, 간격 `--space-5`

## 가격 입력 카드 (`#priceDisplayBox`)

- 판매 희망 가격을 보여주는 큰 카드
- 그림자: `--shadow-sm` (Figma `shadow/sm`)
- 테두리: 기본 `--daangn`(2px). 주황 테두리가 카드의 기준 색입니다.
- AI 최적 단위 배지: 배경 `--orange-50`, 글자 `--daangn`, 테두리 `--orange-200`
- 모서리: 큰 반경(`rounded-2xl`)

## 키패드 버튼 (`.keypad-btn`, `.keypad-sub`)

- 숫자 키. 기본 배경 `--neutral-200`, 글자색 `--neutral-900`
- 숫자 글자: `--type-keypad`(22px). 아래 작은 글자(`.keypad-sub`): `--type-keypad-sub`(8px)
- 눌렀을 때(`:active`): 배경 `--neutral-press`, 살짝 줄어듦
- 모서리: `--radius-md`(8px)

## 토스트 (`#toastNotification`)

- 짧은 알림. 화면 위쪽에 잠깐 나타납니다.
- 그림자: `--shadow-lg` (Figma `shadow/lg`)
- 배경: `--neutral-900`(90% 투명), 글자색 `--neutral-white`
- 글자: `--type-caption`(12px), 굵기 500
- 모서리: `--radius-2xl`(16px)

## 완료 팝업 (`#doneOverlay`)

- 등록이 끝났을 때 뜨는 팝업. 뒤는 어둡게 가립니다.
- 뒤 막: `--scrim-50`(검정 50%)
- 카드 배경: `--neutral-white`, 큰 모서리
- 확인 아이콘: 원형, 배경 `--daangn-light`, 체크 색 `--daangn`

## 설명 모달 (`#infoModal`)

- 시세 설명을 보여주는 창. 뒤의 막은 `--scrim-40`(검정 40%)이고 흐림 효과가 함께 걸립니다.

## 체크박스 (`.daangn-checkbox`)

- 크기 18px, 테두리 `--neutral-300`(1.5px), 모서리 `--radius-xs`(5px)
- 체크되면 배경과 테두리가 `--daangn`, 체크 표시는 `--neutral-white`

## 확인

- 토큰 이름은 `tokens/tokens.css`의 이름과 같습니다.
- 토큰 밖 색 값은 `check_tokens.sh`로 확인합니다.
- 화면 전체는 배포본과 픽셀 비교했습니다(애니메이션을 멈춘 7개 화면 차이 0). 부품별 상태 캡처는 아직 따로 하지 않았습니다.
