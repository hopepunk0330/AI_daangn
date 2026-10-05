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
- 확인: 같은 시점에 실행 중인 애니메이션 3개의 계산 스타일(테두리, 배경, 글자색, 변형, 그림자, 투명도)은 배포본과 복사본이 모두 같습니다. 색이나 크기 값의 차이가 아니라 그리기 과정의 반올림 차이입니다.
- 원인: 색을 투명도 지원 형식(`rgb(var(--이름-rgb) / <alpha-value>)`)으로 연결하면서 전환 중간 프레임의 반올림이 달라지는 것으로 보입니다. 투명도 클래스를 유지하려면 이 형식이 필요합니다.

## Figma 연결 (2단계)

- Figma 파일: https://www.figma.com/design/Varn690zxB345cnz9fgytO (정지영/디지털미디어디자인전공의 팀, "당근 리디자인 디자인 시스템")
- 변수 컬렉션: `Color` 48개(색), `Size` 16개(글자 크기 7, 간격 2, 모서리 7). 이름과 값은 `tokens/tokens.css`와 같습니다.
- 컴포넌트 7개: `Chip/Recommended`, `Keypad/Default`, `Keypad/Pressed`, `PriceCard`, `Checkbox/Off`, `Checkbox/On`, `Toast`. 색과 크기는 변수에 연결했습니다.
- 페이지 구성: `Cover`(구성과 사용 규칙), `Components`(부품 7개, 섹션으로 묶고 각 설명에 쓰는 변수 기록), `Foundations`(색 48, 글자 7, 모서리 7, 간격 2, 그림자 7 견본)
- 변수: `Color` 48, `Size` 16, `Typography` 1(`font/body` = Noto Sans KR). 그림자는 효과 스타일 7개.
- 배포본과 대조해 고친 값: 추천 칩 모서리 8px, 토스트 배경 90% 투명과 Medium, 키패드 흰색 배경과 122x48, 체크박스 테두리 1px
- 알려진 차이: Figma에 SemiBold(600)가 없어 600 굵기는 Bold로 씁니다. 그림자는 부품에 아직 연결하지 않았습니다. 가격 카드의 내용과 크기는 배포본과 달라서 값만 대조했습니다.

## 그림자 (기본 Tailwind 그림자 포함)

- `--shadow-sm`, `--shadow-md`, `--shadow-lg`: 배포본에서 측정한 값입니다(Tailwind 기본 `sm`, `md`, `lg`와 같음). Figma 효과 스타일 `shadow/sm`, `shadow/md`, `shadow/lg`와 같은 값입니다.
- 배포본 코드에 `shadow-xs`, `shadow-2xs` 클래스가 있지만 이 Tailwind 버전에서는 효과가 없습니다(계산 값 `none`). 화면을 바꾸지 않으려고 그대로 두었고, 값을 추측해서 토큰을 만들지 않았습니다.

