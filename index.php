<!DOCTYPE html>
<html>
<?php
	require_once __DIR__ . '/vendor/autoload.php';
	require 'vendor/autoload.php';
	$app_id = "1119143194877722";
	$app_secret = "a0f7c1f0a91b67c65cea736b89e0bce0";
	$accessToken = $app_id . "|" . $app_secret;
	$fb = new Facebook\Facebook([
  		'app_id' => $app_id,
  		'app_secret' => $app_secret,
 	 	'default_graph_version' => 'v2.5',
	]);
	$fb->setDefaultAccessToken($accessToken);
	$helper = $fb->getRedirectLoginHelper();
	try {
  		$accessToken = $helper->getAccessToken();
	} catch(Facebook\Exceptions\FacebookResponseException $e) {
  		// When Graph returns an error
  		echo 'Graph returned an error: ' . $e->getMessage();
 	 	exit;
	} catch(Facebook\Exceptions\FacebookSDKException $e) {
  		// When validation fails or other local issues
  		echo 'Facebook SDK returned an error: ' . $e->getMessage();
  		exit;
	}
	if($accessToken == 0){
		echo "helo";
	}
	$response = $fb->get('/spiklxyz/events');
	var_dump($response);
	//$client = new MongoDB\Client("mongodb://localhost:27017");
	//$collection = $client->spikl->spikl;
 ?>
<head>
  <title> SPiKL </title>
  <style>
  body
  {
    font-family: "Helvetica";
    font-style: normal;
    letter-spacing: 2px;
    text-align: center;
  }
  header {
    padding-top: 50px;
    padding-bottom: 20px;
    color: white;
    background: url("images/chat.jpg");
    background-size: cover;
  }
  ul {
    background-color: rgba(255,255,255,0.5);
  }
  li {
    display: inline
  }
  </style>
</head>


<body>
  <header>
    <img src="images/text.png" alt="banana minion" width=300px>
    <h3>THE UNIVERSITY OF YORK'S FIRST LANGUAGE EXCHANGE GROUP</h3>

<div id="top">
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
</div>

</header>

<div id="bottom">
<ol>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ol>
</div>
</body>
