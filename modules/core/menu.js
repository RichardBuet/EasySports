export function initSportsMenu(){

    const button=document.getElementById("sportsMenu");
    const menu=document.getElementById("sportsMenuPanel");

    if(!button||!menu)return;

    button.addEventListener("click",()=>{

        menu.classList.toggle("show");

    });

}
