/* ========================================= */
/* 1. CONFIGURACIÓN DE TASAS E IDIOMAS MULTINACIONALES */
/* ========================================= */
const TasasCambio = {
  'USD': { tasa: 1, simbolo: '$', codigo: 'USD' },
  'COP': { tasa: 3225.98, simbolo: '$', codigo: 'COP' },
  'MXN': { tasa: 18.20, simbolo: '$', codigo: 'MXN' },
  'EUR': { tasa: 0.92, simbolo: '€', codigo: 'EUR' },
  'ARS': { tasa: 980.00, simbolo: '$', codigo: 'ARS' },
  'CLP': { tasa: 930.00, simbolo: '$', codigo: 'CLP' },
  'PEN': { tasa: 3.75, simbolo: 'S/', codigo: 'PEN' },
  'SAR': { tasa: 3.75, simbolo: 'ر.س', codigo: 'SAR' },
  'CNY': { tasa: 7.15, simbolo: '¥', codigo: 'CNY' },
  'JPY': { tasa: 148.50, simbolo: '¥', codigo: 'JPY' },
  'GBP': { tasa: 0.78, simbolo: '£', codigo: 'GBP' },
  'BRL': { tasa: 5.45, simbolo: 'R$', codigo: 'BRL' },
  'CAD': { tasa: 1.35, simbolo: 'C$', codigo: 'CAD' }
};

