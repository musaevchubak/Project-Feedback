const $divallFeedBacks = document.querySelector('.profileContent');
const $editFeedBackForm = document.forms.editFeedBackForm;

if ($divallFeedBacks) {
  $divallFeedBacks.addEventListener('click', async (event) => {
    if (event.target.dataset.delete) {
      const response = await fetch(`/review/${event.target.dataset.delete}/edit`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        const $divSelectedFeedback = event.target.closest('.card');
        $divSelectedFeedback.remove();
      }
    } else if (event.target.dataset.edit) {
      window.location = `/review/${event.target.dataset.edit}/edit`;
    }
  });
}

if ($editFeedBackForm) {
  $editFeedBackForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(event.target);
    const dataFromForm = Object.fromEntries(new FormData(event.target));

    const response = await fetch(`/review/${event.target.id}/edit`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataFromForm),
    });

    if (response.status === 200) {
      window.location = '/user/profile';
    }
  });
}
