document.addEventListener("DOMContentLoaded", () => {
  // フェードイン効果のロジックはそのまま
  const fadeInTargetSelectors = '.description, .menu, .field, .member';
  const fadeInSections = document.querySelectorAll(fadeInTargetSelectors);

  if (fadeInSections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeInSections.forEach(section => {
      section.classList.add('fade-in-section');
      observer.observe(section);
    });
  }

  // --- GSAPを使ったフィールドセクションのアニメーション ---
  gsap.registerPlugin(ScrollTrigger);

  const field = document.querySelector("section.field");
  const imageContainer = field.querySelector(".image-container");
  const images = [
    "images/candy.png", "images/caramel.png", "images/cororo.png",
    "images/fanta.png", "images/jerry.png", "images/melon.png",
    "images/meronpanA.png", "images/meronpanB.png", "images/soda.png",
    "images/water.png",
  ];

  // 画像を動的に追加
  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    imageContainer.appendChild(img);
  });

  const imageElements = imageContainer.querySelectorAll("img");

  const angle = 15 * Math.PI / 180;
  const imageWidthWithGap = 350;
  // 初期位置を保存
  const initialPositions = [];
  imageElements.forEach((img, i) => {
    const x = i * imageWidthWithGap;
    const y = x * Math.tan(angle);
    gsap.set(img, { x, y });
    initialPositions.push({ x, y });
  });

  // 直線上で全画像を同じ量だけ平行移動させる
  // 一番右の画像が画面左端の外（-画像幅）に消えるまで移動
  const rightIndex = images.length - 1;
  const imgWidth = 300; // CSSで指定している画像幅
  const rightInitialX = initialPositions[rightIndex].x;
  // 移動量 = 画面左端（0）- (右画像の初期x座標 + 画像幅) = - (rightInitialX + imgWidth)
  const moveX = - (rightInitialX + imgWidth);
  const moveY = moveX * Math.tan(angle);

  gsap.to(imageElements, {
    x: (i) => initialPositions[i].x + moveX,
    y: (i) => initialPositions[i].y + moveY,
    ease: "none",
    scrollTrigger: {
      trigger: field,
      start: "top+=200 top",
      end: "bottom top",
      scrub: true,
      pin: true,
      // markers: true
    },
  });

  // ホバー時の拡大をGSAPで制御
  imageElements.forEach((img) => {
    img.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.05, boxShadow: '0 12px 32px rgba(0,0,0,0.45)', duration: 0.1 });
    });
    img.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, boxShadow: '0 4px 8px rgba(0,0,0,0.5)', duration: 0.25 });
    });
  });
});