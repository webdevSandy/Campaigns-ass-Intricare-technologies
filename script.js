/* ── State ── */
const S = {
  workflow: 'advanced',
  data: null,
  selectedMethod: null,
  selectedLookalike: null
};

/* ── SVG icon library (used by stepper + method cards) ── */
const ICONS = {
  list:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  user:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  gear:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  chart:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  linkedin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#4F6EE8"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-11 14H6V10h2v7zm-1-8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 8h-2v-3.5c0-.83-.67-1.5-1.5-1.5S11 12.67 11 13.5V17H9v-7h2v1.5c.69-.79 1.59-1.5 2.5-1.5 1.93 0 3.5 1.57 3.5 3.5V17z"/></svg>',
  doc:      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F6EE8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>',
  users:    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F6EE8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  chat:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  send:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
};

/* ══ Helpers ══ */
const $  = (id) => document.getElementById(id);
const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])
);

/* ══ Boot ══ */
document.addEventListener('DOMContentLoaded', async () => {
  setupDrag();
  await loadData();
  renderAll();
  showPage('pg-list');
});

async function loadData() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    S.data = await res.json();
  } catch (err) {
    console.error('Could not load data.json — make sure you are serving via a local HTTP server (e.g. VS Code Live Server, or `python -m http.server`).', err);
    showToast('⚠️ Failed to load data.json — run via a local server.');
    S.data = { campaigns: [], leadLists: [], lookalikeAudiences: [], senderProfiles: [], csvMapping: [], workflowOptions: [], timezones: [], filters: { channels: [], statuses: [] }, navigation: [], user: {}, webhookUrl: '' };
  }
}

function renderAll() {
  renderUser();
  renderNav();
  renderFilters();
  renderTable();
  renderLeadLists();
  renderLookalike();
  renderSenders();
  renderMapping();
  renderWorkflowOptions();
  renderTimezones();
  renderWebhook();
  renderStepper(1);
  renderImportMethods();
  renderSettings();
}

/* ══ THEME ══ */
function setTheme(t) {
  document.body.classList.toggle('dark', t === 'dark');
  $('btn-light').classList.toggle('active', t === 'light');
  $('btn-dark').classList.toggle('active', t  === 'dark');
}

/* ══ MOBILE SIDEBAR DRAWER ══ */
function toggleSidebar() {
  document.body.classList.toggle('sidebar-open');
}

// Auto-close drawer when window resizes back to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) document.body.classList.remove('sidebar-open');
});

/* ══ PAGE SWITCHING ══ */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  $('flow-wrap').style.display = 'none';
  const el = $(id);
  if (el) el.classList.add('active');
  setBreadcrumb(id);
}

function setBreadcrumb(id) {
  const labels = { 'pg-empty':'Campaign', 'pg-list':'Campaign' };
  $('bc-page').textContent = labels[id] || 'Campaign';
  const sub  = $('bc-sub');
  const sep2 = $('bc-sep2');
  if (id === 'pg-empty' || id === 'pg-list') {
    sub.style.display = 'none'; sep2.style.display = 'none';
  } else {
    sub.style.display = ''; sep2.style.display = '';
    sub.textContent = S.workflow === 'simple' ? 'Simple Campaign' : 'Advance Campaign';
  }
}

/* ══ USER / NAV ══ */
function renderUser() {
  const u = S.data.user || {};
  $('sb-name').textContent  = u.name  || '';
  $('sb-role').textContent  = u.role  || '';
  $('sb-email').textContent = u.email || '';
  $('sb-avatar').src        = u.avatar || '';
  $('tu-name').textContent  = u.name  || '';
  $('tu-role').textContent  = u.role  || '';
  $('tu-avatar').src        = u.avatar || '';
}

function renderNav() {
  const nav = $('sidebar-nav');
  nav.innerHTML = (S.data.navigation || []).map(n => `
    <a class="nav-link${n.active ? ' active' : ''}" href="#">
      <span>${escapeHtml(n.icon)}</span> ${escapeHtml(n.label)}
    </a>
  `).join('');
}

