/* 태양광 핵심문제 데일리 엔진 — 첨부 HTML의 window.SOLAR_DAILY{date,make}를 읽어 시험지를 그림 */
(function(){
var SD=window.SOLAR_DAILY||{},d=SD.date||"",W="일월화수목금토";
var dt=new Date(d+"T00:00:00"),ko=isNaN(dt)?d:dt.getFullYear()+"년 "+(dt.getMonth()+1)+"월 "+dt.getDate()+"일 ("+W[dt.getDay()]+")";
var src=document.getElementById("briefSrc"),brief=src?src.innerHTML:"";
var host=document.createElement("div");host.innerHTML="<div class=\"wrap\">\n<header class=\"top\">\n<div class=\"hbar\">\n<div class=\"brand\"><span class=\"logo\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8\"/></svg></span><div class=\"bt\"><h1>태양광 핵심문제</h1><div class=\"sub\">__DATE_KO__ · 최근 동향 · 기술 · 정책 10문제</div></div></div>\n<nav class=\"tools\" aria-label=\"도구\">\n<button type=\"button\" class=\"tool\" id=\"calcBtn\" title=\"계산기 열기 (일반 / 공학용)\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"2.5\" width=\"14\" height=\"19\" rx=\"2.5\"/><path d=\"M8.5 7h7M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18.5h.01M12 18.5h.01M15.5 18.5h.01\"/></svg><span>계산기</span></button>\n<button type=\"button\" class=\"tool\" id=\"findBtn\" title=\"초급·중급·고급 A~E종 전체에서 찾기 (Ctrl+F)\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"M15.5 15.5 21 21\"/></svg><span>찾기</span><kbd>Ctrl F</kbd></button>\n<span class=\"prwrap\"><button type=\"button\" class=\"tool\" id=\"printBtn\" aria-haspopup=\"true\" aria-expanded=\"false\" title=\"인쇄\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M7 8V3h10v5\"/><rect x=\"3\" y=\"8\" width=\"18\" height=\"9\" rx=\"2\"/><path d=\"M7 14h10v7H7z\"/></svg><span>인쇄</span></button>\n<span class=\"prmenu\" id=\"printMenu\" hidden><button type=\"button\" data-pm=\"blank\">빈 문제지 인쇄<small>답·해설 없이 문제만</small></button><button type=\"button\" data-pm=\"screen\">지금 화면 그대로 인쇄<small>내 답·채점 결과·해설 포함</small></button><button type=\"button\" data-pm=\"key\">정답·해설지 따로 인쇄<small>빈 문제지 + 뒤쪽 새 페이지에 정답·해설</small></button><button type=\"button\" data-pm=\"inline\">문제에 정답 적어 인쇄<small>문제마다 바로 아래에 정답·풀이식·해설</small></button></span></span>\n<span class=\"tsep\" aria-hidden=\"true\"></span>\n<button type=\"button\" class=\"tool icon\" id=\"themeBtn\" aria-label=\"다크 모드로 보기\" title=\"다크 / 라이트 모드\"></button>\n</nav>\n</div>\n<div class=\"nav2\">\n<div class=\"lv seg\" role=\"tablist\" aria-label=\"등급\">\n<button type=\"button\" role=\"tab\" id=\"lv-b\" data-lv=\"b\">초급</button>\n<button type=\"button\" role=\"tab\" id=\"lv-m\" data-lv=\"m\">중급</button>\n<button type=\"button\" role=\"tab\" id=\"lv-a\" data-lv=\"a\">고급</button>\n</div>\n<div class=\"sets\" role=\"tablist\" aria-label=\"종(시험지 유형)\" id=\"sets\"></div>\n</div>\n<div class=\"bar\">\n<div class=\"progw\"><div class=\"prog\" aria-hidden=\"true\"><i id=\"pg\"></i></div><span class=\"cnt\" id=\"cnt\">0 / 30 답함</span></div>\n<span class=\"cmt\" role=\"group\" aria-label=\"계산 문제 푸는 방식\"><span class=\"cml\">계산</span><button type=\"button\" data-cm=\"tpl\" title=\"공식 틀의 빈칸에 숫자만 넣으면 자동 계산\">식에 숫자 넣기</button><button type=\"button\" data-cm=\"man\" title=\"직접 계산해서 답(또는 계산식)을 입력\">직접 계산</button></span>\n<div class=\"acts\">\n<button type=\"button\" class=\"btn ghost\" id=\"peekAll\" aria-pressed=\"false\" title=\"이 시험지의 모든 정답을 문제마다 펼치기 / 접기\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg><span>정답 전체</span></button>\n<button type=\"button\" class=\"btn ghost\" id=\"shuf\" title=\"문제와 보기 순서 섞기\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5\"/></svg><span>섞기</span></button>\n<button type=\"button\" class=\"btn ghost warn\" id=\"reset\" title=\"답안을 모두 지우고 처음부터 다시 풀기\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12a9 9 0 1 0 3-6.7\"/><path d=\"M3 4v5h5\"/></svg><span>리셋</span></button>\n<button type=\"button\" class=\"btn pri\" id=\"grade\">채점하기</button>\n</div>\n</div>\n</header>\n<section class=\"sheet\" aria-label=\"시험 안내\">\n<div class=\"meta2\">\n<span class=\"mc lvc\"><b id=\"m-lv\">초급 A종</b></span>\n<span class=\"mc\"><b id=\"m-n\">30문제</b><span class=\"ms\">객관식 <b id=\"m-mc\">–</b> · 용어 <b id=\"m-tx\">–</b> · 계산 <b id=\"m-ca\">–</b></span></span>\n<span class=\"mc\">100점 만점 · <b>합격 70점</b></span>\n<span class=\"sethint\" id=\"sethint\"></span>\n</div>\n<details class=\"brief\" id=\"brief\" open><summary><span>오늘의 태양광 동향 요약</span></summary>\n<!--BRIEF-->\n</details>\n<details class=\"howto\" id=\"howto\"><summary><span>사용법 · 단축키</span></summary>\n<dl class=\"hgrid\">\n<dt>객관식</dt><dd>클릭 또는 <kbd>1</kbd>~<kbd>4</kbd> 로 고르기 · 고른 보기를 다시 누르면 선택 취소 · <kbd>Enter</kbd> 다음 문제</dd>\n<dt>식에 숫자 넣기</dt><dd>파란 빈칸에 문제의 숫자만 넣으면 자동 계산 · <kbd>Enter</kbd> 다음 칸 · 빈 칸에서 <kbd>Backspace</kbd> 앞 칸 · %는 숫자만 (5% → 5)</dd>\n<dt>직접 계산</dt><dd>답 칸에 숫자나 식을 입력 · 거듭제곱 <kbd>^</kbd> (1.07^20 → 1.07<sup>20</sup>) · 음수 지수 1.05^-5 · 5% 처럼 % 사용 가능</dd>\n<dt>정답 보기</dt><dd>문제 옆 눈 아이콘 또는 우클릭 → 오른쪽 여백에 표시 (여백이 좁으면 문제 아래) · 그 문제 밖 아무 곳이나 누르면 접힘 · [정답 전체]는 이 시험지 전체</dd>\n<dt>재도전</dt><dd>채점하면 틀린 문제·안 푼 문제가 자동으로 모임 · ↺ 아이콘이나 우클릭으로 직접 넣고 빼기 · 재도전 탭에서 체크 후 <kbd>Delete</kbd></dd>\n<dt>단축키</dt><dd><kbd>Ctrl</kbd>+<kbd>Enter</kbd> 채점 / 다시 풀기 · <kbd>Ctrl</kbd>+<kbd>F</kbd> 전체 찾기 · <kbd>Esc</kbd> 창 닫기 · [계산기] 일반·공학용</dd>\n</dl>\n</details>\n</section>\n<details class=\"histbox\" id=\"histBox\"><summary><span>점수 기록표</span><span class=\"sub\" id=\"histNow\"></span></summary><div class=\"tblw\" id=\"histT\"></div><p class=\"sub\" style=\"margin:0\">채점할 때마다 등급·종별로 저장됩니다. 리셋해도 기록은 남습니다. 칸의 큰 숫자 = 최근 점수.</p></details>\n<div class=\"ph\" id=\"ph\"></div>\n<div class=\"result\" id=\"res\" hidden></div>\n<div class=\"rtools\" id=\"rtools\" hidden>\n<label class=\"rall\"><input type=\"checkbox\" id=\"rAll\"> 전체 선택</label>\n<span class=\"rcnt\" id=\"rCnt\"></span>\n<button type=\"button\" class=\"btn ghost warn\" id=\"rDel\" disabled title=\"체크한 문제를 재도전에서 뺍니다 (Delete 키)\">선택한 문제 재도전에서 빼기 <kbd>Delete</kbd></button>\n<button type=\"button\" class=\"btn ghost warn\" id=\"rClear\">재도전 모두 비우기</button>\n</div>\n<ol class=\"qlist\" id=\"ql\"></ol>\n<ol class=\"pkey\" id=\"pkey\"></ol>\n<section class=\"omr\" aria-label=\"답안 현황\">\n<h2>답안 현황 <span class=\"sub\">번호를 누르면 그 문제로 이동</span></h2>\n<div class=\"grid\" id=\"omr\"></div>\n<div class=\"foot\"><button type=\"button\" class=\"btn\" id=\"shuf2\">문제 섞기</button><button type=\"button\" class=\"btn warn\" id=\"reset2\">리셋</button><button type=\"button\" class=\"btn pri\" id=\"grade2\">채점하기</button></div>\n</section>\n</div>\n<div class=\"calcp\" id=\"calcp\" hidden role=\"dialog\" aria-label=\"계산기\" tabindex=\"-1\">\n<div class=\"chd\" id=\"calcHd\"><span class=\"ct\">계산기</span><span class=\"cmode\" id=\"cMode\" role=\"group\" aria-label=\"계산기 종류\"><button type=\"button\" data-m=\"basic\">일반</button><button type=\"button\" data-m=\"sci\">공학용</button></span><button type=\"button\" class=\"angb\" id=\"angBtn\" title=\"각도 단위 바꾸기\">DEG</button><button type=\"button\" class=\"cx\" id=\"calcX\" aria-label=\"계산기 닫기\" title=\"닫기\">✕</button></div>\n<div class=\"cdisp\"><div class=\"cexp\" id=\"cExp\" aria-live=\"off\"></div><div class=\"cres\" id=\"cRes\" aria-live=\"polite\">0</div></div>\n<div class=\"ckeys\" id=\"cKeys\"></div>\n<button type=\"button\" class=\"cins\" id=\"cIns\" disabled>결과를 빈칸에 넣기</button>\n<p class=\"chelp\">÷ 는 분수 모양으로 입력됩니다 · 숫자패드 <kbd>/</kbd> = 분수 · <kbd>Enter</kbd> 계산 · <kbd>Esc</kbd> 지우기 · 제목줄을 끌어 옮기기</p>\n</div>\n<div class=\"find\" id=\"find\" hidden role=\"dialog\" aria-label=\"문제·해설 찾기\">\n<div class=\"fbar\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"M15.5 15.5 21 21\"/></svg>\n<input type=\"search\" id=\"findIn\" placeholder=\"찾을 단어 (예: DSCR, 가중치, 감가상각)\" autocomplete=\"off\" spellcheck=\"false\" aria-label=\"찾을 단어\">\n<button type=\"button\" class=\"btn\" id=\"findX\" aria-label=\"찾기 닫기\">닫기 <kbd>Esc</kbd></button></div>\n<div class=\"fopt\"><span class=\"fsc\" id=\"fScope\"></span><label><input type=\"checkbox\" id=\"fExp\" checked> 해설·정답 포함</label><span class=\"sub\" id=\"fCnt\"></span></div>\n<ol class=\"fres\" id=\"fRes\"></ol>\n</div>\n<div class=\"dock\" id=\"dock\" role=\"region\" aria-label=\"정답\" hidden><div class=\"dock-in\"><div class=\"dock-top\"><b>정답</b><span class=\"sub\" id=\"dockN\"></span><button type=\"button\" id=\"dockClose\">닫기</button></div><div class=\"dock-list\" id=\"dockList\"></div></div></div>\n<div class=\"ctx\" id=\"ctxMenu\" role=\"menu\" hidden></div>\n<div class=\"peekpop\" id=\"peekPop\" role=\"dialog\" aria-label=\"정답\" hidden></div>\n<div class=\"toast\" id=\"toast\" role=\"status\" aria-live=\"polite\" hidden></div>".split("__DATE_KO__").join(ko).split("__DATE_DOT__").join(d.replace(/-/g,".")).split("__DATE__").join(d).replace("<!--BRIEF-->",brief);
var boot=document.getElementById("boot");if(boot)boot.remove();
while(host.firstChild)document.body.appendChild(host.firstChild);
})();
(function(){
/* ---------- 식 틀 만들기 ----------
   S(이름) = 숫자 빈칸, F(분자,분모) = 분수, P(밑,지수) = 거듭제곱, G(…) = 괄호, 문자열 = 숫자·연산자(+ - × ÷) */
const S=l=>({s:l}),F=(n,d)=>({f:[n,d]}),P=(b,e)=>({p:[b,e]}),G=(...a)=>({g:a});
const pct=l=>F([S(l)],["100"]);           // % 값을 넣으면 ÷100
const onem=l=>G("1","-",pct(l));           // (1 − x%)
const onep=l=>G("1","+",pct(l));           // (1 + x%)

/* 새 종(B~E) 작성용: M 객관식(정답을 첫 보기로 쓰고 화면에서는 섞어 보여줌) · T 용어 · C 계산 */
const M=(s,c,w,e)=>({t:"mc",s,o:[c].concat(w),a:0,e});
const T=(s,a,e)=>({t:"txt",s,a,e});
const C=(s,g,tpl,k,u,e)=>({t:"tp",s,g,tpl,k,u,e,irr:tpl.irr?1:0});
const AF=(rl,nl)=>F(["1","-",P([onep(rl)],["-",S(nl)])],[pct(rl)]);      // 연금현가계수
const CRF=(rl,nl)=>F([pct(rl)],["1","-",P([onep(rl)],["-",S(nl)])]);     // 자본회수계수
const IRRT=n=>{const t=["0","=","-",S("투자비")];for(let i=1;i<=n;i++)t.push("+",F([S("CF"+i)],[P([G("1","+","r")],[String(i)])]));t.irr=1;return t};
/* 문항: mc 객관식 {o,a} · txt 용어 {a:[허용답]} · tp 계산 {g:주어진 값, tpl:식, k:정답 빈칸값, u:단위} */
const SD=window.SOLAR_DAILY||{};const DAILY=SD.date||"";
const Q={b:{A:(typeof SD.make==="function"?SD.make({S,F,P,G,pct,onem,onep,M,T,C,AF,CRF,IRRT}):[])}};
Q.b.A.forEach((q,i)=>{if(!q.id)q.id="d"+(i+1)});
/* 종별 문항 번호 붙이기 (A종은 기존 번호 유지) */
Object.keys(Q).forEach(lv=>Object.keys(Q[lv]).forEach(set=>{if(set!=="A")Q[lv][set].forEach((q,i)=>{q.id=lv+set+(i+1)})}));
const SETS=["A"];
/* 문항 찾기표: id → {q, 등급, 종, 번호} */
const ID={};Object.keys(Q).forEach(lv=>SETS.forEach(set=>Q[lv][set].forEach((q,i)=>{ID[q.id]={q,lv,set,n:i+1}})));
const LVN={b:"초급",m:"중급",a:"고급"},SK="solar-daily-"+DAILY;
const $=id=>document.getElementById(id);
const esc=x=>String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=x=>String(x||"").replace(/\s+/g,"").toLowerCase();

/* 안전한 계산기 (eval 사용 안 함) */
function calcExpr(src){let s=String(src||"").replace(/[,\s]/g,"").replace(/[×xX]/g,"*").replace(/÷/g,"/").replace(/[−–]/g,"-");
  if(!s)return null;let i=0;const pk=()=>s[i];
  const num=()=>{const m=s.slice(i).match(/^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i);if(!m)throw 0;i+=m[0].length;return parseFloat(m[0])};
  const atom=()=>{if(pk()==="("){i++;const v=expr();if(pk()!==")")throw 0;i++;return v}return num()};
  const unary=()=>{if(pk()==="-"){i++;return -unary()}if(pk()==="+"){i++;return unary()}return pow()};
  const pct=()=>{let v=atom();while(pk()==="%"){i++;v/=100}return v};
  const pow=()=>{const b=pct();if(pk()==="^"){i++;return Math.pow(b,unary())}return b};
  const term=()=>{let v=unary();while(pk()==="*"||pk()==="/"){const o=s[i++];const r=unary();v=o==="*"?v*r:v/r}return v};
  const expr=()=>{let v=term();while(pk()==="+"||pk()==="-"){const o=s[i++];const r=term();v=o==="+"?v+r:v-r}return v};
  try{const v=expr();if(i<s.length||!isFinite(v))return null;return v}catch(e){return null}}

/* 식 틀 → 계산 문자열 / HTML */
function slotCount(t){let n=0;const w=a=>a.forEach(x=>{if(x&&x.s)n++;else if(x&&x.f){w(x.f[0]);w(x.f[1])}else if(x&&x.p){w(x.p[0]);w(x.p[1])}else if(x&&x.g)w(x.g)});w(t);return n}
function tplStr(t,vals){let k=0;const w=a=>a.map(x=>{
  if(typeof x==="string")return x.replace(/×/g,"*").replace(/÷/g,"/").replace(/,/g,"");
  if(x.s){const v=vals[k++];return "("+v+")"}
  if(x.f)return "(("+w(x.f[0])+")/("+w(x.f[1])+"))";
  if(x.p)return "(("+w(x.p[0])+")^("+w(x.p[1])+"))";
  if(x.g)return "("+w(x.g)+")"}).join("");return w(t)}
function tplHTML(t,qid,vals,ro,stat){let k=0;const w=a=>a.map(x=>{
  if(typeof x==="string")return /^[+\-×÷]$/.test(x)?'<span class="op">'+(x==="-"?"−":x)+'</span>':'<span class="k">'+esc(x)+'</span>';
  if(x.s){const i=k++,v=vals[i]==null?"":vals[i];
    if(stat)return '<span class="k" style="color:var(--sun);font-weight:700">'+esc(fmtN(v))+'</span>';
    return '<span class="slw"><input class="sl" data-q="'+qid+'" data-i="'+i+'" inputmode="decimal" autocomplete="off" spellcheck="false" value="'+esc(v)+'" aria-label="'+esc(x.s)+'" title="'+esc(x.s)+'"'+(ro?" readonly":"")+'><small>'+esc(x.s)+'</small></span>'}
  if(x.f)return '<span class="frac"><span class="fn">'+w(x.f[0])+'</span><span class="fd">'+w(x.f[1])+'</span></span>';
  if(x.p)return '<span class="pw">'+w(x.p[0])+'<span class="pe">'+w(x.p[1])+'</span></span>';
  if(x.g)return '<span class="pa">(</span>'+w(x.g)+'<span class="pa">)</span>'}).join("");return '<span class="eq">'+w(t)+'</span>'}
/* IRR: 0 = −투자비 + Σ CFt/(1+r)^t 를 만족하는 r(%)을 이분법으로 찾음 */
function irrOf(n){const cf=[-n[0]].concat(n.slice(1)),f=r=>cf.reduce((a,c,t)=>a+c/Math.pow(1+r,t),0);let lo=-0.99,hi=10;if(f(lo)*f(hi)>0)return null;for(let k=0;k<200;k++){const m=(lo+hi)/2;if(f(lo)*f(m)<=0)hi=m;else lo=m}return (lo+hi)/2*100}
function tplVal(q,vals){if(!vals||vals.length<slotCount(q.tpl))return null;const nums=[];for(let i=0;i<vals.length;i++){const v=calcExpr(vals[i]);if(v==null)return null;nums.push(v)}return q.irr?irrOf(nums):calcExpr(tplStr(q.tpl,nums))}
const fmtN=v=>{const n=typeof v==="number"?v:calcExpr(v);if(n==null)return String(v);return n.toLocaleString("ko-KR",{maximumFractionDigits:Math.abs(n)>=100?2:Math.abs(n)>=1?4:5})};
/* 정답값은 정답 빈칸값으로 직접 계산 (문제와 정답이 항상 일치) */
Object.values(Q).flatMap(o=>Object.values(o)).flat().forEach(q=>{if(q.t==="tp"){q.a=q.irr?irrOf(q.k):calcExpr(tplStr(q.tpl,q.k));q.tol=Math.max(Math.abs(q.a)*0.005,1e-6)}});

let st={lv:"b",set:"A",d:{}};
try{const s=JSON.parse(localStorage.getItem(SK)||"null");if(s&&s.d){st=s;if(!SETS.includes(st.set)&&st.set!=="R")st.set="A"}}catch(e){}
st.lv="b";
const KEY=()=>st.lv+st.set,isR=()=>st.set==="R";
const inRetry=(lv,id)=>((st.w&&st.w[lv])||[]).includes(id)||((st.pin&&st.pin[lv])||[]).includes(id);
const wrongIds=lv=>[...new Set(((st.w&&st.w[lv])||[]).concat((st.pin&&st.pin[lv])||[]))].filter(id=>ID[id]).sort((x,y)=>SETS.indexOf(ID[x].set)-SETS.indexOf(ID[y].set)||ID[x].n-ID[y].n);
const QS=()=>{if(!isR())return Q[st.lv][st.set];const D=st.d[KEY()];return (D&&D.ids?D.ids:[]).map(id=>ID[id].q)};
const fresh=k=>{if(k[1]==="R"){const ids=wrongIds(k[0]);return {ids,ord:ids.map((_,i)=>i),opt:{},ans:{},graded:false}}return {ord:Q[k[0]][k[1]].map((_,i)=>i),opt:{},ans:{},graded:false}};
/* 채점 결과로 틀린 문제 목록 갱신: 틀리면 넣고, 맞히면 뺀다 (안 푼 문제도 틀린 것으로 넣음) */
function updateWrong(D){if(!st.w)st.w={};if(!st.pin)st.pin={};const a=new Set(st.w[st.lv]||[]),pn=new Set(st.pin[st.lv]||[]);QS().forEach(q=>{if(isRight(q,D.ans[q.id])){a.delete(q.id);if(isR())pn.delete(q.id)}else a.add(q.id)});st.w[st.lv]=[...a];st.pin[st.lv]=[...pn]}
/* 문제 옆 아이콘으로 재도전 넣기/빼기 */
/* 재도전 목록에서 빼기 (재도전 탭에서는 화면에서도 바로 사라짐) */
function removeFromRetry(ids,quiet){const lv=st.lv,rm=new Set(ids);if(!st.w)st.w={};if(!st.pin)st.pin={};
  st.w[lv]=(st.w[lv]||[]).filter(x=>!rm.has(x));st.pin[lv]=(st.pin[lv]||[]).filter(x=>!rm.has(x));
  if(isR()){const D=L(),order=D.ord.map(i=>D.ids[i]).filter(x=>x&&!rm.has(x));D.ids=order;D.ord=order.map((_,i)=>i);rm.forEach(x=>{delete D.ans[x];peekOpen.delete(x);peekPin.delete(x);peekInline.delete(x)})}
  save();render();if(!quiet)toast(ids.length+"문제를 재도전에서 뺐습니다")}
function rtoolsSync(){const box=$("rtools");if(!box)return;const show=isR()&&QS().length>0;box.hidden=!show;if(!show){rSel=false;return}
  const cs=[...document.querySelectorAll("#ql .rchk")],n=cs.filter(c=>c.checked).length;$("rCnt").textContent=n?n+"문제 선택됨":"빼고 싶은 문제를 체크하세요";
  $("rDel").disabled=!n;$("rDel").innerHTML=(n?"선택한 "+n+"문제 재도전에서 빼기":"선택한 문제 재도전에서 빼기")+" <kbd>Delete</kbd>";$("rAll").checked=n>0&&n===cs.length;$("rAll").indeterminate=n>0&&n<cs.length;
  cs.forEach(c=>c.closest(".q").classList.toggle("rpick",c.checked))}
function togglePin(id){if(isR()&&inRetry(st.lv,id)){removeFromRetry([id]);return}const lv=ID[id].lv;if(!st.w)st.w={};if(!st.pin)st.pin={};const w=new Set(st.w[lv]||[]),pn=new Set(st.pin[lv]||[]);
  const on=w.has(id)||pn.has(id);if(on){w.delete(id);pn.delete(id)}else pn.add(id);st.w[lv]=[...w];st.pin[lv]=[...pn];save();renderSets();
  document.querySelectorAll('.pin[data-pin="'+id+'"]').forEach(b=>pinState(b,!on));toast(on?"재도전에서 뺐습니다":"재도전에 넣었습니다 · [재도전] 탭에서 다시 풀 수 있습니다")}
const PEEK_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const PIN_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>';
function pinState(b,on){b.classList.toggle("on",on);b.setAttribute("aria-pressed",on);const t=on?"재도전에서 빼기":"재도전에 넣기";b.title=t;b.setAttribute("aria-label",t)}
const anyAns=D=>Object.values(D.ans).some(v=>Array.isArray(v)?v.some(x=>String(x).trim()!==""):String(v==null?"":v).trim()!=="");
const L=()=>{const k=KEY();if(!st.d[k])st.d[k]=fresh(k);return st.d[k]};
const save=()=>{try{localStorage.setItem(SK,JSON.stringify(st))}catch(e){}};
const has=(q,v)=>q.t==="tp"?(Array.isArray(v)?(v.length>=slotCount(q.tpl)&&v.every(x=>String(x).trim()!=="")):(typeof v==="string"&&v.trim()!=="")):(v!=null&&String(v).trim()!=="");
function isRight(q,v){if(!has(q,v))return false;
  if(q.t==="mc")return +v===q.a;
  if(q.t==="tp"){const r=Array.isArray(v)?tplVal(q,v):calcExpr(v);return r!=null&&Math.abs(r-q.a)<=q.tol}
  return q.a.some(a=>norm(a)===norm(v))}
const fmtA=q=>q.t==="mc"?q.o[q.a]:q.t==="tp"?fmtN(q.a)+(q.u?" "+q.u:""):q.a[0];
const N=()=>QS().length;
const isMan=()=>st.cm==="man";
let rSel=false;
/* 직접 계산 식 보기: ^ 는 위첨자, * / 는 × ÷ */
function prettyExpr(src){let s=esc(String(src||"")).replace(/\*/g,"×").replace(/\//g,"÷").replace(/-/g,"−");
  for(let k=0;k<20;k++){const n=s.replace(/\^(\((?:[^()]|\([^()]*\))*\)|−?[\d.]+)/,(m,e)=>'<sup>'+(e.startsWith("(")&&e.endsWith(")")?e.slice(1,-1):e)+'</sup>');if(n===s)break;s=n}
  return s.replace(/\^/g,'<sup>□</sup>').replace(/([×÷+])/g,' $1 ')}

function render(){
  const D=L();
  if(isR()&&!D.graded&&!anyAns(D)){const f=fresh(KEY());D.ids=f.ids;D.ord=f.ord}
  const qs=QS();
  document.querySelectorAll(".lv button").forEach(b=>b.setAttribute("aria-selected",b.dataset.lv===st.lv));
  $("m-lv").textContent=isR()?"재도전":DAILY.slice(5).replace("-","/")+" 핵심 10문제";
  renderSets();
  document.querySelectorAll(".cmt [data-cm]").forEach(b=>b.setAttribute("aria-pressed",(b.dataset.cm==="man")===isMan()));
  renderBody(D,qs);
}
function renderSets(){
  $("sets").innerHTML=SETS.map(x=>{const d=st.d[st.lv+x],n=d?Q[st.lv][x].filter(q=>has(q,d.ans[q.id])).length:0,g=d&&d.graded;return '<button type="button" role="tab" data-set="'+x+'" aria-selected="'+(x===st.set)+'" title="오늘의 문제">'+(x==="A"?"오늘":x)+'<span class="dn">'+(g?"채점함":n?n+"/30":hist(st.lv+x).length?"최근 "+hist(st.lv+x).slice(-1)[0].sc+"점":"새 시험")+'</span></button>'}).join("")+'<button type="button" role="tab" class="rtab" data-set="R" aria-selected="'+isR()+'" title="'+LVN[st.lv]+' A~E종에서 틀린 문제">재도전<span class="dn">'+wrongIds(st.lv).length+'문제</span></button>';
  $("sethint").textContent=isR()?"A~E종에서 틀린 문제와 직접 넣은 문제 · 맞히면 목록에서 빠집니다":"태양광 최근 동향·기술·정책과 핵심 실무 개념 10문제";
}
function renderBody(D,qs){
  $("m-n").textContent=qs.length+"문제";$("m-mc").textContent=qs.filter(q=>q.t==="mc").length;$("m-tx").textContent=qs.filter(q=>q.t==="txt").length;$("m-ca").textContent=qs.filter(q=>q.t==="tp").length;
  let h="";
  D.ord.forEach((qi,n)=>{const q=qs[qi],v=D.ans[q.id],g=D.graded,ok=g&&isRight(q,v);
    h+='<li class="q'+(g?(ok?" ok":" ng"):"")+'" id="q-'+q.id+'" data-id="'+q.id+'"><div class="qh"><span class="qn">'+(n+1)+'.</span><div class="qt"><span class="stem">'+esc(q.s)+'</span>'+(isR()&&ID[q.id]?'<span class="tag src">'+ID[q.id].set+'종 '+ID[q.id].n+'번</span>':'')+'<span class="tag'+(q.t==="tp"?" c":q.t==="txt"?" t":"")+'">'+(q.t==="mc"?"객관식":q.t==="tp"?"계산":"용어")+'</span>'+(q.g?'<div class="given">'+esc(q.g)+'</div>':'')+'</div><button type="button" class="peek" data-peek="'+q.id+'" title="정답 보기" aria-label="정답 보기" aria-expanded="false">'+PEEK_SVG+'</button>'+(isR()?'<label class="rsel" title="선택해서 재도전에서 빼기"><input type="checkbox" class="rchk" data-id="'+q.id+'" aria-label="'+(n+1)+'번 선택"></label>':'<button type="button" class="pin'+(inRetry(st.lv,q.id)?' on':'')+'" data-pin="'+q.id+'" aria-pressed="'+inRetry(st.lv,q.id)+'" title="'+(inRetry(st.lv,q.id)?'재도전에서 빼기':'재도전에 넣기')+'" aria-label="'+(inRetry(st.lv,q.id)?'재도전에서 빼기':'재도전에 넣기')+'">'+PIN_SVG+'</button>')+'</div><div class="body">';
    if(q.t==="mc"){const oo=D.opt[q.id]||seedOrder(q);h+='<div class="opts" role="radiogroup" aria-label="'+(n+1)+'번 보기">';
      oo.forEach((oi,k)=>{const sel=String(v)===String(oi),cls=g?(oi===q.a?" right":sel?" wrong":""):"";
        h+='<label class="opt'+cls+'"><input type="radio" name="r-'+q.id+'" value="'+oi+'"'+(sel?" checked":"")+(g?" disabled":"")+'><span class="mk">'+(k+1)+'</span><span>'+esc(q.o[oi])+'</span></label>'});h+='</div>'}
    else if(q.t==="tp"&&isMan()){const mv=typeof v==="string"?v:(Array.isArray(v)&&has(q,v)?String(+tplVal(q,v).toPrecision(10)):"");
      h+='<div class="calc mcalc"><span class="lab">직접 계산해서 답을 쓰세요 · 숫자패드로 식 입력 가능 (거듭제곱은 ^ : 1.07^20)</span><div class="mrow"><input type="text" class="man" id="mn-'+q.id+'" data-q="'+q.id+'" inputmode="decimal" autocomplete="off" spellcheck="false" value="'+esc(mv)+'" placeholder="답 또는 계산식"'+(g?" readonly":"")+' aria-label="'+(n+1)+'번 답 (직접 계산)">'+(q.u?'<span class="u">'+esc(q.u)+'</span>':'')+'</div><div class="mprev" id="mp-'+q.id+'"></div>'+(g?'':'<details class="hint"><summary>공식 힌트 보기</summary><div class="fx">'+tplHTML(q.tpl,q.id,[],true)+'</div></details>')+'</div>'}
    else if(q.t==="tp"){h+='<div class="calc"><span class="lab">'+(q.irr?"빈칸에 숫자만 넣으세요 · r(IRR)은 자동으로 찾아 계산":"빈칸에 숫자만 넣으세요 · 계산은 자동")+'</span><div class="fx">'+tplHTML(q.tpl,q.id,Array.isArray(v)?v:[],g)+'</div><div class="out"><span class="ol">자동 계산 = 내 답</span><span class="ov" id="ov-'+q.id+'"></span>'+(q.u?'<span class="u">'+esc(q.u)+'</span>':'')+'</div></div>'}
    else h+='<div class="ans"><input type="text" class="tx" id="in-'+q.id+'" autocomplete="off" value="'+esc(v||"")+'" placeholder="답 입력" aria-label="'+(n+1)+'번 답"'+(g?" readonly":"")+'></div>';
    if(g){h+='<div class="fb '+(ok?"ok":"ng")+'" style="margin-top:8px"><b class="h">'+(ok?"정답":"오답 · 정답: "+esc(fmtA(q)))+'</b>';
      if(q.t==="tp")h+='<div class="fx">'+tplHTML(q.tpl,q.id,q.k,true,true)+(q.irr?' <span class="k">→ r</span>':'')+' <span class="op">=</span> <b>'+esc(fmtN(q.a))+'</b> '+esc(q.u||"")+'</div>';
      h+='<span>'+esc(q.e)+'</span></div>'}
    h+='</div></li>'});
  if(isR()&&!qs.length)h='<li class="q empty"><b>'+LVN[st.lv]+' 재도전 목록이 비어 있습니다.</b><span>A~E종을 풀고 채점하면 틀린 문제가 여기에 모입니다. 다시 풀어 맞히면 목록에서 빠집니다.</span></li>';
  $("ql").innerHTML=h;setTimeout(()=>{if(typeof renderDock==="function")renderDock()},0);if(typeof rtoolsSync==="function")setTimeout(rtoolsSync,0);if(typeof peekOpen!=="undefined")document.querySelectorAll("#ql .q[data-id]").forEach(li=>{if(peekOpen.has(li.dataset.id))applyPeek(li)});if(typeof syncPeekAll==="function")syncPeekAll();qs.filter(q=>q.t==="tp").forEach(q=>{showVal(q.id);manPrev(q.id)});progress();renderHist();
  const r=$("res");if(D.graded){const c=qs.filter(q=>isRight(q,D.ans[q.id])).length,sc=N()?Math.round(c/N()*100):0,un=qs.filter(q=>!has(q,D.ans[q.id])).length;
    r.hidden=false;r.innerHTML='<div class="sc">'+sc+'<small> / 100</small></div><p><b>'+(sc>=90?"우수":sc>=70?"합격":"재도전 필요")+'</b> · '+LVN[st.lv]+' '+N()+'문제 중 '+c+'문제 정답'+(un?" (미응답 "+un+")":"")+(isR()?'. 맞힌 문제는 재도전 목록에서 빠졌습니다 (남은 틀린 문제 '+wrongIds(st.lv).length+'개). [리셋]을 누르면 남은 문제로 새로 시작합니다':'')+'. 틀린 문제는 빨간 표시와 정답 식·해설을 확인하세요. <b>[다시 풀기]</b>(Ctrl+Enter)를 누르면 채점 표시가 사라지고 내 답은 그대로 남아 고쳐 풀 수 있습니다. 답을 모두 지우려면 [리셋].</p>'+(isR()?'':prevLine())}
  else r.hidden=true;
}
function manPrev(id){const q=QS().find(x=>x.id===id),o=$("mp-"+id),i=$("mn-"+id);if(!o||!i)return;const t=i.value.trim();
  if(!t){o.innerHTML='<span class="wait">답을 쓰거나 계산식을 입력하세요 (예: 1277500*(1-0.005)^10)</span>';i.classList.remove("bad");return}
  const v=calcExpr(t);i.classList.toggle("bad",v==null);
  o.innerHTML='<span class="mx">'+prettyExpr(t)+'</span>'+(v==null?'<span class="wait">식을 끝까지 입력하세요</span>':'<span class="op">=</span><b>'+esc(fmtN(v))+'</b>'+(q.u?' <span class="u">'+esc(q.u)+'</span>':''))}
function showVal(id){const q=QS().find(x=>x.id===id),o=$("ov-"+id);if(!o)return;const v=Array.isArray(L().ans[id])?L().ans[id]:[],n=slotCount(q.tpl),f=v.filter(x=>String(x).trim()!=="").length;
  const r=f===n?tplVal(q,v):null;
  if(r!=null){o.className="ov";o.textContent=fmtN(r)}else{o.className="ov wait";o.textContent=f<n?"빈칸 "+(n-f)+"개 남음":"숫자를 확인하세요"}
  document.querySelectorAll('#q-'+id+' .sl').forEach(e=>{const s=e.value.trim();e.classList.toggle("bad",s!==""&&calcExpr(s)==null)})}
function progress(){const D=L(),qs=QS();let n=0,o="";
  D.ord.forEach((qi,k)=>{const q=qs[qi],v=D.ans[q.id],hv=has(q,v);if(hv)n++;
    const cls=D.graded?(isRight(q,v)?"ok":"ng"):(hv?"done":"");
    o+='<button type="button" class="cell '+cls+'" data-go="'+q.id+'" aria-label="'+(k+1)+'번으로 이동">'+(k+1)+(D.graded?(isRight(q,v)?" ○":" ✕"):"")+'</button>'});
  $("omr").innerHTML=o;$("cnt").textContent=n+" / "+N()+" 답함";$("pg").style.width=(N()?n/N()*100:0)+"%";
  ["grade","grade2"].forEach(i=>{$(i).disabled=false;$(i).textContent=D.graded?"다시 풀기":"채점하기";$(i).title=D.graded?"채점 결과와 정답을 숨기고 다시 풀기 (Ctrl+Enter)":"채점 (Ctrl+Enter)"})}
function toast(t,undo){const e=$("toast");e.textContent=t;if(undo){const b=document.createElement("button");b.type="button";b.className="undo";b.textContent="되돌리기";b.addEventListener("click",doUndo);e.appendChild(b)}e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>{e.hidden=true;if(undo)undoSnap=null},undo?6000:2600)}
function goQ(id,focus){const el=$("q-"+id);if(!el)return;el.scrollIntoView({block:"center",behavior:(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)?"auto":"smooth"});
  if(focus){const f=el.querySelector("input:checked")||el.querySelector(".man")||el.querySelector(".sl")||el.querySelector("input");if(f){f.focus({preventScroll:true});if(f.select&&f.type==="text")f.select()}}}
function nextQ(id){const D=L(),qs=QS(),ids=D.ord.map(i=>qs[i].id),k=ids.indexOf(id);if(k>-1&&k<ids.length-1)goQ(ids[k+1],true);else{$("grade").focus();toast("마지막 문제입니다. Ctrl+Enter로 채점하세요")}}

$("ql").addEventListener("change",e=>{const t=e.target;if(t.type!=="radio")return;L().ans[t.closest(".q").dataset.id]=t.value;save();progress()});
$("ql").addEventListener("input",e=>{const t=e.target,D=L();
  if(t.classList.contains("man")){const id=t.dataset.q;D.ans[id]=t.value;save();manPrev(id);progress();return}
  if(t.classList.contains("sl")){const id=t.dataset.q,q=QS().find(x=>x.id===id);const a=Array.isArray(D.ans[id])?D.ans[id]:Array(slotCount(q.tpl)).fill("");a[+t.dataset.i]=t.value;D.ans[id]=a;save();showVal(id);progress();return}
  if(t.classList.contains("tx")){D.ans[t.closest(".q").dataset.id]=t.value;save();progress()}});
$("ql").addEventListener("keydown",e=>{const card=e.target.closest(".q");if(!card)return;const id=card.dataset.id,t=e.target;
  if(t.classList.contains("man")){if(e.key==="Enter"&&!e.ctrlKey&&!e.metaKey){e.preventDefault();nextQ(id);return}
    if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!/[0-9.\-+*/^()%,]/.test(e.key))e.preventDefault();return}
  if(t.classList.contains("sl")){const sl=[...card.querySelectorAll(".sl")],i=sl.indexOf(t);
    if(e.key==="Enter"&&!e.ctrlKey&&!e.metaKey){e.preventDefault();if(i<sl.length-1){sl[i+1].focus();sl[i+1].select()}else nextQ(id);return}
    if(e.key==="Backspace"&&t.value===""&&i>0){e.preventDefault();sl[i-1].focus();return}
    if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!/[0-9.\-+*/^()]/.test(e.key)){e.preventDefault()}
    return}
  if(e.key==="Enter"&&!e.ctrlKey&&!e.metaKey){e.preventDefault();nextQ(id);return}
  if(t.type==="radio"&&/^[1-4]$/.test(e.key)){const r=card.querySelectorAll('input[type="radio"]')[+e.key-1];if(r&&!r.disabled){r.checked=true;r.focus();r.dispatchEvent(new Event("change",{bubbles:true}))}e.preventDefault()}});
