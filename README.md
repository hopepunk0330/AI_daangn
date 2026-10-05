# 당근 리디자인 디자인 시스템

당근마켓 판매 가격 제안 화면을 리디자인한 프로토타입에서 디자인 값을 뽑아, 이름 붙은 토큰으로 정리한 저장소입니다.

## 구성

- `tokens/tokens.css` — 색상, 글자 크기, 간격, 모서리 반경, 그림자를 CSS 변수로 정의
- `prototype/index.html` — 토큰을 적용한 프로토타입 화면

## 원칙

- 디자인을 새로 정하지 않았습니다. 배포된 프로토타입의 값을 그대로 옮기고 이름만 붙였습니다.
- 토큰 값은 원본 프로토타입과 같아야 합니다. 값을 바꾸면 화면이 바뀝니다.

## 토큰

| 분류 | 예시 이름 | 설명 |
|---|---|---|
| 브랜드 색 | `--daangn`, `--daangn-hover`, `--daangn-light`, `--daangn-surface` | 주황 계열 |
| 회색 | `--daangn-gray50` ~ `--daangn-gray800`, `--daangn-mute` | 배경과 글자 |
| 보조 색 | `--daangn-purple`, `--daangn-purple-light` | 보라 계열 |
| 중립 색 | `--neutral-white`, `--neutral-black`, `--neutral-200` ~ `--neutral-900` | 흰색, 검정, 회색 |
| 표면·막 | `--surface-glass`, `--surface-toast`, `--scrim-50`, `--scrim-40` | 반투명 표면과 어두운 막 |
| 글자 크기 | `--type-micro` ~ `--type-caption`, `--type-keypad`, `--type-toast` | 9px부터 22px까지 |
| 간격 | `--space-5`, `--space-7` | 자주 쓰는 틈 |
| 모서리 | `--radius-xs` ~ `--radius-2xl`, `--radius-full` | 5px부터 999px까지 |
| 그림자 | `--shadow-phone`, `--shadow-float`, `--shadow-key`, `--shadow-1` ~ `--shadow-4` | 그림자 |

## Tailwind 연결

- Tailwind 설정의 색과 그림자는 토큰을 참조합니다. 색 값을 설정에 따로 적지 않습니다.
- 투명도 클래스(예: `bg-gray-900/75`)가 깨지지 않도록 색 토큰마다 RGB 채널 값(`--이름-rgb`)을 같이 둡니다. 이 값은 HEX 값에서 자동으로 만든 것입니다.
- 임의 값 클래스(`from-[#...]`)는 쓰지 않고 토큰 이름 클래스로 바꿨습니다.

## 컴포넌트

프로토타입에서 반복해 쓰는 부품입니다.

- 제안 화면의 칩 (`preset chip`)과 뒤로가기 칩 (`#backToProposalChip`)
- 가격 입력 카드 (`#priceDisplayBox`)
- 키패드 버튼 (`.keypad-btn`, 숫자 아래 작은 글자 `.keypad-sub`)
- 토스트 (`#toastNotification`)
- 완료 팝업 (`#doneOverlay`)
- 설명 모달 (`#infoModal`)
- 체크박스 (`.daangn-checkbox`)

## 검증

배포된 프로토타입과 같은 7개 화면을 찍어 픽셀 단위로 비교했습니다. 애니메이션을 멈춘 상태에서 차이가 0이어야 통과입니다.

결과 (배포본 대비, 7개 화면)

- 애니메이션을 멈춘 상태: 7개 화면 모두 픽셀 차이 0
- 일반 상태: 가격 입력 커서(깜빡임)와 하단 움직이는 요소에서만 차이가 나며, 치환하지 않은 원본을 같은 방식으로 열었을 때도 같은 값이 나왔습니다.

## 알려진 차이

- 가격 제안 버튼을 누른 직후 0.15초 지점의 중간 프레임에서, 가격 카드 가장자리 픽셀 일부가 배포본과 최대 16/255만큼 다릅니다. 최종 상태 화면과 마우스 올림 상태는 모두 같습니다.
- 원인: 색을 투명도 지원 형식(`rgb(var(--이름-rgb) / <alpha-value>)`)으로 연결하면서 전환 중간 프레임의 반올림이 달라지는 것으로 보입니다. 투명도 클래스를 유지하려면 이 형식이 필요합니다.