/* ══ FILTERS ══ */
function renderFilters() {
  const ch = $('filter-channel');
  const st = $('filter-status');
  const f = S.data.filters || { channels: [], statuses: [] };
  ch.innerHTML = '<option value="">Channel</option>' +
    f.channels.map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('');
  st.innerHTML = '<option value="">Status</option>' +
    f.statuses.map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('');
}

function applyFilters() {
  const channel = ($('filter-channel')?.value || '').toLowerCase();
  const status  = ($('filter-status')?.value  || '').toLowerCase();

  document.querySelectorAll('.camp-tbl tbody tr').forEach(row => {
    const rowChannel = (row.dataset.channel || '').toLowerCase();
    const rowStatus  = (row.dataset.status  || '').toLowerCase();
    const channelMatch = !channel || rowChannel.includes(channel);
    const statusMatch  = !status  || rowStatus  === status;
    row.style.display = (channelMatch && statusMatch) ? '' : 'none';
  });

  const tbody = document.querySelector('.camp-tbl tbody');
  if (!tbody) return;
  const realRows = [...tbody.querySelectorAll('tr')].filter(r => !r.classList.contains('no-results-row'));
  const anyVisible = realRows.some(r => r.style.display !== 'none');
  let noRow = tbody.querySelector('.no-results-row');
  if (!anyVisible && realRows.length) {
    if (!noRow) {
      noRow = document.createElement('tr');
      noRow.className = 'no-results-row';
      noRow.innerHTML = `<td colspan="10" style="text-align:center;padding:32px;color:var(--muted);font-size:13px;">No campaigns match the selected filters.</td>`;
      tbody.appendChild(noRow);
    }
  } else if (noRow) {
    noRow.remove();
  }
}

function clearFilters() {
  $('filter-channel').value = '';
  $('filter-status').value  = '';
  applyFilters();
}

/* ══ CAMPAIGN TABLE ══ */
function renderTable() {
  const tbody = $('camp-tbody');
  if (!tbody) return;
  const camps = S.data.campaigns || [];
  if (!camps.length) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:48px;color:var(--muted);font-size:13px;">No campaigns yet. Click <strong>New Campaign</strong> to get started.</td></tr>`;
    return;
  }
  tbody.innerHTML = camps.map(c => `
    <tr data-channel="${(c.channels || []).join(' ')}" data-status="${escapeHtml(c.status)}">
      <td class="td-check"><input type="checkbox"/></td>
      <td class="td-campaign">
        <div class="camp-name">
          ${escapeHtml(c.name)}
          ${(c.channels || []).map(ch => `<span class="ch-tag ${ch}">${ch === 'linkedin' ? 'LinkedIn' : ch === 'email' ? 'Email' : escapeHtml(ch)}</span>`).join('')}
        </div>
        <div class="camp-date">Created On: ${escapeHtml(c.createdOn)}</div>
      </td>
      <td class="td-crm">${renderCrm(c.crm)}</td>
      <td class="td-stat"><div class="stat-num">${c.invitesSent.count}</div><div class="stat-sub">${escapeHtml(c.invitesSent.subtext)}</div></td>
      <td class="td-stat"><div class="stat-num">${c.replyRate.count}</div><div class="stat-sub">${escapeHtml(c.replyRate.subtext)}</div></td>
      <td class="td-stat"><div class="stat-num">${c.emailSent.count}</div><div class="stat-sub">${escapeHtml(c.emailSent.subtext)}</div></td>
      <td class="td-sender">
        <div class="avatar-stack">
          ${(c.senders || []).map(idx => `<img src="https://i.pravatar.cc/28?img=${idx}" alt=""/>`).join('')}
        </div>
      </td>
      <td><span class="status-badge ${escapeHtml(c.status)}">${statusBadgeContent(c.status)}</span></td>
      <td><span class="daily-limit">${escapeHtml(c.dailyLimit)}</span></td>
      <td class="td-menu">
        <div class="menu-wrap">
          <button class="meatball" onclick="toggleMenu(this)">&#8942;</button>
          <div class="dropdown">
            <button><span class="dm-icon">&#128202;</span> View Analytics</button>
            <button><span class="dm-icon">&#9881;</span> Edit Sequence</button>
            <button><span class="dm-icon">&#128203;</span> Duplicate</button>
            <button onclick="toggleStatus(${c.id})"><span class="dm-icon">⏸</span> ${c.status === 'running' ? 'Pause' : 'Resume'}</button>
            <button onclick="delCamp(${c.id})" style="color:var(--danger)"><span class="dm-icon">🗑</span> Delete</button>
          </div>
        </div>
      </td>
    </tr>`).join('');
  applyFilters();
}

