import { createSign } from "crypto";
const PID = (process.env.GA4_PROPERTY_ID||"").replace(/[^0-9]/g,"");
async function getToken(){const key=JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);const now=Math.floor(Date.now()/1000);const b64=o=>Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");const input=`${b64({alg:"RS256",typ:"JWT"})}.${b64({iss:key.client_email,scope:"https://www.googleapis.com/auth/analytics.readonly",aud:"https://oauth2.googleapis.com/token",exp:now+3600,iat:now})}`;const sig=createSign("RSA-SHA256").update(input).sign(key.private_key).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"");return (await(await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",assertion:`${input}.${sig}`})})).json()).access_token;}
const token=await getToken();
const r=await(await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PID}:runReport`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({dateRanges:[{startDate:"365daysAgo",endDate:"today"}],dimensions:[{name:"sessionSource"}],metrics:[{name:"keyEvents"}],orderBys:[{metric:{metricName:"keyEvents"},desc:true}],limit:30})})).json();
if(r.error){console.log("err",JSON.stringify(r.error).slice(0,200));process.exit(0);}
let tot=0;console.log("Conversioni (keyEvents) per fonte, ultimo anno:");
for(const row of r.rows||[]){const s=row.dimensionValues[0].value;const k=+row.metricValues[0].value;if(k>0){console.log(`  ${s.slice(0,30).padEnd(32)} ${k}`);tot+=k;}}
console.log(`\nTotale conversioni tracciate: ${tot}`);
