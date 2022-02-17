type Player = {
  prev(): void;
  stop(): void;
  play(): void;
  pause(): void;
  next(): void;
};

type EcoPlayerOptions = {
  playlist: { link: string }[];
  currentIndex?: number | null;
};

class EcoPlayer implements Player {
  public onInit: (options: { currentIndex: number | null }) => void;
  public onChanged: (options: { currentIndex: number | null }) => void;
  public onPlayed: (options: { isPlayed: boolean }) => void;

  private readonly playlist: { link: string }[];
  private current: number | null;
  private readonly $audio: HTMLAudioElement;

  public constructor({ playlist, currentIndex = null }: EcoPlayerOptions) {
    this.onInit = (): void => {};
    this.onChanged = (): void => {};
    this.onPlayed = (): void => {};

    this.playlist = playlist;
    this.current = currentIndex;
    this.$audio = new Audio();
    this.$audio.loop = true;
    if (typeof this.current === 'number')
      this.$audio.src = this.playlist[this.current].link;
    this.$audio.addEventListener('play', () =>
      this.onPlayed({ isPlayed: true })
    );
    this.$audio.addEventListener('pause', () =>
      this.onPlayed({ isPlayed: false })
    );

    setTimeout(() => this.onInit({ currentIndex: this.current }), 0);
  }

  public get currentIndex(): typeof this.current {
    return this.current;
  }

  public set currentIndex(value: typeof this.current) {
    this.current = value;

    if (this.isPlayed) {
      if (this.current === null) {
        this.stop();
        return;
      }

      this.play();
    }

    this.onChanged({ currentIndex: this.current });
  }

  public get isPlayed(): typeof this.$audio.paused {
    return !this.$audio.paused;
  }

  public prev(): void {
    const lastIndex = this.playlist.length - 1;

    if (this.currentIndex === null) {
      this.currentIndex = lastIndex;
      return;
    }

    const newIndex = this.currentIndex - 1;
    this.currentIndex = newIndex < 0 ? lastIndex : newIndex;
  }

  public stop(): void {
    this.$audio.pause();
    this.$audio.currentTime = 0;
    this.currentIndex = null;
  }

  public play(): void {
    if (this.currentIndex === null) {
      this.currentIndex = 0;
    }

    /** абсолютный путь из относительного и базового */
    const newSrc = new URL(
      this.playlist[this.currentIndex].link,
      window.location.href
    ).toString();

    if (this.$audio.src === newSrc) {
      if (this.isPlayed) {
        this.$audio.currentTime = 0;
      }

      this.$audio.play().catch((error) => console.error(error));

      return;
    }

    this.$audio.src = this.playlist[this.currentIndex].link;
    this.$audio.play().catch((error) => console.error(error));
  }

  public pause(): void {
    this.$audio.pause();
  }

  public next(): void {
    const lastIndex = this.playlist.length - 1;

    if (this.currentIndex === null) {
      this.currentIndex = 0;
      return;
    }

    const newIndex = this.currentIndex + 1;
    this.currentIndex = newIndex > lastIndex ? 0 : newIndex;
  }
}

export { EcoPlayer };
