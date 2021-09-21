const $profileDiv = document.querySelector('[data-maindiv]')
const $updateForm = document.forms.updateform


if ($profileDiv) {
$profileDiv.addEventListener('click', (event) => {
  if(event.target.tagName === 'BUTTON'){
  const id = $profileDiv.dataset.maindiv;     
    window.location = `/profile/${id}/edit`;
  }
  });
}

if($updateForm){
  $updateForm.addEventListener('submit',async (e)=>{
    e.preventDefault()

    const dataFromForm = Object.fromEntries(new FormData(e.target))
    const response = await fetch (`/profile/${e.target.id}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(dataFromForm)
    })
    if(response.status === 200){
      window.location = "/profile"
    }



  })
}