function renderCrm(crm) {
  if (!crm) return '';
  if (crm.state === 'synced') {
    return `<span class="crm-synced">${escapeHtml(crm.icon || '✨')} Synced</span><div class="crm-time">${escapeHtml(crm.time || '')}</div>`;
  }
  return `<span class="crm-sync-btn">Sync to CRM</span>`;
}

function statusBadgeContent(status) {
  if (status === 'running') return '&#9646;&#9646; Running';
  if (status === 'paused')  return '⏸ Paused';
  if (status === 'stopped') return '■ Stopped';
  return escapeHtml(status);
}

/* ══ LEAD LISTS ══ */
function renderLeadLists() {
  const ul = $('lead-lists');
  if (!ul) return;
  ul.innerHTML = (S.data.leadLists || []).map(l => `
    <li class="aud-item">
      <div><strong>${escapeHtml(l.name)}</strong><span class="text-muted sm">${escapeHtml(l.subtext)}</span></div>
      <button class="btn-outline sm" onclick="gotoStep(2)">Select</button>
    </li>
  `).join('');
}

/* ══ LOOKALIKE ══ */
function renderLookalike() {
  const ul = $('lookalike-list');
  if (!ul) return;
  ul.innerHTML = (S.data.lookalikeAudiences || []).map(l => `
    <li class="aud-item">
      <div><strong>${escapeHtml(l.name)}</strong><span class="text-muted sm">${escapeHtml(l.subtext)}</span></div>
      <button class="btn-outline sm" onclick="gotoStep(2)">Select</button>
    </li>
  `).join('');
}

/* ══ SENDER PROFILES (step 2) ══ */
function renderSenders() {
  renderProfileTable('li-profile-tbody', S.data?.linkedinProfiles || [], 'linkedin');
  renderProfileTable('email-accounts-tbody', S.data?.emailAccounts || [], 'email');
}

function renderProfileTable(tbodyId, items, kind) {
  const tbody = $(tbodyId);
  if (!tbody) return;
  if (!items.length) {
    tbody.innerHTML = `<tr class="sp-empty-row"><td colspan="6">No accounts yet — click <strong>Add Account</strong> to connect one.</td></tr>`;
    return;
  }
  tbody.innerHTML = items.map(p => `
    <tr data-id="${escapeHtml(p.id)}">
      <td><input type="checkbox" ${p.selected ? 'checked' : ''} onclick="toggleProfile('${kind}','${escapeHtml(p.id)}', this.checked)"/></td>
      <td>
        <div class="sp-name-cell">
          <img class="sp-avatar" src="${escapeHtml(p.avatar)}" alt="${escapeHtml(p.name)}"/>
          <div class="sp-name-text">
            <span class="sp-name">${escapeHtml(p.name)}</span>
            <span class="sp-name-sub">${escapeHtml(p.connections || p.subtext || '')}</span>
          </div>
        </div>
      </td>
      <td>${healthRing(p.health)}</td>
      <td><span class="sp-limit-pill">${escapeHtml(p.dailyLimit)}</span></td>
      <td>
        <span class="sp-acct">
          <span class="sp-acct-icon">${kind === 'linkedin' ? 'in' : '@'}</span>
          ${escapeHtml(p.accountType)}
        </span>
      </td>
      <td><span class="sp-status ${escapeHtml(p.status)}">${capitalize(p.status)}</span></td>
    </tr>
  `).join('');
}

