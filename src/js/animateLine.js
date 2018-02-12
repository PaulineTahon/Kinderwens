const test = document.querySelector(`.extra__test`);
const path = document.querySelector(`.path`);

const lineOut = () => {
  if (path.classList.contains(`path__lineIn`)) {
    path.classList.remove(`path__lineIn`);
  }
  // path.style.strokeDashoffset = `970`;
  path.classList.add(`path__lineOut`);
};

const lineIn = () => {
  path.classList.remove(`path__lineOut`);
  // // path.style.strokeDashoffset = `0`;
  path.classList.add(`path__lineIn`);
};

test.addEventListener(`mouseenter`, lineOut);
test.addEventListener(`mouseleave`, lineIn);
