<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>
                    Manifesto
                </title>
            </head>
            <style>
                h1{
                    font-size:48px;
                }
                div{
                    border-top: solid blue;
                    text-align: justify;
                }
            </style>
            <body>
                <h1 style="margin-top:2cm" align="center"><span style="color:red">Manifesto</span></h1>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    
    
    <xsl:template match="meta">
        <div style="margin:2cm">
            <h2><span style="color:red">Meta</span></h2>
            <table>
                <tr>
                    <th align="left">Key_name: </th><td><xsl:value-of select="keyname"/></td>
                </tr>
                <tr>
                    <th align="left">Title: </th><td><xsl:value-of select="title"/></td>
                </tr>
                <tr>
                    <th align="left">Subtitle: </th><td><xsl:value-of select="subtitle"/></td>
                </tr>
                <tr>
                    <th align="left">Inicial date: </th><td><xsl:value-of select="bdate"/></td>
                </tr>
                <tr>
                    <th align="left">End date: </th><td><xsl:value-of select="edate"/></td>
                </tr>    
            </table>
            <p><b><span style="color:red">Supervisor</span></b></p>
            <p align="left"><b>Name: </b><xsl:value-of select="supervisor/name"/></p>
            <p align="left"><b>Email: </b><xsl:value-of select="supervisor/email"/></p>
            <p align="left"><b>Homepage: </b><a href="{supervisor/homepage}"><xsl:value-of select="supervisor/homepage"/></a></p>
        </div>
    </xsl:template>
    
    <xsl:template match="workteam">
        <div style="margin:2cm">
            <h2><span style="color:red">WorkTeam</span></h2>
            <table>
                <tr>
                    <th align="left">Number: </th><td><xsl:value-of select="member/identifier"/></td>
                </tr>
                <tr>
                    <th align="left">Name: </th><td><xsl:value-of select="member/name"/></td>
                </tr>
                <tr>
                    <th align="left">Email: </th><td><xsl:value-of select="member/email"/></td>
                </tr>
                <tr>
                    <th align="left">Photo: </th>
                    <td>
                        <img width="200" height="200">
                            <xsl:attribute name="src">
                                <xsl:value-of select="member/photo/@path"/>
                            </xsl:attribute>
                        </img>
                    </td>
                </tr>
            </table>
         </div>
    </xsl:template>
    
    <xsl:template match="abstract">
        <div style="margin:2cm">
            <h2><span style="color:red">Abstracts</span></h2>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="b">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    
    <xsl:template match="i">
        <i>
            <xsl:apply-templates/>
        </i>
    </xsl:template>
    
    <xsl:template match="u">
        <u>
            <xsl:apply-templates/>
        </u>
    </xsl:template>
    
    <xsl:template match="deliverables">
        <div style="margin:2cm">
            <h2><span style="color:red">Deriverables</span></h2>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li>
            <a href="{@path}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>
    
    <xsl:template match="xref">
        <a href="{@url}"><xsl:value-of select="."/></a>
    </xsl:template>
</xsl:stylesheet>