$("ql").addEventListener("focusin",e=>{document.querySelectorAll(".q.cur").forEach(x=>x.classList.remove("cur"));const c=e.target.closest(".q");if(c)c.classList.add("cur");if(e.target.classList.contains("sl"))e.target.select()});
$("ql").addEventListener("click",e=>{const b=e.target.closest(".pin");if(b){e.preventDefault();togglePin(b.dataset.pin)}});
document.querySelector(".cmt").addEventListener("click",e=>{const b=e.target.closest("[data-cm]");if(!b)return;st.cm=b.dataset.cm;save();render();toast(isMan()?"직접 계산 방식: 답이나 계산식을 직접 입력합니다 (거듭제곱은 ^)":"식에 숫자 넣기 방식: 빈칸에 숫자만 넣으면 자동 계산합니다")});
/* ---------- 정답 보기 팝업 ---------- */
function answerHTML(q){const D=L();let h='<div class="pk-h"><b class="pk-t">정답</b> ';
  if(q.t==="mc"){const oo=D.opt[q.id]||seedOrder(q);h+='<span class="pk-n">'+(oo.indexOf(q.a)+1)+'</span> '+esc(q.o[q.a])+'</div>'}
  else if(q.t==="txt")h+=esc(q.a.join(" / "))+'</div>';
  else h+='<b class="pk-v">'+esc(fmtN(q.a))+'</b> '+esc(q.u||"")+'</div><div class="fx pk-f">'+tplHTML(q.tpl,q.id,q.k,true,true)+(q.irr?' <span class="k">→ r</span>':'')+' <span class="op">=</span> <b>'+esc(fmtN(q.a))+'</b></div>';
  return h+'<p class="pk-e"><b>해설</b> '+esc(q.e)+'</p>'}
