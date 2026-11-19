(() => {
  'use strict';
  const SOURCE = window.AH_DEMO_SOURCE;
  const clone = value => JSON.parse(JSON.stringify(value));
  const state = {view:'overview', records:clone(SOURCE.records), query:'', status:'ทั้งหมด', priority:'ทั้งหมด', category:'ทั้งหมด', page:1, pageSize:8, sort:'id', dir:'asc', density:'compact', selected:null, qaState:'success'};
  const $ = (id) => document.getElementById(id);
  const todayISO = () => { const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const appShell = $('appShell');
  let detailTrigger=null, drawerTrigger=null, confirmTrigger=null;
  const focusables = root => [...root.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el=>!el.hidden && !el.inert && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
  function trapTab(e, root){
    const all=focusables(root);if(!all.length){e.preventDefault();root.focus();return;}
    const first=all[0],last=all[all.length-1];
    if(e.shiftKey && (document.activeElement===first || document.activeElement===root)){e.preventDefault();last.focus();}
    else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
  }
  function restoreTrigger(node,fallback){if(node && node.isConnected && !node.inert && !node.closest('[inert]'))node.focus();else if(fallback)fallback.focus();}
  function isMobile(){return window.matchMedia('(max-width:767px)').matches;}
  function syncDrawerAccessibility(){
    const mobile=isMobile(), open=mobile && $('sidebar').classList.contains('open');
    $('sidebar').inert=mobile && !open;
    $('sidebar').setAttribute('aria-hidden',String(mobile && !open));
    if(open){$('sidebar').setAttribute('role','dialog');$('sidebar').setAttribute('aria-modal','true');}
    else {$('sidebar').removeAttribute('role');$('sidebar').removeAttribute('aria-modal');}
    $('mainPane').inert=open;
  }

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = (name, size=18) => {
    const paths = {
      plus:'<path d="M12 5v14M5 12h14"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
      search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      download:'<path d="M12 3v12m-4-4 4 4 4-4M4 17v3h16v-3"/>',
      reset:'<path d="M4 10a8 8 0 1 1 2 7M4 4v6h6"/>',
      close:'<path d="M18 6 6 18M6 6l12 12"/>',
      chevron:'<path d="m9 18 6-6-6-6"/>',
      check:'<path d="m5 12 4 4L19 6"/>',
      chart:'<path d="M3 3v18h18M7 15v-4m5 4V7m5 8V5"/>',
      clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
      alert:'<path d="m12 3 9 16H3L12 3Z"/><path d="M12 9v4m0 3h.01"/>',
      filter:'<path d="M4 6h16M7 12h10m-7 6h4"/>',
      sort:'<path d="m8 9 4-4 4 4M12 5v14m4-4-4 4-4-4"/>'
    };
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${paths[name] || paths.list}</svg>`;
  };
  const statKey = { 'เสร็จสิ้น':'done', 'กำลังดำเนินการ':'ongoing', 'รอตรวจสอบ':'pending', 'ต้องแก้ไข':'issue' };
  const prioKey = { 'สูง':'high', 'ปกติ':'normal', 'ต่ำ':'low' };
  const ThaiDate = date => {
    const [y,m,d] = date.split('-');
    return `${Number(d)} ${['','ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'][Number(m)]} ${Number(y)+543}`;
  };
  const count = (s) => state.records.filter(x=>x.status===s).length;
  const stats = () => ({total:state.records.length,done:count('เสร็จสิ้น'),ongoing:count('กำลังดำเนินการ'),pending:count('รอตรวจสอบ'),issue:count('ต้องแก้ไข')});
  const percent = (a,b) => b ? Math.round(a/b*100) : 0;
  const statusBadge = (s) => `<span class="status-badge ${statKey[s]||'pending'}">${esc(s)}</span>`;
  const priorityTag = (p) => `<span class="priority-flag"><span class="priority-dot ${prioKey[p]||'low'}"></span>${esc(p)}</span>`;
  const progress = (n, status) => `<div class="table-progress"><div class="progress-track"><div class="progress-fill ${status==='เสร็จสิ้น'?'success':''}" style="width:${Number(n)}%"></div></div><span>${Number(n)}%</span></div>`;
  const note = () => `<div class="demo-note"><div class="demo-note-copy">${icon('check',16)}<div><strong>ข้อมูลจำลองสำหรับทดสอบ UI</strong> — ตัวเลข ชื่อรายการ และสถานะทั้งหมดเป็นตัวอย่าง ไม่เชื่อมต่อระบบจริง</div></div><button class="btn btn-ghost" data-action="reset-demo" title="คืนค่ารายการตัวอย่าง">${icon('reset',16)} <span>รีเซ็ตข้อมูล</span></button></div>`;
  const buttons = () => `<div class="view-actions"><button class="btn btn-outline" data-action="csv">${icon('download')} ส่งออก CSV</button><button class="btn btn-primary" data-view="create">${icon('plus')} สร้างรายการ</button></div>`;
  const getFiltered = () => state.records.filter(r => {
    const query = state.query.toLocaleLowerCase('th-TH').trim();
    const has = !query || [r.id,r.title,r.category,r.team,r.status,r.priority].some(v=>String(v).toLocaleLowerCase('th-TH').includes(query));
    return has && (state.status==='ทั้งหมด' || r.status===state.status) && (state.priority==='ทั้งหมด' || r.priority===state.priority) && (state.category==='ทั้งหมด' || r.category===state.category);
  }).sort((a,b) => {
    const mul = state.dir === 'asc' ? 1 : -1;
    if (state.sort === 'progress') return (a.progress-b.progress)*mul;
    if (state.sort === 'date') return a.date.localeCompare(b.date)*mul;
    return String(a[state.sort]).localeCompare(String(b[state.sort]),'th')*mul;
  });
  const tabButtons = () => ['ทั้งหมด', ...SOURCE.statuses].map(status=>`<button class="table-tab ${state.status===status?'active':''}" data-action="tab" data-status="${esc(status)}" aria-pressed="${state.status===status}">${esc(status)}</button>`).join('');
  const table = ({overview=false}={}) => {
    const rows = overview ? [...state.records].reverse().slice(0,5) : getFiltered();
    const pageCount=Math.max(1,Math.ceil(rows.length/state.pageSize));
    state.page=Math.min(Math.max(1,state.page),pageCount);
    const visible=overview ? rows : rows.slice((state.page-1)*state.pageSize,state.page*state.pageSize);
    const colnames = [['id','รหัสรายการ',205],['title','หัวข้อ',280],['category','ประเภท',150],['team','ผู้ดูแล',140],['priority','ความสำคัญ',165],['status','สถานะ',160],['progress','ความคืบหน้า',175],['date','วันที่อัปเดต',180]];
    const head = colnames.map(([key,label,width])=>{
      const active = state.sort===key && !overview;
      const direction = active ? (state.dir==='asc' ? 'ascending' : 'descending') : 'none';
      const speak = active ? (state.dir==='asc'?'น้อยไปมาก':'มากไปน้อย'):'ยังไม่เรียง';
      return `<th scope="col" data-col="${key}" aria-sort="${direction}" style="width:${width}px"><button class="sort-button" data-action="sort" data-sort="${key}" aria-label="เรียงตาม${label} (${speak})">${label}${icon('sort',14)}</button></th>`;
    }).join('');
    const body=visible.map(r=>`<tr data-record="${esc(r.id)}" tabindex="0" title="กด Enter เพื่อดูรายละเอียด ${esc(r.id)}" aria-label="ดูรายละเอียด ${esc(r.id)} หัวข้อ ${esc(r.title)} ประเภท ${esc(r.category)} ผู้ดูแล ${esc(r.team)} ความสำคัญ ${esc(r.priority)} สถานะ ${esc(r.status)} ความคืบหน้า ${r.progress}% วันที่ ${esc(ThaiDate(r.date))} กด Enter เพื่อเปิด"><td class="primary-cell" title="${esc(r.id)}">${esc(r.id)}</td><td title="${esc(r.title)}">${esc(r.title)}</td><td class="secondary-cell" title="${esc(r.category)}">${esc(r.category)}</td><td class="secondary-cell" title="${esc(r.team)}">${esc(r.team)}</td><td title="${esc(r.priority)}">${priorityTag(r.priority)}</td><td title="${esc(r.status)}">${statusBadge(r.status)}</td><td title="${r.progress}%">${progress(r.progress,r.status)}</td><td class="small-cell secondary-cell" title="${esc(ThaiDate(r.date))}">${esc(ThaiDate(r.date))}</td></tr>`).join('');
    const toolbar=`<div class="table-toolbar"><div class="table-toolbar-title"><h2>${overview?'รายการอัปเดตล่าสุด':'รายการทั้งหมด'}</h2><span class="count-label">${overview?visible.length:rows.length} รายการ</span></div><div class="table-toolbar-actions">${overview ? `<button class="btn btn-ghost" data-view="listing">ดูทั้งหมด ${icon('arrow')}</button>` : `<button class="btn btn-outline" data-action="density" title="สลับความสูงแถว">${state.density==='compact'?'แถวปกติ':'แถวกระชับ'}</button><button class="btn btn-outline" data-action="csv">${icon('download')} CSV</button>`}</div></div>`;
    const tabs=overview?'':`<div class="table-tabs" role="group" aria-label="กรองสถานะ">${tabButtons()}</div>`;
    const paging=overview?'':`<div class="table-footer"><div class="footer-details">แสดง ${rows.length?((state.page-1)*state.pageSize+1):0}–${Math.min(rows.length,state.page*state.pageSize)} จาก ${rows.length} รายการ</div><nav class="pagination" aria-label="เปลี่ยนหน้าตาราง"><button class="page-button" data-action="page" data-page="${state.page-1}" ${state.page===1?'disabled':''} aria-label="หน้าก่อนหน้า">‹</button>${Array.from({length:pageCount},(_,i)=>`<button class="page-button ${state.page===i+1?'active':''}" data-action="page" data-page="${i+1}" ${state.page===i+1?'aria-current="page"':''}>${i+1}</button>`).join('')}<button class="page-button" data-action="page" data-page="${state.page+1}" ${state.page===pageCount?'disabled':''} aria-label="หน้าถัดไป">›</button></nav></div>`;
    const qa=overview?'':`<div class="qa-state-control"><label for="qaState">ทดสอบ Data State</label><select id="qaState" aria-label="สถานะจำลองของตาราง"><option value="success" ${state.qaState==='success'?'selected':''}>Success</option><option value="loading" ${state.qaState==='loading'?'selected':''}>Loading</option><option value="empty" ${state.qaState==='empty'?'selected':''}>Empty</option><option value="error" ${state.qaState==='error'?'selected':''}>Error</option><option value="restricted" ${state.qaState==='restricted'?'selected':''}>Restricted</option></select><span class="helper">QA Preview เท่านั้น</span></div>`;
    const empty=`<div class="empty-state" role="status">${icon('search',48)}<strong>ไม่พบรายการที่ตรงกับการค้นหา</strong><p>ลองปรับคำค้นหา หรือใช้ตัวกรองอื่น</p><button class="btn btn-outline" data-action="clear-filters">ล้างตัวกรอง</button></div>`;
    const loading=`<div class="loading-state" role="status" aria-label="กำลังโหลดตัวอย่าง"><span class="sr-only">กำลังโหลดข้อมูลจำลอง</span><div class="loading-header" aria-hidden="true">${Array.from({length:8},()=>'<span class="loading-line"></span>').join('')}</div>${Array.from({length:5},()=>`<div class="loading-row" aria-hidden="true">${Array.from({length:8},(_,i)=>`<span class="loading-line w${i%3}"></span>`).join('')}</div>`).join('')}</div>`;
    const error=`<div class="error-state" role="alert"><strong>ไม่สามารถแสดงข้อมูลจำลองได้</strong><p>ตัวอย่าง Error State สำหรับทดสอบหน้าจอ ไม่ได้เกิดจากการเชื่อมต่อเซิร์ฟเวอร์</p><button class="btn btn-outline" data-action="restore-state">กลับสู่สถานะปกติ</button></div>`;
    const restricted=`<div class="restricted-state" role="status">${icon('alert',48)}<strong>ไม่มีสิทธิ์เข้าถึงรายการนี้</strong><p>ตัวอย่าง Permission State สำหรับทดสอบ UI เท่านั้น</p><button class="btn btn-outline" data-action="restore-state">กลับสู่สถานะปกติ</button></div>`;
    const simulated=!overview && state.qaState !== 'success';
    const content=simulated ? ({loading,empty,error,restricted}[state.qaState]||loading) : (visible.length ? `<div class="table-scroll-hint">↔ เลื่อนตารางแนวนอนเพื่อดูคอลัมน์เพิ่มเติม · เลือกแถวแล้วกด Enter เพื่อดูข้อมูลเต็ม</div><div class="table-scroll" tabindex="0" role="region" aria-label="ตารางรายการ เลื่อนแนวนอนได้"><table class="data-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`:empty);
    return `<section class="table-card ${state.density==='comfortable'?'table-comfortable':''}" aria-label="รายการสาธิต">${toolbar}${qa}${simulated?'':tabs}${content}${simulated?'':paging}</section>`;
  };
  const kpis = () => {
    const s=stats();const ks=[['รายการทั้งหมด',s.total,'ข้อมูลตัวอย่างทั้งหมด','list'],['ดำเนินการเสร็จ',s.done,`${percent(s.done,s.total)}% ของรายการ`,'check'],['กำลังดำเนินการ',s.ongoing,`${percent(s.ongoing,s.total)}% ของรายการ`,'clock'],['รอตรวจสอบ',s.pending+s.issue,`รวม ${s.issue} รายการที่ต้องแก้ไข`,'alert']];
    return `<section class="kpi-grid" aria-label="ตัวชี้วัดตัวอย่าง">${ks.map(([label,value,foot,ic])=>`<article class="kpi-card"><div class="kpi-label">${label}<span class="kpi-icon">${icon(ic)}</span></div><div class="kpi-value">${value.toLocaleString('th-TH')}</div><div class="kpi-note">${foot}</div></article>`).join('')}</section>`;
  };
  const lineChart = () => {
    // The current local day and its preceding six days; values come ONLY from mock records.
    const now=new Date(), dates=Array.from({length:7},(_,i)=>new Date(now.getFullYear(),now.getMonth(),now.getDate()-6+i));
    const keys=dates.map(d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
    const opened=keys.map(k=>state.records.filter(r=>r.date===k).length);
    const done=keys.map(k=>state.records.filter(r=>r.date===k && r.status==='เสร็จสิ้น').length);
    const mobile=isMobile(), width=mobile?320:640, height=mobile?230:260, left=mobile?38:40,right=mobile?14:16,top=24,bottom=mobile?54:38;
    const topValue=Math.max(5,Math.ceil(Math.max(...opened,...done,1)/5)*5);
    const x=i=>left+(width-left-right)*i/6, y=v=>top+(height-top-bottom)*(1-v/topValue);
    const points=arr=>arr.map((v,i)=>`${x(i)},${y(v)}`).join(' ');
    const grid=[0,topValue/2,topValue].map(val=>`<g><line x1="${left}" y1="${y(val)}" x2="${width-right}" y2="${y(val)}" stroke="var(--ah-chart-grid)"/><text x="${left-9}" y="${y(val)+5}" fill="var(--ah-slate)" text-anchor="end" font-size="${mobile?16:14}">${Number.isInteger(val)?val:val.toFixed(1)}</text></g>`).join('');
    const labels=dates.map((d,i)=>`<text x="${x(i)}" y="${height-18}" font-size="${mobile?16:14}" text-anchor="middle" fill="var(--ah-slate)">${d.getDate()}</text>`).join('');
    const monthLabel=dates[0].toLocaleDateString('th-TH',{month:'short',year:'numeric'});
    const summary=`7 วันล่าสุด (${esc(monthLabel)}) · รายการใหม่ ${opened.reduce((a,b)=>a+b,0)} · เสร็จสิ้น ${done.reduce((a,b)=>a+b,0)} จากวันที่อัปเดตใน Mock Data`;
    return `<div class="chart-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${summary}">${grid}${labels}<polyline points="${points(opened)}" stroke="var(--ah-chart-secondary)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="${points(done)}" stroke="var(--ah-chart-primary)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${done.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="var(--ah-canvas)" stroke="var(--ah-chart-primary)" stroke-width="2"/>`).join('')}</svg></div><div class="chart-legend"><div class="legend-item"><span class="legend-dot legend-primary"></span>เสร็จสิ้น</div><div class="legend-item"><span class="legend-dot legend-secondary"></span>อัปเดตรายการ</div></div><p class="chart-scope">${summary}</p>`;
  };
  const statusChart = () => {const s=stats();const parts=[['เสร็จสิ้น',s.done,'success'],['กำลังดำเนินการ',s.ongoing,''],['รอตรวจสอบ',s.pending,'warning'],['ต้องแก้ไข',s.issue,'critical']];return `<div class="status-list">${parts.map(([label,value,cls])=>`<div class="status-entry"><div class="status-entry-head"><span>${label}</span><strong>${value} <span class="helper">รายการ</span></strong></div><div class="progress-track"><div class="progress-fill ${cls}" style="width:${percent(value,s.total)}%"></div></div></div>`).join('')}</div>`;};
  const overview=()=>`${note()}<div class="section-heading"><div><h2>ภาพรวมการดำเนินงาน</h2><p class="section-subtitle">แสดงข้อมูลสาธิตเพื่อทดสอบองค์ประกอบบน Dashboard</p></div>${buttons()}</div>${kpis()}<div class="dashboard-grid"><section class="card-dashboard"><div class="card-header"><div><h2 class="card-title">แนวโน้มรายการ</h2><p class="section-subtitle">7 วันล่าสุด · จากรายการจำลอง</p></div><span class="count-label">รายสัปดาห์</span></div>${lineChart()}</section><section class="card-dashboard"><div class="card-header"><div><h2 class="card-title">สรุปตามสถานะ</h2><p class="section-subtitle">นับจากรายการจำลองทั้งหมด</p></div>${icon('chart')}</div>${statusChart()}</section></div>${table({overview:true})}`;
  const summary=()=>{const s=stats();const segments=[['var(--ah-success)',s.done],['var(--ah-primary)',s.ongoing],['var(--ah-warning)',s.pending],['var(--ah-critical)',s.issue]];return `<section class="summary-row" aria-label="ข้อมูลสรุป"><article class="summary-card"><div class="summary-title">สถานะรายการทั้งหมด</div><div class="summary-inline"><div class="summary-value">${s.total} <span class="helper">รายการ</span></div><span class="summary-foot">อัปเดตข้อมูลจาก Mock Dataset</span></div><div class="summary-progress">${segments.map(([color,n])=>`<span style="background:${color};width:${percent(n,s.total)}%"></span>`).join('')}</div><div class="summary-foot">${s.done} เสร็จสิ้น · ${s.ongoing} กำลังดำเนินการ · ${s.pending+s.issue} รอตรวจสอบ/แก้ไข</div></article><article class="summary-card"><div class="summary-title">รายการที่กำลังดำเนินการ</div><div class="summary-value">${s.ongoing} <span class="helper">รายการ</span></div><div class="summary-foot">คิดเป็น ${percent(s.ongoing,s.total)}% ของรายการทั้งหมด</div></article><article class="summary-card tight"><div class="summary-title">อัตราดำเนินการเสร็จ</div><div class="summary-value">${percent(s.done,s.total)}%</div><div class="summary-foot">คำนวณจากข้อมูลจำลอง</div></article></section>`;};
  const filters=()=>`<div class="filter-bar"><div class="filter-group"><button class="filter-chip ${state.category==='ทั้งหมด'?'active':''}" data-action="category" data-value="ทั้งหมด" aria-pressed="${state.category==='ทั้งหมด'}">ทุกประเภท</button>${SOURCE.categories.map(x=>`<button class="filter-chip ${state.category===x?'active':''}" data-action="category" data-value="${esc(x)}" aria-pressed="${state.category===x}">${esc(x)}</button>`).join('')}</div><div class="filter-group"><label class="sr-only" for="priorityFilter">ความสำคัญ</label><select id="priorityFilter" class="filter-select"><option value="ทั้งหมด" ${state.priority==='ทั้งหมด'?'selected':''}>ทุกระดับ</option>${SOURCE.priorities.map(x=>`<option value="${esc(x)}" ${state.priority===x?'selected':''}>${esc(x)}</option>`).join('')}</select><button class="btn btn-ghost" data-action="clear-filters">ล้างตัวกรอง</button></div></div>`;
  const listing=()=>`${note()}${summary()}<div class="section-heading"><div><h2>จัดการรายการ</h2><p class="section-subtitle">ค้นหา กรอง จัดเรียง และแก้ไขสถานะข้อมูลตัวอย่าง</p></div><button class="btn btn-primary" data-view="create">${icon('plus')} สร้างรายการ</button></div>${filters()}<div class="filter-bar"><div class="filter-group"><label class="top-search" style="width:270px"><span class="sr-only">ค้นหาในตาราง</span>${icon('search')}<input type="search" id="tableSearch" value="${esc(state.query)}" placeholder="ค้นหาหัวข้อ / รหัส..."></label></div><div class="filter-group"><span class="helper">คลิกแถวเพื่อดูรายละเอียด</span></div></div>${table()}`;
  const analytics=()=>{const s=stats();const categories=SOURCE.categories.map(c=>({name:c,n:state.records.filter(r=>r.category===c).length}));const teams=SOURCE.teams.map(c=>({name:c,n:state.records.filter(r=>r.team===c).length}));return `${note()}<div class="section-heading"><div><h2>รายงานสรุปผล</h2><p class="section-subtitle">รายงานจำลองจากข้อมูลในหน้าเว็บเท่านั้น</p></div><button class="btn btn-outline" data-action="csv">${icon('download')} ส่งออกข้อมูล</button></div>${kpis()}<div class="report-grid"><section class="card-dashboard"><div class="card-header"><div><h2 class="card-title">จำนวนรายการตามประเภท</h2><p class="section-subtitle">รวม ${s.total} รายการ</p></div></div><div class="report-breakdown">${categories.map(x=>`<div class="report-row"><div>${esc(x.name)}</div><strong>${x.n}</strong><div class="progress-track"><div class="progress-fill" style="width:${percent(x.n,s.total)}%"></div></div></div>`).join('')}</div></section><section class="card-dashboard"><div class="card-header"><h2 class="card-title">รายการตามทีม</h2></div><div class="mini-list">${teams.map(x=>`<div class="mini-item"><strong>${x.name}</strong><span>${x.n} รายการ</span></div>`).join('')}</div></section></div><div class="dashboard-grid" style="margin-top:16px"><section class="card-dashboard"><div class="card-header"><h2 class="card-title">แนวโน้มรายการ 7 วันล่าสุด</h2></div>${lineChart()}</section><section class="card-dashboard"><div class="card-header"><h2 class="card-title">รายละเอียดสถานะ</h2></div>${statusChart()}</section></div>`;};
  const create=()=>`${note()}<div class="section-heading"><div><h2>สร้างรายการตัวอย่าง</h2><p class="section-subtitle">ทดลองการกรอกข้อมูล ฟอร์ม และ Validation โดยไม่บันทึกลงเซิร์ฟเวอร์</p></div><button class="btn btn-outline" data-view="listing">กลับหน้ารายการ</button></div><section class="form-card"><h2 class="card-title">รายละเอียดรายการ</h2><p class="section-subtitle">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p><form id="createForm"><div class="form-grid"><div class="form-field full"><label class="form-label" for="itemTitle">หัวข้อรายการ *</label><input class="form-input" id="itemTitle" name="itemTitle" placeholder="เช่น ตรวจสอบข้อมูลตัวอย่าง" maxlength="80" required><span class="helper">ไม่เกิน 80 ตัวอักษร</span></div><div class="form-field"><label class="form-label" for="itemCategory">ประเภท *</label><select class="form-input" id="itemCategory" name="itemCategory" required><option value="">เลือกประเภท</option>${SOURCE.categories.map(x=>`<option>${x}</option>`).join('')}</select></div><div class="form-field"><label class="form-label" for="itemTeam">ผู้ดูแล *</label><select class="form-input" id="itemTeam" name="itemTeam" required><option value="">เลือกทีม</option>${SOURCE.teams.map(x=>`<option>${x}</option>`).join('')}</select></div><div class="form-field"><label class="form-label" for="itemPriority">ความสำคัญ</label><select class="form-input" id="itemPriority" name="itemPriority">${SOURCE.priorities.map(x=>`<option ${x==='ปกติ'?'selected':''}>${x}</option>`).join('')}</select></div><div class="form-field"><label class="form-label" for="itemDate">วันที่อัปเดต *</label><input type="date" class="form-input" id="itemDate" name="itemDate" value="${todayISO()}" required></div><div class="form-field full"><label class="form-label" for="itemNote">รายละเอียดเพิ่มเติม</label><textarea class="form-input form-textarea" id="itemNote" name="itemNote" placeholder="ระบุรายละเอียดจำลองได้ที่นี่..."></textarea><span class="helper">โปรดใช้ข้อมูลสมมติเท่านั้น</span></div></div><div class="form-actions"><button type="button" class="btn btn-outline" data-view="listing">ยกเลิก</button><button class="btn btn-primary" type="submit">${icon('check')} บันทึกข้อมูลตัวอย่าง</button></div></form></section>`;
  const views={overview,listing,analytics,create};
  function render({focusSelector=null}={}){
    $('pageTitle').textContent=({overview:'ภาพรวม',listing:'รายการทั้งหมด',analytics:'รายงาน',create:'สร้างรายการ'})[state.view];
    $('mainContent').innerHTML=views[state.view]();
    $('sidebarNav').querySelectorAll('.nav-link').forEach(el=>{const active=el.dataset.view===state.view;el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current')});
    $('navCount').textContent=state.records.length;
    $('globalSearch').value=state.query;
    if(focusSelector){const target=$('mainContent').querySelector(focusSelector);if(target)target.focus({preventScroll:true});}
  }
  function openDrawer(){
    if(!isMobile())return;
    drawerTrigger=document.activeElement;
    $('sidebar').classList.add('open');$('scrim').hidden=false;
    syncDrawerAccessibility();$('closeDrawer').focus();
  }
  function closeDrawer({restoreFocus=true}={}){
    const wasOpen=$('sidebar').classList.contains('open');
    $('sidebar').classList.remove('open');$('scrim').hidden=true;
    syncDrawerAccessibility();
    if(wasOpen && restoreFocus)restoreTrigger(drawerTrigger,$('openDrawer'));
  }
  function openDetail(id){
    if(state.selected)closeDetail({restoreFocus:false});
    const r=state.records.find(x=>x.id===id);if(!r)return;
    detailTrigger=document.activeElement;state.selected=id;
    const field=(label,value)=>`<div class="detail-field"><dt>${label}</dt><dd>${value}</dd></div>`;
    $('detailPanel').innerHTML=`<div class="detail-top"><div><p class="section-subtitle">รายละเอียด Mock Data</p><h2 id="detailTitle">${esc(r.id)}</h2></div><button class="icon-button" id="closeDetail" aria-label="ปิดรายละเอียด">${icon('close')}</button></div><dl class="detail-fields">${field('หัวข้อ',esc(r.title))}${field('ประเภท',esc(r.category))}${field('ทีมที่รับผิดชอบ',esc(r.team))}${field('ความสำคัญ',priorityTag(r.priority))}${field('สถานะปัจจุบัน',statusBadge(r.status))}${field('ความคืบหน้า',progress(r.progress,r.status))}${field('อัปเดตล่าสุด',esc(ThaiDate(r.date)))}${field('หมายเหตุ',esc(r.note))}</dl><div class="form-field" style="margin-top:24px"><label for="detailStatus" class="form-label">เปลี่ยนสถานะตัวอย่าง</label><select id="detailStatus" class="form-input">${SOURCE.statuses.map(x=>`<option ${x===r.status?'selected':''}>${x}</option>`).join('')}</select></div><div class="detail-actions"><button class="btn btn-outline" id="cancelDetail">ปิด</button><button class="btn btn-primary" id="saveDetail">บันทึก</button></div>`;
    $('detailScrim').hidden=false;$('detailPanel').hidden=false;$('detailPanel').inert=false;
    $('detailPanel').classList.add('open');appShell.inert=true;
    document.body.classList.add('modal-open');$('closeDetail').focus();
  }
  function closeDetail({restoreFocus=true}={}){
    if(!state.selected)return;
    state.selected=null;$('detailScrim').hidden=true;
    $('detailPanel').classList.remove('open');$('detailPanel').hidden=true;$('detailPanel').inert=true;
    appShell.inert=false;document.body.classList.remove('modal-open');
    if(restoreFocus)restoreTrigger(detailTrigger,$('pageTitle'));
  }
  function resetData(){
    state.records=clone(SOURCE.records);state.query='';state.status='ทั้งหมด';
    state.priority='ทั้งหมด';state.category='ทั้งหมด';state.page=1;
    state.sort='id';state.dir='asc';state.qaState='success';render();
    toast('คืนค่าข้อมูลตัวอย่างเริ่มต้นแล้ว');
  }
  function confirmReset(trigger){
    confirmTrigger=trigger;const d=$('resetConfirm');
    if(typeof d.showModal==='function')d.showModal();else if(window.confirm('คืนค่าข้อมูลตัวอย่างทั้งหมด? ข้อมูลที่แก้ไขจะถูกลบ'))resetData();
  }
  function toast(message){const div=document.createElement('div');div.className='toast';div.textContent=message;$('toastContainer').append(div);setTimeout(()=>div.remove(),3500);}
  function go(view){if(!views[view])return;const drawerWasOpen=$('sidebar').classList.contains('open');state.view=view;state.page=1;closeDrawer({restoreFocus:false});render();window.scrollTo({top:0,behavior:'instant'});if(drawerWasOpen)$('pageTitle').focus({preventScroll:true});}
  function exportCsv(){const rows=getFiltered();const headers=['รหัสรายการ','หัวข้อ','ประเภท','ทีม','ความสำคัญ','สถานะ','ความคืบหน้า','วันที่'];const matrix=[headers,...rows.map(r=>[r.id,r.title,r.category,r.team,r.priority,r.status,r.progress+'%',r.date])];const contents='\ufeff'+matrix.map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');const blob=new Blob([contents],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='AH_v2.6_demo_records.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(`ส่งออกข้อมูลจำลอง ${rows.length} รายการแล้ว`);}
  document.addEventListener('click',e=>{
    const nav=e.target.closest('[data-view]');if(nav){go(nav.dataset.view);return;}
    if(e.target.closest('#openDrawer')){openDrawer();return;}
    if(e.target.closest('#closeDrawer')||e.target.closest('#scrim')){closeDrawer();return;}
    if(e.target.closest('#closeDetail')||e.target.closest('#cancelDetail')||e.target.closest('#detailScrim')){closeDetail();return;}
    if(e.target.closest('#saveDetail')){const r=state.records.find(x=>x.id===state.selected);if(r){r.status=$('detailStatus').value;r.progress=r.status==='เสร็จสิ้น'?100:r.status==='กำลังดำเนินการ'?64:r.status==='รอตรวจสอบ'?15:45;toast('อัปเดตสถานะข้อมูลตัวอย่างแล้ว');}closeDetail();render();return;}
    if(e.target.closest('#helpButton')){toast('ตัวอย่าง UI: ข้อมูลสร้างขึ้นเพื่อทดสอบเท่านั้น ไม่ใช้ฐานข้อมูลหรือ API');return;}
    const action=e.target.closest('[data-action]');if(action){
      const type=action.dataset.action;
      if(type==='reset-demo')confirmReset(action);
      if(type==='restore-state'){state.qaState='success';render({focusSelector:'#qaState'});}
      if(type==='csv') exportCsv();
      if(type==='tab'){state.status=action.dataset.status;state.page=1;render({focusSelector:`[data-action="tab"][data-status="${CSS.escape(state.status)}"]`});}
      if(type==='category'){state.category=action.dataset.value;state.page=1;render({focusSelector:`[data-action="category"][data-value="${CSS.escape(state.category)}"]`});}
      if(type==='density'){state.density=state.density==='compact'?'comfortable':'compact';render({focusSelector:'[data-action="density"]'});}
      if(type==='page'){const n=Number(action.dataset.page);if(n>0){state.page=n;render({focusSelector:`[data-action="page"][data-page="${n}"]`});}}
      if(type==='sort'){const s=action.dataset.sort;state.dir=state.sort===s&&state.dir==='asc'?'desc':'asc';state.sort=s;render({focusSelector:`[data-action="sort"][data-sort="${s}"]`});}
      if(type==='clear-filters'){state.query='';state.status='ทั้งหมด';state.priority='ทั้งหมด';state.category='ทั้งหมด';state.page=1;state.qaState='success';render({focusSelector:'[data-action="clear-filters"]'});}
      return;
    }
    const tr=e.target.closest('tr[data-record]');if(tr)openDetail(tr.dataset.record);
  });
  document.addEventListener('keydown',e=>{
    if(state.selected){
      if(e.key==='Escape'){e.preventDefault();closeDetail();return;}
      if(e.key==='Tab'){trapTab(e,$('detailPanel'));return;}
    }
    if(isMobile() && $('sidebar').classList.contains('open')){
      if(e.key==='Escape'){e.preventDefault();closeDrawer();return;}
      if(e.key==='Tab'){trapTab(e,$('sidebar'));return;}
    }
    if((e.key==='Enter'||e.key===' ')&&e.target.matches('tr[data-record]')){e.preventDefault();openDetail(e.target.dataset.record);}
  });
  document.addEventListener('change',e=>{if(e.target.id==='priorityFilter'){state.priority=e.target.value;state.page=1;render({focusSelector:'#priorityFilter'});}if(e.target.id==='qaState'){state.qaState=e.target.value;render({focusSelector:'#qaState'});}});
  document.addEventListener('input',e=>{
    if(e.target.id==='globalSearch'||e.target.id==='tableSearch'){
      const from=e.target.id, start=e.target.selectionStart,end=e.target.selectionEnd;
      state.query=e.target.value;state.page=1;
      if(from==='globalSearch'&&state.view!=='listing')state.view='listing';
      render();const restore=$(from) || $('globalSearch');restore.focus();try{restore.setSelectionRange(start,end);}catch(_){}
    }
  });
  document.addEventListener('submit',e=>{if(e.target.id!=='createForm')return;e.preventDefault();const form=e.target;if(!form.reportValidity())return;const data=new FormData(form);const title=String(data.get('itemTitle')||'').trim();if(!title){$('itemTitle').focus();return;}const nums=state.records.map(r=>Number(r.id.split('-')[1])||1000);const id='DEMO-'+String(Math.max(...nums,1000)+1);state.records.unshift({id,title,category:String(data.get('itemCategory')),team:String(data.get('itemTeam')),priority:String(data.get('itemPriority')),status:'รอตรวจสอบ',progress:0,date:String(data.get('itemDate')),note:String(data.get('itemNote')||'ข้อมูลตัวอย่างที่สร้างจากฟอร์ม')});state.query='';state.status='ทั้งหมด';state.priority='ทั้งหมด';state.category='ทั้งหมด';state.sort='id';state.dir='desc';go('listing');toast(`สร้างรายการจำลอง ${id} แล้ว`);});
  $('resetConfirm').addEventListener('close',()=>{
    if($('resetConfirm').returnValue==='confirm')resetData();
    restoreTrigger(confirmTrigger,$('pageTitle'));
  });
  document.addEventListener('invalid',e=>{
    if(e.target.closest('#createForm')){
      e.target.setAttribute('aria-invalid','true');
      e.target.addEventListener('input',()=>e.target.removeAttribute('aria-invalid'),{once:true});
    }
  },true);
  const mq=window.matchMedia('(max-width:767px)');
  mq.addEventListener('change',()=>{closeDrawer({restoreFocus:false});syncDrawerAccessibility();render();});
  syncDrawerAccessibility();render();
})();
