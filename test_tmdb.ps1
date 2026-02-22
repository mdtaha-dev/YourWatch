
$posters = @{
    "Inception" = "https://image.tmdb.org/t/p/w500/9gk78u7tLovB01Sgn0SmyQ39JUr.jpg"
    "Parasite" = "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGIBNfSdGxQj0TTwg.jpg"
    "The Conjuring" = "https://image.tmdb.org/t/p/w500/w30dK0nK6c9eBvB5y1q4f2g3f0j.jpg"
    "Dangal" = "https://image.tmdb.org/t/p/w500/5bq69v5_mC6tO6Yk5s9rXv8jD.jpg"
    "About Time" = "https://image.tmdb.org/t/p/w500/kVnN5uJp6wY6uY8t1e0s9d2b3c4f.jpg"
    "John Wick" = "https://image.tmdb.org/t/p/w500/fZPSd99A1jBw4C0t8P6q7r2s3t5u.jpg"
    "Train to Busan" = "https://image.tmdb.org/t/p/w500/okD4d0yU4W5u8i7r1l2o3b4e6d.jpg"
    "Interstellar" = "https://image.tmdb.org/t/p/w500/gC0N8b9d0e1f2g3h4i5j6k7l8m.jpg"
    "Andhadhun" = "https://image.tmdb.org/t/p/w500/oB0y1uBw5C6n7m8p9q0r1s2t3v4x.jpg"
    "The Grand Budapest Hotel" = "https://image.tmdb.org/t/p/w500/cV2P5g4X5Y6Z7a8b9c0d1e2f3g4h.jpg"
}

foreach ($title in $posters.Keys) {
    $url = $posters[$title]
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -ErrorAction Stop -UserAgent "Mozilla/5.0" -UseBasicParsing
        Write-Host "SUCCESS: $title - $($response.StatusCode)"
    } catch {
        Write-Host "FAILURE: $title - $($_.Exception.Message)"
    }
}
