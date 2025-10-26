$ErrorActionPreference = 'Stop'

function Get-FilesToCheck {
  param([switch]$All)
  if(-not $All){
    try{
      $changed = git diff --cached --name-only --diff-filter=ACM 2>$null |
        Where-Object { $_ -match '\.(html?|css)$' }
      if($changed){ return $changed }
    } catch { }
  }
  return Get-ChildItem -Recurse -File -Include *.html, *.htm, *.css | Select-Object -ExpandProperty FullName
}

$patterns = @('Ã','Â','â','�')
$regex = [string]::Join('|', ($patterns | ForEach-Object { [Regex]::Escape($_) }))
$issues = @()

$files = Get-FilesToCheck
foreach($p in $files){
  try{ $text = Get-Content -Raw -Path $p } catch { continue }
  if([Regex]::IsMatch($text, $regex)){
    $issues += ("Mojibake sospechoso en: {0}" -f $p)
  }
  if($p -match '\.(html?|htm)$'){
    $head = $text.Substring(0, [Math]::Min(1500, $text.Length))
    if($head -notmatch '<meta\s+charset=\"utf-8\"'){ $issues += ("Falta meta charset UTF-8 en: {0}" -f $p) }
  }
}

if($issues.Count -gt 0){
  Write-Host "`n[Encoding check] Se detectaron problemas:" -ForegroundColor Yellow
  $issues | ForEach-Object { Write-Host (" - {0}" -f $_) -ForegroundColor Red }
  Write-Host "`nSolución sugerida: normalizar a UTF-8 y corregir mojibake antes de commitear." -ForegroundColor Yellow
  exit 1
} else {
  Write-Host "[Encoding check] OK: Archivos HTML/CSS en UTF-8 y sin mojibake sospechoso."
}

