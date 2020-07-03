#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import requests

#readFileJogadores('../jogadores.json')
#readFilePaises('paisesCodigo.json')
check('paisesCodigo.json')

print("O tamanho do conjunto de códigos é de :", verificaCodigos.__len__())

'''d = 0
for pais in codigoPaises:
    if str(dicionarioPaises.get(pais)) == 'None':
        print("Código", pais, "não está registado")
    else:
        d += 1
        #print("Código país:", pais, "-> país:", dicionarioPaises.get(pais))'''

#print("Existem", codigoPaises.__len__(), "países")
#print("Códigos dos países:", str(codigoPaises))
#print("Fez-se match com", d, "códigos")

#for key, val in sorted(dicionarioPaises.items(), key=lambda x : x[1], reverse=False):
    #print("Chave", key, "-> valor:", val)