const DiccionarioTextos = {
  'ES': {
    'nav-inicio': 'Inicio', 'nav-juego': 'El Juego', 'nav-tienda': 'Tienda', 'nav-soporte': 'Soporte', 'nav-carrito': 'Carrito',
    'heroe-titulo': 'CONSIGUE EL JUEGO COMPLETO Y CONTENIDO EXCLUSIVO',
    'heroe-desc': 'Terror, misterio y experiencias únicas en una sola plataforma. Explora niveles malditos y personaliza tu identidad.',
    'heroe-btn': 'Explorar la Tienda', 'juego-titulo': 'El Misterio de LOOP',
    'juego-p1': 'Estás atrapado en una locación cambiante de bloques infinitos. Cada rincón esconde una pista y cada pasillo te acerca a una entidad que vigila tus movimientos en la oscuridad.',
    'juego-quote': '"Si te atrapa, el tiempo se reinicia. Usa tu vida anterior para resolver los acertijos y romper el bucle."',
    'tienda-niveles': 'Niveles y Expansiones', 'prod1-title': 'Capítulo II: Uno mas', 'prod1-desc': 'Desbloquea el juego principal y los primeros misterios de LOOP.',
    'prod2-title': 'El Desastre', 'prod2-desc': 'Un nuevo set de niveles de terror psicológico extremo "¿Podrias sobrevivir?".',
    'btn-comprar': 'Comprar', 'tienda-avatars': 'AVATARS Y ATUENDOS', 'slider-avatars': 'Mis Avatares', 'slider-vestuarios': 'Mis Vestuarios',
    'tag-gratis': 'Gratis', 'btn-obtener-avatares': 'Obtener Avatares', 'btn-comprar-atuendo': 'Comprar Atuendo',
    'soporte-titulo': 'Centro de Ayuda / Problemas y Sugerencias', 'form-usuario': 'Usuario de Roblox / Correo de contacto:', 'form-tipo': 'Tipo de Mensaje:',
    'opt-bug': 'Reportar Bug / Error Técnico', 'opt-pagos': 'Problema con Compras o Pagos', 'opt-sugerencia': 'Sugerencia de Mejora', 'opt-otro': 'Otro problema',
    'form-detalles': 'Detalles de tu mensaje:', 'btn-enviar-msg': 'Enviar Mensaje', 'legal-venta': 'Términos de Venta', 'legal-privacidad': 'Política de Privacidad',
    'modal-region-title': 'Configuración de Región', 'lbl-select-moneda': 'Selecciona tu Moneda:', 'lbl-select-idioma': 'Selecciona tu Idioma:',
    'btn-guardar-cambios': 'Guardar Cambios', 'btn-cancelar': 'Cancelar', 'modal-carrito-title': 'Tu Carrito de Compras', 'lbl-total': 'Total:', 'btn-checkout': 'Finalizar Compra', 'btn-cerrar': 'Cerrar',
    'ia-estado': '● Sistema activo', 'ia-sug1': '¿De qué trata?', 'ia-sug2': 'Productos', 'ia-sug3': 'Precios', 'ia-sug4': 'Soporte',
    'ia-welcome': '👁️ Bienvenido al sistema de inteligencia de LOOP.<br><br>¿Qué deseas consultar hoy sobre el juego o la tienda?'
  },
  'EN': {
    'nav-inicio': 'Home', 'nav-juego': 'The Game', 'nav-tienda': 'Store', 'nav-soporte': 'Support', 'nav-carrito': 'Cart',
    'heroe-titulo': 'GET THE FULL GAME AND EXCLUSIVE CONTENT',
    'heroe-desc': 'Horror, mystery, and unique experiences on a single platform. Explore cursed levels and customize your identity.',
    'heroe-btn': 'Explore the Store', 'juego-titulo': 'The Mystery of LOOP',
    'juego-p1': 'You are trapped in a shifting location of endless blocks. Every corner hides a clue, and every hallway brings you closer to an entity watching your moves in the dark.',
    'juego-quote': '"If it catches you, time resets. Use your past life to solve the puzzles and break the loop."',
    'tienda-niveles': 'Levels and Expansions', 'prod1-title': 'Chapter II: One More', 'prod1-desc': 'Unlock the main game and the initial mysteries of LOOP.',
    'prod2-title': 'The Disaster', 'prod2-desc': 'A new set of extreme psychological horror levels. "Could you survive?"',
    'btn-comprar': 'Buy Now', 'tienda-avatars': 'AVATARS & OUTFITS', 'slider-avatars': 'My Avatars', 'slider-vestuarios': 'My Outfits',
    'tag-gratis': 'Free', 'btn-obtener-avatares': 'Get Avatars', 'btn-comprar-atuendo': 'Buy Outfit',
    'soporte-titulo': 'Help Center / Issues & Suggestions', 'form-usuario': 'Roblox Username / Contact Email:', 'form-tipo': 'Message Type:',
    'opt-bug': 'Report Bug / Technical Issue', 'opt-pagos': 'Purchase or Payment Problem', 'opt-sugerencia': 'Improvement Suggestion', 'opt-otro': 'Other Issue',
    'form-detalles': 'Message Details:', 'btn-enviar-msg': 'Send Message', 'legal-venta': 'Terms of Sale', 'legal-privacidad': 'Privacy Policy',
    'modal-region-title': 'Region & Language Settings', 'lbl-select-moneda': 'Select Currency:', 'lbl-select-idioma': 'Select Language:',
    'btn-guardar-cambios': 'Save Changes', 'btn-cancelar': 'Cancel', 'modal-carrito-title': 'Your Shopping Cart', 'lbl-total': 'Total:', 'btn-checkout': 'Checkout', 'btn-cerrar': 'Close',
    'ia-estado': '● System Active', 'ia-sug1': 'What is it about?', 'ia-sug2': 'Products', 'ia-sug3': 'Prices', 'ia-sug4': 'Support',
    'ia-welcome': '👁️ Welcome to the LOOP intelligence system.<br><br>How can I assist you with the game or store today?'
  },
  'AR': {
    'nav-inicio': 'الرئيسية', 'nav-juego': 'اللعبة', 'nav-tienda': 'المتجر', 'nav-soporte': 'الدعم', 'nav-carrito': 'السلة',
    'heroe-titulo': 'احصل على اللعبة المحتوى الحصري',
    'heroe-desc': 'رعب وغموض وتجارب فريدة في منصة واحدة. استكشف المستويات الملعونة.',
    'heroe-btn': 'استكشف المتجر', 'juego-titulo': 'لغز LOOP',
    'juego-p1': 'أنت محاصر في ممرات لا تنتهي. كل زاوية تخفي سرا والكيان يراقبك في الظلام.',
    'juego-quote': '"إذا أمسك بك، سيعاد الوقت. استخدم حياتك السابقة لحل الألغاز."',
    'tienda-niveles': 'المستويات والتوسعات', 'prod1-title': 'الفصل الثاني: واحد آخر', 'prod1-desc': 'افتح اللعبة الرئيسية وأول أسرار LOOP.',
    'prod2-title': 'الكارثة', 'prod2-desc': 'مجموعة جديدة من مستويات الرعب النفسي.',
    'btn-comprar': 'شراء', 'tienda-avatars': 'الشخصيات والملابس', 'slider-avatars': 'شخصياتي', 'slider-vestuarios': 'أزيائي',
    'tag-gratis': 'مجاني', 'btn-obtener-avatares': 'الحصول على الشخصيات', 'btn-comprar-atuendo': 'شراء الزي',
    'soporte-titulo': 'مركز المساعدة والدعم', 'form-usuario': 'اسم روبلوكس / البريد الإلكتروني:', 'form-tipo': 'نوع الرسالة:',
    'opt-bug': 'الإبلاغ عن خطأ تقني', 'opt-pagos': 'مشكلة في الشراء', 'opt-sugerencia': 'اقتراح تحسين', 'opt-otro': 'مشكلة أخرى',
    'form-detalles': 'تفاصيل الرسالة:', 'btn-enviar-msg': 'إرسال الرسالة', 'legal-venta': 'شروط البيع', 'legal-privacidad': 'سياسة الخصوصية',
    'modal-region-title': 'إعدادات المنطقة واللغة', 'lbl-select-moneda': 'اختر عملتك:', 'lbl-select-idioma': 'اختر لغتك:',
    'btn-guardar-cambios': 'حفظ التغييرات', 'btn-cancelar': 'إلغاء', 'modal-carrito-title': 'سلة التسوق', 'lbl-total': 'المجموع:', 'btn-checkout': 'إنهاء الشراء', 'btn-cerrar': 'إغلاق',
    'ia-estado': '● النظام نشط', 'ia-sug1': 'عن ماذا تتحدث؟', 'ia-sug2': 'المنتجات', 'ia-sug3': 'الأسعار', 'ia-sug4': 'الدعم',
    'ia-welcome': '👁️ مرحبًا بك في نظام الذكاء الاصطناعي لـ LOOP.<br><br>كيف يمكنني مساعدتك اليوم؟'
  },
  'ZH': {
    'nav-inicio': '首页', 'nav-juego': '游戏', 'nav-tienda': '商店', 'nav-soporte': '支持', 'nav-carrito': '购物车',
    'heroe-titulo': '获取完整游戏与独家内容',
    'heroe-desc': '恐怖、神秘与独特的体验集于一身。探索诅咒关卡，打造个人身份。',
    'heroe-btn': '浏览商店', 'juego-titulo': 'LOOP 的奥秘',
    'juego-p1': '你被困在一个不断变化的无尽方块迷宫中。每个角落都隐藏着线索，走廊里的存在正监视着你。',
    'juego-quote': '“如果被抓到，时间将重置。利用上一世的经历解开谜题，打破循环。”',
    'tienda-niveles': '关卡与扩展包', 'prod1-title': '第二章：再来一个', 'prod1-desc': '解锁主游戏及 LOOP 的首批谜团。',
    'prod2-title': '大灾难', 'prod2-desc': '全新极端心理恐怖关卡。“你能存活下来吗？”',
    'btn-comprar': '购买', 'tienda-avatars': '角色与服装', 'slider-avatars': '我的角色', 'slider-vestuarios': '我的服装',
    'tag-gratis': '免费', 'btn-obtener-avatares': '获取角色', 'btn-comprar-atuendo': '购买套装',
    'soporte-titulo': '帮助中心 / 问题与建议', 'form-usuario': 'Roblox 用户名 / 联系邮箱:', 'form-tipo': '消息类型:',
    'opt-bug': '报告技术漏洞', 'opt-pagos': '购买与支付问题', 'opt-sugerencia': '改进建议', 'opt-otro': '其他问题',
    'form-detalles': '消息详情:', 'btn-enviar-msg': '发送消息', 'legal-venta': '销售条款', 'legal-privacidad': '隐私政策',
    'modal-region-title': '地区与语言设置', 'lbl-select-moneda': '选择货币:', 'lbl-select-idioma': '选择语言:',
    'btn-guardar-cambios': '保存更改', 'btn-cancelar': '取消', 'modal-carrito-title': '您的购物车', 'lbl-total': '总计:', 'btn-checkout': '结账', 'btn-cerrar': '关闭',
    'ia-estado': '● 系统运行中', 'ia-sug1': '关于什么？', 'ia-sug2': '产品', 'ia-sug3': '价格', 'ia-sug4': '技术支持',
    'ia-welcome': '👁️ 欢迎来到 LOOP AI 智能系统。<br><br>今天有什么可以帮助您的？'
  },
  'FR': {
    'nav-inicio': 'Accueil', 'nav-juego': 'Le Jeu', 'nav-tienda': 'Boutique', 'nav-soporte': 'Support', 'nav-carrito': 'Panier',
    'heroe-titulo': 'OBTENEZ LE JEU COMPLET ET DU CONTENU EXCLUSIF',
    'heroe-desc': 'Horreur, mystère et expériences uniques sur une seule plateforme.',
    'heroe-btn': 'Explorer la Boutique', 'juego-titulo': 'Le Mystère de LOOP',
    'juego-p1': 'Vous êtes piégé dans un endroit changeant aux couloirs infinis. Chaque coin cache un indice.',
    'juego-quote': '"Si elle vous attrape, le temps recommence. Utilisez votre vie passée pour briser la boucle."',
    'tienda-niveles': 'Niveaux et Extensions', 'prod1-title': 'Chapitre II: Un de plus', 'prod1-desc': 'Débloquez le jeu principal et les premiers mystères.',
    'prod2-title': 'Le Désastre', 'prod2-desc': 'Un nouvel ensemble de niveaux d\'horreur psychologique.',
    'btn-comprar': 'Acheter', 'tienda-avatars': 'AVATARS ET TENUES', 'slider-avatars': 'Mes Avatars', 'slider-vestuarios': 'Mes Tenues',
    'tag-gratis': 'Gratuit', 'btn-obtener-avatares': 'Obtenir les Avatars', 'btn-comprar-atuendo': 'Acheter la tenue',
    'soporte-titulo': 'Centre d\'aide et Support', 'form-usuario': 'Nom Roblox / Email:', 'form-tipo': 'Type de message:',
    'opt-bug': 'Signaler un bug', 'opt-pagos': 'Problème de paiement', 'opt-sugerencia': 'Suggestion', 'opt-otro': 'Autre',
    'form-detalles': 'Détails:', 'btn-enviar-msg': 'Envoyer', 'legal-venta': 'Conditions de vente', 'legal-privacidad': 'Confidentialité',
    'modal-region-title': 'Région et Langue', 'lbl-select-moneda': 'Monnaie:', 'lbl-select-idioma': 'Langue:',
    'btn-guardar-cambios': 'Sauvegarder', 'btn-cancelar': 'Annuler', 'modal-carrito-title': 'Votre Panier', 'lbl-total': 'Total:', 'btn-checkout': 'Payer', 'btn-cerrar': 'Fermer',
    'ia-estado': '● Système actif', 'ia-sug1': 'De quoi s\'agit-il?', 'ia-sug2': 'Produits', 'ia-sug3': 'Prix', 'ia-sug4': 'Support',
    'ia-welcome': '👁️ Bienvenue sur le système LOOP IA.<br><br>Comment puis-je vous aider aujourd\'hui?'
  },
  'DE': {
    'nav-inicio': 'Startseite', 'nav-juego': 'Das Spiel', 'nav-tienda': 'Shop', 'nav-soporte': 'Support', 'nav-carrito': 'Warenkorb',
    'heroe-titulo': 'HOL DIR DAS KOMPLETTE SPIEL UND EXKLUSIVE INHALTE',
    'heroe-desc': 'Horror, Geheimnisse und einzigartige Erlebnisse auf einer Plattform.',
    'heroe-btn': 'Shop Erkunden', 'juego-titulo': 'Das Geheimnis von LOOP',
    'juego-p1': 'Du bist in veränderten unendlichen Korridoren gefangen. Jede Ecke birgt ein Geheimnis.',
    'juego-quote': '"Wenn es dich fängt, startet die Zeit neu. Nutze dein früheres Leben, um das Rätsel zu lösen."',
    'tienda-niveles': 'Level & Erweiterungen', 'prod1-title': 'Kapitel II: Noch Einer', 'prod1-desc': 'Schalte das Hauptspiel und die ersten Geheimnisse frei.',
    'prod2-title': 'Das Desaster', 'prod2-desc': 'Ein neues Set extremer psychologischer Horror-Level.',
    'btn-comprar': 'Kaufen', 'tienda-avatars': 'AVATARE & OUTFITS', 'slider-avatars': 'Meine Avatare', 'slider-vestuarios': 'Meine Outfits',
    'tag-gratis': 'Kostenlos', 'btn-obtener-avatares': 'Avatare Holen', 'btn-comprar-atuendo': 'Outfit Kaufen',
    'soporte-titulo': 'Hilfe-Center & Support', 'form-usuario': 'Roblox-Name / E-Mail:', 'form-tipo': 'Nachrichtenart:',
    'opt-bug': 'Bug melden', 'opt-pagos': 'Zahlungsproblem', 'opt-sugerencia': 'Vorschlag', 'opt-otro': 'Sonstiges',
    'form-detalles': 'Details:', 'btn-enviar-msg': 'Senden', 'legal-venta': 'Verkaufsbedingungen', 'legal-privacidad': 'Datenschutz',
    'modal-region-title': 'Region & Sprache', 'lbl-select-moneda': 'Währung:', 'lbl-select-idioma': 'Sprache:',
    'btn-guardar-cambios': 'Speichern', 'btn-cancelar': 'Abbrechen', 'modal-carrito-title': 'Warenkorb', 'lbl-total': 'Gesamt:', 'btn-checkout': 'Kasse', 'btn-cerrar': 'Schließen',
    'ia-estado': '● System aktiv', 'ia-sug1': 'Worum geht es?', 'ia-sug2': 'Produkte', 'ia-sug3': 'Preise', 'ia-sug4': 'Support',
    'ia-welcome': '👁️ Willkommen beim LOOP KI-System.<br><br>Wie kann ich dir heute helfen?'
  },
  'JA': {
    'nav-inicio': 'ホーム', 'nav-juego': 'ゲーム', 'nav-tienda': 'ショップ', 'nav-soporte': 'サポート', 'nav-carrito': 'カート',
    'heroe-titulo': '完全版ゲームと限定コンテンツを手に入れよう',
    'heroe-desc': '恐怖、ミステリー、そしてユニークな体験がひとつのプラットフォームに。呪われたレベルを探索しよう。',
    'heroe-btn': 'ショップを見る', 'juego-titulo': 'LOOPの謎',
    'juego-p1': 'あなたは無限に変化する通路の中に閉じ込められています。暗闇の中で何かがあなたを見つめています。',
    'juego-quote': '「捕まれば時間がリセットされる。前世の経験を活かしてループを断ち切れ。」',
    'tienda-niveles': 'レベルと拡張コンテンツ', 'prod1-title': 'チャプターII：もう一人', 'prod1-desc': 'メインゲームと最初の謎を解放。',
    'prod2-title': '惨劇 (The Disaster)', 'prod2-desc': '極限の心理ホラーレベルのセット。生存できるか？',
    'btn-comprar': '購入する', 'tienda-avatars': 'アバター＆衣装', 'slider-avatars': 'アバター一覧', 'slider-vestuarios': '衣装一覧',
    'tag-gratis': '無料', 'btn-obtener-avatares': 'アバターを入手', 'btn-comprar-atuendo': '衣装を購入',
    'soporte-titulo': 'ヘルプセンター / お問い合わせ', 'form-usuario': 'Robloxユーザー名 / メール:', 'form-tipo': 'お問い合わせ種類:',
    'opt-bug': 'バグ・不具合報告', 'opt-pagos': '購入・決済のトラブル', 'opt-sugerencia': '改善のご提案', 'opt-otro': 'その他のお問い合わせ',
    'form-detalles': '詳細内容:', 'btn-enviar-msg': '送信する', 'legal-venta': '特定商取引法に基づく表記', 'legal-privacidad': 'プライバシーポリシー',
    'modal-region-title': '地域と言語の設定', 'lbl-select-moneda': '通貨を選択:', 'lbl-select-idioma': '言語を選択:',
    'btn-guardar-cambios': '変更を保存', 'btn-cancelar': 'キャンセル', 'modal-carrito-title': 'ショッピングカート', 'lbl-total': '合計:', 'btn-checkout': 'レジに進む', 'btn-cerrar': '閉じる',
    'ia-estado': '● システム稼働中', 'ia-sug1': 'どんなゲーム？', 'ia-sug2': '商品一覧', 'ia-sug3': '価格について', 'ia-sug4': 'サポート',
    'ia-welcome': '👁️ LOOP AIアシスタントへようこそ。<br><br>ご質問をどうぞ。'
  },
  'PT': {
    'nav-inicio': 'Início', 'nav-juego': 'O Jogo', 'nav-tienda': 'Loja', 'nav-soporte': 'Suporte', 'nav-carrito': 'Carrinho',
    'heroe-titulo': 'OBTENHA O JOGO COMPLETO E CONTEÚDO EXCLUSIVO',
    'heroe-desc': 'Terror, mistério e experiências únicas em uma única plataforma. Explore níveis amaldiçoados.',
    'heroe-btn': 'Explorar a Loja', 'juego-titulo': 'O Mistério de LOOP',
    'juego-p1': 'Você está preso em um local em constante mudança. Cada corredor esconde uma pista na escuridão.',
    'juego-quote': '"Se ele te pegar, o tempo reinicia. Use sua vida anterior para quebrar o ciclo."',
    'tienda-niveles': 'Níveis e Expansões', 'prod1-title': 'Capítulo II: Mais um', 'prod1-desc': 'Desbloqueie o jogo principal e os primeiros mistérios.',
    'prod2-title': 'O Desastre', 'prod2-desc': 'Um novo conjunto de níveis de terror psicológico extremo.',
    'btn-comprar': 'Comprar', 'tienda-avatars': 'AVATARES E ROUPAS', 'slider-avatars': 'Meus Avatares', 'slider-vestuarios': 'Minhas Roupas',
    'tag-gratis': 'Grátis', 'btn-obtener-avatares': 'Obter Avatares', 'btn-comprar-atuendo': 'Comprar Roupa',
    'soporte-titulo': 'Centro de Ajuda e Suporte', 'form-usuario': 'Usuário Roblox / E-mail:', 'form-tipo': 'Tipo de Mensagem:',
    'opt-bug': 'Reportar Bug', 'opt-pagos': 'Problema com Pagamento', 'opt-sugerencia': 'Sugestão', 'opt-otro': 'Outro problema',
    'form-detalles': 'Detalhes:', 'btn-enviar-msg': 'Enviar Mensagem', 'legal-venta': 'Termos de Venda', 'legal-privacidad': 'Política de Privacidade',
    'modal-region-title': 'Configuração de Região', 'lbl-select-moneda': 'Moeda:', 'lbl-select-idioma': 'Idioma:',
    'btn-guardar-cambios': 'Salvar Alterações', 'btn-cancelar': 'Cancelar', 'modal-carrito-title': 'Seu Carrinho', 'lbl-total': 'Total:', 'btn-checkout': 'Finalizar Compra', 'btn-cerrar': 'Fechar',
    'ia-estado': '● Sistema ativo', 'ia-sug1': 'Sobre o jogo', 'ia-sug2': 'Produtos', 'ia-sug3': 'Preços', 'ia-sug4': 'Suporte',
    'ia-welcome': '👁️ Bem-vindo ao sistema de inteligência LOOP.<br><br>Como posso ajudar hoje?'
  }
};