function healthRing(value) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  const r = 18, c = 2 * Math.PI * r;
  const offset = c * (1 - v / 100);
  const color = v >= 80 ? '#22C55E' : v >= 50 ? '#F59E0B' : '#EF4444';
  return `<svg class="sp-health-ring" width="44" height="44" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="${r}" fill="none" stroke="#E2E8F0" stroke-width="4"/>
    <circle cx="22" cy="22" r="${r}" fill="none" stroke="${color}" stroke-width="4"
      stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
      transform="rotate(-90 22 22)" stroke-linecap="round"/>
    <text x="22" y="22" text-anchor="middle" dy="4">${v}</text>
  </svg>`;
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}

function toggleProfile(kind, id, checked) {
  const list = kind === 'linkedin' ? S.data.linkedinProfiles : S.data.emailAccounts;
  const p = (list || []).find(x => x.id === id);
  if (p) p.selected = checked;
}

function toggleAllLinkedin(checked) {
  (S.data.linkedinProfiles || []).forEach(p => p.selected = checked);
  renderProfileTable('li-profile-tbody', S.data.linkedinProfiles, 'linkedin');
}

function switchSenderTab(panel) {
  document.querySelectorAll('.sp-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.spPanel === panel);
  });
  $('sp-li-profile').hidden = (panel !== 'li-profile');
  $('sp-email-accounts').hidden = (panel !== 'email-accounts');
}

function filterLinkedinProfiles() {
  const q = ($('li-search')?.value || '').toLowerCase();
  const all = S.data.linkedinProfiles || [];
  const filtered = q ? all.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.connections || '').toLowerCase().includes(q) ||
    (p.accountType || '').toLowerCase().includes(q)
  ) : all;
  renderProfileTable('li-profile-tbody', filtered, 'linkedin');
}

function addSenderToast(kind) {
  showToast('+ ' + kind + ' account flow (not implemented)');
}

/* ══ SETTINGS PAGE (step 3) ══ */
function renderSettings() {
  const cfg = S.data?.settings;
  if (!cfg) return;

  // Campaign name field default
  const nameEl = $('settings-camp-name');
  if (nameEl && !nameEl.value) nameEl.value = cfg.defaultName || '';

  // Window preset dropdown
  const presetSel = $('window-preset');
  if (presetSel) {
    presetSel.innerHTML = (cfg.windowPresets || [])
      .map(p => `<option>${escapeHtml(p)}</option>`).join('');
  }

  // Time + timezone inputs
  const timeEl = $('window-time');
  if (timeEl && !timeEl.value) timeEl.value = cfg.defaultTimeRange || '';
  const tzEl = $('window-tz');
  if (tzEl && !tzEl.value) tzEl.value = cfg.defaultTimezone || '';

  // Weekday pills
  const wdRow = $('weekday-row');
  if (wdRow) {
    const trashIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>';
    wdRow.innerHTML =
      (cfg.weekdays || []).map(d => `
        <button type="button" class="weekday${d.active ? ' active' : ''}" data-day="${escapeHtml(d.id)}" onclick="toggleWeekday('${escapeHtml(d.id)}')">${escapeHtml(d.label)}</button>
      `).join('') +
      `<button type="button" class="trash-btn" onclick="clearWeekdays()" aria-label="Clear days">${trashIcon}</button>`;
  }

  // AI Assist toggle list
  const aiList = $('ai-toggle-list');
  if (aiList) {
    aiList.innerHTML = (cfg.aiAssist || []).map(t => {
      const icon = ICONS[t.iconKey] || '';
      const titleHtml = t.titlePrefix
        ? `${escapeHtml(t.titlePrefix)} <input type="number" class="ai-toggle-input" value="${t.valueInput ?? 1}" min="1" max="10"/> ${escapeHtml(t.titleSuffix || '')}`
        : escapeHtml(t.title || '');
      return `
        <div class="ai-toggle">
          <span class="ai-toggle-icon">${icon}</span>
          <div class="ai-toggle-body">
            <div class="ai-toggle-title">${titleHtml}</div>
            <div class="ai-toggle-desc">${escapeHtml(t.description || '')}</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" ${t.enabled ? 'checked' : ''} data-ai-id="${escapeHtml(t.id)}" onchange="toggleAi('${escapeHtml(t.id)}', this.checked)"/>
            <span class="toggle-track"></span>
          </label>
        </div>
      `;
    }).join('');
  }

  // Zapier event checkboxes
  const zapEvents = $('zapier-events');
  if (zapEvents) {
    zapEvents.innerHTML = (cfg.zapierEvents || []).map(e => `
      <label class="checkbox-row">
        <input type="checkbox" ${e.checked ? 'checked' : ''} data-zap-id="${escapeHtml(e.id)}" onchange="toggleZapEvent('${escapeHtml(e.id)}', this.checked)"/>
        <span class="checkbox-fake"></span>
        <span>${escapeHtml(e.label)}</span>
      </label>
    `).join('');
  }

  // Zapier integration brands
  const ziBrands = $('zi-brands');
  if (ziBrands) {
    ziBrands.innerHTML = (cfg.zapierIntegrations || []).map(b => `
      <span class="zi-brand" style="color:${escapeHtml(b.color)}">${escapeHtml(b.label)}</span>
    `).join('');
  }

  // Disclaimer + link
  const dis = $('settings-disclaimer-text');
  if (dis) dis.textContent = (cfg.footerDisclaimer || '') + ' ';
  const link = $('settings-disclaimer-link');
  if (link) link.textContent = cfg.footerLinkLabel || '';
}

