from flask import Flask
print('Hello, World!')
from math import dist
from collections import OrderedDict
from flask import request
import json
from flask import jsonify, make_response
import pickle
app = Flask(__name__)   # Flask constructor

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



def calc(lat,long,inputLat,inputLong):
    point1 = (lat,long)
    point2 = (inputLat,inputLong);
    return dist(point1,point2);
    
 

       



def getOutput(usersDict,inputLat,inputLong):
    distanceDict = {}
    for uniqueId, user in usersDict.items():
        print(uniqueId, ":", user)
        distance = calc(user.lat,user.long,inputLat,inputLong)
        if distance not in distanceDict:
            distanceDict[distance] = []
        distanceDict[distance].append(user);
       
    outputDict = OrderedDict(sorted(distanceDict.items()))
    outputObject = {}
    for distance, user in outputDict.items():
        print("distance ")
        print(distance)
        usersList = outputDict[distance];
        outputObject[distance] = []
        #usersTempList = [];
        for user in usersList:
            print (user.getUniqueId())
            print ("....")
            tempList = [user.getUniqueId(),user.getName()]
            outputObject[distance].append(tempList)
    return outputObject

usersDict = {}

with open('saved_dictionary.pkl', 'rb') as f:
    usersDict = pickle.load(f)
    #inputLat = 56.23
    #inputLong = 23.1
    
 
user1 = User('chetna', 28.23,39.5,2001) 
print (type(user1.getUniqueId()));
usersDict[user1.getUniqueId()] = user1
#print (usersDict[1].getName())

user2 = User('manasvi', 24.21,36.5,5000) 
#print (type(user2.getUniqueId()));
usersDict[user2.getUniqueId()] = user2

user3 = User('neha', 2,3.2,7000) 
usersDict[user3.getUniqueId()] = user3

user4 = User('wadhwa', 2,3.2,6000) 
usersDict[user4.getUniqueId()] = user4



@app.route('/findnearby',methods=['GET'])
def findnearby():
    inputLat = request.args.get('lat',type=float)  
    inputLong  = request.args.get('long',type=float)
    outputDict = getOutput(usersDict,inputLat,inputLong)
    return jsonify(outputDict)
   
   
 
if __name__=='__main__':
   app.run()
 

 
        
        
 