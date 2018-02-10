const blob1 = document.querySelector(`.buttons__text`);
const circle1 = document.getElementById(`circle1`);
const circle2 = document.getElementById(`circle2`);
const circle3 = document.getElementById(`circle3`);
const circle4 = document.getElementById(`circle4`);
const circle5 = document.getElementById(`circle5`);
const circle6 = document.getElementById(`circle6`);
const circle7 = document.getElementById(`circle7`);
const circle8 = document.getElementById(`circle8`);
const circle9 = document.getElementById(`circle9`);
const circle10 = document.getElementById(`circle10`);
const circle11 = document.getElementById(`circle11`);
const circle12 = document.getElementById(`circle12`);
console.log(blob1);
  // const transform = `rotate(0, 145, 150)`;
  //var transform = "translate("+x+","+y+") scale("+scale+")"; //same
blob1.addEventListener(`mouseleave`, () => {
  circle1.setAttribute(`from`, ``);
  circle1.setAttribute(`to`, ``);

  circle2.setAttribute(`from`, ``);
  circle2.setAttribute(`to`, ``);

  circle3.setAttribute(`from`, ``);
  circle3.setAttribute(`to`, ``);

  circle4.setAttribute(`from`, ``);
  circle4.setAttribute(`to`, ``);

  circle5.setAttribute(`from`, `0 0 0`);
  circle5.setAttribute(`to`, `0 0 0`);

  circle6.setAttribute(`from`, ``);
  circle6.setAttribute(`to`, ``);

  circle7.setAttribute(`from`, ``);
  circle7.setAttribute(`to`, ``);

  circle8.setAttribute(`from`, ``);
  circle8.setAttribute(`to`, ``);

  circle9.setAttribute(`from`, `0 0 0`);
  circle9.setAttribute(`to`, `0 0 0`);

  circle10.setAttribute(`from`, ``);
  circle10.setAttribute(`to`, ``);

  circle11.setAttribute(`from`, ``);
  circle11.setAttribute(`to`, ``);

  circle12.setAttribute(`from`, ``);
  circle12.setAttribute(`to`, ``);
});

blob1.addEventListener(`mouseenter`, () => {
  circle1.setAttribute(`from`, `0 145 150`);
  circle1.setAttribute(`to`, `360 145 150`);

  circle2.setAttribute(`from`, `360 155 150`);
  circle2.setAttribute(`to`, `0 155 150`);

  circle3.setAttribute(`from`, `0 150 145`);
  circle3.setAttribute(`to`, `360 150 145`);

  circle4.setAttribute(`from`, `360 150 155`);
  circle4.setAttribute(`to`, `0 150 155`);

  circle5.setAttribute(`from`, `0 145 150`);
  circle5.setAttribute(`to`, `360 145 150`);

  circle6.setAttribute(`from`, `360 155 150`);
  circle6.setAttribute(`to`, `0 155 150`);

  circle7.setAttribute(`from`, `0 150 145`);
  circle7.setAttribute(`to`, `360 150 145`);

  circle8.setAttribute(`from`, `360 150 155`);
  circle8.setAttribute(`to`, `0 150 155`);

  circle9.setAttribute(`from`, `0 145 150`);
  circle9.setAttribute(`to`, `360 145 150`);

  circle10.setAttribute(`from`, `360 155 150`);
  circle10.setAttribute(`to`, `0 155 150`);

  circle11.setAttribute(`from`, `0 150 145`);
  circle11.setAttribute(`to`, `360 150 145`);

  circle12.setAttribute(`from`, `360 150 155`);
  circle12.setAttribute(`to`, `0 150 155`);
});
