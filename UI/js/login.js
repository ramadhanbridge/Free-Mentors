let loginform = document.querySelector('.subbtn')
loginform.addEventListener('click',()=>
{ 
  let email = document.querySelector('#email').value;
  
  if(email=="mentor@gmail.com")
  {
   let form_spc=document.querySelector('#form-spc')
    form_spc.setAttribute('action','mentor.html')
    ;
    
  }
  else if(email=="admin@gmail.com")
  {
   let form_spc=document.querySelector('#form-spc')
    form_spc.setAttribute('action','admin.html')
    ;
    
  }
  else
  {
    let form_spc=document.querySelector('#form-spc')
    form_spc.setAttribute('action','mentee.html')
    ;
    
  }
})




