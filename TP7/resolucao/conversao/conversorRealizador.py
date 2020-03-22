#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import json
import requests

nomesRealizadores = []
paises = []
linguas = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)

    nomeRealizador = ""
    sexo = ""

    '''
    ###  http://www.semanticweb.org/jaime/ontologies/2020/2/aula7#Catherine_Hardwicke
    :Catherine_Hardwicke rdf:type owl:NamedIndividual ,
                              :Pessoa ,
                              :Realizador ;
                     :realizou :Twillight ;
                     :sexo "F" .
    '''

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'nomeRealizador':
                for valor in dicionario[valores]:
                    if valor == 'value':
                        #print("Descrição:", dicionario[valores][valor])
                        nomeRealizador = str(dicionario[valores][valor])
            if valores == 'sexo':
                for valor in dicionario[valores]:
                    if valor == 'value':
                        #print("País:", dicionario[valores][valor])
                        sexo = str(dicionario[valores][valor])

        #nomeRealizador = re.sub(r'[ ]+', '', str(nomeRealizador))
        nomeRealizador = re.sub(r'[ (),.\"/	]', '', str(nomeRealizador))
        nomeRealizador = re.sub(r'[\][\'\’	]', '_', str(nomeRealizador))
       
        #gerar um filme
        if(not(nomesRealizadores.__contains__(nomeRealizador))):
            print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/aula7#" + nomeRealizador)
            print(":" + nomeRealizador, "rdf:type owl:NamedIndividual ,")
            print("                :Pessoa ,")
            print("                :Realizador ;")
            if sexo == 'male':
                print("        :sexo \"M\" .")
            else:
                print("        :sexo \"F\" .")

            nomesRealizadores.append(nomeRealizador)

        i = i + 1

readFile('../informacao/realizadores.json')
