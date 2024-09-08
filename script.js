document.addEventListener('DOMContentLoaded', () => {
  const shapes = document.querySelectorAll('.shape');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const signupLink = document.querySelector('.signup-link');
  const loginLink = document.querySelector('.login-link');

  function resizeShapes() {
    const minDimension = Math.min(window.innerWidth, window.innerHeight);
    const scaleFactor = minDimension / 1000; // 기준 화면 크기를 1000px로 가정

    shapes.forEach(shape => {
      shape.style.transform = `scale(${scaleFactor})`;
    });
  }

  function moveShape(shape, index) {
    const maxX = window.innerWidth - shape.offsetWidth;
    const maxY = window.innerHeight - shape.offsetHeight;

    // 화면을 8개의 구역으로 나누어 각 도형을 배치
    const sectionX = index % 4;
    const sectionY = Math.floor(index / 4);

    let x = (sectionX * 0.25 + Math.random() * 0.25) * maxX;
    let y = (sectionY * 0.5 + Math.random() * 0.5) * maxY;
    let rotation = Math.random() * 360;

    // 물 위에 떠 있는 것처럼 보이도록 천천히 흔들리는 효과
    let speedX = (Math.random() - 0.5) * 0.02; // 수평 이동 속도는 느리게
    let floatAmplitude = 10 + Math.random() * 20; // 떠다니는 진폭
    let floatSpeed = 0.01 + Math.random() * 0.02; // 떠다니는 속도

    let time = Math.random() * 100; // 시간 초기값을 다르게 해서 서로 다른 움직임을 보이도록

    function updatePosition() {
      // 위아래로 떠다니는 효과를 생성
      let floatY = Math.sin(time * floatSpeed) * floatAmplitude;
      x += speedX; // 천천히 옆으로 이동
      rotation += 0.1; // 부드러운 회전

      // 화면 경계에 닿으면 반대 방향으로 이동
      if (x <= 0 || x >= maxX) {
        speedX *= -1;
      }

      x = Math.max(0, Math.min(x, maxX));

      shape.style.left = `${x}px`;
      shape.style.top = `${y + floatY}px`;
      shape.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`; // translate(-50%, -50%)로 중심 기준 이동

      time += 1; // 시간을 증가시켜 부드러운 떠다니는 움직임

      requestAnimationFrame(updatePosition);
    }

    updatePosition();
  }

  resizeShapes();
  shapes.forEach(moveShape);

  window.addEventListener('resize', resizeShapes);

  function showLoginForm() {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    setTimeout(() => {
      loginForm.style.opacity = '1';
      signupForm.style.opacity = '0';
    }, 50);
  }

  function showSignupForm() {
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    setTimeout(() => {
      signupForm.style.opacity = '1';
      loginForm.style.opacity = '0';
    }, 50);
  }

  signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSignupForm();
  });

  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
  });
});
