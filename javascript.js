var subClick;
function display(){
	spinner.style.display = 'none';
	check.style.display = 'none';
	document.getElementById("submit").style.display= 'block';
}

function display2(){
	spinner.style.display = 'block';
	check.style.display = 'none';
	document.getElementById("submit").style.display= 'none';
}

function createaccount(event){
	event.preventDefault();
	spinner.style.display = 'block';
	check.style.display = 'none';
	document.getElementById("submit").style.display= 'none';

	subClick=false;

	var n=document.getElementById("username").value;
	var e=document.getElementById("email").value;
	var p1=document.getElementById("p1").value;
	var p2=document.getElementById("p2").value;
	var fn=document.getElementById("fname").value;
	var ln=document.getElementById("lname").value;
	var Male= document.getElementById("male");
	var Female= document.getElementById("female");
	var Other= document.getElementById("other");
	var Cst= document.getElementById("type1");
	var Li= document.getElementById("type2");
	var home= document.getElementById("website").value;
	var city= document.getElementById("city").value;
	var add= document.getElementById("address").value;
	var phone= document.getElementById("phone_number").value;
	var agree= document.getElementById("agree");

	//String to character array convertion
	var pass1Array = [...p1];
	var pass2Array = [...p2];

	// validate the form
	var UsnameValid = validateUserName(n);
	var EmailValid = validateEmail(e,Li);
	var Pass1Valid = validatePass1(p1);
	var Pass2Valid = validatePass2(p2);
	var PassMatch = mismatch(pass1Array,pass2Array);
	var FnameValid = validateFname(fn);
	var LnameValid = validateLname(ln);
	var GenderValid = validateGender(Male, Female, Other);
	var StVsLi = validateStvsLi(Cst,Li);
	var HomeValid = validateHome(home);
	var CityValid = validateCity(city);
	var AddValid = validateAddress(add);
	var PhoneValid = validatePhone(phone);
	var AgreeValid = validateAgree(agree);

	// if valid, submit the form.
	if (UsnameValid && EmailValid && Pass1Valid && Pass2Valid && PassMatch && FnameValid && LnameValid && GenderValid && StVsLi && HomeValid && CityValid && AddValid && PhoneValid && AgreeValid) {
		alert("Demo only. No form was posted.");
		spinner.style.display = 'none';
		check.style.display = 'block';
		document.getElementById("submit").style.display= 'none';
	}
}

//Username validation
function validateUserName(n) {
	// check if the value is not empty
	if (n === "") {
		document.getElementById("userMsg").innerHTML= "<small>Please enter a username</small>";
		return false;
	}
	// validate username format
	const usNameRegex =
		/^[A-Za-z]{8,}$/; 

	if (!usNameRegex.test(n)) {
		document.getElementById("userMsg").innerHTML= "<small>The username must contain 8 or more characters </small>";
		return false;
	}
	document.getElementById("userMsg").innerHTML= "<small></small>";
	return true;
}

//Email validation
function validateEmail(e,Li) {
	// check if the value is not empty
	if (e === "") {
		document.getElementById("emailMsg").innerHTML= "<small>Please enter an email</small>";
		return false;
	}
	if (Li.checked){
		var Uoc= document.getElementById("uni1");
		var Helmepa= document.getElementById("uni2");
		var Tuc= document.getElementById("uni3");

		Uoc.checked = false;
		Helmepa.checked= false;
		Tuc.checked= false;
	}

	// validate email format
	const emailRegex=
		/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	const uocRegex = 
		/^([\w\.])+@edu\.uoc\.gr/;
		// Or use /^([\w\.])+\@([\w])+\.(uoc)+\.(gr)/;
	const helmepaRegex = 
		/^([\w\.])+@edu\.helmepa\.gr/;
	const tucRegex = 
		/^([\w\.])+@edu\.tuc\.gr/;

	var Uoc= document.getElementById("uni1");
	var Helmepa= document.getElementById("uni2");
	var Tuc= document.getElementById("uni3");
	
	if (Uoc.checked){
		if (!uocRegex.test(e)) {
			document.getElementById("emailMsg").innerHTML= "<small>Your email address must end with edu.uoc.gr .</small>";
			return false;
		}
	}else if (Helmepa.checked){
		if (!helmepaRegex.test(e)) {
			document.getElementById("emailMsg").innerHTML= "<small>Your email address must end with edu.helmepa.gr .</small>";
			return false;
		}	
	}else if (Tuc.checked){
		if (!tucRegex.test(e)) {
			document.getElementById("emailMsg").innerHTML= "<small>Your email address must end with edu.tuc.gr .</small>";
			return false;
		}
	}else{
		if (!emailRegex.test(e)) {
			document.getElementById("emailMsg").innerHTML= "<small>Please enter a correct email address.</small>";
			return false;
		}
	}
	
	document.getElementById("emailMsg").innerHTML= "<small></small>";
	return true;
}

