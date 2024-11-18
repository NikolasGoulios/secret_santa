let names = [];
const nameInput = document.getElementById('name-input');
const startBtn = document.getElementById('start-btn');
const assignBtn = document.getElementById('assign-btn');
const assignedName = document.getElementById('assigned-name');

startBtn.addEventListener('click', () => {
  const input = nameInput.value.trim();
  if (input) {
    names = input.split(',').map(name => name.trim());
    alert('Names added! Click "Assign Name" to get started.');
    assignBtn.style.display = 'inline-block';
  } else {
    alert('Please enter at least one name!');
  }
});

assignBtn.addEventListener('click', () => {
  if (names.length === 0) {
    alert('All names have been assigned!');
    assignBtn.style.display = 'none';
    return;
  }
  const randomIndex = Math.floor(Math.random() * names.length);
  const chosenName = names.splice(randomIndex, 1)[0];
  assignedName.textContent = `You got: ${chosenName}`;
  assignedName.style.display = 'block';
});