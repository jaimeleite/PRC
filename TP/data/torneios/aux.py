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
                    print("Primeira letra do id do torneio:", str(idTorneio)[1:])
                    idTorneio = str(idTorneio)[1:]
                if str(idTorneio)[0] == "M":
                    if str(idTorneio) == "M020":
                        print("A converter:" + str(idTorneio) + " para 339")
                        idTorneio = "339"
                    if str(idTorneio) == "M001":
                        print("A converter:" + str(idTorneio) + " para 338")
                        idTorneio = "338"
                    if str(idTorneio) == "M004":
                        print("A converter:" + str(idTorneio) + " para 807")
                        idTorneio = "807"
                    if str(idTorneio) == "M006":
                        print("A converter:" + str(idTorneio) + " para 404")
                        idTorneio = "404"
                    if str(idTorneio) == "M007":
                        print("A converter:" + str(idTorneio) + " para 403")
                        idTorneio = "403"
                    if str(idTorneio) == "M021":
                        print("A converter:" + str(idTorneio) + " para 1536")
                        idTorneio = "1536"
                    if str(idTorneio) == "M009":
                        print("A converter:" + str(idTorneio) + " para 416")
                        idTorneio = "416"
                    if str(idTorneio) == "M010":
                        print("A converter:" + str(idTorneio) + " para 440")
                        idTorneio = "440"
                    if str(idTorneio) == "M035":
                        print("A converter:" + str(idTorneio) + " para 418")
                        idTorneio = "418"
                    if str(idTorneio) == "M024":
                        print("A converter:" + str(idTorneio) + " para 422")
                        idTorneio = "422"
                    if str(idTorneio) == "M015":
                        print("A converter:" + str(idTorneio) + " para 747")
                        idTorneio = "747"
                    if str(idTorneio) == "M016":
                        print("A converter:" + str(idTorneio) + " para 741")
                        idTorneio = "741"
                    if str(idTorneio) == "M014":
                        print("A converter:" + str(idTorneio) + " para 438")
                        idTorneio = "438"
                    if str(idTorneio) == "M052":
                        print("A converter:" + str(idTorneio) + " para 6932")
                        idTorneio = "6932"
            if valores == 'tourney_level':
                dificuldade = str(dicionario[valores])
            if valores == 'tourney_name':
                nomeTorneiro = str(dicionario[valores])
            if valores == 'surface':
                superficie = dicionario[valores]
        if(not(idTorneios.__contains__(idTorneio)) and not(str(nomeTorneiro).__contains__("Davis Cup"))):
            idTorneios.append(idTorneio)

        i += 1

#------------------------------------------------------------------------------------------
i = 2020
while i >= 2016:
    readFile('jogos_' + str(i) + '.json')
    i -= 1

print("Torneios:", idTorneios)
print("Existem ", idTorneios.__len__(), "torneios")