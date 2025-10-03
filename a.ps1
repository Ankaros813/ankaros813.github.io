# 자동 커밋 & 푸시 스크립트
Set-Location "C:\blogmaker"   # blogmaker 폴더 경로
git status
git add .
$commitMessage = "Automatic commit at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m "$commitMessage"
git push origin main
Write-Host "자동 커밋 및 푸시 완료!"