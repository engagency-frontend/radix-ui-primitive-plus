interface KeyboardEvent {
  key: string;
  target: (HTMLInputElement & EventTarget) | null;
  preventDefault: () => void;
}

// const ACCORDION_NAME = 'Accordion';
const ACCORDION_KEYS = ['Home', 'End', 'ArrowDown', 'ArrowUp'];

const getItems = (parent) =>
  Array.from(parent.getElementsByTagName('button')) as HTMLButtonElement[];

const handleKeyDown = (event: KeyboardEvent, parent: HTMLElement) => {
  if (!ACCORDION_KEYS.includes(event.key)) return;
  const target = event.target as HTMLElement;
  const parentEl = parent?.current;
  console.log(parent?.current, target.className);
  const triggerCollection = getItems(parentEl).filter((item) => !item?.disabled);
  const triggerIndex = triggerCollection.findIndex((item) => item === target);
  const triggerCount = triggerCollection.length;
  console.log(triggerCollection, triggerIndex, triggerCount);

  if (triggerIndex === -1) return;

  // Prevents page scroll while user is navigating
  event.preventDefault();

  let nextIndex = triggerIndex;
  switch (event.key) {
    case 'Home':
      nextIndex = 0;
      console.log('Home');
      break;
    case 'End':
      nextIndex = triggerCount - 1;
      break;
    case 'ArrowDown':
      nextIndex = triggerIndex + 1;
      break;
    case 'ArrowUp':
      nextIndex = triggerIndex - 1;
      if (nextIndex < 0) {
        nextIndex = triggerCount - 1;
      }
      break;
  }

  const clampedIndex = nextIndex % triggerCount;
  triggerCollection[clampedIndex].focus();
};

export default handleKeyDown;
