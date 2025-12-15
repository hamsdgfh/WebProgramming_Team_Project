document.addEventListener("DOMContentLoaded", () => {
  // 1. Lenis Smooth Scroll 설정
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

  // [핵심 1] 페이지 로드 시 무조건 최상단 이동 & 스크롤 잠금
  window.scrollTo(0, 0); 
  lenis.stop(); // Lenis 스크롤 기능 정지

  // ScrollTrigger 등록
  gsap.registerPlugin(ScrollTrigger);

  // 2. Audio & Intro Logic
  const soundGate = document.getElementById("soundGate");
  const introOverlay = document.getElementById("introOverlay");
  const bgAudio = document.getElementById("bgAudio");
  const soundToggle = document.getElementById("soundToggle");
  const soundStatus = soundToggle.querySelector(".sound-status");
  const musicWidget = document.getElementById("musicWidget"); // 위젯 선택

  let isAudioPlaying = false;

  // 오디오 제어 함수
  const toggleAudio = (play) => {
    if (play) {
      bgAudio.play().then(() => {
        isAudioPlaying = true;
        soundStatus.textContent = "ON";
        soundToggle.classList.add("active");
        if(musicWidget) musicWidget.classList.add("playing"); // 위젯 애니메이션 켬
      }).catch(err => console.log("Audio Blocked", err));
    } else {
      bgAudio.pause();
      isAudioPlaying = false;
      soundStatus.textContent = "OFF";
      soundToggle.classList.remove("active");
      if(musicWidget) musicWidget.classList.remove("playing"); // 위젯 애니메이션 끔
    }
  };

  // 인트로 시작 함수
  const startExperience = (withSound) => {
    // 게이트 사라짐
    gsap.to(soundGate, { opacity: 0, duration: 0.8, onComplete: () => soundGate.style.display = "none" });
    
    // 오디오 설정
    if (withSound) toggleAudio(true);

    // 인트로 텍스트 애니메이션
    introOverlay.classList.add("play");
    const lines = introOverlay.querySelectorAll(".line");
    
    const tl = gsap.timeline();
    tl.to(lines[0], { opacity: 1, y: 0, duration: 0.8, delay: 0.5 })
      .to(introOverlay, { opacity: 0, duration: 1, delay: 1.5, onComplete: () => {
        // [핵심 2] 인트로가 완전히 끝나면 스크롤 잠금 해제
        introOverlay.style.display = "none";
        document.body.classList.remove("no-scroll"); // CSS 잠금 해제
        lenis.start(); // Lenis 스크롤 다시 시작!
        ScrollTrigger.refresh(); // 레이아웃 재계산
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
    y: "30%" 
  });

  // 6. Cinematic Cast Animation
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

    tl.to(quote, { opacity: 1, duration: 1 })
      .to(quote, { duration: 1 }) 
      .to(quote, { opacity: 0, duration: 1 }, "step2")
      .to(introContent, { opacity: 1, y: 0, duration: 1 }, "step2")
      .to(introThumbnail, { opacity: 1, y: 0, duration: 1 }, "step2")
      .to(introContent, { duration: 1 })
      .to(blurPanel, { transform: "translateY(0%)", duration: 2, ease: "power2.inOut" }, "step3")
      .to(blurPanel, { duration: 2 });
  });
});
