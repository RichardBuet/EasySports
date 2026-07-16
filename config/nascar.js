export const NASCAR_CONFIG={
    SEASON:2026
};

import { NASCAR_CONFIG } from "../../config/nascar.js";
const URL=`https://cf.nascar.com/cacher/${NASCAR_CONFIG.SEASON}/${series}/race_list_basic.json`;
