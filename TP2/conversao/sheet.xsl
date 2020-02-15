<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
     
    
    <xsl:output method="text"/>
    
    <xsl:template match="/">
        <xsl:apply-templates mode="e1"/>
    </xsl:template>

    <xsl:template match="obra" mode="e1">
        ###  http://www.semanticweb.org/jaime/ontologies/2020/1/tpc2#<xsl:value-of select="@id" />
        :<xsl:value-of select="@id" /> rdf:type owl:NamedIndividual ,
        :obra ;
        :arranjo "<xsl:value-of select="arrnajo" />"^^xsd:string ;
        :compositor "<xsl:value-of select="compositor" />"^^xsd:string ;
        :inf_relacionada_video "<xsl:value-of select="inf-relacionada/video" />"^^xsd:string ;
        :tipo "<xsl:value-of select="tipo" />"^^xsd:string ;
        :titulo "<xsl:value-of select="titulo" />"^^xsd:string;
        <xsl:for-each select="instrumentos/instrumento">
            :necessita :<xsl:value-of select="../../@id" />_<xsl:value-of select="translate(designacao,' ','')" /> ;
        </xsl:for-each> .
        <xsl:apply-templates select="instrumentos" mode="e2" />
    </xsl:template>
    
    <xsl:template match="instrumento" mode="e2">
        ###  http://www.semanticweb.org/jaime/ontologies/2020/1/tpc2#<xsl:value-of select="../../@id" />_<xsl:value-of select="translate(designacao,' ','')" />
        :<xsl:value-of select="../../@id" />_<xsl:value-of select="translate(designacao,' ','')" /> rdf:type owl:NamedIndividual ,
        :instrumento ;
        :éNecessitado :<xsl:value-of select="../../@id" /> ;
        :designacao "<xsl:value-of select="translate(designacao,' ','')" />"^^xsd:string ;
        :path_partitura "<xsl:value-of select="partitura/@path" />"^^xsd:string ;
        :type_partitura "<xsl:value-of select="partitura/@type" />"^^xsd:string ;
        :voice_partitura "<xsl:value-of select="partitura/@voz" />"^^xsd:string .
    </xsl:template>
    
    

</xsl:stylesheet>