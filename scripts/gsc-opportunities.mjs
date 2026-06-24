import { createSign } from "crypto";
const SITE = "sc-domain:sammapix.com";
async function getToken(){
  const key=JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now=Math.floor(Date.now()/1000);
  const b64=o=>Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
  const input=`${b64({alg:"RS256",typ:"JWT"})}.${b64({iss:key.client_email,scope:"https://www.googleapis.com/auth/webmasters.readonly",aud:"https://oauth2.googleapis.com/token",exp:now+3600,iat:now})}`;
  const sig=createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
  const res=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",assertion:`${input}.${sig}`})});
  return (await res.json()).access_token;
}
async function q(token,dims,rowLimit=2000){
  const end=new Date();end.setDate(end.getDate()-2);
  const start=new Date(end);start.setDate(start.getDate()-27);
  const iso=d=>d.toISOString().slice(0,10);
  const res=await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({startDate:iso(start),endDate:iso(end),dimensions:dims,rowLimit})});
  return (await res.json()).rows||[];
}
const token=await getToken();
const path=u=>u.replace("https://www.sammapix.com","").replace("https://sammapix.com","")||"/";

// ── PAGES: striking distance (pos 8-20, impressions alte) ──
const pages=(await q(token,["page"])).map(r=>({u:path(r.keys[0]),imp:r.impressions,clk:r.clicks,ctr:r.ctr,pos:r.position}));
console.log("=== 🎯 PAGINE A TIRO (pos 8-20, ≥300 impr/28gg) — spingerle in pagina 1 ===");
pages.filter(p=>p.pos>=8&&p.pos<=20&&p.imp>=300).sort((a,b)=>b.imp-a.imp).slice(0,15)
  .forEach(p=>console.log(`  pos ${p.pos.toFixed(1)} | ${p.imp} impr | ${p.clk} clk | CTR ${(p.ctr*100).toFixed(1)}% | ${p.u}`));

console.log("\n=== 📉 PAGINE CTR BASSO (pos ≤10 ma CTR <1%, ≥500 impr) — sistemare title/meta ===");
pages.filter(p=>p.pos<=10&&p.ctr<0.01&&p.imp>=500).sort((a,b)=>b.imp-a.imp).slice(0,12)
  .forEach(p=>console.log(`  pos ${p.pos.toFixed(1)} | ${p.imp} impr | CTR ${(p.ctr*100).toFixed(2)}% | ${p.u}`));

// ── QUERIES: striking distance ──
const queries=(await q(token,["query"])).map(r=>({k:r.keys[0],imp:r.impressions,clk:r.clicks,ctr:r.ctr,pos:r.position}));
console.log("\n=== 🔑 KEYWORD A TIRO (pos 5-20, ≥200 impr) — vicine alla testa ===");
queries.filter(p=>p.pos>=5&&p.pos<=20&&p.imp>=200).sort((a,b)=>b.imp-a.imp).slice(0,18)
  .forEach(p=>console.log(`  pos ${p.pos.toFixed(1)} | ${p.imp} impr | ${p.clk} clk | "${p.k}"`));
