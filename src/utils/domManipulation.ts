export const getDivClassesById = (id: string): DOMTokenList | null => {
  const element = document.getElementById(id) as HTMLDivElement;

  if (!element) {
    return null;
  }
  return element.classList;
};
