//import './js/script';

  let story, storyIndex = 0, innerIndex = 0;

  let STATE = `home`;

  const text = document.querySelector(`.eicel_stage_text`);
  const age = document.querySelector(`.age`);
  const count = document.querySelector(`.count`);
  const ageCount = document.querySelector(`.stage__stats__value`);
  const eggCount = document.querySelector(`.stage__stats__count`);

  const userAge = document.querySelector(`.user_age`);
  const ageInput = document.querySelector(`.user_age_input`);
  const ageValue = document.querySelector(`.user_age_input_value`);
  const userChildrenAge = document.querySelector(`.user_children_age`);
  const ageChildrenInput = document.querySelector(`.user_children_age_input`);
  const ageChildrenValue = document.querySelector(`.user_children_age_input_value`);

  const buttons = document.querySelector(`.buttons`);
  const buttonsText = document.querySelector(`.buttons__text`);

  const info = document.querySelector(`.eicel_stage_info`);

  const listItems = document.querySelectorAll(`.nav__list__item`);
  const stages = document.querySelectorAll(`.nav__list__stage`);

  let currentAge;
  let childrenAge;

  const ageCategories = [
    {leeftijd: 25, text: `Goed, op deze leeftijd zijn we het vruchtbaarst. Je hebt ook nog genoeg tijd om daarna kinderen te maken indien je meer dan 1 kind wenst.`},
    {leeftijd: 35, text: `Op deze leeftijd zijn wij inderdaad nog van goede kwaliteit, let wel op indien je daarna nog kinderen wenst, misschien is het een goed idee om enkelen van ons in te vriezen`},
    {leeftijd: 35, text: `Let op, op deze leeftijd zijn daalt ons aantal en onze kwaliteit snel.`},
  ];

  let interval;

  let clickMe = true;

  const initStory = () => {
    console.log(ageCategories);
    loadJson();
    buttons.addEventListener(`click`, handleNext);
    text.addEventListener(`change`, toggleVisibility);
    if (STATE === `home`) {
      document.addEventListener(`click`, startEicelStory);
    }
    console.log(`[STORY IS INITIATED]`);
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

      if (storyIndex === 0) {
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

      toggleVisibility(story[storyIndex].text);

      if (storyIndex >= 3 && storyIndex !== 5) {
        console.log(story[storyIndex].age, story[storyIndex].eggCount);
        countEggsDown();
        countAgeDown();
      }

      if (storyIndex === 4) {
        userAge.style.display = `none`;
      }

      if (story[storyIndex].info) {
        if (storyIndex === 6) {
          info.innerHTML = `Eicellen invriezen`;
          info.addEventListener(`click`, openInfoWindow);
        }
        //
        // const risk = document.createElement(`li`);
        //   risk.className = `eicel_stage_risks_risk`;
        //   risk.innerHTML = child.risks[i].title;
        //   console.log(risk);
        //   risks.appendChild(risk);
        // }
      }

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
        console.log(`class added`);
        userAge.classList.remove(`fadeText`);
        userAge.classList.add(`visibleText`);
        ageValue.innerHTML = `${ageInput.value} jaar`;
        ageInput.addEventListener(`change`, handleAge);
        ageInput.addEventListener(`input`, handleAge);
      } else if (storyIndex > 1) {
        userAge.classList.remove(`visibleText`);
        userAge.classList.add(`fadeText`);
        ageInput.removeEventListener(`change`, handleAge);
        ageInput.removeEventListener(`input`, handleAge);
      }

      if (storyIndex === 5) {
        toggleFade();
        userChildrenAge.classList.add(`visibleText`);
        age.classList.remove(`visibleText`);
        count.classList.remove(`visibleText`);
        age.classList.add(`fadeText`);
        count.classList.add(`fadeText`);
        console.log(userChildrenAge);
        ageChildrenValue.innerHTML = `${ageChildrenInput.value} jaar`;
        ageChildrenInput.addEventListener(`change`, handleChildrenAge);
        ageChildrenInput.addEventListener(`input`, handleChildrenAge);
      } else if (storyIndex > 5) {
        userChildrenAge.classList.remove(`visibleText`);
        age.classList.remove(`fadeText`);
        count.classList.remove(`fadeText`);
        userChildrenAge.classList.add(`fadeText`);
        age.classList.add(`visibleText`);
        count.classList.add(`visibleText`);
        ageChildrenInput.removeEventListener(`change`, handleChildrenAge);
        ageChildrenInput.removeEventListener(`input`, handleChildrenAge);
      }

      if (story[storyIndex].text2) {
        interval = setInterval(setInnerText, 5000);
      }
      if (storyIndex !== story.length - 1) {
        if (storyIndex !== 1 && storyIndex !== 5) {
          clickMe = false;
          toggleFade();
        }
      }

    }

    window.storyIndex = storyIndex;

  };

  const openInfoWindow = e => {
    e.preventDefault();

    //const freezeInfo = story[storyIndex].info.invriezen;
  };

  const clickHandler = e => {
    e.preventDefault();

    const element = e.currentTarget;

    console.log(stages);
    stages.forEach(child => {
      console.log(child);
      if (child.classList.contains(`nav__list__stage--active`)) {
        console.log(`active removed`);
        child.classList.remove(`nav__list__stage--active`);
        child.classList.add(`nav__list__stage--inactive`);
      }
    });
    listItems.forEach(child => {
      console.log(child);
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

  const progressNav = () => {

    const navBgs = document.querySelectorAll(`.nav__list__bg`);
    const navStages = document.querySelectorAll(`.nav__list__stage`);

    const navIndex = storyIndex - 2;

    if (navBgs[navIndex - 1] && navBgs[navIndex - 1].classList.contains(`nav__list--active`)) {
      navBgs[navIndex - 1].classList.remove(`nav__list--active`);
      navBgs[navIndex - 1].classList.add(`nav__list--inactive`);
      navStages[navIndex - 1].classList.remove(`nav__list__stage--active`);
      navStages[navIndex - 1].classList.add(`nav__list__stage--inactive`);
    }

    if (navBgs[navIndex] && navBgs[navIndex].classList.contains(`nav__list--inactive`)) {
      navBgs[navIndex].classList.remove(`nav__list--inactive`);
      navBgs[navIndex].classList.add(`nav__list--active`);
      navStages[navIndex].classList.remove(`nav__list__stage--inactive`);
      navStages[navIndex].classList.add(`nav__list__stage--active`);
    }
  };

  const setInnerText = () => {

    window.innerIndex = innerIndex;

    // console.log(`interval running`);
    // console.log(`ja`, storyIndex, innerIndex);

    if (story[storyIndex].text2 || story[storyIndex].text3 || story[storyIndex].text4 || story[storyIndex].text5) {

      if (storyIndex === 2 && innerIndex === 3) {
        eggCount.innerHTML = `${story[storyIndex].eggCount} `;
        ageCount.innerHTML = `${story[storyIndex].age} `;
      }

      if (innerIndex === 3 && story[storyIndex].text5) {
        toggleVisibility(story[storyIndex].text5);
        innerIndex ++;
        return;
      } else if (innerIndex === 2 && story[storyIndex].text4) {
        toggleVisibility(story[storyIndex].text4);
        innerIndex ++;
        return;
      } else if (innerIndex === 1 && story[storyIndex].text3) {
        toggleVisibility(story[storyIndex].text3);
        innerIndex ++;
        return;
      } else if (innerIndex === 0 && story[storyIndex].text2) {
        toggleVisibility(story[storyIndex].text2);
        innerIndex ++;
        toggleFade();
        return;
      } else if (!story[storyIndex].text3 || !story[storyIndex].text4 || !story[storyIndex].text5 || !story[storyIndex].text6) {
        clearInterval(interval);
        clickMe = true;
        toggleFade();
        return;
      }
    }
  };

  const toggleVisibility = textContent => {

    text.style.opacity = 1;

    const tween = new TWEEN.Tween(text.style)
      .to({opacity: 0}, 500)
      .start();

    tween.onComplete(() => {
      text.innerHTML = textContent;
      new TWEEN.Tween(text.style)
        .to({opacity: 1}, 500)
        .start();
    });


  };

  const toggleFade = () => {

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

      buttons.classList.remove(`fade`);
      buttons.classList.add(`visible`);
      //console.log(storyIndex);

      // if (age.classList.contains(`visible`)) {
      //   age.classList.remove(`fade`);
      //   count.classList.remove(`fade`);
      //   age.classList.add(`visible`);
      //   count.classList.add(`visible`);
      // }

    }

  };

  const countEggsDown = () => {
    let eggsLeft;
    if (storyIndex === 6) {
      eggsLeft = story[storyIndex - 2].eggCount;
    } else {
      eggsLeft = story[storyIndex - 1].eggCount;
    }

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
    let ageNow;
    if (storyIndex === 6) {
      ageNow = story[storyIndex - 2].age;
    } else {
      ageNow = story[storyIndex - 1].age;
    }

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

  const handleChildrenAge = () => {
    ageChildrenValue.innerHTML = `${ageChildrenInput.value} jaar`;
    childrenAge = ageChildrenInput.value;
    console.log(childrenAge);
  };

  const readJson = data => {
    story = data.eicel;
    text.innerHTML = story[storyIndex].text;
  };

  initStory();
