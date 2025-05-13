// 导航栏响应式切换
document.addEventListener('DOMContentLoaded', function() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      mobileNavToggle.classList.toggle('active');
    });
  }
  
  // 点击导航链接后关闭移动菜单
  const navLinks = document.querySelectorAll('.nav-link, .nav-button');
  if (navLinks.length > 0 && navMenu) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          if (mobileNavToggle) {
            mobileNavToggle.classList.remove('active');
          }
        }
      });
    });
  }
  
  // 添加窗口大小变化监听，在大屏幕下关闭移动导航
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      if (mobileNavToggle) {
        mobileNavToggle.classList.remove('active');
      }
    }
  });
  
  // 滚动时导航栏样式变化
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
  
  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80, // 考虑导航栏高度
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 图片延迟加载
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window && lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.removeAttribute('data-src');
          imageObserver.unobserve(image);
        }
      });
    });
    
    lazyImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else if (lazyImages.length > 0) {
    // 回退到传统的延迟加载方法
    let lazyLoadThrottleTimeout;
    
    function lazyLoad() {
      if (lazyLoadThrottleTimeout) {
        clearTimeout(lazyLoadThrottleTimeout);
      }
      
      lazyLoadThrottleTimeout = setTimeout(function() {
        const scrollTop = window.pageYOffset;
        
        lazyImages.forEach(function(img) {
          if (img.offsetTop < (window.innerHeight + scrollTop)) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
        });
        
        if (lazyImages.length === 0) {
          document.removeEventListener('scroll', lazyLoad);
          window.removeEventListener('resize', lazyLoad);
          window.removeEventListener('orientationChange', lazyLoad);
        }
      }, 20);
    }
    
    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationChange', lazyLoad);
    lazyLoad();
  }
  
  // 工作环境图片点击放大
  const workplaceImages = document.querySelectorAll('.workplace-image img');
  
  workplaceImages.forEach(function(img) {
    img.addEventListener('click', function() {
      // 创建模态框
      const modal = document.createElement('div');
      modal.classList.add('modal-backdrop');
      
      const modalImg = document.createElement('img');
      modalImg.src = this.src;
      modalImg.style.maxWidth = '90%';
      modalImg.style.maxHeight = '90vh';
      modalImg.style.objectFit = 'contain';
      
      modal.appendChild(modalImg);
      document.body.appendChild(modal);
      
      // 点击模态框关闭
      modal.addEventListener('click', function() {
        document.body.removeChild(modal);
      });
    });
  });
  
  // 职位筛选功能（加入我们页面）
  const filterButtons = document.querySelectorAll('.filter-button');
  const jobCards = document.querySelectorAll('.job-card');
  
  if (filterButtons.length > 0 && jobCards.length > 0) {
    // 初始化时显示所有职位
    jobCards.forEach(card => {
      card.style.display = 'flex';
    });
    
    // 为每个筛选按钮添加点击事件
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // 移除所有按钮的active类
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // 为当前点击的按钮添加active类
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // 筛选职位卡片
        jobCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'flex';
          } else {
            if (card.getAttribute('data-category') === filterValue) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }
}); 