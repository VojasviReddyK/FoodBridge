from flask import Flask, session, url_for, redirect, render_template, request, abort, flash
import pickle
import numpy as np
from database import *
app = Flask(__name__,static_url_path='/static')
app.secret_key = os.urandom(24)
from gtts import gTTS
import os
import requests
app = Flask(__name__)
app.secret_key = os.urandom(24)


app.config['UPLOAD_FOLDER'] = 'static/uploads'
@app.route('/')
def m():
    return render_template('main.html')

@app.route('/dl')
def dl():
    return render_template('dolog.html')

@app.route('/dr')
def dr():
    return render_template('doreg.html')



@app.route('/vl')
def vl():
    return render_template('vollog.html')

@app.route('/vr')
def vr():
    return render_template('volreg.html')






@app.route('/al')
def al():
    return render_template('acclogin.html')

@app.route('/ar')
def ar():
    return render_template('accregister.html')



@app.route('/ah')
def ah():
    return render_template('acchome.html')


@app.route('/addh')
def addh():
    return render_template('addh.html')

@app.route('/addi')
def addi():
    return render_template('addi.html')

@app.route('/dh')
def d():
    return render_template('dohome.html')


@app.route('/vh')
def v():
    return render_template('vhome.html')
@app.route('/loca')
def loca():
    return render_template('cl.html')

@app.route("/accregister",methods=['POST','GET'])
def signup():
    if request.method=='POST':
        username=request.form['username']
        email=request.form['email']
        password=request.form['password']
        add=request.form['address']
        ph=request.form['phone']
        Type=request.form['type']
        status = acc_reg(username,email,password,add,ph,Type)
        if status == 1:
            return render_template("/acclogin.html")
        else:
            return render_template("/accregister.html",m1="failed")        
    

@app.route("/acclogin",methods=['POST','GET'])
def login():
    if request.method=='POST':
        username=request.form['username']
        password=request.form['password']
        status = acc_loginact(request.form['username'], request.form['password'])
        print(status)
        if status == 1: 
            session['username'] = request.form['username']                                     
            return render_template("/acchome.html", m1="sucess")
        else:
            return render_template("/acclogin.html", m1="Login Failed")



@app.route("/volregister",methods=['POST','GET'])
def vsignup():
    if request.method=='POST':
        username=request.form['username']
        email=request.form['email']
        password=request.form['password']
        add=request.form['address']
        ph=request.form['phone']
        status = vol_reg(username,email,password,add,ph)
        if status == 1:
            return render_template("/vollog.html")
        else:
            return render_template("/volreg.html",m1="failed")        
    

@app.route("/vollogin",methods=['POST','GET'])
def vlogin():
    if request.method=='POST':
        username=request.form['username']
        password=request.form['password']
        status = vol_loginact(request.form['username'], request.form['password'])
        print(status)
        if status == 1: 
            session['username'] = request.form['username']                                     
            return render_template("/vhome.html", m1="sucess")
        else:
            return render_template("/vollog.html", m1="Login Failed")




@app.route("/doregister",methods=['POST','GET'])
def dsignup():
    if request.method=='POST':
        username=request.form['username']
        email=request.form['email']
        password=request.form['password']
        add=request.form['address']
        ph=request.form['phone']
        Type=request.form['type']
        status = do_reg(username,email,password,add,ph,Type)
        if status == 1:
            return render_template("/dolog.html")
        else:
            return render_template("/doreg.html",m1="failed")        
    

@app.route("/dologin",methods=['POST','GET'])
def dlogin():
    if request.method=='POST':
        username=request.form['username']
        password=request.form['password']
        status = do_loginact(request.form['username'], request.form['password'])
        print(status)
        if status == 1: 
            session['username'] = request.form['username']                                     
            return render_template("/dohome.html", m1="sucess")
        else:
            return render_template("/dolog.html", m1="Login Failed")

@app.route("/add_zone",methods=['POST','GET'])
def add_zone():  
    name=request.form['name']
    rate=request.form['rate']
    status = add_h(session['username'],name,rate)
    if status == 1:
        return render_template("/addh.html", m1="sucess")
    else:
        return render_template("/addh.html", m1="failed")



@app.route("/hmap")
def show_map():
    locations = hzoneview()
    return render_template('hmap.html', locations=locations)

@app.route("/hmap2")
def show_map2():
    rs=locv(session['username'])[0]
    s = request.args.get('param1')
    return render_template('h2.html',d=rs,s=s)

@app.route("/hmap3")
def show_map3():
    locations = hzoneview()
    return render_template('dhmap.html', locations=locations)

