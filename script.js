document.addEventListener("DOMContentLoaded", () => {
  // Splash screen
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
      setTimeout(() => {
          splashScreen.style.opacity = '0';
          setTimeout(() => {
              splashScreen.style.display = 'none';
          }, 500);
      }, 1500);
  }

  // Verificação WebView
  const isWebView = () => {
      return /(Android|iPhone|iPad).*Version\/[\d.]+.*Chrome\/[^\s]+ Mobile/.test(navigator.userAgent) || 
             window.navigator.standalone ||
             window.matchMedia('(display-mode: standalone)').matches;
  };

  if (isWebView()) {
      document.documentElement.setAttribute('data-mode', 'webview');
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
          metaTheme.setAttribute('content', '#001f3f');
      }
  }

  // Menu lateral
  const setupMenu = () => {
      const sideMenu = document.getElementById('side-menu');
      const btnMenu = document.getElementById('btn-menu');
      const btnCloseMenu = document.getElementById('btn-close-menu');

      if (sideMenu && btnMenu) {
          btnMenu.addEventListener('click', () => {
              sideMenu.classList.add('open');
          });
      }

      if (btnCloseMenu) {
          btnCloseMenu.addEventListener('click', () => {
              sideMenu?.classList.remove('open');
          });
      }

      document.querySelectorAll('.menu-items a').forEach(link => {
          link.addEventListener('click', () => {
              sideMenu?.classList.remove('open');
          });
      });
  };
  setupMenu();

  // Dark Mode
  const setupDarkMode = () => {
      const btnDarkMode = document.getElementById('btn-dark-mode');
      if (!btnDarkMode) return;

      const darkModeIcon = btnDarkMode.querySelector('i');
      let darkMode = localStorage.getItem('darkMode') === 'enabled';

      const enableDarkMode = () => {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('darkMode', 'enabled');
          darkModeIcon?.classList.replace('fa-moon', 'fa-sun');
          btnDarkMode.textContent = ' Modo Claro';
          if (darkModeIcon) btnDarkMode.prepend(darkModeIcon);
      };

      const disableDarkMode = () => {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('darkMode', 'disabled');
          darkModeIcon?.classList.replace('fa-sun', 'fa-moon');
          btnDarkMode.textContent = ' Modo Escuro';
          if (darkModeIcon) btnDarkMode.prepend(darkModeIcon);
      };

      if (darkMode) enableDarkMode();

      btnDarkMode.addEventListener('click', () => {
          darkMode = !darkMode;
          darkMode ? enableDarkMode() : disableDarkMode();
      });
  };
  setupDarkMode();

  // Mensagens motivacionais
  const setupMotivationalMessages = () => {
      const btnMensagem = document.getElementById('btn-mensagem');
      const msg = document.getElementById('mensagem-apoio');

      if (!btnMensagem || !msg) return;

      const mensagens = [
          "Você é mais forte do que imagina. Acredite em si mesmo!",
          "Fale, não se cale. Sua voz tem o poder de mudar histórias.",
          "Estamos com você em cada passo. Você nunca está sozinho.",
          "A dor pode ser aliviada com um simples gesto de apoio. Conte conosco.",
          "Você merece respeito. Nunca aceite menos que isso.",
          "A coragem não é a ausência de medo, mas a decisão de agir apesar dele.",
          "Sua história não termina aqui. Amanhã será um novo dia.",
          "Denunciar é proteger a si mesmo e aos outros. Você é importante!",
          "Ninguém tem o direito de fazer você se sentir pequeno. Você é incrível!",
          "Juntos somos mais fortes. Vamos acabar com o bullying!"
      ];

      btnMensagem.addEventListener('click', () => {
          const aleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
          msg.textContent = aleatoria;
          msg.style.animation = 'none';
          void msg.offsetWidth;
          msg.style.animation = 'fadeIn 0.5s ease-in-out';
      });
  };
  setupMotivationalMessages();

  // Tipos de Bullying - Cards
  const setupBullyingCards = () => {
      const cardsContainer = document.querySelector('.cards-container');
      if (!cardsContainer) return;

      const tiposBullying = [
          {
              tipo: "Físico",
              icon: "fa-hand-paper",
              color: "#ff4136",
              descricao: "Agressões, empurrões, chutes ou qualquer contato físico indesejado."
          },
          {
              tipo: "Verbal",
              icon: "fa-comment-slash",
              color: "#ff851b",
              descricao: "Insultos, apelidos ofensivos, ameaças ou comentários depreciativos."
          },
          {
              tipo: "Psicológico",
              icon: "fa-brain",
              color: "#ffdc00",
              descricao: "Intimidação, manipulação, exclusão social ou humilhação."
          },
          {
              tipo: "Cyberbullying",
              icon: "fa-laptop",
              color: "#0074d9",
              descricao: "Agressões feitas pela internet, redes sociais ou mensagens."
          }
      ];

      cardsContainer.innerHTML = tiposBullying.map(tipo => `
          <div class="card">
              <div class="card-icon" style="background-color: ${tipo.color}">
                  <i class="fas ${tipo.icon}"></i>
              </div>
              <h3>${tipo.tipo}</h3>
              <p>${tipo.descricao}</p>
          </div>
      `).join('');
  };
  setupBullyingCards();

  // Depoimentos - Carrossel
  const setupTestimonials = () => {
      const depoimentosContainer = document.querySelector('.depoimentos-container');
      if (!depoimentosContainer) return;

      const depoimentos = [
          {
              texto: "Depois de denunciar, finalmente me senti livre. Não guarde isso para você!",
              autor: "Ana, 16 anos"
          },
          {
              texto: "Achei que estava exagerando, mas buscar ajuda foi a melhor decisão.",
              autor: "Pedro, 14 anos"
          },
          {
              texto: "Como testemunha, me arrependo de não ter agido antes. Agora eu denuncio.",
              autor: "Lucas, 17 anos"
          }
      ];

      depoimentosContainer.innerHTML = `
          ${depoimentos.map((depo, index) => `
              <div class="depoimento ${index === 0 ? 'active' : ''}">
                  <p>${depo.texto}</p>
                  <div class="depoimento-autor">${depo.autor}</div>
              </div>
          `).join('')}
          <div class="depoimento-nav">
              ${depoimentos.map((_, index) => `
                  <button class="nav-btn ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
              `).join('')}
          </div>
      `;

      let currentDepoimento = 0;
      const allDepoimentos = document.querySelectorAll('.depoimento');
      const allNavBtns = document.querySelectorAll('.nav-btn');
      
      const showDepoimento = (index) => {
          allDepoimentos.forEach(depo => depo.classList.remove('active'));
          allNavBtns.forEach(btn => btn.classList.remove('active'));
          
          allDepoimentos[index]?.classList.add('active');
          allNavBtns[index]?.classList.add('active');
          currentDepoimento = index;
      };
      
      allNavBtns.forEach(btn => {
          btn.addEventListener('click', () => {
              showDepoimento(parseInt(btn.dataset.index));
          });
      });
      
      setInterval(() => {
          const nextIndex = (currentDepoimento + 1) % depoimentos.length;
          showDepoimento(nextIndex);
      }, 5000);
  };
  setupTestimonials();

  // Recursos de Apoio
  const setupResources = () => {
      const recursosContainer = document.querySelector('.recursos-container');
      if (!recursosContainer) return;

      const recursos = [
          {
              titulo: "Central de Ajuda",
              icon: "fa-question-circle",
              link: "#"
          },
          {
              titulo: "Apoio Psicológico",
              icon: "fa-heart",
              link: "#"
          },
          {
              titulo: "Direitos Legais",
              icon: "fa-balance-scale",
              link: "#"
          },
          {
              titulo: "Material Educativo",
              icon: "fa-book",
              link: "#"
          }
      ];

      recursosContainer.innerHTML = `
          <div class="recursos-grid">
              ${recursos.map(recurso => `
                  <a href="${recurso.link}" class="recurso-card">
                      <i class="fas ${recurso.icon}"></i>
                      <h4>${recurso.titulo}</h4>
                  </a>
              `).join('')}
          </div>
      `;
  };
  setupResources();
});