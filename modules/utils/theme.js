/*=========================================
EasySports Theme Manager
=========================================*/
const SPORTS = [
    "nascar",
    "formula1",
    "worldcup",
    "motogp",
    "indycar",
    "nba",
    "nfl",
    "mlb"
];

export function setSportTheme(theme){
    document.body.classList.remove(...SPORTS);
    if(theme){ document.body.classList.add(theme); }
}
