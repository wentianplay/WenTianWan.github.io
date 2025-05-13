document.addEventListener('DOMContentLoaded', function() {
  const splashScreen = document.querySelector('.splash-screen');
  const splashParticles = document.createElement('div');
  splashParticles.className = 'splash-particles';
  splashScreen.appendChild(splashParticles);
  
  // 设置强制关闭定时器 - 确保无论如何动画都会在一定时间后关闭
  const forceSplashTimeout = setTimeout(function() {
    hideSplashScreen();
  }, 12000); // 最长显示12秒，作为最终保障
  
  // 统一的关闭开屏动画函数
  function hideSplashScreen() {
    // 防止重复执行
    if (!splashScreen || splashScreen.classList.contains('fade-out')) return;
    
    // 清除可能存在的定时器
    clearTimeout(forceSplashTimeout);
    
    // 添加淡出类
    splashScreen.classList.add('fade-out');
    
    // 动画结束后移除开屏元素
    setTimeout(function() {
      splashScreen.style.display = 'none';
    }, 600);
  }
  
  // 在logo周围添加轮廓和脉冲效果
  const logoContainer = document.querySelector('.splash-logo-container');
  const logoOutline = document.createElement('div');
  logoOutline.className = 'logo-outline';
  
  const logoPulse = document.createElement('div');
  logoPulse.className = 'logo-pulse';
  
  logoContainer.appendChild(logoOutline);
  logoContainer.appendChild(logoPulse);
  
  // 创建辐射粒子容器
  const radialParticles = document.createElement('div');
  radialParticles.className = 'radial-particles';
  radialParticles.style.position = 'absolute';
  radialParticles.style.top = '0';
  radialParticles.style.left = '0';
  radialParticles.style.width = '100%';
  radialParticles.style.height = '100%';
  radialParticles.style.pointerEvents = 'none';
  logoContainer.appendChild(radialParticles);
  
  // 创建从logo辐射出去的粒子
  function createRadialParticles() {
    const particleCount = 30; // 辐射粒子数量
    
    // 粒子颜色数组 - 使用粉色系
    const colors = [
      'rgba(255, 107, 156, 0.7)', // primary
      'rgba(255, 107, 156, 0.5)', // primary (较淡)
      'rgba(255, 172, 198, 0.6)', // primary-light
      'rgba(232, 79, 130, 0.6)'   // primary-dark
    ];
    
    // 计算logo中心位置
    const centerX = logoContainer.offsetWidth / 2;
    const centerY = logoContainer.offsetHeight / 2;
    
    for (let i = 0; i < particleCount; i++) {
      // 创建粒子发射的定时器
      setTimeout(() => {
        const particle = document.createElement('span');
        particle.className = 'radial-particle';
        
        // 随机大小 (较小的粒子)
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 设置初始位置为logo中心
        particle.style.top = `${centerY}px`;
        particle.style.left = `${centerX}px`;
        
        // 生成随机角度和距离
        const angle = Math.random() * Math.PI * 2; // 0-360度随机角度
        const distance = Math.random() * 120 + 40; // 40-160px随机距离
        
        // 计算目标位置
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        // 设置CSS变量用于动画
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        // 随机颜色
        const colorIndex = Math.floor(Math.random() * colors.length);
        particle.style.backgroundColor = colors[colorIndex];
        
        // 随机动画延迟
        const delay = Math.random() * 0.6;
        particle.style.animationDelay = `${delay}s`;
        
        // 添加到容器
        radialParticles.appendChild(particle);
        
        // 动画完成后移除粒子
        setTimeout(() => {
          particle.remove();
        }, (1.5 + delay) * 1000);
      }, i * 50); // 每50毫秒发射一个粒子
    }
  }
  
  // 创建优雅的粒子效果
  function createParticles() {
    const particleCount = window.innerWidth < 768 ? 15 : 25;
    
    // 主要用粉色调
    const colors = [
      'rgba(255, 107, 156, 0.2)', // primary (淡)
      'rgba(255, 107, 156, 0.15)', // primary (更淡)
      'rgba(255, 172, 198, 0.15)', // primary-light (淡)
      'rgba(255, 172, 198, 0.1)' // primary-light (更淡)
    ];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      
      // 不同的形状大小
      const size = Math.random() * 15 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // 随机位置 (只在底部生成)
      const posX = Math.random() * 100;
      const posYStart = 90 + Math.random() * 20; // 底部附近
      particle.style.left = `${posX}%`;
      particle.style.bottom = `-${posYStart}px`;
      
      // 随机颜色
      const colorIndex = Math.floor(Math.random() * colors.length);
      particle.style.backgroundColor = colors[colorIndex];
      
      // 更柔和的动画持续时间和延迟
      const delay = Math.random() * 5;
      const duration = Math.random() * 6 + 6;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      splashParticles.appendChild(particle);
    }
  }
  
  // 在logo加载后触发辐射效果
  const logoImg = document.querySelector('.splash-logo');
  
  // 添加图片加载错误处理
  logoImg.addEventListener('error', function() {
    console.warn('Logo image failed to load');
    // 即使logo图片加载失败也继续进行动画
    createRadialParticles();
  });
  
  logoImg.addEventListener('load', function() {
    // 首次触发粒子辐射
    setTimeout(createRadialParticles, 500);
    
    // 每2.5秒重复触发粒子辐射效果
    const repeatInterval = setInterval(createRadialParticles, 2500);
    
    // 在开屏动画结束时清除重复触发的定时器
    const loaderProgress = document.querySelector('.splash-loader-progress');
    if (loaderProgress) {
      loaderProgress.addEventListener('animationend', function() {
        clearInterval(repeatInterval);
      });
    }
    
    // 确保在动画结束时也清除定时器
    setTimeout(function() {
      clearInterval(repeatInterval);
    }, 8000); // 8秒后停止粒子特效
  });
  
  createParticles();
  
  // 改进的进度条动画结束检测
  const loaderProgress = document.querySelector('.splash-loader-progress');
  if (loaderProgress) {
    // 监听进度条动画结束
    loaderProgress.addEventListener('animationend', function() {
      setTimeout(function() {
        hideSplashScreen();
      }, 800); // 增加到800ms，让动画更完整
    });
    
    // 如果7秒后进度条动画还没结束，也触发隐藏
    setTimeout(function() {
      if (!splashScreen.classList.contains('fade-out')) {
        hideSplashScreen();
      }
    }, 7000); // 增加到7秒
  }
  
  // 确保所有资源加载完成后再隐藏开屏动画
  window.addEventListener('load', function() {
    // 页面完全加载后等待更长时间再隐藏开屏动画
    setTimeout(function() {
      hideSplashScreen();
    }, 2500); // 增加到2.5秒
  });
  
  // 如果页面加载事件长时间未触发，也执行隐藏逻辑
  // 这是备用保障机制
  setTimeout(function() {
    hideSplashScreen();
  }, 10000); // 10秒作为备用超时
}); 