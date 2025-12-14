document.addEventListener("DOMContentLoaded", () => {
  // 1. Lenis Smooth Scroll (시네마틱한 무거운 느낌 설정)
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  gsap.registerPlugin(ScrollTrigger);

  // 2. Audio & Intro Logic
  const soundGate = document.getElementById("soundGate");
  const introOverlay = document.getElementById("introOverlay");
  const bgAudio = document.getElementById("bgAudio");
  const soundToggle = document.getElementById("soundToggle");
  const soundStatus = soundToggle.querySelector(".sound-status");

  let isAudioPlaying = false;

  // 오디오 제어 함수
  // [1] 위젯 요소를 먼저 찾습니다 (이 줄이 꼭 있어야 합니다!)
const musicWidget = document.getElementById("musicWidget");

// [2] 오디오 제어 함수 수정
const toggleAudio = (play) => {
  if (play) {
    bgAudio.play().then(() => {
      isAudioPlaying = true;
      soundStatus.textContent = "ON";
      soundToggle.classList.add("active");
      
      // ▶ 노래가 켜지면: 위젯에 'playing' 클래스를 추가해서 막대가 춤추게 함
      if(musicWidget) musicWidget.classList.add("playing");

    }).catch(err => console.log("Audio Blocked", err));
  } else {
    bgAudio.pause();
    isAudioPlaying = false;
    soundStatus.textContent = "OFF";
    soundToggle.classList.remove("active");
    
    // ⏸ 노래가 꺼지면: 'playing' 클래스를 제거해서 막대를 멈춤
    if(musicWidget) musicWidget.classList.remove("playing");
  }
};

  // 인트로 시작 함수
  const startExperience = (withSound) => {
    // 게이트 사라짐
    gsap.to(soundGate, { opacity: 0, duration: 0.8, onComplete: () => soundGate.style.display = "none" });
    
    // 오디오 설정
    if (withSound) toggleAudio(true);

    // 인트로 텍스트 애니메이션 (순차 등장)
    introOverlay.classList.add("play");
    const lines = introOverlay.querySelectorAll(".line");
    
    const tl = gsap.timeline();
    tl.to(lines[0], { opacity: 1, y: 0, duration: 0.8, delay: 0.5 })
      .to(lines[1], { opacity: 1, y: 0, duration: 0.8 }, "+=0.3")
      .to(lines[2], { opacity: 1, y: 0, duration: 0.8 }, "+=0.3")
      .to(introOverlay, { opacity: 0, duration: 1, delay: 1.5, onComplete: () => {
        introOverlay.style.display = "none";
        document.body.classList.remove("no-scroll");
        ScrollTrigger.refresh(); // 레이아웃 잡힌 후 리프레시
      }});
  };

  // 버튼 이벤트 리스너
  document.getElementById("gateSoundOn").addEventListener("click", () => startExperience(true));
  document.getElementById("gateSoundOff").addEventListener("click", () => startExperience(false));
  soundToggle.addEventListener("click", () => toggleAudio(!isAudioPlaying));

  // 3. Pinning Section Animation (Story)
  ScrollTrigger.create({
    trigger: ".pin-section",
    start: "top top",
    end: "bottom bottom",
    pin: ".pin-left",
    scrub: true
  });

  const scenes = document.querySelectorAll(".scroll-scene");
  const pinNum = document.getElementById("pinNum");

  scenes.forEach((scene, i) => {
    ScrollTrigger.create({
      trigger: scene,
      start: "top 60%",
      end: "bottom 60%",
      onEnter: () => updatePin(i),
      onEnterBack: () => updatePin(i)
    });
  });

  function updatePin(index) {
    pinNum.textContent = `0${index + 1}`;
    scenes.forEach((s, i) => {
      if (i === index) s.classList.add("active");
      else s.classList.remove("active");
    });
  }

  // 4. Common Fade Up Animation
  const fadeTargets = document.querySelectorAll("[data-anim='fade-up']");
  fadeTargets.forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: el.dataset.delay || 0
    });
  });

  // 5. Hero Parallax Effect
  gsap.to(".hero-bg", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    },
    y: "30%" // 배경이 텍스트보다 천천히 내려가서 깊이감 형성
  });

  // 6. Cinematic Cast Animation (UI 고정 + 우측 정렬)
  const castPanels = document.querySelectorAll(".cast-panel");

  castPanels.forEach((panel) => {
    const quote = panel.querySelector(".initial-quote");
    const introContent = panel.querySelector(".intro-content");
    const introThumbnail = panel.querySelector(".intro-thumbnail");
    const blurPanel = panel.querySelector(".detail-blur-panel");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top top",
        end: "+=250%", 
        pin: true,     
        scrub: 1,      
        anticipatePin: 1
      }
    });

    tl
      // [1] 대사 등장
      .to(quote, { opacity: 1, duration: 1 })
      
      // [2] 대사 유지
      .to(quote, { duration: 1 }) 
      
      // [3] 대사 사라짐 & 왼쪽 UI(intro) 등장
      .to(quote, { opacity: 0, duration: 1 }, "step2")
      .to(introContent, { opacity: 1, y: 0, duration: 1 }, "step2")
      .to(introThumbnail, { opacity: 1, y: 0, duration: 1 }, "step2")
      
      // [4] 왼쪽 UI 유지 (스크롤 내리는 동안 감상)
      .to(introContent, { duration: 1 })
      
      // [5] 블러 패널 올라옴 (왼쪽 UI 사라지는 코드 없음 - 고정됨)
      .to(blurPanel, { transform: "translateY(0%)", duration: 2, ease: "power2.inOut" }, "step3")
      
      // [6] 마지막 상태 유지
      .to(blurPanel, { duration: 2 });
  });
});
