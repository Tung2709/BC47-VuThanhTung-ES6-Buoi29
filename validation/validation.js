const getElement = (selector) => document.querySelector(selector);
const getElementAll = (selector) => document.querySelectorAll(selector);
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
	const letterNumber =  /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.*[^ a-zA-Z0-9]).*$/;
	// const letterNumber = /^[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
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
	checkEmty(id){
		const value = getElement(id).value
		return !value.trim().length;
	}
}
export {VALIDATION}