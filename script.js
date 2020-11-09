let controller = new ScrollMagic.Controller();
let slideScece;
let pageScene;

function animateSliders() {
    const sliders = document.querySelectorAll(".slide");
    const nav = document.querySelector(".navigate");

    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector(".reveal-img");
        const revealText = slide.querySelector(".reveal-text");
        const img = slide.querySelector("img");



        let slideTimeLine = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.in" } });
        slideTimeLine.fromTo(revealImg, { x: "0%" }, { x: "100%" });
        slideTimeLine.fromTo(img, { scale: "2" }, { scale: "1" }, "-=0.1");
        slideTimeLine.fromTo(revealText, { x: "8%" }, { x: "100%" });
        slideTimeLine.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.1");

        slideScece = new ScrollMagic.Scene({
                triggerElement: slide,
                triggerHook: 0.25,
                reverse: false
            })
            .setTween(slideTimeLine)
            .addTo(controller);
        // .addIndicators({ colorStart: "white", colorTrigger: "white" });


        const pageTimeLine = gsap.timeline();
        let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
        pageTimeLine.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
        pageTimeLine.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
        pageTimeLine.fromTo(nextSlide, { y: "50%" }, { y: "0" });
        pageScene = new ScrollMagic.Scene({
                triggerElement: slide,
                triggerHook: 0,
                duration: "100%"
            })
            .setPin(slide, { pushFollowers: false })
            .setTween(pageTimeLine)
            .addTo(controller)
            .addIndicators({ colorStart: "white", colorTrigger: "red" });


    })

}

animateSliders();

let mouse = document.querySelector(".cursor");
let mouseSapn = mouse.querySelector("span");
//Eventlistners
window.addEventListener("mousemove", crusor);
window.addEventListener("mouseover", activateCursor);

function crusor(e) {
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';

}



function activateCursor(e) {
    if (e.target.classList.contains("titleNav") || e.target.classList.contains("menue")) {
        mouse.classList.add("active-title-menue")
    } else {
        mouse.classList.remove("active-title-menue")
    }
    if (e.target.classList.contains("explore")) {
        mouse.classList.add("active-explore");
        mouseSapn.innerText = "Tap";
        gsap.to(".title-swipe", { y: "0" })

    } else {
        mouse.classList.remove("active-explore");
        mouseSapn.innerText = "";
        gsap.to(".title-swipe", { y: "100%" })


    }

}

const navigate = document.querySelector(".navigate");

navigate.addEventListener("click", openMenue);

function openMenue() {
    if (!navigate.classList.contains("active")) {

        navigate.classList.add("active");
        document.querySelector("main").style.pointerEvents = "none"
        gsap.to(".line1", 1, { rotate: "45", y: 5, backgroundColor: "black" });
        gsap.to(".line2", 1, { rotate: "-45", y: -4, backgroundColor: "black" });
        gsap.to(".titleNav", 1, { color: "black" })
        gsap.to(".navigationContainer", 1, { clipPath: "circle(2500px at 100% -20%)" });
        gsap.fromTo(".navigationPage", 1, { opacity: 0 }, { opacity: 1 })
    } else {
        document.querySelector("main").style.pointerEvents = "all"
        navigate.classList.remove("active");
        gsap.to(".line1", 1, { rotate: "0", y: 0, backgroundColor: "white" });
        gsap.to(".line2", 1, { rotate: "0", y: 0, backgroundColor: "white" });
        gsap.to(".titleNav", 1, { color: "white" })
        gsap.to(".navigationContainer", 1, { clipPath: "circle(50px at 100% -20%)" });
        gsap.fromTo(".navigationPage", 1, { opacity: 1 }, { opacity: 0 })

    }
}