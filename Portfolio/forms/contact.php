<?php
// Simple contact form handler — sends form to site owner's email using PHP mail()

$receiving_email_address = 'pariharpranav7@gmail.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo 'Contact form must be submitted via POST from a PHP-enabled server. Do not preview this page through a static server or Live Server extension.';
  exit;
}

// Collect + sanitize input
$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : false;
$subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : 'Website Contact Form';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

if (!$name || !$email || !$message) {
  http_response_code(400);
  echo 'Please complete the form and try again.';
  exit;
}

// Basic header injection protection for text fields
$forbidden = ["\r", "\n", "%0a", "%0d", "Content-Type:", "bcc:", "to:", "cc:"];
foreach ([$name, $email, $subject] as $field) {
  foreach ($forbidden as $bad) {
    if (stripos($field, $bad) !== false) {
      http_response_code(400);
      echo 'Invalid input.';
      exit;
    }
  }
}

$email_subject = "Website contact: " . $subject;
$email_body = "You have received a new message from your website contact form:\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Subject: " . $subject . "\n\n";
$email_body .= "Message:\n" . $message . "\n";

$from_address = 'noreply@' . preg_replace('/[^a-z0-9\.\-]/i', '', $_SERVER['SERVER_NAME'] ?? 'localhost');
$headers = "From: Website Contact <" . $from_address . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($receiving_email_address, $email_subject, $email_body, $headers);

if ($sent) {
  echo 'OK';
  exit;
}

http_response_code(500);
echo 'Could not send email. Please try again later.';

?>
