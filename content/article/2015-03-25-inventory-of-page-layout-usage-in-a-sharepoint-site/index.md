+++
author = "admin"
categories = ["Tools","Coding"]
date = "2015-03-24T23:05:12+00:00"
tags = ["PowerShell","Scripting","SharePoint","Windows Server"]
title = "Inventory of Page Layout Usage in a SharePoint Site"
summary = "Recently I got a request to find out the usage of page layouts on a large SharePoint site. I Googled and found a few scripts, but none that did all I wanted, e.g. to limit the inventory to a certain sub-site. So I wrote my own one."
type = "article"
url = "/inventory-of-page-layout-usage-in-a-sharepoint-site/"

+++

Recently I got a request to find out the usage of page layouts on a large SharePoint site. I Googled and found a few scripts, but none that did all I wanted, e.g. to limit the inventory to a certain sub-site. So I wrote my own one.

{{<code PowerShell>}}
function Get-PageLayoutsInUse {
[CmdletBinding()]
  Param
  (
    [Parameter(Mandatory=$true)]
    [string]
    $SiteUrl,
    [Parameter(Mandatory=$false)]
    [string]
    $MatchUrlPart       
  )
  Add-PSSnapin "Microsoft.SharePoint.PowerShell" -ErrorAction SilentlyContinue
  $objSite = Get-SPSite $SiteUrl
  [Microsoft.Sharepoint.Publishing.PublishingSite]$publishingSite = New-Object Microsoft.SharePoint.Publishing.PublishingSite($objSite)

  $layoutsInUse = @()

  if ([Microsoft.SharePoint.Publishing.PublishingWeb]::IsPublishingWeb($publishingSite.RootWeb) -eq $true)
  {
    $pageLayouts = $publishingSite.GetPageLayouts($false)
    foreach($layout in $pageLayouts)
    {
      Write-Host "Looking for references to " $layout.ServerRelativeUrl

      [Microsoft.SharePoint.SPFile]$file = $publishingSite.RootWeb.GetFile($layout.ServerRelativeUrl);
      
      if($MatchUrlPart) {
        $links = $file.BackwardLinks | where {$_.ServerRelativeUrl -like $MatchUrlPart }
      }
      else {
        $links = $file.BackwardLinks
      }
      $layoutReportItem = @{Title=$layout.Title;File=$layout.ServerRelativeUrl;Count=$links.Count}
      $newobject = New-Object PSObject -Property $layoutReportItem
      $layoutsInUse += $newobject        
    }
  }
  $a = @{Expression={$_.LayoutName}}

  $layoutsInUse | Sort-Object Count -Descending | Select-Object -Property *
}
{{</code>}}

This has been tested in a SharePoint 2013 on-prem farm run locally on a server in the farm. If run from C: it can be used like this and exported to CSV for the entire site:
  
```
. C:\Get-PageLayoutsInUse.ps1
  
Get-PageLayoutsInUse -SiteUrl "http://company.com" | Export-Csv C:\page\_layouts\_on\_entire\_site.csv –NoTypeInformation
```

Or for the sub-site Products in English:
```
. C:\Get-PageLayoutsInUse.ps1
  
Get-PageLayoutsInUse -SiteUrl "http://company.com" -MatchUrlPart "\*/en-gb/products/\*" | Export-Csv C:\page\_layouts\_under_products.csv –NoTypeInformation
```