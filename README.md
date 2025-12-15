# LITTLE FOREST — Cinematic Fan Webpage

> 한신대학교 AISW **웹프로그래밍 기말 프로젝트**로 제작한 비상업적 팬 웹사이트입니다.  
> 영화 **〈리틀 포레스트〉**의 분위기(사계절·자연·휴식)를 “영상 + 스크롤 연출” 중심으로 담았습니다.

- **Live Demo:** https://hamsdgfh.github.io/WebProgramming_Team_Project/
- **Tech:** HTML / CSS / JavaScript  
  + GSAP(ScrollTrigger), Lenis Smooth Scroll

---

## 1) 웹페이지 소개

이 웹페이지는 영화 〈리틀 포레스트〉를 **홍보 페이지처럼** 감상할 수 있도록 구성했습니다.

- 첫 진입 시 **BGM ON/OFF 선택(사운드 게이트)** → 영화처럼 “입장 연출” 시작  
- 메인(Hero) 구간에서 **배경 영상 + 타이포그래피**로 무드 형성  
- 스크롤을 내리면 **STORY(겨울→봄→여름→가을)**, **COOKING**, **CAST**, **GALLERY**, **VIDEO** 섹션이 순서대로 이어지며  
  각 섹션마다 다른 방식의 **스크롤 애니메이션/전환 효과**로 흐름을 만들었습니다.

---

## 2) 구현 기능

### 🎵 사운드(오디오)
- **입장 시 사운드 ON/OFF 선택 모달**
- 상단의 **사운드 토글 버튼(ON/OFF 표시)**
- 재생 중에는 우측 하단 **Now Playing 위젯(바 애니메이션)** 표시

### 🎬 Hero(메인)
- **배경 영상 자동 재생(무음/반복/모바일 인라인)**  
- 스크롤 시 **Hero 배경 파랄랙스(살짝 이동)**  
- 첫 화면에 텍스트가 자연스럽게 등장하는 **Fade-Up 애니메이션**

### 📖 Story(사계절 스토리)
- **좌측 텍스트 고정(Pin)** + 우측 장면이 스크롤에 따라 바뀌는 구조
- 장면이 바뀔 때 **활성화(Opacity/Scale) + 이미지 확대 효과**
- 현재 장면을 보여주는 **페이지 번호(01/04) 자동 변경**

### 🍳 Cooking
- 사계절 요리를 **카드 그리드**로 구성 (데스크톱 4열 / 태블릿 2열)
- 카드 Hover 시 **상승 + 이미지 확대** 효과
- 섹션 진입 시 **Fade-Up 등장**

### 🎭 Cast(시네마틱 패널)
- 배우별로 **1인당 1 패널(풀스크린)** 구성
- 스크롤에 따라:
  1) **중앙 대사 등장 → 사라짐**
  2) 왼쪽 정보(이름/역할/썸네일) **등장**
  3) **블러 패널이 아래에서 올라오며** 상세 프로필/대사 카드 노출
- 각 패널은 **핀 고정 + 단계별 타임라인**으로 자연스럽게 전환

### 🖼️ Gallery
- 4개의 스틸컷을 **가로 카드 형태**로 배치
- Hover 시 선택 카드가 **확대(비율 변화) + 선명해짐**

### ▶️ Video
- 유튜브 영상 **iframe 임베드** (메인 1개 + 서브 2개)
- **반응형 16:9 비율 유지**  
- 영상 아래에 제목/설명 캡션 제공

### ✨ 공통 연출
- 페이지 전체에 **부드러운 스무스 스크롤(Lenis)**
- 스크롤 위치에 따라 콘텐츠가 자연스럽게 나타나는 **Fade-Up 애니메이션**
- 첫 진입 연출 동안 **스크롤 잠금(no-scroll)** → 연출 종료 후 자동 해제

---

## 3) 프로젝트 구조

```bash
WebProgramming_Team_Project/
├─ index.html
├─ style.css
├─ script.js
└─ assets/
   ├─ audio/
   │  └─ little-forest-bgm.mp3
   └─ images/
      ├─ story_*.jpg
      ├─ cooking_*.jpg
      ├─ cast_*.jpg / *.png
      └─ moment_*.jpg
```

---

## 4) 실행 방법

1. 레포를 다운로드/클론합니다.
2. VS Code에서 프로젝트 폴더를 엽니다.
3. **Live Server**로 `index.html`을 실행합니다.  
   (또는 간단 서버: `npx serve`)

---

## 5) 사용 라이브러리

- **GSAP + ScrollTrigger**: 스크롤 애니메이션
- **Lenis**: 스무스 스크롤
- **Google Fonts**: Noto Sans KR, Noto Serif KR

---

## ⚠️ 저작권 및 출처 (Credits & Disclaimer)

본 웹사이트는 비상업적 학습 목적으로 제작된 **팬 사이트(Fan Made Website)**입니다.

- **Film:** Little Forest (리틀 포레스트, 2018) directed by Yim Soon-rye  
- **Original Work:** Manga by Daisuke Igarashi  
- **Images & Video:** Official Trailers, Movie Stills, Pexels (Free Stock Images)  
- **Font:** Google Fonts (Noto Sans KR, Noto Serif KR)

> 사용된 모든 이미지와 영상, 오디오의 저작권은 원작자 및 제작사에 귀속됩니다.  
> Copyright Disclaimer: This site is for educational purposes only. All rights belong to their respective owners.