@app.route("/hmap4")
def show_map4():
    print(session['username'])
    rs=locd(session['username'])[0]
    s = request.args.get('param1')
    return render_template('dh2.html',d=rs,s=s)

@app.route("/add_item",methods=['POST','GET'])
def add_item():  
    item_name = request.form['item_name']
    quantity = request.form['quantity']
    print(session['username'],item_name,quantity)
    status = add_i(session['username'],item_name,quantity)
    if status == 1:
        return render_template("addi.html", m1="sucess")
    else:
        return render_template("addi.html", m1="failed")

@app.route("/send",methods=['POST','GET'])
def showitems():
    orders= sdo2(session['username'])
    return render_template('Donate.html',orders=orders)


@app.route("/donate2",methods=['POST','GET'])
def donate2():
    orders= sdo2(session['username'])
    return render_template('Donate.html',orders=orders)





@app.route("/process_order",methods=['POST','GET'])
def process_order():  
    oid= request.args.get('orderid')
    vol=vols()
    return render_template("d2.html",oid=oid,vol=vol)


@app.route("/process_order2",methods=['POST','GET'])
def process_order2():  
    oid= request.args.get('orderid')
    vname=request.args.get('vname')
    acc=accs()
    return render_template("d3.html",oid=oid,vol=vname,acc=acc)


@app.route("/process_order3",methods=['POST','GET'])
def process_order3():  
    oid= request.args.get('orderid')
    vname=request.args.get('vname')
    aname=request.args.get('aname')
    dname=session['username']
    status=doact(oid,vname,aname,dname)
    if status == 1:
        return render_template("donate.html", m1="sucess")
    else:
        return render_template("donate.html", m1="failed")


@app.route("/vds",methods=['POST','GET'])
def showitems6():
    orders= sdo(session['username'])
    return render_template('viewds.html',orders=orders)

@app.route("/view_req",methods=['POST','GET'])
def view_req():
    vrpd= vrp(session['username'])
    print(vrpd)
    return render_template('viewra.html',vrpd= vrpd)


@app.route("/view_req2",methods=['POST','GET'])
def view_req2():
    vrpd= vrp2(session['username'])
    print(vrpd)
    return render_template('viewaccr.html',vrpd= vrpd)

@app.route("/vreqotp1",methods=['POST','GET'])
def vreqotp1():
    oid= request.args.get('orderid')
    rotp1=rotp(oid,session['username'])
    if rotp1 == 1:
        return render_template('verv.html',oid=oid, m1="sucess")
    else:
        return render_template('verv.html',oid=oid, m1="failed")



@app.route("/vreqotp2",methods=['POST','GET'])
def vreqotp2():
    oid= request.args.get('orderid')
    rotp1=rotp2(oid,session['username'])
    if rotp1 == 1:
        return render_template('verv2.html',oid=oid, m1="sucess")
    else:
        return render_template('verv2.html',oid=oid, m1="failed")

@app.route("/check_otp",methods=['POST','GET'])
def check_otp():
    oid = request.form['oid']
    otp = request.form.get('otp')
    print(oid)
    rotp1=co(otp,oid)
    if rotp1 ==True:
        d="order picked up"
        return render_template('done.html',oid=oid,rotp1=rotp1,d=d, m1="sucess")
    else:
        d="otp dont match"
        return render_template('done.html',oid=oid,rotp1=rotp1,d=d, m1="failed")





@app.route("/check_otp2",methods=['POST','GET'])
def check_otp2():
    oid = request.form['oid']
    otp = request.form.get('otp')
    print(oid)
    rotp1=co2(otp,oid)
    if rotp1 ==True:
        d="order Delivered"
        return render_template('done2.html',oid=oid,rotp1=rotp1,d=d, m1="sucess")
    else:
        d="otp dont match"
        return render_template('done2.html',oid=oid,rotp1=rotp1,d=d, m1="failed")




@app.route("/vaac",methods=['POST','GET'])
def vaac():
    vap= vap2p(session['username'])
    return render_template('viewpacc.html',vad=vap)


@app.route("/c1",methods=['POST','GET'])
def c1():

    current_status=request.args.get('acs')
    acs = 'inactive' if current_status == 'active' else 'active'
    print(acs)
    vap= vap2(acs,session['username'])
    return render_template('acchome.html')



@app.route("/c2",methods=['POST','GET'])
def c2():
    l=request.form['updateLocation']
    ul=ulo(l,session['username'])
    return render_template('vhome.html')


if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)