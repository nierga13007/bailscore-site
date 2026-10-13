/* Assistant BailScore : réponses préparées, sans IA, sans appel réseau, sans stockage.
   Les réponses reprennent la FAQ et la page tarifs. À mettre à jour avec elles. */
(function () {
  'use strict';
  if (window.__bsAssistant) return;
  window.__bsAssistant = true;

  var MAIL = 'bailscore13006@gmail.com';

  var KB = [
    { id: 'quoi', k: ['quoi', 'bailscore', 'outil', 'service', 'propose', 'fait quoi', 'presentation', 'c est quoi'],
      a: 'BailScore lit un bail commercial français et donne un score de risque sur 10, axe par axe : destination, travaux, charges, cession, indexation et sécurité. Chaque alerte cite l\'article de loi sur lequel elle repose.',
      next: ['Comment ça marche ?', 'Quel prix ?'] },
    { id: 'marche', k: ['comment', 'fonctionne', 'marche', 'deposer', 'telecharger', 'envoyer', 'etapes', 'analyse'],
      a: 'Vous déposez votre bail en PDF ou en photos (JPG, PNG). Le score global s\'affiche en général en moins de 60 secondes, gratuitement. Le détail par axe, les alertes et les recommandations se débloquent ensuite.',
      link: ['Voir l\'aperçu gratuit', 'https://bailscore-gnlc.vercel.app'],
      next: ['Quel prix ?', 'Mes données sont-elles conservées ?'] },
    { id: 'gratuit', k: ['gratuit', 'gratuite', 'offert', 'essai', 'tester', 'apercu', 'test'],
      a: 'L\'aperçu est gratuit : vous voyez le score global et deux points de vigilance. Pour le rapport complet, il faut le débloquer (49 € pour un bail).',
      link: ['Essayer l\'aperçu gratuit', 'https://bailscore-gnlc.vercel.app'],
      next: ['Quel prix ?'] },
    { id: 'prix', k: ['prix', 'tarif', 'cout', 'combien', 'euro', 'payer', 'abonnement', 'forfait', 'coute'],
      a: 'Pour un bail : 49 € TTC, en paiement unique, sans abonnement. Pour les professionnels qui analysent plusieurs baux : 99 € HT par mois pour 5 analyses, 199 € HT pour 15, 349 € HT pour 40, et sur devis au-delà. Les abonnements sont résiliables à tout moment.',
      link: ['Voir les tarifs', '/tarifs.html'],
      next: ['Comment ça marche ?', 'Ça remplace un avocat ?'] },
    { id: 'pro', k: ['professionnel', 'professionnels', 'agent', 'agence', 'courtier', 'investisseur', 'volume', 'plusieurs baux', 'entreprise', 'societe', 'facture', 'devis'],
      a: 'Pour les professionnels (agents, courtiers, investisseurs), il y a des forfaits mensuels de 5, 15 ou 40 analyses, et un devis sur mesure au-delà de 40 baux par mois. Les prix sont hors taxes et la facture est émise au nom de votre société.',
      link: ['Voir les forfaits', '/tarifs.html'],
      next: ['Quel prix ?'] },
    { id: 'avocat', k: ['avocat', 'notaire', 'remplace', 'conseil juridique', 'juriste', 'juridique'],
      a: 'Non. BailScore est un premier filtre, pas un conseil juridique. Il montre où regarder avant de signer, puis vous décidez s\'il faut un avocat ou un notaire pour approfondir ou faire modifier des clauses.',
      next: ['Sur quels textes ça s\'appuie ?', 'Quel prix ?'] },
    { id: 'cas', k: ['ma clause', 'est legale', 'est elle legale', 'dois je signer', 'valable', 'abusive', 'negocier', 'conseillez vous'],
      a: 'Je ne peux pas donner d\'avis sur un bail précis, et BailScore non plus : ce n\'est pas un conseil juridique. Pour un point sensible, le bon réflexe est de consulter un avocat ou un notaire. L\'aperçu gratuit peut déjà vous montrer où regarder en priorité.',
      link: ['Essayer l\'aperçu gratuit', 'https://bailscore-gnlc.vercel.app'],
      next: ['Ça remplace un avocat ?'] },
    { id: 'duree', k: ['combien de temps', 'duree', 'temps', 'rapide', 'minute', 'secondes', 'long', 'delai'],
      a: 'Le score gratuit s\'affiche généralement en moins de 60 secondes. L\'analyse complète, une fois débloquée, prend environ une minute selon la taille du document.',
      next: ['Quel prix ?'] },
    { id: 'donnees', k: ['donnees', 'conserve', 'conservation', 'confidentiel', 'confidentialite', 'securite', 'stocke', 'stockage', 'rgpd', 'pdf', 'prive', 'garde'],
      a: 'Votre document est utilisé uniquement le temps de l\'analyse et n\'est pas conservé au-delà. Seul le résultat (score et détail) est gardé temporairement pour que vous y accédiez après paiement. Le site n\'utilise aucun cookie de traçage ni de publicité.',
      link: ['Politique de confidentialité', '/confidentialite.html'],
      next: ['Comment ça marche ?'] },
    { id: 'docs', k: ['document', 'documents', 'format', 'photo', 'scan', 'jpg', 'png', 'quels baux', 'cafe', 'restaurant', 'hotel', 'chr', 'commerce', 'habitation', 'professionnel bail'],
      a: 'BailScore est conçu pour les baux commerciaux français, en PDF ou en photos (JPG, PNG), avec une attention particulière au secteur CHR (cafés, hôtels, restaurants). Il fonctionne pour un bail commercial classique. Il ne couvre pas les baux d\'habitation.',
      next: ['Et pour un bail étranger ?'] },
    { id: 'etranger', k: ['suisse', 'belgique', 'etranger', 'luxembourg', 'canada', 'espagne', 'italie', 'allemagne', 'maroc', 'tunisie', 'andorre', 'bail etranger'],
      a: 'BailScore analyse selon le droit français (Code de commerce). Il ne convient pas à un bail soumis à un autre droit, comme le droit suisse ou belge : le résultat ne serait pas fiable.',
      next: ['Quels documents puis-je analyser ?'] },
    { id: 'fiabilite', k: ['fiable', 'fiables', 'fiabilite', 'erreur', 'exhaustif', 'precis', 'precision', 'confiance', 'oublie', 'manque', 'se tromper', 'garantie', 'responsabilite'],
      a: 'Nous ne communiquons pas de taux de fiabilité, faute d\'en avoir mesuré un selon un protocole rigoureux. Ce que nous garantissons : le même bail donne le même score, et chaque alerte cite son fondement légal pour que vous puissiez la vérifier. BailScore ne garantit pas l\'exhaustivité et ne dispense pas d\'une lecture attentive du bail.',
      link: ['Lire la FAQ complète', '/faq.html'],
      next: ['Sur quels textes ça s\'appuie ?'] },
    { id: 'textes', k: ['texte', 'textes', 'article', 'articles', 'loi', 'pinel', 'code de commerce', 'base juridique', 'sources', 'appuie'],
      a: 'La grille s\'appuie sur le Code de commerce : L145-4 (durée et résiliation triennale), L145-37 à L145-39 (révision et indexation), L145-40-2 (charges et inventaire), L145-16 (cession), L145-47 et L145-48 (déspécialisation), ainsi que l\'article 606 du Code civil (grosses réparations).',
      link: ['Lire la FAQ complète', '/faq.html'],
      next: ['Ça remplace un avocat ?'] },
    { id: 'paiement', k: ['paiement', 'payer par', 'par carte', 'carte', 'stripe', 'facture', 'rembours', 'avoir', 'cgv'],
      a: 'Le paiement est sécurisé par Stripe, et la prestation est facturée par CHRONOWEB SRL. Les conditions, y compris sur les erreurs d\'analyse, sont dans les CGV.',
      link: ['Voir les CGV', '/cgv.html'],
      next: ['Quel prix ?'] },
    { id: 'contact', k: ['contact', 'contacter', 'joindre', 'email', 'mail', 'ecrire', 'humain', 'personne', 'parler', 'telephone', 'appel', 'rappel'],
      a: 'Vous pouvez écrire directement à l\'équipe par e-mail. Une réponse écrite vous parvient en général rapidement.',
      mail: true }
  ];

  var GREETING = 'Bonjour, je suis l\'assistant automatique de BailScore. Je réponds aux questions sur l\'outil, les prix et la confidentialité. Je ne donne pas d\'avis juridique sur un bail.';
  var FALLBACK = 'Je n\'ai pas la réponse à cette question. Écrivez-nous et vous aurez une réponse directe.';
  var CHIPS = ['Comment ça marche ?', 'Quel prix ?', 'Mes données sont-elles conservées ?', 'Ça remplace un avocat ?'];

  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function find(q) {
    var n = ' ' + norm(q) + ' ';
    var best = null, bestScore = 0;
    KB.forEach(function (e) {
      var s = 0;
      e.k.forEach(function (w) {
        var nw = norm(w);
        if (n.indexOf(' ' + nw + ' ') > -1) s += 2 + nw.split(' ').length;
        else if (nw.length > 4 && n.indexOf(nw) > -1) s += 1;
      });
      if (s > bestScore) { bestScore = s; best = e; }
    });
    return bestScore >= 2 ? best : null;
  }

  var css = '' +
    '#bsa-btn{position:fixed;right:16px;bottom:16px;z-index:2147483000;background:#C2491D;color:#fff;border:0;border-radius:100px;padding:13px 20px;font-weight:600;font-size:15px;font-family:inherit;cursor:pointer;box-shadow:0 6px 20px rgba(19,17,15,.22)}' +
    '#bsa-btn:hover{background:#a83d16}' +
    '#bsa-btn:focus-visible,#bsa-panel button:focus-visible,#bsa-panel input:focus-visible,#bsa-panel a:focus-visible{outline:3px solid #1F6F54;outline-offset:2px}' +
    '#bsa-panel{position:fixed;right:16px;bottom:16px;z-index:2147483001;width:350px;max-width:calc(100vw - 32px);height:min(560px,calc(100vh - 32px));background:#FFFDF8;color:#13110F;border:1px solid #e3ddd0;border-radius:16px;box-shadow:0 12px 40px rgba(19,17,15,.28);display:none;flex-direction:column;overflow:hidden;font-family:inherit;font-size:15px;line-height:1.5}' +
    '#bsa-panel.open{display:flex}' +
    '#bsa-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#13110F;color:#F7F4ED}' +
    '#bsa-head strong{font-size:15px}' +
    '#bsa-close{background:transparent;border:0;color:#F7F4ED;font-size:22px;line-height:1;cursor:pointer;padding:2px 6px}' +
    '#bsa-log{flex:1;overflow-y:auto;padding:14px 14px 6px;display:flex;flex-direction:column;gap:10px}' +
    '.bsa-m{max-width:88%;padding:10px 13px;border-radius:14px;word-wrap:break-word}' +
    '.bsa-bot{background:#F1ECE0;align-self:flex-start;border-bottom-left-radius:4px}' +
    '.bsa-me{background:#13110F;color:#F7F4ED;align-self:flex-end;border-bottom-right-radius:4px}' +
    '.bsa-m a{display:inline-block;margin-top:8px;color:#C2491D;font-weight:700}' +
    '.bsa-chips{display:flex;flex-wrap:wrap;gap:8px;padding:2px 14px 10px}' +
    '.bsa-chips button{background:#fff;border:1.5px solid #C2491D;color:#C2491D;border-radius:100px;padding:7px 13px;font-weight:600;font-size:13px;font-family:inherit;cursor:pointer}' +
    '.bsa-chips button:hover{background:#C2491D;color:#fff}' +
    '#bsa-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #e3ddd0;background:#FFFDF8}' +
    '#bsa-input{flex:1;min-width:0;border:1px solid #cfc8b8;border-radius:100px;padding:10px 14px;font-size:15px;font-family:inherit;background:#fff;color:#13110F}' +
    '#bsa-send{background:#13110F;color:#F7F4ED;border:0;border-radius:100px;padding:10px 16px;font-weight:600;font-size:14px;font-family:inherit;cursor:pointer}' +
    '#bsa-note{padding:0 14px 10px;font-size:12px;color:#6b655d}' +
    '@media (prefers-reduced-motion:no-preference){#bsa-panel.open{animation:bsaIn .18s ease-out}@keyframes bsaIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}}' +
    '@media (max-width:480px){#bsa-panel{right:8px;left:8px;bottom:8px;width:auto;max-width:none;height:calc(100vh - 16px)}}';

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var btn = document.createElement('button');
  btn.id = 'bsa-btn';
  btn.type = 'button';
  btn.setAttribute('aria-haspopup', 'dialog');
  btn.textContent = 'Une question ?';

  var panel = document.createElement('div');
  panel.id = 'bsa-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Assistant BailScore');

  panel.innerHTML =
    '<div id="bsa-head"><strong>Assistant BailScore</strong><button id="bsa-close" type="button" aria-label="Fermer">&times;</button></div>' +
    '<div id="bsa-log" role="log" aria-live="polite"></div>' +
    '<div class="bsa-chips" id="bsa-chips"></div>' +
    '<div id="bsa-note">Réponses automatiques préparées. Ce n\'est pas un conseil juridique.</div>' +
    '<form id="bsa-form" autocomplete="off"><input id="bsa-input" type="text" maxlength="200" placeholder="Votre question" aria-label="Votre question"><button id="bsa-send" type="submit">Envoyer</button></form>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var log = panel.querySelector('#bsa-log');
  var chips = panel.querySelector('#bsa-chips');
  var input = panel.querySelector('#bsa-input');
  var started = false;

  function scroll() { log.scrollTop = log.scrollHeight; }

  function addMsg(text, who, extra) {
    var d = document.createElement('div');
    d.className = 'bsa-m ' + (who === 'me' ? 'bsa-me' : 'bsa-bot');
    var p = document.createElement('span');
    p.textContent = text;
    d.appendChild(p);
    if (extra && extra.link) {
      d.appendChild(document.createElement('br'));
      var a = document.createElement('a');
      a.textContent = extra.link[0] + ' →';
      a.href = extra.link[1];
      if (/^https?:/.test(extra.link[1])) { a.target = '_blank'; a.rel = 'noopener'; }
      d.appendChild(a);
    }
    if (extra && extra.mail) {
      d.appendChild(document.createElement('br'));
      var m = document.createElement('a');
      m.textContent = MAIL;
      m.href = 'mailto:' + MAIL;
      d.appendChild(m);
    }
    log.appendChild(d);
    scroll();
  }

  function setChips(list) {
    chips.innerHTML = '';
    list.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = t;
      b.addEventListener('click', function () { ask(t); });
      chips.appendChild(b);
    });
  }

  function ask(q) {
    q = (q || '').trim();
    if (!q) return;
    addMsg(q, 'me');
    var e = find(q);
    if (e) {
      addMsg(e.a, 'bot', { link: e.link, mail: e.mail });
      setChips(e.next || CHIPS);
    } else {
      addMsg(FALLBACK, 'bot', { mail: true });
      setChips(CHIPS);
    }
  }

  function open() {
    panel.classList.add('open');
    btn.style.display = 'none';
    if (!started) {
      started = true;
      addMsg(GREETING, 'bot');
      setChips(CHIPS);
    }
    input.focus();
  }

  function close() {
    panel.classList.remove('open');
    btn.style.display = '';
    btn.focus();
  }

  btn.addEventListener('click', open);
  panel.querySelector('#bsa-close').addEventListener('click', close);
  panel.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') close(); });
  panel.querySelector('#bsa-form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var v = input.value;
    input.value = '';
    ask(v);
  });
})();