function toggleWeekday(id) {
  const day = (S.data.settings.weekdays || []).find(d => d.id === id);
  if (!day) return;
  day.active = !day.active;
  document.querySelector(`.weekday[data-day="${id}"]`)?.classList.toggle('active', day.active);
}

function clearWeekdays() {
  S.data.settings.weekdays.forEach(d => d.active = false);
  document.querySelectorAll('.weekday').forEach(el => el.classList.remove('active'));
}

function toggleAi(id, enabled) {
  const t = (S.data.settings.aiAssist || []).find(x => x.id === id);
  if (t) t.enabled = enabled;
}

function toggleZapEvent(id, checked) {
  const e = (S.data.settings.zapierEvents || []).find(x => x.id === id);
  if (e) e.checked = checked;
}

function addWindowToast() {
  showToast('+ New sending window added');
}

/* ══ CSV MAPPING (step 2) ══ */
function renderMapping() {
  const tbody = $('mapping-tbody');
  if (!tbody) return;
  tbody.innerHTML = (S.data.csvMapping || []).map(m => {
    const opts = (m.csvOptions || []).map(o => `<option>${escapeHtml(o)}</option>`).join('');
    const badge = m.status === 'mapped'
      ? '<span class="badge green">✓ Mapped</span>'
      : '<span class="badge yellow">⚠ Review</span>';
    return `<tr>
      <td>${escapeHtml(m.systemField)}</td>
      <td><select class="ui-select full">${opts}</select></td>
      <td>${badge}</td>
    </tr>`;
  }).join('');
}

/* ══ WORKFLOW MODAL ══ */
function renderWorkflowOptions() {
  const wrap = $('wf-options');
  if (!wrap) return;
  const opts = S.data.workflowOptions || [];
  wrap.innerHTML = opts.map((o, i) => `
    <label class="wf-card${i === 0 ? ' active' : ''}" data-value="${escapeHtml(o.value)}">
      <input type="radio" name="wf" value="${escapeHtml(o.value)}" ${i === 0 ? 'checked' : ''} onchange="pickWF(this)"/>
      <div class="wf-radio-dot"></div>
      <div class="wf-body">
        <div class="wf-title">${escapeHtml(o.title)}${o.recommended ? ' <span class="badge green sm">Recommended</span>' : ''}</div>
        <p class="text-muted sm">${escapeHtml(o.tagline)}</p>
        <p class="wf-features">${escapeHtml(o.features)}</p>
      </div>
      ${workflowSvg(o.value)}
    </label>
  `).join('');
  if (opts.length) S.workflow = opts[0].value;
}

