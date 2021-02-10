



$(document).on('click','#selectDates',function(e) {
    e.preventDefault();
    let url = this.href;
    displayModalWithDates(url);
});


$(document).on('click','#selectDatesNavbar',function(e) {
    e.preventDefault();
    let url = this.href;
    $("#modalBalance").modal("show");
    displayModalWithDates(url);
});


$("#modalBalance").on('hidden.bs.modal', function(){


    let url = "templates/includes/chooseDate.php"; 
    $("#chooseDate").remove();
    $("#modalBalanceContent").load(url+' #chooseOption').hide().fadeIn('slow');
    $("#balanceSelect").addClass("d-none");
    
});



function displayModalWithDates(url){
   $("#chooseOption").remove();
    $("#modalBalanceContent").load(url+' #chooseDate').hide().fadeIn('slow');
   $("#balanceSelect").removeClass("d-none");

}