let monedaActual = 'USD';
let idiomaActual = 'ES';

/* ========================================= */
/* 2. REFRESCAR PRECIOS E IDIOMA EN VIVO */
/* ========================================= */
function aplicarConfiguracionGlobal() {
  const infoMoneda = TasasCambio[monedaActual];

  // RTL para idioma Árabe
  if (idiomaActual === 'AR') {
    document.body.classList.add('rtl');
  } else {
    document.body.classList.remove('rtl');
  }

  // Actualizar etiquetas del navbar
  document.getElementById('lbl-moneda-nav').textContent = monedaActual;
  document.getElementById('lbl-lang-nav').textContent = idiomaActual;

  // Actualizar Precios Dinámicos en la Tienda
  document.querySelectorAll('.precio-dinamico').forEach(el => {
    const usdVal = parseFloat(el.getAttribute('data-usd'));
    if (usdVal === 0) {
      const textos = DiccionarioTextos[idiomaActual] || DiccionarioTextos['ES'];
      el.textContent = textos['tag-gratis'];
    } else {
      const convertido = (usdVal * infoMoneda.tasa).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      el.textContent = `${infoMoneda.simbolo}${convertido} ${infoMoneda.codigo}`;
    }
  });

  // Actualizar Idiomas de la UI
  const textos = DiccionarioTextos[idiomaActual] || DiccionarioTextos['ES'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const clave = el.getAttribute('data-i18n');
    if (textos[clave]) {
      el.innerHTML = textos[clave];
    }
  });

  // Actualizar Carrito
  actualizarCarrito();
}