//Password validation
function validatePass1(p1) {
	var passw=document.getElementById("p1").value;
	var strength= document.getElementById("strength1Msg");

	// check if the value is not empty
	if (p1 === "") {
		document.getElementById("password1Msg").innerHTML= "<small>Please enter a password.</small>";
		return false;
	}
	// validate password format
	const pass1Regex =
		/^(?=.{8,12}$).*(?=.*\d)(?=.*[A-Za-z])(?=.*[._%+-])/; 
	const p1Regex =
		/helmepa|uoc|tuc/;

	if (!pass1Regex.test(p1)||p1Regex.test(p1)) {
		if (!pass1Regex.test(p1) && p1Regex.test(p1)){
			document.getElementById("password1Msg").innerHTML= "<small>The password must contain at least one number, one letter, one symbol and at least 8 and not more than 12 characters. It must not contain helmepa, uoc and tuc.</small>";
		}else if (!pass1Regex.test(p1)){
			document.getElementById("password1Msg").innerHTML= "<small>The password must contain at least one number, one letter, one symbol and at least 8 and not more than 12 characters.</small>";
		}else if (p1Regex.test(p1)){
			document.getElementById("password1Msg").innerHTML= "<small>The password must not contain helmepa, uoc and tuc.</small>";
		}
		document.getElementById("strength1Msg").innerHTML= "<small></small>";
		return false;
	}else if (!weak(passw,strength)){
		document.getElementById("password1Msg").innerHTML= "<small>The password is weak</small>";
		return false;
	}
	document.getElementById("password1Msg").innerHTML= "<small></small>";
	return true;
}

//Verification password varidation
function validatePass2(p2) {
	var passw=document.getElementById("p2").value;
	var strength= document.getElementById("strength2Msg");

	// check if the value is not empty
	if (p2 === "") {
		document.getElementById("password2Msg").innerHTML= "<small>Please enter a verification password.</small>";
		return false;
	}
	// validate password format
	const pass2Regex =
		/^(?=.{8,12}$).*(?=.*\d)(?=.*[A-Za-z])(?=.*[._%+-])/; 
	const p2Regex =
		/helmepa|uoc|tuc/;

	if (!pass2Regex.test(p2)||p2Regex.test(p2)) {
		if (!pass2Regex.test(p2) && p2Regex.test(p2)){
			document.getElementById("password2Msg").innerHTML= "<small>The password must contain at least one number, one letter, one symbol and at least 8 and not more than 12 characters. It must not contain helmepa, uoc and tuc.</small>";
		}else if (!pass2Regex.test(p2)){
			document.getElementById("password2Msg").innerHTML= "<small>The password must contain at least one number, one letter, one symbol and at least 8 and not more than 12 characters.</small>";
		}else if (p2Regex.test(p2)){
			document.getElementById("password2Msg").innerHTML= "<small>The password must not contain helmepa, uoc and tuc.</small>";
		}
		document.getElementById("strength1Msg").innerHTML= "<small></small>";
		return false;
	}else if (!weak(passw,strength)){
		document.getElementById("password2Msg").innerHTML= "<small>The password is weak</small>";
		return false;
	}
	document.getElementById("password2Msg").innerHTML= "<small></small>";
	return true;
}