function workflowSvg(value) {
  if (value === 'advanced') {
    return `<svg class="wf-img" width="80" height="52" viewBox="0 0 80 52"><rect width="80" height="52" rx="5" fill="#EEF2FF"/><rect x="6" y="6" width="28" height="14" rx="3" fill="#6366F1"/><rect x="6" y="26" width="40" height="7" rx="2" fill="#A5B4FC"/><rect x="52" y="26" width="22" height="7" rx="2" fill="#A5B4FC"/><rect x="52" y="37" width="15" height="7" rx="2" fill="#A5B4FC"/></svg>`;
  }
  return `<svg class="wf-img" width="80" height="52" viewBox="0 0 80 52"><rect width="80" height="52" rx="5" fill="#EEF2FF"/><rect x="6" y="13" width="68" height="7" rx="2" fill="#A5B4FC"/><rect x="6" y="26" width="68" height="7" rx="2" fill="#A5B4FC"/><rect x="6" y="39" width="68" height="7" rx="2" fill="#A5B4FC"/></svg>`;
}

function openWorkflowModal()  { $('modal-bg').style.display = 'flex'; }
function closeWorkflowModal() { $('modal-bg').style.display = 'none'; }

function pickWF(radio) {
  S.workflow = radio.value;
  document.querySelectorAll('.wf-card').forEach(c => c.classList.remove('active'));
  radio.closest('.wf-card').classList.add('active');
}

function startFlow() {
  closeWorkflowModal();
  openFlow();
}

/* ══ TIMEZONES + WEBHOOK ══ */
function renderTimezones() {
  const sel = $('tz-select');
  if (!sel) return;
  sel.innerHTML = (S.data.timezones || []).map(tz => `<option>${escapeHtml(tz)}</option>`).join('');
}

function renderWebhook() {
  const code = $('webhook-url');
  if (code) code.textContent = S.data.webhookUrl || '';
}

/* ══ CAMPAIGN FLOW ══ */
function openFlow() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  $('flow-wrap').style.display = 'flex';
  S.selectedMethod = null;
  S.selectedLookalike = null;
  renderImportMethods();
  DETAIL_IDS.forEach(d => { const el = $(d); if (el) el.hidden = true; });
  const bullet = $('bullet-choose');
  if (bullet) bullet.classList.remove('done');
  gotoStep(1);
  setBreadcrumb('flow');
}

function closeFlow() {
  $('flow-wrap').style.display = 'none';
  showPage('pg-list');
}

const stepMap = { 1:'step-1', 2:'step-2', 3:'step-3', 4:'step-4' };

function gotoStep(n) {
  document.querySelectorAll('.flow-page').forEach(p => p.classList.remove('active'));
  const el = $(stepMap[n]);
  if (el) el.classList.add('active');
  renderStepper(n);
}

/* ══ STEPPER ══ */
function renderStepper(active = 1) {
  const wrap = $('stepper');
  if (!wrap) return;
  const steps = S.data?.flowSteps || [];
  wrap.innerHTML = steps.map((s, i) => {
    const cls = s.id < active ? 'done' : (s.id === active ? 'active' : '');
    const icon = ICONS[s.iconKey] || '';
    const chevron = i < steps.length - 1
      ? '<span class="step-chevron"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>'
      : '';
    return `<div class="step-item ${cls}" id="stp-${s.id}">
      <div class="step-icon-box">${icon}</div>
      <span>${escapeHtml(s.label)}</span>
    </div>${chevron}`;
  }).join('');
}

