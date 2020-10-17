<!DOCTYPE html>
<html lang="en">

<head>
    <title>Contact us</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="../public/stylesheets/combine.css">
	<link rel="stylesheet" type="text/css" href="../public/stylesheets/slick.css">
</head>

<body>
    <!--contact form begins-->
    <div class="">
        <div class="container">
            <div class="common_inner">
                <div class="clearfix text-uppercase mb10 ob font16 text-center">
                    <div class="menu-sub-head disinbl">
                        Send us an E-Mail
                    </div>
                    <div style="font-size: small;color: RED"><br><br>All fields are mandatory</div>
                </div>
            </div>
            <div>
                <form role="form" class="common-form text-center form_tooltip" id="contact_form" name="contact_form" action="contactusresult.php" method="post" autocomplete="off">
                    <input type="hidden" name="page" value="contactus" />
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group mb20">
                                <input type="text" placeholder="ENTER YOUR NAME" class="form-control" id="cname" name="cname" required minlength="5" maxlength="15" pattern="[a-zA-Z\s]+">
                            </div>
                            <div class="form-group mb20">
                                <input type="text" placeholder="ENTER YOUR MOBILE NUMBER" class="form-control" id="cnumber" name="cnumber" required minlength="10" maxlength="10" pattern="[7-9]{1}[0-9]{9}">
                            </div>
                            <div class="form-group mb20">
                                <input type="email" placeholder="ENTER YOUR EMAIL" class="form-control" id="cemail" name="cemail" required>
                            </div>
                            <div class="form-group mb20">
                                <input type="text" placeholder="ENTER YOUR SUBJECT" class="form-control" id="subject" name="subject" required>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group mb20">
                                <textarea class="form-control contact-text" placeholder="ENTER YOUR MESSAGE" id="message" name="message" required minlength="10"></textarea>
                            </div>

                            <div class="btnContainer ">
                                <button class="btn btn-md  back-btn common-btn common-btn-theme-light btn-block form-btn" type="submit" name="submit" id="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!--contact form ends-->
</body>
</body>

</html>