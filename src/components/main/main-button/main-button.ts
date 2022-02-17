type MainButtonOptions = {
  container: HTMLElement;
  isPressed?: boolean;
};

class MainButton {
  public onInit: (options: { isPressed: boolean }) => void;
  public onPressed: (options: { isPressed: boolean }) => void;

  private pressed: boolean;
  private readonly $button: HTMLButtonElement;

  public constructor({ container, isPressed = false }: MainButtonOptions) {
    this.onInit = (): void => {};
    this.onPressed = (): void => {};

    this.pressed = isPressed;

    this.$button = document.createElement('button');
    this.$button.classList.add('main-button');
    if (this.pressed) this.$button.classList.add('main-button_pressed');
    this.$button.type = 'button';
    this.$button.ariaPressed = this.pressed ? 'true' : 'false';
    this.$button.innerHTML = `
      <svg
        class="main-button__image main-button__image_play"
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
      </svg>
      <svg
        class="main-button__image main-button__image_pause"
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
      </svg>
    `;
    this.$button.addEventListener('click', (event) =>
      this.handleButtonClick(event)
    );

    container.append(this.$button);

    setTimeout(() => this.onInit({ isPressed: this.pressed }), 0);
  }

  public get isPressed(): typeof this.pressed {
    return this.pressed;
  }

  public set isPressed(value: typeof this.pressed) {
    this.pressed = value;

    this.$button.classList[this.pressed ? 'add' : 'remove'](
      'main-button_pressed'
    );
    this.$button.ariaPressed = this.pressed ? 'true' : 'false';

    this.onPressed({ isPressed: this.pressed });
  }

  private handleButtonClick(this: this, event: MouseEvent): void {
    event.preventDefault();

    this.isPressed = !this.isPressed;
  }
}

export { MainButton };
