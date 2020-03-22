#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import json
import requests

nomesFilmes = []
paises = []
linguas = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)

    titulo = ""
    pais = ""
    lingua = ""

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'fname':
                for valor in dicionario[valores]:
                    if valor == 'value':
                        #print("Descrição:", dicionario[valores][valor])
                        titulo = str(dicionario[valores][valor])
            if valores == 'country':
                for valor in dicionario[valores]:
                    if valor == 'value':
                        #print("País:", dicionario[valores][valor])
                        pais = str(dicionario[valores][valor])
            if valores == 'lang':
                for valor in dicionario[valores]:
                        if valor == 'value':
                            lingua = re.sub(r'[\n]', ',', str(dicionario[valores][valor]))
                            lingua = re.sub(r'[ *]', '', str(lingua))
                            
                            if lingua.__contains__(','):
                                linguagem = lingua.split(',')
                                for li in linguagem:
                                    if (li != 'http:') and (li != 'dbpedia.org') and (li != 'resource'):
                                        if not(linguas.__contains__(li)) :
                                            #print("Língua:", li)
                                            print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/aula7#" + li)
                                            print(":" + li, "rdf:type owl:NamedIndividual ,")
                                            print("                    :Língua .")
                                            linguas.append(li)
                            elif lingua.__contains__('/'):
                                linguagem = lingua.split('/')
                                for li in linguagem:
                                    if (li != 'http:') and (li != 'dbpedia.org') and (li != 'resource'):
                                        if not(linguas.__contains__(li)) :
                                            #print("Língua:", li)
                                            print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/aula7#" + li)
                                            print(":" + li, "rdf:type owl:NamedIndividual ,")
                                            print("                    :Língua .")
                                            linguas.append(li)
                            else:
                                if not(linguas.__contains__(lingua))  :
                                    #print("Língua:", lingua)
                                    print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/aula7#" + lingua)
                                    print(":" + lingua, "rdf:type owl:NamedIndividual ,")
                                    print("                    :Língua .")
                                    linguas.append(lingua)

        titulo = re.sub(r'[ .\'\’!]', '_', str(titulo))
        titulo = re.sub(r'[#$&%¿§;—(),–°…/?*\\]', '', str(titulo))
        titulo = re.sub(r'[+]', 'plus', str(titulo))
        titulo = re.sub(r'[½]', '_half', str(titulo))
        
        #gerar um filme
        if(not(nomesFilmes.__contains__(titulo))):
            print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/aula7#" + titulo)
            print(":" + titulo, "rdf:type owl:NamedIndividual ,")
            print("             :Filme ")
            if "United States" in pais:
                print(",", "\n             :FilmeAmericano ;")
            else:
                print(";")
            print("     :titulo \"" + titulo + "\" .")

            nomesFilmes.append(titulo)

        titulo = ""
    
        i = i + 1

readFile('../informacao/filmes.json')