//Password 1 strength (use onchange instead of button)
function strength1(){
	document.getElementById("password1Msg").innerHTML= "<small></small>";
	document.getElementById("password2Msg").innerHTML= "<small></small>";
	var passw=document.getElementById("p1").value;
	var strength= document.getElementById("strength1Msg");
	subClick=true;
	weak(passw,strength);
}

//Password 2 strength (use onchange instead of button)
function strength2(){
	document.getElementById("password1Msg").innerHTML= "<small></small>";
	document.getElementById("password2Msg").innerHTML= "<small></small>";
	var passw=document.getElementById("p2").value;
	var strength= document.getElementById("strength2Msg");
	subClick=true;
	weak(passw,strength);
}

//Weak password check
function weak(passw,strength){
	var pa1= passw.length/2
	var digitsArr = passw.match(/\d+/g);
	var digitNum;

  	if (digitsArr) {
    	digitNum = digitsArr.join("").length;
  	}else{
		digitNum = 0;
	}
	if (digitNum>pa1||passw===""){
		if(subClick){
			strength.innerHTML= "<small>Weak password</small>";
		}else{
			strength.innerHTML= "<small></small>";
			return false;
		}
	}else if(symbol(passw)){
		if(subClick){
			strength.innerHTML= "<small>Strong password</small>";
		}else{
			strength.innerHTML= "<small></small>";
			return true;
		}
	}else{
		if(subClick){
			strength.innerHTML= "<small>Medium password</small>";
		}else{
			strength.innerHTML= "<small></small>";
			return true;
		}
	}
}

function symbol(passw){

	var i=0;
	var upper=false;
	var lower=false;

	if (passw.includes('.')){
		i++;
	}
	if (passw.includes('_')){
		i++;
	}
	if (passw.includes('%')){
		i++;
	}
	if (passw.includes('+')){
		i++;
	}
	if (passw.includes('-')){
		i++;
	}

	if (passw.match(/[A-Z]/g)){
		upper=true;
	}

	if (passw.match(/[a-z]/g)){
		lower=true;
	}
	
	if(i>1 && upper && lower){
		return true;
	}
	
	return false;
}


//Password mismatch
function mismatch(pass1Array,pass2Array){
	if (pass1Array.length != pass2Array.length){
		document.getElementById("mismatch").innerHTML= "<small>Password mismatch. The two passwords must be the same.</small>";
		return false;
	}else if (pass1Array.length === pass2Array.length){
		for (var i=0; i < pass1Array.length; i++){
			if (pass1Array[i] != pass2Array[i]){
				document.getElementById("mismatch").innerHTML= "<small>Password mismatch. The two passwords must be the same.</small>";
				return false;
			}
		}
		document.getElementById("mismatch").innerHTML= "<small></small>";
		return true;
	}
		
}
//Show password characters
function showp1(){
	var TogglePassword = document.getElementById("togglePassword1");
	var password = document.getElementById("p1");

	changetype(password,TogglePassword);
}

//Show verification password characters
function showp2(){
	var TogglePassword = document.getElementById("togglePassword2");
	var password = document.getElementById("p2");

	changetype(password,TogglePassword);
}

//Change type and icon toggler
function changetype(password,TogglePassword){
	// toggle the type attribute
    var type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

   	/*if (type === 'text'){
		TogglePassword.classList.add("bi bi-eye-slash");
		TogglePassword.classList.remove("bi bi-eye");
		if(TogglePassword=="togglePassword1"){
    		TogglePassword.innerHTML = '<i class="bi bi-eye-slash" onclick="showp1()"></i>';
		}else if(TogglePassword=="togglePassword2"){
			TogglePassword.innerHTML = '<i class="bi bi-eye-slash" onclick="showp2()"></i>';
		}
  	}else{
		TogglePassword.classList.add("bi bi-eye");
		TogglePassword.classList.remove("bi bi-eye-slash");
		if(TogglePassword==="togglePassword1"){
    		TogglePassword.innerHTML = '<i class="bi bi-eye" onclick="showp1()"></i>';
		}else if(TogglePassword==="togglePassword2"){
			TogglePassword.innerHTML = '<i class="bi bi-eye" onclick="showp2()"></i>';
		}
  	}*/
}