/* ══ IMPORT METHOD CARDS ══ */
function renderImportMethods() {
  const grid = $('im-card-grid');
  if (!grid) return;
  const methods = S.data?.importMethods || [];
  grid.innerHTML = methods.map(m => {
    const icon = ICONS[m.iconKey] || '';
    const extra = m.extra ? ` <a class="im-card-link" onclick="event.stopPropagation();return false;">${escapeHtml(m.extra)}</a>` : '';
    return `<button type="button" class="im-card" data-method-id="${escapeHtml(m.id)}" onclick="selectMethod('${escapeHtml(m.id)}')">
      <div class="im-card-icon">${icon}</div>
      <div class="im-card-title">${escapeHtml(m.title)}</div>
      <div class="im-card-sub">${escapeHtml(m.subtitle)}${extra}</div>
    </button>`;
  }).join('');
  // Restore previous selection on re-render
  if (S.selectedMethod) selectMethod(S.selectedMethod);
}

const DETAIL_IDS = ['linkedin-detail', 'csv-detail', 'webhook-detail'];
const METHOD_TO_DETAIL = {
  linkedin: 'linkedin-detail',
  csv:      'csv-detail',
  webhook:  'webhook-detail'
};

function selectMethod(id) {
  S.selectedMethod = id;
  document.querySelectorAll('.im-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.methodId === id);
  });
  // First section's bullet flips to done once any card is picked
  const bullet = $('bullet-choose');
  if (bullet) bullet.classList.toggle('done', !!id);
  // Show only the matching inline detail section (lookalike has no inline section — opens a modal on Next)
  DETAIL_IDS.forEach(d => {
    const el = $(d);
    if (el) el.hidden = (d !== METHOD_TO_DETAIL[id]);
  });
}

/* ══ STEP-1 NEXT INTERCEPTOR ══ */
function nextFromStep1() {
  if (S.selectedMethod === 'lookalike') {
    openLookalikeModal();
    return;
  }
  gotoStep(2);
}

/* ══ LOOKALIKE MODAL ══ */
function openLookalikeModal() {
  const body = $('lookalike-modal-body');
  const foot = $('lookalike-modal-foot');
  if (!body) return;
  const items = S.data?.lookalikeAudiences || [];
  body.classList.toggle('center', items.length === 0);
  if (items.length === 0) {
    foot.hidden = true;
    body.innerHTML = `
      <div class="lookalike-empty">
        <h4>You don't have any leads</h4>
        <p>Create a lead list to start running campaigns</p>
        <button type="button" class="btn-primary" onclick="createLookalikeList()">Create a List</button>
      </div>`;
  } else {
    foot.hidden = false;
    const listIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    const checkIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    body.innerHTML = `
      <ul class="ll-list">
        ${items.map(i => `
          <li class="ll-item ${S.selectedLookalike === i.id ? 'selected' : ''}" data-id="${escapeHtml(i.id)}" onclick="toggleLookalikePick('${escapeHtml(i.id)}')">
            <span class="ll-item-icon">${listIcon}</span>
            <span class="ll-item-name">${escapeHtml(i.name)}</span>
            <span class="ll-item-count">(${escapeHtml(i.count)})</span>
            <span class="ll-item-check">${checkIcon}</span>
          </li>
        `).join('')}
      </ul>
      <button type="button" class="ll-add-new" onclick="addNewLookalike()">Add New</button>`;
  }
  $('modal-lookalike').style.display = 'flex';
}

function closeLookalikeModal() {
  $('modal-lookalike').style.display = 'none';
}

function toggleLookalikePick(id) {
  // Single-select: clicking the already-selected item deselects it
  S.selectedLookalike = S.selectedLookalike === id ? null : id;
  document.querySelectorAll('.ll-item').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === S.selectedLookalike);
  });
}

function confirmLookalike() {
  if (!S.selectedLookalike) {
    showToast('Please select a list first');
    return;
  }
  const item = (S.data?.lookalikeAudiences || []).find(i => i.id === S.selectedLookalike);
  closeLookalikeModal();
  if (item) showToast('✓ Selected: ' + item.name);
  gotoStep(2);
}

function addNewLookalike() {
  const name = prompt('New lookalike list name:');
  if (!name || !name.trim()) return;
  const newItem = {
    id: 'la-' + Date.now(),
    name: name.trim(),
    count: '0 Users in the List'
  };
  S.data.lookalikeAudiences.push(newItem);
  S.selectedLookalike = newItem.id;
  openLookalikeModal();
}

