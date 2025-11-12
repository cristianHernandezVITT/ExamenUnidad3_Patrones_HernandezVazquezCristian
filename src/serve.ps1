param(
    [int]$Port = 8000
)

Write-Host "Starting simple PowerShell HTTP server on http://localhost:$Port/ (Ctrl+C to stop)"

$listener = New-Object System.Net.HttpListener
$url = "http://localhost:$Port/"
$listener.Prefixes.Add($url)
$listener.Start()

function Get-ContentType($path){
    switch -Regex ($path){
        '\.html?$' { 'text/html' ; break }
        '\.js$'    { 'application/javascript' ; break }
        '\.css$'   { 'text/css' ; break }
        '\.json$'  { 'application/json' ; break }
        '\.png$'   { 'image/png' ; break }
        '\.jpg$'   { 'image/jpeg' ; break }
        '\.jpeg$'  { 'image/jpeg' ; break }
        '\.svg$'   { 'image/svg+xml' ; break }
        '\.ico$'   { 'image/x-icon' ; break }
        default     { 'application/octet-stream' }
    }
}

try{
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $resp = $context.Response
        $rawPath = $req.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($rawPath)) { $rawPath = 'index.html' }

        
        $safePath = $rawPath -replace '\\.\\./', '' -replace '\\.\\.\\\\', ''
        $full = Join-Path (Get-Location) $safePath

        if (Test-Path $full -PathType Leaf) {
            try{
                $bytes = [System.IO.File]::ReadAllBytes($full)
                $resp.ContentType = Get-ContentType $full
                $resp.ContentLength64 = $bytes.Length
                $resp.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $resp.StatusCode = 500
                $msg = "Internal server error: $_"
                $data = [System.Text.Encoding]::UTF8.GetBytes($msg)
                $resp.OutputStream.Write($data,0,$data.Length)
            }
        } else {
            $resp.StatusCode = 404
            $msg = "404 Not Found: $rawPath"
            $data = [System.Text.Encoding]::UTF8.GetBytes($msg)
            $resp.ContentType = 'text/plain'
            $resp.OutputStream.Write($data,0,$data.Length)
        }
        $resp.Close()
    }
} finally {
    if ($listener -and $listener.IsListening) {
        $listener.Stop()
        $listener.Close()
    }
}
