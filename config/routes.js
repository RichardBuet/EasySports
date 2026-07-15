export const ROUTES={
    HOME:"index.html",
    NASCAR:"pages/nascar.html",
    WORLDCUP:"pages/worldcup.html",
    FORMULA1:"pages/formula1.html",
    NEWS:"pages/news.html",
    ABOUT:"pages/about.html"
};

export function getCurrentPage(){
    const path=window.location.pathname;
    return path.substring(path.lastIndexOf("/")+1)||"index.html";
}