/* 정답 보기: 문제 상자 안 아래쪽에 펼침 (가리지 않음). 여러 문제를 동시에 열어 둘 수 있음 */
const peekOpen=new Set(),peekPin=new Set(),peekInline=new Set();
function closePeek(){}
/* ---------- 하단 고정 정답 박스 ---------- */
/* 정답 박스에 가려지지 않게 문제를 위로 올림 */
function keepAboveDock(li){return;const dk=$("dock");if(dk.hidden)return;const dt=dk.getBoundingClientRect().top,hb=document.querySelector("header.top").getBoundingClientRect().bottom,r=li.getBoundingClientRect();
  if(r.bottom>dt-8){const need=r.bottom-dt+12,room=r.top-hb-12;const d=Math.max(0,Math.min(need,room));if(d>0)window.scrollBy({top:d,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"})}}
const sideW=()=>{const wr=document.querySelector(".wrap").getBoundingClientRect();return document.documentElement.clientWidth-wr.right-32};
const isSide=()=>sideW()>=200;
function renderDock(){const dk=$("dock");if(!dk)return;const lis=isSide()?[...document.querySelectorAll("#ql .q[data-id]")].filter(li=>peekOpen.has(li.dataset.id)&&!peekInline.has(li.dataset.id)):[];
  if(!lis.length){dk.hidden=true;dk.dataset.for="";return}
  $("dockN").textContent=lis.length>1?lis.length+"문제":"";
  $("dockList").innerHTML=lis.map(li=>{const id=li.dataset.id,q=ID[id].q,pin=peekPin.has(id);
    return '<div class="dk-item" data-for="'+id+'"><div class="dk-hd"><button type="button" class="dk-go" data-go="'+id+'" title="이 문제로 이동">'+esc(li.querySelector(".qn").textContent)+' 문제</button><span class="dk-s">'+esc(q.s)+'</span></div>'+answerHTML(q)+'</div>'}).join("");
  const fresh=dk.hidden||dk.dataset.for!==lis[0].dataset.id;dk.hidden=false;dk.dataset.for=lis[0].dataset.id;placeDock(fresh)}
/* 정답 상자를 해당 문제와 같은 높이의 오른쪽 여백에 표시 */
function placeDock(){const dk=$("dock");if(dk.hidden)return;const li=$("q-"+dk.dataset.for);if(!li){dk.hidden=true;return}
  const wr=document.querySelector(".wrap").getBoundingClientRect(),r=li.getBoundingClientRect();
  dk.style.left=(wr.right+scrollX+16)+"px";dk.style.width=Math.min(420,sideW())+"px";dk.style.top=(r.top+scrollY)+"px"}
try{new ResizeObserver(()=>placeDock(false)).observe(document.getElementById("ql"))}catch(e){}
let sideWas=null;addEventListener("resize",()=>{const sd=isSide();if(sd!==sideWas){sideWas=sd;document.querySelectorAll("#ql .q[data-id]").forEach(li=>{if(peekOpen.has(li.dataset.id))applyPeek(li)})}placeDock()});
document.addEventListener("click",e=>{const pc=e.target.closest("#dock .pk-close");if(pc){const id=pc.dataset.peek,li=$("q-"+id);if(!li)return;
    if(peekPin.has(id))peekPin.delete(id);else peekPin.add(id);applyPeek(li);toast(peekPin.has(id)?"정답을 고정했습니다 · 다른 곳을 눌러도 계속 보입니다":"고정을 풀었습니다 · 문제 밖을 누르면 닫힙니다");return}
  const g=e.target.closest("#dock .dk-go");if(g){goQ(g.dataset.go,false)}
  if(e.target.closest("#dockClose")){[...peekOpen].filter(id=>!peekInline.has(id)).forEach(id=>{peekOpen.delete(id);peekPin.delete(id);const li=$("q-"+id);if(li)applyPeek(li)});renderDock();if(typeof syncPeekAll==="function")syncPeekAll()}});
function applyPeek(li){const id=li.dataset.id,q=ID[id]&&ID[id].q,b=li.querySelector(".peek");if(!q||!b)return;const on=peekOpen.has(id);
  b.classList.toggle("on",on);b.setAttribute("aria-expanded",on);b.title=on?"정답 접기":"정답 보기";b.setAttribute("aria-label",b.title);
  li.querySelectorAll(".kshow").forEach(e=>e.classList.remove("kshow"));const old=li.querySelector(".pkin");if(old)old.remove();
  li.classList.remove("pkside-on");
  if(!on){renderDock();return}
  if(peekInline.has(id)||!isSide()){if(q.t==="mc"){const r=li.querySelector('.opt input[value="'+q.a+'"]');if(r)r.closest(".opt").classList.add("kshow")}
    li.querySelector(".body").insertAdjacentHTML("beforeend",'<div class="pkin" role="region" aria-label="정답">'+answerHTML(q)+'</div>');renderDock();return}
  if(q.t==="mc"){const r=li.querySelector('.opt input[value="'+q.a+'"]');if(r)r.closest(".opt").classList.add("kshow")}
  li.classList.add("pkside-on");li.classList.toggle("pkpin",peekPin.has(id));renderDock()}
/* 고정 안 된 정답은 다른 문제를 누르면 접힘 */
function foldOthers(keep){[...peekOpen].forEach(id=>{if(id!==keep&&!peekPin.has(id)){peekOpen.delete(id);const li=$("q-"+id);if(li)applyPeek(li)}});if(typeof syncPeekAll==="function")syncPeekAll()}
function openPeek(b){const li=b.closest(".q");if(!li)return;const id=li.dataset.id;if(peekOpen.has(id)){peekOpen.delete(id);peekPin.delete(id);peekInline.delete(id)}else{foldOthers(id);peekOpen.add(id)}applyPeek(li);
  if(peekOpen.has(id))keepAboveDock(li)}
function syncPeekAll(){const b=$("peekAll");if(!b)return;const ids=[...document.querySelectorAll("#ql .q[data-id]")].map(e=>e.dataset.id).filter(id=>ID[id]);
  const all=ids.length>0&&ids.every(id=>peekOpen.has(id));b.setAttribute("aria-pressed",all);b.classList.toggle("on",all);b.querySelector("span").textContent=all?"정답 숨기기":"정답 전체";b.disabled=!ids.length}
$("ql").addEventListener("change",e=>{if(e.target.classList.contains("rchk"))rtoolsSync()});
$("rAll").addEventListener("change",e=>{document.querySelectorAll("#ql .rchk").forEach(c=>c.checked=e.target.checked);rtoolsSync()});
document.addEventListener("keydown",e=>{if(e.key!=="Delete"||!isR()||e.ctrlKey||e.metaKey||e.altKey)return;
  const t=e.target;if(t.matches&&t.matches('input[type="text"],input[type="search"],input:not([type]),textarea,.sl,.man,.tx'))return;
  if(!$("calcp").hidden&&t.closest&&t.closest("#calcp"))return;
  const ids=[...document.querySelectorAll("#ql .rchk:checked")].map(c=>c.dataset.id);if(!ids.length)return;
  e.preventDefault();e.stopPropagation();rSel=false;removeFromRetry(ids)},true);
$("rDel").addEventListener("click",()=>{const ids=[...document.querySelectorAll("#ql .rchk:checked")].map(c=>c.dataset.id);if(ids.length){rSel=false;removeFromRetry(ids)}});
$("rClear").addEventListener("click",()=>{const lv=st.lv,k=KEY();undoSnap={k,d:JSON.parse(JSON.stringify(st.d[k]||null)),w:((st.w||{})[lv]||[]).slice(),pin:((st.pin||{})[lv]||[]).slice()};
  const all=wrongIds(lv);removeFromRetry(all,true);st.d[k]=fresh(k);save();render();toast(LVN[lv]+" 재도전 "+all.length+"문제를 모두 비웠습니다",true)});
$("peekAll").addEventListener("click",()=>{const lis=[...document.querySelectorAll("#ql .q[data-id]")].filter(li=>ID[li.dataset.id]);const all=lis.every(li=>peekOpen.has(li.dataset.id));
  lis.forEach(li=>{const id=li.dataset.id;if(all){peekOpen.delete(id);peekPin.delete(id);peekInline.delete(id)}else{peekOpen.add(id);peekPin.add(id);peekInline.add(id)}applyPeek(li)});syncPeekAll();toast(all?"정답을 모두 접었습니다":"이 시험지의 정답 "+lis.length+"개를 펼쳤습니다")});
$("ql").addEventListener("click",e=>{const pc=e.target.closest(".pk-close");if(pc){e.preventDefault();e.stopPropagation();const li=pc.closest(".q"),id=li.dataset.id;
    if(peekPin.has(id))peekPin.delete(id);else peekPin.add(id);applyPeek(li);toast(peekPin.has(id)?"정답을 고정했습니다 · 다른 문제를 눌러도 계속 보입니다":"고정을 풀었습니다 · 문제 밖을 누르면 접힙니다");return}
  const b=e.target.closest(".peek");if(b){e.preventDefault();e.stopPropagation();openPeek(b);syncPeekAll()}});
/* 접힐 때 위쪽 내용이 줄어들어도, 누른 요소가 마우스 아래에서 움직이지 않도록 스크롤 보정 */
function foldKeep(keep,anchor){if(![...peekOpen].some(id=>id!==keep&&!peekPin.has(id)))return;
  const y0=anchor&&anchor.isConnected?anchor.getBoundingClientRect().top:null;foldOthers(keep);
  if(y0!=null&&anchor.isConnected){const d=anchor.getBoundingClientRect().top-y0;if(Math.abs(d)>0.5)window.scrollBy(0,d)}}
document.addEventListener("pointerdown",e=>{if(e.button!==0)return;const t=e.target;if(!t.closest||t.closest(".peek,.pk-close,#ctxMenu,.pkin,#dock"))return;
  const li=t.closest("#ql .q[data-id]");foldKeep(li?li.dataset.id:null,t)},true);
document.addEventListener("focusin",e=>{const t=e.target;if(!t.closest||t.closest(".peek,.pk-close,#ctxMenu,.pkin,#dock,#find,#calcp"))return;const li=t.closest("#ql .q[data-id]");if(li)foldKeep(li.dataset.id,t)});
/* ---------- 문제 박스 우클릭 메뉴: 정답 보기 · 재도전 넣기/빼기 ---------- */
(function(){const m=$("ctxMenu");let cur=null;
  const close=()=>{if(m.hidden)return;m.hidden=true;if(cur)cur.classList.remove("ctxon");cur=null};
  $("ql").addEventListener("contextmenu",e=>{const li=e.target.closest(".q[data-id]");if(!li||!ID[li.dataset.id])return;
    if(e.target.closest("input[type=text],input:not([type]),.sl,.man,.tx")&&window.getSelection&&String(window.getSelection())!=="")return;
    e.preventDefault();closePeek();close();cur=li;li.classList.add("ctxon");const id=li.dataset.id,inR=inRetry(st.lv,id),n=li.querySelector(".qn").textContent;
    m.innerHTML='<div class="ctx-h">'+esc(n)+' '+(ID[id].set==="R"?"":ID[id].set+"종 ")+'</div>'
      +'<button type="button" role="menuitem" data-act="peek">'+PEEK_SVG+'<span>정답 보기</span><kbd>A</kbd></button>'
      +'<button type="button" role="menuitem" data-act="pin" class="'+(inR?"rm":"")+'">'+PIN_SVG+'<span>'+(inR?"재도전에서 빼기":"재도전에 넣기")+'</span><kbd>R</kbd></button>';
    m.hidden=false;const w=m.offsetWidth,h=m.offsetHeight,vw=document.documentElement.clientWidth,vh=innerHeight;
    m.style.left=(Math.min(e.clientX,vw-w-8)+scrollX)+"px";m.style.top=(Math.min(e.clientY,vh-h-8)+scrollY)+"px";m.querySelector("button").focus({preventScroll:true})});
  m.addEventListener("click",e=>{const b=e.target.closest("[data-act]");if(!b||!cur)return;const li=cur,id=li.dataset.id;close();
    if(b.dataset.act==="peek"){const pb=li.querySelector(".peek");if(pb)openPeek(pb)}else togglePin(id)});
  m.addEventListener("keydown",e=>{const k=e.key.toLowerCase(),bs=[...m.querySelectorAll("button")],i=bs.indexOf(document.activeElement);
    if(k==="arrowdown"||k==="arrowup"){e.preventDefault();bs[(i+(k==="arrowdown"?1:-1)+bs.length)%bs.length].focus()}
    else if(k==="a"||k==="r"){e.preventDefault();m.querySelector('[data-act="'+(k==="a"?"peek":"pin")+'"]').click()}
    else if(k==="escape"){e.preventDefault();close()}});
  document.addEventListener("mousedown",e=>{if(!m.hidden&&!e.target.closest("#ctxMenu"))close()});
  document.addEventListener("touchstart",e=>{if(!m.hidden&&!e.target.closest("#ctxMenu"))close()},{passive:true});
  addEventListener("scroll",close,{passive:true});addEventListener("resize",close);
})();
/* ---------- 객관식: 고른 보기를 다시 누르면 선택 취소 ---------- */
(function(){let was=null;
  function clearMC(r){const li=r.closest(".q");if(!li)return;r.checked=false;const D=L();delete D.ans[li.dataset.id];save();progress();renderSets();toast("선택을 취소했습니다")}
  $("ql").addEventListener("pointerdown",e=>{const o=e.target.closest(".opt");if(!o){was=null;return}const r=o.querySelector('input[type="radio"]');was=r&&r.checked&&!r.disabled?r:null},true);
  $("ql").addEventListener("click",e=>{const o=e.target.closest(".opt");if(!o||!was)return;const r=o.querySelector('input[type="radio"]');
    if(r===was){e.preventDefault();was=null;clearMC(r)}},true);
  $("ql").addEventListener("keydown",e=>{const r=e.target;if(r.type!=="radio"||r.disabled)return;
    const card=r.closest(".q"),rs=card?[...card.querySelectorAll('input[type="radio"]')]:[];
    if((e.key===" "||e.key==="Delete"||e.key==="Backspace")&&r.checked){e.preventDefault();e.stopPropagation();clearMC(r);return}
    if(/^[1-4]$/.test(e.key)){const t=rs[+e.key-1];if(t&&t.checked){e.preventDefault();e.stopPropagation();clearMC(t);t.focus()}}},true);
})();
$("omr").addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)goQ(b.dataset.go,true)});
document.querySelectorAll(".lv button").forEach(b=>b.addEventListener("click",()=>{st.lv=b.dataset.lv;save();render();window.scrollTo({top:0})}));
$("sets").addEventListener("click",e=>{const b=e.target.closest("[data-set]");if(!b)return;st.set=b.dataset.set;save();render();window.scrollTo({top:0})});

/* 채점 ↔ 정답 숨기기 토글. 입력한 답은 그대로 둠 */
function unGrade(){const D=L();D.graded=false;save();render();window.scrollTo({top:0});toast("정답을 숨겼습니다 · 다시 풀고 Ctrl+Enter로 재채점")}
/* 점수 기록: 등급+종별로 채점할 때마다 저장 (리셋해도 지워지지 않음) */
function scoreOf(D){const qs=QS(),c=qs.filter(q=>isRight(q,D.ans[q.id])).length;return {c,sc:Math.round(c/qs.length*100)}}
function recordScore(D){if(isR())return;const k=KEY(),{c,sc}=scoreOf(D),sig=JSON.stringify(D.ans);if(!st.h)st.h={};const a=st.h[k]||(st.h[k]=[]);
  const last=a[a.length-1];if(last&&last.sig===sig)return;a.push({sc,c,t:Date.now(),sig});if(a.length>20)a.shift()}
const fmtT=t=>{const d=new Date(t),p=n=>String(n).padStart(2,"0");return p(d.getMonth()+1)+"."+p(d.getDate())+" "+p(d.getHours())+":"+p(d.getMinutes())};
const hist=k=>(st.h&&st.h[k])||[];
function prevLine(){const a=hist(KEY());if(a.length<2)return '<p class="prev">이 종의 첫 기록입니다.</p>';
  const now=a[a.length-1],pv=a[a.length-2],d=now.sc-pv.sc;
  return '<p class="prev">이전 점수 <b>'+pv.sc+'점</b> ('+fmtT(pv.t)+') → 이번 <b>'+now.sc+'점</b> <span class="'+(d>0?"up":d<0?"dn2":"eq0")+'">'+(d>0?"▲ +"+d:d<0?"▼ "+d:"변화 없음")+'</span><span class="hl">지난 기록: '+a.slice(0,-1).slice(-5).reverse().map(e=>e.sc+'점').join(" · ")+'</span></p>'}
function renderHist(){const box=$("histT");if(!box)return;let h='<table class="ht"><thead><tr><th>등급</th>'+SETS.map(x=>'<th>'+x+'종</th>').join("")+'</tr></thead><tbody>';
  ["b","m","a"].forEach(lv=>{h+='<tr><th scope="row">'+LVN[lv]+'</th>'+SETS.map(x=>{const a=hist(lv+x),cur=lv===st.lv&&x===st.set;
    if(!a.length)return '<td class="'+(cur?"cur":"")+'"><span class="none">미응시</span></td>';
    const l=a[a.length-1],best=Math.max(...a.map(e=>e.sc));
    return '<td class="'+(cur?"cur":"")+'"><b class="'+(l.sc>=70?"pass":"fail")+'">'+l.sc+'</b><span class="hm">최고 '+best+' · '+a.length+'회</span><span class="hm">'+fmtT(l.t)+'</span></td>'}).join("")+'</tr>'});
  box.innerHTML=h+'</tbody></table>';
  const a=hist(KEY());$("histNow").textContent=isR()?LVN[st.lv]+" 재도전은 점수 기록에 넣지 않습니다":LVN[st.lv]+" "+st.set+"종: "+(a.length?a.length+"회 응시 · 최근 "+a[a.length-1].sc+"점":"아직 기록 없음")}
function doGrade(){const D=L();if(D.graded){unGrade();return}const un=QS().filter(q=>!has(q,D.ans[q.id])).length;
  const go=()=>{D.graded=true;recordScore(D);updateWrong(D);save();render();window.scrollTo({top:0})};
  go()}
function seedOrder(q){let h=2166136261;for(const c of q.id+q.s)h=Math.imul(h^c.charCodeAt(0),16777619);const a=q.o.map((_,i)=>i);for(let i=a.length-1;i>0;i--){h=Math.imul(h^(h>>>15),2246822507)>>>0;const j=h%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function doShuf(){const D=L(),qs=QS();const go=()=>{D.ord=shuffle(qs.map((_,i)=>i));qs.forEach(q=>{if(q.t==="mc")D.opt[q.id]=shuffle(q.o.map((_,i)=>i))});D.graded=false;save();render();window.scrollTo({top:0});toast("문제 순서와 보기 순서를 섞었습니다"+(Object.keys(D.ans).length?" · 입력한 답은 그대로입니다":""))};
  go()}
/* 리셋: 확인 없이 바로 새 시험지. 6초간 [되돌리기] */
let undoSnap=null;
function doReset(){if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();
  const k=KEY();undoSnap={k,d:JSON.parse(JSON.stringify(st.d[k]||null))};
  st.d[k]=fresh(k);peekOpen.clear();peekPin.clear();peekInline.clear();save();render();window.scrollTo({top:0});$("toast").hidden=true;
  if($("find").hidden&&$("calcp").hidden){const f=document.querySelector("#ql .opt input,#ql .sl,#ql .man,#ql .tx");if(f)f.focus({preventScroll:true})}}
function doUndo(){if(!undoSnap)return;st.lv=undoSnap.k[0];st.set=undoSnap.k[1];st.d[undoSnap.k]=undoSnap.d;if(undoSnap.w){if(!st.w)st.w={};if(!st.pin)st.pin={};st.w[st.lv]=undoSnap.w;st.pin[st.lv]=undoSnap.pin}undoSnap=null;L();save();render();$("toast").hidden=true;toast("되돌렸습니다")}
["grade","grade2"].forEach(i=>$(i).addEventListener("click",doGrade));
["shuf","shuf2"].forEach(i=>$(i).addEventListener("click",doShuf));
["reset","reset2"].forEach(i=>$(i).addEventListener("click",doReset));
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){e.preventDefault();doGrade()}});
render();
try{const ho=$("howto");if(localStorage.getItem("solar-exam-howto")==="1")ho.open=true;ho.addEventListener("toggle",()=>{try{localStorage.setItem("solar-exam-howto",ho.open?"1":"0")}catch(e){}})}catch(e){}
/* ---------- 계산기 (일반 / 공학용) · 나누기는 분수 모양으로 표시 ---------- */
(function(){
  const P=$("calcp"),ex=$("cExp"),rs=$("cRes"),ins=$("cIns");let expr="",ans=0,deg=true,justEval=false,lastSlot=null,sd=true,last=null;
  let mode="basic";try{const m=localStorage.getItem("solar-exam-calc");if(m==="sci"||m==="basic")mode=m}catch(e){}
  const KB=[["(","("],[")",")"],["√","√("],["분수⇔소수","SD","fn sm"],
    ["AC","AC","ac"],["⌫","BS","ac"],["%","%","op"],["a⁄b","÷","op dv"],
    ["7","7"],["8","8"],["9","9"],["×","×","op"],
    ["4","4"],["5","5"],["6","6"],["−","−","op"],
    ["1","1"],["2","2"],["3","3"],["+","+","op"],
    ["(−)","−"],["0","0"],["."," ."],["=","=","eqk"]];
  const KS=[["sin","sin(","fn"],["cos","cos(","fn"],["tan","tan(","fn"],["π","π","fn"],["e","e","fn"],
    ["sin⁻¹","asin(","fn"],["cos⁻¹","acos(","fn"],["tan⁻¹","atan(","fn"],["eˣ","exp(","fn"],["분수⇔소수","SD","fn sm"],
    ["ln","ln(","fn"],["log","log(","fn"],["√","√(","fn"],["x²","^2","fn"],["xʸ","^","fn"],
    ["(","(","op"],[")",")","op"],["%","%","op"],["1/x","^(-1)","fn"],["n!","!","fn"],
    ["7","7"],["8","8"],["9","9"],["a⁄b","÷","op dv"],["AC","AC","ac"],
    ["4","4"],["5","5"],["6","6"],["×","×","op"],["⌫","BS","ac"],
    ["1","1"],["2","2"],["3","3"],["−","−","op"],["Ans","Ans","fn"],
    ["0","0"],[".","."],["EXP","E","fn"],["+","+","op"],["=","=","eqk"]];
  function keys(){const K=mode==="sci"?KS:KB;$("cKeys").className="ckeys "+mode;$("cKeys").innerHTML=K.map(([t,v,c])=>'<button type="button" data-k="'+esc(v.trim())+'" class="'+(c||"")+'"'+(v==="÷"?' title="나누기 (분수 모양으로 입력)"':'')+'>'+t+'</button>').join("");
    document.querySelectorAll("#cMode button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.m===mode));$("angBtn").hidden=mode!=="sci";P.classList.toggle("sci",mode==="sci")}
  const fact=n=>{if(n<0||n!==Math.floor(n)||n>170)return NaN;let r=1;for(let i=2;i<=n;i++)r*=i;return r};
  function ev(src){let s=src.replace(/\s+/g,"").replace(/×/g,"*").replace(/÷/g,"/").replace(/−/g,"-").replace(/,/g,"");let i=0;const pk=()=>s[i];
    const toR=x=>deg?x*Math.PI/180:x,fromR=x=>deg?x*180/Math.PI:x;
    const F={sin:x=>Math.sin(toR(x)),cos:x=>Math.cos(toR(x)),tan:x=>Math.tan(toR(x)),asin:x=>fromR(Math.asin(x)),acos:x=>fromR(Math.acos(x)),atan:x=>fromR(Math.atan(x)),ln:Math.log,log:Math.log10,sqrt:Math.sqrt,exp:Math.exp};
    function prim(){const c=pk();
      if(c==="("){i++;const v=add();if(pk()===")")i++;return v}
      if(c==="π"){i++;return Math.PI}
      if(c==="√"){i++;if(pk()==="("){i++;const v=add();if(pk()===")")i++;return Math.sqrt(v)}return Math.sqrt(post())}
      const m=s.slice(i).match(/^(asin|acos|atan|sin|cos|tan|ln|log|sqrt|exp|Ans|e)(?![a-z])/);
      if(m){i+=m[0].length;const nm=m[0];if(nm==="Ans")return ans;if(nm==="e")return Math.E;if(pk()!=="(")throw 0;i++;const v=add();if(pk()===")")i++;return F[nm](v)}
      const n=s.slice(i).match(/^(\d+\.?\d*|\.\d+)(E[+-]?\d+)?/);if(!n)throw 0;i+=n[0].length;return parseFloat(n[0])}
    function post(){let v=prim();for(;;){if(pk()==="!"){i++;v=fact(v)}else if(pk()==="%"){i++;v/=100}else break}return v}
    function pw(){const b=post();if(pk()==="^"){i++;return Math.pow(b,un())}return b}
    function un(){if(pk()==="-"){i++;return -un()}if(pk()==="+"){i++;return un()}return pw()}
    function mul(){let v=un();for(;;){const c=pk();if(c==="*"||c==="/"){i++;const r=un();v=c==="*"?v*r:v/r}else if(c&&/[\d.(πe√asclA]/.test(c)){v*=un()}else break}return v}
    function add(){let v=mul();while(pk()==="+"||pk()==="-"){const c=s[i++];const r=mul();v=c==="+"?v+r:v-r}return v}
    let open=(s.match(/\(/g)||[]).length-(s.match(/\)/g)||[]).length;while(open-->0)s+=")";
    const v=add();if(i<s.length)throw 0;return v}
  /* 식을 화면에 그릴 때 ÷ 를 분수(위/아래)로 바꿔 그림 */
  function draw(src){let i=0;const s=src;
    const FN=/^(asin|acos|atan|sin|cos|tan|ln|log|exp)\(/,NAME={asin:"sin⁻¹",acos:"cos⁻¹",atan:"tan⁻¹",exp:"e^"};
    function group(){let h="",items=[];while(i<s.length&&s[i]!==")"){const c=s[i];
        if("+−×÷-".includes(c)){items.push({op:c==="-"?"−":c});i++;continue}
        const a=atom();if(a==null){items.push({op:esc(s[i])});i++;continue}items.push({a})}
      /* ÷ 접기: 앞 항 ÷ 뒤 항 → 분수 */
      const out=[];for(let k=0;k<items.length;k++){const it=items[k];
        if(it.op==="÷"){const prev=out.length&&out[out.length-1].a!=null?out.pop().a:'<span class="cbx"></span>';const nx=items[k+1]&&items[k+1].a!=null?items[++k].a:'<span class="cbx"></span>';out.push({a:'<span class="cf"><span>'+prev+'</span><span>'+nx+'</span></span>'})}
        else out.push(it)}
      return out.map(x=>x.a!=null?x.a:'<span class="cop">'+x.op+'</span>').join("")}
    function paren(){i++;const inner=group();const closed=s[i]===")";if(closed)i++;return '<span class="cpa">(</span>'+inner+(closed?'<span class="cpa">)</span>':'<span class="cpa ghost">)</span>')}
    function atom(){let h=null;const rest=s.slice(i);let m;
      if(rest[0]==="("){h=paren()}
      else if(m=rest.match(FN)){i+=m[0].length-1;const nm=m[1];h='<span class="cfn">'+(NAME[nm]||nm)+'</span>'+paren()}
      else if(rest.startsWith("√(")){i+=1;i++;const inner=group();const closed=s[i]===")";if(closed)i++;h='<span class="csq">√<span class="csqi">'+inner+'</span></span>'}
      else if(m=rest.match(/^Ans/)){i+=3;h='<span class="cfn">Ans</span>'}
      else if(rest[0]==="π"||rest[0]==="e"){i++;h=rest[0]}
      else if(m=rest.match(/^(\d+\.?\d*|\.\d+|\.)(E[+-]?\d*)?/)){i+=m[0].length;h=esc(m[1])+(m[2]?'<span class="cop">×10</span><sup>'+esc(m[2].slice(1))+'</sup>':'')}
      if(h==null)return null;
      for(;;){if(s[i]==="!"||s[i]==="%"){h+=s[i++]}else if(s[i]==="^"){i++;let e;if(s[i]==="("){e=paren()}else{const sv=i;e=atom();if(e==null){e='<span class="cbx sm"></span>';i=sv}}h='<span class="cpw">'+h+'<sup>'+e+'</sup></span>'}else break}
      return h}
    let out="";while(i<s.length){out+=group();if(s[i]===")"){out+='<span class="cpa">)</span>';i++}}return out}
  /* 결과를 분수로 (연분수, 분모 1만 이하) */
  function toFrac(v){if(!isFinite(v)||Number.isInteger(v))return null;let h1=1,h0=0,k1=0,k0=1,x=v;for(let n=0;n<40;n++){const a=Math.floor(x);[h1,h0]=[a*h1+h0,h1];[k1,k0]=[a*k1+k0,k1];if(k1>10000)return null;if(Math.abs(v-h1/k1)<1e-12*Math.max(1,Math.abs(v)))return [h1,k1];x=1/(x-a);if(!isFinite(x))break}return null}
  const fmt=v=>{if(!isFinite(v))return null;const a=Math.abs(v);if(a!==0&&(a>=1e12||a<1e-6))return v.toExponential(8).replace(/\.?0+e/,"e");return String(+v.toPrecision(12))};
  function resHTML(v){const f=sd?toFrac(v):null;if(f){const neg=f[0]<0;return (neg?"−":"")+'<span class="cf big"><span>'+Math.abs(f[0])+'</span><span>'+f[1]+'</span></span><span class="capx">≈ '+fmt(v)+'</span>'}return esc(fmt(v))}
  function show(){ex.innerHTML=expr?draw(expr):"";if(justEval){rs.className="cres";rs.innerHTML=resHTML(ans);return}
    if(!expr){rs.className="cres";rs.textContent="0";return}
    try{const v=ev(expr);rs.className="cres prev";rs.innerHTML=fmt(v)==null?"…":"= "+resHTML(v)}catch(e){rs.className="cres prev";rs.textContent="…"}}
  function press(k){
    if(k==="SD"){sd=!sd;show();return}
    if(k==="AC"){expr="";justEval=false;last=null;show();ex.textContent="";return}
    if(k==="BS"){if(justEval){justEval=false;expr=last||""}else expr=expr.replace(/(asin\(|acos\(|atan\(|sin\(|cos\(|tan\(|ln\(|log\(|exp\(|√\(|Ans|\^\(-1\))$|.$/,"");show();return}
    if(k==="="){if(!expr)return;try{const v=ev(expr),f=fmt(v);if(f==null)throw 0;ans=v;last=expr;justEval=true;ex.innerHTML=draw(expr)+'<span class="cop">=</span>';rs.className="cres";rs.innerHTML=resHTML(v);expr="";ins.disabled=!lastSlot}catch(e){rs.className="cres err";rs.textContent="식을 확인하세요"}return}
    if(justEval){justEval=false;if(/^[+\-−×÷^%!]/.test(k)||k==="^2"||k==="^(-1)")expr="Ans"}
    expr+=k;show()}
  $("cKeys").addEventListener("click",e=>{const b=e.target.closest("[data-k]");if(b){press(b.dataset.k);P.focus({preventScroll:true})}});
  $("cKeys").addEventListener("mousedown",e=>{if(e.target.closest("button"))e.preventDefault()});
  $("angBtn").addEventListener("click",()=>{deg=!deg;$("angBtn").textContent=deg?"DEG":"RAD";show()});
  $("cMode").addEventListener("click",e=>{const b=e.target.closest("[data-m]");if(!b)return;mode=b.dataset.m;try{localStorage.setItem("solar-exam-calc",mode)}catch(_){}keys();P.focus({preventScroll:true})});
  P.addEventListener("keydown",e=>{if(e.ctrlKey||e.metaKey||e.altKey)return;if(e.target.closest("#cMode,button.cx,button.angb,button.cins"))return;const k=e.key;let m=null;
    if(/^[0-9.]$/.test(k))m=k;else if(k==="+")m="+";else if(k==="-")m="−";else if(k==="*")m="×";else if(k==="/")m="÷";else if(k==="^")m="^";else if(k==="("||k===")")m=k;else if(k==="%")m="%";else if(k==="!")m="!";
    else if(k==="Enter"||k==="="){m="="}else if(k==="Backspace"){m="BS"}else if(k==="Escape"||k==="Delete"){m="AC"}
    if(m!==null){e.preventDefault();e.stopPropagation();press(m)}});
  function openC(){P.hidden=false;keys();ins.disabled=!lastSlot||!justEval;P.focus({preventScroll:true})}
  function closeC(){P.hidden=true}
  $("calcBtn").addEventListener("click",()=>P.hidden?openC():closeC());
  $("calcX").addEventListener("click",closeC);
  document.addEventListener("focusin",e=>{const t=e.target;if(t.classList&&(t.classList.contains("sl")||t.classList.contains("tx"))&&!t.readOnly){lastSlot=t;if(justEval)ins.disabled=false}});
  ins.addEventListener("click",()=>{if(!lastSlot||!lastSlot.isConnected){ins.disabled=true;toast("먼저 답을 넣을 빈칸을 한 번 클릭하세요");return}
    lastSlot.value=fmt(ans);lastSlot.dispatchEvent(new Event("input",{bubbles:true}));toast("빈칸에 "+fmt(ans)+" 을(를) 넣었습니다");lastSlot.focus()});
  const hd=$("calcHd");let dx=0,dy=0,drag=false;
  hd.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;drag=true;const r=P.getBoundingClientRect();dx=e.clientX-r.left;dy=e.clientY-r.top;try{hd.setPointerCapture(e.pointerId)}catch(_){}});
  hd.addEventListener("pointermove",e=>{if(!drag)return;const w=P.offsetWidth,h=P.offsetHeight;const x=Math.min(Math.max(4,e.clientX-dx),innerWidth-w-4),y=Math.min(Math.max(4,e.clientY-dy),innerHeight-h-4);
    P.style.left=x+"px";P.style.top=y+"px";P.style.right="auto";P.style.bottom="auto"});
  hd.addEventListener("pointerup",()=>{drag=false});
  keys();
  window.__calc={press,get:()=>({expr,html:ex.innerHTML,res:rs.textContent})};
})();

/* ---------- 인쇄 ---------- */
(function(){
  const btn=$("printBtn"),menu=$("printMenu");let fired=false;
  addEventListener("beforeprint",()=>{fired=true;fillPrint()});
  addEventListener("afterprint",()=>document.body.classList.remove("pr-blank","pr-key","pr-screen","pr-inline"));
  function fillPrint(){const d=new Date(),p=n=>String(n).padStart(2,"0");
    $("ph").innerHTML='<h2>태양광 사업성 시험지 · '+LVN[st.lv]+(isR()?' 재도전':' '+st.set+'종')+'</h2><span>'+d.getFullYear()+'.'+p(d.getMonth()+1)+'.'+p(d.getDate())+' · 이름 ________________ · 점수 ______ / 100</span>';
    const D=L(),qs=QS();
    $("pkey").innerHTML='<li><h3>정답·해설 · '+LVN[st.lv]+(isR()?' 재도전':' '+st.set+'종')+'</h3></li>'+D.ord.map((qi,n)=>{const q=qs[qi];if(!q)return"";
      let a=fmtA(q);if(q.t==="mc"){const oo=D.opt[q.id]||seedOrder(q);a=(oo.indexOf(q.a)+1)+"번 · "+q.o[q.a]}
      return '<li><b>'+(n+1)+'.</b> '+esc(a)+'<br><span>'+esc(q.e)+'</span></li>'}).join("");
    /* 문제마다 정답 블록 (문제에 정답 적어 인쇄용) */
    document.querySelectorAll("#ql .pans").forEach(e=>e.remove());document.querySelectorAll("#ql .kopt").forEach(e=>e.classList.remove("kopt"));
    D.ord.forEach(qi=>{const q=qs[qi];if(!q)return;const li=$("q-"+q.id);if(!li)return;const body=li.querySelector(".body");if(!body)return;
      let h='<div class="pans"><div><b class="pa1">정답</b> ';
      if(q.t==="mc"){const oo=D.opt[q.id]||seedOrder(q);h+=(oo.indexOf(q.a)+1)+'번 · '+esc(q.o[q.a])+'</div>';const r=li.querySelector('.opt input[value="'+q.a+'"]');if(r)r.closest(".opt").classList.add("kopt")}
      else if(q.t==="txt")h+=esc(q.a.join(" / "))+'</div>';
      else h+='<b>'+esc(fmtN(q.a))+'</b> '+esc(q.u||"")+'</div><div class="fx">'+tplHTML(q.tpl,q.id,q.k,true,true)+(q.irr?' <span class="k">→ r</span>':'')+' <span class="op">=</span> <b>'+esc(fmtN(q.a))+'</b> '+esc(q.u||"")+'</div>';
      h+='<div class="pa2"><b>해설</b> '+esc(q.e)+'</div></div>';body.insertAdjacentHTML("beforeend",h)})}
  function doPrint(mode){menu.hidden=true;btn.setAttribute("aria-expanded","false");document.body.classList.remove("pr-blank","pr-key","pr-screen","pr-inline");
    (mode==="blank"?["pr-blank"]:mode==="key"?["pr-key","pr-blank"]:mode==="inline"?["pr-inline","pr-blank"]:["pr-screen"]).forEach(c=>document.body.classList.add(c));fillPrint();fired=false;
    try{window.print()}catch(e){}
    setTimeout(()=>{if(!fired){document.body.classList.remove("pr-blank","pr-key","pr-screen","pr-inline");toast("이 화면에서는 인쇄 창이 막혀 있습니다 · 내려받은 HTML 파일을 브라우저에서 열고 인쇄하세요")}},800)}
  btn.addEventListener("click",e=>{e.stopPropagation();menu.hidden=!menu.hidden;btn.setAttribute("aria-expanded",String(!menu.hidden));if(!menu.hidden)menu.querySelector("button").focus()});
  menu.addEventListener("click",e=>{const b=e.target.closest("[data-pm]");if(b)doPrint(b.dataset.pm)});
  document.addEventListener("click",e=>{if(!menu.hidden&&!e.target.closest(".prwrap"))menu.hidden=true});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!menu.hidden){menu.hidden=true;btn.focus()}});
})();

/* ---------- 찾기 (Ctrl+F): 초·중·고급 A~E 전체에서 문제·보기·해설·정답 검색 ---------- */
(function(){
  const box=$("find"),inp=$("findIn"),res=$("fRes"),cnt=$("fCnt"),exp=$("fExp");let scope="all",hits=[],sel=0,tm=null;
  const strip=x=>String(x).replace(/\s+/g," ").trim();
  const idx=[];Object.keys(ID).forEach(id=>{const {q,lv,set,n}=ID[id];const P=[["문제",q.s]];if(q.g)P.push(["주어진 값",q.g]);
    if(q.t==="mc")q.o.forEach((o,i)=>P.push([i===q.a?"정답 보기":"보기",o]));
    if(q.t==="txt")P.push(["정답",q.a.join(" / ")]);
    if(q.t==="tp")P.push(["정답",fmtN(q.a)+(q.u?" "+q.u:"")]);
    P.push(["해설",q.e]);idx.push({id,lv,set,n,P:P.map(([w,t])=>[w,strip(t)])})});
  const spoil=w=>w==="해설"||w==="정답"||w==="정답 보기";
  const hl=(t,k)=>{const i=t.toLowerCase().indexOf(k.toLowerCase());if(i<0)return esc(t);const a=Math.max(0,i-28),b=Math.min(t.length,i+k.length+48);
    return (a?"…":"")+esc(t.slice(a,i))+"<mark>"+esc(t.slice(i,i+k.length))+"</mark>"+esc(t.slice(i+k.length,b))+(b<t.length?"…":"")};
  function scopeBtns(){$("fScope").innerHTML=[["all","전체"],["b","초급"],["m","중급"],["a","고급"]].map(([k,t])=>'<button type="button" data-sc="'+k+'" aria-pressed="'+(k===scope)+'">'+t+'</button>').join("")}
  function run(){const k=inp.value.trim();hits=[];sel=0;
    if(!k){res.innerHTML='<li class="none">단어를 입력하면 초급·중급·고급 A~E종 450문제의 문제·보기'+(exp.checked?'·해설·정답':'')+'에서 찾습니다.</li>';cnt.textContent="";return}
    const kl=k.toLowerCase();
    idx.forEach(r=>{if(scope!=="all"&&r.lv!==scope)return;const m=r.P.filter(([w,t])=>(exp.checked||!spoil(w))&&t.toLowerCase().includes(kl));if(m.length)hits.push({r,m})});
    const nq=hits.length,nm=hits.reduce((a,h)=>a+h.m.length,0);cnt.textContent=nq?nq+"문제 · "+nm+"곳":"";
    if(!nq){res.innerHTML='<li class="none">"'+esc(k)+'"이(가) 들어간 문제가 없습니다.</li>';return}
    res.innerHTML=hits.slice(0,300).map((h,i)=>{const r=h.r,f=h.m[0];
      return '<li data-i="'+i+'" class="'+(i===0?"on":"")+'"><span class="loc"><b>'+LVN[r.lv]+' '+r.set+'종 '+r.n+'번</b>'+h.m.map(x=>'<span class="wh">'+x[0]+'</span>').filter((v,j,a)=>a.indexOf(v)===j).join("")+'</span><span class="sn">'+hl(f[1],k)+'</span>'+(h.m.length>1&&h.m[1][0]!==f[0]?'<span class="sn sub">'+esc(h.m[1][0])+': '+hl(h.m[1][1],k)+'</span>':'')+'</li>'}).join("")+(hits.length>300?'<li class="none">결과가 많아 300개까지만 보여줍니다. 단어를 더 구체적으로 입력하세요.</li>':'')}
  function mark(i){sel=Math.max(0,Math.min(hits.length-1,i));res.querySelectorAll("li[data-i]").forEach(e=>e.classList.toggle("on",+e.dataset.i===sel));const e=res.querySelector('li[data-i="'+sel+'"]');if(e)e.scrollIntoView({block:"nearest"})}
  function go(i){const h=hits[i];if(!h)return;const r=h.r;close();st.lv=r.lv;st.set=r.set;save();render();
    setTimeout(()=>{const el=$("q-"+r.id);if(!el)return;goQ(r.id,false);el.classList.remove("hit");void el.offsetWidth;el.classList.add("hit");
      const k=inp.value.trim();if(k){const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),kl=k.toLowerCase(),ns=[];let n;while(n=w.nextNode())if(n.nodeValue.toLowerCase().includes(kl)&&!n.parentNode.closest("input,mark"))ns.push(n);
        ns.forEach(n=>{const t=n.nodeValue,j=t.toLowerCase().indexOf(kl),m=document.createElement("mark");m.textContent=t.slice(j,j+k.length);const after=n.splitText(j);after.nodeValue=after.nodeValue.slice(k.length);after.parentNode.insertBefore(m,after)})}
      toast(LVN[r.lv]+" "+r.set+"종 "+r.n+"번으로 이동했습니다"+(h.m.some(x=>spoil(x[0]))&&!L().graded?" · 해설·정답은 채점 후에 보입니다":""))},30)}
  function open(){box.hidden=false;scopeBtns();run();inp.focus();inp.select()}
  function close(){box.hidden=true}
  $("findBtn").addEventListener("click",()=>box.hidden?open():close());
  $("findX").addEventListener("click",close);
  inp.addEventListener("input",()=>{clearTimeout(tm);tm=setTimeout(run,120)});
  exp.addEventListener("change",run);
  $("fScope").addEventListener("click",e=>{const b=e.target.closest("[data-sc]");if(!b)return;scope=b.dataset.sc;scopeBtns();run();inp.focus()});
  res.addEventListener("click",e=>{const li=e.target.closest("li[data-i]");if(li)go(+li.dataset.i)});
  inp.addEventListener("keydown",e=>{if(e.key==="ArrowDown"){e.preventDefault();mark(sel+1)}else if(e.key==="ArrowUp"){e.preventDefault();mark(sel-1)}else if(e.key==="Enter"){e.preventDefault();go(sel)}});
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&!e.altKey&&(e.key==="f"||e.key==="F"||e.code==="KeyF")){e.preventDefault();open()}else if(e.key==="Escape"&&!box.hidden){e.preventDefault();close()}},true);
})();

/* 다크 · 라이트 모드 */
(function(){const root=document.documentElement,btn=$("themeBtn"),mq=window.matchMedia?matchMedia("(prefers-color-scheme: dark)"):null;
  const SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',MOON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z"/></svg>';
  const cur=()=>root.getAttribute("data-theme")||(mq&&mq.matches?"dark":"light");
  const label=()=>{const d=cur()==="dark";btn.innerHTML=d?SUN:MOON;const t=d?"라이트 모드로 보기":"다크 모드로 보기";btn.setAttribute("aria-label",t);btn.title=t};
  try{const t=localStorage.getItem("solar-exam-theme");if(t==="dark"||t==="light")root.setAttribute("data-theme",t)}catch(e){}
  label();btn.addEventListener("click",()=>{const n=cur()==="dark"?"light":"dark";root.setAttribute("data-theme",n);try{localStorage.setItem("solar-exam-theme",n)}catch(e){}label()});
  if(mq&&mq.addEventListener)mq.addEventListener("change",label)})();
window.__Q=Q;
})();