//First name validation
function validateFname(fn){
	// check if the value is not empty
	if (fn === "") {
		document.getElementById("fnMsg").innerHTML= "<small>Please enter a first name.</small>";
		return false;
	}
	// validate first name format
	const fNameRegex =
		/^[A-Za-z]{3,30}$/; 

	if (!fNameRegex.test(fn)) {
		document.getElementById("fnMsg").innerHTML= "<small>The first name must contain at least 3 and not more than 30 characters </small>";
		return false;
	}
	document.getElementById("fnMsg").innerHTML= "<small></small>";
	return true;
}

//Last name validation
function validateLname(ln){
	// check if the value is not empty
	if (ln === "") {
		document.getElementById("lnMsg").innerHTML= "<small>Please enter a last name.</small>";
		return false;
	}
	// validate first name format
	const lNameRegex =
		/^[A-Za-z]{3,30}$/; 

	if (!lNameRegex.test(ln)) {
		document.getElementById("lnMsg").innerHTML= "<small>The last name must contain at least 3 and not more than 30 characters </small>";
		return false;
	}
	document.getElementById("lnMsg").innerHTML= "<small></small>";
	return true;
}

//Checks if a gender is choosen
function validateGender(Male, Female, Other){
	if (Male.checked && Female.checked && Other.checked){
		document.getElementById("genderMsg").innerHTML= "<small>You can only choose one of the above options.</small>";
		Male.checked = false;
		Female.checked= false;
		Other.checked= false;
		return false;
	} else if (Male.checked || Female.checked || Other.checked){
		document.getElementById("genderMsg").innerHTML= "<small></small>";
		return true;
	} else{
		document.getElementById("genderMsg").innerHTML= "<small>Please choose one of the above options.</small>";
		return false;
	}
}

//Checks if type of person is choosen
function validateStvsLi(Cst,Li){
	if (Cst.checked && Li.checked){
		document.getElementById("csvsliMsg").innerHTML= "<small>You can only choose one of the above options.</small>";
		Cst.checked = false;
		Li.checked= false;
		return false;
	} else if (Cst.checked || Li.checked){
		document.getElementById("csvsliMsg").innerHTML= "<small></small>";
		CstVsLi(Cst,Li);
	} else{
		document.getElementById("csvsliMsg").innerHTML= "<small>Please choose one of the above options.</small>";
		return false;
	}
}

function changetype1(){
	var Cst= document.getElementById("type1");
	var Li= document.getElementById("type2");
	Cst.checked= true;
	Li.checked= false;
	fieldStudent.style.display = 'block';
	fieldLibrary.style.display = 'none';
	document.getElementById("Address").innerHTML= "<p>Home Address: </p>"
}

function changetype2(){
	var Cst= document.getElementById("type1");
	var Li= document.getElementById("type2");
	Cst.checked= false;
	Li.checked= true;
	fieldStudent.style.display = 'none';
	fieldLibrary.style.display = 'block';
	document.getElementById("Address").innerHTML= "<p>Library Address: </p>"
}

//Checks if kind of student is choosen
function validateStKind(UnGrad,PostGrad,PhD){
	if (UnGrad.checked && PostGrad.checked && PhD.checked){
		document.getElementById("stK_Msg").innerHTML= "<small>You can only choose one of the above options.</small>";
		UnGrad.checked = false;
		PostGrad.checked= false;
		PhD.checked= false;
		return false;
	} else if (UnGrad.checked || PostGrad.checked || PhD.checked){
		document.getElementById("stK_Msg").innerHTML= "<small></small>";
		return true;
	} else{
		document.getElementById("stK_Msg").innerHTML= "<small>Please choose one of the above options.</small>";
		return false;
	}
}

function changekind1(){
	var Un= document.getElementById("student1");
	var Post= document.getElementById("student2");
	var Ph= document.getElementById("student3");
	Un.checked = true;
	Post.checked= false;
	Ph.checked= false;
}

