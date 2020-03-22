#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import json
import requests

'''
query para obter o nome dos países

select distinct ?pais where {
[] dbo:nationality ?pais.
?pais a dbo:Country.
filter not exists { ?pais dbo:dissolutionYear ?dissYear .}
}
'''

pais = ""
nomesPaises = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'pais':
                for valor in dicionario[valores]:
                    if valor == 'value':
                        nomePais = str(dicionario[valores][valor]).split('http://dbpedia.org/resource/')
                        pais = nomePais[1]
    
        pais = re.sub(r'[()]', '', str(pais))

        #gerar um país
        if(not(nomesPaises.__contains__(pais))):
            print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/aula7#" + pais)
            print(":" + pais, "rdf:type owl:NamedIndividual ,")
            print("       :País .")

            nomesPaises.append(pais)

        i = i + 1

readFile('../informacao/paises.json')