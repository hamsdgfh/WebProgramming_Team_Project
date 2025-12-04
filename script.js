document.addEventListener("DOMContentLoaded", () => {
  // 부드러운 스크롤
  const scrollButtons = document.querySelectorAll("[data-scroll]");
  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSelector = btn.getAttribute("data-scroll");
      const target = document.querySelector(targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const bgAudio = document.getElementById("bgAudio");
  const soundToggle = document.getElementById("soundToggle");
  const soundGate = document.getElementById("soundGate");
  const gateSoundOn = document.getElementById("gateSoundOn");
  const gateSoundOff = document.getElementById("gateSoundOff");

  if (bgAudio) {
    bgAudio.volume = 0.4; // BGM 살짝 줄인 볼륨
  }

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

  // 첫 진입 사운드 게이트
  if (soundGate && gateSoundOn && gateSoundOff) {
    gateSoundOn.addEventListener("click", async () => {
      await playAudio();
      soundGate.classList.add("hidden");
      setTimeout(() => {
        soundGate.style.display = "none";
      }, 600);
    });

    gateSoundOff.addEventListener("click", () => {
      pauseAudio();
      soundGate.classList.add("hidden");
      setTimeout(() => {
        soundGate.style.display = "none";
      }, 600);
    });
  }

  // ✨ 자동으로 reveal을 붙여줄 대상들
  const extraRevealTargets = document.querySelectorAll(
    ".card, .season-card, .media-block, .stack-block, .image-placeholder, .themes-panel, .video-frame, .ost-placeholder"
  );
  extraRevealTargets.forEach((el) => el.classList.add("reveal"));

  // ✨ 섹션 reveal (IntersectionObserver)
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
});
