<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$email_address = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

// Check for empty fields
if(empty($_POST['email'])  		||
   empty($_POST['to']) 		||
   !$email_address)
   {
	echo "No arguments Provided!";
	return false;
   }

$to = $_POST['to'];

if ($email_address === FALSE) {
    echo 'Invalid email';
    exit(1);
}

// Create the email and send the message
$email_subject = "Proof market beta-test credentials form";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nEmail: $email_address";
$headers = "From: noreply@proof.market.nil.foundation\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
return true;
?>
