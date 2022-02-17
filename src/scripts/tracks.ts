type Track = {
  title: string;
  link: string;
  cover: string;
};

const tracks: Track[] = [
  {
    title: 'Соловей',
    link: './assets/solovey.mp3',
    cover: './images/solovey.jpg',
  },
  {
    title: 'Дрозд',
    link: './assets/drozd.mp3',
    cover: './images/drozd.jpg',
  },
  {
    title: 'Малиновка',
    link: './assets/zarynka.mp3',
    cover: './images/zarynka.jpg',
  },
  {
    title: 'Жаворонок',
    link: './assets/javoronok.mp3',
    cover: './images/javoronok.jpg',
  },
  {
    title: 'Славка',
    link: './assets/slavka.mp3',
    cover: './images/slavka.jpg',
  },
];

export { tracks };
