#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests

atores = {}
nomes = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)

    nome = ""
    sexo = ""

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'sexo':
                sexo = dicionario[valores]
            if valores == 'aname':
                nome = dicionario[valores]
                nome = str(nome).replace(" ", "_")
                nome = str(nome).replace("\'", "_")
                nome = str(nome).replace("(", "")
                nome = str(nome).replace(")", "")
                nome = str(nome).replace("\"", "")
                nome = str(nome).replace(".", "")
                nome = str(nome).replace("\\\\", "")
                nome = str(nome).replace("’", "_")
                nome = str(nome).replace(",", "_")
        if(not(nomes.__contains__(nome))):
            print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/aula7#" + nome)
            print(":" + nome, "rdf:type owl:NamedIndividual ,")
            print("          :Ator ,")
            if sexo == 'male':
                print("          :AtorMasculino ,")
            else:
                print("          :AtorFeminino ,")
            print("          :Pessoa ;")
            if sexo == 'male':
                print("    :sexo \"M\" .")
            else:
                print("    :sexo \"F\" .")
            nomes.append(nome)

        nome = ""
        i = i + 1
        print("\n")

readFile('../informacao/atores.json')