function changekind2(){
	var Un= document.getElementById("student1");
	var Post= document.getElementById("student2");
	var Ph= document.getElementById("student3");
	Un.checked = false;
	Post.checked= true;
	Ph.checked= false;
}

function changekind3(){
	var Un= document.getElementById("student1");
	var Post= document.getElementById("student2");
	var Ph= document.getElementById("student3");
	Un.checked = false;
	Post.checked= false;
	Ph.checked= true;
}

//Student id number validation
function validateStudentId(idnum) {
	// check if the value is not empty
	if (idnum === "") {
		document.getElementById("stId_Msg").innerHTML= "<small>Please enter your student id number.</small>";
		return false;
	}
	// validate username format
	const stIdRegex =
		/^(?=.{12}$).*(?=.*\d)/; 

	if (!stIdRegex.test(idnum)) {
		document.getElementById("stId_Msg").innerHTML= "<small>The student id number must contain 12 numbers.</small>";
		return false;
	}
	document.getElementById("stId_Msg").innerHTML= "<small></small>";
	return true;
}

//Starting and ending date of student Id validation
function validateIdDate(stdate,endate,UnGrad,PostGrad,PhD){
	var date1 = new Date(endate);
	var date2 = new Date(stdate); 
	var diffDate= (date1 - date2);
	var difference = Math.floor(diffDate/31536000000);
	if (stdate>=endate){
		document.getElementById("dateId_Msg").innerHTML= "<small>The ending date must be larger than the starting date.</small>";
		return false;
	}else if(UnGrad.checked){

		UnderGraduate(difference);

	}else if(PostGrad.checked){

		PostGraduate(difference);

	}else if(PhD.checked){

		PhDstudent(difference);
		
	}else{
		document.getElementById("dateId_Msg").innerHTML= "<small></small>";
		return true;
	}
}

function UnderGraduate(difference){
	if(difference>6){
		document.getElementById("dateId_Msg").innerHTML= "<small>The distance between the two dates for an Undergraduate must not be more than 6 years.</small>";
		return false;
	}else{
		document.getElementById("dateId_Msg").innerHTML= "<small></small>";
		return true;
	}
}

function PostGraduate(difference){
	if(difference>2){
		document.getElementById("dateId_Msg").innerHTML= "<small>The distance between the two dates for a Postgraduate must not be more than 2 years.</small>";
		return false;
	}else{
		document.getElementById("dateId_Msg").innerHTML= "<small></small>";
		return true;
	}
}

function PhDstudent(difference){
	if(difference>5){
		document.getElementById("dateId_Msg").innerHTML= "<small>The distance between the two dates for a Ph.D student must not be more than 5 years.</small>";
		return false;
	}else{
		document.getElementById("dateId_Msg").innerHTML= "<small></small>";
		return true;
	}
}

//Checks if university is choosen
function validateUni(){
	var Uoc= document.getElementById("uni1");
	var Helmepa= document.getElementById("uni2");
	var Tuc= document.getElementById("uni3");

	if (Uoc.checked && Helmepa.checked && Tuc.checked){
		document.getElementById("uni_Msg").innerHTML= "<small>You can only choose one of the above options.</small>";
		Uoc.checked = false;
		Helmepa.checked= false;
		Tuc.checked= false;
		return false;
	} else if (Uoc.checked || Helmepa.checked || Tuc.checked){
		document.getElementById("uni_Msg").innerHTML= "<small></small>";
		return true;
	} else{
		document.getElementById("uni_Msg").innerHTML= "<small>Please choose one of the above options.</small>";
		return false;
	}
}

function changeUni1(){
	var Uoc= document.getElementById("uni1");
	var Helmepa= document.getElementById("uni2");
	var Tuc= document.getElementById("uni3");
	Uoc.checked = true;
	Helmepa.checked= false;
	Tuc.checked= false;
}

function changeUni2(){
	var Uoc= document.getElementById("uni1");
	var Helmepa= document.getElementById("uni2");
	var Tuc= document.getElementById("uni3");
	Uoc.checked = false;
	Helmepa.checked= true;
	Tuc.checked= false;
}

