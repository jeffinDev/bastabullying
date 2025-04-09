document.addEventListener("DOMContentLoaded", () => {
  // Configurações iniciais
  const APP_VERSION = "1.2.0";
  console.log(`Basta Bullying v${APP_VERSION}`);

  // =============
  // Splash Screen
  // =============
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    setTimeout(() => {
      splashScreen.style.opacity = '0';
      setTimeout(() => {
        splashScreen.style.display = 'none';
      }, 500);
    }, 1500);
  }

  // ========================
  // Mensagens Motivacionais (Corrigido para WebView)
  // ========================
  let lastMessageIndex = -1;
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

  function showRandomMessage() {
    const msgContainer = document.getElementById('mensagem-apoio-container');
    const msg = document.getElementById('mensagem-apoio');
    
    if (!msgContainer || !msg) return;

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * mensagens.length);
    } while (newIndex === lastMessageIndex && mensagens.length > 1);
    
    lastMessageIndex = newIndex;
    const mensagem = mensagens[newIndex];
    
    // Efeito de transição
    msg.style.opacity = '0';
    msgContainer.style.display = 'block';
    
    setTimeout(() => {
      msg.textContent = mensagem;
      msg.style.opacity = '1';
    }, 300);
  }

  // Configurar botão de mensagem
  const btnMensagem = document.getElementById('btn-mensagem');
  if (btnMensagem) {
    btnMensagem.addEventListener('click', showRandomMessage);
    // Mostrar primeira mensagem ao carregar
    setTimeout(showRandomMessage, 2000);
  }

  // ==============
  // Menu Lateral
  // ==============
  const setupMenu = () => {
    const sideMenu = document.getElementById('side-menu');
    const btnMenu = document.getElementById('btn-menu');
    const btnCloseMenu = document.getElementById('btn-close-menu');

    if (sideMenu && btnMenu) {
      btnMenu.addEventListener('click', () => {
        sideMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (btnCloseMenu) {
      btnCloseMenu.addEventListener('click', () => {
        sideMenu?.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    document.querySelectorAll('.menu-items a').forEach(link => {
      link.addEventListener('click', () => {
        sideMenu?.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  };
  setupMenu();

  // ===================
  // Tipos de Bullying
  // ===================
  const setupBullyingCards = () => {
    const cardsContainer = document.querySelector('.cards-container');
    if (!cardsContainer) return;

    const tiposBullying = [
      {
        tipo: "Físico",
        icon: "fa-hand-paper",
        color: "#ef233c",
        descricao: "Agressões, empurrões, chutes ou qualquer contato físico indesejado.",
        examples: ["Bater", "Chutar", "Empurrar", "Roubar pertences"]
      },
      {
        tipo: "Verbal",
        icon: "fa-comment-slash",
        color: "#f8961e",
        descricao: "Insultos, apelidos ofensivos, ameaças ou comentários depreciativos.",
        examples: ["Xingamentos", "Apelidos cruéis", "Ameaças", "Humilhações"]
      },
      {
        tipo: "Psicológico",
        icon: "fa-brain",
        color: "#4cc9f0",
        descricao: "Intimidação, manipulação, exclusão social ou humilhação.",
        examples: ["Exclusão", "Manipulação", "Intimidação", "Perseguição"]
      },
      {
        tipo: "Cyberbullying",
        icon: "fa-laptop",
        color: "#4361ee",
        descricao: "Agressões feitas pela internet, redes sociais ou mensagens.",
        examples: ["Mensagens ofensivas", "Fake news", "Exposição indevida", "Perfis falsos"]
      }
    ];

    cardsContainer.innerHTML = tiposBullying.map(tipo => `
      <div class="card" data-type="${tipo.tipo.toLowerCase()}">
        <div class="card-icon" style="background-color: ${tipo.color}">
          <i class="fas ${tipo.icon}"></i>
        </div>
        <h3>${tipo.tipo}</h3>
        <p>${tipo.descricao}</p>
        <div class="card-examples">
          <strong>Exemplos:</strong>
          <ul>
            ${tipo.examples.map(ex => `<li>${ex}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        showToast(`Você selecionou: Bullying ${type.charAt(0).toUpperCase() + type.slice(1)}`, 'info');
      });
    });
  };
  setupBullyingCards();

  // =================
  // Estatísticas
  // =================
  const setupStatistics = () => {
    const stat1 = document.getElementById('stat1');
    const stat2 = document.getElementById('stat2');
    const stat3 = document.getElementById('stat3');
    
    if (!stat1 || !stat2 || !stat3) return;
    
    const animateValue = (element, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + '%';
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };
    
    const statsSection = document.getElementById('estatisticas');
    let animated = false;
    
    const checkStatsVisibility = () => {
      if (statsSection && isElementInViewport(statsSection)) {
        if (!animated) {
          animateValue(stat1, 0, 72, 2000);
          animateValue(stat2, 0, 85, 2000);
          animateValue(stat3, 0, 40, 2000);
          animated = true;
        }
      }
    };
    
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    };
    
    window.addEventListener('scroll', checkStatsVisibility);
    checkStatsVisibility();
  };
  setupStatistics();

  // =====
  // FAQ
  // =====
  const setupFAQ = () => {
    const faqContainer = document.querySelector('.faq-container');
    if (!faqContainer) return;

    const faqItems = [
      {
        pergunta: "O que é considerado bullying?",
        resposta: "Bullying é qualquer comportamento agressivo, intencional e repetitivo que causa dano físico ou emocional a outra pessoa, especialmente quando há um desequilíbrio de poder entre as partes envolvidas.",
        category: "conceito"
      },
      {
        pergunta: "Como posso denunciar anonimamente?",
        resposta: "Nosso formulário de denúncia não coleta nenhuma informação pessoal. Basta preencher os detalhes do incidente e enviar. Você receberá um código para acompanhar o caso.",
        category: "denuncia"
      },
      {
        pergunta: "O que acontece depois que eu denuncio?",
        resposta: "Sua denúncia é encaminhada para as autoridades competentes (escola, conselho tutelar ou polícia, dependendo da gravidade). Eles tomarão as medidas apropriadas para investigar e resolver a situação.",
        category: "processo"
      },
      {
        pergunta: "Posso denunciar se eu apenas presenciei o bullying?",
        resposta: "Sim! Denúncias de testemunhas são muito importantes e ajudam a combater o bullying. Você pode fazer a diferença protegendo quem está sendo intimidado.",
        category: "testemunha"
      },
      {
        pergunta: "O que fazer em caso de cyberbullying?",
        resposta: "1. Não responda às agressões. 2. Salve todas as provas (prints, mensagens). 3. Bloqueie o agressor. 4. Denuncie na plataforma onde ocorreu e também em nosso app. 5. Converse com um adulto de confiança.",
        category: "cyberbullying"
      }
    ];

    faqContainer.innerHTML = faqItems.map((item, index) => `
      <div class="faq-item ${index === 0 ? 'active' : ''}" data-category="${item.category}">
        <div class="faq-question">
          <h4>${item.pergunta}</h4>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-answer">
          <p>${item.resposta}</p>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const item = question.parentElement;
        const wasActive = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(faqItem => {
          faqItem.classList.remove('active');
          faqItem.querySelector('.faq-answer').style.maxHeight = '0';
        });
        
        if (!wasActive) {
          item.classList.add('active');
          const answer = item.querySelector('.faq-answer');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  };
  setupFAQ();

  // =========
  // Modais
  // =========
  const setupModals = () => {
    const FORM_LINK = "https://forms.example.com/denuncia";
    
    // Função para abrir link de denúncia
    const openForm = () => {
      window.open(FORM_LINK, '_blank');
    };
    
    // Configurar botões de denúncia
    const btnDenuncia = document.getElementById('btn-denuncia');
    const btnDenunciaHeader = document.getElementById('btn-denuncia-header');
    
    if (btnDenuncia) {
      btnDenuncia.addEventListener('click', openForm);
    }
    
    if (btnDenunciaHeader) {
      btnDenunciaHeader.addEventListener('click', openForm);
    }
    
    // Configurar outros modais
    const infoModal = document.getElementById('info-modal');
    const btnInfo = document.getElementById('btn-info');
    const sosModal = document.getElementById('sos-modal');
    const btnSos = document.getElementById('btn-sos');
    const closeModal = document.querySelectorAll('.close-modal');
    
    const openModal = (modal) => {
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    };
    
    const closeAllModals = () => {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });
      document.body.style.overflow = '';
    };
    
    if (btnInfo && infoModal) {
      btnInfo.addEventListener('click', () => openModal(infoModal));
    }
    
    if (btnSos && sosModal) {
      btnSos.addEventListener('click', () => openModal(sosModal));
    }
    
    closeModal.forEach(btn => {
      btn.addEventListener('click', closeAllModals);
    });
    
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        closeAllModals();
      }
    });
    
    // Botão de ligar para ajuda
    const btnCallHelp = document.getElementById('btn-call-help');
    if (btnCallHelp) {
      btnCallHelp.addEventListener('click', () => {
        window.open('tel:100');
      });
    }
  };
  setupModals();

  // ===========
  // Dark Mode
  // ===========
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

  // =====================
  // Funções Utilitárias
  // =====================
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    toast.className = 'toast show';
    toast.classList.add(type);
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Botão Saber Mais
  const btnSaberMais = document.getElementById('btn-saber-mais');
  if (btnSaberMais) {
    btnSaberMais.addEventListener('click', () => {
      showToast('Em breve mais informações estatísticas estarão disponíveis!', 'info');
    });
  }

  // Atualiza ano do copyright
  const copyrightElement = document.querySelector('.copyright');
  if (copyrightElement) {
    copyrightElement.textContent = `© ${new Date().getFullYear()} Basta Bullying`;
  }

  // =====================
  // WebView Fixes
  // =====================
  function isWebView() {
    const userAgent = navigator.userAgent.toLowerCase();
    return (userAgent.includes('wv') || 
            userAgent.includes('webview') || 
            /(android|iphone|ipad).*version\/[\d.]+.*chrome\/[^\s]+ mobile/i.test(navigator.userAgent));
  }

  if (isWebView()) {
    // Adiciona feedback tátil para todos os botões
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
      });
      
      btn.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });

    // Previne zoom com toque duplo
    document.addEventListener('dblclick', function(e) {
      e.preventDefault();
    }, { passive: false });
  }

  // =====================
  // Service Worker (PWA)
  // =====================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('ServiceWorker registrado com sucesso: ', registration.scope);
      }).catch(err => {
        console.log('Falha no registro do ServiceWorker: ', err);
      });
    });
  }

  // Torna a função de mensagens disponível globalmente para onclick
  window.showRandomMessage = showRandomMessage;
});

// Função global para compartilhamento
function shareMotivationalMessage() {
  const msg = document.getElementById('mensagem-apoio')?.textContent || "Você é mais forte do que imagina. Acredite em si mesmo!";
  
  if (navigator.share) {
    navigator.share({
      title: 'Basta Bullying',
      text: msg,
      url: window.location.href
    }).catch(err => {
      console.log('Erro ao compartilhar:', err);
    });
  } else {
    // Fallback para navegadores sem Web Share API
    prompt('Copie esta mensagem para compartilhar:', msg);
  }
}