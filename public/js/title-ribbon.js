var kernel = false;
var ctitle;
var displayState = "basic";
var menuState = false;

function scrollFunction(scrollValue, title) {
    // console.log(
    //     "scroll function",
    //     displayState,
    //     document.documentElement.scrollTop,
    //     kernel
    // );
    ctitle = title;
    if (
        document.documentElement.scrollTop == 0 &&
        displayState == "stucked" &&
        kernel == false
    ) {
        changeRibbonState("basic", ctitle);
    } else if (
        document.documentElement.scrollTop > 11 &&
        displayState == "basic" &&
        kernel == false
    ) {
        kernel = true;
        // console.log("change display to stuck");
        changeRibbonState("stuck", ctitle);
    }
}

function changeRibbonState(targetState, title) {
    var titleSection = document.getElementById("title-section");
    var titleRibbon = document.getElementById("title-ribbon");
    var companyName = document.getElementById("company-name");
    var welcomeTitle = document.getElementById("welcome-title");
    var companyLogo = document.getElementById("company-logo");
    var companyDescription = document.getElementById("company-description");
    var arrow = document.getElementById("arrow-container");

    switch (targetState) {
        case "stuck":
            welcomeTitle.style.display = "none";
            companyLogo.style.display = "none";
            companyDescription.style.display = "none";
            arrow.style.display = "none";
            titleSection.classList.add("stucked");
            titleRibbon.classList.add("stucked");
            companyName.classList.add("stucked");

            if (document.documentElement.clientWidth > 991) {
                companyName.innerHTML = "وب‌سایت رسمی شرکت ".concat(title);
            }
            displayState = "stucked";
            setTimeout(() => {
                document.documentElement.scrollTop += 1;
                kernel = false;
            }, 550);
            // console.log("stucked", document.documentElement.scrollTop, kernel);
            break;

        case "basic":
            welcomeTitle.style.display = "block";
            companyLogo.style.display = "unset";
            arrow.style.display = "block";
            companyDescription.style.display = "block";

            titleSection.classList.remove("stucked");
            titleRibbon.classList.remove("stucked");
            companyName.classList.remove("stucked");
            companyName.innerHTML = title;
            displayState = "basic";

            break;
    }
}
function showContacts() {
    var element = document.getElementById("contacts");
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    } else {
        window.location.href = "/ContactUs";
    }
}

function togglemenu(state) {
    var menu = document.getElementById("menu");
    var menuExpander = document.getElementById("menu-expander");
    var menuCollapser = document.getElementById("menu-collapser");

    // console.log(menu);

    if (state == true || menuState == false) {
        menu.classList.add("visible");
        menuExpander.classList.add("dimmed");
        setTimeout(() => {
            menuExpander.classList.add("hidden");
            menuCollapser.classList.remove("hidden");
            menuCollapser.classList.remove("dimmed");
        }, 450);
        menuState = true;
    } else {
        menu.classList.remove("visible");
        menuCollapser.classList.add("dimmed");
        setTimeout(() => {
            menuCollapser.classList.add("hidden");
            menuExpander.classList.remove("hidden");
            menuExpander.classList.remove("dimmed");
        }, 450);

        menuState = false;
    }
}
