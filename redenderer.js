let STATE = `home`;
require(`js/script.js`);

init = () => {
  if(STATE === `home`) {
    initEicel();
  }
}

init();
