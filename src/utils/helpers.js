export default function setButtonText(
  button,
  isLoading,
  loadingText = "Saving...",
  originalText = "Save"
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = originalText;
  }
}
