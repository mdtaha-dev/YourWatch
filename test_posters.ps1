
$movies = Get-Content -Path "c:\Users\Mohammed Taha\Documents\Programming\Vibe Coded Projects\Anitgavity\YourWatch\movie-reco-app\backend\data\movies.json" | ConvertFrom-Json
foreach ($movie in $movies) {
    $url = $movie.poster
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -ErrorAction Stop -UserAgent "Mozilla/5.0" -UseBasicParsing
        Write-Host "SUCCESS: $($movie.title) - $($response.StatusCode)"
    } catch {
        Write-Host "FAILURE: $($movie.title) - $($_.Exception.Message)"
    }
}
