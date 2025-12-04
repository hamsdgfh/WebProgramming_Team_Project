document.addEventListener("DOMContentLoaded", () => {
  // 부드러운 스크롤 이동
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

  // 배경 음악 토글
  const soundToggle = document.getElementById("soundToggle");
  const bgAudio = document.getElementById("bgAudio");

  if (soundToggle && bgAudio) {
    let isPlaying = false;

    soundToggle.addEventListener("click", async () => {
      try {
        if (!isPlaying) {
          await bgAudio.play();
          isPlaying = true;
          soundToggle.textContent = "SOUND ON";
          soundToggle.classList.add("on");
        } else {
          bgAudio.pause();
          isPlaying = false;
          soundToggle.textContent = "SOUND OFF";
          soundToggle.classList.remove("on");
        }
      } catch (err) {
        console.warn("오디오 재생 중 문제가 발생했습니다:", err);
      }
    });
  }

  // 스크롤 reveal (IntersectionObserver)
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
      {
        threshold: 0.15,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // 구형 브라우저 대응: 그냥 다 보이게
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }
});
