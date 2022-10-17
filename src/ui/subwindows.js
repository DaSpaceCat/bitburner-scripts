let slp=ms=>new Promise(r=>setTimeout(r,ms));
let ts=()=>`[<span class=timestamp>${new Date().toLocaleTimeString("en-gb")}</span>] `;
let makeNewTailWindow=async (title="Default Window Title")=>{
  let win=open("steam_appid.txt",title.replaceAll(" ","_"),"popup=yes,height=200,width=500,left=100,top=100,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no");
  await slp(1000);
  let doc=win["document"];
  doc.head.innerHTML=`
  <title>${title}</title>
  <style>
    *{
      margin:0;
    }
    body{
      background:black;
      color:white;
      overflow:hidden;
      height:100vh;
      width:100vw;
      font-family:"JetBrains Mono";
      display:flex;
      flex-direction:column;
    }
    .title{
      font-size:20px;
      text-align:center;
      flex: 0 0;
      display:flex;
      align-items:center;
      border-bottom:1px solid white;
    }
    .scrollQuery{
      font-size:12px;
      margin-left:auto;
    }
    .timestamp{
      color:#07f;
    }
    .logs{
      width:100%;
      flex: 1;
      overflow-y:scroll;
      font-size:14px;
    }
    .logs::-webkit-scrollbar,::-webkit-scrollbar-corner{
      background:#222;
      width:10px;
      height:10px;
    }
    .logs::-webkit-scrollbar-button{
      width:0px;
      height:0px;
    }
    .logs::-webkit-scrollbar-thumb{
      background:#444;
    }
  </style>`
  doc.body.innerHTML=`<div class=title>${title} <span class=scrollQuery>Scroll to Bottom:<input type=checkbox /></span></div><div class=logs><p>Test log entry</p></div>`;
  let logs=doc.body.querySelector(".logs");
  win.log=(logContent, timeStamp=true)=>{
    logs.insertAdjacentHTML("beforeEnd",`<p>${timeStamp?ts():""}${logContent}</p>`);
    while(logs.children.length>200)logs.children[0].remove(); // Only keeps the last 200 log entries
    if (doc.querySelector("input").checked) logs.scrollTop = logs.scrollHeight;
  }
  win.reopen=()=>open("steam_appid.txt",title.replaceAll(" ","_"),"popup=yes,height=200,width=500,left=100,top=100,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no");
  return win;
}

/** @param {NS} ns */
export async function main(ns) {
  let tailWin=await makeNewTailWindow(ns.args[0]);
  let i=0;
  while(tailWin && !tailWin.closed){
    ++i%10===0 ? tailWin.log(`Log entry with no timestamp (${i})`, false) : tailWin.log(`Test log entry (${i})`);
    await slp(500);
  }
}
