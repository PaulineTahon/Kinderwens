// import Velocity from 'velocity-animate';
// import 'velocity-animate/velocity.ui';

const blob1 = document.querySelector(`.buttons__text`);
const blobHome = document.querySelector(`.info__eicel__button__text`);
const blobHome2 = document.querySelector(`.info2__zaadcel__button__text`);
const circle1 = document.querySelectorAll(`[id='circle1']`);
const circle2 = document.querySelectorAll(`[id='circle2']`);
const circle3 = document.querySelectorAll(`[id='circle3']`);
const circle4 = document.querySelectorAll(`[id='circle4']`);
const circle5 = document.querySelectorAll(`[id='circle5']`);
const circle6 = document.querySelectorAll(`[id='circle6']`);
const circle7 = document.querySelectorAll(`[id='circle7']`);
const circle8 = document.querySelectorAll(`[id='circle8']`);
const circle9 = document.querySelectorAll(`[id='circle9']`);
const circle10 = document.querySelectorAll(`[id='circle10']`);
const circle11 = document.querySelectorAll(`[id='circle11']`);
const circle12 = document.querySelectorAll(`[id='circle12']`);

// const info = document.querySelector(`.info`);
// console.log(info);
// Velocity(info, `callout.bounce`);

console.log(blobHome);
  // const transform = `rotate(0, 145, 150)`;
  //var transform = "translate("+x+","+y+") scale("+scale+")"; //same
blob1.addEventListener(`mouseleave`, () => {
  circle1[2].setAttribute(`from`, ``);
  circle1[2].setAttribute(`to`, ``);

  circle2[2].setAttribute(`from`, ``);
  circle2[2].setAttribute(`to`, ``);

  circle3[2].setAttribute(`from`, ``);
  circle3[2].setAttribute(`to`, ``);

  circle4[2].setAttribute(`from`, ``);
  circle4[2].setAttribute(`to`, ``);

  circle5[2].setAttribute(`from`, `0 0 0`);
  circle5[2].setAttribute(`to`, `0 0 0`);

  circle6[2].setAttribute(`from`, ``);
  circle6[2].setAttribute(`to`, ``);

  circle7[2].setAttribute(`from`, ``);
  circle7[2].setAttribute(`to`, ``);

  circle8[2].setAttribute(`from`, ``);
  circle8[2].setAttribute(`to`, ``);

  circle9[2].setAttribute(`from`, `0 0 0`);
  circle9[2].setAttribute(`to`, `0 0 0`);

  circle10[2].setAttribute(`from`, ``);
  circle10[2].setAttribute(`to`, ``);

  circle11[2].setAttribute(`from`, ``);
  circle11[2].setAttribute(`to`, ``);

  circle12[2].setAttribute(`from`, ``);
  circle12[2].setAttribute(`to`, ``);
});

blob1.addEventListener(`mouseenter`, () => {
  circle1[2].setAttribute(`from`, `0 145 150`);
  circle1[2].setAttribute(`to`, `360 145 150`);

  circle2[2].setAttribute(`from`, `360 155 150`);
  circle2[2].setAttribute(`to`, `0 155 150`);

  circle3[2].setAttribute(`from`, `0 150 145`);
  circle3[2].setAttribute(`to`, `360 150 145`);

  circle4[2].setAttribute(`from`, `360 150 155`);
  circle4[2].setAttribute(`to`, `0 150 155`);

  circle5[2].setAttribute(`from`, `0 145 150`);
  circle5[2].setAttribute(`to`, `360 145 150`);

  circle6[2].setAttribute(`from`, `360 155 150`);
  circle6[2].setAttribute(`to`, `0 155 150`);

  circle7[2].setAttribute(`from`, `0 150 145`);
  circle7[2].setAttribute(`to`, `360 150 145`);

  circle8[2].setAttribute(`from`, `360 150 155`);
  circle8[2].setAttribute(`to`, `0 150 155`);

  circle9[2].setAttribute(`from`, `0 145 150`);
  circle9[2].setAttribute(`to`, `360 145 150`);

  circle10[2].setAttribute(`from`, `360 155 150`);
  circle10[2].setAttribute(`to`, `0 155 150`);

  circle11[2].setAttribute(`from`, `0 150 145`);
  circle11[2].setAttribute(`to`, `360 150 145`);

  circle12[2].setAttribute(`from`, `360 150 155`);
  circle12[2].setAttribute(`to`, `0 150 155`);
});

blobHome2.addEventListener(`mouseleave`, () => {
  circle1[1].setAttribute(`from`, ``);
  circle1[1].setAttribute(`to`, ``);

  circle2[1].setAttribute(`from`, ``);
  circle2[1].setAttribute(`to`, ``);

  circle3[1].setAttribute(`from`, ``);
  circle3[1].setAttribute(`to`, ``);

  circle4[1].setAttribute(`from`, ``);
  circle4[1].setAttribute(`to`, ``);

  circle5[1].setAttribute(`from`, `0 0 0`);
  circle5[1].setAttribute(`to`, `0 0 0`);

  circle6[1].setAttribute(`from`, ``);
  circle6[1].setAttribute(`to`, ``);

  circle7[1].setAttribute(`from`, ``);
  circle7[1].setAttribute(`to`, ``);

  circle8[1].setAttribute(`from`, ``);
  circle8[1].setAttribute(`to`, ``);

  circle9[1].setAttribute(`from`, `0 0 0`);
  circle9[1].setAttribute(`to`, `0 0 0`);

  circle10[1].setAttribute(`from`, ``);
  circle10[1].setAttribute(`to`, ``);

  circle11[1].setAttribute(`from`, ``);
  circle11[1].setAttribute(`to`, ``);

  circle12[1].setAttribute(`from`, ``);
  circle12[1].setAttribute(`to`, ``);
});

