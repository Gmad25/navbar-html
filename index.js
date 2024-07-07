const nav_list = document.querySelector(".nav__list");
const nav = document.querySelector("nav");

const nav_elements = [
  {
    tag: "Home",
    icon: "home-outline",
    active: true,
    tooltip: 'Go home',
  },
  {
    tag: "Profile",
    icon: "person-outline",
    tooltip: 'View your profile',
  },
  {
    tag: "Calendar",
    icon: "calendar-outline",
    tooltip: "Check your schedule",

  },
  {
    tag: "Settings",
    icon: "settings-outline",
    tooltip: "Customize your settings",

  },
];

nav.addEventListener("animationend", () => {
  stopNavAnimation();
});

function getIcon(iconIndex, isActive) {
  const icon = nav_elements[iconIndex].icon;
  if (!isActive) return icon;
  return icon.replace("-outline", "");
}

nav_elements.forEach((element, index) => {
  nav_list.innerHTML += `
        <li class="nav__element flex-center ${element.active ? "active" : ""}">
            <div class="nav__body flex-center">
                <ion-icon name="${getIcon(
                  index,
                  element.active
                )}" class="nav__icon"></ion-icon>
            </div>
            <span>${element.tag}</span>
            <div class="nav__tooltip">${element.tooltip}</div>
        </li>
    `;
});

const nav_element_list = document.querySelectorAll(".nav__element");
const array_element_list = Array.from(nav_element_list);

array_element_list.forEach((element) => {
  element.addEventListener("click", () => {
    const current_active = getCurrentActiveNavElement();
    if (current_active !== element) {
      stopNavAnimation();
      nav.classList.add("nav__animation");
      
      current_active.classList.remove("active");
      element.classList.add("active");
      updateAllIcons();
    }
  });
});

function getCurrentActiveNavElement() {
  return array_element_list.find((element) =>
    element.classList.contains("active")
  );
}

function stopNavAnimation() {
  nav.classList.remove("nav__animation");
  void nav.offsetWidth;
}

function updateAllIcons() {
  array_element_list.forEach((element, index) => {
    const activeState = element.classList.contains("active");
    element.querySelector(".nav__body").innerHTML = `
        <ion-icon name="${getIcon(
          index,
          activeState
        )}" class="nav__icon"></ion-icon>
    `;
  });
}
