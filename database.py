import sqlite3
import hashlib
import datetime
import MySQLdb
from flask import session
from datetime import datetime
import matplotlib.pyplot as plt
import numpy as np
import argparse
import cv2
import os
import numpy as np
 
import os
 
import cv2
import pandas as pd


from sendmail import *
import random
import string
def generate_otp(length=6):
    # Define characters to use for generating OTP
    characters = string.digits

    # Generate OTP using random.choice() for each character
    otp = ''.join(random.choice(characters) for _ in range(length))

    return otp
 
 
 
 

def db_connect():
    _conn = MySQLdb.connect(host="localhost", user="root",
                            passwd="root", db="empfood")
    c = _conn.cursor()

    return c, _conn

# -------------------------------register-----------------------------------------------------------------
def acc_reg(username,email,password,add,ph):
    try:
        status=acc_loginact(username, password)
        if status==1:
            return 0
        c, conn = db_connect()
        print(username, password, email)
        j = c.execute("INSERT INTO acc (username, email, password, phno, address) VALUES (%s, %s, %s, %s, %s)", 
               (username, email, password, ph, add))
        conn.commit()
        conn.close()
        print(j)
        return j
    except Exception as e:
        print(e)
        return(str(e))
    
     
# -------------------------------------Login --------------------------------------
def acc_loginact(username, password):
    try:
        c, conn = db_connect()
        j = c.execute("select * from acc where username='" +
                      username+"' and password='"+password+"'")
        data = c.fetchall()
        print(data)     
       
        c.fetchall()
        conn.close()
        return j
    except Exception as e:
        return(str(e))



#-------------------------vol------------------------------
def vol_reg(username,email,password,add,ph):
    try:
        status=vol_loginact(username, password)
        if status==1:
            return 0
        c, conn = db_connect()
        print(username, password, email)
        j = c.execute("INSERT INTO vol (username, email, password, phno, loc) VALUES (%s, %s, %s, %s, %s)", 
               (username, email, password, ph, add))
        conn.commit()
        conn.close()
        print(j)
        return j
    except Exception as e:
        print(e)
        return(str(e))
    
     
# -------------------------------------vol Login --------------------------------------
def vol_loginact(username, password):
    try:
        c, conn = db_connect()
        j = c.execute("select * from vol where username='" +
                      username+"' and password='"+password+"'")
        data = c.fetchall()
        print(data)     
       
        c.fetchall()
        conn.close()
        return j
    except Exception as e:
        return(str(e))




# -------------------------------aregister-----------------------------------------------------------------
def do_reg(username,email,password,add,ph,type):
    try:
        status=do_loginact(username, password)
        if status==1:
            return 0
        c, conn = db_connect()
        print(username, password, email)
        j = c.execute("INSERT INTO don (username, email, password, phone, address,type) VALUES (%s, %s, %s, %s, %s,%s)", 
               (username, email, password, ph, add,type))
        conn.commit()
        conn.close()
        print(j)
        return j
    except Exception as e:
        print(e)
        return(str(e))
    
     
# -------------------------------------aLogin --------------------------------------
def do_loginact(username, password):
    try:
        c, conn = db_connect()
        j = c.execute("select * from don where username='" +
                      username+"' and password='"+password+"'")
        data = c.fetchall()
        print(data)     
       
        c.fetchall()
        conn.close()
        return j
    except Exception as e:
        return(str(e))

def add_h(username,name,rate):
    try:
        c, conn = db_connect()
        j = c.execute("INSERT INTO hunger_zone (username, name, rate) VALUES (%s, %s, %s)", 
               (username,name,rate))
        conn.commit()
        conn.close()
        print(j)
        return j
    except Exception as e:
        print(e)
        return(str(e))
    


def hzoneview():
    try:
        c, conn = db_connect()
        c.execute("select name,rate from hunger_zone")
        result=c.fetchall()
        conn.commit()
        conn.close()
        print(result)
        return result 
    except Exception as e:
        return(str(e))   

