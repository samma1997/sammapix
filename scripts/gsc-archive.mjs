import { createSign } from "crypto";
const SITE = "sc-domain:sammapix.com";
async function getToken() {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
  const input = `${b64({alg:"RS256",typ:"JWT"})}.${b64({iss:key.client_email,scope:"https://www.googleapis.com/auth/webmasters.readonly",aud:"https://oauth2.googleapis.com/token",exp:now+3600,iat:now})}`;
  const sig = createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
  return (await (await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",assertion:`${input}.${sig}`})})).json()).access_token;
}
const token = await getToken();
const end=new Date();end.setDate(end.getDate()-2);const start=new Date(end);start.setDate(start.getDate()-89);
const iso=d=>d.toISOString().slice(0,10);
// query + pagina per capire cosa riceve cosa
const rows=(await(await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({startDate:iso(start),endDate:iso(end),dimensions:["query","page"],rowLimit:25000})})).json()).rows||[];
const RX=/\b(rar|7z|7-zip|zip|unrar|winrar|tar|gz|gzip|bz2|xz|cbr|cbz|iso|cab|lzh|arj|archive|extract|decompress|uncompress|unzip|unpack)\b/i;
const strip=p=>p.replace(/https:\/\/(www\.)?sammapix\.com/,"");
const arch=rows.filter(r=>RX.test(r.keys[0])).map(r=>({q:r.keys[0],page:strip(r.keys[1]),impr:r.impressions,clk:r.clicks,pos:r.position}));
// aggrega per query (somma pagine)
const byQ={};for(const r of arch){const k=r.q;byQ[k]=byQ[k]||{impr:0,clk:0,pos:0,pages:new Set()};byQ[k].impr+=r.impr;byQ[k].clk+=r.clk;byQ[k].pos=r.pos;byQ[k].pages.add(r.page);}
const list=Object.entries(byQ).map(([q,v])=>({q,...v,pages:[...v.pages]})).sort((a,b)=>b.impr-a.impr);
console.log(`=== QUERY ARCHIVIO (90gg) — ${list.length} query, ${list.reduce((s,r)=>s+r.impr,0)} impr tot ===\n`);
console.log("impr  clk  pos   query   → pagina/e che le ricevono");
for(const r of list.slice(0,60)) console.log(`${String(r.impr).padStart(5)} ${String(r.clk).padStart(4)} ${r.pos.toFixed(1).padStart(5)}  ${r.q.slice(0,42).padEnd(44)} ${r.pages.join(", ")}`);
// formati/intent NON coperti da unrar/open-7z/tar-gz/zip-creator
console.log("\n=== query archivio che NON atterrano su un tool archivio dedicato (potenziali buchi) ===");
const toolPages=/\/tools\/(unrar|open-7z|tar-gz|zip-creator)/;
for(const r of list.filter(r=>!r.pages.some(p=>toolPages.test(p))).slice(0,40)) console.log(`${String(r.impr).padStart(5)} ${String(r.clk).padStart(4)} ${r.pos.toFixed(1).padStart(5)}  ${r.q.slice(0,45).padEnd(47)} ${r.pages.join(", ")}`);
