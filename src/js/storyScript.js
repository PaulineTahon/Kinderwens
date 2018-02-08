let story, storyIndex = 0, innerIndex = 0;

const text = document.querySelector(`.eicel_stage_text`);
const age = document.querySelector(`.age`);
const count = document.querySelector(`.count`);
const ageCount = document.querySelector(`.stage__stats__value`);
const eggCount = document.querySelector(`.stage__stats__count`);
const ageMetric = document.querySelector(`.stage__stats__valueMetric`);
const eggCountMetric = document.querySelector(`.stage__stats__countMetric`);

const userAge = document.querySelector(`.user_age`);
const ageInput = document.querySelector(`.user_age_input`);
const ageValue = document.querySelector(`.user_age_input_value`);

const buttons = document.querySelector(`.buttons`);
//const previousButton = document.querySelector(`.buttons_previous`);
const buttonsText = document.querySelector(`.buttons__text`);
//const previousButtonText = document.querySelector(`.buttons_previous_text`);

const risks = document.querySelector(`.eicel_stage_risks`);
const info = document.querySelector(`.eicel_stage_actions`);

const listItems = document.querySelectorAll(`.nav__list__item`);
const stages = document.querySelectorAll(`.nav__list__stage`);
// const nonActive = document.querySelector(`.eicel_stage_actions`);
console.log(listItems);

const clickHandler = e => {
  e.preventDefault();

  const element = e.currentTarget;

  console.log(stages);
  stages.forEach(child => {
    console.log(child);
    if (child.classList.contains(`nav__list__stage--active`)) {
      console.log(`ja`);
      child.classList.remove(`nav__list__stage--active`);
      child.classList.add(`nav__list__stage--inactive`);
    }
  });
  listItems.forEach(child => {
    if (child.children[1].classList.contains(`nav__list--active`)) {
      console.log(`ja`);
      child.children[1].classList.remove(`nav__list--active`);
      child.children[1].classList.add(`nav__list--inactive`);
      // child.children[1].parentNode.parentNode.firstElementChild.classList.add(`testttt`);
    }

    element.parentNode.firstElementChild.classList.remove(`nav__list__stage--inactive`);
    element.parentNode.firstElementChild.classList.add(`nav__list__stage--active`);
  });

  if (!element.classList.contains(`nav__list--active`)) {
    element.children[1].classList.remove(`nav__list--inactive`);
    element.children[1].classList.add(`nav__list--active`);
    // element.children[1].parentNode.parentNode.firstElementChild.classList.remove(`testttt`);
  }

  // element.style.backgroundImage = `url('../assets/svg/cyclus.svg')`;
  // style.backgroundImage = "url('img_tree.png')";
};

listItems.forEach(listItem => {
  listItem.addEventListener(`click`, clickHandler);
});

let currentAge;
let interval;

let clickMe = true;

// const stages = [
//   {age: 0, index: 3},
//   {age: 12, index: 4},
//   {age: 20, index: 5},
//   {age: 30, index: 6},
//   {age: 35, index: 7},
//   {age: 40, index: 8},
//   {age: 50, index: 9}
// ];

const indexStory = () => {
  loadJson();
  userAge.style.display = `none`;
  buttons.addEventListener(`click`, handleNext);
};

const loadJson = () => {
  const url = `./assets/json/eicel.json`;

  fetch(url)
		.then(result => result.json())
		.then(data => readJson(data));
};

