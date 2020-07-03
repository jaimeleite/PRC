#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests

jogadores = {}
idJogadores = []

#guarda os códigos dos países dos jogadores
codigoPaises = []
#guarda os nomes dos países e respetivos códigos
dicionarioPaises = {}


verificaNomes = []
verificaCodigos = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)

    idJogador = ""
    nomeJogador = ""
    bestHand = ""
    birthDate = ""
    birthCountry = ""

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'idJogador':
                idJogador = dicionario[valores]
            if valores == 'fstName':
                nomeJogador += str(dicionario[valores])
            if valores == 'lstName':
                nomeJogador += " "
                nomeJogador += str(dicionario[valores])
            if valores == 'bestHand':
                bestHand = dicionario[valores]
                if str(bestHand) == "U":
                    print("Best hand:", dicionario[valores])
            if valores == 'birthDate':
                if dicionario[valores]:
                    birthDate = dicionario[valores]
                else:
                    birthDate = -1
            if valores == 'birthCountry':
                birthCountry = dicionario[valores]
        
        '''if(not(idJogadores.__contains__(idJogador))):
            print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/tenis#jogador_" + str(idJogador))
            print(":jogador_" + str(idJogador), "rdf:type owl:NamedIndividual ,")
            print("                        :Jogador ;")
            print("                :dataNascimento " + str(birthDate), ";")
            print("                :localNascimento \"" + birthCountry + "#-#" + dicionarioPaises[birthCountry] +  "\"", ";")
            print("                :melhorMão \"" + bestHand + "\"", ";")
            print("                :nome \"" + nomeJogador + "\"", ".")'''

            #idJogadores.append(idJogador)

        nomeJogador = ""
        i += 1

def readFileJogadores(file):
    with open(file) as f:
        data = json.load(f)

    birthCountry = ""

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'birthCountry':
                birthCountry = dicionario[valores]
        
        if not(codigoPaises.__contains__(birthCountry)):
            codigoPaises.append(birthCountry)

        i += 1

def readFilePaises(file):
    with open(file) as f:
        data = json.load(f)

    nomePais = ""
    codigoPais = ""

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'NomePais':
                nomePais = dicionario[valores]
            if valores == 'Codigo':
                codigoPais = dicionario[valores]
    
        dicionarioPaises[codigoPais] = nomePais

        i += 1

def check(file):
    with open(file) as f:
        data = json.load(f)

    nomePais = ""
    codigoPais = ""

    print("O ficheiro tem", str(len(data)), "registos")

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'NomePais':
                nomePais = dicionario[valores]
            if valores == 'Codigo':
                codigoPais = dicionario[valores]
    
        dicionarioPaises[codigoPais] = nomePais

        i += 1

check('./paises/paisesCodigo.json')
readFile('jogadores.json')

#print("O tamanho do conjunto de códigos é de :", verificaNomes.__len__())

#for key, val in sorted(dicionarioPaises.items(), key=lambda x : x[1], reverse=False):
    #print("Chave: ", key, "-> valor:", val)