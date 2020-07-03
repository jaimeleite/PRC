#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests

torneios = {}
idTorneios = []

def readFile(file):
    with open(file) as f:
        data = json.load(f)

    idTorneio = ""
    dificuldade = ""
    nomeTorneiro = ""
    superficie = ""

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'tourney_id':
                idTorneio = str(dicionario[valores]).split("-")[1]
                if str(idTorneio)[0] == "0":
                    idTorneio = str(idTorneio)[1:]
                if str(idTorneio)[0] == "M":
                    if str(idTorneio) == "M020":
                        idTorneio = "339"
                    if str(idTorneio) == "M001":
                        idTorneio = "338"
                    if str(idTorneio) == "M004":
                        idTorneio = "807"
                    if str(idTorneio) == "M006":
                        idTorneio = "404"
                    if str(idTorneio) == "M007":
                        idTorneio = "403"
                    if str(idTorneio) == "M021":
                        idTorneio = "1536"
                    if str(idTorneio) == "M009":
                        idTorneio = "416"
                    if str(idTorneio) == "M010":
                        idTorneio = "440"
                    if str(idTorneio) == "M035":
                        idTorneio = "418"
                    if str(idTorneio) == "M024":
                        idTorneio = "422"
                    if str(idTorneio) == "M015":
                        idTorneio = "747"
                    if str(idTorneio) == "M016":
                        idTorneio = "741"
                    if str(idTorneio) == "M014":
                        idTorneio = "438"
                    if str(idTorneio) == "M052":
                        idTorneio = "6932"
            if valores == 'tourney_level':
                dificuldade = str(dicionario[valores])
            if valores == 'tourney_name':
                nomeTorneiro = str(dicionario[valores])
            if valores == 'surface':
                superficie = dicionario[valores]
        
        if(not(idTorneios.__contains__(idTorneio)) and not(str(nomeTorneiro).__contains__("Davis Cup")) and (dificuldade != "F") and (dificuldade != "C")):
            if dificuldade != "D":
                print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/tenis#torneio_" + idTorneio)
                print(":torneio_" + idTorneio,  "rdf:type owl:NamedIndividual ,")
                print("                    :Torneio ,")
                if dificuldade == "G":
                    print("                    :Grandslam ;")
                if dificuldade == "A":
                    print("                    :World_Tour ,")
                    print("                    :Small ;")
                if dificuldade == "M":
                    print("                    :World_Tour ,")
                    print("                    :Masters ;")                
                print("            :dificuldade \"" + dificuldade + "\" ;")
                print("            :nome \"" + nomeTorneiro + "\" ;")
                print("            :superfície \"" + superficie + "\" .")

                idTorneios.append(idTorneio)
                print("\n")

        i += 1

#------------------------------------------------------------------------------------------------------------------------------
i = 2020
while i >= 1968:
    readFile('../jogos/json/jogos_' + str(i) + '.json')
    i -= 1

#print("Torneios:", idTorneios)
#print("Existem ", idTorneios.__len__(), "torneios")