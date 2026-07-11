// import { ESPNCore } from "./espn/index.js";
// console.log(await ESPNCore.getDriverStandings());

import { ESPNCore } from "./espn/index.js";

(async()=>{
    const data=await ESPNCore.getDriverStandings();
    console.log(data);
})();
