export const handleTextInput = (event: React.FormEvent<HTMLInputElement>) => {
  const input = event.currentTarget;
  input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
};