// Eventos Modal de Región
const modalRegion = document.getElementById('modal-region');
document.getElementById('btn-abrir-region').addEventListener('click', () => modalRegion.style.display = 'flex');
document.getElementById('btn-cerrar-region').addEventListener('click', () => modalRegion.style.display = 'none');

document.getElementById('btn-guardar-region').addEventListener('click', () => {
  monedaActual = document.getElementById('sel-moneda').value;
  idiomaActual = document.getElementById('sel-idioma').value;
  aplicarConfiguracionGlobal();
  modalRegion.style.display = 'none';
});

/* ========================================= */
/* 3. SELECCIÓN DE TARJETAS CARRUSEL */
/* ========================================= */
function selectCard(clickedCard) {
  const track = clickedCard.closest('.carousel-track');
  if (track) {
    track.classList.add('paused');
    const siblingCards = track.querySelectorAll('.card');
    siblingCards.forEach(card => card.classList.remove('selected'));
    clickedCard.classList.add('selected');
  }
}

/* ========================================= */
/* 4. GESTIÓN DEL CARRITO DE COMPRAS */
/* ========================================= */
let carrito = [];
const modalCarrito = document.getElementById('modal-carrito');
const btnAbrirCarrito = document.getElementById('btn-abrir-carrito');
const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');
const btnCheckout = document.getElementById('btn-checkout');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarritoEl = document.getElementById('total-carrito');
const contadorCarritoEl = document.getElementById('contador-carrito');

