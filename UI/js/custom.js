// variable declalation
let bar=document.querySelector('.menu-toggle');
let closeBar=document.querySelector('.closing');
let adminRejectReview=document.querySelectorAll('.admin-reject-review');
let reviewmessage=document.querySelector('.Reviewdeleted')
let changementee=document.querySelector('.changementee')
let adminchangementee=document.querySelectorAll('.adminchangementee')
let rejectsession= document.querySelectorAll('.reject-session')
let usersession=document.querySelector('.reject-session-message')
let view_modal=document.querySelectorAll('.view_modal')
let View_pop_up=document.querySelector('.View_pop_up_1')
let request_modal=document.querySelectorAll('.request_pop_up')
let request_pop_up=document.querySelector('.request_pop_up_1')
let view_close=document.querySelectorAll('.close')
let submit_request=document.querySelector('.submit_request')
let review_modal=document.querySelectorAll('.review_modal')
let review_pop_up=document.querySelector('.review_pop_up')

//event listners

bar.addEventListener('click',()=>
{
    let reveal=document.querySelector('.side-bar');
    reveal.style.display="grid";
});

closeBar.addEventListener('click',()=>
{
   document.querySelector('.side-bar').style.display="none"
})


// get length on page y poostion and addEventListener to change bakground color
window.onscroll = function (e)
{ 
  if(e.pageY>=10)
  { 
      let hstyle=document.querySelector('header');
      hstyle.classList.add('bgheader');
  }
  else
  {
    let hstyle=document.querySelector('header');
    hstyle.classList.remove('bgheader');
  }
} 

// admin reject review and change admin to a mentor

  adminRejectReview.forEach((btn)=>
{
 
   btn.addEventListener('click',()=>
   {
    reviewmessage.style.display='block'
    setTimeout(()=>{reviewmessage.style.display='none'},1000)
    btn.parentNode.parentNode.removeChild(btn.parentNode)


   })
})
// admin change mantee to a mentor

  adminchangementee.forEach((btn)=>
{
 
   btn.addEventListener('click',()=>
   {
    changementee.style.display='block'
    setTimeout(()=>{changementee.style.display='none'},1000)
    btn.parentNode.parentNode.removeChild(btn.parentNode)
   })
})

// mentor reject session

  rejectsession.forEach((btn)=>
{
 
   btn.addEventListener('click',()=>
   {
    usersession.style.display='block'
    setTimeout(()=>{usersession.style.display='none'},1000)
    btn.parentNode.parentNode.removeChild(btn.parentNode)

   })
})

// add modal to view btn

view_modal.forEach((btn)=>
{
  btn.addEventListener('click',()=>
  { 
   
    View_pop_up.style.display="block";
  })
})

request_modal.forEach((btn)=>
{
  btn.addEventListener('click',()=>
  { 
   
    request_pop_up.style.display="block";
  })
})

review_modal.forEach((btn)=>
{
  btn.addEventListener('click',()=>
  { 
   
    review_pop_up.style.display="block";
  })
})


view_close.forEach((btn)=>
{
 btn.addEventListener('click',()=>
{
  View_pop_up.style.display="none";
  request_pop_up.style.display="none";
  review_pop_up.style.display="none";
})
})
submit_request.addEventListener('click',()=>
{
  request_pop_up.style.display="none";
})




