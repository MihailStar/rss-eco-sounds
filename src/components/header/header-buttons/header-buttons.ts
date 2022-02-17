type HeaderButtonsOptions = {
  container: HTMLElement;
  buttons: { title: string }[];
  currentIndex?: number | null;
};

class HeaderButtons {
  public onInit: (options: { currentIndex: number | null }) => void;
  public onChanged: (options: { currentIndex: number | null }) => void;

  private current: number | null;
  private readonly $buttons: HTMLButtonElement[];
  private readonly $buttonToIndex = new Map<HTMLButtonElement, number>();

  public constructor({
    container,
    buttons,
    currentIndex = null,
  }: HeaderButtonsOptions) {
    this.onInit = (): void => {};
    this.onChanged = (): void => {};

    this.current = currentIndex;

    this.$buttons = buttons.map(({ title }, index) => {
      const $button = document.createElement('button');
      $button.classList.add('header-buttons__button');
      if (index === this.current)
        $button.classList.add('header-buttons__button_current');
      $button.type = 'button';
      $button.textContent = title;

      this.$buttonToIndex.set($button, index);

      return $button;
    });

    const $buttonsWrapper = document.createElement('div');
    $buttonsWrapper.classList.add('header-buttons');
    $buttonsWrapper.append(...this.$buttons);
    $buttonsWrapper.addEventListener('click', (event) =>
      this.handleButtonsWrapperClick(event)
    );

    container.append($buttonsWrapper);

    setTimeout(() => this.onInit({ currentIndex: this.current }), 0);
  }

  public get currentIndex(): typeof this.current {
    return this.current;
  }

  public set currentIndex(value: typeof this.current) {
    this.current = value;

    this.$buttons.forEach(($button, index) => {
      if (index === this.current) {
        $button.classList.add('header-buttons__button_current');
        return;
      }

      $button.classList.remove('header-buttons__button_current');
    });

    this.onChanged({ currentIndex: this.current });
  }

  private handleButtonsWrapperClick(this: this, event: MouseEvent): void {
    if (!(event.target instanceof HTMLButtonElement)) return;

    event.preventDefault();

    const newCurrentIndex = this.$buttonToIndex.get(event.target);
    this.currentIndex =
      this.currentIndex === newCurrentIndex ? null : newCurrentIndex ?? null;
  }
}

export { HeaderButtons };
