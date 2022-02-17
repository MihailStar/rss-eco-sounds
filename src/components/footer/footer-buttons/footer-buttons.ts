type Command = 'prev' | 'stop' | 'play' | 'pause' | 'next';

const commandToPaths: { [prop in Command]: string } = {
  prev: `
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6l-8.5 6zm6.5 2.14L12.97 12 16 9.86v4.28z" />
  `,
  stop: `
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M16 8v8H8V8h8m2-2H6v12h12V6z" />
  `,
  play: `
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
  `,
  pause: `
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  `,
  next: `
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
  `,
};

type FooterButtonsOptions = {
  container: HTMLElement;
  buttons: { title: string; command: Command }[];
};

class FooterButtons {
  public onInit: (options: { currentCommand: Command | null }) => void;
  public onChanged: (options: { currentCommand: Command | null }) => void;

  private current: Command | null;
  private readonly $buttons: HTMLButtonElement[];
  private readonly $buttonToCommand = new Map<HTMLButtonElement, Command>();

  public constructor({ container, buttons }: FooterButtonsOptions) {
    this.onInit = (): void => {};
    this.onChanged = (): void => {};

    this.current = null;

    this.$buttons = buttons.map(({ title, command }) => {
      const $button = document.createElement('button');
      $button.classList.add(
        'footer-buttons__button',
        `footer-buttons__button_${command}`
      );
      $button.type = 'button';
      $button.ariaLabel = title;
      $button.innerHTML = `
        <svg
          class="footer-buttons__image footer-buttons__image_${command}"
          xmlns="http://www.w3.org/2000/svg"
          width="${command === 'play' ? 28 : 20}"
          height="${command === 'play' ? 28 : 20}"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          ${commandToPaths[command]}
        </svg>
      `;

      this.$buttonToCommand.set($button, command);

      return $button;
    });

    const $buttonsWrapper = document.createElement('div');
    $buttonsWrapper.classList.add('footer-buttons');
    $buttonsWrapper.append(...this.$buttons);
    $buttonsWrapper.addEventListener('click', (event) =>
      this.handleButtonsWrapperClick(event)
    );

    container.append($buttonsWrapper);

    setTimeout(() => this.onInit({ currentCommand: this.current }), 0);
  }

  public get currentCommand(): typeof this.current {
    return this.current;
  }

  public set currentCommand(value: typeof this.current) {
    this.current = value;

    this.onChanged({ currentCommand: this.current });
  }

  private handleButtonsWrapperClick(this: this, event: MouseEvent): void {
    if (!(event.target instanceof HTMLButtonElement)) return;

    event.preventDefault();

    this.currentCommand = this.$buttonToCommand.get(event.target) ?? null;
  }
}

export { Command, FooterButtons };
