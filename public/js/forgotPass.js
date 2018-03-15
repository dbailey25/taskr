$(document).ready(function () {

// Start of Forgot Password ========================================================================================================


    $("#forgotPassSubmit").on("click", function(event) {
      event.preventDefault();

        if ($("#usernameForgotPass").val()) {

          var usernameEntered = $("#usernameForgotPass").val().toLowerCase();
          console.log(usernameEntered);


          //query taskrs for username and password and check if they match
          $.ajax("/api/taskrs/" + usernameEntered, {
            type: "GET",
            data: usernameEntered
          }).then(function(dbTaskr) {
            console.log(dbTaskr);

            if (dbTaskr == null) {
                alert("No user by that username exists")
            } else {
              $("#forgotPassSubmit").hide();
              $("#cancelBtn").hide();

              var secQues1 = dbTaskr.secQuestion1;
              var secQues2 = dbTaskr.secQuestion2;
              var secQues3 = dbTaskr.secQuestion3;
              var secQuesAns1 = dbTaskr.secQuestionAnswer1;
              var secQuesAns2 = dbTaskr.secQuestionAnswer2;
              var secQuesAns3 = dbTaskr.secQuestionAnswer3;
              var userId = dbTaskr.id;
              $("#secQuesInputs").append(`        
                    <div class="row">
                        <div class="offset-md-3 col-md-6">
                            <h6 class="text-center">
                            ${secQues1}
                            </h6>
                            <form>
                                <div class="form-group">
                                    <input type="name" class="form-control text-center" id="secQuestAnswer1"  placeholder="Enter Your Answer">
                                </div>
                            </form>
                        </div>
                        <div class="offset-md-3 col-md-6">
                            <h6 class="text-center">
                            ${secQues2}
                            </h6>
                            <form>
                                <div class="form-group">
                                    <input type="name" class="form-control text-center" id="secQuestAnswer2" placeholder="Enter Your Answer">
                                </div>
                            </form>
                        </div>
                        <div class="offset-md-3 col-md-6">
                            <h6 class="text-center">
                            ${secQues3}
                            </h6>
                            <form>
                                <div class="form-group">
                                    <input type="name" class="form-control text-center" id="secQuestAnswer3" placeholder="Enter Your Answer">
                                </div>
                            </form>
                        </div> 
                        <div class="offset-md-5 col-md-1">
                            <button id="forgotPassSubmit1" class="btn btn-primary">Submit</button>
                        </div>
                        <div class="col-md-1">
                            <button id="cancelBtn1" class="btn btn-primary">Cancel</button>
                        </div>
                    </div>
                `);



                $("#forgotPassSubmit1").on("click", function(event) {
                    event.preventDefault();

                    var userSecAns1 = $("#secQuestAnswer1").val().trim().toLowerCase();
                    var userSecAns2 = $("#secQuestAnswer2").val().trim().toLowerCase();    
                    var userSecAns3 = $("#secQuestAnswer3").val().trim().toLowerCase();
                    
                    if(
                        userSecAns1 === secQuesAns1 &&
                        userSecAns2 === secQuesAns2 && 
                        userSecAns3 === secQuesAns3              
                    ){
                        $("#forgotPassSubmit1").hide();
                        $("#cancelBtn1").hide();
                        $("#passwordInputs").append(`        
                            <div class="row">
                                <div class="offset-md-3 col-md-6">
                                    <form>
                                        <div class="form-group">
                                            <input type="name" class="form-control text-center" id="passUpdate1"  placeholder="Enter Your New Password">
                                        </div>
                                    </form>
                                </div>
                                <div class="offset-md-3 col-md-6">
                                    <form>
                                        <div class="form-group">
                                            <input type="name" class="form-control text-center" id="passUpdate2" placeholder="Confirm Your New Password">
                                        </div>
                                    </form>
                                </div>
                                <div class="offset-md-5 col-md-1">
                                    <button id="forgotPassSubmit2" class="btn btn-primary">Submit</button>
                                </div>
                                <div class="col-md-1">
                                    <button id="cancelBtn2" class="btn btn-primary">Cancel</button>
                                </div>
                            </div>
                        `);

                        $("#forgotPassSubmit2").on("click", function(event) {
                        event.preventDefault();
                            var newPass1 = $("#passUpdate1").val().trim();
                            var newPass2 = $("#passUpdate2").val().trim(); 
                            
                            if( newPass1 === newPass2){

                                var newUserPassword = {
                                    password: newPass1,
                                    id: userId
                                }
                                $.ajax("/api/update/password", {
                                    type: "PUT",
                                    data: newUserPassword
                                }).then(function(dbTaskr) {
                                    console.log(dbTaskr);
                                    alert("Password Changed")

                                     $("#usernameForgotPass").val("");
                                     $("#secQuestAnswer1").val("");
                                     $("#secQuestAnswer2").val("");    
                                     $("#secQuestAnswer3").val("");
                                     $("#passUpdate1").val("");
                                     $("#passUpdate2").val("");



                                    // Reload the page to get the updated list
                                    // location.href="/home";
                                });                                
                            }else
                                alert("Passwords do not match")                    
                        })
                    }else
                        alert("The answers are wrong")
                });
            }    
          });
        }else{
            alert("Please enter a username")
        }
    });
// End of Forgot Password ========================================================================================================
})