# 당근 리디자인 디자인 시스템

당근마켓 판매 가격 제안 화면의 리디자인 프로토타입에서 디자인 값(색, 글자 크기, 간격, 모서리, 그림자)을 뽑아 **이름 붙은 토큰**으로 정리하고, 같은 값을 쓰는 **Figma 디자인 파일**과 연결한 저장소입니다.

- 배포된 프로토타입: https://01-ml-mercari-price-2608.vercel.app/redesign/
- Figma 파일: https://www.figma.com/design/Varn690zxB345cnz9fgytO (정지영/디지털미디어디자인전공의 팀, "당근 리디자인 디자인 시스템")

## 파일 구조

```
tokens/tokens.css        디자인 토큰 정의 (단일 출처)
prototype/index.html     토큰을 쓰는 프로토타입 (배포본과 픽셀 단위로 같아야 함)
COMPONENTS.md            부품별 용도와 쓰는 토큰
check_tokens.sh          프로토타입에 토큰 밖 색 값이 있는지 검사
qa/                      배포본과 프로토타입을 픽셀로 비교하는 검증 스크립트
```

## 원칙

- 디자인을 새로 정하지 않았습니다. 배포본의 값을 그대로 옮기고 이름만 붙였습니다.
- 토큰 값은 배포본과 같아야 합니다. 값을 바꾸면 화면이 바뀝니다.
- 값은 토큰에서만 정의하고, 쓰는 곳은 토큰 이름으로 참조합니다.

## 토큰

| 분류 | 이름 | 설명 |
|---|---|---|
| 브랜드 색 | `--daangn`, `-hover`, `-light`, `-surface`, `--daangn-tint-50/100/200` | 주황 계열 |
| 회색 | `--daangn-gray50` ~ `-gray800`, `--daangn-mute` | 배경과 글자 |
| 보조 색 | `--daangn-purple`, `--daangn-purple-light` | 보라 계열 |
| 중립 색 | `--neutral-white`, `--neutral-black`, `--neutral-50` ~ `--neutral-950`, `--neutral-press` | 흰색, 검정, 회색 |
| Tailwind 기본 팔레트 | `--orange-50` ~ `--orange-700`, `--purple-50/100/300`, `--blue-100/600` | 배포본이 쓰는 기본 색 |
| 표면·막·글 | `--surface-glass`, `--surface-glass-soft`, `--surface-toast`, `--scrim-50`, `--scrim-40`, `--daangn-ink` | 반투명 표면, 어두운 막, 선택 글자색 |
| 글자 크기 | `--type-micro`(9), `-tiny`(10), `-small`(11), `-caption`(12), `-sm`(14), `-toast`(12.5), `-body`(16), `-lg`(18), `-xl`(20), `-2xl`(24), `-3xl`(30), `-keypad`(22), `-keypad-sub`(8) | px |
| 간격 | `--space-5`, `--space-7` | 자주 쓰는 틈 |
| 모서리 | `--radius-xs`(5) ~ `--radius-2xl`(16), `--radius-full`(999) | px |
| 그림자 | `--shadow-key`, `-float`, `-phone`, `-1` ~ `-4`, `-sm`, `-md`, `-lg` | 배포본 값 |

## Tailwind 연결

- 색과 그림자는 설정에서 토큰을 참조합니다. 색 값을 설정에 따로 적지 않습니다.
- 투명도 클래스(예: `bg-gray-900/75`)가 깨지지 않도록 색 토큰마다 RGB 채널 값(`--이름-rgb`)을 같이 둡니다. HEX 값에서 자동으로 만든 값입니다.
- 글자 크기 클래스(`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`)는 토큰을 참조하고, 기본 줄 간격을 그대로 유지합니다.
- 임의 값 클래스(`from-[#...]`)는 쓰지 않고 토큰 이름 클래스로 바꿨습니다.
- 이 Tailwind 버전에 없는 그림자 클래스(`shadow-xs`, `shadow-2xs`)는 효과가 없어서 제거했습니다. 화면은 바뀌지 않습니다.

## Figma 연결

- 변수: `Color` 48개, `Size` 22개, `Typography` 1개(`font/body` = Noto Sans KR). 이름과 값은 `tokens/tokens.css`와 같습니다. 값은 자동 대조로 확인했습니다.
- 효과 스타일: `shadow/key`, `float`, `phone`, `1`~`4`, `sm`, `md`, `lg` (10개)
- 페이지: `Cover`(구성과 사용 규칙), `Components`(부품, 변형은 세트로 묶음), `Foundations`(색, 글자, 모서리, 간격, 그림자 견본)
- 컴포넌트: `Chip`, `Keypad`(State: Default, Pressed), `Checkbox`(State: Off, On), `PriceCard`, `Toast`
- 그림자 연결: `PriceCard` → `shadow/sm`, `Toast` → `shadow/lg`

## 검증

| 항목 | 결과 |
|---|---|
| 애니메이션을 멈춘 7개 화면 (배포본 대비) | 픽셀 차이 0 (`qa/`로 재현 가능) |
| 마우스 올림 상태 14개 (데스크톱) | 픽셀 차이 0 |
| 토큰 밖 색 값 | 0개 (`check_tokens.sh`) |
| Figma 변수 값 | 색 48개, 크기 22개 모두 `tokens.css`와 일치 |
| 가격 카드 위치 | 배포본 측정값과 일치 (헤더 18, 가격 44, 구분선 93, 체크박스 106, 높이 142) |

### 재현 방법

```bash
./check_tokens.sh prototype/index.html        # 토큰 밖 색 값 검사
cd qa && npm install && npx playwright install chromium && npm run qa
```

`npm run qa`는 배포본과 `prototype/index.html`을 같은 7개 화면으로 찍어 픽셀을 비교합니다. 차이가 하나라도 있으면 실패합니다.

## 알려진 차이

1. **가격 제안 직후 0.15초 중간 화면**: 같은 배포본을 두 번 찍어도 차이가 약 250픽셀(최대 14단계)이고, 치환하지 않은 원본은 약 2,500픽셀입니다. 저장소 복사본은 약 19,000~29,000픽셀로 더 흔들립니다. 색 설정, 글자 크기 설정, 토큰 연결 방식을 하나씩 빼 봐도 흔들림이 줄지 않았습니다. 원인은 아직 찾지 못했습니다. 최종 상태와 마우스 올림 상태는 모두 같습니다.
2. **굵기 대체**: Figma에 SemiBold(600)와 ExtraBold(800)가 없어서 Bold로 대체했습니다. 이 때문에 가격 숫자의 가로 폭이 배포본과 조금 다릅니다.
3. **Figma와 배포본의 픽셀 비교**: 두 도구의 그림 방식이 달라서 하지 않았습니다. 값과 위치를 숫자로 대조했습니다.
4. **움직임**: Figma 파일에는 애니메이션 규칙이 없습니다. 움직임은 저장소의 프로토타입에만 있습니다.
5. **그림자 클래스**: 배포본에 있던 `shadow-xs`, `shadow-2xs`는 효과가 없어서 제거했습니다. 이 Tailwind 버전 기준의 판단입니다.
