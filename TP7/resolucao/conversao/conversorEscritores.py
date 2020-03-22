#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import json
import requests

nomesEscritores = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)

    nomeRealizador = ""
    sexo = ""

    '''
    ###  http://www.semanticweb.org/jaime/ontologies/2020/2/aula7#Melissa_Rosenberg
    :Melissa_Rosenberg rdf:type owl:NamedIndividual ,
                                :Escritor ,
                                :Pessoa ;
                    :escreveu :ArgumentoTwillight ;
                    :sexo "F" .
    '''

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'nomeEscritor':
                for valor in dicionario[valores]:
                    if valor == 'value':
                        #print("Nome do escritor:", dicionario[valores][valor])
                        nomeEscritor = str(dicionario[valores][valor])
            if valores == 'sexo':
                for valor in dicionario[valores]:
                    if valor == 'value':
                        #print("Sexo:", dicionario[valores][valor])
                        sexo = str(dicionario[valores][valor])

        nomeEscritor = re.sub(r'[,,/\"]', '', str(nomeEscritor))
        nomeEscritor = re.sub(r'[ \'.()–’]', '_', str(nomeEscritor))
        #nomeRealizador = re.sub(r'[\][\'\’	]', '_', str(nomeRealizador))
       
        #gerar um filme
        if(not(nomesEscritores.__contains__(nomeEscritor))):
            print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/aula7#" + nomeEscritor)
            print(":" + nomeEscritor, "rdf:type owl:NamedIndividual ,")
            print("                :Escritor ,")
            print("                :Pessoa ;")
            if sexo == 'male':
                print("        :sexo \"M\" .")
            else:
                print("        :sexo \"F\" .")

            nomesEscritores.append(nomeEscritor)
    
        i = i + 1

readFile('../informacao/escritores.json')
