var kernel = false;
var ctitle;
var displayState = "basic";
var menuState = false;
var titleFontSize = "";
var welcomeText = "";

function scrollFunction(title) {
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
    var menu = document.getElementById("menu");

    switch (targetState) {
        case "stuck":
            welcomeTitle.style.display = "none";
            companyLogo.style.display = "none";
            companyDescription.style.display = "none";
            arrow.style.display = "none";
            titleSection.classList.add("stucked");
            titleRibbon.classList.add("stucked");
            companyName.classList.add("stucked");

            if (document.documentElement.clientWidth > 767) {
                companyName.innerHTML = "وب‌سایت رسمی شرکت ".concat(title);
                // companyName.style.fontSize = "18px";
                menu.style.alignItems = "start";
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
            // companyName.style.fontSize = "48px";
            if (document.documentElement.clientWidth > 767) {
                // companyName.innerHTML = "وب‌سایت رسمی شرکت ".concat(title);
                // companyName.style.fontSize = "18px";
                menu.style.alignItems = "center";
                menu.style.removeProperty("align-items");
            }

            displayState = "basic";

            break;
    }
    if (menuState == true) {
        toggle_mainpage_menu("auto");
    }
}

function showContacts() {
    var element = document.getElementById("contacts");
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    } else {
        window.location.href = "/contact";
    }
}

function togglemenu() {
    if (document.documentElement.clientWidth < 768) {
        toggle_mobile_menu();
    } else {
        toggle_webmenu_inner();
    }
}

function toggle_mainpage_menu(option) {
    if (document.documentElement.clientWidth < 768) {
        toggle_mobile_menu();
    } else {
        toggle_webmenu_main(option);
    }
}

function toggle_mobile_menu() {
    var mobileMenu = document.getElementById("mobile-menu");
    var menuContent = document.getElementById("menu-content");

    if (menuState == false) {
        mobileMenu.style.display = "flex";

        setTimeout(() => {
            mobileMenu.classList.add("visible");
        }, 10);

        setTimeout(() => {
            menuContent.style.display = "flex";
        }, 250);

        menuState = true;
    } else {
        mobileMenu.classList.remove("visible");
        menuContent.style.removeProperty("display");

        setTimeout(() => {
            mobileMenu.style.removeProperty("display");
        }, 250);

        menuState = false;
    }
}

function toggle_webmenu_inner() {
    var menu = document.getElementById("menu");
    var menuExpander = document.getElementById("menu-expander");
    var menuCollapser = document.getElementById("menu-collapser");
    var menuTitle = document.getElementById("menu-title");
    var menuItems = document.getElementById("menu-items");
    var titleRibbon = document.getElementById("title-ribbon");

    var menuHeight = window
        .getComputedStyle(menuTitle, null)
        .getPropertyValue("height");
    // console.log(menu);

    if (menuState == false) {
        titleRibbon.style.height = menuHeight;

        menuTitle.style.opacity = "0";
        menuTitle.style.fontSize = "9px";

        menuExpander.classList.add("dimmed");
        setTimeout(() => {
            menu.classList.add("visible");
            menuTitle.style.display = "none";
            menuCollapser.classList.remove("hidden");
            menuCollapser.classList.remove("dimmed");
            menuExpander.classList.add("hidden");

            menuItems.classList.remove("dimmed");
        }, 250);
        menuState = true;
    } else {
        menu.classList.remove("visible");
        menuCollapser.classList.add("dimmed");
        menuItems.classList.add("dimmed");
        // menuTitle.style.display = "inherit";
        menuTitle.style.removeProperty("display");

        setTimeout(() => {
            menuCollapser.classList.add("hidden");
            menuExpander.classList.remove("hidden");
            menuExpander.classList.remove("dimmed");
            menuTitle.style.removeProperty("opacity");
            menuTitle.style.removeProperty("font-size");
        }, 250);

        menuState = false;
    }
}

function toggle_webmenu_main(option) {
    var menu = document.getElementById("menu");
    var welcome = document.getElementById("welcome-title");
    var companyDesc = document.getElementById("company-description");
    var companyName = document.getElementById("company-name");
    var menuItems = document.getElementById("menu-items");
    var titleRibbon = document.getElementById("title-ribbon");

    var menuExpander = document.getElementById("menuexpander");
    var menuCollapser = document.getElementById("menu-collapser");

    var flashBackgroundColor = "#fcfcfc";
    var menuHeight = window
        .getComputedStyle(companyName, null)
        .getPropertyValue("height");

    if (menuState == false) {
        welcomeText = welcome.innerText;
        companyNameText = companyName.innerText;

        titleRibbon.style.height = menuHeight;

        welcome.style.opacity = "0";
        welcome.style.fontWeight = "800";

        companyDesc.style.opacity = "0.5";
        companyName.style.opacity = "0";

        menu.style.height = menuHeight;
        if (displayState == "basic") {
            menu.style.backgroundColor = flashBackgroundColor;
            companyName.style.fontSize = "9px";
        }

        menuExpander.classList.add("dimmed");

        setTimeout(() => {
            menu.classList.add("visible");
            companyName.style.display = "none";

            welcome.innerText = companyNameText;
            welcome.style.opacity = "0.9";
            // welcome.style.color = "darkorange";

            menuCollapser.classList.remove("hidden");
            menuCollapser.classList.remove("dimmed");
            menuExpander.classList.add("hidden");
        }, 250);
        setTimeout(() => {
            menuItems.style.display = "flex";
            menuItems.style.width = "auto";
            // console.log("onExpand: ", menuItems);
            menu.style.removeProperty("background-color");
        }, 500);

        menuState = true;
    } else {
        if (option == "auto") {
            titleRibbon.style.removeProperty("height");
        }
        welcome.style.opacity = "0";

        menu.classList.remove("visible");
        companyDesc.style.removeProperty("opacity");

        menuItems.style.removeProperty("display");
        // console.log("onCollapse: ", menuItems);

        companyName.style.removeProperty("display");

        if (displayState == "basic") {
            menu.style.backgroundColor = flashBackgroundColor;
        }

        menuCollapser.classList.add("dimmed");

        setTimeout(() => {
            welcome.innerText = welcomeText;
            welcome.style.removeProperty("opacity");
            // welcome.style.removeProperty("color");
            welcome.style.removeProperty("font-weight");

            menu.style.removeProperty("background-color");
            companyName.style.removeProperty("opacity");
            companyName.style.removeProperty("font-size");
            menu.style.removeProperty("height");

            menuCollapser.classList.add("hidden");
            menuExpander.classList.remove("hidden");
            menuExpander.classList.remove("dimmed");

            menuItems.style.removeProperty("width");
        }, 500);

        setTimeout(() => {
            titleRibbon.style.removeProperty("height");
        }, 1000);

        menuState = false;
    }
}