function createLookalikeList() {
  closeLookalikeModal();
  showToast('✨ Open list creation flow (not implemented)');
}

function validateLI() {
  const input = $('li-url-input');
  const url = (input?.value || '').trim();
  if (!url) {
    showToast('Please paste a LinkedIn URL first');
    return;
  }
  if (!/^https?:\/\/(www\.)?linkedin\.com\//i.test(url)) {
    showToast('That doesn\'t look like a LinkedIn URL');
    return;
  }
  showToast('✓ LinkedIn URL validated');
}

/* ══ FLOW SECTION COLLAPSE ══ */
function toggleSection(btn) {
  const section = btn.closest('.flow-section');
  if (!section) return;
  section.classList.toggle('collapsed');
  btn.classList.toggle('collapsed');
}

/* ══ BREADCRUMB CLICK ══ */
function onBreadcrumbClick() {
  // If we're inside the flow, clicking "Campaign" returns to the listing
  if ($('flow-wrap').style.display === 'flex') closeFlow();
}

/* ══ CSV UPLOAD ══ */
function handleCSV(input) {
  if (!input.files.length) return;
  const badge = $('csv-badge');
  badge.textContent = '📄 ' + input.files[0].name;
  badge.style.display = 'inline-flex';
}

function setupDrag() {
  const zone = $('drop-zone');
  if (!zone) return;
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--primary)'; });
  zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.style.borderColor = '';
    if (e.dataTransfer.files.length) {
      const b = $('csv-badge');
      b.textContent = '📄 ' + e.dataTransfer.files[0].name;
      b.style.display = 'inline-flex';
    }
  });
}

/* ══ WEBHOOK ══ */
function copyWebhook() {
  const url = $('webhook-url').textContent;
  navigator.clipboard.writeText(url).then(() => showToast('Webhook URL copied!'));
}

/* ══ LAUNCH ══ */
function launchCampaign() {
  const nameEl = $('settings-camp-name') || $('final-name');
  const name = (nameEl && nameEl.value.trim()) || 'New Campaign';
  const newCamp = {
    id: Date.now(),
    name,
    channels: ['linkedin', 'email'],
    createdOn: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    crm: { state: 'unsynced' },
    invitesSent: { count: 0, subtext: '0% Accepted' },
    replyRate:   { count: 0, subtext: '0% Received' },
    emailSent:   { count: 0, subtext: '0% Mail Opened' },
    senders: [Math.floor(Math.random() * 60) + 1, Math.floor(Math.random() * 60) + 1, Math.floor(Math.random() * 60) + 1],
    status: 'running',
    dailyLimit: '20 invites/day'
  };
  S.data.campaigns.unshift(newCamp);
  renderTable();
  showToast('🚀 Campaign launched!');
  setTimeout(() => { closeFlow(); showPage('pg-list'); }, 700);
}

/* ══ MEATBALL DROPDOWN ══ */
function toggleMenu(btn) {
  const d = btn.nextElementSibling;
  document.querySelectorAll('.dropdown.open').forEach(x => { if (x !== d) x.classList.remove('open'); });
  d.classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.menu-wrap'))
    document.querySelectorAll('.dropdown.open').forEach(x => x.classList.remove('open'));
});

function toggleStatus(id) {
  const c = S.data.campaigns.find(x => x.id === id);
  if (!c) return;
  c.status = c.status === 'running' ? 'paused' : 'running';
  renderTable();
}

function delCamp(id) {
  if (!confirm('Delete this campaign?')) return;
  S.data.campaigns = S.data.campaigns.filter(x => x.id !== id);
  renderTable();
}

/* ══ TOAST ══ */
function showToast(msg) {
  const t = $('toast');
  t.textContent = msg; t.style.display = 'block'; t.style.opacity = '1';
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.style.opacity = '0'; setTimeout(() => { t.style.display = 'none'; }, 300); }, 2500);
}