def locv(username):
    try:
        c, conn = db_connect()
        c.execute("select loc from vol where username='" +
                      username+"'")
        result=c.fetchall()
        conn.commit()
        conn.close()
        print(result)
        return result 
    except Exception as e:
        return(str(e))  



def sdo(username):
    try:
        c, conn = db_connect()
        c.execute("select * from order_details where username='" +
                      username+"'")
        result=c.fetchall()
        conn.commit()
        conn.close()
        print(result)
        return result 
    except Exception as e:
        return(str(e)) 

def locd(username):
    try:
        print(username)
        c, conn = db_connect()
        c.execute("select address from don where username='" +
                      username+"'")
        result=c.fetchall()
        conn.commit()
        conn.close()
        print(result)
        return result 
    except Exception as e:
        return(str(e))  



def add_i(username,item_name,quantity):
    try:
        otp1=generate_otp()
        otp2=generate_otp()
        print(otp1,otp2)

        c, conn = db_connect()
        j = c.execute("INSERT order_details (username,item_name,quantity,otp1,otp2) VALUES (%s, %s,%s,%s,%s)", 
               (username,item_name,quantity,otp1,otp2))
        conn.commit()
        conn.close()
        print(j)
        return j
    except Exception as e:
        print(e)
        return(str(e))
def vols():
    try:
        c, conn = db_connect()
        c.execute("select * from vol ")
        result=c.fetchall()
        conn.commit()
        conn.close()
        print(result)
        return result 
    except Exception as e:
        return(str(e))  

def accs():
    try:
        c, conn = db_connect()
        c.execute("select * from acc where st='active' ")
        result=c.fetchall()
        conn.commit()
        conn.close()
        print(result)
        return result 
    except Exception as e:
        return(str(e))




def doact(oid,vname,aname,dname):
    try:
        c, conn = db_connect()

        i=c.execute("UPDATE order_details SET delivery_status = 'waiting for Pickup' where id='"+oid+"'")
        j = c.execute("INSERT os (oid,vname,aname,dname) VALUES (%s, %s,%s,%s)", 
               (oid,vname,aname,dname))
        conn.commit()
        conn.close()
        print(j)
        return j
    except Exception as e:
        print(e)
        return(str(e))


def sdo2(username):
    try:
        c, conn = db_connect()
        c.execute("select * from order_details where username='" +
                      username+"' and delivery_status = 'Pending'")
        result=c.fetchall()
        conn.commit()
        conn.close()
        print(result)
        return result 
    except Exception as e:
        return(str(e))



def vrp(username):
    try:
        c, conn = db_connect()
        c.execute("select * from os where vname='" +
                      username+"' and vs= 'waiting for Pickup'")
        result=c.fetchall()
        conn.commit()
        conn.close()
        print(result)
        return result 
    except Exception as e:
        return(str(e))


def rotp(oid, vname):
    try:
        c, conn = db_connect()
        
        # Execute first query to get the email
        c.execute("SELECT email FROM vol WHERE username='" + vname + "'")
        rs1 = c.fetchall()
        if rs1:
            em = rs1[0][0]  # Extracting the email from the result
            print(rs1)
        else:
            raise Exception("No email found for username: " + vname)
        
        # Execute second query to get the OTP
        j = c.execute("SELECT otp1 FROM order_details WHERE id='" + oid + "'")
        rs2 = c.fetchall()
        if rs2:
            pas = rs2[0][0]  # Extracting the OTP from the result
            print(rs2)
        else:
            raise Exception("No OTP found for order ID: " + oid)
        
        # Call function to send OTP
        sendotp(em, pas)
        
        conn.commit()
        conn.close()
        
        return j
    except Exception as e:
        return str(e)



