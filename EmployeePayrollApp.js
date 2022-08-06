
class EmployeePayrollData {
    //getter and setter method
    get id() { return this._id; }
    set id(id) {
        this._id = id;
    }
    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$")
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect';
    }
    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }
    get gender() { return this._gender; }
    set gender(gender) {
        this._gender = gender;
    }
    get department() { return this._department; }
    set department(department) {
        this._department = department;
    }
    get salary() { return this._salary; }
    set salary(salary) {
        this._salary = salary;
    }
    get note() { return this._note; }
    set note(note) {
        this._note = note;
    }
    get startDate() { return this._startDate; }
    set startDate(startDate) {
        this._startDate = startDate;
        if (startDate > now) throw 'Start Date is a Future Date';
        var diff = Math.abs(now.getTime() - startDate.getTime());
        if (diff / (1000 * 60 * 60 * 24) > 30)
            throw 'Start Date is beyond 30 days!';
        this.startDate = startDate;
    }

    //methord--
    toString() {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "id=" + this.id + ", name=" + this.name + ", gender=" + this.gender + ", profilepic= " + this.profilePic + ", department= " + this.department + ", salary=" + this.salary + ", startDate= " + empDate + ", note=" + this.note;
    }
}


window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setTextValue('.text-error', "");
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            setTextValue('.text-error', "");
        }
        catch (e) {
            setTextValue('.text-error', e);
        }
    });

    const date = document.querySelector("#date");
    date.addEventListener('input' , function(){
        let startDate = getInputValueById('#day')+" "+getInputValueById('#month')+" "+ getInputValueById('#year');
        try{
            (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
            setTextValue('.date-error', "");
        }
        catch(e){
            setTextValue('.date-error',e);
        }
    });

    const salary = document.querySelector("#salary");
    setTextValue(".salary—output",salary.value);
    salary.addEventListener('input', function () {
        setTextValue('.salary-output',salary.value);
    });
    checkForUpdate();
});


const save = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    try{
        let employeePayrollData = createEmployeePayroll();
        setEmployeePayrollObject();
        createAndUpdateStorage(employeePayrollData);
        resetForm();
        window.location.replace(site_properties.home_page);
    }
    catch(e){
        return ;
    }
}

const setEmployeePayrollObject = () =>{
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
    if(!empPayrollData){
        employeePayrollList.push(createEmployeePayrollData());
    }
    else{
        const index = employeePayrollList.map(empData._id).indexOf(empPayrollData._id);
        employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id));
    }
}else{
    employeePayrollList = [createEmployeePayrollData()]
}
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id)employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try{
        employeePayrollData.name = employeePayrollObj._name;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try{
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    }catch(e){
        setTextValue('.date-error',e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () =>{
    let empID = localStorage.getItem("EmployeeId");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.getItem("EmployeeId",empID);
    return empID;
}

const getSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item =>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}
