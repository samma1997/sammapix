import { createSign } from "crypto";
const SITE="sc-domain:sammapix.com";
async function getToken(){
  const key=JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const now=Math.floor(Date.now()/1000);
  const b64=o=>Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
  const input=`${b64({alg:"RS256",typ:"JWT"})}.${b64({iss:key.client_email,scope:"https://www.googleapis.com/auth/webmasters.readonly",aud:"https://oauth2.googleapis.com/token",exp:now+3600,iat:now})}`;
  const sig=createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");
  const res=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",assertion:`${input}.${sig}`})});
  return (await res.json()).access_token;
}
async function q(token,day,dims){
  const res=await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({startDate:day,endDate:day,dimensions:dims,rowLimit:25})});
  return (await res.json()).rows||[];
}
const token=await getToken();
const path=u=>u.replace(/https:\/\/(www\.)?sammapix\.com/,"")||"/";
for(const day of ["2026-06-20","2026-06-16"]){
  const tot=(await q(token,day,["date"]))[0];
  console.log(`\n========== ${day} (totale: ${tot?tot.clicks:0} click, ${tot?Math.round(tot.impressions):0} impr) ==========`);
  console.log("--- TOP PAGINE per click ---");
  (await q(token,day,["page"])).filter(r=>r.clicks>0).sort((a,b)=>b.clicks-a.clicks).slice(0,10)
    .forEach(r=>console.log(`  ${r.clicks} clk | ${Math.round(r.impressions)} impr | pos ${r.position.toFixed(1)} | ${path(r.keys[0])}`));
  console.log("--- TOP QUERY per click ---");
  (await q(token,day,["query"])).filter(r=>r.clicks>0).sort((a,b)=>b.clicks-a.clicks).slice(0,12)
    .forEach(r=>console.log(`  ${r.clicks} clk | ${Math.round(r.impressions)} impr | pos ${r.position.toFixed(1)} | "${r.keys[0]}"`));
}
