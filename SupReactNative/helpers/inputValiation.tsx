
export function validateInputLength(inputValue: string, MAX_LENGTH: number) {
  if (inputValue.length > MAX_LENGTH) {
    return `Teksten må være mindre enn ${MAX_LENGTH} tegn`;
  }
  return '';
}



export function validateInputCharacters(inputValue: string) {
    const DISALLOWED_CHARS = 
    ['!', '#', '$', "'", '"','>', '<', ';', '-', '+', '=', '$', '€', '%', '&', '(', ')', '[', ']', '{', '}', '/', '\\' ]; 
    if (DISALLOWED_CHARS.some(char => inputValue.includes(char))) {
    return `Teksten kan ikke inneholde spesialtegn`;
  }
  return '';
}