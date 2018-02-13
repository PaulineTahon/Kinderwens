//import './js/script';

  let story, storyIndex = 0, innerIndex = 0;

  let STATE = `home`;

  const canvas = document.getElementById(`c`);
  const text = document.querySelector(`.eicel_stage_text`);
  const age = document.querySelector(`.age`);
  const count = document.querySelector(`.count`);
  const ageCount = document.querySelector(`.stage__stats__value`);
  const eggCount = document.querySelector(`.stage__stats__count`);
  const eicelButton = document.querySelector(`.info__eicel__button__text`);

  const userAge = document.querySelector(`.user_age`);
  const ageInput = document.querySelector(`.user_age_input`);
  const ageValue = document.querySelector(`.user_age_input_value`);
  const userChildrenAge = document.querySelector(`.user_children_age`);
  const ageChildrenInput = document.querySelector(`.user_children_age_input`);
  const ageChildrenValue = document.querySelector(`.user_children_age_input_value`);

  const buttons = document.querySelector(`.buttons`);

  const listItems = document.querySelectorAll(`.nav__list__item`);
  const stages = document.querySelectorAll(`.nav__list__stage`);
  const ambiance = document.querySelector(`.ambiance`);

  let currentAge;
  let childrenAge;
  let feedbackAge = false;
  //let storyAudio;

  const ageCategories = [
    `Goed, op deze leeftijd zijn we het vruchtbaarst. Je hebt nog genoeg tijd om na deze leeftijd kinderen te maken.`,
    `Op deze leeftijd zijn we nog van goede kwaliteit, goed! Let wel op indien je daarna nog kinderen wenst.`,
    `Let op, op deze leeftijd zijn daalt ons aantal en onze kwaliteit snel!`
  ];

  let interval;

  let clickMe = true;
  //let timeNeeded = 5000;

  const initStory = () => {
    loadJson();
    //createAudio();
    buttons.addEventListener(`click`, handleNext);
    text.addEventListener(`change`, toggleVisibility);
    if (STATE === `home`) {
      eicelButton.addEventListener(`click`, startEicelStory);
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

  // const createAudio = () => {
  //   storyAudio = new Audio(`./assets/audio/dummyAudio.mp3`);
  //   storyAudio.volume = .05;
  //   window.storyAudio = storyAudio;
  //   // const one = new Audio(`./assets/audio/one.mp3`);
  //   // const two = new Audio(`./assets/audio/two.mp3`);
  //   // const three = new Audio(`./assets/audio/three.mp3`);
  //   // const four = new Audio(`./assets/audio/four.mp3`);
  //   // const five = new Audio(`./assets/audio/five.mp3`);
  //   // const six = new Audio(`./assets/audio/six.mp3`);
  //   // const seven = new Audio(`./assets/audio/seven.mp3`);
  //   // const eight = new Audio(`./assets/audio/eight.mp3`);
  //   // const nine = new Audio(`./assets/audio/nine.mp3`);
  //   // const ten = new Audio(`./assets/audio/ten.mp3`);
  //   // const eleven = new Audio(`./assets/audio/eleven.mp3`);
  //   // const twelve = new Audio(`./assets/audio/twelve.mp3`);
  //   // const thirteen = new Audio(`./assets/audio/thirteen.mp3`);
  //   // const fourteen = new Audio(`./assets/audio/fourteen.mp3`);
  //   // const fifteen = new Audio(`./assets/audio/fifteen.mp3`);
  //   // const sixteen = new Audio(`./assets/audio/sixteen.mp3`);
  //   // const seventeen = new Audio(`./assets/audio/seventeen.mp3`);
  //   // const eighteen = new Audio(`./assets/audio/eighteen.mp3`);
  //   // const nineteen = new Audio(`./assets/audio/nineteen.mp3`);
  //   // const twenty = new Audio(`./assets/audio/twenty.mp3`);
  //   // const twentyOne = new Audio(`./assets/audio/twentyOne.mp3`);
  //   // const twentyTwo = new Audio(`./assets/audio/twentyTwo.mp3`);
  //   // const twentyThree = new Audio(`./assets/audio/twentyThree.mp3`);
  //   // const twentyFour = new Audio(`./assets/audio/twentyFour.mp3`);
  //   // const twentyFive = new Audio(`./assets/audio/twentyFive.mp3`);
  //   // const twentySix = new Audio(`./assets/audio/twentySix.mp3`);
  //   // const twentySeven = new Audio(`./assets/audio/twentySeven.mp3`);
  //   // const twentyEight = new Audio(`./assets/audio/twentyEight.mp3`);
  //   // const twentyNine = new Audio(`./assets/audio/twentyNine.mp3`);
  //   // const thirty = new Audio(`./assets/audio/thirty.mp3`);
  //   // const thirtyOne = new Audio(`./assets/audio/thirtyOne.mp3`);
  //   // const thirtyTwo = new Audio(`./assets/audio/thirtyTwo.mp3`);
  //   // const thirtyThree = new Audio(`./assets/audio/thirtyThree.mp3`);
  //   // const thirtyFour = new Audio(`./assets/audio/thirtyFour.mp3`);
  //   //
  //   // storyAudio.push(one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, fourteen, fifteen, sixteen,
  //   // seventeen, eighteen, nineteen, twenty, twentyOne, twentyTwo, twentyThree, twentyFour, twentyFive, twentySix, twentySeven, twentyEight, twentyNine, thirty, thirtyOne, thirtyTwo, thirtyThree,
  //   // thirtyFour, thirtyFive);
  // };

  const startEicelStory = () => {
    canvas.classList.add(`canvasAnimation`);
    console.log(`CLICK REGISTERED`);
    if (STATE === `home`) {
      const home = document.querySelector(`.home`);
      const eicel = document.querySelector(`.eicelStory`);
      home.classList.add(`fade`);
      setTimeout(() => {eicel.classList.add(`visible`);home.classList.add(`dontdisplay`);}, 2000);
      ambiance.volume = .05;
      ambiance.play();
      // setTimeout(() => {storyAudio.play();}, 2000);
      // setTimeout(() => {storyAudio.pause();}, 7000);
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

      if (storyIndex === story.length - 1) {
        //EINDE STORY --> START TESTIMONY SCRIPT
        return;
      }

      console.log(childrenAge);

      if (!childrenAge || feedbackAge) {
        storyIndex ++;
        progressNav();
        toggleVisibility(story[storyIndex].text);
      } else if (storyIndex === 5 && childrenAge && !feedbackAge) {
        console.log(childrenAge - 5);
        console.log(childrenAge, feedbackAge);
        feedbackAge = true;
        if (childrenAge < 30) {
          console.log(ageCategories[0]);
          toggleVisibility(ageCategories[0]);
        } else if (childrenAge < 35) {
          toggleVisibility(ageCategories[1]);
        } else if (childrenAge >= 35) {
          toggleVisibility(ageCategories[2]);
        }
        return;
      }

      //COUNTDOWN
      if (storyIndex >= 3 && storyIndex !== 5) {
        countEggsDown();
        countAgeDown();
      }

      //LOOP INNERTEXT
      if (story[storyIndex].text2) {
        interval = setInterval(setInnerText, 5000);
      }

      //DISABLE BUTTON
      if (storyIndex !== story.length - 1) {
        if (storyIndex !== 1 && storyIndex !== 5) {
          clickMe = false;
          toggleFade();
        }
      }

      if (storyIndex === 4) {
        userAge.style.display = `none`;
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
        clickMe = false;
        toggleFade();
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
        clickMe = false;
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
    }

    window.storyIndex = storyIndex;

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

    //controlAudio();

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

  // const controlAudio = () => {
  //   setTimeout(() => {storyAudio.play();console.log(`play`);}, 1000);
  //   setTimeout(() => {storyAudio.pause();console.log(`pause`);}, timeNeeded);
  // };

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
    clickMe = true;
    toggleFade();
    ageValue.classList.add(`visibleText`);
    ageValue.innerHTML = `${ageInput.value} jaar`;
    currentAge = ageInput.value;
    console.log(currentAge);
  };

  const handleChildrenAge = () => {
    clickMe = true;
    toggleFade();
    ageChildrenValue.classList.add(`visibleText`);
    ageChildrenValue.innerHTML = `${ageChildrenInput.value} jaar`;
    childrenAge = ageChildrenInput.value;
    console.log(childrenAge);
  };

  const readJson = data => {
    story = data.eicel;
    text.innerHTML = story[storyIndex].text;
  };

  initStory();
