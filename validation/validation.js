const getElement = (selector) => document.querySelector(selector);
const getElementAll = (selector) => document.querySelectorAll(selector);
const GetItem = (key) => JSON.parse(localStorage.getItem(key));
const VALIDATION={
	checkID(id,letter){
	const value = getElement(id).value
	const arrayValue=value.split("");
	const arrayLetter=letter.split("");
	for(let i=0;i<arrayLetter.length;i++){
		if(arrayLetter[i]!=arrayValue[i]){
			return false
		}
	}
	return true
	},
	checkLetter(id){
	var letters = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
	const value = getElement(id).value
	return letters.test(value)
	},
	checkLetterNumber(id){
	// const letterNumber =  /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*[^ a-zA-Z0-9]).*$/;
	const letterNumber =  /^(?=.*[0-9])(?=.*[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_])(?!.*[^ a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]).*$/;
	return letterNumber.test(getElement(id).value)
	},
	checkLength(id,min,max){
		const value = getElement(id).value
		const e=min
		if(value.length<min||value.length>max){
			return false
		}
		return true
	},
	checkLetterOrNumber(id){
		const letterNumber =  /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*[^ a-zA-Z0-9]).*$/;
		return letterNumber.test(getElement(id).value)
		},
		checkLength(id,min,max){
			const value = getElement(id).value
			const e=min
			if(value.length<min||value.length>max){
				return false
			}
			return true
		},
	checkEmail(id){
		var email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const value = getElement(id).value
		return email.test(value)
	},
	checkNumber(id) {
		const value = getElement(id).value
		return /^-?\d+$/.test(value);
	},
	checkMark(id) {
		const value = getElement(id).value
		return /^-?\d+$/.test(value)&&value>=0&&value<=10;
	},
	checkEmty(id){
		const value = getElement(id).value
		return !value.trim().length;
	},
	checktrung(id,type){
	const value = getElement(id).value
	const student=GetItem("student")
	const teacher=GetItem("teacher")
	const customer=GetItem("customer")
	let check=false
	if(type==="student"){
		student.forEach(e => {
			if(e.id===value){
				check=true
			}
		});
	}else if(type==="teacher"){
		teacher.forEach(e => {
			if(e.id===value){
				check=true
			}
		});
	}else if(type==="customer"){
		customer.forEach(e => {
			if(e.id===value){
				check=true
			}
		});
	}
	return check
	}
}
export {VALIDATION}