function changeUni3(){
	var Uoc= document.getElementById("uni1");
	var Helmepa= document.getElementById("uni2");
	var Tuc= document.getElementById("uni3");
	Uoc.checked = false;
	Helmepa.checked= false;
	Tuc.checked= true;
}

//Department validation
function validateDep(dep){
	// check if the value is not empty
	if (dep === "") {
		document.getElementById("dep_Msg").innerHTML= "<small>Please enter a department.</small>";
		return false;
	}
	// validate department format
	const depRegex =
		/^[A-Za-z]{3,50}$/; 

	if (!depRegex.test(dep)) {
		document.getElementById("dep_Msg").innerHTML= "<small>Text with minimum 3 and maximum 50 characters. </small>";
		return false;
	}
	document.getElementById("dep_Msg").innerHTML= "<small></small>";
	return true;
}

//Homepage validation
function validateHome(home){
	// check if the value is not empty
	if (home === "") {
		document.getElementById("home_Msg").innerHTML= "<small>Enter a homepage if you want.</small>";
		return true;
	}
	// validate homepage format
	const homeRegex =
		/^(?=.{3,50}$).*(?=["https://"])(\w)+\.+(\w){2,4}$/;

	if (!homeRegex.test(home)) {
		document.getElementById("home_Msg").innerHTML= "<small>Include http:// and domain name at the end (.com). Text with minimum 3 and maximum 50 characters.</small>";
		return true;
	}
	document.getElementById("home_Msg").innerHTML= "<small></small>";
	return true;
}

//City validation
function validateCity(city){
	// check if the value is not empty
	if (city === "") {
		document.getElementById("city_Msg").innerHTML= "<small>Enter a city if you want.</small>";
		return true;
	}
	// validate city format
	const cityRegex =
		/^[A-Za-z]{3,50}$/; 

	if (!cityRegex.test(city)) {
		document.getElementById("city_Msg").innerHTML= "<small>Text with minimum 3 and maximum 50 characters. </small>";
		return true;
	}
	document.getElementById("city_Msg").innerHTML= "<small></small>";
	return true;
}

//Address validation
function validateAddress(add){
	// check if the value is not empty
	if (add === "") {
		document.getElementById("add_Msg").innerHTML= "<small>Please enter an address.</small>";
		return false;
	}
	// validate address format
	const addRegex =
		/^(\w){5,50}$/; 

	if (!addRegex.test(add)) {
		document.getElementById("add_Msg").innerHTML= "<small>Text with minimum 5 and maximum 50 characters. </small>";
		return false;
	}
	document.getElementById("add_Msg").innerHTML= "<small></small>";
	return true;
}

//Phone Number validation
function validatePhone(phone){
	// check if the value is not empty
	if (phone === "") {
		document.getElementById("phone_Msg").innerHTML= "<small>Enter a phone number if you want.</small>";
		return true;
	}
	// validate address format
	const phoneRegex =
		/^(\d){10,14}$/;

	if (!phoneRegex.test(phone)) {
		document.getElementById("phone_Msg").innerHTML= "<small>Number with at least 10 and not more than 14 digits.</small>";
		return true;
	}
	document.getElementById("phone_Msg").innerHTML= "<small></small>";
	return true;
}

function validateAgree(agree){
	if(agree.checked === false){
		document.getElementById("agree_Msg").innerHTML= "<small>To continue agree with the terms.</small>";
		return false;
	} else if(agree.checked === true){
		document.getElementById("agree_Msg").innerHTML= "<small></small>";
		return true;
	}
}

function CstVsLi(Cst,Li){
	if (Cst.checked === true){
		Student();
	}
	if (Li.checked === true){
		var Uoc= document.getElementById("uni1");
		var Helmepa= document.getElementById("uni2");
		var Tuc= document.getElementById("uni3");

		Uoc.checked = false;
		Helmepa.checked= false;
		Tuc.checked= false;

		Library();
	}
}

