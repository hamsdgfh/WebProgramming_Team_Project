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
  const toggleAudio = (play) => {
    if (play) {
      bgAudio.play().then(() => {
        isAudioPlaying = true;
        soundStatus.textContent = "ON";
        soundToggle.classList.add("active");
      }).catch(err => console.log("Audio Blocked", err));
    } else {
      bgAudio.pause();
      isAudioPlaying = false;
      soundStatus.textContent = "OFF";
      soundToggle.classList.remove("active");
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

  // 6. Cinematic Cast Animation (Snap Compatible)
  const castPanels = document.querySelectorAll(".cast-panel");

  // 각 패널에 스크롤 트리거 설정
  castPanels.forEach((panel) => {
    ScrollTrigger.create({
      trigger: panel,
      // 중요: scroller를 cast-container로 지정해야 snap과 충돌하지 않음
      // 만약 전체 페이지 스크롤이라면 scroller 설정 필요없음. 
      // 현재 구조상 window 스크롤을 감지하도록 설정함.
      start: "top center", 
      end: "bottom center",
      
      // 화면 중앙에 오면 active 클래스를 붙임 -> CSS 애니메이션 작동
      onEnter: () => panel.classList.add("active"),
      onEnterBack: () => panel.classList.add("active"),
      onLeave: () => panel.classList.remove("active"),
      onLeaveBack: () => panel.classList.remove("active"),
    });
  });
});
