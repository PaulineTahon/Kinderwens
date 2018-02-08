let story, storyIndex = 0, innerIndex = 0;

let STATE = `eicel`;

const text = document.querySelector(`.eicel_stage_text`);
const age = document.querySelector(`.age`);
const count = document.querySelector(`.count`);
const ageCount = document.querySelector(`.stage__stats__value`);
const eggCount = document.querySelector(`.stage__stats__count`);

const userAge = document.querySelector(`.user_age`);
const ageInput = document.querySelector(`.user_age_input`);
const ageValue = document.querySelector(`.user_age_input_value`);

const buttons = document.querySelector(`.buttons`);
const buttonsText = document.querySelector(`.buttons__text`);

const eicelStory = document.querySelector(`.info__eicel`);

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

const initStory = () => {

  loadJson();
  userAge.style.display = `none`;
  buttons.addEventListener(`click`, handleNext);
  text.addEventListener(`change`, toggleVisibility);
  document.addEventListener(`click`, startEicelStory);
  console.log(eicelStory, `STORY IS INITIATED`);
  window.STATE = STATE;
};

const loadJson = () => {
  const url = `./assets/json/eicel.json`;

  fetch(url)
		.then(result => result.json())
		.then(data => readJson(data));
};

const startEicelStory = () => {
  console.log(`CLICK REGISTERED`);
  if (STATE === `home`) {
    console.log(STATE);
    const home = document.querySelector(`.home`);
    const eicel = document.querySelector(`.eicelStory`);
    home.classList.add(`fade`);
    setTimeout(() => {eicel.classList.add(`visible`);home.classList.add(`dontdisplay`);}, 2000);
    STATE = `eicel`;
    window.STATE = STATE;

    document.removeEventListener(`click`, startEicelStory);
  }
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
    if (storyIndex >= 3) {
      countEggsDown();
      countAgeDown();
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

  if (story[storyIndex].text2 || story[storyIndex].text3 || story[storyIndex].text4) {
    text.classList.remove(`visibleText`);
    text.classList.add(`fadeText`);

    if (storyIndex === 2 && innerIndex === 3) {
      eggCount.innerHTML = `${story[storyIndex].eggCount} `;
      ageCount.innerHTML = `${story[storyIndex].age} `;
    }
    if (innerIndex === 2 && story[storyIndex].text4) {
      toggleVisibility(story[storyIndex].text4);
      console.log(`last`);
      innerIndex ++;
      return;
    } else if (innerIndex === 1 && story[storyIndex].text3) {
      console.log(`second`);
      toggleVisibility(story[storyIndex].text3);
      innerIndex ++;
      return;
    } else if (innerIndex === 0 && story[storyIndex].text2) {
      console.log(`first`);
      toggleVisibility(story[storyIndex].text2);
      innerIndex ++;
      toggleFade();
      return;
    } else if (!story[storyIndex].text3 || !story[storyIndex].text4 || !story[storyIndex].text5) {
      console.log(`interval cleared`);
      clearInterval(interval);
      clickMe = true;
      text.classList.remove(`fadeText`);
      text.classList.add(`visibleText`);
      toggleFade();
      return;
    }
  }
};

const toggleVisibility = textContent => {
  console.log(textContent);
  // console.log(`SHOW TEXT`);
  // //text.classList.remove(`fadeText`);
  // console.log(`FADE`);
  // text.classList.remove(`visibleText`);
  // text.classList.add(`fadeText`);

  //setTimeout(() => {
  console.log(`SHOW`);text.classList.remove(`fadeText`);
  text.classList.add(`visibleText`);
  text.innerHTML = textContent;
  //} , 500);
};

const toggleFade = () => {

  console.log(storyIndex);

  if (!clickMe) {
    // console.log(`FADE`);
    buttons.classList.remove(`visible`);
    buttons.classList.add(`fade`);

    // if (storyIndex > 2 && innerIndex >= 1) {
    //   age.classList.add(`fade`);
    //   age.classList.remove(`visible`);
    //   count.classList.add(`fade`);
    //   count.classList.remove(`visible`);
    // }

    if (storyIndex === 2) {
      setTimeout(() => {age.classList.remove(`fade`);age.classList.add(`visible`);}, 2000);
    }

    if (storyIndex === 2 && innerIndex === 1) {
      setTimeout(() => {count.classList.remove(`fade`);count.classList.add(`visible`);}, 1000);
    }

  } else {
    console.log(`all visible`);
    buttons.classList.remove(`fade`);
    buttons.classList.add(`visible`);

    // age.classList.remove(`fade`);
    // count.classList.remove(`fade`);
    // age.classList.add(`visible`);
    // count.classList.add(`visible`);

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
    eggCount.innerHTML = `&plusmn; ${eggsLeft} `;
    if (eggsLeft === story[storyIndex].eggCount || eggsLeft === 0) {
      clearInterval(eggTimer);
    }
  }, 10);
};

const countAgeDown = () => {
  console.log(story[storyIndex - 1].age, story[storyIndex].age);
  let ageNow = story[storyIndex - 1].age;
  const ageTimer = setInterval(() => {
    ageNow ++;

    ageCount.innerHTML = `&plusmn; ${ageNow} `;
    if (ageNow === story[storyIndex].age || ageNow === 50) {
      clearInterval(ageTimer);
    }
  }, 100);
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

initStory();