btnAbrirCarrito.addEventListener('click', (e) => {
  e.preventDefault();
  modalCarrito.style.display = 'flex';
});

btnCerrarCarrito.addEventListener('click', () => {
  modalCarrito.style.display = 'none';
});

function agregarAlCarrito(nombre, precioUSD) {
  carrito.push({ nombre, precioUSD });
  actualizarCarrito();
  modalCarrito.style.display = 'flex';
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let totalUSD = 0;
  const infoMoneda = TasasCambio[monedaActual];

  carrito.forEach((item, index) => {
    totalUSD += item.precioUSD;
    const precioConv = (item.precioUSD * infoMoneda.tasa).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const div = document.createElement('div');
    div.className = 'item-carrito';
    div.innerHTML = `
      <span>${item.nombre} - ${infoMoneda.simbolo}${precioConv} ${infoMoneda.codigo}</span>
      <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">X</button>
    `;
    listaCarrito.appendChild(div);
  });

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `<p style="text-align:center; color:#a496ba;">El carrito está vacío / Empty cart</p>`;
  }

  const totalConvertido = (totalUSD * infoMoneda.tasa).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  totalCarritoEl.textContent = totalConvertido;
  document.getElementById('simbolo-moneda').textContent = infoMoneda.simbolo;
  document.getElementById('codigo-moneda').textContent = infoMoneda.codigo;
  contadorCarritoEl.textContent = carrito.length;
}

