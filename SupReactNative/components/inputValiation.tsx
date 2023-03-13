
export function validateInputLength(inputValue: string, MAX_LENGTH: number) {
  if (inputValue.length > MAX_LENGTH) {
    return `Input must be less than ${MAX_LENGTH} characters`;
  }
  return '';
}



export function validateInputCharacters(inputValue: string) {
    const DISALLOWED_CHARS = ['!', '#', '$', "'", '"','>', '<', ';', '-', '+', '=', '$', '€', '%', '&', '(', ')', '[', ']', '{', '}', '/', '\\' ]; 
    if (DISALLOWED_CHARS.some(char => inputValue.includes(char))) {
    return `Input must not contain the following characters: ${DISALLOWED_CHARS.join(', ')}`;
  }
  return '';
}