def rotp2(oid, vname):
    try:
        c, conn = db_connect()
        
        # Execute first query to get the email
        c.execute("SELECT email FROM acc WHERE username='" + vname + "'")
        rs1 = c.fetchall()
        if rs1:
            em = rs1[0][0]  # Extracting the email from the result
            print(rs1)
        else:
            raise Exception("No email found for username: " + vname)
        
        # Execute second query to get the OTP
        j = c.execute("SELECT otp2 FROM order_details WHERE id='" + oid + "'")
        rs2 = c.fetchall()
        if rs2:
            pas = rs2[0][0]  # Extracting the OTP from the result
            print(rs2)
        else:
            raise Exception("No OTP found for order ID: " + oid)
        
        # Call function to send OTP
        sendotp(em, pas)
        
        conn.commit()
        conn.close()
        
        return j
    except Exception as e:
        return str(e)




def co(otp, username):
    try:
        print(otp, username)
        c, conn = db_connect()
        
        # Check if there are matching records in order_details table
        c.execute("SELECT COUNT(*) FROM order_details WHERE otp1 = %s AND id = %s AND delivery_status = 'waiting for Pickup'", (otp, username))
        result = c.fetchone()[0]  # Get the count of rows that match the criteria
        print(result)
        
        if result > 0:
            # Update delivery status to 'In Progress' in order_details table
            c.execute("UPDATE order_details SET delivery_status = 'In Progress' WHERE otp1 = %s AND id = %s AND delivery_status = 'waiting for Pickup'", (otp, username))
            
            # Update vs column to 'In Progress' in os table
            c.execute("UPDATE os SET vs = 'In Progress' WHERE oid = %s", (username))
            
            conn.commit()
        
        conn.close()
        return result > 0  # Return True if there are rows that match the criteria, False otherwise
    except Exception as e:
        print("Error:", e)
        return False  # Return False in case of any errors





def co2(otp, username):
    try:
        print(otp, username)
        c, conn = db_connect()
        
        # Check if there are matching records in order_details table
        c.execute("SELECT COUNT(*) FROM order_details WHERE otp2 = %s AND id = %s AND delivery_status = 'In Progress'", (otp, username))
        result = c.fetchone()[0]  # Get the count of rows that match the criteria
        print(result)
        
        if result > 0:
            # Update delivery status to 'In Progress' in order_details table
            c.execute("UPDATE order_details SET delivery_status = 'Delivered' WHERE otp2 = %s AND id = %s AND delivery_status = 'In Progress'", (otp, username))
            
            # Update vs column to 'In Progress' in os table
            c.execute("UPDATE os SET vs = 'Delivered' WHERE oid = %s", (username))
            
            conn.commit()
        
        conn.close()
        return result > 0  # Return True if there are rows that match the criteria, False otherwise
    except Exception as e:
        print("Error:", e)
        return False  # Return False in case of any errors




def vrp2(username):
    try:
        c, conn = db_connect()
        c.execute("select * from os where aname='" +
                      username+"' and vs= 'In Progress'")
        result=c.fetchall()
        conn.commit()
        conn.close()
        print(result)
        return result 
    except Exception as e:
        return(str(e))


def vap2p(username):
    try:
        c, conn = db_connect()
        c.execute("select * from acc where username='" +
                      username+"'")
        result=c.fetchall()
        conn.commit()
        conn.close()
        print(result)
        return result 
    except Exception as e:
        return(str(e))

def vap2(acs,username):
    try:
        c, conn = db_connect()
        c.execute("UPDATE acc SET st = %s WHERE username = %s", (acs,username))
        conn.commit()
        conn.close()
        print(i)
        return i
    except Exception as e:
        return(str(e))

def ulo(l,username):
    try:
        c, conn = db_connect()
        c.execute("UPDATE vol SET loc = %s WHERE username = %s", (l,username))
        conn.commit()
        conn.close()
        print(i)
        return i
    except Exception as e:
        return(str(e))

if __name__ == "__main__":
    print(db_connect())
