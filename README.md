# 🎬 LITTLE FOREST | 리틀 포레스트 : 잠시 쉬어가도 괜찮아

> "잠시 쉬어가도, 달라도, 평범해도 괜찮아." <br>
> 영화 <리틀 포레스트>의 따뜻한 감성과 사계절의 아름다움을 담아낸 시네마틱 웹사이트입니다.

<br>

## 📖 프로젝트 소개 (Project Info)
이 프로젝트는 **한신대학교 [웹프로그래밍] 기말고사 과제**로 제작되었습니다.
단순한 정보 전달을 넘어, 사용자가 영화 속 혜원의 숲에 들어온 듯한 **몰입감 있는 시각적 경험(Cinematic Experience)**을 제공하는 것을 목표로 합니다.

* **주제:** 영화 <리틀 포레스트 (Little Forest)> 소개 및 홍보
* **컨셉:** 힐링, 자연, ASMR, 미니멀리즘
* **제작 기간:** 2025.12.04~2025.12.15
* **개발:** 신민석 (1인 프로젝트)

<br>

## ✨ 주요 기능 (Key Features)

이 웹사이트는 스크롤과 인터랙션을 통해 영화의 서사를 따라가도록 설계되었습니다.

### 1. 🎧 사운드 게이트 & 인트로 (Sound Gate)
* **몰입형 입장:** 사이트 진입 시 바로 본문이 나오지 않고, '소리 켜기/끄기'를 선택하는 게이트 페이지를 거칩니다.
* **감성적 연출:** 입장을 클릭하면 배경 음악(BGM)이 재생되며, 영화의 핵심 문구가 순차적으로 나타나는 오프닝 애니메이션이 실행됩니다.

### 2. 🎞️ 시네마틱 스크롤 애니메이션 (Cinematic Scroll)
* **GSAP & ScrollTrigger:** 스크롤 위치에 따라 요소가 부드럽게 나타나고 사라지는 고급 애니메이션을 적용했습니다.
* **Lenis Smooth Scroll:** 마우스 휠을 굴릴 때 끊김 없이 부드럽게 흐르는 '관성 스크롤'을 구현하여 영화 같은 느낌을 줍니다.

### 3. ❄️🌸🌿🍁 사계절 스토리텔링 (Pinning Effect)
* **고정형 레이아웃:** 왼쪽의 텍스트 영역(Story Description)은 고정된 상태로, 오른쪽의 계절별 이미지만 스크롤되는 **Pinning 기법**을 사용했습니다.
* **스토리 흐름:** 겨울 → 봄 → 여름 → 가을로 이어지는 영화의 시간적 흐름을 시각적으로 표현했습니다.

### 4. 🎭 인터랙티브 등장인물 소개 (Sequential Cast)
이 프로젝트에서 가장 공들인 기술적 구현 부분입니다.
* **3단계 시퀀스:** 사용자가 스크롤을 내림에 따라 `중앙 대사` → `좌측 인물 소개(고정)` → `상세 정보 패널(블러 효과)` 순서로 정보가 물 흐르듯 등장합니다.
* **타이포그래피 디자인:** 영상 썸네일 대신, 각 인물의 성격을 대변하는 **명대사 타이포그래피 카드**를 우측에 배치하여 감성을 더했습니다.

### 5. 📱 반응형 웹 디자인 (Responsive Design)
* PC, 태블릿, 모바일 등 모든 디바이스 환경에 맞춰 레이아웃이 최적화됩니다.
* 모바일 환경에서는 복잡한 애니메이션 레이아웃을 간소화하여 가독성을 높였습니다.

<br>

## 🛠️ 사용 기술 (Tech Stack)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Libraries
* **GSAP (GreenSock Animation Platform):** 복잡한 스크롤 트리거 및 타임라인 애니메이션 구현
* **Lenis:** 부드러운 스크롤 경험 제공
* **Font Awesome:** 아이콘 및 UI 요소 활용

<br>

## 📂 폴더 구조 (Directory Structure)

```bash
Little-Forest-Web/
├── index.html          # 메인 페이지 구조
├── style.css           # 전체 디자인 및 반응형 스타일
├── script.js           # 스크롤 애니메이션 및 인터랙션 로직
├── assets/
│   ├── images/         # 영화 스틸컷 및 소스 이미지
│   └── audio/          # 배경 음악 (BGM)
└── README.md           # 프로젝트 설명 파일
```

## ⚠️ 저작권 및 출처 (Credits & Disclaimer)

본 웹사이트는 비상업적 학습 목적으로 제작된 **팬 사이트(Fan Made Website)**입니다.

* **Film:** Little Forest (리틀 포레스트, 2018) directed by Yim Soon-rye
* **Original Work:** Manga by Daisuke Igarashi
* **Images & Video:** Official Trailers, Movie Stills, Pexels (Free Stock Images)
* **Font:** Google Fonts (Noto Sans KR, Noto Serif KR)

> *사용된 모든 이미지와 영상, 오디오의 저작권은 원작자 및 제작사에 귀속됩니다.*
> *Copyright Disclaimer: This site is for educational purposes only. All rights belong to their respective owners.*
