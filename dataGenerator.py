from flask import Flask
print('Hello, World!')
from math import dist
from collections import OrderedDict
from flask import request
import json
import random
import pickle 
import string




class User():
    def getName(self):
       return self.name

    def getLat(self):
       return self.lat
     
    def getLong(self):
       return self.long
       
    def getUniqueId(self):
       return self.uniqueId

    def __init__(self,name, lat, long,uniqueId):
       self.name = name
       self.lat = lat
       self.long = long
       self.uniqueId = uniqueId

def randomword(length):
   letters = string.ascii_lowercase
   return ''.join(random.choice(letters) for i in range(length))
usersDict = {}
for i in range(1,1000):
    uniqueId = i;
    lat = round(random.uniform(10, 120), 2)
    long = round(random.uniform(90, 180), 2)
    name = randomword(random.randint(5, 9))
    user = User(name,lat,long,uniqueId)
    usersDict[uniqueId] = user
    
with open('saved_dictionary.pkl', 'wb') as f:
    pickle.dump(usersDict, f)


        
 