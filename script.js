document.addEventListener("DOMContentLoaded", () => {
  const bgAudio = document.getElementById("bgAudio");
  const soundToggle = document.getElementById("soundToggle");
  const soundGate = document.getElementById("soundGate");
  const gateSoundOn = document.getElementById("gateSoundOn");
  const gateSoundOff = document.getElementById("gateSoundOff");
  const introOverlay = document.getElementById("introOverlay");

  let isPlaying = false;

  const updateSoundUI = () => {
    if (!soundToggle) return;
    if (isPlaying) {
      soundToggle.textContent = "SOUND ON";
      soundToggle.classList.add("on");
    } else {
      soundToggle.textContent = "SOUND OFF";
      soundToggle.classList.remove("on");
    }
  };

  const playAudio = async () => {
    if (!bgAudio) return;
    try {
      await bgAudio.play();
      isPlaying = true;
      updateSoundUI();
    } catch (err) {
      console.warn("오디오 재생 실패:", err);
    }
  };

  const pauseAudio = () => {
    if (!bgAudio) return;
    bgAudio.pause();
    isPlaying = false;
    updateSoundUI();
  };

  // 헤더 토글 버튼
  if (soundToggle && bgAudio) {
    soundToggle.addEventListener("click", async () => {
      if (!isPlaying) {
        await playAudio();
      } else {
        pauseAudio();
      }
    });
  }

  // ✨ 인트로 시퀀스
  const startIntroSequence = () => {
    if (!introOverlay) {
      document.body.classList.remove("no-scroll");
      return;
    }

    // 문장 등장
    setTimeout(() => {
      introOverlay.classList.add("show-text");
    }, 400);

    // 1초 등장 + 2.5초 유지 후 페이드아웃 시작
    const holdDuration = 3500; // 1s fade-in + 2.5s hold
    setTimeout(() => {
      introOverlay.classList.add("fade-out");
      document.body.classList.remove("no-scroll");
    }, 400 + holdDuration);

    // 완전히 제거
    setTimeout(() => {
      introOverlay.style.display = "none";
    }, 400 + holdDuration + 1200);
  };

  // 사운드 게이트 버튼
  if (soundGate && gateSoundOn && gateSoundOff) {
    gateSoundOn.addEventListener("click", async () => {
      await playAudio();
      soundGate.classList.add("hidden");
      setTimeout(() => {
        soundGate.style.display = "none";
      }, 700);
      startIntroSequence();
    });

    gateSoundOff.addEventListener("click", () => {
      pauseAudio();
      soundGate.classList.add("hidden");
      setTimeout(() => {
        soundGate.style.display = "none";
      }, 700);
      startIntroSequence();
    });
  } else {
    // 안전장치: 게이트가 없으면 바로 스크롤 허용
    document.body.classList.remove("no-scroll");
  }

  // 부드러운 스크롤 (버튼 + nav)
  const scrollButtons = document.querySelectorAll("[data-scroll]");
  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetSelector = btn.getAttribute("data-scroll");
      const target = document.querySelector(targetSelector);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ✨ 자동으로 reveal을 붙여줄 대상들
  const extraRevealTargets = document.querySelectorAll(
    ".hero-badge, .media-block, .split-col, .season-card, .image-placeholder"
  );
  extraRevealTargets.forEach((el) => el.classList.add("reveal"));

  // ✨ 스크롤 reveal 애니메이션
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // 🎞 갤러리 인터랙션 (사진 6~7 느낌)
  const galleryStrip = document.getElementById("galleryStrip");
  if (galleryStrip) {
    const items = galleryStrip.querySelectorAll(".gallery-item");
    items.forEach((item, index) => {
      item.addEventListener("click", () => {
        items.forEach((it) => it.classList.remove("active"));
        item.classList.add("active");
      });

      // 키보드 접근성(탭 + 엔터)
      item.setAttribute("tabindex", "0");
      item.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          items.forEach((it) => it.classList.remove("active"));
          item.classList.add("active");
        }
      });
    });
  }
});
