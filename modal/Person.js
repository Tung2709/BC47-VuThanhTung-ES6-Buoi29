class Person{
	constructor(id,name,adress,email){
		this.id=id
		this.name=name
		this.adress=adress
		this.email=email
	}
}

class Student extends Person{
	constructor(id,name,adress,email,toan,ly,hoa){
		super(id,name,adress,email)
		this.toan=toan
		this.ly=ly
		this.hoa=hoa
	}
	tinhTB(){
		return (Number(this.toan)+Number(this.hoa)+Number(this.ly))/3
	}
}

class Teacher extends Person{
	constructor(id,name,adress,email,date,sale){
		super(id,name,adress,email)
		this.date=date
		this.sale=sale
	}
	calSale(){
		return this.date*this.sale
	}
}

class Customer extends Person{
	constructor(id,name,adress,email,nameCompany,bill,feedback){
		super(id,name,adress,email)
		this.nameCompany=nameCompany
		this.bill=bill
		this.feedback=feedback
	}
}

export {Student,Teacher,Customer}