function Student(){
	var UnGrad= document.getElementById("student1");
	var PostGrad= document.getElementById("student2");
	var PhD= document.getElementById("student3");
	var idnum= document.getElementById("idnum").value;
	var dep= document.getElementById("department").value;
	var stdate= document.getElementById("start_date").value;
	var endate= document.getElementById("end_date").value;

	//Only if student is choosen
	var StKindValid = validateStKind(UnGrad,PostGrad,PhD);
	var StIdValid = validateStudentId(idnum);
	var UniValid = validateUni();
	var DepValid = validateDep(dep);
	var DateIdValid = validateIdDate(stdate,endate,UnGrad,PostGrad,PhD);

	// if valid, Student is true.
	if (StKindValid && StIdValid && UniValid && DepValid && DateIdValid) {
		return true;
	}
}

function Library(){
	var liname= document.getElementById("liname").value;
	var info= document.getElementById("info").value;

	var LiNameValid = validateLiName(liname);
	var InfoValid = validateInfo(info);

	// if valid, Library is true.
	if (LiNameValid && InfoValid) {
		return true;
	}
}

//Library Name validation
function validateLiName(liname){
	// check if the value is not empty
	if (liname === "") {
		document.getElementById("liname_Msg").innerHTML= "<small>Please enter a Library Name.</small>";
		return false;
	}
	// validate library name format
	const linameRegex =
		/^(\w){3,50}$/;

	if (!linameRegex.test(liname)) {
		document.getElementById("liname_Msg").innerHTML= "<small>Text with minimum 3 and maximum 50 characters.</small>";
		return false;
	}
	document.getElementById("liname_Msg").innerHTML= "<small></small>";
	return true;
}

//Information and time table of Library validation
function validateInfo(info){
	// check if the value is not empty
	if (info === "") {
		document.getElementById("info_Msg").innerHTML= "<small>Please enter Library Information and time table.</small>";
		return false;
	}
	// validate info format
	const infoRegex =
		/^(\w){3,}$/;

	if (!infoRegex.test(info)) {
		document.getElementById("info_Msg").innerHTML= "<small>Text with 3 or more characters.</small>";
		return false;
	}
	document.getElementById("info_Msg").innerHTML= "<small></small>";
	return true;
}

window.onload = function() {
	//clearing form inputs and checkboxes
  	document.getElementById("username").value ="";
	document.getElementById("email").value = "";
	document.getElementById("p1").value ="";
	document.getElementById("p2").value ="";
	document.getElementById("fname").value ="";
	document.getElementById("lname").value ="";
	document.getElementById("male").checked = false;
	document.getElementById("female").checked = false;
	document.getElementById("other").checked = false;
	document.getElementById("type1").checked = false;
	document.getElementById("type2").checked = false;
	document.getElementById("website").value ="";
	document.getElementById("city").value ="";
	document.getElementById("address").value ="";
	document.getElementById("phone_number").value ="";
	document.getElementById("agree").checked = false;

	document.getElementById("liname").value ="";
	document.getElementById("info").value ="";

	document.getElementById("student1").checked = false;
	document.getElementById("student2").checked = false;
	document.getElementById("student3").checked = false;
	document.getElementById("idnum").value ="";
	document.getElementById("uni1").checked = false;
	document.getElementById("uni2").checked = false;
	document.getElementById("uni3").checked = false;
	document.getElementById("department").value ="";
	document.getElementById("start_date").value ="";
	document.getElementById("end_date").value ="";
}

function Maps(){

	const axios = require("axios");

	const options = {
	  method: 'GET',
	  url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
	  params: {
	    street: '34 West 13th Street',
	    city: 'New York City',
	    state: 'NY',
	    postalcode: '10011',
	    country: 'USA',
	    'accept-language': 'en',
	    polygon_threshold: '0.0'
	  },
	  headers: {
	    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
	    'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
	  }
	};

	axios.request(options).then(function (response) {
		console.log(response.data);
	}).catch(function (error) {
		console.error(error);
	});
}

//https://www.codecademy.com/forum_questions/553f3e3b51b887eb090001cd