$(document).ready(function(){
  $('.delBtn').on('click',function(e){
    console.log('click');
    $target =$(e.target)
    let del_id =$target.attr('data-id')
    console.log(del_id);
    $.ajax({
      type:'DELETE',
      url:'/posts/delete/'+del_id,
      success:function(res){
        alert('deleting post...')
        window.location.href='/posts'
      },
      error: function(err){
        console.log(err);
      }
    })
  })
})
