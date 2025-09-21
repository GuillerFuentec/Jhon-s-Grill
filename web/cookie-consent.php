<?php
/*
 * Manejador de consentimiento de cookies (sin JavaScript)
 * Este archivo maneja las respuestas del formulario cuando JS está desactivado
 */

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['consent'])) {
    $consent = $_POST['consent'];
    $categories = json_decode($_POST['categories'], true);
    
    if ($categories) {
        $consentData = [
            'version' => 1,
            'lang' => 'es', // Podrías detectar esto del header Accept-Language
            'categories' => $categories,
            'timestamp' => time() * 1000 // JavaScript timestamp
        ];
        
        // Establecer cookie
        $cookieValue = urlencode(json_encode($consentData));
        $maxAge = 180 * 24 * 60 * 60; // 6 meses en segundos
        
        setcookie(
            'site_consent',
            $cookieValue,
            [
                'expires' => time() + $maxAge,
                'path' => '/',
                'domain' => '', // Deja vacío para el dominio actual
                'secure' => isset($_SERVER['HTTPS']),
                'httponly' => false, // Necesitamos que sea accesible por JS
                'samesite' => 'Lax'
            ]
        );
    }
    
    // Redirigir de vuelta a la página de origen
    $referrer = $_SERVER['HTTP_REFERER'] ?? '/';
    header('Location: ' . $referrer);
    exit;
}

// Si se accede directamente, redirigir a inicio
header('Location: /');
exit;
?>