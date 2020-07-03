#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests

torneios = {}
idTorneios = []
idRondas = []

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

    i = 0
    while i < len(data):
        dicionario = {}
        dicionario.update(data[i])
        for valores in dicionario:
            if valores == 'tourney_id':
                ano = str(dicionario[valores]).split("-")[0]
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
            if valores == 'winner_id':
                jogadorVencedor = str(dicionario[valores])
            if valores == 'loser_id':
                jogadorPerdedor = str(dicionario[valores])
            if valores == 'round':
                ronda = dicionario[valores]
                if ronda == "R128":
                    designacaoRonda = "FirstRound_" + str(ano) + "_" + str(idTorneio)
                if ronda == "R64":
                    designacaoRonda = "SecondRound_" + str(ano) + "_" + str(idTorneio)
                if ronda == "R32":
                    designacaoRonda = "ThirdRound_" + str(ano) + "_" + str(idTorneio)
                if ronda == "R16":
                    designacaoRonda = "ForthRound_" + str(ano) + "_" + str(idTorneio)
                if ronda == "QF":
                    designacaoRonda = "Quarterfinal_" + str(ano) + "_" + str(idTorneio)
                if ronda == "SF":
                    designacaoRonda = "Semifinal_" + str(ano) + "_" + str(idTorneio)
                if ronda == "F":
                    designacaoRonda = "Final_" + str(ano) + "_" + str(idTorneio)
            if valores == 'match_num':
                designacaoPartida = str(ano) + "_" + str(idTorneio) + "_" + str(dicionario[valores])
            if valores == "score":
                score = str(dicionario[valores])
            if valores == "minutes":
                if dicionario[valores] == "":
                    duracao = -1
                else:
                    duracao = dicionario[valores]

        if not(str(nomeTorneiro).__contains__("Davis Cup")) and (dificuldade != "F") and (dificuldade != "C") and not(idRondas.__contains__(designacaoRonda)) and ronda != "RR":
            idRondas.append(designacaoRonda)

        #------------------------------------------Criar rondas-----------------------------------------------#
            print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/tenis#" + str(designacaoRonda))
            print(":" + designacaoRonda, "rdf:type owl:NamedIndividual ,")
            print("                            :Fase ,")
            if ronda == "R128":
                print("                            :FirstRound ;")
            if ronda == "R64":
                print("                            :SecondRound ;")
            if ronda == "R32":
                print("                            :ThirdRound ;")
            if ronda == "R16":
                print("                            :ForthRound ;")
            if ronda == "QF":
                print("                            :Quarterfinal ;")
            if ronda == "SF":
                print("                            :Semifinal ;")
            if ronda == "F":
                print("                            :Final ;")
            print("                    :éFaseDe :torneio_" + str(idTorneio) + " ;")
            print("                            :ano " + str(ficheiro), ";")
            if ronda == "R128":
                print("                            :nome \"Primeira Ronda\" .")
            if ronda == "R64":
                print("                            :nome \"Segunda Ronda\" .")
            if ronda == "R32":
                print("                            :nome \"Terceira Ronda\" .")
            if ronda == "R16":
                print("                            :nome \"Quarta Ronda\" .")
            if ronda == "QF":
                print("                            :nome \"Quartos de final\" .")
            if ronda == "SF":
                print("                            :nome \"Meias-finais\" .")
            if ronda == "F":
                print("                            :nome \"Final\" .")

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
        

        if not(str(nomeTorneiro).__contains__("Davis Cup")) and (dificuldade != "F") and (dificuldade != "C") and ronda != "RR":
            print("###  http://www.semanticweb.org/jaime/ontologies/2020/2/tenis#Partida_" + str(designacaoPartida))
            print(":Partida_" + designacaoPartida, "rdf:type owl:NamedIndividual ,")
            print("                            :Partida ;")
            print("                    :temPerdedor :jogador_" + str(jogadorPerdedor), ";")
            print("                    :temVencedor :jogador_" + str(jogadorVencedor), ";")
            print("                    :éPartidaDe :" + str(designacaoRonda), ";")
            print("                    :resultado \"" + str(score) +  "\"", ";")
            print("                    :duracao " + str(duracao), ".")
            print("Jogador vencedor:", jogadorVencedor)
            print("Jogador perdedor:", jogadorPerdedor)
            print("Ronda:", designacaoRonda)
            print("Partida:", designacaoPartida)
            print("Score:", score)
            print("Duração:", duracao)'''

        i += 1
        #else:
            #break

#------------------------------------------------------------------------------------------------------------------------------
ficheiro = 2020
while ficheiro >= 1968:
    readFile('./json/jogos_' + str(ficheiro) + '.json')
    ficheiro -= 1

#j = 0
#print("Rondas:", idRondas)
'''while j < idRondas.__len__():
    print("Ronda:", idRondas[j] + "\n")
    j += 1'''

#print("Existem ", idRondas.__len__(), "rondas")