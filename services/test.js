// import { ESPNCore } from "./espn/index.js";
// console.log(await ESPNCore.getDriverStandings());

import { ESPNCore } from "./espn/index.js";

(async()=>{
    const data=await ESPNCore.getDriverStandings();
    const athlete=await ESPNCore.get(data.standings[0].athlete.$ref);
    // document.getElementById("output").textContent=
    //     JSON.stringify(data,null,2);
})();


// import { ESPNCore } from "./espn/index.js";
// import { ESPNSite } from "./espn/index.js";

// (async()=>{

//     console.clear();

//     console.log("================================");
//     console.log("      EasySports Lab");
//     console.log("================================");

//     console.log("🏆 Driver Standings");
//     console.log(await ESPNCore.getDriverStandings());

//     console.log("📅 Calendar");
//     console.log(await ESPNCore.getCalendar());

//     console.log("🏁 Events");
//     console.log(await ESPNCore.getEvents());

//     console.log("📰 News");
//     console.log(await ESPNSite.getNews());

// })();
