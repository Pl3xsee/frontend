function showPage(pageName) {

   
    const home = document.getElementById("home");
    const resume = document.getElementById("resume");

    const homeButton = document.getElementById("homeButton");
    const resumeButton = document.getElementById("resumeButton");


    home.classList.remove("active");
    resume.classList.remove("active");

    homeButton.classList.remove("active");
    resumeButton.classList.remove("active");



    if (pageName === "home") {

        home.classList.add("active");
        homeButton.classList.add("active");

    }


    if (pageName === "resume") {

        resume.classList.add("active");
        resumeButton.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}