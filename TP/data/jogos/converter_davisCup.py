#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests

torneios = {}
idTorneios = []
idRondas = []
teams = {}

ficheiro = 0

def readFile(file):
    with open(file) as f:
        data = json.load(f)

    ano = ""
    idTorneio = ""
    dificuldade = ""
    nomeTorneiro = ""
    superficie = ""
    ronda = ""
    designacaoRonda = ""
    partidaNum = ""
    jogadorVencedor = ""
    jogadorPerdedor = ""
    designacaoPartida = ""
    score = ""
    duracao = ""
    worldGroup = 0
    fase = ""
    paisPerdedor = ""
    paisVencedor = ""
    paisJogador = {}

    d = 0
    i = 0
    while i < len(data):
        #if i == 0:
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'tourney_id':
                ano = str(dicionario[valores]).split("-")[0]
                idTorneioAux = str(dicionario[valores]).split("-")
                idTorneio = ""
                c = 0
                for idT in idTorneioAux:
                    if c != 0:
                        idTorneio += str(idT)
                    c += 1
                '''idTorneio = str(dicionario[valores]).split("-")[1]
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
                        idTorneio = "6932"'''
            if valores == 'tourney_name':
                designacaoRonda = ""
                nomeTorneiro = str(dicionario[valores])
                if str(nomeTorneiro).__contains__("Davis Cup"):
                    filterPart = str(nomeTorneiro).split(' ')
                    worldGroup = 0
                    if filterPart[2] == 'WG':
                        worldGroup = 1
                        fase = str(filterPart[3]).split(':')[0]
                        if str(fase) == 'R1':
                            designacaoRonda += "FirstRound_" + str(ano) + "_" + "DavisCup"
                        if str(fase) == 'QF':
                            designacaoRonda += "Quarterfinal_" + str(ano) + "_" + "DavisCup"
                        if str(fase) == 'SF':
                            designacaoRonda += "Semifinal_" + str(ano) + "_" + "DavisCup"
                        if str(fase) == 'F':
                            designacaoRonda += "Final_" + str(ano) + "_" + "DavisCup"                            
                        if str(fase) == 'CR':
                            designacaoRonda += "Challenger_" + str(ano) + "_" + "DavisCup"
            if valores == 'surface':
                superficie = dicionario[valores]
            if valores == 'winner_id':
                jogadorVencedor = str(dicionario[valores])
            if valores == 'loser_id':
                jogadorPerdedor = str(dicionario[valores])
            if valores == 'match_num':
                designacaoPartida = "Partida_" + str(ano) + "_DavisCup_" + str(dicionario[valores]) + "_" + str(idTorneio)
            if valores == "score":
                score = str(dicionario[valores])
            if valores == "minutes":
                if dicionario[valores] == "":
                    duracao = -1
                else:
                    duracao = dicionario[valores]
            if valores == "loser_ioc":
                paisPerdedor = str(dicionario[valores])
            if valores == "winner_ioc":
                paisVencedor = str(dicionario[valores])

        #------------------------------------------Criar rondas-----------------------------------------------#
        '''if (dificuldade != "F") and (dificuldade != "C") and not(idRondas.__contains__(designacaoRonda)) and (designacaoRonda != "") and (fase != "PO"):
            #idRondas.append(designacaoRonda)
            #print("Nome da partida:", nomeTorneiro)
            #print("Ronda:", designacaoRonda)

            print("###  http://www.semanticweb.org/jaime/ontologies/2020/3/tenis#" + str(designacaoRonda))
            print(":" + str(designacaoRonda), "rdf:type owl:NamedIndividual ,")
            print("                            :Fase ,")
            if str(fase) == "R1":
                print("                            :FirstRound ;")
            if str(fase) == "QF":
                print("                            :Quarterfinal ;")
            if str(fase) == "SF":
                print("                            :Semifinal ;")
            if str(fase) == "F":
                print("                            :Final ;")
            if str(fase) == "CR":
                print("                            :Challenger ;")
            print("        :éFaseDe :torneio_DavisCup ;")
            print("                            :ano " + str(ficheiro), ";")
            if str(fase) == "R1":
                print("                            :nome \"Primeira Ronda\" .")
            if str(fase) == "QF":
                print("                            :nome \"Quartos de final\" .")
            if str(fase) == "SF":
                print("                            :nome \"Meias-finais\" .")
            if str(fase) == "F":
                print("                            :nome \"Final\" .")
            if str(fase) == "CR":
                print("                            :nome \"Challenge\" .")

            idRondas.append(designacaoRonda)'''
            #d += 1

        #------------------------------------------Criar partidas-----------------------------------------------#
        '''
            ###  http://www.semanticweb.org/jaime/ontologies/2020/2/tenis#Partida_2015_560_1
            :Partida_2015_560_1 rdf:type owl:NamedIndividual ,
                                        :Partida ;
                                :temPerdedor :jogador_105154 ;
                                :temVencedor :jogador_104925 ;
                                :éPartidaDe :FirstRound_2015_560 ;
                                :resultado "6-1 6-1 6-1" ;
                                :duracao 41 .
        '''
        if str(fase) != 'RR':
            if (str(nomeTorneiro).__contains__("Davis Cup")) and (worldGroup == 1) and (fase != "PO"):
                print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/tenis#" + designacaoPartida)
                print(":" + designacaoPartida, "rdf:type owl:NamedIndividual ,")
                print("                            :Partida ;")
                print("                    :temPerdedor :jogador_" + str(jogadorPerdedor), ";")
                print("                    :temVencedor :jogador_" + str(jogadorVencedor), ";")
                print("                    :éPartidaDe :" + designacaoRonda, ";")
                print("                    :resultado \"" + str(score) +  "\"", ";")
                print("                    :duracao " + str(duracao), ".")

                d += 1

                paPerdedor = str(paisPerdedor) + "-2015"
                paVencedor = str(paisVencedor) + "-2015"
                
                if str(paisJogador.get(paPerdedor)) == 'None':
                    paisJogador[paPerdedor] = []
                if str(paisJogador.get(paVencedor)) == 'None':
                    paisJogador[paVencedor] = []
                
                paisJogador[paPerdedor].append(str(jogadorPerdedor))
                paisJogador[paVencedor].append(str(jogadorVencedor))
                
        i += 1

#------------------------------------------------------------------------------------------------------------------------------
ficheiro = 1971
while ficheiro >= 1968:
    readFile('./json/jogos_' + str(ficheiro) + '.json')
    #print("Equipas:", teams)
    ficheiro -= 1

#j = 0
#print("Rondas:", idRondas)
'''while j < idRondas.__len__():
    print("Ronda:", idRondas[j] + "\n")
    j += 1'''

#print("Existem ", idRondas.__len__(), "rondas")
