let story;
let storyIndex = 0;

const text = document.querySelector(`.eicel_stage_text`);
const age = document.querySelector(`.eicel_stage_stats_age`);
const eggCount = document.querySelector(`.eicel_stage_stats_count`);

const userAge = document.querySelector(`.user_age`);
const ageInput = document.querySelector(`.user_age_input`);
const ageValue = document.querySelector(`.user_age_input_value`);

const nextButton = document.querySelector(`.buttons_next`);
const previousButton = document.querySelector(`.buttons_previous`);

const indexStory = () => {
  loadJson();
  previousButton.style.display = `none`;
  userAge.style.display = `none`;
  nextButton.addEventListener(`click`, handleNext);
  previousButton.addEventListener(`click`, handlePrevious);

};

const loadJson = () => {
  const url = `./assets/json/eicel.json`;

  fetch(url)
		.then(result => result.json())
		.then(data => readJson(data));
};

let innerIndex = 0;

const handleNext = e => {
  e.preventDefault();

  if (nextButton.innerHTML !== `volgende`) {
    nextButton.innerHTML = `volgende`;
  }

  if (storyIndex >= 1) {
    previousButton.innerHTML = `vorige`;
    previousButton.style.display = `block`;
  } else {
    previousButton.style.display = `none`;
  }

  if (storyIndex === story.length - 1) {
    //EINDE STORY
    return;
  }
  if (innerIndex === 0 && story[storyIndex].text2) {
    text.innerHTML = story[storyIndex].text2;
    innerIndex ++;
  } else if (innerIndex === 1 && story[storyIndex].text3) {
    text.innerHTML = story[storyIndex].text3;
    innerIndex ++;
  } else if (innerIndex === 2 && story[storyIndex].text4) {
    text.innerHTML = story[storyIndex].text4;
    innerIndex ++;
  } else {
    innerIndex = 0;
    storyIndex ++;
    text.innerHTML = story[storyIndex].text;
    if (story[storyIndex].age) {
      age.innerHTML = `leeftijd: ${story[storyIndex].age}`;
      eggCount.innerHTML = `aantal eicellen: ${story[storyIndex].eggCount}`;
    }
  }

  if (storyIndex === 1) {
    userAge.style.display = `block`;
    ageValue.innerHTML = ageInput.value;
    ageInput.addEventListener(`change`, handleAge);
  } else {
    userAge.style.display = `none`;
  }

  console.log(`ja`, storyIndex, innerIndex);

};

const handlePrevious = e => {
  e.preventDefault();

  if (innerIndex === 0 && story[storyIndex].text2) {
    text.innerHTML = story[storyIndex].text;
    innerIndex --;
  } else if (innerIndex === 1 && story[storyIndex].text3) {
    text.innerHTML = story[storyIndex].text2;
    innerIndex --;
  } else if (innerIndex === 2 && story[storyIndex].text4) {
    text.innerHTML = story[storyIndex].text3;
    innerIndex --;
  } else {
    innerIndex = 0;
    storyIndex --;
    text.innerHTML = story[storyIndex].text;
    if (story[storyIndex].age) {
      age.innerHTML = `leeftijd: ${story[storyIndex].age}`;
      eggCount.innerHTML = `aantal eicellen: ${story[storyIndex].eggCount}`;
    }
  }
};

const handleAge = () => {
  ageValue.innerHTML = ageInput.value;
}

const readJson = data => {
  story = data.eicel;
  console.log(story);
  text.innerHTML = story[storyIndex].text;
};

indexStory();