blobHome2.addEventListener(`mouseenter`, () => {
  console.log(`blob2`);
  circle1[1].setAttribute(`from`, `0 145 150`);
  circle1[1].setAttribute(`to`, `360 145 150`);

  circle2[1].setAttribute(`from`, `360 155 150`);
  circle2[1].setAttribute(`to`, `0 155 150`);

  circle3[1].setAttribute(`from`, `0 150 145`);
  circle3[1].setAttribute(`to`, `360 150 145`);

  circle4[1].setAttribute(`from`, `360 150 155`);
  circle4[1].setAttribute(`to`, `0 150 155`);

  circle5[1].setAttribute(`from`, `0 145 150`);
  circle5[1].setAttribute(`to`, `360 145 150`);

  circle6[1].setAttribute(`from`, `360 155 150`);
  circle6[1].setAttribute(`to`, `0 155 150`);

  circle7[1].setAttribute(`from`, `0 150 145`);
  circle7[1].setAttribute(`to`, `360 150 145`);

  circle8[1].setAttribute(`from`, `360 150 155`);
  circle8[1].setAttribute(`to`, `0 150 155`);

  circle9[1].setAttribute(`from`, `0 145 150`);
  circle9[1].setAttribute(`to`, `360 145 150`);

  circle10[1].setAttribute(`from`, `360 155 150`);
  circle10[1].setAttribute(`to`, `0 155 150`);

  circle11[1].setAttribute(`from`, `0 150 145`);
  circle11[1].setAttribute(`to`, `360 150 145`);

  circle12[1].setAttribute(`from`, `360 150 155`);
  circle12[1].setAttribute(`to`, `0 150 155`);
});

blobHome.addEventListener(`mouseleave`, () => {
  circle1[0].setAttribute(`from`, ``);
  circle1[0].setAttribute(`to`, ``);

  circle2[0].setAttribute(`from`, ``);
  circle2[0].setAttribute(`to`, ``);

  circle3[0].setAttribute(`from`, ``);
  circle3[0].setAttribute(`to`, ``);

  circle4[0].setAttribute(`from`, ``);
  circle4[0].setAttribute(`to`, ``);

  circle5[0].setAttribute(`from`, `0 0 0`);
  circle5[0].setAttribute(`to`, `0 0 0`);

  circle6[0].setAttribute(`from`, ``);
  circle6[0].setAttribute(`to`, ``);

  circle7[0].setAttribute(`from`, ``);
  circle7[0].setAttribute(`to`, ``);

  circle8[0].setAttribute(`from`, ``);
  circle8[0].setAttribute(`to`, ``);

  circle9[0].setAttribute(`from`, `0 0 0`);
  circle9[0].setAttribute(`to`, `0 0 0`);

  circle10[0].setAttribute(`from`, ``);
  circle10[0].setAttribute(`to`, ``);

  circle11[0].setAttribute(`from`, ``);
  circle11[0].setAttribute(`to`, ``);

  circle12[0].setAttribute(`from`, ``);
  circle12[0].setAttribute(`to`, ``);
});

blobHome.addEventListener(`mouseenter`, () => {
  console.log(`blob1`);
  circle1[0].setAttribute(`from`, `0 145 150`);
  circle1[0].setAttribute(`to`, `360 145 150`);

  circle2[0].setAttribute(`from`, `360 155 150`);
  circle2[0].setAttribute(`to`, `0 155 150`);

  circle3[0].setAttribute(`from`, `0 150 145`);
  circle3[0].setAttribute(`to`, `360 150 145`);

  circle4[0].setAttribute(`from`, `360 150 155`);
  circle4[0].setAttribute(`to`, `0 150 155`);

  circle5[0].setAttribute(`from`, `0 145 150`);
  circle5[0].setAttribute(`to`, `360 145 150`);

  circle6[0].setAttribute(`from`, `360 155 150`);
  circle6[0].setAttribute(`to`, `0 155 150`);

  circle7[0].setAttribute(`from`, `0 150 145`);
  circle7[0].setAttribute(`to`, `360 150 145`);

  circle8[0].setAttribute(`from`, `360 150 155`);
  circle8[0].setAttribute(`to`, `0 150 155`);

  circle9[0].setAttribute(`from`, `0 145 150`);
  circle9[0].setAttribute(`to`, `360 145 150`);

  circle10[0].setAttribute(`from`, `360 155 150`);
  circle10[0].setAttribute(`to`, `0 155 150`);

  circle11[0].setAttribute(`from`, `0 150 145`);
  circle11[0].setAttribute(`to`, `360 150 145`);

  circle12[0].setAttribute(`from`, `360 150 155`);
  circle12[0].setAttribute(`to`, `0 150 155`);
});