const handleNext = e => {

  if (clickMe) {

    e.preventDefault();

    innerIndex = 0;

    window.innerIndex = innerIndex;

    if (storyIndex !== 0) {
      buttonsText.innerHTML = `>`;
    }

    if (storyIndex === story.length - 1) {
      //EINDE STORY --> START TESTIMONY SCRIPT
      return;
    }

    storyIndex ++;
    progressNav();

    // if (storyIndex === 2) {
    //   //START STORY ON CURRENT AGE
    //   for (let i = 0;i < stages.length;i ++) {
    //     console.log(parseInt(stages[i].age), currentAge);
    //     if (parseInt(currentAge) <= stages[i].age) {
    //       console.log(`ja`, stages[i].age);
    //       storyIndex = stages[i - 1].index;
    //       text.innerHTML = story[storyIndex].text;
    //       return;
    //     } else {
    //       storyIndex = 9;
    //     }
    //   }
    //  } else {

    // if (storyIndex >= 1) {
    //   previousButtonText.innerHTML = `vorige`;
    //   previousButton.style.display = `block`;
    //   previousButtonText.style.display = `block`;
    // } else {
    //   previousButtonText.style.display = `none`;
    // }


    // if (storyIndex === 2) {
    //   //START STORY ON CURRENT AGE
    //   for (let i = 0;i < stages.length;i ++) {
    //     console.log(parseInt(stages[i].age), currentAge);
    //     if (parseInt(currentAge) <= stages[i].age) {
    //       console.log(`ja`, stages[i].age);
    //       storyIndex = stages[i - 1].index;
    //       text.innerHTML = story[storyIndex].text;
    //       return;
    //     } else {
    //       storyIndex = 9;
    //     }
    //   }

    text.innerHTML = story[storyIndex].text;
    if (story[storyIndex].age) {
      ageCount.innerHTML = `${story[storyIndex].age} `;
      ageMetric.innerHTML = ` jaar`;
      if (story[storyIndex - 1].eggCount) {
        countEggsDown();
      } else {
        eggCount.innerHTML = `${story[storyIndex].eggCount} `;
        eggCountMetric.innerHTML = ` eicellen`;
      }
    }

    if (story[storyIndex].info) {
      risks.innerHTML = `risico's`;
      info.innerHTML = `wat kan ik doen?`;
    }

    // const woman =  story[storyIndex].info.risks[2].woman[1];
      // const child =  story[storyIndex].info.risks[1].child[1];
      // console.log(woman);

    // for (let i = 0;i < woman.risks.length;i ++) {
      //   const risk = document.createElement(`li`);
      //   risk.className = `eicel_stage_risks_risk`;
      //   risk.innerHTML = woman.risks[i].title;
      //   console.log(risk);
      //   risks.appendChild(risk);
      // }
      //
      // for (let i = 0;i < child.risks.length;i ++) {
      //   const risk = document.createElement(`li`);
      //   risk.className = `eicel_stage_risks_risk`;
      //   risk.innerHTML = child.risks[i].title;
      //   console.log(risk);
      //   risks.appendChild(risk);
      // }

    if (storyIndex === 1) {
      userAge.style.display = `block`;
      ageValue.innerHTML = `${ageInput.value} jaar`;
      ageInput.addEventListener(`change`, handleAge);
    } else {
      userAge.style.display = `none`;
    }

    if (story[storyIndex].text2) {
      console.log(`fire interval`);
      interval = setInterval(setInnerText, 5000);
      clickMe = false;
      toggleFade();
    }

  }

  window.storyIndex = storyIndex;

};


const setInnerText = () => {

  window.innerIndex = innerIndex;

  console.log(`interval running`);
  console.log(`ja`, storyIndex, innerIndex);
  if (innerIndex === 2 && story[storyIndex].text4) {
    text.innerHTML = story[storyIndex].text4;
    console.log(`last`);
    innerIndex ++;
    return;
  } else if (innerIndex === 1 && story[storyIndex].text3) {
    text.innerHTML = story[storyIndex].text3;
    console.log(`second`);
    innerIndex ++;
    return;
  } else if (innerIndex === 0 && story[storyIndex].text2) {
    text.innerHTML = story[storyIndex].text2;
    console.log(`first`);
    innerIndex ++;
    return;
  }

  if (!story[storyIndex].text3 || !story[storyIndex].text4 || !story[storyIndex].text5) {
    console.log(`interval cleared`);
    clearInterval(interval);
    clickMe = true;
    toggleFade();
  }
};

const progressNav = () => {

  const navBgs = document.querySelectorAll(`.nav__list__bg`);
  console.log(navBgs);

  const navIndex = storyIndex - 2;

  if (navBgs[navIndex - 1] && navBgs[navIndex - 1].classList.contains(`nav__list--active`)) {
    console.log(`ja`);
    navBgs[navIndex - 1].classList.remove(`nav__list--active`);
    navBgs[navIndex - 1].classList.add(`nav__list--inactive`);
  }

  if (navBgs[navIndex] && !navBgs[navIndex].classList.contains(`nav__list--active`)) {
    navBgs[navIndex].classList.remove(`nav__list--inactive`);
    navBgs[navIndex].classList.add(`nav__list--active`);
  }
};

const toggleFade = () => {

  if (!clickMe) {
    buttons.classList.remove(`visible`);
    buttons.classList.add(`fade`);

    if (storyIndex === 2) {
      age.classList.add(`fade`);
      count.classList.add(`fade`);
      age.classList.remove(`visible`);
      count.classList.remove(`visible`);
    }
  } else {
    buttons.classList.remove(`fade`);
    buttons.classList.add(`visible`);

    if (storyIndex === 2) {
      age.classList.add(`visible`);
      count.classList.add(`visible`);
      age.classList.remove(`fade`);
      count.classList.remove(`fade`);
    }
  }

};

const countEggsDown = () => {
  console.log(story[storyIndex - 1].eggCount, story[storyIndex].eggCount);
  let eggsLeft = story[storyIndex - 1].eggCount;
  const eggTimer = setInterval(() => {
    if (story[storyIndex].eggCount >= 50000) {
      eggsLeft -= 10000;
    } else {
      eggsLeft -= 1000;
    }
    eggCount.innerHTML = `${eggsLeft} `;
    if (eggsLeft === story[storyIndex].eggCount || eggsLeft === 0) {
      clearInterval(eggTimer);
    }
  }, 10);
};

const handleAge = () => {
  ageValue.innerHTML = `${ageInput.value} jaar`;
  currentAge = ageInput.value;
  console.log(currentAge);
};

const readJson = data => {
  story = data.eicel;
  console.log(story);
  text.innerHTML = story[storyIndex].text;
};

indexStory();
