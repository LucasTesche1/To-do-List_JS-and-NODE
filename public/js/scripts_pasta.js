function redirecionaIndex1() {
  return (window.location.href = "/views/index.html");
}

function redirecionaIndex2() {
  return (window.location.href = "/views/index2.html");
}

function redirecionaIndex3() {
  return (window.location.href = "/views/index3.html");
}

function editarNomePasta(button) {
  const container = button.parentElement;
  const inputContainer = container.querySelector('.edit-input-container');
  inputContainer.style.display = 'flex';
}

function salvarNomePasta(button) {
  const container = button.parentElement.parentElement;
  const input = container.querySelector('.edit-input');
  const newName = input.value.trim();

  if (newName) {
    const folderNameSpan = container.querySelector('.folder-name');
    folderNameSpan.textContent = newName;
  }

  button.parentElement.style.display = 'none';
}