btnCheckout.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  const infoMoneda = TasasCambio[monedaActual];
  let totalUSD = carrito.reduce((sum, item) => sum + item.precioUSD, 0);
  let totalConv = (totalUSD * infoMoneda.tasa).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  alert(`¡Gracias por tu compra! / Thank you! Total: ${infoMoneda.simbolo}${totalConv} ${infoMoneda.codigo}`);
  carrito = [];
  actualizarCarrito();
  modalCarrito.style.display = 'none';
});

/* ========================================= */
/* 5. IA INTERACTIVA MULTILENGUAJE (LOOP IA) */
/* ========================================= */
const abrirIA = document.getElementById('abrirIA');
const cerrarIA = document.getElementById('cerrarIA');
const loopIA = document.getElementById('loopIA');
const iaInput = document.getElementById('iaInput');
const iaEnviar = document.getElementById('iaEnviar');
const iaMensajes = document.getElementById('iaMensajes');

abrirIA.addEventListener('click', () => loopIA.style.display = 'flex');
cerrarIA.addEventListener('click', () => loopIA.style.display = 'none');

function responderIA(textoUsuario) {
  agregarMensaje(textoUsuario, 'ia-usuario');

  const consulta = textoUsuario.toLowerCase();
  let respuesta = "No comprendo del todo tu mensaje. ¿Puedes preguntar sobre el juego, los precios o la tienda?";

  if (consulta.includes('trata') || consulta.includes('juego') || consulta.includes('about') || consulta.includes('game')) {
    respuesta = "LOOP es un videojuego de terror psicológico en pasillos infinitos. Si la entidad te atrapa, el tiempo se reinicia.";
  } else if (consulta.includes('producto') || consulta.includes('tienda') || consulta.includes('product') || consulta.includes('store')) {
    respuesta = "Vendemos expansiones de nivel como 'Capítulo II', 'El Desastre', Avatares y Atuendos Premium.";
  } else if (consulta.includes('precio') || consulta.includes('price') || consulta.includes('cost')) {
    respuesta = "Los precios van desde $4.99 USD hasta $15.00 USD (convertibles a tu moneda local).";
  } else if (consulta.includes('soporte') || consulta.includes('support') || consulta.includes('bug')) {
    respuesta = "Puedes reportar problemas en el formulario de la sección Soporte al final de la página.";
  }

  setTimeout(() => {
    agregarMensaje('👁️ ' + respuesta, 'ia-bot');
  }, 500);
}

function agregarMensaje(texto, clase) {
  const msg = document.createElement('div');
  msg.className = `ia-mensaje ${clase}`;
  msg.innerHTML = texto;
  iaMensajes.appendChild(msg);
  iaMensajes.scrollTop = iaMensajes.scrollHeight;
}

function enviarSugerencia(texto) {
  responderIA(texto);
}

iaEnviar.addEventListener('click', () => {
  const txt = iaInput.value.trim();
  if (txt) {
    responderIA(txt);
    iaInput.value = '';
  }
});

iaInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const txt = iaInput.value.trim();
    if (txt) {
      responderIA(txt);
      iaInput.value = '';
    }
  }
});

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  aplicarConfiguracionGlobal();
});