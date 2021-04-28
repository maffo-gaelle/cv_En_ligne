<?php
    $array = array("firstname" => "", "name"=>"", "email" => "", "phone" => "", "message" => "", "firstnameError" => "", "nameError" => "", "emailError" => "", "emailError" => "", "phoneError" => "", "messageError" => "", "isSucces" => false);
    
    $emailTo = "gaellemaffo@yahoo.fr";

    if($_SERVER["REQUEST_METHOD"] == "POST") {//2ème lecture: les données on été soumises
        $array["firstname"] = verifyInput($_POST["firstname"]);
        $array["name"] = verifyInput($_POST["name"]);
        $array["email"] = verifyInput($_POST["email"]);
        $array["phone"] = verifyInput($_POST["phone"]);
        $array["message"] = verifyInput($_POST["message"]);
        $array["isSucces"] = true;
        $emailText = "";

        if(empty($array["firstname"])) {
            $array["firstnameError"] = "Je voudrais connaître votre prénom";
            $array["isSucces"] = false;
        } else {
            $emailText.= "Firstname: {$array['firstname']}\n";
        }
        if(empty($array["name"])) {
            $array["nameError"] = "Je voudrais tout savoir, même votre nom";
            $array["isSucces"] = false;
        } else {
            $emailText.= "Name :  {$array['name']}\n";
        }
        if(empty($array["email"])) {
            $array["emailError"] = "Je voudrais avoir votre email pour eventuellement vous recontacter";
            $array["isSucces"] = false;
        } else {
            $emailText.= "email :  {$array['email']}\n";
        }

        if(!isEmail($array['email'])) {
            $array["emailError"] = "Veuillez s'il vous plaît entre un email valide. ";
            $array["isSucces"] = false;
        }

        if(!isPhone($array["phone"])) {
            $array["phoneError"] = "Que des chiffres et des espaces SVP! ";
            $array["isSucces"] = false;
        } else {
            $emailText.= "phone :  {$array['phone']}\n";
        }
        if(empty($array["message"])) {
            $array["messageError"] = "Ce champ est requis. ";
            $array["isSucces"] = false;
        } else {
            $emailText.= "Message :  {$array['message']}\n";
        }

        if($array["isSucces"]) {
            $headers = "From: {$array['firstname']} {$array['name']} <{$array['email']}>\r\nReply-To: {$array['email']}";
            mail($emailTo, "Un message de votre site", $emailText, $headers);
        }

        echo json_encode($array);
    }

    function verifyInput($var) {
        $var = trim($var);
        $var = stripslashes($var);
        $var = htmlspecialchars($var);

        return $var;
    }

    function isEmail($var) {
        return Filter_var($var, FILTER_VALIDATE_EMAIL);
    }

    function isPhone($var) {
        return preg_match("/^[0-9 ]*$/", $var);
    }








    // $firstname = $name = $email = $phone = $message = "";
    // $firstnameError = $nameError = $emailError = $phoneError = $messageError = "";
    // $isSucces = false;
    // $emailTo = "gaellemaffo@yahoo.com";
    // if($_SERVER["REQUEST_METHOD"] == "POST") {//2ème lecture: les données on été soumises
    //     $firstname = verifyInput($_POST["firstname"]);
    //     $name = verifyInput($_POST["name"]);
    //     $email = verifyInput($_POST["email"]);
    //     $phone = verifyInput($_POST["phone"]);
    //     $message = verifyInput($_POST["message"]);
    //     $isSucces = true;
    //     $emailText = "";

    //     if(empty($firstname)) {
    //         $firstnameError = "Je voudrais connaître votre prénom";
    //         $isSucces = false;
    //     } else {
    //         $emailText.= "FirstName :  $firstname\n";
    //     }
    //     if(empty($name)) {
    //         $nameError = "Je voudrais tout savoir, même votre nom";
    //         $isSucces = false;
    //     } else {
    //         $emailText.= "Name :  $name\n";
    //     }
    //     if(empty($email)) {
    //         $emailError = "Je voudrais avoir votre email pour eventuellement vous recontacter";
    //         $isSucces = false;
    //     } else {
    //         $emailText.= "email :  $email\n";
    //     }

    //     if( !isEmail( $email)) {
    //         $emailError = "Veuillez s'il vous plaît entre un email valide. ";
    //         $isSucces = false;
    //     }

    //     if(!isPhone($phone)) {
    //         $phoneError = "Que des chiffres et des espaces SVP! ";
    //         $isSucces = false;
    //     } else {
    //         $emailText.= "phone :  $phone\n";
    //     }
    //     if(empty($message)) {
    //         $messageError = "Ce champ est requis. ";
    //         $isSucces = false;
    //     } else {
    //         $emailText.= "Message :  $message\n";
    //     }

    //     if($isSucces) {
    //         $headers = "From: $firstname $name <$email>\r\nReply-To: $email";
    //         mail($emailTo, "Un message de votre site", $emailText, $headers);
    //         $firstname = $name = $email = $phone = $message = "";
    //     }
    // }

    // function verifyInput($var) {
    //     $var = trim($var);
    //     $var = stripslashes($var);
    //     $var = htmlspecialchars($var);

    //     return $var;
    // }

    // function isEmail($var) {
    //     return Filter_var($var, FILTER_VALIDATE_EMAIL);
    // }

    // function isPhone($var) {
    //     return preg_match("/^[0-9 ]*$/", $var);
    // }
?>