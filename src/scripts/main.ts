import { tracks } from './tracks';
import { EcoPlayer } from './player';
import { Buttons as HeaderButtons } from '../components/header/header';
import { Button as MainButton } from '../components/main/main';
import { Buttons as FooterButtons } from '../components/footer/footer';

// preloadPlaylist
(function preloadPlaylist(playlist: { link: string; cover: string }[]): void {
  for (let index = 0; index < playlist.length; index += 1) {
    new Audio().src = playlist[index].link;
    new Image().src = playlist[index].cover;
  }
})(tracks);

// ecoPlayer
let isEcoPlayerOnChangedActivator = false;
let isEcoPlayerOnPlayedActivator = false;

const ecoPlayer = new EcoPlayer({
  playlist: tracks,
});

// headerButtons
const headerButtonsContainer = document.querySelector(
  '.header__buttons'
) as HTMLElement;
if (!(headerButtonsContainer instanceof HTMLElement))
  throw new Error('Сontainer not found');

const headerButtons = new HeaderButtons({
  container: headerButtonsContainer,
  buttons: tracks,
});

headerButtons.onChanged = ({ currentIndex }): void => {
  if (isEcoPlayerOnChangedActivator) {
    isEcoPlayerOnChangedActivator = false;
    return;
  }

  ecoPlayer.currentIndex = currentIndex;

  if (!ecoPlayer.isPlayed && typeof currentIndex === 'number') ecoPlayer.play();
};

// ecoPlayer.onChanged
ecoPlayer.onChanged = ({ currentIndex }): void => {
  isEcoPlayerOnChangedActivator = true;

  headerButtons.currentIndex = currentIndex;

  document.body.style.backgroundImage =
    currentIndex === null ? '' : `url('${tracks[currentIndex].cover}')`;
};

// mainButton
const mainButtonContainer = document.querySelector(
  '.main__button'
) as HTMLElement;
if (!(mainButtonContainer instanceof HTMLElement))
  throw new Error('Сontainer not found');

const mainButton = new MainButton({
  container: mainButtonContainer,
  isPressed: false,
});

mainButton.onPressed = ({ isPressed }): void => {
  if (isEcoPlayerOnPlayedActivator) {
    isEcoPlayerOnPlayedActivator = false;
    return;
  }

  if (isPressed) {
    ecoPlayer.play();
    return;
  }

  ecoPlayer.pause();
};

// ecoPlayer.onPlayed
ecoPlayer.onPlayed = ({ isPlayed }): void => {
  isEcoPlayerOnPlayedActivator = true;

  mainButton.isPressed = isPlayed;
};

// footerButtons
const footerButtonsContainer = document.querySelector(
  '.footer__buttons'
) as HTMLElement;
if (!(footerButtonsContainer instanceof HTMLElement))
  throw new Error('Сontainer not found');

const footerButtons = new FooterButtons({
  container: footerButtonsContainer,
  buttons: [
    { title: 'Стоп', command: 'stop' },
    { title: 'Воспроизвести', command: 'play' },
    { title: 'Пауза', command: 'pause' },
  ],
});

footerButtons.onChanged = ({ currentCommand }): void => {
  if (currentCommand === null) return;

  ecoPlayer[currentCommand]();
};
