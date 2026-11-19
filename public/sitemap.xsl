<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8"/>
<xsl:template match="/">
<html><head><title>XML Sitemap – Webgram IT Solution</title><meta name="robots" content="noindex"/>
<style>body{font:15px/1.5 system-ui,sans-serif;margin:24px;color:#0f1f3d}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:8px 10px;border-bottom:1px solid #e3e8ef}th{background:#f2f6fb}a{color:#1d4ed8;word-break:break-all}</style></head>
<body><h1 style="font-weight:500">XML Sitemap</h1><p><xsl:value-of select="count(s:urlset/s:url)"/> URLs</p>
<table><tr><th>#</th><th>URL</th><th>Last modified</th></tr>
<xsl:for-each select="s:urlset/s:url"><tr><td><xsl:value-of select="position()"/></td><td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td><td><xsl:value-of select="s:lastmod"/></td></tr></xsl:for-each>
</table></body></html>
</xsl:template></xsl:stylesheet>
