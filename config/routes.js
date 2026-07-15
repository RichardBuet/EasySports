export const ROUTES={
    HOME:"/EasySports/",
    NASCAR:"/EasySports/pages/nascar.html",
    WORLDCUP:"/EasySports/pages/worldcup.html",
    FORMULA1:"/EasySports/pages/formula1.html",
    NEWS:"/EasySports/pages/news.html",
    ABOUT:"/EasySports/pages/about.html"
};

export function getCurrentPage(){
    const path=window.location.pathname;
    return path.substring(path.lastIndexOf("/")+1)||"index.html";
}
